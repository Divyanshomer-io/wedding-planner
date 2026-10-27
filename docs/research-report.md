# AI-Powered Wedding Planning & Booking Platform for India: Market, Product, Tech and Business Assessment (October 2026)

The idea is worth building, but not in the form described. A pure "AI planner plus marketplace" will hit the same wall that has kept Indian wed-tech small: platforms that sell leads to vendors stay small and lose vendors' trust. Matrimony.com's wedding services revenue fell to ₹4.3 crore in FY26, and WedMeGood had ₹21.6 crore of revenue in FY23.\[1\] The version that can win is a budget-first, trust-first booking layer that takes money through the platform, held in escrow and paid out at milestones. It should start as a tech-enabled concierge in Delhi NCR, give planners and vendors software instead of fighting them, and treat AI as a co-pilot rather than the product.

## TL;DR

- **The market is huge, but it is fragmented and offline, and the money is hard to capture.** A June 2024 Jefferies report puts Indian wedding spending at about ₹10 lakh crore ($130B) a year, a figure it credits to CAIT, across 8–10 million weddings, or roughly ₹12 lakh (about $14,500) per average wedding. CAIT projected 46 lakh weddings and ₹6.5 lakh crore in the Nov 1–Dec 14, 2025 window alone.\[2\] Yet Tracxn counts 1,544 Indian wed-tech companies, of which only 35 are funded, and together they have raised just $70M. Couples spend; platforms have struggled to earn.
- **Your three strongest ideas are the right wedge.** They are a budget engine that allocates money and polices overspending, reviews that only verified bookings can leave, and per-event WhatsApp RSVP that turns guest counts into catering and room savings. They also justify routing payments through you. The AI chatbot, nearby-vendor logic and one-by-one booking are needed, but competitors already have them.
- **Recommendation:** run a 90-day concierge MVP in Delhi NCR for ₹15–60 lakh weddings in the Jan–Mar 2027 muhurat window. Hand-onboard about 300 vendors and use a licensed payment aggregator's split-payment/escrow product rather than becoming an aggregator yourself. Earn a 5–10% take rate on platform bookings, plus vendor/planner SaaS and fintech referrals. Do not build a scraped all-India directory first.

---

## 1. Market Research

### 1.1 Size and volume

| Metric | Figure | Source / note |
|---|---|---|
| Annual wedding spend | ~₹10 lakh crore (~$130B); weddings would be "the second largest retail category only behind food and grocery" | Jefferies (June 2024), which credits CAIT for the $130B estimate |
| Weddings per year | 8–10 million (vs 7–8M China, 2–2.5M US)\[3\] | Jefferies\[4\] |
| Average spend, all India | ~₹12 lakh, more than 3× average household income of ₹4 lakh | Jefferies\[5\] |
| Category split, all India | Jewellery ~25%, catering ~20%, events ~15% | Jefferies\[6\] |
| Peak season 2025 (Nov 1–Dec 14) | 46 lakh weddings, ₹6.5 lakh crore | CAIT (CRTDS) survey of 75 cities, Oct 2025 |
| Peak-season trend | 2022: 32 lakh / ₹3.75 lakh cr → 2023: 38 lakh / ₹4.74 lakh cr → 2024: 48 lakh / ₹5.9 lakh cr → 2025: 46 lakh / ₹6.5 lakh cr\[7\]\[8\] | CAIT press release, Oct 30, 2025\[2\] |
| Delhi, 2025 season | 4.8 lakh weddings, ~₹1.8 lakh crore | CAIT\[9\] |
| Platform average (urban-skewed) | ₹39.5 lakh (+8% YoY); destination ₹58 lakh (from ₹51.1 lakh) | WedMeGood Annual Report 2025–26 (2,000+ couples, 500+ vendors)\[10\] |

**Reading the numbers correctly.** The ₹12 lakh Jefferies average and the ₹39.5 lakh WedMeGood average describe different populations. WedMeGood itself notes "a natural urban skew aligned to the platform's metro-centric user base."\[10\] Jefferies estimated that of the 48 lakh weddings in the 2024 season, about 40 lakh were budget weddings (₹3–15 lakh) and only about 50,000 cost ₹1 crore or more.\[7\]\[11\]\[12\] Your realistic addressable market is the urban ₹15 lakh–₹1 crore band, probably a few lakh weddings a year. That is large, but far below the headline $130B, much of which is jewellery and apparel bought separately. Commercial reports such as Ken Research ($149B in 2025, 8.4% CAGR) are directional estimates, not audited figures.\[13\]

### 1.2 Tier and city differences

- **City budgets (WedMeGood 2025):** Jaipur ₹73 lakh (inflated by destination weddings), Delhi ₹38 lakh, Bangalore and Hyderabad ₹37 lakh, Mumbai ₹35 lakh.\[14\]
- **Luxury:** about 9% of WedMeGood weddings (2024) cost over ₹1 crore, and more than 60% of those were destination weddings.\[15\]
- **Destination:** about 1 in 4 weddings on WedMeGood in 2025, with 89% held within India.\[16\]\[17\] IMARC's projection of growth from $4.3B (2025) to $26.6B (2034) is a forecast.\[18\]
- **Tier-2/3 reality:** in Amritsar, the resort association reported most 2025 weddings at ₹5–7 lakh, with few above ₹15 lakh, and families cut functions because of floods, liquidity and gold prices.\[19\]

### 1.3 Seasonality: muhurat dates drive everything

- After Dev Uthani Ekadashi (20/21 Nov 2026), the season has **4 dates in November 2026 (21, 24, 25, 26)** and **7 in December 2026 (commonly 2–6, 11, 12; some panchangs list 1–4, 11–13)**. Kharmas then pauses weddings until mid-January.\[20\]\[21\]\[22\]\[23\]\[24\]
- **2027:** roughly 93–96 dates, about 9 in January, 13 in February, 11–12 in November and 7 in December. There are none in the Chaturmas months.\[25\]\[26\]\[27\]
- **Implication:** availability, not price, is often the binding constraint. WedMeGood found availability drives 37.91% of venue frustrations.\[17\] CAIT attributed part of the 2024 surge to 18 auspicious dates, up from 11.\[8\]\[12\]\[28\] The product must plan around date scarcity, and the infrastructure must handle sharp peaks.

### 1.4 Online behaviour, payments and finance

- **1 in 3 couples check online reviews** before booking; referrals and Instagram still dominate (WedMeGood 2025).\[17\]
- **38% now pay digitally**; cash still dominates.\[17\]
- **Financing:** 78.65% use savings and 15.2% take loans, averaging ₹15.5 lakh, mainly for venues, jewellery, décor and catering.\[14\]
- **About 24% of vendors use AI** in some form. Couples hiring planners rose 15% YoY (WedMeGood 2024).\[17\]\[29\]
- **Post-COVID:** guest lists shrank (one planner cited 800–3,000 guests falling to 250–300), while spend per wedding kept rising faster than wedding counts.\[30\]

---

## 2. Customer Research

### 2.1 Who decides and who pays

- **Payers:** mostly parents and family savings (about 79–82%), with couples increasingly contributing and 12–15% using loans.
- **Deciders:** a collective. The couple drives aesthetics. Parents control venue, catering, guest list and rituals. Elders and the priest set the date. Both families negotiate shared costs. A single-user product will fail.
- **Influencers:** family and cultural values, then social media, wedding apps and Bollywood weddings (WedMeGood 2024).\[29\]

### 2.2 Personas

| Persona | Goals | Pain points | What wins them |
|---|---|---|---|
| **Couple (26–32, urban)** | Personalised wedding; control over vendors | Information overload, conflicting quotes, fake portfolios, coordinating 10+ vendors | Mood boards, transparent prices, a board shared with parents |
| **Parent/payer (50–62)** | Social standing, rituals done right, value | Overruns, hidden charges (GST, extra plates, overtime), no-shows | Hindi voice + WhatsApp, one budget view, payment protection, a human on call |
| **NRI family** | Remote planning, guest travel | Can't visit vendors, trust | Video walk-throughs, escrow, a dedicated manager |
| **Planner** | More clients, less admin | Lead costs, coordination by WhatsApp/Excel | CRM/proposal/budget SaaS, payment collection |
| **Vendor** | Bookings in a short season | Paid leads that don't convert, cancellations, payment delays | Pay-per-booking, guaranteed advances, a calendar, reputation that moves with them |

### 2.3 Top pain points

1. **Budget overruns.** Planning guides commonly say Indian weddings run 15–20% over initial estimates.\[31\]
2. **Quotes that can't be compared.** Per-plate vs package, taxes in vs out, "starting at" décor prices.
3. **Trust and quality.** Old portfolios, junior staff substituted for the lead, fake reviews.
4. **Hidden middleman commissions.** Section 6.2 has the numbers.
5. **Date scarcity** on muhurat days.
6. **Guest-count uncertainty.** Informal RSVP and catering minimums.
7. **Family coordination** spread across WhatsApp groups.
8. **Cash- and advance-heavy payments** with weak cancellation recourse.

---

## 3. Competitor Analysis

### 3.1 Landscape

| Player | Model | Scale / financials | Strengths | Weaknesses / lessons |
|---|---|---|---|---|
| **WedMeGood** (2014) | Discovery + inspiration; vendor premium listings; e-invites; "Genie" assisted planning (₹249 single service; ₹19,999 on-ground) | $3.07M raised (Series A 2019); FY23 revenue ₹21.6 cr, loss ₹3.4 cr (Inc42); 80,000+ vendors; later revenue data conflicts across databases | Brand, content, annual report, OTP-verified contacts | Vendors report about ₹50,000–₹85,000 non-refundable listings with poor conversion ("zero conversions" anecdotes).\[32\] The lead-gen trap.\[33\]\[34\]\[35\] |
| **WeddingWire India** (The Knot Worldwide) | Directory + subscriptions\[36\]\[37\] | Parent sent 9M leads to 900,000 vendors in 2024\[38\]\[39\] | Product depth | A proposed US class action filed Apr 30, 2025 by four named vendors (Rodman Wedding Photography, A Salon Santa Fe, Elite Casino Events/Emme Photo Booth, Morina Photography) alleges non-converting leads; The Knot told Newsweek it "strongly dispute[s] the claims." A Knot–Zola deal was reported in Oct 2026. |
| **Weddingz.in** (OYO since 2018) | Venue-led hybrid | ~$3.36M raised before acquisition | Banquet supply | Venue-centric; subordinate to a hotel aggregator's priorities\[40\]\[41\] |
| **ShaadiSaga** | Multi-quote marketplace | ~$535K raised; acquired by Matrimony.com in 2022 | Quote comparison | Subscale\[40\]\[42\] |
| **Matrimony.com wedding services** (WeddingBazaar, Mandap.com) | Moved from subscription to commission in mid-2026 | Revenue ₹9.0 cr (FY24) → ₹5.9 cr (FY25) → ₹4.3 cr (FY26); FY26 EBITDA loss ₹15.02 cr; claims 1,00,000 vendors | Huge matchmaking funnel | **Key lesson:** even a captive funnel couldn't make listings work. The pivot to commission backs this report's model.\[1\]\[42\]\[43\] |
| **Meragi** (2021) | Full-stack fulfilment with 3D décor visualisation | $9.1M Series A (Accel, Jul 2024) at ₹48 cr GMV; ~$14.8M total; Aug 2026 bridge of ₹28.68 cr (Accel ₹14.34 cr, DG Daiwa Ventures ₹9.56 cr, Peak XV ₹5.56 cr) at a flat ~₹305 cr valuation (Entrackr estimate) | Accountability, design tech | Ops-heavy; the flat bridge hints at hard capital efficiency |
| **The Wedding Company** (2023) | Fulfilment, ~4% planning fee | $3.75M raised; FY26 GMV ₹115 cr (from ₹51 cr); reportedly profitable since Oct 2024 (Weddings.io compilation, unverified) | Low fee | Ops-heavy, city by city\[18\] |
| **The Knot / Zola / Joy (US)** | Free couple tools funded by vendor ads, registry commissions or add-ons\[39\]\[44\]\[45\] | Knot launched a ChatGPT app in Feb 2026\[46\] | Mature planning UX | Western single-event model; registries don't fit cash shagun |
| **Local planners** | 8–15% fee + vendor commissions | Highly fragmented | Relationships, execution | Opaque pricing, poor tools |

Tracxn counted 1,544 active Indian wed-tech companies by May 2026. Its India Wedding Tech page lists only 35 funded companies, which have "collectively raised $70M," and just 12 of them are Series A or later. That is the pattern of repeated failure to build durable unit economics.

### 3.2 White space

1. **Nobody owns the budget.** A neutral "CFO for the wedding" that tracks allocated vs committed vs paid is unclaimed.
2. **Reviews only from bookings paid through escrow.** On WedMeGood, anyone who "booked or attended" can review.\[47\] Tying reviews to payments made on-platform is structural, and competitors can't copy it without changing how payments flow.
3. **RSVP linked to cost.** No one connects per-event RSVPs to plate counts, room blocks and the budget.
4. **Milestone escrow** gives both families and vendors a reason to transact on-platform.
5. **Tools for planners** turn a competitor into a channel.

---

## 4. Budget Allocation Research and Proposed Engine

### 4.1 Benchmarks (ranges, since sources conflict)

| Category | Jefferies (all-India incl. jewellery) | Planning guides (event budget, ex-jewellery) | CAIT 2024 (share of season spend, goods + services) |
|---|---|---|---|
| Jewellery | ~25% | Tracked separately | — |
| Catering | ~20% | 20–40% (40–50% with venue) | 10% |
| Venue | (in "events") | 15–35% | 5% |
| Décor/events | ~15% | 10–15% | 10% (tent & decoration) |
| Photo/video | — | 5–10% | 2% |
| Couple attire | — | 8–10% | — |
| Makeup | — | 2–5% | — |
| Music/entertainment | — | 3–5% | 6% |
| Guest hospitality/transport | — | 4–6% | 3% |
| Invitations/favours | — | 3–4% | — |
| Rituals | — | 2–3% | — |
| Contingency | — | 5–10% | — |

**Interpretation.** Venue plus catering consistently takes 40–55% of the event budget. Jewellery is a separate, asset-like decision and should be budgeted on its own. Cost drivers that guides repeatedly cite:
- Every extra 100 guests adds roughly ₹2–5 lakh.\[48\]
- A 100-guest wedding costs about 60–70% of a 200-guest wedding.\[31\]
- Cutting functions saves more than trimming guests.\[31\]
- Peak dates add about 20–25% to venue and décor.\[49\]
- Mid-range catering in Hyderabad runs about ₹1,400–2,000 per person per event.\[31\]

These are guide estimates, not transaction data, which is why your own data becomes the moat.

### 4.2 Proposed default allocation (event budget, ex-jewellery; synthesized priors, not sourced facts)

| Category | Budget (₹8–15L) | Mid (₹15–50L) | Premium (₹50L–1.5Cr) | Destination |
|---|---|---|---|---|
| Venue (all functions) | 15% | 18% | 20% | 25% (incl. rooms) |
| Catering & bar | 38% | 30% | 25% | 22% |
| Décor, florals, lighting, tent | 10% | 13% | 16% | 14% |
| Photo & video | 7% | 8% | 8% | 7% |
| Couple attire | 8% | 7% | 6% | 5% |
| Makeup, mehendi, grooming | 3% | 3% | 3% | 3% |
| Music, baraat, choreography, anchor | 4% | 5% | 5% | 4% |
| Guest hospitality | 3% | 4% | 5% | 10% |
| Invitations, return gifts | 3% | 3% | 3% | 2% |
| Rituals, pandit | 2% | 2% | 1% | 1% |
| Contingency (locked) | 7% | 7% | 8% | 7% |

City multipliers (metros about 1.2–1.35× tier-2 baselines) and season multipliers should come from your own price index.

### 4.3 Engine methodology

1. **Bottom-up cost model:**
   Total = Σ events [expected attendees × per-plate rate × city × season multipliers] + fixed categories + rooms × nights + contingency.
   Use the RSVP-adjusted headcount, not the invite count.
2. **Feasibility check on day one:** if the budget doesn't fit, show the trade-offs: "Drop the cocktail night and save ₹4.2 lakh," or "Shift from 12 Dec to 15 Jan to save about 20% on the venue."
3. **Constrained optimisation:** convert the user's priority ranking into utility weights, then solve a multiple-choice knapsack. Pick one real vendor price point per category to maximise utility subject to the budget, category floors, distance/compatibility rules and availability. Start with a rules engine plus integer programming (OR-Tools); it is explainable and fast.
4. **Learning loop:** treat shares as Bayesian priors by tier, city and community, and update them from bookings made on the platform. After about 1,000 weddings, train models to predict final spend and overrun risk. Publish a quarterly city price index.

**Overspend UX.** Show live "allocated / committed / remaining" bars, with soft warnings at 90% and hard warnings when contingency is touched. Every override needs a one-tap "take ₹1.5L from décor?" so the total stays balanced. Show "best within budget" first and label "stretch" options with how far over they go.

---

## 5. Feature Specification by Module

### 5.1 Onboarding (under 3 minutes, enriched progressively)

**Essential inputs:**
- Names and roles
- Both families' home cities
- Wedding city, or "help me choose a destination"
- Dates, or "suggest muhurat dates," plus flexibility
- Total budget and which side pays for what
- Guests per function
- Religion/community/sub-community, which drives ritual templates
- Functions (roka, sagai, haldi, mehendi, sangeet, cocktail, baraat, pheras/nikah/Anand Karaj, vidaai, reception)
- Food rules (veg/Jain/no onion-garlic, alcohol)
- Style picks and top-3 priorities
- Vendors already booked
- Outstation and NRI guest share
- Accessibility and elderly needs
- Planner involvement
- Language and a WhatsApp contact

**Later:** kundali/muhurat preferences, ritual specifics, sustainability, shagun approach, honeymoon.

### 5.2 Budget engine

Section 4, plus:
- A payment-schedule calendar
- A bride-side/groom-side ledger
- Cash vs digital tracking
- GST-inclusive comparisons
- Quote expiry reminders
- Scenario comparison ("300 vs 400 guests")

### 5.3 Vendor marketplace: categories

| Group | Categories |
|---|---|
| Venue & stay | Hotels, banquets, marriage gardens, farmhouses, resorts/palaces, community halls, temple/gurdwara slots, guest room blocks |
| Food | Caterers, live counters, mithai, cake, bar setup (licence), chaat stalls, crockery rental |
| Décor & production | Decorators, florists, mandap, tent house/furniture, lighting, sound/LED, generators, cold pyros (where permitted) |
| Rituals | Pandit/qazi/granthi, samagri, havan kund, astrologer, ritual items (varmala, chooda, kaleere, sehra) |
| Couple | Lehenga/sherwani (buy/rent), tailors, jewellery (buy/rent), trousseau, makeup/hair, mehendi artists, grooming |
| Entertainment | DJ, band, dhol, baraat band, ghodi, vintage car, anchor, choreographer, singers, photo booths, kids' zone |
| Media | Photo, film, drone, pre-wedding shoot, albums, live streaming, reels creator |
| Guests | E-invites, printed cards, hampers, return gifts, hospitality desk, cabs/buses, airport pickups, valet, security, babysitters, first aid |
| Admin & finance | Marriage registration, lawyer, insurance, loans/EMI, old-gold exchange |
| Post-wedding | Honeymoon, album delivery, thank-you notes, gift inventory |
| Miscellaneous | User-added free-text items with amount, owner and due date |

**Event templates** generate checklists automatically. For example, sangeet = venue + DJ + choreographer + stage/LED + catering; haldi = marigold décor + haldi kits + dhol.

**Smart local logic:**
- Hard filter on the wedding city plus each vendor's declared service radius and travel fee.
- The chosen venue becomes the anchor, and other vendors are ranked by travel time to it.
- Enforce venue rules: in-house catering, décor exclusivity, DJ curfew, alcohol licence, fireworks.
- Flag dependencies, for example "this garden needs a tent house, generator and washrooms."
- Compare prices normalised to all-in per guest including taxes.

### 5.4 Booking and payments

- **Flow:** availability request → structured quote (line items, taxes, overtime, cancellation) → e-contract → advance → milestone payments → final release after the event.
- **Escrow:** don't hold funds yourself. RBI's Payment Aggregator Master Direction (Sep 15, 2025):
  - requires non-bank PAs to keep merchant funds in escrow with scheduled commercial banks\[50\]
  - sets a ₹15 crore net-worth floor\[51\]
  - bars a PA from being a marketplace\[51\]

  Use a licensed PA's split-settlement product or a bank escrow partner, with sign-off from a fintech lawyer.
- **Cancellation:** a standardised tiered policy (e.g., refundable minus a fee more than 120 days out; partial at 60–120 days; non-refundable under 30 days), shown upfront.
- **Other payment features:** UPI, cards, EMI/BNPL via partners. Log cash payments as "offline paid" so the ledger stays complete.

### 5.5 AI assistant (co-pilot, not oracle)

- **Use cases:**
  - natural-language search ("veg caterer in Dwarka under ₹1,200/plate for 400, Jain counter, 12 Dec")
  - budget Q&A
  - quote summarisation (upload a PDF or WhatsApp quote → line items → flags for missing taxes or overtime)
  - negotiation scripts, ritual explainers and drafted messages
- **Architecture:** an LLM with tool calls into structured search, availability and the budget engine, plus vector search over portfolios, reviews and policies. Prices and availability come only from platform data, with sources shown.
- **Languages:** Hindi, Hinglish and English first, then regional languages. WhatsApp voice notes for parents.
- **Guardrails:** human escalation, logged answers, and clearly labelled sponsored results. CCPA's dark-pattern guidelines make disguised ads risky.

### 5.6 Reviews

Verified-booking badges, multi-dimension ratings, media proof, vendor responses and an IS 19000-aligned policy (Section 8).

### 5.7 Guest management and digital invites

- **Invites:** mobile-first, multilingual video/animated e-invites per family side, sent via the WhatsApp Business API with a unique link per guest.
- **Per-event RSVP:**
  - yes/no/maybe for each invited function
  - headcount and names, adults vs children
  - dietary needs
  - arrival/departure, pickup and room needs
  - plus-ones per host rules
  - accessibility
- **Indian-behaviour defaults:**
  - one-tap "Haan, aa rahe hain (4 log)" buttons
  - household-head RSVP
  - host-entered RSVPs after phone calls
  - reminders at T-30/14/7
  - "maybe" counted as a probability
- **Attendance prediction:**
  - Western platform data suggests 75–85% of invitees attend local weddings, fewer for destination weddings, and 3–10% of confirmed guests don't show.\[52\]\[53\]\[54\]\[55\]\[56\]
  - No reliable Indian multi-event dataset exists. Indian practitioners plan for 5–10% of confirmed guests not showing and 3–7% of unconfirmed guests arriving.\[57\]
  - Model by guest segment and recalibrate with QR check-in data.
- **Cost link:** forecasts drive plate guarantees, room blocks, cars, return gifts and seating. Show the savings explicitly: "Projected 520 vs 700 invited at sangeet — 140 fewer guaranteed plates, ₹1.9 lakh saved."
- **Hospitality:** room allocation, pickup roster, a guest helpdesk bot, QR entry, seating, a shagun register.

### 5.8 Timeline, event planning and collaboration

- **Timeline:** a reverse-scheduled plan (venue 9–12 months out; invites 6–8 weeks out) with owners, dependencies, WhatsApp nudges and muhurat-aware lead times.
- **Event planning:** every function has its own sub-budget, guest list, vendors, run-of-show and editable community ritual template.
- **Collaboration:**
  - roles: owner, co-owner (both sides), contributor, viewer, planner, vendor
  - approvals above a ₹ threshold, polls, comments, a change log, per-side cost visibility

### 5.9 Day-of and post-wedding

- **Day-of:** live run-sheet, geo-tagged vendor check-ins, escalation tree, coordinator mode, payment-release prompts and standby vendors.
- **After:** review prompts at T+3 and T+45 days, album tracking, WhatsApp thank-yous linked to the shagun register, a final budget-vs-actual report, referral rewards.

### 5.10 Dashboards

- **Vendor:** availability calendar (the biggest supply-side value), quote builder, contracts, payouts, review responses, city price benchmarks.
- **Planner:** multi-client CRM, budget engine per client, proposals, vendor network, white-label invites/RSVP, transparent commissions.
- **Admin:** KYC queue, disputes, escrow status, fraud signals, moderation, supply health per category per date.

### 5.11 Out-of-the-box features

| Feature | Why | Phase |
|---|---|---|
| Muhurat + availability optimiser | Balances auspicious dates, family availability and price; date scarcity is the top venue frustration | MVP-lite → V1 |
| Quote X-ray | Upload any offline quote; flags hidden costs; benchmarks against the index | V1 |
| Price index & "fair price" badge | Transparency moat, PR engine | V1 |
| Shagun/gift tracker | Culturally specific reciprocity record | MVP |
| Loans/EMI/old-gold marketplace | 15.2% borrow, averaging ₹15.5 lakh; referral revenue | V1 |
| Wedding insurance | Strengthens the escrow promise | V2 |
| Off-peak/group deals | Weekday, non-muhurat and room-block discounts | V1 |
| Negotiation assistant | Index-based counter-offers | V1 |
| 3D décor, 360° tours, NRI live streaming | Remote decisions | V1–V2 |
| Inter-faith/dual-ceremony templates | Complex logistics | V1 |
| Sustainability mode | Food-donation partners, reusable décor | V1 |
| Cash-fund/home-setup registry | Adapted to UPI shagun | V2 |
| Vendor substitution guarantee | Backup if a vendor defaults | V2 |
| Life-event extensions | Honeymoon, home, anniversaries; counters one-time use | V2 |

---

## 6. Perspective-Wise Analysis

### 6.1 User view

Families will value one budget truth, no surprise costs, verified reviews and visible RSVP savings. They will reject:
- app-only flows for parents
- AI that feels like paid ads
- forced online payment when vendors offer cash discounts

Build for "mom on WhatsApp." The moment of truth is the first quote comparison: if your prices beat an uncle's contact, trust follows. Negotiate best-price commitments with partners. WedMeGood already advertises them for some vendors.\[35\]

### 6.2 Planner view: partner, not enemy

- **Fees:** Indian planners typically charge 8–15% of the budget (15–20% for destination/luxury), or flat fees of about ₹2–30 lakh.\[58\]\[59\] A tiered pattern is common: day-of 3–5%, partial 5–8%, full-service 8–15%.\[60\]
- **Hidden commissions:** many also earn 8–20% from vendors, "usually built quietly into the vendor's quote," per several planner-market guides.\[58\]\[61\]
- **Price compression:** The Wedding Company's ~4% fee shows technology can bring fees down.\[18\]
- **Strategy:** pitching "AI replaces planners" starts a fight with the most influential channel. Run a hybrid instead:
  1. Planner SaaS (CRM, budget, RSVP, white-label) at ₹2,000–10,000/month (proposed).
  2. A marketplace of vetted planners with transparent fees.
  3. Your own concierge tier.
- **Rule:** require disclosure of any vendor commission on the platform.

### 6.3 Developer/tech view

| Layer | Recommendation |
|---|---|
| Clients | React Native/Flutter app; Next.js web (SEO); WhatsApp Cloud API as a first-class channel; vendor PWA |
| Backend | Modular monolith (NestJS or FastAPI). Modules: identity, events, budget, catalog, availability, quotes/contracts, payments, reviews, guests, messaging, AI |
| Data | PostgreSQL + PostGIS; Redis; object storage + CDN; OpenSearch for facets; pgvector for semantic search |
| AI | Multi-provider LLM gateway with Indic models; retrieval over listings and reviews; function-calling; Indic speech-to-text; evaluation harness |
| Optimisation | Rules + OR-Tools; later gradient-boosted spend/attendance models |
| Payments | Licensed PA split settlement; double-entry ledger |
| Maps | Use for geocoding, display and travel times. Google's Maps Platform terms bar scraping/export, allow place IDs to be stored indefinitely and lat/lng cached for only 30 days, so store your own vendor-verified coordinates.\[62\] |
| Infra | Mumbai cloud region; autoscaling for Nov–Feb; queue-based RSVP blasts; idempotent payment webhooks; 50× load tests before muhurat clusters |
| Security | DPDP-aligned consent, guest-data minimisation, encryption, RBAC, audit logs, breach runbook |

**Core data model:**
- Wedding → Events → Budget lines (allocated / committed / paid)
- Vendor → Packages → Price points → Calendar → Service area
- Quote → Contract → Milestones → Escrow events
- Guest → Household → Invitation per event → RSVP → Check-in
- Review → Booking ID, ratings, media, moderation, response

**WhatsApp cost:**
- Meta charges ₹0.8631 per marketing message and ₹0.115 per utility/authentication message in India, plus 18% GST. From Oct 1, 2026, service replies beyond 1,000 free per number per month are also billed.\[63\]
- A 500-guest wedding (about 3,000 utility messages) costs a few hundred rupees.
- Keep invites in the utility category where template rules allow, since marketing messages cost about 7.5× more.

**Team and cost:**
- MVP team (6–9 months): tech lead, 2 full-stack/mobile engineers, an AI/data engineer, a Hindi-first designer, a PM/founder, 3–5 city ops staff and 2 concierges.
- Indicative 12-month burn: ₹2.5–4 crore (estimate).

**Build vs buy:**
- Buy: payments, WhatsApp BSP, KYC, e-sign, maps, LLM APIs.
- Build: the budget engine, quote/contract workflow, RSVP-to-cost engine, and reviews/trust.

### 6.4 Owner/business view

**Revenue model:**

| Stream | Mechanism | Indicative pricing | Priority |
|---|---|---|---|
| Booking commission | % of escrow GMV, charged to the vendor on completion | 5–10% (venues 3–5%; services 8–12%) | Core |
| Concierge fee | Human-assisted end-to-end package | 2–4% of budget or ₹25k–₹1.5L flat | Core early |
| Vendor SaaS | Calendar, quotes, CRM, payments | Free; ₹999–₹2,999/month pro | V1 |
| Planner SaaS | Multi-client, white-label | ₹2,000–₹10,000/month | V1 |
| Fintech referrals | Loans, EMI, BNPL, insurance | Partner payouts | V1 |
| Premium couple features | Video invites, advanced RSVP | ₹499–₹4,999 | MVP |
| Sponsored placements | Labelled; never inside "best match" | CPM/CPC | Later, capped |
| Data products | Price index and trend reports | Subscription | V2 |

**Avoid making pay-for-leads subscriptions the core model.** Vendor backlash at WedMeGood, WeddingWire and The Knot, together with Matrimony.com's pivot to commissions, shows it erodes trust.\[32\]\[38\]\[43\]\[64\]\[65\]\[66\]\[67\]\[68\]

**Illustrative unit economics (assumptions):**
- A ₹25 lakh wedding with 40% of the event budget booked via the platform gives ₹10 lakh GMV. At a 7% take rate that is ₹70,000, plus about ₹5,000 from fintech and premium features.
- Payment costs (about 1.5–2% of GMV if absorbed), concierge time and support bring contribution to about ₹40–50k.
- With almost no repeat use, keep blended CAC under ₹15–20k. That means acquisition led by referrals and partners (banquets, jewellers, wedding lenders, matrimony apps, planners), plus guest virality, since every wedding reaches 300+ guests.

**Funding:**
- A $0.5–1.5M seed is enough to prove one city.
- Meragi raised its Series A at about ₹48 crore GMV. The Wedding Company raised seed after ₹51 crore GMV and claimed operating profitability.\[18\]\[69\]
- Investors now look for cities that are contribution-positive.

**Go-to-market:**
- **City:** Delhi NCR. It is the largest single market (4.8 lakh weddings, ₹1.8 lakh crore in the 2025 season per CAIT), dense in vendors, with a high budget (₹38 lakh WedMeGood average).\[2\]
- **Channels:**
  - a free budget calculator and quote X-ray (SEO and lead magnet)
  - "real budgets" content on Instagram/YouTube
  - banquet, caterer, jeweller and lender partnerships
  - RWA groups and planners
- **Timing:** the Nov–Dec 2026 season is already booked. Pilot Jan–Mar 2027 weddings, build through the Apr–Jul off-season, and launch V1 for Nov–Dec 2027.

**Regulatory checklist:**
- **DPDP Act 2023 + Rules 2025.**
  - Notified Nov 2025, phased: Consent Manager provisions from Nov 2026, and core duties (notice, consent, security, breach reporting, rights) from May 2027.\[70\]\[71\]
  - Penalties up to ₹250 crore.\[72\]
  - Host-uploaded guest lists are third-party personal data and need notices, purpose limitation and deletion.
- **Consumer Protection Act 2019 and E-Commerce Rules 2020:** seller disclosures, grievance officer, transparent ranking, no dark patterns.
- **Reviews:** BIS IS 19000:2022 (voluntary since Nov 25, 2022). Tata Sons, Amazon, Flipkart, Reliance Retail, Google, Meta, Swiggy, Zomato and Meesho took part in the consultations on it (TechCrunch), and a LocalCircles survey found "80% of consumers" want review standards made mandatory, so build to it now.
- **Payments:** licensed PA only, with no pooling of funds.
- **GST/tax:** check e-commerce operator TCS (CGST Act s.52) and TDS (s.194-O) obligations on vendor payouts. Show GST-inclusive prices.
- **Contracts and event compliance:** standard vendor agreements with non-circumvention clauses. Surface noise curfews, liquor licences, fireworks rules and animal-use rules as checks.

---

## 7. Vendor Supply Strategy (Cold Start)

### 7.1 Options

| Option | Verdict |
|---|---|
| Scrape Google Maps/Justdial/WedMeGood | **Don't.** Google's terms bar scraping. Competitor terms and database/copyright protection apply, scraped contacts create DPDP exposure, and stale numbers are exactly what couples complain about.\[62\] |
| Google Places API | Live display, geocoding and travel times only. It cannot be your database.\[73\] |
| Public directories | Fine as a prospect list for manual, consent-based outreach. Never auto-publish. |
| Vendor self-onboarding | Necessary, not sufficient. WhatsApp signup with KYC. |
| Field sales | Essential in city one. Banquet clusters (GT Karnal Road, Chhattarpur, Dwarka, Sohna Road) are efficient to cover. |
| Associations and anchors | Caterer/tent-house associations, banquet groups, hotel chains, photographer collectives |
| Planner networks | Each planner brings 30–100 vendors, so planner SaaS doubles as supply acquisition |
| Couple-sourced vendors | Couples invite their own vendors to manage the booking on-platform |

### 7.2 Phased plan

- **Months 0–3:** hand-recruit about 300 NCR vendors across about 15 categories, prioritising venues and caterers. Collect real rate cards and calendars.
- **Months 3–9:** reach 1,000–1,500 verified NCR vendors and add Jaipur/Udaipur destination partners. Turn on vendor SaaS so data stays fresh.
- **Months 9–24:** expand city by city once each reaches supply health (for example, at least 10 bookable vendors per core category per peak date).

### 7.3 Onboarding checklist

- **KYC:** PAN, GSTIN, Udyam, bank penny-drop, owner ID, OTP phone.
- **Licences:** FSSAI for caterers, liquor licence for bars, fire NOC for venues.
- **Quality:** portfolio EXIF checks and reverse-image search; three client references called by ops; site and kitchen visits; tastings for premium caterers.
- **Commercials:** standard rate card (GST, capacity, minimums, overtime, cancellation, service radius).
- **Agreements:** platform terms, a 12-month non-circumvention clause on leads the platform originates, a dispute process.
- **Ongoing:** scores for calendar freshness, response time and cancellations. Badges are earned, never sold.

---

## 8. Trust, Verified Reviews and Anti-Leakage

### 8.1 Verified review design

1. **Eligibility:** only parties to a completed booking, either paid via escrow or with an offline invoice/contract verified. Each gets a distinct badge. Guests can leave lower-weight ratings tied to QR check-in.
2. **Timing:** two prompts, T+3 days for service on the day and T+45 days for deliverables and billing honesty.
3. **Structure:**
   - ratings by dimension (quality, value, punctuality, "matched what was promised," hidden charges)
   - free text and media
   - the private price paid, which feeds the price index
4. **IS 19000 alignment:** verified authors, date stamps, no edits after publication (only appended updates), incentives that don't depend on sentiment, disclosure of solicited reviews, a published moderation policy, and no suppression of negative reviews.\[74\]\[75\]
5. **Fraud detection:**
   - device/IP/phone clustering
   - review rings within a family
   - velocity spikes
   - detection of similar or LLM-generated text
   - media EXIF/geo checks
   - reviewer–vendor relationship graphs
   - outliers against the price paid
6. **Vendor rights:** public responses and an evidence-based dispute process with an SLA. Negative reviews are removed only for policy violations.
7. **Ranking:** Bayesian scores weighted by recency and verification level. Sponsored placements are labelled and never change scores.

### 8.2 Disintermediation: the biggest business risk

Weddings are high-value, one-time and relationship-driven, and vendors routinely offer "cash discounts" to go direct.

**Mitigations:**
- **Make the platform worth more than the discount:**
  - escrow protection and a substitution guarantee for couples
  - guaranteed advances and fast payouts for vendors
  - reviews only for platform bookings
  - an auto-updating budget tracker
  - EMI access and first-booking cashback
- **Keep the take rate below the leakage threshold:** charge on completion, never per lead.
- **Lock in vendor workflow** through SaaS (calendar, quotes, payments).
- **Soft controls:**
  - mask numbers until a quote is accepted
  - in-app or WhatsApp-relay chat
  - non-circumvention clauses
  - leakage detection (a shortlist goes silent while the vendor's calendar shows a booking on that date)
- **Accept partial leakage.** Log offline payments and monetise through SaaS and fintech.

---

## 9. Risks, Flaws and Honest Critique

| # | Flaw/risk | Why it matters | Mitigation / pivot |
|---|---|---|---|
| 1 | "AI replaces planners" | Families want a human accountable on the day | AI co-pilot + human concierge; sell tools to planners |
| 2 | One-time purchase | LTV is capped, so CAC must stay low | Recurring vendor SaaS; extend to roka, engagement, honeymoon, home and the family's next weddings; guest virality |
| 3 | Long, family-driven decisions | 6–12 month funnels, many deciders | Multi-user roles, approvals, WhatsApp, Hindi voice |
| 4 | Chicken-and-egg | Empty recommendations or vendor churn | One city, concierge-led, hand-onboarded and couple-sourced supply |
| 5 | Vendor leakage | Destroys the take rate | Section 8.2 |
| 6 | Extreme seasonality | Revenue clusters on a few dozen dates | Annual SaaS; pre-wedding events; destination weddings; multi-faith calendars |
| 7 | "Optimal split" isn't solved science | Sources conflict (catering 20% vs 40%) | Bottom-up cost model, priors, learning from transactions, ranges with confidence |
| 8 | Live availability | Most vendors have no digital calendar | Availability requests with SLA; SaaS calendars; freshness badges |
| 9 | Cultural complexity | Punjabi ≠ Tamil ≠ Bengali ≠ Muslim ≠ Christian | Community templates; start with North Indian Hindu/Sikh/Jain in NCR |
| 10 | Indian RSVP behaviour | Guests rarely RSVP; "4" becomes 7 | One-tap WhatsApp, household RSVP, host entry, probabilistic forecasts, QR check-in |
| 11 | High paid CAC | Expensive, short-lived intent | Partnerships, free tools/SEO, guest virality |
| 12 | Payments regulation | Holding funds without a licence is a breach | Licensed PA escrow; legal review |
| 13 | LLM over-reliance | Invented prices break trust | Retrieval + tools only; human escalation |
| 14 | Guest-data privacy | Hosts upload hundreds of numbers | DPDP-grade notices, minimisation, auto-deletion |
| 15 | Well-funded fulfilment rivals | Meragi and The Wedding Company already go end-to-end | Win on budget transparency, verified reviews, escrow and the mid-market; list fulfilment firms as vendors |
| 16 | Gold/macro shocks | Gold rose "nearly 70 per cent" in 2025 (Reuters, via Business Standard, Dec 24, 2025), squeezing other lines | Adjust priors; rental/old-gold partners |

---

## 10. Improvements, MVP, Roadmap, KPIs and Next Steps

### 10.1 Positioning

**"The honest wedding budget and booking app: know what your wedding should cost, book verified vendors with protected payments, and stop paying for guests who don't come."**

### 10.2 Prioritisation

| Feature | Value | Differentiation | Effort | Phase |
|---|---|---|---|---|
| Onboarding + community templates | High | Medium | Low | MVP |
| Budget engine + overspend alerts | Very high | High | Medium | MVP |
| Verified one-city catalog + compare | High | Medium | Medium (ops) | MVP |
| Quote → booking with PA escrow | Very high | High | Medium-High | MVP |
| Verified-booking reviews | High | Very high | Medium | MVP |
| WhatsApp invite + per-event RSVP + forecast | Very high | High | Medium | MVP |
| Family roles + approvals | High | Medium | Low | MVP |
| AI assistant (Hindi/Hinglish) | Medium-High | Medium | Medium | MVP-lite → V1 |
| Quote X-ray, price index, negotiation | High | High | Medium | V1 |
| Vendor and planner SaaS | High | High | Medium | V1 |
| Loans/insurance, guest travel, QR check-in, muhurat optimiser | Medium-High | Medium-High | Medium | V1 |
| 3D décor, registry, substitution guarantee | Medium | Medium | High | V2 |

### 10.3 Roadmap

- **Validation (now → Jan 2027):** interviews, landing pages, concierge pilots run on sheets + WhatsApp + form-based RSVP.
- **MVP (Feb → May 2027):** mobile web + WhatsApp in NCR with 300–500 verified vendors; budget engine v1; PA escrow; verified reviews; per-event RSVP; family roles; concierge team.
- **V1 (Jun → Oct 2027):** native apps; Hindi/Hinglish voice AI; vendor and planner SaaS; quote X-ray; price index; loans/EMI; guest travel; Jaipur/Udaipur supply. Ready for Nov–Dec 2027.
- **V2 (2028):** 3–5 cities, insurance, substitution guarantee, 3D décor, registry, ML budgets and attendance models, data products.

### 10.4 KPIs (illustrative targets)

| Layer | KPI | Target |
|---|---|---|
| Demand | % completing budget setup | 70%+ |
| Conversion | % booking ≥1 vendor; categories per wedding | 40%; 3+ |
| GMV | GMV per wedding; % of event budget on platform | ₹8–12 lakh; 30–40% |
| Monetisation | Take rate; contribution per wedding | 6–8%; ₹40k+ |
| Supply | Vendors per category per peak date; calendar freshness; quote response | ≥10; 80% weekly; <4 hours |
| Trust | Review rate; dispute rate; vendor no-shows | >60%; <3%; <0.5% |
| Guests | RSVP response; forecast error; ₹ saved | >70%; <10%; shown to user |
| Growth | Referral share; CAC; NPS | >30%; <₹15–20k; 50+ |

### 10.5 Next steps and validation experiments

1. **Interviews (2 weeks):**
   - 25 families planning weddings in the next six months
   - 20 vendors
   - 8 planners

   Test willingness to pay via escrow, reactions to verified-only reviews, past RSVP behaviour and real commission norms.
2. **Smoke tests (2–3 weeks, ₹1–2 lakh ads):**
   - "Free wedding budget planner"
   - "Upload your caterer quote, we'll find hidden costs"
   - "WhatsApp RSVP that cuts catering costs"

   Compare CPL and the rate at which signups complete a budget.
3. **Concierge MVP (8–12 weeks):** 10–20 NCR weddings in Jan–Mar 2027. Measure savings delivered, GMV influenced, vendor acceptance of fees and leakage.
4. **Commission test:** offer 50 vendors "pay only on booking" at 5%, 8% or 10%.
5. **RSVP pilot:** 5 weddings, predicted vs QR-checked attendance, catering ₹ saved. This becomes your marketing proof.
6. **Legal set-up:** PA partner, DPDP-ready guest-data notices, vendor contracts, an IS 19000 review policy.
7. **Fundraise narrative:** GMV per wedding, take rate, contribution and supply health in one city. That evidence is what separated Meragi (₹48 crore GMV) and The Wedding Company (₹115 crore FY26 GMV) from the 1,500+ unfunded crowd.\[18\]\[69\]

---

## Caveats

- **Market figures are indicative.** The $130B figure includes jewellery and apparel, and Jefferies itself attributes it to CAIT. CAIT figures are trade-body survey estimates. Commercial reports (Ken Research, IMARC) use different scopes and include forecasts.
- **WedMeGood averages are urban- and platform-skewed** compared with Jefferies' ~₹12 lakh national average.\[49\]
- **Budget splits conflict across sources.** The tier tables are synthesized priors to calibrate with real transactions.
- **Some competitor data is secondary.** The Wedding Company's GMV and profitability come via Weddings.io. WedMeGood's post-FY23 revenue is uncertain because Tracxn, Tofler and EMIS conflict. Planner fee and commission ranges come from planner and marketing websites, not independent surveys.
- **Indian RSVP/attendance rates lack robust public data.** The Western benchmarks are placeholders.
- **Muhurat lists vary by panchang and city.**
- **Regulatory points are summaries, not legal advice.**
- **Cost, pricing, CAC and unit-economics figures are illustrative assumptions** to validate in the pilot.

## Sources

1. [Matrimony.com Ltd Director Discussions | India Infoline](https://www.indiainfoline.com/company/matrimony-com-ltd/reports/directors-report)
2. [\` Press Release 30th October, 2025](https://cait.in/images/press-release/pdf_1762754341.pdf)
3. [Wedding season to generate Rs 4.25 tn in expenditure in Nov-Dec: Report](https://www.business-standard.com/industry/news/wedding-season-to-generate-rs-4-25-tn-in-expenditure-in-nov-dec-report-124091900944_1.html)
4. [The Big Fat Indian Wedding Walks Down the Aisle!](https://voyagersworld.in/2025/05/29/the-big-fat-indian-wedding-walks-down-the-aisle/)
5. [Weddings now a \$130 billion industry; expenses only seen going up disproportionately in most cases- The Week](https://www.theweek.in/news/biz-tech/2024/06/25/weddings-now-a-dollar130-billion-industry-expenses-only-seen-going-up-disproportionately-in-most-cases.html)
6. [Bet on these stocks to mint money on your friend's big fat Indian wedding](https://www.business-standard.com/markets/news/bet-on-these-stocks-to-mint-money-on-your-friend-s-big-fat-indian-wedding-124062400114_1.html)
7. [4.8 million weddings this year to generate over Rs 6 trillion: Cait](https://www.business-standard.com/industry/news/4-8-million-weddings-this-year-to-generate-over-rs-6-trillion-cait-124110500818_1.html)
8. [4.8 million weddings this year to generate over Rs. 6 trillion (US\$ 71.33 billion): Cait](https://www.ibef.org/news/4-8-million-weddings-this-year-to-generate-over-rs-6-trillion-us-71-33-billion-cait)
9. [India’s winter wedding season to generate ₹6.5 Lakh Crore economy in 2025](https://micetalk.com/indias-winter-wedding-season-to-generate-%E2%82%B96-5-lakh-crore-economy-in-2025/)
10. [WedMeGood Report 2025 Shows Rise in Wedding Spends and Shift Towards Local Destination Weddings](https://www.bwtravel.com/industry-insights/wedmegood-report-2025-shows-rise-in-wedding-spends-and-shift-towards-local-destination-weddings-10901110)
11. [Story in Numbers: Big Fat Indian Wedding](https://www.outlookbusiness.com/economy-and-policy/story-in-numbers-big-fat-indian-wedding)
12. [Massive Wedding Season Ahead in India: ₹6 Lakh Crore in Expected Revenue](https://www.bizzbuzz.news/national/massive-wedding-season-ahead-in-india-6-lakh-crore-in-expected-revenue-1341279)
13. [India Wedding Market Share, Companies & Trends Report 2025-2032](https://www.kenresearch.com/industry-reports/india-wedding-market)
14. [WedMeGood Releases 5th Annual Wedding Report 2025, Reveals Key Trends Shaping India’s ₹6.5 Lakh Crore Wedding Industry](https://in.eventfaqs.com/2025/12/04/wedmegood-releases-5th-annual-wedding-report-2025-reveals-key-trends-shaping-indias-%E2%82%B96-5-lakh-crore-wedding-industry/)
15. [WedMeGood Annual Wedding Industry Report 2024-2025](https://www.wedmegood.com/blog/wedmegood-annual-wedding-industry-report-2024-2025/)
16. [Wedding Services Market Size & Share Report, 2026-2033](https://www.grandviewresearch.com/industry-analysis/wedding-services-market-report)
17. [WedMeGood Annual Wedding Industry Report 2025–2026](https://www.wedmegood.com/blog/wedmegood-annual-wedding-industry-report-2025-2026/)
18. [India Wedding Market Data 2026: Every Number That Matters](https://weddings.io/blog/india-wedding-market-data-2026)
19. [Add Tribune As Your Trusted Source](https://www.tribuneindia.com/news/amritsar/floods-liquidity-crunch-skyrocketing-gold-prices-cast-shadow-on-big-fat-lavish-punjabi-weddings/amp)
20. [Wedding Dates in 2026 by Panchang - List of Marriage Muhurat with Timing](https://www.theweddingfocus.com/blog/wedding-dates-2026/)
21. [Marriage Dates in 2026 : Shadi Muhurat And Wedding ...](https://www.astroyogi.com/panchang/muhurat/marriage-muhurat-dates)
22. [Hindu Wedding Dates 2026: Auspicious Vivah Muhurat](https://www.weddingkart.co/blog/hindu-wedding-dates-muhurat)
23. [Hindu Wedding Muhurat Dates: November 2026 to December 2027](https://purohit.app/blog/wedding-muhurat-dates-2026-2027)
24. [Hindu Wedding Dates 2026: Nov & Dec Vivah Muhurat Left](https://www.indianweddingplanners.in/Blogs/Auspicious-Hindu-Wedding-Dates-2025-2026)
25. [Shaadi Muhurat 2027](https://destinationweddingsindia.com/shaadi-muhurat-2027/)
26. [Vivah Muhurat 2027](https://swarnsiddhi.com/vivah-muhurat/2027)
27. [Vivah Shubh Muhurat 2027](https://www.eternalweddingz.in/blogs/auspicious-wedding-dates-in-2027-hindu-panchang/view)
28. [India's wedding season biz expected to surge 41 pc to Rs 6 lakh crore: CAIT](https://www.dtnext.in/news/business/indias-wedding-season-biz-expected-to-surge-41-pc-to-rs-6-lakh-crore-cait-810034)
29. [Wed Tech Platform WedMeGood Launches their 4th Annual Wedding Report 2024](https://tourismquest.com/2024/11/28/wed-tech-platform-wedmegood-launches-their-4th-annual-wedding-report-2024/)
30. [indias grand weddings return albeit much pricier report 1050593](https://www.deccanherald.com/business/indias-grand-weddings-return-albeit-much-pricier-report-1050593.html)
31. [Indian Wedding Cost 2026: Budget Breakdown by Guests](https://velvetknot.in/indian-wedding-cost-budget-breakdown/)
32. [WedMeGood Reviews: Customer Reviews & Ratings](https://www.mouthshut.com/product-reviews/wedmegood-reviews-926087416)
33. [Does a Wedding App Need \$2 Million to Build Brand Trust in India? · WeddingSaaS Editorial](https://www.weddingsaas.com/blog/wedding-app-india-funding-brand-trust)
34. [Is WedMeGood Worth It for Vendors? Honest Review](https://www.weddingkart.co/blog/is-wedmegood-worth-it-for-vendors)
35. [Genie - Booking Venues with Best Deals, Finding Best Professionals](https://www.wedmegood.com/genie)
36. [The Knot Worldwide: Company Overview & Growth](https://www.scribd.com/document/972704992/WeddingWire-Company-Report)
37. [The Knot Worldwide — Grokipedia](https://grokipedia.com/page/The_Knot_Worldwide)
38. [The Knot vs WeddingWire vs Zola vs Wedy: Honest Marketplace Comparison for Vendors (2026)](https://www.wedypro.ai/blog/wedding-vendor-marketplace-comparison)
39. [Zola vs The Knot: Which Wedding Website Wins?](https://www.weddingkart.co/blog/zola-vs-the-knot)
40. [WeddingZ - 2026 Company Profile, Team, Funding, Competitors & Financials - Tracxn](https://tracxn.com/d/companies/weddingz/__kyo-t-eAFzaOY8ii30-8gbl1v435b6xlfNnjZfAUbpE)
41. [Oyo acquires wedding planning startup Weddingz - The Indian Wire](https://www.theindianwire.com/startups/oyo-acquires-weddingz-69441/)
42. <https://nsearchives.nseindia.com/corporate/MATRIMONY_14052026232449_NSEInvestorpresentation14May2026final.pdf>
43. [Matrimony.com pivots to a commission-based model in wedding services business - MEDIANAMA](https://www.medianama.com/2026/08/223-matrimony-com-commission-wedding-services/)
44. [Zola vs The Knot 2026: Fees, Registry & Which Saves You \$250](https://www.nathantailors.com/en/blog/zola-vs-the-knot-vs-weddingwire-2026)
45. [RSVP'd - The Knot vs Zola vs RSVP'd: A Feature-by-Feature Comparison](https://rsvpd.ai/resources/knot-vs-zola-vs-rsvpd-comparison)
46. [The Knot Worldwide](https://en.wikipedia.org/wiki/The_Knot_Worldwide)
47. [Why WedMeGood Is The #1 Trusted Platform To Find & Finalise Verified Wedding Venues](https://www.wedmegood.com/blog/why-wedmegood-is-the-1-trusted-platform-to-find-finalise-verified-wedding-venues/)
48. [Average Wedding Cost in India (2026): City-by-City Breakdown](https://itsmy.wedding/blog/average-wedding-cost-india-2026)
49. [Wedding Budget Calculator India 2026 - Free & Instant](https://www.weddingkart.co/tools/wedding-budget-calculator)
50. [RBI's Updated Guidelines For Payment Aggregators 2025: Key Details](https://authbridge.com/blog/rbi-payment-aggregator-master-direction-2025/)
51. [Prepared by Vinod Kothari Consultants Payment Aggregators come under common](https://vinodkothari.com/wp-content/uploads/2025/09/Key-Highlights-of-PA-2025-2.pdf)
52. [How Many Wedding Guests Actually Show Up? Real Couples Share Their Experience](https://www.weddingwire.com/wedding-forums/guests-attended/36eca639e8426fdd.html)
53. [What Percentage of Wedding Invitations Attend? - Leslie Stationery Store](https://www.lesliestore.com/wedding-stationery-blog/what-percentage-of-wedding-invitations-attend/)
54. [Wedding Guest Count Calculator & Attendance Forecast](https://guestcounted.com/)
55. [What Percentage of Invited Guests Attend a Wedding? (2026 Data)](https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend)
56. [How Many Guests Won't Come to a Wedding? Tips for Accurate RSVPs and Planning - OMG Hitched!](https://omghitched.com/how-many-guests-wont-come-to-a-wedding/)
57. [Indian Wedding RSVP Guide: How to Handle 5 Ceremonies](https://www.invyt.app/blog/indian-wedding-rsvp-management)
58. [How to choose a wedding planner in India](https://www.weddingagents.in/blog/how-to-choose-a-wedding-planner-in-india)
59. [What a luxury wedding planner actually costs in India — 2026 guide](https://dwbytripn.in/journal/wedding-planner-cost-india-2026)
60. [Wedding Planner Cost in India 2026: Fees, Packages & Price List](https://plan4event.in/blog/wedding-planners/wedding-planner-cost-in-india-2026-guide)
61. [Hidden Wedding Planner Commissions in India: What Couples Should Know](https://hitchedindia.com/hidden-wedding-planner-commissions-india/)
62. [Google Places API Terms: What Can You Store & Cache?](https://bizcollect.dev/blog/google-places-api-terms)
63. [WhatsApp Business API Pricing in India 2026 (Per Message)](https://chatmaxima.com/whatsapp-api-pricing/india/)
64. [WedMeGood Review by Delhi based Wedding Photographer (August 2026)](https://www.navdeepsoni.com/wedmegood-review/)
65. [VENDOR COMPLAINTS](https://theknotwhistleblowers.com/vendor-complaints)
66. [it.trustpilot.com](https://it.trustpilot.com/review/weddingwire.com)
67. [dk.trustpilot.com](https://dk.trustpilot.com/review/weddingwire.com)
68. [The Knot to Acquire Zola](https://theknotwhistleblowers.com/the-knot-to-acquire-zola)
69. [Wedding Services Startup Meragi Raises USD 9.1 Mn in Series A Round Led by Accel](https://india.entrepreneur.com/news-and-trends/wedding-services-startup-meragi-raises-usd-91-mn-in-series/477748)
70. [Enforcement of the DPDP Act and notification of the DPDP rules - Shardul Amarchand Mangaldas & Co](https://www.amsshardul.com/insight/enforcement-of-the-dpdp-act-and-notification-of-the-dpdp-rules/)
71. [DPDP Rules 2025 Checklist: Deadlines & Penalties](https://www.invield.com/resources/dpdp-rules-checklist)
72. [DPDP Rules 2025: The Complete Implementation Roadmap for Indian Companies](https://www.tcsa.in/resources/dpdp-rules-2025-implementation-roadmap)
73. [Can you store Places API results? Every caching policy, compared](https://openplacesapi.com/blog/can-you-store-places-api-results)
74. [Standard titled “IS 19000:2022”](https://www.iasgyan.in/daily-current-affairs/standard-titled-is-190002022)
75. [customer reviews online](https://techcrunch.com/?p=2445897)
