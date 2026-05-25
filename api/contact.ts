import { Resend } from 'resend';

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  sourcePage?: string;
  formType?: string;
  website?: string;
};

const fallbackRecipient = 'hello@safetywarden.com';
const rateLimitWindowMs = 10 * 60 * 1000;
const maxSubmissionsPerWindow = 5;
const submissionsByIp = new Map<string, { count: number; resetAt: number }>();

const escapeHtml = (value = '') =>
  value
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const isEmail = (value?: string) =>
  Boolean(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()));

const getClientIp = (req: { headers: Record<string, string | string[] | undefined>; socket?: { remoteAddress?: string } }) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (Array.isArray(forwarded)) return forwarded[0]?.split(',')[0]?.trim() || 'unknown';
  return forwarded?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const current = submissionsByIp.get(ip);

  if (!current || current.resetAt <= now) {
    submissionsByIp.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  current.count += 1;
  return current.count > maxSubmissionsPerWindow;
};

const parseBody = (body: unknown): ContactPayload => {
  if (typeof body === 'string') return JSON.parse(body || '{}') as ContactPayload;
  return (body || {}) as ContactPayload;
};

const buildLeadEmail = (payload: Required<Pick<ContactPayload, 'name' | 'email' | 'company' | 'phone' | 'message'>>) => {
  const timestamp = new Date().toISOString();

  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.55;max-width:680px">
      <h2 style="font-size:22px;margin:0 0 16px;color:#020617">New SafetyWarden Demo Request</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0">
        ${[
          ['Name', payload.name],
          ['Email', payload.email],
          ['Company', payload.company],
          ['Phone', payload.phone],
          ['Source page', payload.sourcePage || 'Unknown'],
          ['Form type', payload.formType || 'contact'],
          ['Timestamp', timestamp],
        ]
          .map(
            ([label, value]) => `
              <tr>
                <td style="width:160px;padding:10px 12px;border-bottom:1px solid #e2e8f0;background:#f8fafc;font-weight:700">${escapeHtml(label)}</td>
                <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join('')}
      </table>
      <h3 style="font-size:16px;margin:22px 0 8px;color:#020617">Message</h3>
      <div style="white-space:pre-wrap;border:1px solid #e2e8f0;background:#f8fafc;padding:14px;border-radius:8px">${escapeHtml(payload.message)}</div>
    </div>
  `;
};

const buildAutoResponseEmail = (name: string) => `
  <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6;max-width:640px">
    <h2 style="font-size:22px;margin:0 0 14px;color:#020617">We received your SafetyWarden inquiry</h2>
    <p>Hello ${escapeHtml(name)},</p>
    <p>Thank you for contacting SafetyWarden. Our team has received your message and will review your requirements.</p>
    <p>We will get back to you shortly.</p>
    <p style="margin-top:24px">Regards,<br />SafetyWarden Team</p>
  </div>
`;

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ success: false, message: 'Too many submissions. Please try again later.' });
  }

  let payload: ContactPayload;

  try {
    payload = parseBody(req.body);
  } catch {
    return res.status(400).json({ success: false, message: 'Invalid request body' });
  }

  if (payload.website) {
    return res.status(400).json({ success: false, message: 'Unable to submit this form.' });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const company = payload.company?.trim();
  const phone = payload.phone?.trim();
  const message = payload.message?.trim();

  if (!name || !email || !company || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Please complete all required fields.' });
  }

  if (!isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL || fallbackRecipient;

  if (!apiKey || !from || !to) {
    console.error('Missing RESEND_API_KEY, CONTACT_EMAIL or RESEND_FROM_EMAIL.');
    return res.status(500).json({ success: false, message: 'Email delivery is not configured.' });
  }

  const resend = new Resend(apiKey);
  const sanitizedPayload = {
    ...payload,
    name,
    email,
    company,
    phone,
    message,
  };

  try {
    const leadResult = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New SafetyWarden Demo Request - ${company}`,
      html: buildLeadEmail(sanitizedPayload),
    });

    if (leadResult.error) {
      throw leadResult.error;
    }

    console.info('SafetyWarden contact email sent.', {
      id: leadResult.data?.id,
      to,
      sourcePage: payload.sourcePage,
      formType: payload.formType,
    });

    const autoResponseResult = await resend.emails.send({
      from,
      to: email,
      subject: 'SafetyWarden received your inquiry',
      html: buildAutoResponseEmail(name),
    });

    if (autoResponseResult.error) {
      console.warn('SafetyWarden contact auto-response failed.', autoResponseResult.error);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('SafetyWarden contact email delivery failed.', error);
    return res.status(500).json({ success: false, message: 'Email delivery failed' });
  }
}
