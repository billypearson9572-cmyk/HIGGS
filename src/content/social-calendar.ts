/**
 * 30-day social media content calendar for Voltara Digital.
 *
 * Four content pillars rotate through the month:
 *   problem     – surface the pain points SMEs feel
 *   education   – explain what AI automation actually does
 *   proof       – case studies and results
 *   leadership  – market trends and honest takes
 *   offer       – direct CTA to the free AI audit
 *
 * Posting cadence:
 *   LinkedIn  – 3× per week (Mon / Thu + 1 flex)
 *   X         – 3–4× per week
 *   Instagram – 2–3× per week
 *
 * Usage:
 *   Copy the `caption` directly.  For LinkedIn posts, paste the link to
 *   voltaradigital.com/contact in the FIRST COMMENT — not in the post body
 *   (external links cut reach by ~60 % on LinkedIn).
 *   For X threads, each item in `thread` is a separate tweet in order.
 *   For Instagram, pair the caption with the described `visual`.
 */

export type Platform = "linkedin" | "x" | "instagram";
export type Pillar = "problem" | "education" | "proof" | "leadership" | "offer";

export type SocialPost = {
  id: number;
  week: 1 | 2 | 3 | 4;
  day: string;
  platform: Platform;
  pillar: Pillar;
  /** For Instagram: what to film/design. For LinkedIn/X: omit or leave as note. */
  visual?: string;
  /** Main post copy. For threads, this is the opening tweet. */
  caption: string;
  /** X thread continuation tweets, in order. */
  thread?: string[];
  /** Instagram only. */
  hashtags?: string[];
  notes?: string;
};

export const socialCalendar: SocialPost[] = [
  // ─────────────────────────────────────────
  // WEEK 1 – THE PROBLEM (Awareness)
  // ─────────────────────────────────────────
  {
    id: 1,
    week: 1,
    day: "Monday",
    platform: "linkedin",
    pillar: "problem",
    caption: `Every growing SME pays a hidden tax nobody talks about.

It's not VAT. It's not payroll. It's the hours every week that disappear into tasks a computer could handle in seconds.

Data entry. Chasing leads who never replied. Copying information from one system to another. Writing the same reply to the same type of enquiry for the fifteenth time.

None of it is skilled work. None of it moves the business forward. But it eats time relentlessly — and the worst part is you're so used to it that it doesn't even register as a problem anymore. It just feels like work.

Here's what it's actually costing you:

If you're losing 10 hours a week to admin that could be automated — at a conservative value of £50/hour — that's £26,000 a year. Not in cash out of your pocket. In time you could have spent winning clients, improving your service, or simply getting home on time.

For most SME owners, the number is higher.

The irony is that automation has never been more accessible. The platforms that used to cost enterprise budgets now start at a few hundred pounds a month. A well-built system can recover those 10 hours within the first week.

The question isn't really "can we afford automation." It's "can we afford to keep doing this manually."

What's the one task you'd automate first if you could? Tell me below — I'm curious what's eating your team's time right now.`,
    notes: "Aim for 50+ comments. Reply to every one. Put voltaradigital.com/contact in the first comment.",
  },
  {
    id: 2,
    week: 1,
    day: "Tuesday",
    platform: "x",
    pillar: "problem",
    caption: `Speed of follow-up is the most underrated competitive advantage an SME has.

First to reply wins the deal. You're 9× more likely to convert a lead if you respond within 5 minutes vs 30.

AI makes you first. Every time. Even at 11pm.`,
  },
  {
    id: 3,
    week: 1,
    day: "Wednesday",
    platform: "instagram",
    pillar: "problem",
    visual: "Reel: Show a phone notification — new lead — then a clock ticking to 47 minutes, then the same person booking with a competitor. Short, punchy, no voiceover needed. Text overlays only.",
    caption: `You worked hard to get that lead. Then it sat in your inbox for 47 minutes.

Statistically, they called someone else.

Speed of reply is the #1 factor in lead conversion for SMEs. Most businesses lose deals not because their price is wrong — but because they were slow.

AI automation fixes this. New lead → instant personalised reply → CRM logged → you're notified. All in under 10 seconds.

👉 Drop a 🙋 in the comments if you want to know how.`,
    hashtags: [
      "#AIautomation",
      "#SMEuk",
      "#BusinessGrowth",
      "#SalesAutomation",
      "#SmallBusiness",
      "#LeadGeneration",
      "#UKBusiness",
      "#Automation",
    ],
  },
  {
    id: 4,
    week: 1,
    day: "Thursday",
    platform: "linkedin",
    pillar: "problem",
    caption: `Your last enquiry waited 3 hours for a reply.

Statistically, that cost you the job.

Research on lead response time consistently shows the same thing: respond within 5 minutes and you're 9 times more likely to convert. After 30 minutes, conversion rates fall off a cliff. After a few hours, most prospects have either moved on or called someone else.

This isn't about being bad at sales. It's about being human. You're in a meeting. You're on-site. You're dealing with the actual work of running a business. You can't watch your inbox.

But an AI system can.

The setup is simpler than most people think:

→ New enquiry comes in (website form, email, WhatsApp — whatever you use)
→ Personalised reply goes out in under 10 seconds
→ Lead is logged in your CRM automatically
→ You get a notification with all the context you need to follow up properly

You still make the call. You still close the deal. But you're no longer losing prospects before you even knew they were interested.

One of the most consistent results we see from clients after implementing this isn't a huge increase in leads. It's a significant increase in what they do with the leads they already have.

If you're an SME getting enquiries and wondering why your conversion rate isn't what it should be — I'd start here.`,
    notes: "Put the free audit link in the first comment.",
  },
  {
    id: 5,
    week: 1,
    day: "Friday",
    platform: "x",
    pillar: "problem",
    caption: `5 signs your business is ready for AI automation:`,
    thread: [
      `1/ You're re-entering the same data in multiple places.

If a lead comes in and you're copying it from your email into a spreadsheet into your CRM — that's not work. That's a setup for errors. Automation eliminates it.`,
      `2/ Your follow-up relies on memory.

"I should chase that one" is not a system. Leads that don't get followed up don't convert — they go cold. Automation does the chasing automatically, every time.`,
      `3/ You're always the last to know your own numbers.

If pulling a weekly sales report takes more than 5 minutes, something is wrong. Dashboards and automated reports exist. You should be using them.`,
      `4/ Good enquiries go cold because you were too busy.

A great lead arrives. You're slammed. You mean to reply tomorrow. By then they've hired someone else. AI responds instantly. You follow up when you're ready.`,
      `5/ You keep doing the same task the same way, every time.

That's the definition of something that should be automated. If it's repetitive, rules-based, and you've done it more than 10 times — it's a candidate.

If 3+ of these sound familiar, DM me. Happy to give you an honest take on where to start.`,
    ],
    notes: "Post each thread tweet 10-15 mins apart for best reach.",
  },

  // ─────────────────────────────────────────
  // WEEK 2 – EDUCATION (What it actually is)
  // ─────────────────────────────────────────
  {
    id: 6,
    week: 2,
    day: "Monday",
    platform: "linkedin",
    pillar: "education",
    caption: `When I say "AI sales automation," people immediately picture spam bots sending 10,000 cold emails.

That's not it. Let me explain what it actually does.

Good AI sales automation is a system that handles the parts of your sales process that don't require human judgment — so you can focus on the parts that do.

Here's what that looks like in practice:

**Lead sourcing and enrichment**
Instead of manually searching or buying a list and hoping for the best, an AI system identifies prospects who match your ideal customer profile, finds their contact information, and enriches it with context before you ever look at it.

**Qualification**
Not every lead is worth your time. An AI system asks the right questions automatically, scores the response, and surfaces only the ones worth following up on. You're talking to people who've expressed real intent — not chasing tyre-kickers.

**First response and follow-up**
Speed matters. An automated first response goes out immediately, acknowledges the enquiry, and keeps the conversation warm while you get to it. Follow-up sequences ensure that "interested but not ready" leads don't fall through the cracks.

**Pipeline management**
Leads move through stages automatically based on what's happened: replied, booked a call, gone quiet for a week. Your CRM is always current. You always know where every deal sits.

What you still do: the conversations that actually matter. Strategy, relationship, closing. The things that genuinely need a human.

The goal isn't to replace the sales process. It's to make sure the process happens — every time, at the right speed, without the admin.

Any questions about what this would look like for your business? Ask below.`,
  },
  {
    id: 7,
    week: 2,
    day: "Tuesday",
    platform: "x",
    pillar: "education",
    caption: `"AI automation" ≠ spam bots.

It means:
→ Leads qualify themselves before you call
→ Follow-ups happen while you sleep
→ Your CRM stays current without you touching it
→ You call the people who are actually ready to buy

The admin disappears. The conversations remain.`,
  },
  {
    id: 8,
    week: 2,
    day: "Wednesday",
    platform: "instagram",
    pillar: "education",
    visual: "Carousel (5 slides): Slide 1 — '3 automations every SME should have'. Slides 2-4 — one automation each with a simple icon, name, and one-line benefit. Slide 5 — CTA. Clean, minimal design on brand colours.",
    caption: `Most SMEs waste time on 3 things a system could handle.

Swipe to see the ones that pay for themselves fastest 👉

Starting with the most impactful: instant lead response. If your competitor replies first, you've already lost — even if your service is better.

Which one would help your business most? Drop it in the comments 👇`,
    hashtags: [
      "#Automation",
      "#SMEuk",
      "#BusinessOwner",
      "#AItools",
      "#SalesAutomation",
      "#UKStartups",
      "#SmallBusinessTips",
      "#WorkSmarter",
    ],
  },
  {
    id: 9,
    week: 2,
    day: "Thursday",
    platform: "linkedin",
    pillar: "proof",
    caption: `30 days ago, a client was manually chasing leads on WhatsApp.

Yesterday, they told us the system booked 11 meetings last week without them touching it.

Here's exactly what we built:

**The business:** a local service company getting 20–30 new enquiries a week via WhatsApp and their website contact form.

**The problem:** every enquiry needed a manual reply. The owner was juggling service delivery with sales. Leads were going cold — sometimes for 48+ hours — because there wasn't enough time in the day.

**What we built:**
– WhatsApp Business API connected to their enquiry flow
– AI handles initial qualification: service needed, location, rough timeline, budget range
– Qualified leads are added to their CRM automatically with full context
– Unqualified leads get a polite, helpful response and are logged for follow-up
– A daily digest hits the owner's inbox at 8am: who's warm, who needs calling, who's booked

**What changed in 30 days:**
→ Response time: 47 minutes average → under 60 seconds
→ Leads lost to slow follow-up: ~30% → near zero
→ Meetings booked: from untracked to 11 in the last 7 days
→ Hours per week saved: owner estimates 8–10

The total cost of the build: less than they were losing in a single week of missed leads.

This is what I mean when I say automation pays for itself. It's not a cost. It's a recovery.

If your lead response process has gaps in it, I'm happy to take a look — free, no pitch. Drop a comment or send me a message.`,
    notes: "Link to voltaradigital.com/contact in the first comment.",
  },
  {
    id: 10,
    week: 2,
    day: "Friday",
    platform: "x",
    pillar: "education",
    caption: `Controversial opinion:

Most SMEs don't need more leads.

They need a better system for the leads they're already losing.

Fix the leaks before you turn the tap up.`,
  },
  {
    id: 11,
    week: 2,
    day: "Saturday",
    platform: "x",
    pillar: "education",
    caption: `A business owner replied to our audit summary: "I didn't realise I was losing that much. I thought this was just how business worked."

It's not how it has to work.`,
  },

  // ─────────────────────────────────────────
  // WEEK 3 – MYTH-BUSTING + PROOF
  // ─────────────────────────────────────────
  {
    id: 12,
    week: 3,
    day: "Monday",
    platform: "linkedin",
    pillar: "education",
    caption: `"AI is too expensive for us."

I hear this from SME owners every week. I understand why — AI has a reputation for being an enterprise thing, with enterprise price tags.

Let me show you the actual maths.

**The old model:**
→ Enterprise AI platforms: £5,000–£20,000/month
→ Months of integration work
→ Technical teams to maintain it

**The 2026 model:**
→ Build cost for a complete lead automation system: £1,500–£4,000 depending on complexity
→ Monthly running costs (platforms + subscriptions): £150–£400
→ Setup time: days to a few weeks, not months
→ Ownership: yours, on platforms you control

Now the other side of the equation.

If your business is losing 2 leads a week to slow follow-up, and each lead is worth £500–£1,000, that's £1,000–£2,000 a month walking out the door. Every month.

Or: if your team is spending 10 hours a week on admin at a cost of £25/hour, that's £1,000/month doing tasks a computer could handle.

The automation pays for itself in the first month. And then every month after that is pure recovery.

"Too expensive" is the right reaction to the wrong version of the picture. The right question is: what is NOT having this costing me?

If you want the honest numbers for your business specifically, I'm happy to work through it with you. Free. No pitch. Just the maths.`,
    notes: "Link in first comment.",
  },
  {
    id: 13,
    week: 3,
    day: "Tuesday",
    platform: "x",
    pillar: "education",
    caption: `A missed follow-up costs more than a year of automation software.

Run the numbers on how many leads you're losing to slow response or no response.

Then tell me automation is expensive.`,
  },
  {
    id: 14,
    week: 3,
    day: "Wednesday",
    platform: "instagram",
    pillar: "proof",
    visual: "Reel (30–45 sec): Split screen or quick-cut before/after. Left/before: frantic inbox, sticky notes, missed calls, late-night admin. Right/after: phone on desk, notifications handled, calendar with meetings. Text overlay: 'Before AI automation / After AI automation'. No voiceover needed.",
    caption: `Before: 10 hours of admin. Leads waiting. Follow-ups forgotten.

After: the system handles it. You focus on the work that actually needs you.

The gap between businesses using AI and those not is widening every month.

This is what it looks like on the inside 👆

Want to know what we could automate for your business?

👉 Link in bio → Free AI audit.`,
    hashtags: [
      "#AIautomation",
      "#UKBusiness",
      "#BusinessOwner",
      "#WorkSmart",
      "#Productivity",
      "#SalesAutomation",
      "#SMEuk",
      "#BeforeAndAfter",
    ],
  },
  {
    id: 15,
    week: 3,
    day: "Wednesday",
    platform: "x",
    pillar: "education",
    caption: `The ROI on AI automation is easy to calculate.

Hours lost to admin per week × your hourly rate × 52 = your annual manual tax.

For most SMEs it's £15k–£40k.

That number doesn't change until you change it.`,
  },
  {
    id: 16,
    week: 3,
    day: "Thursday",
    platform: "linkedin",
    pillar: "proof",
    caption: `A landscaping company came to us drowning in WhatsApp messages.

45 unread enquiries. Jobs going to competitors. Owner checking his phone at midnight. No system, no process — just a constant, exhausting backlog.

Six weeks later, every enquiry is handled, every lead is tracked, and they've quoted 30% more jobs than the same period last month.

They haven't hired anyone.

Here's what we built, step by step:

**The intake system**
WhatsApp messages hit an AI assistant first. It asks for job location, type of work, rough timeline, and budget range. Most people answer — it feels like a conversation, not a form.

**Qualification**
Jobs outside their service area get a polite decline and a referral. Unserious enquiries are logged but deprioritised. Everything else goes straight into their pipeline.

**The follow-up**
Qualified leads who don't hear back within 48 hours get an automatic nudge. No lead goes cold because someone was too busy to chase it.

**The dashboard**
Monday morning: the owner opens a digest that tells him exactly where every live job opportunity sits, what's been quoted, what's awaiting a response, and what's been won or lost. Five minutes to get completely across the pipeline.

**The result after 6 weeks:**
→ Average response time: 2 hours → 4 minutes
→ Enquiries quoted: up 30%
→ Owner's time saved per week: ~12 hours
→ Midnight phone checks: zero

The system cost less than two missed jobs. It's been running for six weeks and hasn't needed us to touch it.

If your enquiry process has gaps in it, let's look at it together.`,
    notes: "Link to free audit in first comment.",
  },
  {
    id: 17,
    week: 3,
    day: "Friday",
    platform: "x",
    pillar: "education",
    caption: `3 myths about AI automation that are costing SMEs money:`,
    thread: [
      `Myth 1: "It's too expensive."

Reality: the build cost is usually recovered within a month. What's expensive is continuing to lose leads to slow follow-up and overhead admin.`,
      `Myth 2: "It's too complicated."

Reality: you don't need to understand how it works. You need to understand what it does for your business. A good agency abstracts all the complexity.`,
      `Myth 3: "My business is different — it won't work for me."

Reality: lead capture, follow-up, admin, and reporting work the same way across almost every service business. The inputs and outputs are different. The logic isn't.

What myth is stopping you? Let me know 👇`,
    ],
  },
  {
    id: 18,
    week: 3,
    day: "Saturday",
    platform: "instagram",
    pillar: "education",
    visual: "Behind-the-scenes Reel (30 sec): Quick cuts of the build process — a whiteboard workflow diagram, an n8n/Make canvas being built, a test run completing, a final result on a client's phone. Text overlays: 'Discovery → Build → Test → Launch'. Ends on the Voltara logo.",
    caption: `A day in the life: building an AI system for a client.

Discovery → mapping the workflow → building the automation → testing → launch.

Every business is different. The process is the same: find the leak, build the fix, measure the result.

This one cuts 8 hours of manual admin per week. The client gets that back permanently.

👉 Link in bio → Free AI audit.`,
    hashtags: [
      "#BehindTheScenes",
      "#AIagency",
      "#VoltaraDigital",
      "#Automation",
      "#BuildInPublic",
      "#UKstartup",
      "#SMEuk",
      "#AItools",
    ],
  },

  // ─────────────────────────────────────────
  // WEEK 4 – THOUGHT LEADERSHIP + OFFER
  // ─────────────────────────────────────────
  {
    id: 19,
    week: 4,
    day: "Monday",
    platform: "linkedin",
    pillar: "leadership",
    caption: `2014: businesses with a professional website had a meaningful edge. Customers searched, found you, trusted you.

2024: businesses with a real social media presence had the same edge. Visibility, authority, trust built in the feed.

2026: the edge belongs to businesses with AI systems.

The pattern is always the same: a new tool emerges, early adopters gain a compound advantage, then the technology becomes table stakes and the advantage disappears. The window to get ahead closes.

Websites are now expected. A business without one doesn't get considered. Social media presence is fast becoming the same.

AI is in that window right now.

The businesses adopting automation in 2026 aren't just saving time. They're building infrastructure:

→ Systems that respond to every lead instantly, around the clock
→ Pipelines that never forget a follow-up
→ Operations that scale revenue without scaling headcount

Their competitors, still running everything manually, have to work harder and harder to keep pace with businesses that have, in effect, grown their team without a single hire.

The gap isn't dramatic yet. But it compounds. And by the time it's obvious, it's expensive to close.

I don't say this to manufacture urgency. I say it because I've watched the same curve play out before, and the regret always sounds the same: "I wish I'd done this sooner."

The time is now. Not because of hype, but because the tools are ready, the cost is right, and the advantage is still available.

What's stopping you? I'm genuinely curious.`,
  },
  {
    id: 20,
    week: 4,
    day: "Tuesday",
    platform: "x",
    pillar: "leadership",
    caption: `"Do I really need this?"

Every business said that about websites in 2005.
Every business said that about social media in 2015.

The AI automation gap between businesses that move now and those that wait is going to look the same in 2030.

Early is still possible. It won't be for long.`,
  },
  {
    id: 21,
    week: 4,
    day: "Wednesday",
    platform: "instagram",
    pillar: "education",
    visual: "Carousel (6 slides): 'What a Voltara engagement looks like.' Slide 1 — title card. Slides 2–6: Step 1 Discovery call (we map your workflows), Step 2 Audit (we find the leaks), Step 3 Build (we build the system), Step 4 Launch (we test and go live), Step 5 Results (you get time back). Final slide: 'Free AI audit → link in bio'.",
    caption: `We get asked a lot: what do you actually do?

Swipe to see how a typical client engagement works, start to finish 👉

From the first conversation to a running system — usually 3–6 weeks.

Most clients see their first automation results within the first week of go-live. The compounding happens after that.

Curious what this would look like for your business?

👉 Link in bio → Free AI audit.`,
    hashtags: [
      "#VoltaraDigital",
      "#AIautomation",
      "#UKAgency",
      "#BusinessAutomation",
      "#SMEuk",
      "#HowItWorks",
      "#AIagency",
      "#DigitalTransformation",
    ],
  },
  {
    id: 22,
    week: 4,
    day: "Wednesday",
    platform: "x",
    pillar: "leadership",
    caption: `The businesses winning in 2026 aren't working harder.

They built systems that work for them.

Lead follow-up: automated.
Admin: automated.
Reporting: automated.

They're competing on strategy and relationships while everyone else competes on hours.`,
  },
  {
    id: 23,
    week: 4,
    day: "Thursday",
    platform: "linkedin",
    pillar: "offer",
    caption: `We do a free AI audit. Here's exactly what we look at.

Not a sales call. Not a pitch deck. An honest assessment of where automation would make the biggest difference for your business.

**1. Your current workflows (about 30 minutes)**
We map how enquiries come in, how they're handled, and how your team spends its week. Most business owners have never articulated this out loud — and seeing it laid out often reveals opportunities they hadn't noticed.

**2. The leak points**
Where are leads going cold? Where is time being lost to repetitive tasks? Where does a dropped ball happen most often? Every business has them. Finding them is the first job.

**3. The ROI estimate**
We calculate — honestly — what each automation opportunity is worth. Not in abstract efficiency metrics, but in time saved per week and revenue recovered from leads that currently don't convert.

**4. The recommendation**
What to automate first. What platforms make sense. What a realistic build looks like. What it would cost and when it would pay for itself.

What we won't do: recommend automation that doesn't make financial sense for you. If the numbers don't add up, we'll tell you. Some businesses aren't ready for automation yet, or have a simpler problem to solve first. We'd rather be honest and useful than sell something that doesn't fit.

The audit takes about an hour. You leave with clarity on where your biggest opportunities are — regardless of whether we work together.

If you're an SME spending too much time on admin, losing leads you worked hard to get, or just curious what AI could do for your business — let's book it.

Link in the first comment.`,
    notes: "Link to voltaradigital.com/contact in the first comment. This post typically converts well — boost it as a paid post once organic reach plateaus.",
  },
  {
    id: 24,
    week: 4,
    day: "Friday",
    platform: "x",
    pillar: "offer",
    caption: `If you run an SME and you're spending time on tasks that should be automated, we'll do a free AI audit.

No pitch. No obligation. An honest look at what's costing you the most — and whether automation is the right fix.

DM me or link in bio 👇`,
  },
  {
    id: 25,
    week: 4,
    day: "Friday",
    platform: "instagram",
    pillar: "offer",
    visual: "Static graphic or short Reel (15 sec): Clean card with the text 'Free AI Audit' large, then smaller: 'We map your workflow. Find the leaks. Tell you what to fix first.' End frame: voltaradigital.com. Brand colours.",
    caption: `Not sure if AI automation is right for your business?

We'll tell you — honestly — for free.

In about an hour, we'll map your current workflows, find where you're losing time and leads, and give you a clear picture of what automation could do for you.

No pitch. No obligation. Just useful.

👉 Link in bio → Free AI audit.`,
    hashtags: [
      "#FreeAudit",
      "#AIautomation",
      "#SMEuk",
      "#UKBusiness",
      "#VoltaraDigital",
      "#BusinessGrowth",
      "#Automation",
      "#SmallBusiness",
    ],
  },

  // ─────────────────────────────────────────
  // EVERGREEN EXTRAS (use to fill gaps or repurpose)
  // ─────────────────────────────────────────
  {
    id: 26,
    week: 1,
    day: "Saturday",
    platform: "instagram",
    pillar: "leadership",
    visual: "Static quote card: Large quote text on brand background. Voltara logo bottom right.",
    caption: `"The best time to automate was last year. The second best time is now."

Most SME owners know they need to fix their processes. The gap is always time — or thinking it's more complicated than it is.

It's usually simpler than you think. And faster.

What would you do with 10 extra hours a week? 👇`,
    hashtags: [
      "#AIautomation",
      "#SMEuk",
      "#WorkSmarter",
      "#BusinessOwner",
      "#UKBusiness",
      "#Automation",
      "#GrowthMindset",
      "#VoltaraDigital",
    ],
  },
  {
    id: 27,
    week: 2,
    day: "Saturday",
    platform: "linkedin",
    pillar: "leadership",
    caption: `A question I get almost every week from SME owners:

"Is it too late to start with AI automation?"

No. It's not too late. But here's the honest version of that answer:

It's not too late in the sense that the technology is accessible, affordable, and the people implementing it well are still a minority.

It IS getting later in the sense that the gap between businesses using automation and those that aren't is widening month by month. The businesses that moved in 2024 and early 2025 already have compounding systems. Their lead response is faster. Their pipelines are cleaner. Their teams are doing higher-value work.

You can still close that gap. But the longer you wait, the more ground there is to recover.

The best time to start was a year ago. The second best time is now.

If you're wondering where to begin, reply to this or send me a message — happy to point you in the right direction.`,
  },
  {
    id: 28,
    week: 3,
    day: "Monday",
    platform: "x",
    pillar: "proof",
    caption: `We ran the numbers on a client's missed follow-ups before we started working together.

In the 3 months before the automation: 34 leads that never got a second touchpoint.

At their average deal value: ~£27,000 in recoverable revenue.

The system cost £2,400 to build.

The maths is not subtle.`,
  },
  {
    id: 29,
    week: 4,
    day: "Monday",
    platform: "x",
    pillar: "leadership",
    caption: `The businesses that will look back on 2026 the same way they look back on not getting a website in 2008 or not starting social media in 2016:

The ones who said "we'll get to it."

What are you waiting for?`,
  },
  {
    id: 30,
    week: 4,
    day: "Saturday",
    platform: "instagram",
    pillar: "leadership",
    visual: "Short Reel (20 sec): Text-only, white on dark background. Words appear one by one: '2014 — the website edge. 2024 — the social media edge. 2026 — the AI edge.' Final frame: 'Which side are you on?' Voltara logo.",
    caption: `Every decade, one tool separates the businesses that grow from the ones that stall.

In 2026, it's AI automation.

The window is open. It won't stay that way.

👉 Link in bio — Free AI audit. Let's talk.`,
    hashtags: [
      "#AIautomation",
      "#UKBusiness",
      "#SMEuk",
      "#FutureOfWork",
      "#VoltaraDigital",
      "#BusinessGrowth",
      "#Automation",
      "#2026",
    ],
  },
];

/** All posts for a given platform, in calendar order. */
export function getPostsByPlatform(platform: Platform): SocialPost[] {
  return socialCalendar
    .filter((p) => p.platform === platform)
    .sort((a, b) => a.id - b.id);
}

/** All posts for a given week. */
export function getPostsByWeek(week: 1 | 2 | 3 | 4): SocialPost[] {
  return socialCalendar
    .filter((p) => p.week === week)
    .sort((a, b) => a.id - b.id);
}
