# AI Wedding Planner Prototype: Build Brief and User Stories for Claude Code

Oct 28, 2026 · @DIVYANSHU LILA

## How to use this brief

This brief is the single source of truth for the prototype: export this doc as Markdown, save it as `docs/user-stories.md` in `my-app`, then paste the starter prompt below into Claude Code.

### Starter prompt

```
Read CLAUDE.md, docs/research-report.md, docs/data-model.md and docs/user-stories.md completely before doing anything else.

You are the DIRECTOR. Build the prototype described in docs/user-stories.md, following the build order in its final section. For every epic: delegate to the agents named in the brief, have the budget-auditor and qa-tester review the result before you mark it done, update docs/data-model.md and docs/decisions.md as you go, and commit after each epic.

Start with Epic 0 (scaffold): show me the plan and the file tree, then continue epic by epic. After each epic report what was built, which agents you used, what is mocked, and anything you need from me. Do not add a backend, real payments, real AI calls or scraped data.
```

### Ground rules for every story

1. The prototype is frontend only: React + Vite + Tailwind, typed mock data in JSON/TS, and browser localStorage for persistence. No server, no database, no API keys.
2. Anything an AI, payment, WhatsApp, map or notification feature would do is simulated by a clearly labelled mock service in `src/services/mock/`, behind an interface a real service can replace later.
3. All money is INR, stored as integer rupees, shown in Indian digit grouping (₹12,50,000) with lakh/crore shorthand where space is tight. Never use floats for money.
4. Budget logic lives in `src/lib/budget/` as pure, unit-tested functions. The UI never computes budget numbers itself.
5. Mobile-first (360px wide), parent-friendly (16px+ text, large tap targets), English with switchable Hinglish labels.
6. Every mocked number or feature carries a small 'Demo' badge so nobody mistakes it for real data.
7. A story is done only when its acceptance criteria (AC) pass, qa-tester has walked through it, and no earlier epic broke.
8. When something is unclear, choose the simplest reasonable option, log it in `docs/decisions.md`, and keep going. Ask me only when blocked.

### Story format

Each story has an ID, an As a / I want / So that line, acceptance criteria, owner agents and a priority: **P0** = must exist in the prototype, **P1** = should, **P2** = stretch.

## Product vision, scope and tech stack

**Vision.** A budget-first, trust-first wedding planning and booking app for Indian families: one place to set a budget, see where every rupee should go, compare verified vendors, book with protected payments, and turn guest RSVPs into real savings.

**Positioning line.** Know what your wedding should cost, book verified vendors with protected payments, and stop paying for guests who don't come.

**Three differentiators the prototype must make obvious** (from the research report):

1. The budget engine: allocated vs committed vs paid, live overspend alerts, and a bottom-up cost model.
2. Verified-booking reviews: only people with a completed booking can review.
3. RSVP-to-cost: per-function guest forecasts that change catering plates, rooms and cars, with the rupees saved shown.

### Prototype scope

| In scope | Out of scope (mock or skip) |
| --- | --- |
| All screens and flows for couple/family users | Real backend, database, auth provider |
| Budget engine with real logic and tests | Real payments, escrow, UPI |
| About 120 realistic mock vendors across all categories, NCR-first | Scraped or live vendor data |
| Scripted AI assistant (rule-based, mocked 'LLM') | Real LLM calls |
| Simulated WhatsApp invite and RSVP flow | Real WhatsApp, SMS or email |
| Light vendor, planner and admin views | Full vendor SaaS, KYC, legal flows |
| Hinglish/English toggle | Full regional-language support |

### Tech stack

- React 18 + TypeScript + Vite, Tailwind CSS, React Router.
- State: Zustand (or React Context + reducer) persisted to localStorage, with a 'Reset demo data' button.
- Forms: React Hook Form + Zod validation. Charts: Recharts. Icons: lucide-react.
- Testing: Vitest for `src/lib/` logic, plus Playwright smoke tests for the main flows if time allows.
- Dates: date-fns. i18n: a simple dictionary keyed by `en` and `hinglish`.

### Suggested folder structure

```
src/
  app/            routes, layout, providers
  features/       onboarding, budget, vendors, booking, reviews,
                  guests, timeline, dayof, assistant, vendor-portal,
                  planner-portal, admin, family
  lib/budget/     allocation, cost model, optimiser, alerts (pure + tests)
  lib/rsvp/       attendance forecast, cost impact (pure + tests)
  services/mock/  ai, payments, whatsapp, maps, reviews-moderation
  data/           vendors.json, templates.json, price-index.json, seed weddings
  components/     shared UI
  i18n/           en.ts, hinglish.ts
docs/             research-report.md, user-stories.md, data-model.md, decisions.md
```

## Personas and roles

The prototype needs a persona switcher in the header (demo only) so reviewers can jump between views without logging in. Each persona gets seeded sample data.

| Persona | Who they are | What they need | Role in app |
| --- | --- | --- | --- |
| Couple (bride or groom), 26 to 32, urban | Wants a personalised wedding, drives style and vendor choice | Mood boards, transparent prices, a shared board with parents, fast comparison | `owner` |
| Parent / payer, 50 to 62 | Pays for most of it, controls venue, catering, guest list, rituals | One budget view, Hindi/Hinglish, large text, WhatsApp, payment protection, a human on call | `co_owner` |
| Extended family helper | Uncle, sibling or friend taking on tasks | Sees only assigned tasks and one function | `contributor` |
| NRI relative | Plans remotely | Video or photo walk-throughs, protected payments | `viewer` or `contributor` |
| Wedding planner | Runs multiple weddings | Multi-client board, budget engine per client, proposals | `planner` |
| Vendor (venue, caterer, photographer, etc.) | Wants bookings in a short season | Calendar, quote builder, guaranteed advances, reputation | `vendor` |
| Platform admin / concierge | Runs quality and disputes | KYC queue, moderation, disputes, supply health | `admin` |
| Guest | Receives the invitation | A beautiful invite, one-tap RSVP, travel and room info | no account (link only) |

### Seeded demo weddings

Seed at least three complete weddings so every screen has data on first load:

1. **Aarav and Meera**: Delhi NCR, mid tier, ₹35 lakh, 350 guests, Hindu Punjabi, 4 functions, in progress with some bookings and RSVPs.
2. **Rohan and Simran**: Udaipur destination, premium, ₹80 lakh, 220 guests, 5 functions, shows rooms, guest travel and an overspend alert.
3. **Karan and Anjali**: Gurugram, budget tier, ₹12 lakh, 180 guests, brand-new, so onboarding and empty states can be demoed.

## Epic 1: Onboarding and wedding profile

Goal: capture everything the budget engine and vendor matching need in under 3 minutes for the essentials, then enrich progressively. Owners: ui-ux-lead, wedding-planner, data-architect.

**US-1.1 Sign up (mock) · P0 · ui-ux-lead** As a new user, I want to create an account with my name, phone number and role so that the app knows who I am.

- Phone OTP is simulated (any 6 digits work, labelled Demo). Roles offered: Bride, Groom, Parent, Family member, Planner.
- Language choice (English / Hinglish) is asked first and applies at once.
- A returning user can skip sign-up from the persona switcher.

**US-1.2 Basic couple details · P0** As a couple, I want to enter our names, home cities and contact details so that invitations and plans are personalised.

- Fields: bride name, groom name, each side's home city, WhatsApp number, who is planning (couple, parents, both, planner).
- Names appear on the dashboard, invitation and budget ledger.

**US-1.3 Core wedding details (the 3-minute essentials) · P0** As a user, I want a short guided questionnaire so that I get a budget plan quickly.

- Steps shown one per screen with a progress bar: (1) location, (2) date, (3) budget, (4) guests, (5) functions, (6) top priorities, (7) style.
- **Location:** wedding city (NCR cities pre-filled for the demo), or 'Destination wedding: help me choose'. Venue type preference: hotel, banquet, marriage garden, farmhouse, resort/palace, community hall.
- **Date:** exact date, a range, or 'suggest muhurat dates', plus flexibility (fixed, plus/minus a week, any time in a month).
- **Budget:** total in INR (slider plus typed input), a toggle for 'excludes jewellery', and who pays what share (bride side, groom side, couple).
- **Guests:** expected count per function, with a quick 'same for all' option. Shows an indicative cost per guest as they type.
- **Priorities:** user ranks top 3 from venue, food, décor, photography, music/entertainment, outfits, guest experience, rituals. This feeds the optimiser.
- **Style:** pick from 6 to 8 visual mood cards (traditional royal, modern minimal, floral romantic, boho garden, heritage palace, pastel, etc.).

**US-1.4 Detailed preferences (progressive profile) · P0** As a user, I want to add more detail later so that recommendations improve without a long first form.

- A 'Complete your profile' card on the dashboard shows percentage complete and what each missing item unlocks.
- Fields: religion, community, sub-community; ritual specifics (pheras, nikah, Anand Karaj, church ceremony, kundali matching); food rules (veg only, Jain, no onion-garlic, alcohol yes/no/limited); share of outstation and NRI guests; elderly and accessibility needs (wheelchair access, minimal stairs, seating); kids count; baraat style (horse, band, dhol, vintage car); sustainability preference; planner involvement (DIY, partial, full service); vendors already booked; honeymoon plans; shagun approach (cash, gifts, registry fund).

**US-1.5 Community-based function templates · P0 · wedding-planner** As a user, I want the app to create the right functions automatically so that I don't have to remember every ritual.

- Templates for: Hindu North Indian (Punjabi, Marwari/Rajasthani, UP/Bihar), Sikh Anand Karaj, Muslim Nikah, Gujarati, Bengali, South Indian (Tamil, Telugu, Kannada, Malayali), Jain, Christian, and inter-faith/dual-ceremony.
- Typical functions offered: roka, sagai/engagement, mehendi, haldi, sangeet, cocktail, baraat, pheras/nikah/Anand Karaj/church ceremony, vidaai, reception, pagphere, post-wedding brunch.
- The user can add, remove, rename and reorder functions, and set date, time, venue and guest count per function.
- Each function carries a default vendor checklist (for example sangeet = venue, DJ, choreographer, stage/LED, catering; haldi = marigold décor, haldi kits, dhol).

**US-1.6 Muhurat date helper · P1** As a user, I want auspicious date suggestions so that we plan around real constraints.

- Mock muhurat list for Nov 2026 to Dec 2027 (Nov 2026: 21, 24, 25, 26; Dec 2026: 2 to 6, 11, 12; Kharmas pause to mid-Jan 2027; none during Chaturmas).
- Each suggested date shows a demand indicator (peak, normal, off-peak) and an estimated venue/décor price effect (peak about plus 20 to 25%).
- The helper states these are indicative and should be confirmed with the family pandit.

**US-1.7 Destination wedding helper · P1** As a couple considering a destination wedding, I want ranked destination ideas so that we can decide with cost in mind.

- Destinations: Udaipur, Jaipur, Jodhpur, Goa, Jim Corbett, Rishikesh, Mussoorie, Kerala, Mahabalipuram.
- Each card shows season suitability, rough per-guest cost, travel time from the user's home cities, and guest accommodation implications.
- A comparison of staying local vs destination shows the budget difference using the report's destination allocation (rooms and travel take a bigger share).

**US-1.8 Review and feasibility check · P0** As a user, I want to see a summary and an instant feasibility verdict so that I know whether my plan fits my budget.

- A summary screen lists every answer with an edit link per item.
- On confirm, the budget engine runs and shows one of: Comfortable, Tight, or Not feasible, with the top three trade-offs (for example 'Drop the cocktail night and save ₹4.2 lakh', 'Move from 12 Dec to 15 Jan to save about 20% on the venue').
- Creates the wedding, functions, default budget and checklist, then lands on the dashboard.

**US-1.9 Edit profile with impact notices · P0** As a user, I want to change details later and see what changes so that nothing silently breaks.

- Changing guests, date, city, functions or budget recalculates the budget and shows a before/after diff.
- Changing city warns that selected vendors outside the new city will be flagged, not deleted.

**US-1.10 Empty, loading and error states · P0 · ui-ux-lead** As a user, I want helpful empty states so that I always know the next step.

- Every list screen has an empty state with a clear call to action, a skeleton loader on simulated async calls, and a friendly error with retry.

## Epic 2: Budget engine

Goal: the 'CFO for the wedding'. This is the core differentiator, so it must be correct, tested and easy to understand. Owners: budget-auditor (review), ui-ux-lead, data-architect. All logic in `src/lib/budget/`.

### Default allocation priors (event budget, excluding jewellery)

These are synthesized priors from the research report. Store them in `src/data/allocation-priors.json` so they are easy to tune. Each column must sum to 100%.

| Category | Budget (₹8 to 15L) | Mid (₹15 to 50L) | Premium (₹50L to 1.5Cr) | Destination |
| --- | --- | --- | --- | --- |
| Venue (all functions) | 15% | 18% | 20% | 25% (incl. rooms) |
| Catering and bar | 38% | 30% | 25% | 22% |
| Décor, florals, lighting, tent | 10% | 13% | 16% | 14% |
| Photo and video | 7% | 8% | 8% | 7% |
| Couple attire | 8% | 7% | 6% | 5% |
| Makeup, mehendi, grooming | 3% | 3% | 3% | 3% |
| Music, baraat, choreography, anchor | 4% | 5% | 5% | 4% |
| Guest hospitality and transport | 3% | 4% | 5% | 10% |
| Invitations and return gifts | 3% | 3% | 3% | 2% |
| Rituals and pandit | 2% | 2% | 1% | 1% |
| Contingency (locked) | 7% | 7% | 8% | 7% |

### Cost model

The expected cost is built bottom-up from RSVP-adjusted headcount, never from the invite count:

```latex
Total = \sum_{events} (attendees_e \times perPlate_e \times cityMult \times seasonMult) + fixedCategories + rooms \times nights \times roomRate + contingency
```

Multipliers are mock data: metros about 1.2 to 1.35x tier-2 baselines, peak muhurat dates about 1.20 to 1.25x for venue and décor, weekday or off-peak about 0.85 to 0.9x.

**US-2.1 Automatic budget distribution · P0** As a user, I want the app to split my total budget across categories so that I know how much to spend on each.

- Picks the tier (budget, mid, premium, destination) from total budget, city and destination flag, and loads the matching prior column.
- Adjusts weights using the user's top-3 priorities (each priority category gains up to about 3 percentage points, taken proportionally from non-priority categories, never from contingency).
- Shows each category as ₹ amount, percentage and a one-line 'why' explanation.
- Allocations always sum exactly to the total (rounding remainder goes to the largest category). Unit-tested.

**US-2.2 Per-function sub-budgets · P0** As a user, I want each function to have its own budget so that I can see which function costs what.

- Category amounts are split across functions by weight (for example catering weight follows guests times meals per function).
- Editing a function's guest count or removing a function re-splits and shows the saving.

**US-2.3 Free editing with rebalancing · P0** As a user, I want to change any category amount freely so that the plan reflects what matters to us.

- Inline edit by typing or dragging a slider. A 'Rebalance' prompt offers one-tap options, for example 'Take ₹1.5L from Décor?'
- Lock icon per category so rebalancing never touches locked categories. The total changes only if the user edits the total directly.
- Reset to recommended at any time.

**US-2.4 Contingency protection · P0** As a user, I want a protected buffer so that surprises don't wreck the plan.

- Contingency defaults to 7 to 8% and is locked. Touching it requires a confirm dialog explaining the risk.
- Dashboard shows contingency remaining.

**US-2.5 Three-number ledger · P0** As a user, I want to see allocated, committed and paid for every category so that I always know where I stand.

- Allocated = plan. Committed = accepted quotes and bookings. Paid = money actually paid (including logged offline cash). Remaining = allocated minus committed.
- Live bars per category and a total bar. Offline cash payments can be logged manually and tagged 'offline'.
- Bride-side and groom-side views and a combined view, using the payer split from onboarding.

**US-2.6 Overspend alerts · P0** As a user, I want warnings before I overspend so that I can correct course early.

- Soft warning at 90% of a category, hard warning at 100%, and a critical alert if the overall plan exceeds the total or contingency would be touched.
- Every alert offers fix options: rebalance from another category, choose a cheaper vendor, trim guests, or drop a function.
- Alerts show on the dashboard, the budget screen, and when about to accept a quote.

**US-2.7 'Within budget' recommendations in booking · P0** As a user, I want vendor lists sorted to fit my budget so that I only see realistic options first.

- Each category screen shows the category's allocation and remaining amount at the top. Vendors within the remaining amount appear first, labelled 'Fits your budget', then 'Stretch' options with the exact overage shown.
- A suggested spend line says 'We suggest spending about ₹X here'.

**US-2.8 Scenario comparison · P1** As a user, I want to compare what-if scenarios so that I can make trade-offs with numbers.

- Compare up to 3 scenarios (for example 300 vs 400 guests, weekday vs weekend, 4 vs 5 functions, local vs destination).
- Output: total cost, per-guest cost, category differences, and a verdict.

**US-2.9 Constrained optimiser (Optimise my plan) · P1** As a user, I want the app to pick a good combination of vendors so that I get the best value for my priorities.

- Multiple-choice knapsack over the mock vendor price points: one option per category, maximising a utility score (priority weights times vendor quality/fit) subject to budget, category floors, distance and compatibility rules, and availability.
- Returns a proposed shortlist with total cost and an explanation of each pick. The user can accept all or swap any.
- Implement as a pure function with tests; a simple greedy plus local-search approach is acceptable for the prototype.

**US-2.10 Payment schedule calendar · P1** As a user, I want to see when payments are due so that I can plan cash flow.

- A calendar and list of upcoming milestones (advance, mid, final), per vendor and per side, with totals by month. Includes quote-expiry reminders.

**US-2.11 GST-inclusive comparison and per-guest view · P1** As a user, I want true all-in prices so that quotes are comparable.

- Toggle to show prices with or without GST. Per-guest cost view for catering and venue (all-in per guest including taxes).

**US-2.12 Budget report export · P2** As a user, I want to download a budget summary so that I can share it with family.

- 'Print/Save as PDF' view of the budget, ledger and payment schedule using the browser print stylesheet.

**Engine tests required (Vitest):** allocation sums to total for every tier; priorities shift weights but never below category floors; contingency never reduced by rebalancing; ledger math (allocated, committed, paid, remaining); alert thresholds at 90% and 100%; optimiser never exceeds budget; money is always integer rupees.

## Epic 3: Vendor discovery, comparison and AI assistant

Goal: category-by-category booking where families see only relevant, in-budget, nearby options, plus a mocked AI co-pilot. Owners: wedding-planner (data and rules), ui-ux-lead, budget-auditor.

### Vendor categories to support

| Group | Categories |
| --- | --- |
| Venue and stay | Hotels, banquet halls, marriage gardens, farmhouses, resorts/palaces, community halls, temple/gurdwara slots, guest room blocks |
| Food | Caterers, live counters, mithai, cake, bar setup, chaat stalls, crockery rental |
| Décor and production | Decorators, florists, mandap, tent house and furniture, lighting, sound and LED, generators, cold pyros |
| Rituals | Pandit/qazi/granthi, samagri, havan kund, astrologer, ritual items (varmala, chooda, kaleere, sehra) |
| Couple | Bridal and groom outfits (buy or rent), tailors, jewellery (buy or rent), trousseau, makeup and hair, mehendi artists, grooming |
| Entertainment | DJ, band, dhol, baraat band, ghodi, vintage car, anchor/emcee, choreographer, singers, photo booths, kids' zone |
| Media | Photographers, videographers, drone, pre-wedding shoot, albums, live streaming, reels creator |
| Guests | E-invites, printed cards, hampers and return gifts, hospitality desk, cabs and buses, airport pickups, valet, security, babysitters, first aid |
| Admin and finance | Marriage registration, lawyer, wedding insurance, loans/EMI, old-gold exchange |
| Post-wedding | Honeymoon, album delivery, thank-you cards, gift inventory |
| Miscellaneous | User-added free-text items (name, amount, owner, due date, notes) |

**US-3.1 Category hub · P0** As a user, I want a list of all booking categories with status so that I can work through them one by one.

- Shows every category relevant to my functions, with allocation, remaining amount, number booked, and status (not started, shortlisting, quote requested, booked).
- Order follows the recommended booking sequence (venue first, then catering, photography, décor, and so on) with a reason shown.
- The user can hide categories they don't need and add custom categories.

**US-3.2 Vendor list with smart filters · P0** As a user, I want to browse vendors for a category so that I can find good matches.

- City is a hard filter: a Delhi wedding shows only vendors serving Delhi (by city and service radius, with any travel fee shown).
- Filters: price range or per-plate range, capacity, rating, verified badge, availability on my date, distance from my venue, style tags, vegetarian/Jain options, in-house vs outside catering allowed, and amenities.
- Sorting: best match, price low to high, rating, distance, availability.
- Each card shows photo, name, area, price (with 'incl./excl. GST' label), rating with review count, verified badge, availability status, and a 'Fits your budget' or 'Stretch +₹X' tag.

**US-3.3 Venue-anchored compatibility rules · P0 · wedding-planner** As a user, I want vendors to make sense together so that I don't plan something impossible.

- After a venue is chosen it becomes the anchor: other vendors are ranked by travel time to it and out-of-area vendors show their travel fee.
- Venue rules are enforced and flagged: in-house catering only, décor exclusivity, DJ curfew and music cut-off time, alcohol licence, fireworks and baraat rules, capacity vs guest forecast, parking, power backup.
- Dependency hints: for example a garden venue prompts for tent house, generator and washrooms; an outside caterer is flagged if the venue charges a corkage or outside-catering fee.
- Conflicts appear as readable warnings with a suggested fix, never silent failures.

**US-3.4 Vendor profile page · P0** As a user, I want a full profile so that I can judge a vendor properly.

- Sections: gallery, packages and price points, what's included/excluded, taxes, overtime and cancellation policy, capacity, service area, availability calendar, verified documents (shown as badges: ID, GST, FSSAI, licences), ratings breakdown and reviews (Epic 5), response time, and similar vendors.
- Actions: shortlist, compare, request availability, request quote, share with family (opens the share sheet of the family board).

**US-3.5 Shortlist and compare · P0** As a user, I want to compare 2 to 3 vendors side by side so that I can choose confidently.

- Comparison table with all-in price (GST included toggle), per-guest cost, inclusions, exclusions, rating, distance, availability, cancellation terms, and a 'budget impact' row showing remaining budget after booking.
- Family members can vote or comment on shortlisted vendors (see Epic 7).

**US-3.6 Availability and date scarcity · P0** As a user, I want to know if a vendor is free on my date so that I don't waste time.

- Each vendor has a mock availability calendar. 'Request availability' returns a simulated response within seconds with a SLA label.
- If unavailable, suggests nearby dates (with price effect) and similar vendors available on my date.

**US-3.7 Mocked AI assistant (chat) · P0 · ui-ux-lead, wedding-planner** As a user, I want to type or speak what I need so that I get the best-matching options without filtering manually.

- A floating assistant available on every screen. Implemented as a rule-based intent engine in `src/services/mock/ai.ts` behind an `AssistantService` interface, with a Demo badge.
- Understands at least: vendor search with constraints ('veg caterer in Dwarka under ₹1,200 per plate for 400 guests, Jain counter, 12 Dec'), budget questions ('how much should I spend on décor?', 'can I afford a destination wedding?'), what-if questions ('what if we cut 100 guests?'), RSVP questions ('how many are coming to sangeet?'), ritual explainers, and next-step suggestions.
- Answers use only platform data (vendors, budget, guests) and cite it ('based on 6 caterers in your budget'). If it cannot answer, it says so and offers a concierge handoff.
- Hindi, Hinglish and English input accepted; a mocked voice-note button transcribes to a canned phrase for the demo.
- Results appear as vendor cards inline in chat with 'Add to shortlist' and 'Compare' buttons.
- Sponsored results are never mixed into 'best match'; any sponsored item is labelled.

**US-3.8 Quote X-ray (mock) · P1** As a user, I want to upload an offline quote so that I can spot hidden costs.

- User uploads or pastes a quote (a sample is provided). A mocked analyser returns line items, flags for missing GST, overtime, per-plate vs package confusion, and compares totals against the price index with a 'fair / high / low' verdict.

**US-3.9 Mood boards and style matching · P2** As a couple, I want to save inspiration so that vendors can match our style.

- Save images to a mood board per function; vendors are tagged by style so 'Match my style' can sort results.

**US-3.10 Custom and miscellaneous items · P0** As a user, I want to add anything not listed so that the plan covers everything.

- Free-text items with category, amount (estimate or actual), function, owner, due date, vendor name/contact (optional) and notes. They flow into the ledger and timeline like any other booking.

## Epic 4: Quotes, booking and simulated protected payments

Goal: make the quote-to-booking flow feel real, including milestone payments held by a simulated escrow. No real money moves. Owners: ui-ux-lead, budget-auditor, data-architect.

**US-4.1 Request a quote · P0** As a user, I want to request a structured quote so that I can compare real prices.

- Request form pre-fills date, function, guest count, venue and notes. The user can attach requirements (for example 'live counters: chaat and dosa').
- A simulated vendor response arrives after a few seconds as a structured quote with line items, GST, overtime charges, minimums, validity date, inclusions/exclusions and cancellation policy.
- Quote status: requested, received, negotiating, accepted, declined, expired.

**US-4.2 Quote comparison and budget impact · P0** As a user, I want to see what accepting a quote does to my budget so that I accept with eyes open.

- Before acceptance, a panel shows category remaining before and after, overall remaining, and any overspend alert (Epic 2.6).
- Accepting an over-budget quote needs an explicit confirm and shows the rebalance options.

**US-4.3 Counter-offer and negotiation (mock) · P1** As a user, I want to negotiate so that I can get a better price.

- 'Suggest a counter-offer' proposes a figure based on the price index (mock). The vendor responds with a canned accept, counter or decline.

**US-4.4 E-contract and booking confirmation · P0** As a user, I want a clear contract so that expectations are written down.

- Accepting a quote creates a booking with a generated summary contract (parties, date, function, deliverables, price, taxes, milestones, cancellation tiers, dispute process).
- 'Sign' is a simulated e-sign (type name, tick box). The booking then shows as confirmed in the category hub, ledger and timeline.

**US-4.5 Standard cancellation policy display · P0** As a user, I want to understand cancellation terms upfront so that there are no surprises.

- Tiered policy shown on every quote and contract (default: refundable minus a fee more than 120 days out; partial refund 60 to 120 days; non-refundable under 30 days). Vendor-specific variants allowed in mock data.
- Cancelling a booking simulates the refund per tier and updates the ledger.

**US-4.6 Milestone payments with simulated escrow · P0** As a user, I want to pay in milestones into protected escrow so that my money is safe until work is delivered.

- Default milestones: advance (booking), mid-point (a set time before the event), final (after delivery or the event). Editable per vendor in mock data.
- Payment screen simulates UPI, card and net banking (all fake) with a 'Demo payment, no money moves' banner. EMI/BNPL option is a mocked card showing sample instalments.
- Escrow status per booking: held, released, refunded. Release happens after user confirmation or auto-release after the event window (simulated by a button for the demo).
- Every payment updates 'Paid' in the ledger and generates a receipt view.

**US-4.7 Offline payments and cash log · P0** As a user, I want to record cash or offline payments so that my budget stays accurate.

- Add an offline payment against any booking (amount, date, mode, proof photo optional). Tagged 'offline', counted in Paid, but not covered by escrow protection (a notice explains this).

**US-4.8 Booking management · P0** As a user, I want one place to see all bookings so that I can track and change them.

- List and detail views: status, contract, payments, milestones, vendor contact (masked until a quote is accepted), change requests, and documents.
- Actions: request a change (date, guest count, add-ons) with simulated vendor response, cancel, raise a dispute, message vendor.

**US-4.9 Vendor messaging with masked contact · P1** As a user, I want to chat with vendors in the app so that records stay in one place.

- In-app chat thread per vendor with simulated replies. Phone numbers stay masked until a quote is accepted. Share-to-WhatsApp is a mocked action.

**US-4.10 Dispute and substitution (mock) · P1** As a user, I want recourse if a vendor fails so that I'm protected.

- 'Raise a dispute' flow with category, evidence upload and desired outcome. A simulated admin response shows holds on escrow release.
- A 'Find a substitute' button lists comparable available vendors for the same date and function.

**US-4.11 Wedding insurance and financing offers (mock) · P2** As a user, I want to see protection and financing options so that I can plan for risk and cash flow.

- A mocked partner card for wedding insurance (premium estimate based on budget) and loans/EMI (sample rates), clearly labelled as partner offers. Financing is not required for any flow.

## Epic 5: Verified reviews and trust

Goal: reviews families can believe. Only parties to a completed booking can review, which is the structural advantage over directory-style competitors. Owners: wedding-planner, data-architect, ui-ux-lead, qa-tester.

**US-5.1 Verified-booking reviews only · P0** As a user, I want reviews written only by real customers so that I can trust them.

- Only a user with a completed booking (paid via escrow, or an offline booking with a verified invoice or contract) can review that vendor. Each review shows a distinct badge: 'Verified: paid on platform' or 'Verified: offline invoice'.
- Trying to review without a booking shows a clear explanation, not an error.
- Guests who attended (QR check-in from Epic 6) can leave a lower-weight 'guest rating' on food, décor and experience, labelled separately.

**US-5.2 Structured review form · P0** As a customer, I want to rate specific things so that my review is useful.

- Ratings (1 to 5) for quality, value for money, punctuality, 'matched what was promised', and 'no hidden charges'. Optional free text, photos and short video.
- Private optional field: the final price paid (feeds the price index, never shown publicly per user).
- Two review prompts: 3 days after the event (service on the day) and 45 days after (deliverables and billing honesty). Both are simulated by a 'Fast-forward time' dev button.

**US-5.3 Review display and ranking · P0** As a user, I want to read reviews easily so that I can judge a vendor.

- Vendor profile shows overall score, dimension breakdown, rating distribution, verified count, and recent reviews with filters (verification level, function, rating, with photos).
- Score is a Bayesian average weighted by recency and verification level. The formula is documented in the code and in `docs/decisions.md`.
- Reviews cannot be edited after publishing; the author can only append an update, shown with a date.

**US-5.4 Vendor responses · P1** As a vendor, I want to reply publicly so that I can give my side.

- One public response per review, visible under it. Negative reviews are never removed unless they violate a posted policy.

**US-5.5 Moderation and fraud signals (mock) · P1 · admin view** As an admin, I want to catch fake reviews so that trust holds.

- Admin queue shows reviews with mocked fraud signals: shared device/IP, review ring within one family, sudden velocity spikes, near-duplicate or LLM-style text, mismatched photo metadata, price paid far from the vendor's norm.
- Actions: approve, hold, remove with reason (policy violation only), and request evidence. Every action is logged.

**US-5.6 Review policy page · P0** As a user, I want to know how reviews work so that I understand why to trust them.

- A public page explaining who can review, timing, no-edit rule, incentive rules (rewards never depend on sentiment), disclosure of solicited reviews, and moderation. It states the policy is aligned with the BIS review standard IS 19000:2022.

**US-5.7 Vendor trust badges · P0** As a user, I want to see what has been verified so that I know who is real.

- Badges earned, never sold: KYC verified, GST verified, FSSAI (caterers), licence verified (bars, venues), fire NOC (venues), calendar freshness, fast responder, zero-cancellation record, 'Verified by site visit'.
- Hovering a badge explains what was checked and when.

**US-5.8 Vendor reputation travels with the vendor · P2** As a vendor, I want my reputation to follow me so that I want to stay on the platform.

- Vendor profile shows lifetime verified-booking count and a 'Reputation passport' summary that is only available for platform-completed bookings.

## Epic 6: Guest management, digital invites and per-event RSVP

Goal: turn guest responses into forecasts that cut catering, room and transport spend, and show the rupees saved. This is the second signature feature. Owners: rsvp-guest-specialist, ui-ux-lead, budget-auditor. Logic in `src/lib/rsvp/`.

**US-6.1 Guest list builder · P0** As a host, I want to build my guest list quickly so that invitations can go out.

- Add guests one by one, via paste from a phone-contacts-style list, or CSV import (sample file provided). Guests are grouped into households (a household head plus members, adults vs children).
- Fields: name, phone, side (bride, groom, common), relationship tag (family, close friend, colleague, neighbour), city, outstation flag, invited functions, plus-one allowed, dietary needs, accessibility needs, notes.
- Duplicate detection by phone number, and bulk edit (invite a tagged group to a function).

**US-6.2 Per-function invitation matrix · P0** As a host, I want to choose who is invited to which function so that counts are accurate per event.

- A grid of households by function (haldi, mehendi, sangeet, pheras, reception, and so on) with tick boxes and totals per function, per side, and per relationship group.

**US-6.3 Digital invitation designer · P0** As a host, I want a beautiful invitation so that guests are delighted.

- Choose from at least 6 mock templates (traditional, royal, floral, minimal, South Indian, Sikh/Anand Karaj). Customise names, families, event details, venue map link (mock), dress code, and a short personal message.
- Language options: English, Hindi, Hinglish. Separate versions for bride and groom sides.
- Live mobile preview, and an optional animated or video-style open (CSS animation is enough).

**US-6.4 Send invitations via simulated WhatsApp · P0** As a host, I want to send each guest a unique link so that I can track responses.

- 'Send' opens a mocked WhatsApp preview per guest or per group and records a sent timestamp. A copy-link button gives a unique link per household.
- Sending a batch shows a simulated delivery report (sent, delivered, opened). The UI notes that invites would use utility-category messages in production (cost note in `docs/decisions.md`).

**US-6.5 Guest-facing invitation and RSVP page · P0** As a guest, I want to view the invitation and respond in a few taps so that the host knows I'm coming.

- No login. The unique link opens the invitation, then an RSVP step that lists only the functions I'm invited to.
- For each function: Yes / No / Maybe, number attending (adults, children), names of members, dietary needs (veg, Jain, non-veg, allergies), and accessibility needs.
- Optional: arrival and departure details, need for pickup, need for a room, plus-one name, and a note to the hosts.
- Hinglish one-tap style: a large 'Haan, aa rahe hain' button that defaults to the household size and can be refined. The head of household can respond for the household.
- A confirmation screen with 'Add to calendar' (mock) and a way to change the response later until a cut-off date set by the host.
- Works as the demo 'guest' persona and as a shareable route (`/invite/:token`).

**US-6.6 Host-entered RSVPs · P0** As a host, I want to record responses I got by phone or in person so that the list stays complete.

- Quick-add RSVP per household per function, marked 'entered by host'. Bulk 'mark all as coming' for close family.

**US-6.7 RSVP dashboard · P0** As a host, I want to see responses at a glance so that I know where we stand.

- Per function: invited, confirmed, declined, maybe, no response, with headcount (adults/children) and trend by day. Filters by side, relationship and city.
- One-tap reminders to non-responders (simulated), scheduled at T-30, T-14 and T-7 days. A 'cut-off date' countdown.
- Dietary summary (veg, Jain, non-veg, allergies) per function, ready to share with the caterer.

**US-6.8 Attendance forecast · P0** As a host, I want a realistic expected headcount so that I stop paying for guests who won't come.

- For each function the engine produces an expected attendance with a low/likely/high range, using confirmed, maybe and no-response guests.
- Default parameters (documented as assumptions, editable in an 'Assumptions' panel and in `docs/decisions.md`): confirmed guests show up 90 to 95% of the time (5 to 10% no-show); unconfirmed guests arrive 3 to 7% of the time; 'maybe' counts as a probability (default 50%); attendance for outstation and destination guests is lower. Western studies suggest 75 to 85% of invitees attend local weddings, so use that only as a prior before responses arrive and label it a placeholder.
- Segment by relationship, city and side; allow the host to override any guest's likelihood. Forecast improves as responses and QR check-ins arrive.

**US-6.9 RSVP-to-cost savings · P0** As a host, I want to see what the forecast saves so that I act on it.

- Linked to Epic 2: shows recommended guaranteed plates per function (for example forecast 520 vs 700 invited at sangeet: 140 fewer guaranteed plates and the rupee saving at the booked caterer's per-plate rate), room-block reductions, cars/buses, return gifts and seating.
- Buttons: 'Apply to budget' (updates the cost model's attendees), 'Share headcount with caterer', 'Ask venue to release rooms'. Each is simulated and logged.
- Warns about the risk of under-ordering and suggests a buffer percentage (default 5%).

**US-6.10 Hospitality and travel · P1** As a host, I want to manage rooms, pickups and transport so that guests are looked after.

- Room allocation board (drag guests or households into rooms, with room types and nights, capacity vs requests).
- Pickup roster by arrival time and location, with vehicle assignment and a printable driver sheet. Guest helpdesk contact shown on the guest page.

**US-6.11 Seating plan · P1** As a host, I want a simple seating tool so that tables are sorted early.

- Drag-and-drop tables per function with guest assignment, VIP tags, family blocks, and a conflict warning for separated households.

**US-6.12 QR check-in · P1** As a host, I want to check guests in at the event so that real attendance is recorded.

- Each household gets a QR code. A 'Check-in desk' screen simulates scanning (tap a guest) and shows live arrival counts vs forecast. Final attendance feeds the forecast accuracy report and the guest ratings (Epic 5).

**US-6.13 Shagun and gift register · P1** As a host, I want to track gifts and shagun so that I can thank people and reciprocate.

- Record gift, amount or item, giver, date and function; export a thank-you list. Fields are private to the hosts. Cash fund and registry ideas are shown as optional (P2).

**US-6.14 Guest data privacy · P0** As a host and as a guest, I want my data handled carefully so that privacy is respected.

- On first guest-list upload, a short notice explains purpose, retention and deletion. Guests see a one-line privacy note on the RSVP page.
- Hosts can delete the guest list or any guest. Collect only the fields needed. Document this against the DPDP Act duties in `docs/decisions.md`.

## Epic 7: Dashboard, timeline, functions and family collaboration

Goal: a single home screen and a shared planning space for the whole family, since Indian weddings are decided collectively. Owners: ui-ux-lead, wedding-planner, rsvp-guest-specialist.

**US-7.1 Home dashboard · P0** As a user, I want one screen that tells me where we stand so that I know what to do next.

- Cards: days to wedding (and to next function), budget health (allocated, committed, paid, remaining, contingency), top 3 next actions, profile completeness, booking progress by category, RSVP summary and forecast savings, upcoming payments, pending approvals, and alerts.
- A friendly 'What should I do this week?' suggestion generated from the timeline and budget state.

**US-7.2 Reverse-scheduled timeline and checklist · P0** As a user, I want an automatic plan so that nothing is forgotten.

- Tasks are generated backward from the wedding date, muhurat-aware: venue 9 to 12 months out, caterer and photographer 6 to 9 months, invitations sent 6 to 8 weeks out, outfits and makeup trials 2 to 3 months out, and so on.
- Each task has owner, due date, dependencies, status (to do, in progress, done), linked category or function, and notes. Views: list, calendar, and by function. Overdue and due-this-week highlights.
- If the date is too close for the template, the engine compresses the plan and flags the high-risk items.

**US-7.3 Function (event) pages · P0** As a user, I want a page per function so that each event is planned on its own.

- Each function page shows date/time/venue, sub-budget and spend, guest list and RSVP, vendors booked for it, checklist, dress code, run-of-show draft, and notes.
- Editable community ritual template with step-by-step items (for example haldi: sequence, items needed, who participates) that feeds the day-of run sheet.

**US-7.4 Family workspace and roles · P0** As a host, I want to invite family and assign roles so that everyone can help in the right way.

- Invite by phone or link (simulated). Roles: owner, co-owner (both sides), contributor, viewer, planner. Permissions are enforced in the UI (for example contributors can't see the full budget, viewers can't edit).
- Per-side cost visibility so each family sees their own share and the shared total.

**US-7.5 Approvals, polls and voting · P0** As a family, we want to decide together so that big spends don't cause conflict.

- Any booking or expense above a threshold set by the owners requires approval from the co-owner(s). Approvers get a simulated notification and can approve, reject or comment.
- Polls: shortlist vendors or options and let members vote with a visible tally.

**US-7.6 Comments, activity log and change history · P0** As a family member, I want to see what changed and why so that there are no surprises.

- Comments on any vendor, quote, task or function. A global activity feed ('Papa approved the caterer quote') with timestamps. Budget and booking changes are recorded in a change log with who and when.

**US-7.7 Task assignment and reminders · P1** As a host, I want to delegate so that the work is shared.

- Assign tasks to family members and see a per-person workload. Reminders are simulated and listed in a notification centre.

**US-7.8 Notification centre · P1** As a user, I want a single place for reminders and alerts.

- Types: payment due, quote received/expiring, approval requested, RSVP milestone, task due, overspend alert, vendor message. Marked read/unread. A mocked WhatsApp preview shows how the same alert would look as a WhatsApp message.

**US-7.9 Mobile-first and parent mode · P0 · ui-ux-lead** As a parent, I want a simple version of the app so that I'm not overwhelmed.

- 'Simple mode' toggle: larger text, fewer menu items, big buttons for the 5 most common actions (see budget, see bookings, approve, call planner, view guests), and Hindi/Hinglish labels by default.
- A visible 'Call my concierge' button (mock) on every screen.

## Epic 8: Day-of coordination and post-wedding

Goal: carry the app through the wedding days and close the loop with reviews, final accounts and thank-yous. Owners: wedding-planner, ui-ux-lead, rsvp-guest-specialist. The demo uses a 'Fast-forward time' dev control so reviewers can jump to T-7 days, wedding day and T+3 days.

**US-8.1 Live run-sheet · P0** As a host or coordinator, I want a minute-by-minute schedule so that the day runs smoothly.

- Built from function pages and booked vendors: time, activity, owner, vendor, location and status (pending, in progress, done, delayed). Delays shift dependent items and flag affected vendors.
- Printable and shareable as a simple read-only link.

**US-8.2 Vendor check-ins and contact tree · P0** As a coordinator, I want to know who has arrived so that I can step in early.

- Each booked vendor has an arrival slot and a simulated geo-tagged check-in button (vendor view). The coordinator sees a board of arrived, late, no-show, with one-tap call buttons (mock).
- An escalation tree lists who to call first for each category.

**US-8.3 Coordinator mode · P1** As a day-of coordinator, I want a stripped-down mobile view so that I can act fast.

- Shows only the run-sheet, vendor board, guest arrival counts, open issues and payment-release prompts. Large buttons, one-handed use.

**US-8.4 Issue log and standby vendors · P1** As a coordinator, I want to log problems so that they get solved.

- Create an issue (category, severity, owner) and resolve it. A 'standby vendors' list per category suggests substitutes if a vendor doesn't show.

**US-8.5 Payment release prompts · P0** As a host, I want clear prompts to release escrow so that vendors get paid on time and I stay protected.

- After the event window, each booking shows 'Everything delivered? Release final payment' with options: release, hold and raise a dispute, or partial release. Releasing updates the ledger and triggers the review prompt.

**US-8.6 Live guest arrivals · P1** As a host, I want to watch arrivals against the forecast so that I can adjust catering on the spot.

- Uses QR check-ins (US-6.12): shows arrived vs expected, per function, with an alert if food counters should be scaled.

**US-8.7 Final budget vs actual report · P0** As a user, I want a final accounting so that I know how it went.

- Shows plan vs actual per category, total savings or overspend, contribution of RSVP forecasting to savings, and vendor ratings. Printable.

**US-8.8 Review prompts and thank-yous · P0** As a customer, I want easy post-event steps so that I can close things out.

- Review prompts appear at T+3 and T+45 days (Epic 5). A thank-you flow lets hosts send WhatsApp-style messages (mock) to guests, linked to the shagun register.

**US-8.9 Album and deliverables tracker · P1** As a user, I want to track deliverables so that nothing is forgotten.

- Checklist of photo/video/album delivery with promised dates and reminders.

**US-8.10 Referral and next-life-event prompts · P2** As a user, I want rewards for referring friends and ideas for what's next so that I stay connected.

- Referral link with mock rewards, and suggestion cards for honeymoon, home setup and anniversary planning.

## Epic 9: Vendor, planner and admin views

Goal: show that the platform works for all sides of the marketplace, not just couples. These are light, demo-grade views using the same mock data. Owners: wedding-planner, data-architect, ui-ux-lead.

### Vendor portal

**US-9.1 Vendor onboarding (mock) · P1** As a vendor, I want to register quickly so that I can start receiving bookings.

- WhatsApp-style signup flow: business name, category, city and service radius, GST/PAN, bank details (penny-drop simulated), licences (FSSAI, liquor, fire NOC where relevant), portfolio upload, rate card, and cancellation policy.
- Status moves from submitted to under review to verified to live, with a checklist of what is pending.

**US-9.2 Availability calendar · P0** As a vendor, I want to manage my calendar so that I'm not double-booked.

- Month view with blocked, held (quote pending) and booked dates, peak/muhurat dates highlighted, and a 'last updated' freshness badge.

**US-9.3 Leads, quotes and bookings · P0** As a vendor, I want to handle requests so that I convert them.

- Inbox of availability and quote requests with event details. A quote builder with line items, taxes, overtime, minimums, validity and cancellation tier. Accept, decline or counter negotiations from couples.
- Bookings list with milestone status and expected payouts.

**US-9.4 Payouts and earnings · P1** As a vendor, I want to see money coming so that I can plan.

- Escrow-held, upcoming and released payouts, platform commission shown per booking (default demo 7%), and a payout history. Fast-payout promise displayed ('released within 48 hours of confirmation').

**US-9.5 Reviews and reputation · P1** As a vendor, I want to see and respond to reviews so that I can improve.

- Review inbox with response box (US-5.4), score trend, dimension breakdown, and badges earned and how to earn more.

**US-9.6 Price benchmarks · P2** As a vendor, I want to see city price benchmarks so that I can price competitively.

- Mock chart of my per-plate or package price against the median for my city, category and season.

### Planner portal

**US-9.7 Planner multi-client board · P0** As a planner, I want to manage several weddings so that I work efficiently.

- Client list with wedding date, budget health, next actions, overdue tasks, and RSVP status. Switching into a client wedding opens the same screens as the couple with planner permissions.

**US-9.8 Proposals and budget plans for clients · P1** As a planner, I want to build proposals so that clients can approve plans.

- Generate a budget plan from the engine, adjust it, pick vendors, and send to the client for approval (simulated). Planner fee and any vendor commission are entered and shown transparently to the client.

**US-9.9 White-label invites and RSVP · P2** As a planner, I want to brand invitations so that they carry my identity.

- Logo and colour options on the invitation and RSVP page.

### Admin and concierge

**US-9.10 Admin overview · P0** As an admin, I want a control room so that I can keep quality high.

- Dashboard: weddings in progress, GMV (mock), bookings, take rate, disputes open, reviews awaiting moderation, vendors awaiting verification, and supply health (vendors per category per peak date vs the target of 10 bookable).

**US-9.11 Verification queue · P1** As an admin, I want to verify vendors so that only real ones go live.

- Queue with KYC documents, licences, portfolio checks (reverse-image result mocked), reference call notes and site-visit status. Approve, reject or request more info, all logged.

**US-9.12 Disputes and escrow console · P1** As an admin, I want to resolve disputes so that families and vendors trust the platform.

- Dispute list with evidence from both parties, escrow status and actions (release, refund, split). Decisions are logged with a reason.

**US-9.13 Leakage and quality signals (mock) · P2** As an admin, I want to see warning signs so that I can act.

- Signals such as shortlisted vendors that go silent while their calendar shows a booking on that date, response time drops, and repeated cancellations.

## Epic 10: Differentiators and stretch features

Goal: out-of-the-box features from the research report that make the product memorable. Build only after Epics 0 to 9 pass. Each is demo-grade, mocked, and prioritised P1 or P2.

| ID | Feature | What the prototype shows | Priority |
| --- | --- | --- | --- |
| US-10.1 | Fair-price index and badge | A mock city and season price index. Vendor cards show 'Fair price', 'Above market' or 'Good deal' with the median beside it | P1 |
| US-10.2 | Off-peak and group deals | Banners that suggest weekday or non-muhurat dates and room-block discounts, with the exact saving in rupees | P1 |
| US-10.3 | Muhurat and availability optimiser | Picks the best date balancing auspicious dates, family availability (entered by the user) and price | P1 |
| US-10.4 | Negotiation assistant | Index-based counter-offer scripts the user can copy (also see US-4.3) | P1 |
| US-10.5 | Guest travel and accommodation booking | Suggests flights, trains and hotels near the venue for outstation guests with group-fare estimates (all mock) | P2 |
| US-10.6 | 3D décor and 360-degree venue previews | Image carousel and a mocked 'virtual walk-through' placeholder per premium venue/decorator | P2 |
| US-10.7 | NRI mode | Live-stream link placeholder, remote approvals, time-zone-aware reminders | P2 |
| US-10.8 | Inter-faith and dual-ceremony templates | Two ritual templates merged on one schedule with clash warnings | P2 |
| US-10.9 | Sustainability mode | Food-donation partner toggle, reusable décor options, and an estimated waste reduction | P2 |
| US-10.10 | Wedding insurance and EMI marketplace | Mock partner cards with premium and instalment estimates (see US-4.11) | P2 |
| US-10.11 | Cash-fund and home-setup registry | A page where guests can contribute to a fund via mocked UPI | P2 |
| US-10.12 | Vendor substitution guarantee | A visible promise and a flow that proposes substitutes within a set time (see US-4.10) | P2 |
| US-10.13 | Wedding website | A simple public page per wedding with story, schedule, travel info and RSVP link | P2 |
| US-10.14 | Honeymoon and life-event extensions | Cards for honeymoon, home and anniversary planning reusing the budget engine | P2 |

**Acceptance for every Epic 10 item:** it is reachable from the UI, labelled Demo where mocked, uses existing data rather than duplicating it, and does not break any earlier epic.

## Data model and mock data requirements

The data-architect owns `docs/data-model.md` and must update it whenever a structure changes. Design every entity as if it will become a PostgreSQL table: stable string IDs, foreign keys by ID, created and updated timestamps, and money as integer rupees.

### Core entities

| Entity | Key fields | Relationships |
| --- | --- | --- |
| User | id, name, phone, role, language | Member of Wedding(s) |
| Wedding | id, brideName, groomName, cities, community, totalBudget, excludesJewellery, tier, destination, dateMode, date, priorities, style, planningMode | Has Events, BudgetLines, Bookings, Guests |
| Member | weddingId, userId, role, side, approvalThreshold | Links User and Wedding |
| Event (function) | id, weddingId, type, name, date, time, venueBookingId, guestCountPlanned, dressCode | Has Tasks, RSVPs |
| BudgetLine | id, weddingId, category, eventId?, allocated, locked, source (recommended or edited) | Aggregates Bookings |
| Vendor | id, name, category, subcategory, city, areas, serviceRadiusKm, travelFee, priceFrom, priceUnit, capacity, tags, verifiedBadges, ratingAvg, reviewCount, responseTimeHrs, policies, venueRules | Has Packages, Availability, Reviews |
| Package | id, vendorId, name, price, unit (per plate, per day, flat), inclusions, exclusions, gstIncluded, overtimeRate, minimums | Belongs to Vendor |
| Availability | vendorId, date, status (free, held, booked) | Belongs to Vendor |
| Shortlist and Poll | weddingId, vendorId, votes, comments | Links Wedding and Vendor |
| Quote | id, weddingId, vendorId, eventId, lineItems, gst, validUntil, status, version | Becomes Booking |
| Booking | id, quoteId, status, contract, cancellationTiers, totalAmount | Has Milestones, Payments |
| Milestone and Payment | id, bookingId, label, dueDate, amount, mode, status, escrowState, offline | Belongs to Booking |
| Review | id, bookingId, vendorId, ratings by dimension, text, media, verificationLevel, pricePaidPrivate, response, createdAt, appendedUpdates | Belongs to Booking |
| Guest and Household | id, householdId, name, phone, side, relationship, city, outstation, dietary, accessibility, plusOneAllowed | Belongs to Wedding |
| Invitation | id, householdId, token, template, language, sentAt, openedAt, eventIds | Belongs to Household |
| RSVP | id, householdId, eventId, status, adults, children, names, dietary, needsPickup, needsRoom, enteredBy, updatedAt | Belongs to Household and Event |
| Forecast | eventId, low, likely, high, assumptions, computedAt | Derived, stored for history |
| Task | id, weddingId, eventId?, categoryId?, title, ownerId, dueDate, status, dependsOn | Belongs to Wedding |
| Approval | id, entityType, entityId, requestedBy, approverIds, status, comments | Links to Quote or Booking |
| Notification and Activity | id, weddingId, type, actorId, text, createdAt, readBy | Belongs to Wedding |
| Dispute | id, bookingId, raisedBy, category, evidence, status, resolution | Belongs to Booking |
| RoomBlock, Pickup, Table, CheckIn | weddingId, details | Hospitality and seating |
| Gift (shagun) | id, weddingId, giver, amount or item, eventId, thankYouSent | Belongs to Wedding |
| PriceIndexEntry | category, city, season, medianPrice, p25, p75 | Reference data |

### Mock data to generate

The wedding-planner and data-architect create realistic, internally consistent seed data in `src/data/`:

1. **Vendors:** about 120 across all categories, weighted to Delhi NCR (Delhi, Gurugram, Noida, Ghaziabad, Faridabad) with a smaller set for Udaipur, Jaipur and Goa. Minimum counts: 15 venues (mix of hotel, banquet, garden, farmhouse, resort), 12 caterers, 10 decorators, 10 photographers/videographers, 8 makeup and mehendi artists, 8 DJ/band/anchor, 6 transport providers, 5 invitation/hamper vendors, 5 pandits, and a few in every other category.
2. **Realistic pricing:** caterer per-plate prices from about ₹800 to ₹3,500 depending on tier; venues with per-function and per-day rates, capacity and room counts; photographers with day packages. Prices must be consistent with the allocation tiers so every budget band has options that fit and some stretch options.
3. **Variety for rules testing:** some venues with in-house catering only, décor exclusivity, music curfews and corkage fees; some vendors unavailable on peak dates; some vendors with service-radius limits and travel fees.
4. **Reviews:** 3 to 25 verified reviews per vendor with believable text, mixed ratings, some with vendor replies, and a few flagged as suspicious for the admin queue.
5. **Templates:** function and ritual templates per community, and checklist templates with lead times.
6. **Reference data:** muhurat dates, price index by category, city and season, allocation priors, and destination data.
7. **Three seeded weddings** (see Personas) each with events, budget lines, quotes, bookings, payments, guests (80 to 350 households per wedding), RSVPs with realistic response patterns, tasks, comments, approvals and notifications.
8. **Fast-forward time:** a global 'app clock' value stored in state so date-based logic (reminders, review prompts, payment due) can be demoed.

## Non-functional requirements

These apply to every epic. The ui-ux-lead and qa-tester enforce them in review.

### UX and design

- **Mobile first.** Design at 360px, scale up to tablet and desktop. Bottom tab bar on mobile (Home, Budget, Book, Guests, More), side navigation on desktop.
- **Parent-friendly.** Minimum 16px body text, 44px tap targets, high contrast, plain words, no jargon. 'Simple mode' from US-7.9.
- **Visual identity.** Warm, celebratory but trustworthy: an ivory and deep maroon palette with a gold accent, generous spacing, rounded cards, and tasteful use of Indian motifs. Avoid generic template looks; the ui-ux-lead proposes the design tokens in `docs/decisions.md` first.
- **Clarity of money.** Always show currency symbol, Indian digit grouping, and whether GST is included. Show per-guest cost wherever guests drive cost.
- **Trust cues.** Verified badges, 'Demo' badges on mocked data, protected-payment banner on payment screens, visible reviews policy link.
- **Feedback and safety.** Confirmations for destructive actions, undo where cheap, and no dead ends.

### Language and localisation

- English and Hinglish toggle for all primary screens, with the setting stored per user. Strings live in `src/i18n/` and are never hard-coded in components.
- Dates in `DD MMM YYYY`, 12-hour times, and Indian number formatting. Layouts must survive longer Hindi/Hinglish strings.
- Structure the dictionary so Devanagari Hindi and regional languages can be added later.

### Accessibility

- Meet WCAG 2.1 AA for contrast, keyboard navigation, focus states and labelled form controls. Don't rely on colour alone (alerts use icons and text). Support screen readers on the main flows and respect reduced-motion settings.

### Performance and reliability

- First meaningful screen in under 2 seconds on a mid-range phone over a throttled connection. Lazy-load route modules and images. Virtualise long lists (vendors, guests).
- Simulated network delays are short (300 to 1,200 ms) and configurable. Every async action has loading and error states.
- State persistence: reloading the page never loses the user's work. 'Reset demo data' restores the seeds.

### Code quality

- Strict TypeScript, ESLint, Prettier, and a small set of shared UI components. No business logic inside components; logic belongs in `src/lib/` and is unit-tested.
- Services are accessed through interfaces (`AssistantService`, `PaymentService`, `MessagingService`, `VendorRepository`, `ReviewService`), so a real backend can be dropped in without rewriting screens.
- Conventional commits, one commit per completed story or small group of stories.

### Privacy and compliance (documented, not fully implemented)

- Treat guest lists as personal data. Collect the minimum, show notices, allow deletion (US-6.14).
- Show GST-inclusive prices, protected-payment disclosures and the cancellation tier table. Don't imply the prototype holds real funds.
- Record in `docs/decisions.md` the items to resolve before launch: licensed payment aggregator escrow, DPDP Act consent and notices, Consumer Protection and E-Commerce Rules disclosures, review standard alignment, vendor contracts with non-circumvention clauses, and event compliance (noise curfews, liquor licences, fireworks).

### Analytics hooks (mock)

- An `analytics.track(event, props)` helper that logs to the console and a debug panel, with events for onboarding steps, budget edits, alerts shown, quote requests, bookings, RSVP actions and savings applied. This prepares the KPIs the business will measure later.

## Agent assignments, build order and definition of done

### Who does what

| Agent | Leads | Reviews |
| --- | --- | --- |
| Director (main session) | Planning, delegation, scope control, commits, progress reports | Every epic before it is marked done |
| ui-ux-lead | Layout, design tokens, shared components, onboarding, dashboard, invite and RSVP pages, simple mode, Hinglish copy | All screens for clarity and mobile fit |
| wedding-planner | Ritual and function templates, vendor categories and rules, realistic mock vendors and prices, timeline templates, day-of flows | Domain correctness of every flow |
| budget-auditor | Read-only review of allocation, cost model, ledger, alerts, optimiser, RSVP savings maths | Epics 2, 3, 4, 6, 8 numbers |
| data-architect | `docs/data-model.md`, mock data files, service interfaces, state shape | Any change to data structures |
| rsvp-guest-specialist | Guest list, invitation matrix, invite and RSVP flow, forecast and savings logic, hospitality, check-in | Epic 6 and its links to Epic 2 |
| qa-tester | Walks every story's acceptance criteria, edge cases, regression across epics, bug reports | Every epic |

### Build order

1. **Epic 0: Scaffold (P0).** Vite + React + TypeScript + Tailwind, routing, layout and bottom navigation, design tokens, i18n setup, persisted store, service interfaces with mock implementations, persona switcher, 'Reset demo data', app clock, analytics helper, linting and test setup. The data-architect delivers initial `docs/data-model.md` and seed data skeletons.
2. **Epic 1: Onboarding and profile.** Includes function templates and the feasibility check.
3. **Epic 2: Budget engine,** with unit tests passing before any budget UI is wired up.
4. **Epic 7 (part): Dashboard and family basics** (US-7.1, 7.4, 7.9) so there is a home screen early.
5. **Epic 3: Vendor discovery, compare and assistant** using the full vendor mock data.
6. **Epic 4: Quotes, bookings and simulated payments.**
7. **Epic 5: Verified reviews and trust.**
8. **Epic 6: Guests, invitations, RSVP, forecast and savings.**
9. **Epic 7 (rest): Timeline, function pages, approvals, activity.**
10. **Epic 8: Day-of and post-wedding,** including time fast-forward.
11. **Epic 9: Vendor, planner and admin views.**
12. **Epic 10: Stretch features,** by priority.
13. **Polish pass:** accessibility, performance, copy, empty states, and a final regression run.

The director reports after each step with: what was built, which agents were used, what is mocked, the tests run, and open questions.

### Definition of done (per story)

- Every acceptance criterion passes and has been walked through by qa-tester.
- The budget-auditor has signed off any story that touches money or forecasts.
- Logic is in `src/lib/` with unit tests; UI has loading, empty and error states.
- Mocked parts carry a Demo badge; text is in the i18n dictionary.
- `docs/data-model.md` and `docs/decisions.md` are current, and the work is committed.

### Definition of done (whole prototype)

- The three seeded weddings can be explored end to end, and a brand-new user can onboard and reach a populated dashboard.
- The following demo script works without errors on a 360px phone screen:
  1. Onboard Karan and Anjali (₹12 lakh, 180 guests) and see the feasibility verdict and trade-offs.
  2. Open the budget, change a priority and a category amount, see rebalance and an overspend alert.
  3. Ask the assistant for a vegetarian caterer under a per-plate budget and shortlist two results.
  4. Compare vendors, request a quote, accept it, sign, and pay an advance through simulated escrow.
  5. Build a guest list, design an invitation, send it, and respond as a guest on the invite link.
  6. Watch the forecast change and apply the guaranteed-plates saving to the budget.
  7. Fast-forward to the event, release a final payment, and leave a verified review.
  8. Switch to the vendor, planner and admin personas and see their views.
- Unit tests for `src/lib/budget/` and `src/lib/rsvp/` pass, and there are no console errors on the main flows.

### Explicitly out of scope for the prototype

- A real backend, database, authentication, or any API keys and external calls.
- Real payments, escrow, UPI, KYC, e-sign or GST filing.
- Real WhatsApp, SMS or email sending, and real LLM calls.
- Scraped, purchased or live vendor data, and any real vendor or guest personal data.
- Native mobile apps, vendor SaaS billing, and multi-city operations beyond the seeded cities.

### Open assumptions to confirm

- The first launch city is Delhi NCR and the first community focus is North Indian Hindu, Sikh and Jain weddings, with other templates present but lighter.
- Allocation percentages and attendance parameters are priors from the research report and will be tuned from real data later.
- Platform commission in the vendor view (7%) is a demo value, not a pricing decision.
