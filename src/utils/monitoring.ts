import * as Sentry from '@sentry/react';

const isProduction = import.meta.env.PROD;
const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const sentryDisabled = import.meta.env.VITE_ENABLE_SENTRY === 'false';

let sentryEnabled = false;
let fetchWrapped = false;

const redactUrl = (url: string) => {
  try {
    const parsed = new URL(url, window.location.origin);
    parsed.search = '';
    return parsed.toString();
  } catch {
    return url.split('?')[0];
  }
};

export const isSentryEnabled = () => sentryEnabled;

export const initMonitoring = () => {
  if (!isProduction || sentryDisabled || !sentryDsn) {
    return;
  }

  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.VITE_APP_ENV || 'production',
    release: import.meta.env.VITE_APP_VERSION,
    tracesSampleRate: Number(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE ?? 0.05),
    beforeSend(event) {
      if (event.request?.url) {
        event.request.url = redactUrl(event.request.url);
      }

      return event;
    }
  });

  sentryEnabled = true;
};

export const reportError = (error: unknown, context?: Record<string, unknown>) => {
  if (sentryEnabled) {
    Sentry.withScope((scope) => {
      if (context) {
        scope.setContext('safetywarden', context);
      }
      Sentry.captureException(error);
    });
    return;
  }

  if (import.meta.env.DEV) {
    console.warn('Monitoring event', error, context);
  }
};

export const installFetchFailureMonitoring = () => {
  if (fetchWrapped || !isProduction || !sentryEnabled) {
    return;
  }

  const nativeFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const response = await nativeFetch(input, init);

    if (response.status >= 500) {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
      Sentry.captureMessage('Production fetch request failed', {
        level: 'warning',
        extra: {
          url: redactUrl(url),
          status: response.status,
          method: init?.method || 'GET'
        }
      });
    }

    return response;
  };

  fetchWrapped = true;
};
