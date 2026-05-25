import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !contactEmail || !fromEmail) {
      console.error("Missing email env vars", {
        hasApiKey: Boolean(apiKey),
        hasContactEmail: Boolean(contactEmail),
        hasFromEmail: Boolean(fromEmail)
      });

      return res.status(500).json({
        success: false,
        message: "Email service is not configured"
      });
    }

    const { name, email, company, phone, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required"
      });
    }

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      reply_to: email,
      subject: "New SafetyWarden Website Message",
      html: `
        <h2>New SafetyWarden Website Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
      `
    });

    return res.status(200).json({
      success: true,
      id: result?.data?.id || null
    });
  } catch (error) {
    console.error("Contact API failed:", error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to send message"
    });
  }
}
