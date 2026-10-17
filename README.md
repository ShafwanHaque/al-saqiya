# Al Saqiya Tours and Travels

Bilingual (English and Bangla) travel agency website for Al Saqiya in Chattogram, Bangladesh.

## Local development

```bash
pnpm dev
```

Open http://localhost:3000. Routes use `/en` and `/bn` locale prefixes.

## Contact form configuration

Configure these environment variables in development and production:

- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for rate limiting.
- `GMAIL_USER` and `GMAIL_APP_PASSWORD` for sending email through Gmail.
- `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` for the rate-limit fallback challenge.
- `CONTACT_RECIPIENT_EMAIL` is optional; submissions default to the public contact email.
- `NEXT_PUBLIC_FACEBOOK_URL` is optional and should point to the verified business page.

Without the required Gmail or Redis settings, the endpoint returns a temporary-unavailable response. If either Turnstile key is missing, submissions are stopped after the configured rate limit instead of showing a broken challenge.

## Production

```bash
pnpm build
pnpm start
```
