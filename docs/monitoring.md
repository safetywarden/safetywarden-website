# SafetyWarden Lightweight Production Monitoring

This setup keeps monitoring practical for an MVP-stage enterprise SaaS website without adding heavy infrastructure.

## UptimeRobot

Create HTTPS monitors with a 5 minute interval:

| Monitor | URL | Expected |
| --- | --- | --- |
| Marketing website | `https://www.safetywarden.com` | HTTP 200 |
| Application | `https://app.safetywarden.com` | HTTP 200/302 depending on auth redirect |
| Backend API | `https://api.safetywarden.com/health` | HTTP 200 JSON |
| Website health endpoint | `https://www.safetywarden.com/api/health` | HTTP 200 JSON |

Alert channels:

- Email: founder / operations inbox
- Optional: WhatsApp or Telegram integration from UptimeRobot

## Vercel Analytics

The website includes:

- `@vercel/analytics/react`
- `@vercel/speed-insights/react`
- lightweight custom events via `@vercel/analytics`

Enable these in Vercel Project Settings:

- Analytics
- Speed Insights

Use production traffic and Vercel preview deployments to review:

- Core Web Vitals
- slow pages and routes
- device-level performance
- traffic patterns
- CTA clicks for demo, Google Meet, WhatsApp, email and app login
- ESG/BRSR and workflow page engagement events

Supabase `page_views` tracking is intentionally disabled for the marketing website. Do not re-enable `VITE_ENABLE_SUPABASE_ANALYTICS` for production marketing pages until the schema and operational requirement are reviewed.

## Sentry

The frontend initializes Sentry only in production and only when a DSN is configured.

Required Vercel environment variable:

```env
VITE_SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
```

Optional environment variables:

```env
VITE_ENABLE_SENTRY=true
VITE_APP_ENV=production
VITE_APP_VERSION=website-2026-05-26
VITE_SENTRY_TRACES_SAMPLE_RATE=0.05
```

Captured signals:

- React render crashes
- lazy route failures
- unhandled production exceptions
- 5xx fetch failures

Production safeguards:

- Sentry is disabled when `VITE_SENTRY_DSN` is missing.
- Query strings are removed from captured request URLs.
- No API keys or private env vars are exposed to frontend code.
- Development warnings stay local.

## Error Boundaries

The root React app is wrapped in `src/components/ErrorBoundary.tsx`.

Behavior:

- prevents blank white screens
- reports crashes to Sentry when enabled
- shows reload and homepage recovery actions
- avoids exposing internal stack traces to users

## Railway Backend Monitoring

Use Railway built-in service views for the backend:

- deployment health
- CPU
- memory
- restart events
- service logs
- environment variable status

Keep backend logs minimal and structured. Do not log secrets, tokens, raw authorization headers, or uploaded evidence contents.

## Operational Review Rhythm

Weekly:

- review UptimeRobot incidents
- review Sentry new issues
- review Vercel Speed Insights slow routes

Monthly:

- check Lighthouse production preview for homepage and high-value pages
- review Railway restart and memory patterns
- close resolved Sentry issues after deployment validation
