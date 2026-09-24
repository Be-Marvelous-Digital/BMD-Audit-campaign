# Audit webu zadarmo

Landing page for https://audit.bemarvelousdigital.sk. Vite + React + TypeScript + LESS, prerendered to static HTML at build time.

## Scripts

```bash
npm run dev       # local dev server
npm run build     # typecheck, client build, SSR build, prerender into dist/
npm run preview   # serve dist/
```

Deploy the contents of `dist/` to any static host.

## Mailchimp

The form submits in place through Mailchimp's `post-json` (JSONP) endpoint and shows a success or error message without leaving the page. The `action`/`method="post"` attributes stay as a no-JS fallback. It uses the same audience as bemarvelousdigital.sk. Override with env vars (see `.env.example`):

- `VITE_MAILCHIMP_ACTION`: form action URL
- `VITE_MAILCHIMP_HONEYPOT`: honeypot field name (`b_<u>_<id>`)

Submitted fields: `EMAIL`, `FNAME`, `PHONE`, `MESSAGE`. Business type, website and social profile are combined into `MESSAGE`.

An email that is already in the audience gets an "already subscribed" response from Mailchimp; the form then asks the visitor to write directly.

## Open Graph image

`public/opengraph.png` (1200×630). Keep it under 300 KB so WhatsApp shows the preview.
