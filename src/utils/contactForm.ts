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
  const endpoint = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';

  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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

  const result = await response.json().catch(() => null) as ContactFormResult | null;

  if (!response.ok || !result?.success) {
    if (response.status === 404) {
      return {
        success: false,
        error: 'Contact service is not available on this deployment. Please redeploy with the /api/contact Vercel function.',
      };
    }

    return {
      success: false,
      error: result?.message || result?.error || 'We could not send your message. Please try again.',
    };
  }

  return { success: true };
};
