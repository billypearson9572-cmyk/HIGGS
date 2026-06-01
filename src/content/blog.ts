/**
 * Blog posts.
 *
 * To publish a new article, add an object to the `posts` array below. The
 * `content` field is plain Markdown — headings (##), lists, **bold**, links
 * and > quotes all render automatically.
 */
export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date, e.g. "2026-05-20"
  author: string;
  category: string;
  readingMinutes: number;
  content: string;
};

export const posts: Post[] = [
  {
    slug: "first-30-days-with-voltara",
    title: "What your first 30 days with Voltara actually look like",
    description:
      "No vague “onboarding process.” Here's an honest, week-by-week look at what happens when you start working with us — what we do, what we need from you, and what we won't promise.",
    date: "2026-05-27",
    author: "Voltara Digital",
    category: "Behind the scenes",
    readingMinutes: 6,
    content: `Hiring a marketing partner is an act of trust, and most agencies repay it with a black box. You sign, you wait, and a month later a report lands that you can't really interpret. We do the opposite. Here's exactly what the first month with us looks like, so there are no surprises before you ever get in touch.

## Week 1 — Discovery & audit

We start by understanding your business, not your social channels. On a kickoff call we dig into what you actually sell, who your best customers are, where your enquiries come from today, and what "good" would look like in six months.

Then we audit what you already have — your current presence, your past content, your website's path from visitor to enquiry, and any tools you're using. You get the findings in plain English, including the unflattering bits.

> What we need from you: an hour of honest conversation and access to your existing accounts. That's it.

## Week 2 — Strategy & sign-off

Next we turn the audit into a plan: which one or two channels we'll focus on and why, the kinds of content we'll make, and the single most important number we're trying to move. We'd rather do two channels properly than six badly.

Nothing goes live until you've seen the plan and signed off on it. It's your business and your brand voice — you should recognise yourself in the strategy before we publish a word.

## Weeks 3–4 — Launch & first signals

This is when content starts going out and, if it's part of your plan, the first automations get switched on — usually lead capture into your CRM and an instant follow-up so no enquiry goes cold.

We're watching the early signals here: reach, profile visits, link clicks and first enquiries. We won't pretend a month is enough to judge a marketing system. It isn't. But it's enough to see whether the foundations are working, and to start tuning.

## What we'll never do in month one (or any month)

- **Promise overnight results.** Marketing compounds. Anyone guaranteeing a flood of customers in week one is selling you something.
- **Drown you in vanity metrics.** Likes are nice. We report on the numbers that connect to revenue.
- **Lock you in.** We work month to month. If we're not earning our place, you can leave and keep everything we built.

## The takeaway

A good first 30 days isn't about fireworks — it's about laying foundations you can see and trust. By the end of month one you'll know exactly what we're doing, why, and what early progress looks like.

Want to see what your first month could look like? [Book a free strategy call](/contact) and we'll walk you through it.`,
  },
  {
    slug: "why-we-dont-do-long-contracts",
    title: "Why we don't tie clients into long contracts",
    description:
      "Most agencies hide behind 12-month tie-ins. We work month to month, on purpose. Here's the thinking behind it — and why it quietly makes us better at the job.",
    date: "2026-05-22",
    author: "Voltara Digital",
    category: "Opinion",
    readingMinutes: 4,
    content: `Ask most marketing agencies for a month-to-month arrangement and you'll feel the room cool. The standard is a 12-month contract, often with a chunky exit clause. We don't work that way, and we think the reason matters.

## The long-contract trap

Long tie-ins are usually sold as a benefit to you — "marketing takes time to work." There's a grain of truth in that. But a year-long lock-in mostly protects the agency. Once you've signed, the pressure to keep impressing you quietly drops, because you can't easily leave even if results stall.

That's a strange incentive to build a relationship on.

## What month-to-month forces us to do

When you can walk away at the end of any month, we have to earn the next one. Every single one. That keeps us honest in ways a contract never could:

- We focus on results you can actually feel, not just slides in a report.
- We tell you early when something isn't working, instead of running out the clock.
- We treat your budget like it's ours, because the moment it stops paying off, you'll notice.

Removing the safety net is the point. It aligns us with you.

## You own everything, always

The other half of the trap is ownership. Some agencies build your audience, your ad accounts and your automations on *their* infrastructure — so leaving means starting from zero. We build on your accounts. Your social profiles, your CRM, your n8n workflows. If we ever part ways, you keep all of it and lose nothing.

## The honest catch

Month-to-month cuts both ways, and we'll be straight about it: marketing genuinely does compound, so the best results come from sticking with a strategy long enough to let it work. We're not promising miracles in 30 days. What we're promising is that you'll stay because it's working — not because you signed something you can't get out of.

## The takeaway

Flexible terms aren't a gimmick. They're a forcing function that keeps us pointed at the only thing that matters: growing your business well enough that you *want* to keep going.

That's the deal. [Come and test it](/contact).`,
  },
  {
    slug: "word-of-mouth-ceiling",
    title: "Why word-of-mouth has a ceiling (and what to do about it)",
    description:
      "Referrals are the best customers you'll ever get — and the worst growth strategy you can rely on. Here's why, and how to build a system that doesn't depend on luck.",
    date: "2026-05-15",
    author: "Voltara Digital",
    category: "Growth",
    readingMinutes: 5,
    content: `Most small businesses are built on relationships. A great job leads to a referral, that referral leads to another, and before long you've got a business. It feels organic, it feels safe, and best of all — it's free.

So why do so many businesses that start this way eventually stall?

## Word-of-mouth is real growth — but it's borrowed growth

Referrals work because someone else did your marketing for you. A happy customer vouched for you, and trust transferred. That's powerful. The problem is you don't control the tap.

When you rely on word-of-mouth, three things are always true:

- **It's unpredictable.** Some months the phone rings, some months it doesn't — and you can't tell which is coming.
- **It's uncapped on the downside, capped on the upside.** Your growth is limited by the size and activity of other people's networks, not your ambition.
- **It's invisible.** You can't optimise what you can't see. There's no dashboard for "how many people nearly referred us this month."

> If you can't explain where your next ten customers are coming from, you don't have a growth strategy — you have a hope.

## The ceiling nobody warns you about

Every referral-led business eventually hits the same wall: the network runs dry. You've worked through your existing contacts, their contacts, and the natural overlap of your local market. Growth flattens — not because you got worse, but because you ran out of borrowed reach.

At that point, founders usually do one of two things. They either accept the plateau and call it "steady," or they panic and throw money at the first ad that promises a miracle. Neither works.

## What to build instead

The businesses that break through don't abandon word-of-mouth — they add a system on top of it that they actually control. That means:

1. **Visibility.** Showing up consistently where your future customers already spend their attention.
2. **A funnel.** A clear path from "never heard of you" to "ready to buy," so interest doesn't leak away.
3. **Measurement.** Knowing your numbers — reach, leads, conversion — so you can spend with confidence instead of crossing your fingers.

None of this replaces a great reputation. It compounds it. Marketing turns the trust you've already earned into reach you can dial up or down on demand.

## The takeaway

Word-of-mouth got you here. It's proof that people value what you do. But a reputation you can't scale is a business you can't scale. The next stage of growth comes from owning your visibility — and that's exactly what a marketing system is for.

Ready to build one? [Book a free strategy call](/contact) and we'll map it out together.`,
  },
  {
    slug: "social-media-that-sells",
    title: "The SME's guide to social media that actually sells",
    description:
      "Posting more isn't a strategy. Here's the simple framework we use to turn social channels into a predictable source of qualified leads for small businesses.",
    date: "2026-05-08",
    author: "Voltara Digital",
    category: "Social Media",
    readingMinutes: 6,
    content: `Most small businesses treat social media like a chore: post something, anything, a few times a week and hope it does something. Then they conclude "social doesn't work for us."

Social media works fine. The strategy is usually what's missing.

## Stop posting. Start positioning.

The goal of social isn't to fill a calendar — it's to move a stranger one step closer to becoming a customer. Every piece of content should do one of three jobs:

- **Attract** — earn attention from people who don't know you yet.
- **Nurture** — build trust with people who do.
- **Convert** — turn that trust into an enquiry or a sale.

If a post isn't doing one of those three things, it's decoration.

## The 3-part content engine

You don't need to be everywhere or post every day. You need a repeatable engine. Here's the one we build for clients:

### 1. A clear point of view

People don't follow businesses — they follow perspectives. Pick the handful of things you believe about your industry that your competitors are too timid to say, and say them consistently. That's what makes a brand memorable.

### 2. Formats that fit the platform

The same idea should look different on each channel. A short-form video, a carousel that teaches one thing, a customer story, a behind-the-scenes look. Mix **educational**, **proof**, and **personality** content so you're never one-note.

> A good rule of thumb: for every post that asks for something, publish four that give something.

### 3. A path off the platform

Likes don't pay invoices. Every channel needs an obvious next step — a link in bio, a lead magnet, a DM prompt, a booking link. The job of the feed is to earn enough trust that clicking that next step feels easy.

## Measure what matters

Vanity metrics (followers, likes) feel good but tell you little. Track the numbers that connect to revenue:

- Profile visits and link clicks
- Leads or enquiries generated
- Cost per lead (if you're running ads)
- Conversion rate from lead to customer

When you can see those numbers, "should we post more reels?" stops being a guess and becomes a decision.

## Paid amplifies, it doesn't replace

Once your organic content is converting, paid ads pour fuel on the fire — putting your best-performing messages in front of far more of the right people. But ads can't fix a weak offer or a confusing funnel. Get the engine right first, then scale it.

## The takeaway

Social media that sells isn't about doing more — it's about doing the right things, consistently, with a clear path to a sale. Build the engine once and it keeps working.

Want us to build it for you? [Have a look at our services](/services) or [book a call](/contact).`,
  },
  {
    slug: "automate-your-admin",
    title: "Drowning in admin? How AI automation buys back your week",
    description:
      "Growth creates a hidden tax: admin. Emails, follow-ups, data entry, reporting. Here's how smart automation with n8n hands those hours back to you.",
    date: "2026-04-29",
    author: "Voltara Digital",
    category: "Automation",
    readingMinutes: 6,
    content: `Here's a problem most businesses are thrilled to have, and completely unprepared for: marketing starts working, leads start flowing — and suddenly you're buried in admin.

More enquiries means more emails to answer, more details to log, more follow-ups to remember, more reports to pull together. The very success you wanted starts eating the time you needed to deliver the work.

This is the moment automation earns its keep.

## The busywork tax

Every growing business pays a hidden tax in repetitive tasks. Individually they're small — copy a lead into the CRM, send a "thanks, we'll be in touch" reply, chase an unpaid invoice, update a spreadsheet. Together they quietly consume hours every week and, worse, they're easy to drop when you're busy. A forgotten follow-up is a lost customer.

> The tasks most worth automating are the boring, repeatable ones you do the same way every time. Computers love those. You shouldn't have to.

## What "AI automation" actually means

Automation isn't about replacing people — it's about removing the tedious glue work between your tools so your team can focus on what humans are actually good at. A few examples we set up regularly:

- **Lead capture → CRM.** A new enquiry from your website, ads or DMs lands in your CRM automatically, tagged and ready — no copy-paste.
- **Instant follow-up.** New leads get a personalised reply within seconds, so you never lose someone to a slow response.
- **Nurture sequences.** Prospects who aren't ready yet receive helpful, well-timed emails until they are.
- **Reporting on autopilot.** Your key numbers get pulled together and delivered to your inbox every Monday morning.
- **AI-assisted replies.** Draft responses to common questions are generated for you to approve in a click.

## Why we build on n8n

We build most automations on [n8n](https://n8n.io) — a flexible workflow tool that connects to the apps you already use (Gmail, your CRM, Slack, Notion, Sheets, Stripe and hundreds more). Two reasons we like it for SMEs:

1. **It's yours.** Workflows can run on your own account, so you're not locked into a black box you don't control.
2. **It scales with you.** Start with one simple automation and add more as you grow — no rip-and-replace.

Where it makes sense, we layer AI on top — for drafting replies, summarising enquiries, or routing messages — so the system gets smarter, not just faster.

## Start small, compound fast

You don't automate everything on day one. We start with the one or two workflows that are costing you the most time or losing you the most leads, prove the value, then expand. A single well-placed automation can hand back several hours a week — time you reinvest in customers and growth.

## The takeaway

Marketing fills your pipeline. Automation makes sure that growth doesn't bury you. Together, they're a business that scales its revenue without scaling its stress.

Curious what we could automate for you? [Book a free call](/contact) and we'll find your biggest time-sinks.`,
  },
];

export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
