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
    slug: "word-of-mouth-ceiling",
    title: "Why word-of-mouth has a ceiling (and what to do about it)",
    description:
      "Referrals are the best customers you'll ever get — and the worst growth strategy you can rely on. Here's why, and how to build a system that doesn't depend on luck.",
    date: "2026-05-20",
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
    date: "2026-05-12",
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
    date: "2026-04-28",
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
