/**
 * Voltara Digital — 30-day social media content calendar.
 *
 * Platform strategy (current phase):
 *   PRIMARY   — Instagram Reels + feed posts (visual, algorithm-friendly, reaches trades/SME owners)
 *   PRIMARY   — Facebook page + Groups (where trades business owners actually are)
 *   FUTURE    — LinkedIn (once there are case studies, testimonials, and a track record to point to)
 *   OPTIONAL  — X/Twitter (low investment, low return for this audience right now)
 *
 * Facebook Groups worth posting in (organic reach, no ad spend needed):
 *   - Local business owner groups (e.g. "Business Owners [City]", "SME UK")
 *   - UK trades communities (e.g. "UK Plumbers & Gas Engineers", "Landscapers UK")
 *   - General entrepreneur/side-hustle groups where SME owners gather
 *   Strategy: post value-first (answer a question, share a tip), not a direct pitch.
 *   The profile/page link does the selling.
 *
 * Posting cadence:
 *   Instagram  — 4× per week (2 Reels + 1 carousel + 1 static/story)
 *   Facebook   — 3× per week (mix of feed + group posts)
 *
 * Content pillars:
 *   problem    – surface the exact pain points trades/SME owners feel
 *   education  – explain what AI automation is in plain English
 *   proof      – specific results and before/after scenarios
 *   myth       – bust the "too expensive / too complicated" objections
 *   offer      – direct CTA to the free AI audit
 *
 * Usage:
 *   Copy `caption` directly. For Facebook, links in the post body are fine.
 *   For Instagram, move the link to your bio and reference it in the caption.
 *   Each Instagram entry includes a `visual` field describing what to film/design.
 */

export type Platform = "instagram" | "facebook";
export type Pillar = "problem" | "education" | "proof" | "myth" | "offer";
export type Format =
  | "reel"
  | "carousel"
  | "static"
  | "story"
  | "feed-post"
  | "group-post";

export type SocialPost = {
  id: number;
  week: 1 | 2 | 3 | 4;
  day: string;
  platform: Platform;
  format: Format;
  pillar: Pillar;
  /** What to film, design, or set up. */
  visual?: string;
  /** Ready-to-post caption copy. */
  caption: string;
  /** Instagram only. */
  hashtags?: string[];
  /** Extra context for posting (timing, targeting, etc.). */
  notes?: string;
};

export const socialCalendar: SocialPost[] = [

  // ─────────────────────────────────────────
  // WEEK 1 – THE PROBLEM
  // Make them recognise their own situation.
  // ─────────────────────────────────────────

  {
    id: 1,
    week: 1,
    day: "Monday",
    platform: "instagram",
    format: "reel",
    pillar: "problem",
    visual: "Reel (20–30 sec, text overlays only, no voiceover needed). Show a phone with WhatsApp notifications stacking up — 1, 5, 12, 23 unread. Cut to: clock showing 7pm. Cut to: same phone, now showing a competitor's reply going out 4 minutes after the enquiry. End frame: 'While you were on the job, they booked the job.' Voltara logo fade in.",
    caption: `You're on a job.

A new enquiry comes through on WhatsApp.

You see it 3 hours later.

They've already booked someone else.

This happens to most trades businesses every single week.

It's not about being bad at sales. It's about capacity.

The fix isn't hiring a receptionist.

It's automation. 🔧

Drop a 🙋 if this has happened to you.`,
    hashtags: [
      "#tradeslife",
      "#plumber",
      "#electrician",
      "#landscaper",
      "#builder",
      "#UKtrades",
      "#smallbusiness",
      "#businessautomation",
    ],
    notes: "Post between 7–9am or 7–9pm — when trades owners are not on a job.",
  },
  {
    id: 2,
    week: 1,
    day: "Tuesday",
    platform: "facebook",
    format: "feed-post",
    pillar: "problem",
    caption: `Here's a number that should bother you:

The average SME takes 47 minutes to reply to a new enquiry.

Research shows you're 9× more likely to convert a lead if you reply within 5 minutes.

So if you're taking 47 minutes — and your competitor has an automated system that replies in under 60 seconds — you've already lost most of those deals before you even knew they were available.

This isn't about working harder. It's about having the right system.

If you're getting enquiries through your website, Facebook, or WhatsApp and your response process relies on you personally checking your phone — you're leaving money on the table every single day.

What does your current lead response look like? Be honest 👇

(We do a free audit to show you exactly what it's costing you — link in bio)`,
    notes: "Post in local business Facebook groups too, with a slightly softer opener like 'Quick question for business owners...'",
  },
  {
    id: 3,
    week: 1,
    day: "Wednesday",
    platform: "instagram",
    format: "carousel",
    pillar: "problem",
    visual: "5-slide carousel. Slide 1: bold text — 'The hidden cost of running your business manually'. Slides 2–5: one cost per slide with a simple icon. Keep it clean, brand colours. Slide 2: 'Speed — leads go cold in under 30 minutes'. Slide 3: 'Time — 8–12 hours a week on admin that computers could do'. Slide 4: 'Consistency — the follow-up that didn't happen because you were busy'. Slide 5: 'Energy — the mental load of trying to remember everything'. Final slide: 'You didn't start your business to spend it on this.' + Voltara logo.",
    caption: `Nobody warns you about the hidden costs of running everything manually.

Not the obvious ones. The ones that build up slowly. 👆

Swipe through — be honest about how many apply to you.

The good news: every single one of these is solvable.

👉 Link in bio — free AI audit, no obligation.`,
    hashtags: [
      "#businessowner",
      "#SMEuk",
      "#tradeslife",
      "#worksmarter",
      "#AIautomation",
      "#UKbusiness",
      "#entrepreneur",
      "#smallbusinessowner",
    ],
  },
  {
    id: 4,
    week: 1,
    day: "Thursday",
    platform: "facebook",
    format: "feed-post",
    pillar: "problem",
    caption: `How many of these sound familiar?

☐ You've missed an enquiry because you were on a job
☐ You've forgotten to follow up on a quote you sent
☐ You've copied the same information from one place to another more than once today
☐ You don't actually know your conversion rate off the top of your head
☐ Your "system" for chasing leads is a mental list

If you ticked 3 or more — your business is running on willpower, not process.

That works until it doesn't. Growth makes it worse.

The businesses pulling ahead right now have systems doing this for them automatically. Not because they're bigger. Because they got set up first.

What would you fix first? Tell me below 👇`,
    notes: "Post this in local trades/business Facebook groups. Opens a genuine conversation.",
  },
  {
    id: 5,
    week: 1,
    day: "Friday",
    platform: "instagram",
    format: "reel",
    pillar: "problem",
    visual: "Reel (30 sec). Split screen or sequential: LEFT — trades owner at 11pm, still on phone, replying to WhatsApp enquiries one by one, tired, kids in background. RIGHT — same owner, 6pm, phone down, dinner with family. Text overlay: 'Before: answering enquiries manually / After: AI handles it, you get notified of hot leads only'. End: 'You shouldn't have to choose between your business and your evening.'",
    caption: `Still replying to WhatsApp messages at 10pm?

That's not dedication. That's a missing system.

Your business should work for you — not the other way around.

AI automation means:
✅ Every enquiry gets an instant reply
✅ Leads are qualified automatically
✅ You only get notified when someone's actually ready to book
✅ You're done at a normal hour

This isn't for big companies. It's for businesses exactly like yours.

👉 Free audit in bio — find out what it would cost to set this up for you.`,
    hashtags: [
      "#worklifebalance",
      "#tradeslife",
      "#businessowner",
      "#AIautomation",
      "#UKtrades",
      "#worksmarter",
      "#automation",
      "#smallbusiness",
    ],
    notes: "High emotional resonance — work/life balance angle. Good for saves and shares.",
  },
  {
    id: 6,
    week: 1,
    day: "Saturday",
    platform: "facebook",
    format: "group-post",
    pillar: "problem",
    caption: `Quick question for anyone running a trades or service business:

What's your current process when a new enquiry comes in through WhatsApp or your website?

Do you have a system, or is it basically "reply when I get a chance"?

Asking because I work with a lot of small businesses on this and the gap between those with a proper process and those without is genuinely massive in terms of how many jobs they win.

Not pitching anything — just curious what people are actually doing.`,
    notes: "Post this in UK trades Facebook groups as a genuine conversation-starter. Do NOT include any links. Just ask the question. Respond to every comment. This builds presence in the community and drives profile/page visits.",
  },

  // ─────────────────────────────────────────
  // WEEK 2 – EDUCATION
  // Explain what automation actually is, simply.
  // ─────────────────────────────────────────

  {
    id: 7,
    week: 2,
    day: "Monday",
    platform: "instagram",
    format: "reel",
    pillar: "education",
    visual: "Reel (30–40 sec). Animated text walkthrough — no talking needed. Show a WhatsApp message arriving: 'Hi, I need a new bathroom fitting, can you do a quote?' → AI replies instantly: 'Hi! Thanks for getting in touch. We'd love to help. Quick few questions to get you the right info...' → AI asks 3 qualifying questions → Lead logged in CRM → Owner gets a notification: 'New qualified lead: bathroom refurb, £3k–£5k, Cheltenham, ready in 3 weeks'. End: 'You just won a lead in your sleep.'",
    caption: `This is what AI automation actually looks like for a trades business. 👆

Not robots. Not complicated tech.

Just a system that handles the first part of every enquiry — so by the time you see it, it's already qualified.

The setup takes a few weeks. After that, it runs on its own.

This is how businesses get more done without working more hours.

Any questions about how it works? Drop them below 👇`,
    hashtags: [
      "#AIautomation",
      "#tradeslife",
      "#plumber",
      "#landscaper",
      "#UKtrades",
      "#businesstips",
      "#automation",
      "#howitworks",
    ],
  },
  {
    id: 8,
    week: 2,
    day: "Tuesday",
    platform: "facebook",
    format: "feed-post",
    pillar: "education",
    caption: `When I say "AI automation" people immediately think spam bots.

Let me be clear about what it actually means for a small business.

It means: the parts of your sales process that don't need a human — get handled automatically, at the right speed, every time.

For a plumber or landscaper, that looks like this:

📲 New WhatsApp enquiry arrives
→ AI replies instantly, asks the right qualifying questions
→ Job is logged in your CRM with all the details
→ You get a notification with everything you need to call them back properly
→ If they go quiet, a follow-up is sent automatically after 48 hours

You still make the call. You still win the job. You still do the work.

But you're never the bottleneck anymore.

That's it. No robots. No magic. Just the right system.

Comment below if you want to know what this would cost for your business — happy to be straight with you.`,
  },
  {
    id: 9,
    week: 2,
    day: "Wednesday",
    platform: "instagram",
    format: "carousel",
    pillar: "education",
    visual: "5-slide carousel. Clean, bold design. Slide 1: 'What AI automation does for a trades business (no jargon)'. Slide 2: '1. Answers enquiries instantly — even at 11pm'. Slide 3: '2. Asks the qualifying questions for you'. Slide 4: '3. Logs the lead with full details, ready for your call'. Slide 5: '4. Follows up if they go quiet — so no lead falls through'. Final slide: 'You focus on the jobs. The system handles the enquiries.' + Voltara logo + 'Link in bio'.",
    caption: `"But what does AI automation actually DO?"

Glad you asked. Swipe through 👉

This is the setup we build for trades businesses. It doesn't replace you — it handles the parts that don't need you.

The result: more enquiries converted, less time on your phone, no leads falling through the cracks.

💬 Questions? Drop them below.
🔗 Free audit — link in bio.`,
    hashtags: [
      "#AIforTrades",
      "#plumber",
      "#electrician",
      "#landscaper",
      "#UKsmallbusiness",
      "#automation",
      "#businessgrowth",
      "#tradeslife",
    ],
  },
  {
    id: 10,
    week: 2,
    day: "Thursday",
    platform: "facebook",
    format: "feed-post",
    pillar: "proof",
    caption: `A landscaping business came to us getting 30–40 enquiries a week through WhatsApp.

The owner was spending 2–3 hours every evening just managing messages.

Jobs were going to competitors because replies were too slow.

Here's what we built for them:
→ WhatsApp AI assistant that replies instantly and qualifies each job
→ All leads automatically logged with full details
→ 3-step follow-up for quotes that hadn't been responded to

30 days later:
✅ Average response time: from 4 hours to under 5 minutes
✅ Owner saved 12 hours a week
✅ 30% more quotes sent (because no enquiry was missed)
✅ Zero messages to manage in the evening

The system cost less than the value of two missed jobs.

This is what AI automation actually looks like in the real world.

Is your enquiry process costing you jobs? Drop a comment or DM me — happy to take a look.`,
  },
  {
    id: 11,
    week: 2,
    day: "Friday",
    platform: "instagram",
    format: "reel",
    pillar: "proof",
    visual: "Reel (30 sec). Before/after split. BEFORE: screen recording (simulated) of a chaotic WhatsApp inbox — 45 unread, scrolling through them, manually typing replies one by one, clock showing 9pm. AFTER: single notification popping up — '3 new qualified leads today, 1 ready to book' — owner taps it, sees full details, makes one call. Text: 'From 3 hours of WhatsApp management to one 10-minute check.' End: Voltara logo.",
    caption: `From 45 unread WhatsApp messages every evening...

To one daily summary with only the leads worth calling. 📲

This is the difference between running your business and your business running you.

Real result from a real client. 30 days after setup.

Details 👉 link in bio (case study).

Could your enquiry process look like this? Free audit — find out.`,
    hashtags: [
      "#casestudy",
      "#AIautomation",
      "#tradeslife",
      "#UKtrades",
      "#landscaper",
      "#plumber",
      "#beforeandafter",
      "#businessresults",
    ],
    notes: "Link to the trades blog post or contact page in bio.",
  },
  {
    id: 12,
    week: 2,
    day: "Saturday",
    platform: "facebook",
    format: "group-post",
    pillar: "education",
    caption: `Something I see constantly with trades businesses:

They're getting enquiries but losing 20–30% of them just to slow response times.

The customer sends a WhatsApp, gets no reply for a few hours, and books someone else. Not because they preferred the other business — just because they got a reply first.

The fix is an automated first response. Not a generic "thanks for your message" — an actual reply that asks the right questions and feels like a real conversation.

Set it up once. It runs forever.

Has anyone done this? Would love to hear what you're using — always interested in what's actually working for people.`,
    notes: "Value-first post in trades groups. Opens a genuine conversation. Don't link to the website.",
  },

  // ─────────────────────────────────────────
  // WEEK 3 – MYTH-BUSTING
  // Handle the "too expensive / not for me" objections.
  // ─────────────────────────────────────────

  {
    id: 13,
    week: 3,
    day: "Monday",
    platform: "instagram",
    format: "reel",
    pillar: "myth",
    visual: "Reel (20 sec). Big text on screen: 'AI automation is expensive.' Pause. Text changes: 'Missing 4 leads a month at £500 each = £2,000/month gone.' Pause. 'AI setup: £2,500 one-time + £150/month.' Pause. 'Pays for itself in the first month.' Final: 'The expensive choice is doing nothing.'",
    caption: `"AI automation is too expensive for my business."

Let's run the maths. 👆

If you're losing 4 leads a month to slow follow-up or no follow-up (at a conservative £500 each), that's £2,000 a month leaving your business.

Every month.

The automation to fix that costs £2,500 to build and roughly £150/month to run.

Month 1: you're even.
Month 2 onwards: you're ahead.

The expensive choice isn't setting up the system.
It's continuing without one.

Free audit — what's it costing your business? Link in bio.`,
    hashtags: [
      "#mythbusted",
      "#AIautomation",
      "#tradeslife",
      "#UKbusiness",
      "#smallbusinessowner",
      "#businessgrowth",
      "#worksmarter",
      "#automation",
    ],
  },
  {
    id: 14,
    week: 3,
    day: "Tuesday",
    platform: "facebook",
    format: "feed-post",
    pillar: "myth",
    caption: `"AI is too expensive for a small business like mine."

I hear this a lot. Let me give you the honest numbers.

Building a proper automated enquiry and follow-up system for a trades business: typically £2,000–£3,500 to set up.

Monthly running costs (WhatsApp API + automation platform): roughly £100–£200/month.

Total first-year cost: approximately £3,200–£5,900.

Now the other side:

How many jobs are you losing every month because your reply was too slow, a quote was never followed up, or an enquiry got buried in your inbox?

For most trades businesses we speak to, it's 3–6 jobs a month.

At an average job value of £500–£1,000:
That's £1,500–£6,000 a month walking out the door.

The automation pays for itself in the first month.

Not the first year. The first month.

Still think it's expensive? I'd love to hear why — drop a comment.`,
  },
  {
    id: 15,
    week: 3,
    day: "Wednesday",
    platform: "instagram",
    format: "carousel",
    pillar: "myth",
    visual: "4-slide carousel. Clean design. Title slide: '3 myths about AI automation that are costing trades businesses money.' Slide 2: 'Myth: It's only for big companies. Reality: The most common users in 2026 are 1–10 person service businesses.' Slide 3: 'Myth: It's complicated to set up. Reality: A good agency handles everything — you use the result, not the tech.' Slide 4: 'Myth: It feels cold and impersonal. Reality: Customers get a faster, more helpful reply. They never know it's automated.' Final: 'The only expensive myth: thinking your manual process is fine.'",
    caption: `Still on the fence about AI automation?

These 3 myths might be why. Swipe 👉

The trades businesses pulling ahead right now aren't bigger or better resourced than you.

They just stopped doing things manually that a system could handle.

What's the myth holding you back? Drop it below and I'll give you the honest answer.

🔗 Free audit — link in bio.`,
    hashtags: [
      "#mythbusted",
      "#AIautomation",
      "#tradeslife",
      "#UKtrades",
      "#plumber",
      "#electrician",
      "#businesstips",
      "#smallbusiness",
    ],
  },
  {
    id: 16,
    week: 3,
    day: "Thursday",
    platform: "facebook",
    format: "feed-post",
    pillar: "myth",
    caption: `"My customers wouldn't like talking to a bot."

Fair concern. Here's the reality.

A well-designed AI assistant doesn't feel like a bot.

It feels like a responsive, professional business that replies quickly and asks the right questions.

What customers actually experience:
✅ Instant reply, any time of day
✅ A conversation that gathers what they need to share
✅ Confirmation that someone will be in touch

What they don't experience:
❌ Waiting 4 hours for a reply
❌ Crickets over the weekend
❌ Being told to "call back during business hours"

The "bot" question is almost always about bad bots. A good one is indistinguishable from a sharp admin.

And if you're a one-person landscaping business, you probably don't have an admin. That's the whole point.

Thoughts? Happy to discuss in the comments.`,
  },
  {
    id: 17,
    week: 3,
    day: "Friday",
    platform: "instagram",
    format: "reel",
    pillar: "myth",
    visual: "Reel (25 sec). Screen recording showing two identical enquiries coming in at the same time: 'Hi, can you quote for a new bathroom?' One goes to a business with no automation — it sits unread for 3 hours. One goes to an automated system — instant personalised reply in 30 seconds, follow-up questions asked. Cut to: customer books the one that replied. Text: 'You had the same lead. The system made the difference.' End: Voltara logo.",
    caption: `Same lead. Same job. Same price range.

One business replied in 30 seconds.
One replied 3 hours later.

Guess who got the booking? 🤷

It's not about being better at your trade.
It's about having a better system.

The good news: the system is buildable, affordable, and runs on its own.

Free audit 👉 link in bio.`,
    hashtags: [
      "#leadsmanagement",
      "#AIautomation",
      "#tradeslife",
      "#plumber",
      "#UKtrades",
      "#businesssystems",
      "#worksmarter",
      "#automation",
    ],
  },
  {
    id: 18,
    week: 3,
    day: "Saturday",
    platform: "facebook",
    format: "group-post",
    pillar: "myth",
    caption: `One thing I've noticed helping trades businesses with their systems:

The ones losing the most leads are usually the busiest.

Not because they're doing anything wrong. Just because when you're slammed, you physically can't keep up with enquiries at the same time.

And the irony is that being busy makes the problem worse — more work = more leads coming in = less time to respond = more leads lost.

The solution isn't working harder. It's a system that handles the first response for you.

Has anyone found a good way to manage this? Genuinely curious what people are doing.`,
    notes: "Conversation-starter in trades groups. No pitch, just genuine curiosity. Respond to every comment.",
  },

  // ─────────────────────────────────────────
  // WEEK 4 – THE OFFER
  // Make it easy to take the next step.
  // ─────────────────────────────────────────

  {
    id: 19,
    week: 4,
    day: "Monday",
    platform: "instagram",
    format: "reel",
    pillar: "offer",
    visual: "Reel (30 sec). Founder-to-camera (or clean text if no video). Direct address: 'If you run a trades or service business in the UK and you're losing leads because you can't reply fast enough — I want to show you exactly what to fix.' Walk through: 1. We map how enquiries come in, 2. We find where leads are going cold, 3. We build a system that handles it automatically. End: 'Free. No obligation. Takes about an hour.' Link in bio.",
    caption: `Straight talk:

If you're a trades business owner losing jobs to slow follow-up, I can show you exactly what to fix.

Here's what a free AI audit looks like:

1️⃣ We map how enquiries currently come in (WhatsApp, website, phone, Facebook)
2️⃣ We find where leads are going cold — and how many you're losing
3️⃣ We show you exactly what an automation would do and what it would cost

No pitch. No pressure. Honest advice.

Some businesses aren't ready for automation yet. We'll tell you that too.

The audit takes about an hour. You leave knowing exactly where the leaks are.

👉 Link in bio to book yours.`,
    hashtags: [
      "#freeaudit",
      "#AIautomation",
      "#tradeslife",
      "#UKtrades",
      "#plumber",
      "#electrician",
      "#landscaper",
      "#businessgrowth",
    ],
  },
  {
    id: 20,
    week: 4,
    day: "Tuesday",
    platform: "facebook",
    format: "feed-post",
    pillar: "offer",
    caption: `We do a free AI audit for trades and service businesses.

Here's exactly what happens:

**1. We look at your enquiry process (30 mins)**
How do leads come in? What happens after? Where are they being lost? Most business owners have never mapped this out — seeing it clearly is valuable in itself.

**2. We calculate the cost of the leaks**
How much revenue is going to slow responses, missed follow-ups, and uncontacted quotes? For most SMEs, the number is bigger than expected.

**3. We show you what automation would do**
What a system looks like for your specific business, what it would cost, and when it would pay for itself.

**What we won't do:**
Recommend automation that doesn't make sense for your business. If the numbers don't stack up, we'll tell you. If you need something simpler first, we'll say that.

The audit is free. The conversation is honest.

If you're a trades or service business owner spending too much time on admin and losing leads you worked hard to get — this is for you.

Comment "AUDIT" or send me a message and I'll get you booked in.`,
    notes: "This is the main conversion post. Boost it as a Facebook ad targeting trades business owners in your area once organic reach plateaus.",
  },
  {
    id: 21,
    week: 4,
    day: "Wednesday",
    platform: "instagram",
    format: "carousel",
    pillar: "offer",
    visual: "5-slide carousel. Slide 1: 'What you get in a free AI audit'. Slide 2: 'Step 1 — We map your current enquiry process'. Slide 3: 'Step 2 — We find exactly where leads are going cold'. Slide 4: 'Step 3 — We show you what a fix looks like and what it costs'. Slide 5: 'Free. Takes an hour. No obligation.' + Voltara logo + 'Link in bio'.",
    caption: `Free AI audit — here's exactly what you get. 👆

No jargon. No sales pitch. Just an honest look at what your business could do better.

We work with trades and service businesses in the UK.

Most clients find 3+ leads a month they're currently losing.

That number alone usually makes the hour worthwhile.

👉 Link in bio to book.`,
    hashtags: [
      "#freeaudit",
      "#VoltaraDigital",
      "#AIautomation",
      "#UKbusiness",
      "#tradeslife",
      "#plumber",
      "#electrician",
      "#smallbusiness",
    ],
  },
  {
    id: 22,
    week: 4,
    day: "Thursday",
    platform: "facebook",
    format: "feed-post",
    pillar: "proof",
    caption: `Before working with us, one of our clients — a local plumbing and heating business — had this problem:

Every evening, 20–30 WhatsApp messages to wade through.
Quotes going out but no system for chasing them.
Leads going cold because there simply wasn't time to reply during the day.

The owner was working 10-hour days and still feeling behind.

Six weeks after we set up the system:

✅ Every enquiry gets an instant reply, even at midnight
✅ Qualified leads are logged automatically — he just gets a morning summary
✅ 3 missed quotes from the previous month came back after automated follow-up
✅ He's working the same hours, but his evenings are his again

The system hasn't changed what he does. It's changed what doesn't need him anymore.

If this sounds familiar — message me or comment "AUDIT" and I'll get you booked in for a free 1-hour review of your process.`,
  },
  {
    id: 23,
    week: 4,
    day: "Friday",
    platform: "instagram",
    format: "reel",
    pillar: "offer",
    visual: "Reel (20 sec). Clean, direct to camera or text-only. 'If you run a trades business and you've missed a job because you were too busy to reply in time — this is for you. Free audit. One hour. We find the leaks. We show you what to fix. No obligation.' End with Voltara logo and 'Link in bio'.",
    caption: `Last post of the week and I'll keep it simple:

If you run a trades or service business and you know your follow-up process isn't what it should be — let's fix it.

Free audit. One hour. Honest advice.

We'll tell you exactly where leads are going cold and what automation would cost to solve it.

No pressure, no contract, no obligation.

Just clarity.

👉 Link in bio.`,
    hashtags: [
      "#VoltaraDigital",
      "#freeaudit",
      "#AIautomation",
      "#tradeslife",
      "#UKtrades",
      "#plumber",
      "#electrician",
      "#landscaper",
    ],
  },
  {
    id: 24,
    week: 4,
    day: "Saturday",
    platform: "facebook",
    format: "group-post",
    pillar: "offer",
    caption: `Bit of a different post today:

I work with trades and service businesses on AI automation — specifically helping them handle enquiries, follow-ups, and admin without it eating up all their time.

I'm currently offering a free 1-hour audit where I'll look at your specific enquiry process and tell you honestly where you're losing leads and what it would cost to fix.

No pitch, no pressure. If it doesn't make financial sense for your business, I'll tell you that.

If you're curious, drop "AUDIT" below or send me a message directly.

Happy to have a straight conversation about whether this is right for you.`,
    notes: "Post this in local business groups and trades groups ONLY after 2–3 weeks of pure value-posting (posts 6, 12, 18). Do not post an offer in a group before you've built presence there.",
  },

  // ─────────────────────────────────────────
  // EVERGREEN / FLEX POSTS
  // Use these to fill gaps, repurpose, or react to comments.
  // ─────────────────────────────────────────

  {
    id: 25,
    week: 1,
    day: "Sunday",
    platform: "instagram",
    format: "story",
    pillar: "problem",
    visual: "Story poll: 'How do you currently handle new WhatsApp enquiries?' Option A: 'I reply as fast as I can' / Option B: 'Honestly, it's a bit chaotic'. Follow up with a second story: 'If you voted B — there's a fix for that. Tap to find out.'",
    caption: `Poll story — no caption needed. Use the results to inform future content.`,
    notes: "Stories with polls get high engagement and tell you a lot about your audience. Check poll results after 24 hours and DM everyone who voted B.",
  },
  {
    id: 26,
    week: 2,
    day: "Sunday",
    platform: "instagram",
    format: "static",
    pillar: "education",
    visual: "Static graphic. Quote on brand background: large bold text — 'The best time to automate your enquiry process was last year. The second best time is now.' Voltara logo bottom right.",
    caption: `Running your enquiry process manually is a choice.

It's just not a very good one anymore.

The tools are there. The cost makes sense. The results are real.

What's actually stopping you?

(Honest answers welcome in the comments 👇)`,
    hashtags: [
      "#AIautomation",
      "#businessowner",
      "#tradeslife",
      "#UKbusiness",
      "#worksmarter",
      "#growth",
      "#smallbusiness",
    ],
  },
  {
    id: 27,
    week: 3,
    day: "Sunday",
    platform: "facebook",
    format: "feed-post",
    pillar: "education",
    caption: `A question I get asked a lot:

"Do I need to be technical to use AI automation?"

Short answer: no.

Here's how it actually works when we set something up for a client:

1. We have a conversation about how their business works now
2. We design the system — they give feedback until it's right
3. We build it and test it thoroughly
4. We hand it over — they get a simple dashboard and a summary of what's happening

The client never touches the backend. They just see the results.

The only thing you need to do: know your own business. We handle the rest.

Any questions? Drop them below — happy to be straight with you.`,
  },
  {
    id: 28,
    week: 4,
    day: "Sunday",
    platform: "instagram",
    format: "reel",
    pillar: "education",
    visual: "Reel (25 sec). Show the 'morning summary' concept: phone notification pops up at 8am — 'Good morning. Here's your overnight summary: 4 new enquiries, 2 qualified, 1 is ready to book. Your top lead: James — bathroom refit, Cheltenham, budget £4k–£6k.' Owner picks up phone, makes one call, books the job. Text: 'This is what Monday morning should feel like.'",
    caption: `Monday morning without AI automation: 23 unread WhatsApps, 4 missed calls, 2 half-written quotes.

Monday morning WITH it: one notification. 2 hot leads. One call to make.

The work is the same. The system is different.

This is what we build. 🔧

Free audit — link in bio.`,
    hashtags: [
      "#mondaymotivation",
      "#AIautomation",
      "#tradeslife",
      "#plumber",
      "#UKtrades",
      "#businesssystems",
      "#worksmarter",
      "#automation",
    ],
  },
  {
    id: 29,
    week: 2,
    day: "Thursday",
    platform: "instagram",
    format: "story",
    pillar: "myth",
    visual: "Story Q&A prompt: 'What's your biggest concern about AI automation for your business?' — collect responses. Follow up with individual replies or a 'myths busted' post based on the most common answers.",
    caption: `Use the responses to fuel future content. DM everyone who replies with a genuine answer.`,
    notes: "This is a research tool as much as a content tool. The most common concerns become future posts.",
  },
  {
    id: 30,
    week: 3,
    day: "Wednesday",
    platform: "facebook",
    format: "feed-post",
    pillar: "proof",
    caption: `Quick maths for anyone on the fence about automation:

Take your average job value.
Multiply it by how many enquiries you get per week.
Estimate how many of those don't get a reply within an hour.
Multiply those by 0.3 (the rough conversion drop for slow response).

That number is what you're losing every week.

For a trades business doing 20 enquiries a week at £600 average, with 10 going unanswered quickly: that's 3 jobs a week. ~£1,800/week. ~£93,000/year.

Now compare that to the cost of an automation system (£2,000–£3,500 build, £150/month running).

The maths isn't subtle.

What does your number look like? Use the calculator on our site (link in comments).`,
    notes: "Link to the /lead-calculator page in the comments.",
  },
];

/** Posts for a specific platform, calendar order. */
export function getPostsByPlatform(platform: Platform): SocialPost[] {
  return socialCalendar
    .filter((p) => p.platform === platform)
    .sort((a, b) => a.id - b.id);
}

/** Posts for a specific week. */
export function getPostsByWeek(week: 1 | 2 | 3 | 4): SocialPost[] {
  return socialCalendar
    .filter((p) => p.week === week)
    .sort((a, b) => a.id - b.id);
}

/** Posts for a specific format (e.g. all Reels). */
export function getPostsByFormat(format: Format): SocialPost[] {
  return socialCalendar
    .filter((p) => p.format === format)
    .sort((a, b) => a.id - b.id);
}
