import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container, Eyebrow } from "@/components/ui";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects your personal information.`,
};

const lastUpdated = "29 May 2026";

/**
 * NOTE: This is a solid starting template tailored to what the site does today
 * (a contact form + cookieless analytics). Review it for your business and seek
 * professional advice before launch if you're unsure, especially if you later
 * add advertising pixels, newsletters or other data collection.
 */
const policy = `
## Who we are

This Privacy Policy explains how ${siteConfig.name} ("we", "us" or "our") collects, uses and protects your personal information when you visit our website or get in touch with us.

We are a social media marketing and AI automation agency based in the United Kingdom. If you have any questions about this policy or your data, contact us at [${siteConfig.email}](mailto:${siteConfig.email}).

## Information we collect

**Information you give us.** When you submit our contact form or email us, we collect the details you choose to provide, typically your name and email address, and optionally your company, the service you're interested in, your budget and your message.

**Information collected automatically.** We use privacy-friendly, aggregate analytics to understand how visitors use the site (for example, which pages are popular). This data is anonymised, does not use tracking cookies and does not identify you personally. Our hosting provider may also keep standard server logs for security and reliability.

## How we use your information

We use the information you provide to:

- Respond to your enquiry and provide the free audit or services you've asked about
- Communicate with you about your project
- Improve our website and the service we offer

We only use your details for the purpose you contacted us about. We do not send marketing emails unless you've separately agreed to receive them.

## Legal basis

Under UK data protection law (UK GDPR), we process your information on the basis of:

- **Your consent**, which you give by submitting the contact form
- **Taking steps at your request** before entering into a contract
- **Our legitimate interests** in responding to enquiries and running our business

## Sharing your information

We do not sell or rent your personal information. We only share it with trusted service providers who help us run our business, such as our website hosting and analytics provider, and the form or email providers we use to receive and respond to your enquiry.

These providers process data on our behalf and only as needed to provide their service. Some may process data outside the UK; where they do, appropriate safeguards are in place.

## Cookies

Our website does not use advertising or tracking cookies. Any analytics we use is cookieless and aggregated.

## How long we keep your data

We keep enquiry information only for as long as needed to respond to you and, where relevant, to deliver our services, after which it is deleted or anonymised.

## Your rights

Under UK GDPR you have the right to access, correct, delete or restrict the use of your personal data, to object to its processing, and to data portability. To exercise any of these rights, email us at [${siteConfig.email}](mailto:${siteConfig.email}).

You also have the right to complain to the UK's Information Commissioner's Office (ICO) at [ico.org.uk](https://ico.org.uk) if you're unhappy with how we've handled your data.

## Changes to this policy

We may update this policy from time to time. Any changes will be posted on this page with a revised "last updated" date.

## Contact us

Questions about this policy or your personal data? Email us at [${siteConfig.email}](mailto:${siteConfig.email}).
`;

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-line/60">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted">Last updated: {lastUpdated}</p>
        </Container>
      </section>

      <Container className="max-w-3xl py-14">
        <div className="prose prose-invert prose-volt max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-xl prose-a:font-medium prose-a:text-brand-blue hover:prose-a:text-brand-teal prose-strong:text-fg prose-li:marker:text-brand-teal">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{policy}</ReactMarkdown>
        </div>
      </Container>
    </>
  );
}
