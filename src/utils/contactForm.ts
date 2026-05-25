import type { FormData } from '../types';

export type ContactFormPayload = FormData & {
  sourcePage: string;
  formType: 'contact' | 'demo';
  website?: string;
};

export type ContactFormResult = {
  success: boolean;
  message?: string;
  error?: string;
};

export const submitContactForm = async (payload: ContactFormPayload): Promise<ContactFormResult> => {
  let response: Response;

  try {
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        company: payload.company,
        phone: payload.phone,
        message: payload.message,
      }),
    });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('SafetyWarden contact API request failed:', error);
    }

    return {
      success: false,
      error: 'We could not reach the contact service. Please try again.',
    };
  }

  const data = await response.json().catch(() => null) as ContactFormResult | null;

  if (!response.ok || !data?.success) {
    if (response.status === 404) {
      return {
        success: false,
        error: 'Contact service is not available on this deployment. Please redeploy with the /api/contact Vercel function.',
      };
    }

    return {
      success: false,
      error: data?.message || data?.error || 'Failed to send message',
    };
  }

  return { success: true };
};
