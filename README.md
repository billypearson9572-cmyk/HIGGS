# Voltara Digital

Marketing website for **Voltara Digital** — a social media marketing &amp; AI
automation agency for SMEs.

Built with [Next.js](https://nextjs.org) (App Router), TypeScript and
[Tailwind CSS](https://tailwindcss.com) v4.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # lint the project
```

## Project structure

```
src/
├── app/                  # Pages (App Router)
│   ├── page.tsx          # Home
│   ├── services/         # Services
│   ├── about/            # About
│   ├── contact/          # Contact (+ form) — the "free audit" funnel
│   ├── privacy/          # Privacy policy
│   ├── blog/             # Blog index + [slug] article pages
│   ├── layout.tsx        # Root layout, fonts, global metadata
│   ├── globals.css       # Theme tokens, brand utilities
│   ├── icon.svg          # Favicon (Voltara mark)
│   ├── opengraph-image.tsx  # Social share image
│   ├── sitemap.ts / robots.ts
├── components/           # Navbar, Footer, Logo, ContactForm, UI primitives…
├── config/site.ts        # ← Edit contact details, links & socials here
├── content/blog.ts       # ← Add / edit blog posts here (Markdown)
└── lib/utils.ts          # Small helpers
```

## Editing the most common things

- **Contact details, booking link, socials:** `src/config/site.ts`. Leave a
  value blank to hide it — socials and phone won't show until you add them, and
  the "book a call" buttons route to the contact form until you set a Calendly
  link.
- **Blog posts:** add an entry to the array in `src/content/blog.ts` — the
  `content` field is plain Markdown.
- **Analytics:** Vercel Web Analytics is wired in (`@vercel/analytics`). It's
  cookieless and activates automatically once deployed to Vercel.
- **Brand colours / fonts:** the `@theme` block at the top of
  `src/app/globals.css`.
- **Logo:** `src/components/Logo.tsx` draws the mark inline. To use the exact
  logo file, drop it in `public/` and swap that component for a `next/image`.

## Contact form

The contact form works out of the box: with no configuration it opens the
visitor's email client pre-filled. To collect submissions automatically,
set a form backend endpoint (e.g. [Formspree](https://formspree.io) or
[Web3Forms](https://web3forms.com)):

```bash
# .env.local
NEXT_PUBLIC_CONTACT_ENDPOINT="https://your-form-endpoint"
```

See `.env.example`.

## Deploying

The easiest path is [Vercel](https://vercel.com): push this repo to GitHub,
import it in Vercel, and it deploys automatically. Any host that supports
Next.js works too. Remember to set `NEXT_PUBLIC_CONTACT_ENDPOINT` in your
host's environment variables if you're using a form backend, and update
`url` in `src/config/site.ts` to your live domain.
