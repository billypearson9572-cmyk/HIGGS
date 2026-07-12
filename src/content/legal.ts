/**
 * Legal documents — Privacy Policy, Terms of Service and Cookie Policy.
 *
 * The `content` fields are plain Markdown, rendered by the LegalPage
 * component. Entity details are pulled from `siteConfig.legal`, so update
 * them in one place (src/config/site.ts) and every page stays in sync.
 *
 * These are honest, plain-English documents written to match what this
 * website actually does. They are not a substitute for legal advice —
 * have them reviewed before you rely on them.
 */
import { siteConfig } from "@/config/site";

const { email, url, legal } = siteConfig;

const entity = legal.companyNumber
  ? `${legal.entityName} (company number ${legal.companyNumber})`
  : legal.entityName;

const icoLine = legal.icoRegistration
  ? ` We are registered with the UK Information Commissioner's Office (ICO) under reference ${legal.icoRegistration}.`
  : "";

export type LegalDoc = {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  content: string;
};

export const privacyPolicy: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  metaDescription:
    "How Voltara Digital collects, uses and protects your personal information — in plain English.",
  intro:
    "Your privacy matters to us, so we keep this policy in plain English — no dense legalese. It explains what personal information we collect, why, and the rights you have over it.",
  content: `## Who we are

${entity} ("Voltara", "we", "us") is the data controller responsible for your personal information. We're based in ${legal.address}, and you can reach us any time at ${email}.${icoLine}

This policy applies to ${url} and to any enquiry you make with us.

## What information we collect

We only collect what we need to respond to you and run our business:

- **Information you give us.** When you complete our contact form or email us, we collect your name, email address, and anything you choose to tell us — such as your company name, budget range, the service you're interested in, and the contents of your message.
- **Booking information.** If you book a call, our scheduling provider collects your name, email and chosen time so we can meet.
- **Technical information.** Like most websites, our hosting provider automatically records limited technical data (such as your IP address and browser type) in server logs, to keep the site secure and running.

We do **not** use advertising trackers, and we do **not** run analytics cookies on this site. See our [Cookie Policy](/cookies) for the detail.

## How and why we use it

We use your information to:

- **Respond to your enquiry and provide our services** — necessary to take steps at your request before entering a contract, and to perform that contract.
- **Keep in touch about your enquiry** — on the basis of your consent when you submit the form.
- **Keep our website secure and working** — on the basis of our legitimate interest in running a safe, functional site.

We will never sell your personal information, and we won't send you marketing you didn't ask for.

## Who we share it with

We keep your data to ourselves wherever possible. We only share it with the trusted providers that help us operate — for example our website host, our scheduling tool, and the email or form service we use to receive and reply to your enquiry.

Each of these acts as our processor and only handles your data on our instructions. Some may process data outside the UK; where they do, we rely on appropriate safeguards (such as the UK International Data Transfer Agreement or equivalent) to protect it.

## How long we keep it

We keep enquiry information only as long as we need it — to respond to you, and for a reasonable period afterwards in case you come back to us or for our legitimate business records. When we no longer need it, we delete it.

## Your rights

Under UK data protection law, you have the right to:

- access the personal information we hold about you;
- ask us to correct anything that's inaccurate;
- ask us to delete your information;
- object to, or ask us to restrict, how we use it;
- ask for a copy of the information you gave us, in a portable format; and
- withdraw any consent you've given, at any time.

To exercise any of these, just email ${email} and we'll help. You also have the right to complain to the ICO (ico.org.uk) if you're unhappy with how we've handled your data — though we'd appreciate the chance to put things right first.

## Children

Our website and services are intended for businesses, not children, and we don't knowingly collect data from anyone under 16.

## Changes to this policy

If we change how we handle your data, we'll update this page and revise the date below.

## Contact

Questions about your privacy? Email ${email} and a real person will get back to you.

_Last updated: ${legal.lastUpdated}._`,
};

export const cookiePolicy: LegalDoc = {
  slug: "cookies",
  title: "Cookie Policy",
  metaDescription:
    "How Voltara Digital uses cookies — and, refreshingly, how little we use them. No tracking, no analytics, no consent banner.",
  intro:
    "This policy explains how we use cookies and similar technologies on our website — and, refreshingly, how little we use them.",
  content: `## The short version

**This website does not use tracking, analytics or advertising cookies.** We don't run Google Analytics, we don't use marketing pixels, and we don't build advertising profiles about you. Because we set no non-essential cookies, there's no cookie consent banner to click through — there's simply nothing to consent to.

## What cookies are

Cookies are small text files a website can store on your device. They're often used to remember preferences or, less happily, to track people across the web. Similar technologies include local storage and pixels.

## What we use

- **Strictly necessary only.** Any storage this site uses exists purely to serve the pages securely and reliably. It doesn't identify you or track your behaviour, and under UK law it doesn't require consent.
- **No analytics.** We currently measure nothing about individual visitors. Our fonts are self-hosted, so even loading the site doesn't call out to third parties like Google Fonts.
- **Third-party pages.** If you click through to book a call or visit our social profiles, those services set their own cookies under their own policies, once you're on their platforms.

## If this ever changes

If we add analytics in future, we'll do it the honest way: privacy-friendly measurement, a clear cookie banner, and no tracking until you've said yes. We'll update this page before anything changes.

## Controlling cookies

You're always in control. You can block or delete cookies in your browser settings at any time — see your browser's help pages for how. Doing so won't stop this site from working.

## Contact

Questions? Email ${email}.

_Last updated: ${legal.lastUpdated}._`,
};

export const termsOfService: LegalDoc = {
  slug: "terms",
  title: "Terms of Service",
  metaDescription:
    "The terms governing your use of the Voltara Digital website — written plainly, on purpose.",
  intro:
    "These terms govern your use of our website. By using it, you agree to them. They cover the website itself — the terms of any paid engagement are set out separately in the agreement we sign with you as a client.",
  content: `## Who we are

This website is operated by ${entity}, based in ${legal.address}. You can reach us at ${email}.

## Using our website

You're welcome to browse the website and get in touch. In return, you agree not to:

- use it for any unlawful or fraudulent purpose;
- attempt to gain unauthorised access to it, or disrupt it; or
- copy, republish or resell our content without our permission.

## Our content, and honesty about results

We share marketing and automation ideas on this website — including on our blog — in good faith and from real experience. But every business is different, and **nothing on this website is a guarantee of specific results.** Any figures we mention, including past performance from our prior work, describe what has happened before — not a promise of what will happen for you. Treat our content as helpful information, not tailored professional advice for your situation.

## Intellectual property

The content, branding and design of this website belong to ${legal.entityName} (or are used with permission) and are protected by law. You may view and share our content for your own reference, but not reproduce it commercially without our written consent.

## Third-party links

Our website links to third-party services, such as our scheduling and social media platforms. We're not responsible for their content or practices — their own terms and policies apply once you leave our site.

## Availability and disclaimers

We work to keep the website available and accurate, but we provide it "as is." We don't warrant that it will always be uninterrupted, error-free or completely up to date, and we may change or remove content at any time.

## Our liability

To the fullest extent permitted by law, we won't be liable for any loss arising from your use of, or reliance on, this website. Nothing in these terms limits our liability where it would be unlawful to do so — for example, for death or personal injury caused by negligence, or for fraud.

## Governing law

These terms are governed by the law of ${legal.governingLaw}, and the courts of ${legal.governingLaw} have exclusive jurisdiction.

## Changes

We may update these terms from time to time. The version on this page is the one that applies.

## Contact

Questions about these terms? Email ${email}.

_Last updated: ${legal.lastUpdated}._`,
};
