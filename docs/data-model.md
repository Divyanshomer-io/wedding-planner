# Data Model

Owner: data-architect. Update this file in the same change whenever any data structure changes, and note breaking changes in the Changelog at the bottom.

Source: `docs/user-stories.md` (Data model section, Epics 2, 4, 5, 6, 7) and `docs/research-report.md` 6.3. Version 2 (full rewrite of the earlier 12-entity draft; see Changelog for breaking changes).

Scope: prototype is frontend only. Data lives in typed JSON/TS seed files under `src/data/` and a Zustand store persisted to localStorage. The model is shaped so each entity can become one PostgreSQL table with no redesign.

## 1. Conventions

| Topic | Rule |
| --- | --- |
| IDs | `type Id = string`. Mock data uses readable slugs with a type prefix (`wed_aarav_meera`, `ven_042`, `evt_sangeet_01`). Production: UUIDv7 stored as `uuid`. Never reuse or renumber an id. |
| Money | **Integer rupees (INR)**. Never floats, never paise. Field names end in `Amount`, `Price`, `Rate`, `Fee` or are listed as `Rupees` in the type comment. Per-unit prices (per plate, per room night) are also integer rupees. Rounding of derived values uses a single `roundRupees()` helper; remainders go to the largest line (see US-2.1). Display grouping (Rs 12,50,000, lakh/crore) is a UI concern only. |
| Percentages and rates | Stored as integer **basis points** (`Bp`, 100 bp = 1%, 10000 = 100%) so no float ever enters stored data. Multipliers (cityMult, seasonMult) stored as integer permille (`Permille`, 1000 = 1.00x). Ratings stored as integer tenths (`RatingTenths`, 47 = 4.7) or per-dimension integers 1 to 5. |
| Timestamps | ISO 8601 strings in UTC: `type IsoTs = string` (`2026-10-28T09:30:00Z`). Calendar-only values are `type IsoDate = string` (`2026-12-12`). Times of day are `type HHmm = string` (`19:30`, 24h, rendered 12h). Every entity has `createdAt` and `updatedAt` unless it is immutable reference data (then `createdAt` only) or append-only (then `createdAt` only, marked below). Never call `Date.now()` in domain logic: use the app clock (section 6). |
| Soft delete | Entities that hosts may delete (Guest, Household) carry `deletedAt?: IsoTs`. All others are hard-deleted or status-closed. |
| Enums | String-literal unions listed in section 4. Stored as `text` with CHECK in Postgres or native enums (section 8). |
| Nullability | `?` means optional/nullable. Arrays and JSON blobs are noted as `Json` fields and have a normalised alternative in section 8. |
| Naming | camelCase in TS and JSON; snake_case in Postgres. Foreign keys are `<entity>Id`. |
| Demo flag | Any seeded row that stands in for real data carries `isMock: true` (drives the Demo badge). Vendors, price index, reviews, forecasts are always mock in the prototype. |

Shared type aliases:

```ts
type Id = string;
type IsoTs = string;      // 2026-10-28T09:30:00Z
type IsoDate = string;    // 2026-12-12
type HHmm = string;       // "19:30"
type Rupees = number;     // integer INR
type Bp = number;         // integer basis points
type Permille = number;   // integer, 1000 = 1.00x
interface Stamped { createdAt: IsoTs; updatedAt: IsoTs }
```

## 2. Entities

Notation: `field: Type` with `?` for optional. `-> Entity` marks a foreign key. "PK" is `id` unless stated.

### 2.1 Identity and membership

#### User
Person with an account (all personas except Guest). Mock auth only.
```ts
interface User extends Stamped {
  id: Id;
  name: string;
  phone: string;                // E.164, unique, masked in UI for vendors
  role: UserRole;               // platform persona, see enum
  language: Language;           // 'en' | 'hinglish', applies at once (US-1.1)
  simpleMode: boolean;          // parent mode (US-7.9)
  vendorId?: Id;                // -> Vendor, only when role = 'vendor'
  isMock: boolean;
}
```
Indexes: unique(phone). Relationships: has many Member; optionally one Vendor.

#### Wedding
```ts
interface Wedding extends Stamped {
  id: Id;
  brideName: string;
  groomName: string;
  brideCity: string;
  groomCity: string;
  whatsappNumber: string;
  planningMode: PlanningMode;        // couple | parents | both | planner
  community: Community;
  subCommunity?: string;
  weddingCity: string;               // or destination id below
  destinationId?: Id;                // -> Destination, set when destination wedding
  isDestination: boolean;
  venueTypePref?: VenueType;
  dateMode: DateMode;                // exact | range | suggest
  date?: IsoDate;                    // wedding day (first event date for multi-day)
  dateRangeStart?: IsoDate;
  dateRangeEnd?: IsoDate;
  dateFlexibility: DateFlexibility;
  totalBudget: Rupees;
  excludesJewellery: boolean;
  payerSplitBp: { brideSide: Bp; groomSide: Bp; couple: Bp };   // sums to 10000
  tier: BudgetTier;                  // derived at onboarding, stored
  priorities: BudgetCategory[];      // top 3, ordered
  styleIds: string[];                // mood card keys
  foodRules: FoodRule[];
  alcohol: 'yes' | 'no' | 'limited';
  outstationSharePct: number;        // integer 0..100
  nriGuests: boolean;
  accessibilityNeeds: string[];
  kidsCount: number;
  baraatStyle?: string;
  sustainability: boolean;
  plannerInvolvement: 'diy' | 'partial' | 'full';
  shagunApproach: 'cash' | 'gifts' | 'registry';
  honeymoonPlanned: boolean;
  profileCompletePct: number;        // integer 0..100, derived and stored
  approvalThreshold: Rupees;         // spends above this need co-owner approval
  rsvpCutoffDate?: IsoDate;
  templateId?: Id;                   // -> FunctionTemplate used at creation
  plannerUserId?: Id;                // -> User, when role planner manages it
  status: 'draft' | 'planning' | 'live' | 'completed';
  isMock: boolean;
}
```
Has many Event, BudgetLine, Member, Quote, Booking, Household, Task, Approval, Notification, Gift, Forecast, Shortlist.

#### Member
Join of User and Wedding with permissions. Composite PK (`weddingId`, `userId`).
```ts
interface Member extends Stamped {
  weddingId: Id;                     // -> Wedding
  userId: Id;                        // -> User
  role: MemberRole;                  // owner | co_owner | contributor | viewer | planner
  side: Side;                        // bride | groom | common
  approvalThreshold?: Rupees;        // per-member override of Wedding.approvalThreshold
  canSeeFullBudget: boolean;         // false for contributors (US-7.4)
  eventScopeIds: Id[];               // -> Event[], contributor sees only these (Json; join table in PG)
  invitedVia: 'phone' | 'link' | 'seed';
  inviteStatus: 'pending' | 'accepted';
}
```

### 2.2 Wedding structure

#### Event (function)
```ts
interface Event extends Stamped {
  id: Id;
  weddingId: Id;                     // -> Wedding
  type: EventType;                   // roka, haldi, sangeet, pheras, reception, ...
  name: string;                      // user-renamable
  sortOrder: number;                 // reorderable (US-1.5)
  date?: IsoDate;
  startTime?: HHmm;
  endTime?: HHmm;
  venueBookingId?: Id;               // -> Booking (category venue)
  venueName?: string;                // free text until a venue is booked
  guestCountPlanned: number;         // invited headcount
  guestCountBudgeted: number;        // attendees used by cost model (RSVP-adjusted)
  mealsPerGuest: number;             // catering weight (US-2.2)
  dressCode?: string;
  ritualSteps: RitualStep[];         // Json, feeds run-sheet (US-7.3, 8.1)
  runOfShow: RunSheetItem[];         // Json, status tracked on the day (US-8.1)
  notes?: string;
  isMock: boolean;
}
interface RitualStep { order: number; title: string; items: string[]; participants?: string }
interface RunSheetItem {
  id: Id; time: HHmm; activity: string; ownerUserId?: Id; vendorBookingId?: Id;
  location?: string; status: RunSheetStatus; delayMinutes: number;
}
```
Has many Task, RSVP, Invitation (via `eventIds`), BudgetLine (optional), Table, Pickup, CheckIn, Forecast.

#### BudgetLine
One row per category (wedding level) and optionally per category per event (sub-budget, US-2.2). Allocated is stored; committed, paid and remaining are **derived** by `src/lib/budget/` and never stored (avoids drift). Cache shape is in section 6.
```ts
interface BudgetLine extends Stamped {
  id: Id;
  weddingId: Id;                     // -> Wedding
  category: BudgetCategory;
  eventId?: Id;                      // -> Event; null = wedding-level line
  allocatedAmount: Rupees;
  weightBp: Bp;                      // share of total at time of allocation
  locked: boolean;                   // never touched by rebalance
  isContingency: boolean;            // category = 'contingency'; locked by default
  source: 'recommended' | 'edited';
  recommendedAmount: Rupees;         // for Reset to recommended
  whyText: string;                   // one-line explanation key (i18n key)
  hidden: boolean;                   // user hid category (US-3.1)
  isCustom: boolean;                 // user-added category (US-3.10)
  customName?: string;
  status: CategoryStatus;            // not_started | shortlisting | quote_requested | booked
}
```
Invariants: for a wedding, sum of wedding-level `allocatedAmount` = `Wedding.totalBudget`; contingency never reduced by rebalancing; per-event lines of a category sum to that category's wedding-level amount. Aggregates Booking by `Booking.category` plus `eventId`.

#### Task
```ts
interface Task extends Stamped {
  id: Id;
  weddingId: Id;                     // -> Wedding
  eventId?: Id;                      // -> Event
  category?: BudgetCategory;         // linked category
  title: string;
  ownerUserId?: Id;                  // -> User (assignee)
  dueDate: IsoDate;
  status: TaskStatus;                // todo | in_progress | done
  dependsOnIds: Id[];                // -> Task[] (Json; join table in PG)
  leadTimeDays?: number;             // from checklist template
  templateTaskKey?: string;          // -> ChecklistTemplate item
  highRisk: boolean;                 // compressed-plan flag (US-7.2)
  notes?: string;
  completedAt?: IsoTs;
}
```

### 2.3 Vendors and availability

#### Vendor
```ts
interface Vendor extends Stamped {
  id: Id;
  name: string;
  category: VendorCategory;
  subcategory?: string;
  group: VendorGroup;                // Venue and stay, Food, ...
  city: string;
  areas: string[];                   // Json; join table in PG
  serviceCities: string[];           // hard filter (US-3.2)
  serviceRadiusKm: number;
  travelFeeAmount: Rupees;           // flat travel fee outside radius
  lat?: number; lng?: number;        // vendor-verified coordinates (research 6.3: do not cache map-provider data)
  priceFromAmount: Rupees;
  priceUnit: PriceUnit;
  capacityMin?: number;
  capacityMax?: number;
  roomsCount?: number;               // venues
  tags: string[];                    // style, veg/Jain, amenities
  styleTags: string[];
  foodOptions: FoodRule[];           // caterers
  inHouseCateringOnly: boolean;      // venue rules flattened for filters
  verifiedBadges: VerifiedBadge[];   // earned, never sold (US-5.7)
  badgeDetails: Record<VerifiedBadge, { checkedOn: IsoDate; note: string }>;
  ratingAvgTenths: RatingTenths;     // Bayesian score, derived and cached
  reviewCount: number;
  verifiedReviewCount: number;
  responseTimeHrs: number;
  completedBookingsCount: number;    // reputation passport (US-5.8)
  cancellationPolicyId?: Id;         // -> CancellationPolicy
  policies: { gst: GstMode; overtimeRateAmount: Rupees; overtimeUnit: 'hour' | 'day'; cancellationTiers: CancellationTier[]; paymentMilestones: MilestoneTemplate[] };
  venueRules?: VenueRules;           // see below
  calendarUpdatedAt?: IsoTs;         // freshness badge (US-9.2)
  onboardingStatus: VendorOnboardingStatus;   // submitted | under_review | verified | live | rejected
  gstin?: string;                    // mock
  gallery: string[];                 // image keys/URLs
  isSponsored: boolean;              // always labelled, never mixed into best match
  isMock: boolean;
}
interface VenueRules {
  inHouseCateringOnly: boolean; outsideCateringFeeAmount: Rupees; corkageFeeAmount: Rupees;
  decorExclusive: boolean; musicCutoffTime?: HHmm; djCurfew?: HHmm; alcoholLicence: boolean;
  fireworksAllowed: boolean; baraatAllowed: boolean; parkingSpots: number; powerBackup: boolean;
  needsTentHouse: boolean; needsGenerator: boolean;
}
```
Has many Package, Availability, Review, Quote, Booking. Reputation passport counts only platform-completed bookings.

#### Package
```ts
interface Package extends Stamped {
  id: Id;
  vendorId: Id;                      // -> Vendor
  name: string;
  priceAmount: Rupees;               // per unit, in rupees
  unit: PriceUnit;                   // per_plate | per_day | per_function | per_room_night | flat | per_hour | per_km
  minQuantity?: number;              // minimums, e.g. 100 plates
  inclusions: string[];
  exclusions: string[];
  gstMode: GstMode;                  // included | excluded
  gstRateBp: Bp;                     // typically 1800 (18%) or 500
  overtimeRateAmount: Rupees;
  tierFit: BudgetTier[];             // which budget tiers this fits (mock authoring aid)
  eventTypes: EventType[];           // suitable functions
  isMock: boolean;
}
```

#### Availability
Composite PK (`vendorId`, `date`). Absent row = free.
```ts
interface Availability extends Stamped {
  vendorId: Id;                      // -> Vendor
  date: IsoDate;
  status: AvailabilityStatus;        // free | held | booked | blocked
  heldByQuoteId?: Id;                // -> Quote, while status = held
  bookingId?: Id;                    // -> Booking, when booked
  isPeak: boolean;                   // denormalised from MuhuratDate demand
}
```

#### Shortlist and Poll
One row per wedding-vendor pair, with votes and comments in child rows (Comment is shared, see 2.9).
```ts
interface Shortlist extends Stamped {
  id: Id;
  weddingId: Id;                     // -> Wedding
  vendorId: Id;                      // -> Vendor
  packageId?: Id;                    // -> Package
  category: BudgetCategory;
  eventId?: Id;                      // -> Event
  addedByUserId: Id;                 // -> User
  compare: boolean;                  // in the 2 to 3 compare tray
  pollId?: Id;                       // -> Poll when put to a family vote
}
interface Poll extends Stamped {
  id: Id;
  weddingId: Id;
  title: string;
  category?: BudgetCategory;
  options: { id: Id; vendorId?: Id; label: string }[];   // Json; PollOption table in PG
  status: 'open' | 'closed';
  closesAt?: IsoTs;
  createdByUserId: Id;
}
interface Vote { id: Id; pollId: Id; optionId: Id; userId: Id; createdAt: IsoTs }  // append-only; unique(pollId, userId)
```

### 2.4 Quotes, bookings, payments

#### Quote
Versioned: a counter-offer creates a new row with `version + 1` and `previousQuoteId`.
```ts
interface Quote extends Stamped {
  id: Id;
  weddingId: Id;                     // -> Wedding
  vendorId: Id;                      // -> Vendor
  packageId?: Id;                    // -> Package
  eventId?: Id;                      // -> Event
  category: BudgetCategory;
  version: number;
  previousQuoteId?: Id;              // -> Quote
  status: QuoteStatus;               // requested | received | negotiating | accepted | declined | expired
  requestDetails: { date: IsoDate; guestCount: number; venueName?: string; notes?: string; requirements: string[] };
  lineItems: QuoteLineItem[];        // Json; QuoteLineItem table in PG
  subtotalAmount: Rupees;
  gstAmount: Rupees;
  overtimeRateAmount: Rupees;
  minimumAmount?: Rupees;
  totalAmount: Rupees;               // subtotal + gst, integer
  gstMode: GstMode;
  validUntil: IsoDate;
  cancellationPolicyId?: Id;         // -> CancellationPolicy
  inclusions: string[];
  exclusions: string[];
  respondedAt?: IsoTs;               // simulated vendor response time
  counterOfferAmount?: Rupees;
  priceIndexVerdict?: 'fair' | 'high' | 'low';   // US-3.8, US-10.1
  source: 'platform' | 'offline_xray';           // uploaded quote (US-3.8)
  isMock: boolean;
}
interface QuoteLineItem { id: Id; label: string; quantity: number; unit: PriceUnit; unitPriceAmount: Rupees; amount: Rupees; taxable: boolean }
```
Becomes at most one Booking (the accepted version).

#### CancellationPolicy
Reference/policy data reused by vendors, quotes and bookings.
```ts
interface CancellationPolicy { id: Id; name: string; tiers: CancellationTier[]; isDefault: boolean; createdAt: IsoTs }
interface CancellationTier { minDaysBefore: number; maxDaysBefore?: number; refundBp: Bp; feeAmount?: Rupees; label: string }
// default: >120d refundable minus fee; 60-120d partial; <30d non-refundable (US-4.5)
```

#### Booking
```ts
interface Booking extends Stamped {
  id: Id;
  weddingId: Id;                     // -> Wedding
  quoteId: Id;                       // -> Quote (accepted version)
  vendorId: Id;                      // -> Vendor (denormalised for queries)
  eventId?: Id;                      // -> Event
  category: BudgetCategory;
  status: BookingStatus;             // pending_signature | confirmed | in_delivery | completed | cancelled
  totalAmount: Rupees;               // committed amount, includes GST
  contract: { summary: string; signedByName?: string; signedAt?: IsoTs; terms: string[] };
  cancellationPolicyId: Id;          // -> CancellationPolicy
  cancellationTiers: CancellationTier[];  // snapshot at signing
  eventDate: IsoDate;
  contactUnmasked: boolean;          // true after quote accepted
  changeRequests: ChangeRequest[];   // Json; table in PG
  approvalId?: Id;                   // -> Approval when over threshold
  completedAt?: IsoTs;               // gate for reviews
  cancelledAt?: IsoTs;
  refundAmount?: Rupees;
  isOffline: boolean;                // booked outside platform (offline invoice review path)
  offlineInvoiceRef?: string;
  isMock: boolean;
}
interface ChangeRequest { id: Id; kind: 'date' | 'guest_count' | 'add_on'; detail: string; deltaAmount: Rupees; status: 'requested' | 'accepted' | 'declined'; createdAt: IsoTs }
```
Has many Milestone, Payment, Review (at most one per reviewer role), Dispute.

#### Milestone
Scheduled payment obligation.
```ts
interface Milestone extends Stamped {
  id: Id;
  bookingId: Id;                     // -> Booking
  label: string;                     // Advance | Mid-point | Final
  kind: 'advance' | 'mid' | 'final' | 'custom';
  dueDate: IsoDate;
  amount: Rupees;                    // sum over booking = booking.totalAmount
  status: MilestoneStatus;           // upcoming | due | paid | overdue | refunded | cancelled
  escrowState: EscrowState;          // none | held | released | refunded
  releaseTrigger: 'user_confirm' | 'auto_after_event' | 'dispute_hold';
  releasedAt?: IsoTs;
}
```

#### Payment
Actual money event (simulated). Append-only with respect to amount; status can progress.
```ts
interface Payment extends Stamped {
  id: Id;
  bookingId: Id;                     // -> Booking
  milestoneId?: Id;                  // -> Milestone; null for ad-hoc offline cash
  weddingId: Id;                     // denormalised for ledger queries
  amount: Rupees;
  mode: PaymentMode;                 // upi | card | netbanking | emi | cash | bank_transfer | cheque
  status: PaymentStatus;             // initiated | succeeded | failed | refunded
  escrowState: EscrowState;
  offline: boolean;                  // true = not escrow protected, tagged offline
  paidOn: IsoDate;
  paidBySide: Side;
  paidByUserId?: Id;                 // -> User
  proofImage?: string;
  receiptNo: string;                 // generated, unique per wedding
  reference?: string;                // fake txn id, labelled Demo
  isMock: boolean;
}
```
Ledger rule: Paid = sum of `Payment.amount` where `status = succeeded` minus refunds, including offline. Committed = sum of `Booking.totalAmount` for status not cancelled.

#### Payout (vendor view, derived)
Not persisted in the prototype: computed from Milestone and Payment (commission `Wedding`-independent demo rate 700 bp in config). Becomes a table with a real ledger (section 8).

### 2.5 Reviews and trust

#### Review
```ts
interface Review extends Stamped {
  id: Id;
  bookingId: Id;                     // -> Booking (required: only verified bookings review)
  vendorId: Id;                      // -> Vendor
  weddingId: Id;                     // -> Wedding
  authorUserId: Id;                  // -> User
  kind: 'customer' | 'guest';        // guest = QR attended, lower weight (US-5.1)
  prompt: 'day_of' | 'deliverables'; // T+3d and T+45d (US-5.2)
  ratings: { quality: 1|2|3|4|5; value: 1|2|3|4|5; punctuality: 1|2|3|4|5; matchedPromise: 1|2|3|4|5; noHiddenCharges: 1|2|3|4|5 };
  overallTenths: RatingTenths;       // derived mean
  text?: string;
  media: { type: 'photo' | 'video'; url: string }[];
  verificationLevel: VerificationLevel;      // paid_on_platform | offline_invoice | guest_attended
  pricePaidPrivateAmount?: Rupees;   // never shown publicly; feeds PriceIndexEntry
  eventType?: EventType;
  vendorResponse?: { text: string; respondedAt: IsoTs };   // one per review (US-5.4)
  appendedUpdates: { text: string; createdAt: IsoTs }[];   // no edits, only appends (US-5.3)
  moderationStatus: ModerationStatus;        // published | held | removed | evidence_requested
  fraudSignals: FraudSignal[];       // mock flags for admin queue
  weight: number;                    // integer permille, recency x verification (derived)
  isMock: boolean;
}
```
Constraint: at most one Review per (bookingId, authorUserId, prompt). Reviews are not editable; `createdAt` is immutable.

#### ModerationAction (append-only)
```ts
interface ModerationAction { id: Id; reviewId: Id; adminUserId: Id; action: 'approve' | 'hold' | 'remove' | 'request_evidence'; reason: string; createdAt: IsoTs }
```

### 2.6 Guests, invitations, RSVP

#### Household
```ts
interface Household extends Stamped {
  id: Id;
  weddingId: Id;                     // -> Wedding
  name: string;                      // "Sharma family"
  headGuestId?: Id;                  // -> Guest, may respond for household
  phone?: string;                    // unique per wedding for duplicate detection
  side: Side;
  relationship: Relationship;
  city?: string;
  outstation: boolean;
  tags: string[];                    // for bulk invite (US-6.1)
  invitedEventIds: Id[];             // -> Event[]; matrix source of truth (Json; join table in PG)
  plusOneAllowed: boolean;
  notes?: string;
  likelihoodOverrideBp?: Bp;         // host override (US-6.8)
  qrCode: string;                    // token for check-in
  deletedAt?: IsoTs;
  isMock: boolean;
}
```

#### Guest
```ts
interface Guest extends Stamped {
  id: Id;
  weddingId: Id;                     // -> Wedding (denormalised)
  householdId: Id;                   // -> Household
  name: string;
  phone?: string;
  ageGroup: 'adult' | 'child';
  dietary: DietaryNeed;              // veg | jain | non_veg | vegan | egg
  allergies: string[];
  accessibility: string[];
  isVip: boolean;
  deletedAt?: IsoTs;
}
```

#### Invitation
One per household (a household link covers all invited events).
```ts
interface Invitation extends Stamped {
  id: Id;
  weddingId: Id;
  householdId: Id;                   // -> Household
  token: string;                     // unique, URL-safe, route /invite/:token
  templateKey: InviteTemplate;       // 6+ templates
  language: 'en' | 'hi' | 'hinglish';
  version: 'bride_side' | 'groom_side';
  personalMessage?: string;
  eventIds: Id[];                    // -> Event[]
  deliveryStatus: 'draft' | 'sent' | 'delivered' | 'opened';
  sentAt?: IsoTs;
  deliveredAt?: IsoTs;
  openedAt?: IsoTs;
  remindersSent: { at: IsoTs; offsetDays: 30 | 14 | 7 }[];
  whiteLabel?: { logo?: string; colour?: string };    // planner branding (US-9.9)
}
```

#### RSVP
Unique (`householdId`, `eventId`).
```ts
interface RSVP extends Stamped {
  id: Id;
  weddingId: Id;
  householdId: Id;                   // -> Household
  eventId: Id;                       // -> Event
  status: RsvpStatus;                // pending | yes | no | maybe
  adults: number;
  children: number;
  attendeeGuestIds: Id[];            // -> Guest[]
  dietaryCounts: Record<DietaryNeed, number>;
  accessibility: string[];
  needsPickup: boolean;
  needsRoom: boolean;
  arrival?: { at: IsoTs; mode?: string; location?: string };
  departure?: { at: IsoTs; mode?: string };
  plusOneName?: string;
  noteToHosts?: string;
  enteredBy: 'guest' | 'host';       // 'entered by host' badge (US-6.6)
  respondedAt?: IsoTs;
}
```

#### Forecast
Derived attendance, stored per computation for history and accuracy reporting.
```ts
interface Forecast {
  id: Id;
  weddingId: Id;
  eventId: Id;                       // -> Event
  invited: number;
  confirmed: number; maybe: number; noResponse: number; declined: number;
  low: number; likely: number; high: number;
  assumptions: ForecastAssumptions;  // editable panel values, snapshot
  recommendedPlates: number;         // likely + buffer
  platesSaved: number;               // invited - recommendedPlates
  savingAmount: Rupees;              // platesSaved x booked per-plate rate
  appliedToBudget: boolean;
  actualAttendance?: number;         // from CheckIn, for accuracy report
  computedAt: IsoTs;
  isMock: boolean;
}
interface ForecastAssumptions {
  confirmedShowBp: Bp;               // 9000..9500
  unconfirmedShowBp: Bp;             // 300..700
  maybeShowBp: Bp;                   // default 5000
  outstationFactorBp: Bp;
  priorAttendBp: Bp;                 // 7500..8500, placeholder prior before responses
  bufferBp: Bp;                      // default 500
  label: 'placeholder';
}
```

### 2.7 Hospitality, seating, check-in

```ts
interface RoomBlock extends Stamped {
  id: Id; weddingId: Id; vendorId: Id /* -> Vendor (hotel) */; roomType: string;
  nights: number; checkInDate: IsoDate; roomsHeld: number; roomsRequested: number;
  rateAmount: Rupees;                // per room per night
  releaseByDate?: IsoDate; assignments: { roomNo: string; householdIds: Id[] }[];   // Json; RoomAssignment table in PG
}
interface Pickup extends Stamped {
  id: Id; weddingId: Id; householdId: Id; eventId?: Id;
  arrivalAt: IsoTs; location: string; mode: 'flight' | 'train' | 'road';
  vehicleId?: string; vehicleType?: 'car' | 'bus' | 'tempo'; driverName?: string; driverPhone?: string;
  status: 'requested' | 'assigned' | 'done'; costAmount: Rupees;
}
interface Table extends Stamped {
  id: Id; weddingId: Id; eventId: Id; name: string; capacity: number;
  guestIds: Id[];                    // -> Guest[] (Json; TableSeat table in PG)
  isVipTable: boolean; familyBlock?: string;
}
interface CheckIn {                  // append-only
  id: Id; weddingId: Id; eventId: Id; householdId: Id; guestId?: Id;
  countAdults: number; countChildren: number; checkedInAt: IsoTs; deskUserId?: Id;
}
```

### 2.8 Approvals, tasks support, notifications, disputes, gifts

#### Approval
```ts
interface Approval extends Stamped {
  id: Id;
  weddingId: Id;
  entityType: 'quote' | 'booking' | 'expense' | 'budget_change';
  entityId: Id;                      // polymorphic; Quote or Booking id
  amount: Rupees;
  requestedByUserId: Id;
  approverIds: Id[];                 // -> User[] (co-owners); join table in PG
  decisions: { userId: Id; decision: 'approved' | 'rejected'; comment?: string; at: IsoTs }[];
  status: ApprovalStatus;            // pending | approved | rejected | withdrawn
  resolvedAt?: IsoTs;
}
```

#### Comment (shared thread entity)
```ts
interface Comment { id: Id; weddingId: Id; entityType: 'vendor' | 'quote' | 'task' | 'event' | 'booking' | 'shortlist'; entityId: Id; authorUserId: Id; text: string; createdAt: IsoTs; updatedAt: IsoTs }
```

#### Notification and Activity
Two related append-only streams sharing a shape: `Activity` is the visible feed and change log, `Notification` is the per-user reminder.
```ts
interface Activity {                 // append-only
  id: Id; weddingId: Id; type: ActivityType; actorId?: Id /* -> User */;
  entityType?: string; entityId?: Id; text: string;          // i18n key plus params in prod
  before?: Json; after?: Json;                                // change history (US-7.6)
  createdAt: IsoTs;
}
interface Notification {
  id: Id; weddingId: Id; userId: Id; /* recipient */ type: NotificationType;
  title: string; text: string; whatsappPreviewText?: string;
  entityType?: string; entityId?: Id;
  readBy: Id[]; readAt?: IsoTs;      // single recipient uses readAt; readBy kept for shared alerts
  dueAt?: IsoTs; createdAt: IsoTs;
}
```

#### Dispute
```ts
interface Dispute extends Stamped {
  id: Id; bookingId: Id; weddingId: Id; vendorId: Id;
  raisedByUserId: Id; category: DisputeCategory;
  description: string; evidence: { url: string; kind: 'photo' | 'doc' | 'chat' }[];
  desiredOutcome: 'refund' | 'partial_refund' | 'redo' | 'substitute';
  status: DisputeStatus;             // open | evidence_requested | under_review | resolved | rejected
  escrowHold: boolean;               // holds release of milestones
  resolution?: { decision: 'release' | 'refund' | 'split'; releaseAmount: Rupees; refundAmount: Rupees; reason: string; adminUserId: Id; at: IsoTs };
  substituteVendorId?: Id;           // -> Vendor
}
```

#### Gift (shagun)
```ts
interface Gift extends Stamped {
  id: Id; weddingId: Id; householdId?: Id; giverName: string;
  kind: 'cash' | 'item'; amount?: Rupees; itemDescription?: string;
  eventId?: Id; receivedOn: IsoDate; thankYouSent: boolean; thankYouSentAt?: IsoTs;
  hostVisibleOnly: true;             // private to hosts
}
```

### 2.9 Other operational entities

```ts
interface Message extends Stamped { id: Id; weddingId: Id; vendorId: Id; senderUserId?: Id; fromVendor: boolean; text: string; sentAt: IsoTs }   // vendor chat (US-4.9)
interface Issue extends Stamped { id: Id; weddingId: Id; eventId?: Id; category: BudgetCategory; severity: 'low' | 'medium' | 'high'; ownerUserId?: Id; status: 'open' | 'resolved'; description: string; resolvedAt?: IsoTs }   // day-of (US-8.4)
interface VendorCheckIn { id: Id; bookingId: Id; eventId: Id; arrivalSlot: IsoTs; arrivedAt?: IsoTs; status: 'pending' | 'arrived' | 'late' | 'no_show'; lat?: number; lng?: number }
interface Scenario extends Stamped { id: Id; weddingId: Id; name: string; overrides: Json; resultTotalAmount: Rupees; perGuestAmount: Rupees; verdict: Verdict }   // US-2.8
interface MoodBoardItem { id: Id; weddingId: Id; eventId?: Id; imageUrl: string; styleTag: string; createdAt: IsoTs }
interface CustomItem extends Stamped { id: Id; weddingId: Id; eventId?: Id; category: BudgetCategory; name: string; amount: Rupees; isEstimate: boolean; ownerUserId?: Id; dueDate?: IsoDate; vendorName?: string; vendorContact?: string; notes?: string }   // US-3.10
interface Deliverable extends Stamped { id: Id; bookingId: Id; label: string; promisedDate: IsoDate; status: 'pending' | 'delivered'; deliveredAt?: IsoTs }   // US-8.9
interface AssumptionOverride { weddingId: Id; key: string; value: number; updatedAt: IsoTs }   // forecast panel persisted
```
Gift, CheckIn, Activity, Message and Vote are the only append-only tables apart from audit rows.

## 3. Reference data (read-only seed, `createdAt` only)

```ts
interface AllocationPrior {          // src/data/allocation-priors.json; each tier sums to 10000 bp
  tier: BudgetTier; category: BudgetCategory; weightBp: Bp; floorBp: Bp; whyKey: string;
}
interface MuhuratDate {
  date: IsoDate; community?: Community | 'all'; auspicious: boolean;
  demand: 'peak' | 'normal' | 'offpeak'; priceEffectBp: number;   // +2000..+2500 for peak
  note?: string;                     // e.g. Kharmas, Chaturmas pause; "confirm with pandit"
}
interface Destination {
  id: Id; name: string; state: string; seasonMonths: number[];
  perGuestCostAmount: Rupees; travelHoursFrom: Record<string, number>;   // city -> hours
  accommodationNote: string; tierPrior: BudgetTier;    // typically 'destination'
  imageKey: string; isMock: true;
}
interface PriceIndexEntry {
  id: Id; category: BudgetCategory; subcategory?: string; city: string;
  season: 'peak' | 'normal' | 'offpeak'; unit: PriceUnit;
  medianAmount: Rupees; p25Amount: Rupees; p75Amount: Rupees; sampleSize: number;
  asOf: IsoDate; isMock: true;       // feeds fair-price badge, quote X-ray, counter-offers
}
interface CityMultiplier { city: string; cityMultPermille: Permille; tierGroup: 'metro' | 'tier2'; }
interface SeasonMultiplier { season: 'peak' | 'normal' | 'offpeak'; venueDecorMultPermille: Permille }   // 1200..1250 / 850..900
interface FunctionTemplate {         // per community (US-1.5)
  id: Id; community: Community; name: string;
  events: { type: EventType; defaultName: string; sortOrder: number; defaultGuestShareBp: Bp; mealsPerGuest: number; vendorChecklist: VendorCategory[]; ritualSteps: RitualStep[] }[];
}
interface ChecklistTemplate {        // reverse-scheduled tasks (US-7.2)
  id: Id; community?: Community;
  items: { key: string; title: string; category?: BudgetCategory; eventType?: EventType; leadTimeDaysMin: number; leadTimeDaysMax: number; dependsOnKeys: string[]; highRisk: boolean }[];
}
interface InviteTemplateDef { key: InviteTemplate; name: string; supportedLanguages: string[]; previewImage: string }
interface MilestoneTemplate { kind: 'advance' | 'mid' | 'final'; shareBp: Bp; dueOffsetDays: number; anchor: 'booking' | 'event' }
interface FraudSignalDef { key: FraudSignal; label: string }
interface AppConfig { commissionBp: 700; gstRateBp: 1800; defaultApprovalThreshold: Rupees; bufferBp: 500; simulatedDelayMsMin: 300; simulatedDelayMsMax: 1200 }
```
Reference data is bundled as static JSON (`allocation-priors.json`, `muhurat.json`, `destinations.json`, `price-index.json`, `templates.json`) and is **not** persisted to localStorage; it is imported at build time so priors can be tuned without clearing user state.

## 4. Enum list

```ts
type UserRole      = 'owner' | 'co_owner' | 'contributor' | 'viewer' | 'planner' | 'vendor' | 'admin';   // platform persona; guest has no account
type MemberRole    = 'owner' | 'co_owner' | 'contributor' | 'viewer' | 'planner';
type Side          = 'bride' | 'groom' | 'common';
type Language      = 'en' | 'hinglish';
type PlanningMode  = 'couple' | 'parents' | 'both' | 'planner';
type BudgetTier    = 'budget' | 'mid' | 'premium' | 'destination';
type DateMode      = 'exact' | 'range' | 'suggest';
type DateFlexibility = 'fixed' | 'plus_minus_week' | 'any_in_month';
type VenueType     = 'hotel' | 'banquet' | 'marriage_garden' | 'farmhouse' | 'resort_palace' | 'community_hall';
type Community     = 'hindu_punjabi' | 'hindu_marwari' | 'hindu_up_bihar' | 'sikh' | 'muslim' | 'gujarati' | 'bengali' | 'tamil' | 'telugu' | 'kannada' | 'malayali' | 'jain' | 'christian' | 'interfaith';
type FoodRule      = 'veg_only' | 'jain' | 'no_onion_garlic' | 'non_veg' | 'alcohol';
type EventType     = 'roka' | 'sagai' | 'mehendi' | 'haldi' | 'sangeet' | 'cocktail' | 'baraat' | 'pheras' | 'nikah' | 'anand_karaj' | 'church_ceremony' | 'vidaai' | 'reception' | 'pagphere' | 'brunch' | 'custom';
type BudgetCategory = 'venue' | 'catering' | 'decor' | 'photo_video' | 'attire' | 'makeup_mehendi' | 'music_entertainment' | 'guest_hospitality' | 'invites_gifts' | 'rituals' | 'contingency' | 'custom';
type VendorGroup   = 'venue_stay' | 'food' | 'decor_production' | 'rituals' | 'couple' | 'entertainment' | 'media' | 'guests' | 'admin_finance' | 'post_wedding' | 'misc';
type VendorCategory = string;        // slug from the category table in the brief (hotel, banquet, caterer, decorator, photographer, dj, pandit, ...); validated against `vendor-categories.json`
type PriceUnit     = 'per_plate' | 'per_day' | 'per_function' | 'per_room_night' | 'per_hour' | 'per_km' | 'per_piece' | 'flat';
type GstMode       = 'included' | 'excluded';
type VerifiedBadge = 'kyc' | 'gst' | 'fssai' | 'licence' | 'fire_noc' | 'calendar_fresh' | 'fast_responder' | 'zero_cancellation' | 'site_visit';
type VendorOnboardingStatus = 'submitted' | 'under_review' | 'verified' | 'live' | 'rejected';
type AvailabilityStatus = 'free' | 'held' | 'booked' | 'blocked';
type CategoryStatus = 'not_started' | 'shortlisting' | 'quote_requested' | 'booked';
type QuoteStatus   = 'requested' | 'received' | 'negotiating' | 'accepted' | 'declined' | 'expired';
type BookingStatus = 'pending_signature' | 'confirmed' | 'in_delivery' | 'completed' | 'cancelled';
type MilestoneStatus = 'upcoming' | 'due' | 'paid' | 'overdue' | 'refunded' | 'cancelled';
type EscrowState   = 'none' | 'held' | 'released' | 'refunded';
type PaymentMode   = 'upi' | 'card' | 'netbanking' | 'emi' | 'cash' | 'bank_transfer' | 'cheque';
type PaymentStatus = 'initiated' | 'succeeded' | 'failed' | 'refunded';
type VerificationLevel = 'paid_on_platform' | 'offline_invoice' | 'guest_attended';
type ModerationStatus = 'published' | 'held' | 'removed' | 'evidence_requested';
type FraudSignal   = 'shared_device' | 'family_ring' | 'velocity_spike' | 'near_duplicate_text' | 'llm_style_text' | 'photo_metadata_mismatch' | 'price_outlier';
type Relationship  = 'family' | 'close_friend' | 'colleague' | 'neighbour' | 'other';
type DietaryNeed   = 'veg' | 'jain' | 'non_veg' | 'vegan' | 'egg';
type RsvpStatus    = 'pending' | 'yes' | 'no' | 'maybe';
type InviteTemplate = 'traditional' | 'royal' | 'floral' | 'minimal' | 'south_indian' | 'sikh_anand_karaj';
type TaskStatus    = 'todo' | 'in_progress' | 'done';
type RunSheetStatus = 'pending' | 'in_progress' | 'done' | 'delayed';
type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'withdrawn';
type DisputeCategory = 'no_show' | 'quality' | 'overcharge' | 'cancellation' | 'delivery' | 'other';
type DisputeStatus = 'open' | 'evidence_requested' | 'under_review' | 'resolved' | 'rejected';
type NotificationType = 'payment_due' | 'quote_received' | 'quote_expiring' | 'approval_requested' | 'rsvp_milestone' | 'task_due' | 'overspend_alert' | 'vendor_message' | 'review_prompt';
type ActivityType  = 'budget_changed' | 'quote_accepted' | 'booking_confirmed' | 'payment_made' | 'approval_decided' | 'rsvp_received' | 'invite_sent' | 'task_updated' | 'comment_added' | 'forecast_applied' | 'member_joined';
type AlertLevel    = 'ok' | 'soft_90' | 'hard_100' | 'critical';   // derived, not stored
type Verdict       = 'comfortable' | 'tight' | 'not_feasible';       // feasibility (US-1.8)
```

## 5. Relationship summary (ER style)

```
User 1--* Member *--1 Wedding
User 0..1--1 Vendor                          (vendor persona)

Wedding 1--* Event
Wedding 1--* BudgetLine *--0..1 Event
Wedding 1--* Task *--0..1 Event
Wedding 1--* Household 1--* Guest
Household 1--1 Invitation  *--* Event        (Invitation.eventIds)
Household *--* Event via RSVP                (unique householdId+eventId)
Event 1--* Forecast                          (history of computations)
Event 1--* Table, CheckIn, Pickup
Wedding 1--* RoomBlock *--1 Vendor (hotel)
Wedding 1--* Gift, Comment, Activity, Notification, Approval, Poll, Scenario, Issue

Vendor 1--* Package
Vendor 1--* Availability                     (PK vendorId+date)
Vendor 1--* Review, Quote, Booking
Wedding *--* Vendor via Shortlist (+ Vote via Poll)
Wedding 1--* Quote *--1 Vendor/Package
Quote 1--0..1 Booking                        (accepted version; Quote.previousQuoteId chain)
Booking 1--* Milestone 1--* Payment
Booking 1--* Payment                         (offline payments have no milestone)
Booking 1--* Review *--1 Vendor              (gate: Booking.status = completed)
Booking 1--* Dispute, ChangeRequest, Deliverable, VendorCheckIn
Approval *--1 Quote|Booking                  (polymorphic entityType+entityId)
Review 1--* ModerationAction

BudgetLine aggregates Booking by (weddingId, category, eventId?)
  allocated = BudgetLine.allocatedAmount
  committed = sum Booking.totalAmount (status != cancelled) + CustomItem.amount
  paid      = sum Payment.amount (succeeded, incl. offline) - refunds
  remaining = allocated - committed

Reference (no FK from user rows except by key): AllocationPrior, MuhuratDate, Destination,
PriceIndexEntry, CityMultiplier, SeasonMultiplier, FunctionTemplate, ChecklistTemplate,
InviteTemplateDef, CancellationPolicy
Wedding.destinationId -> Destination; Wedding.templateId -> FunctionTemplate
```

Cascade rules (Postgres): Wedding delete cascades to everything it owns; Vendor delete is restricted while Bookings exist; Household delete cascades Guest, Invitation, RSVP, CheckIn, Pickup, and is a soft delete by default (DPDP deletion, US-6.14).

## 6. localStorage persistence notes

**Key:** one versioned blob, `wp.state.v1` (JSON), written via Zustand `persist` with `partialize`, plus `wp.ui.v1` for per-viewer UI prefs (language, simple mode, active persona, last tab). Wrap all reads and writes in try/catch; if parsing fails or the schema version differs, fall back to seeds.

**State shape (normalised, id-keyed maps, no nested duplication):**
```ts
interface PersistedState {
  schemaVersion: number;             // bump on breaking change; migrate or reset
  seedVersion: string;               // detects changed seeds; 'Reset demo data' reloads seeds
  appClock: { baseRealTs: IsoTs; offsetMs: number; frozenAt?: IsoTs };   // see below
  session: { activeUserId: Id; activeWeddingId: Id; personaRole: UserRole };
  entities: {
    users: Record<Id, User>;
    weddings: Record<Id, Wedding>;
    members: Record<string, Member>;           // key `${weddingId}:${userId}`
    events: Record<Id, Event>;
    budgetLines: Record<Id, BudgetLine>;
    vendors: Record<Id, Vendor>;               // seeded; user can only change via vendor persona
    packages: Record<Id, Package>;
    availability: Record<string, Availability>;// key `${vendorId}:${date}`
    shortlists: Record<Id, Shortlist>; polls: Record<Id, Poll>; votes: Record<Id, Vote>;
    quotes: Record<Id, Quote>;
    bookings: Record<Id, Booking>;
    milestones: Record<Id, Milestone>;
    payments: Record<Id, Payment>;
    reviews: Record<Id, Review>; moderationActions: Record<Id, ModerationAction>;
    households: Record<Id, Household>; guests: Record<Id, Guest>;
    invitations: Record<Id, Invitation>; rsvps: Record<string, RSVP>;   // key `${householdId}:${eventId}`
    forecasts: Record<Id, Forecast>;
    tasks: Record<Id, Task>; approvals: Record<Id, Approval>; comments: Record<Id, Comment>;
    activity: Id[] & Record<Id, Activity>;     // stored as map + ordered id list
    notifications: Record<Id, Notification>;
    disputes: Record<Id, Dispute>; gifts: Record<Id, Gift>;
    roomBlocks: Record<Id, RoomBlock>; pickups: Record<Id, Pickup>; tables: Record<Id, Table>; checkIns: Record<Id, CheckIn>;
    messages: Record<Id, Message>; issues: Record<Id, Issue>; vendorCheckIns: Record<Id, VendorCheckIn>;
    scenarios: Record<Id, Scenario>; customItems: Record<Id, CustomItem>; deliverables: Record<Id, Deliverable>;
  };
  assumptions: Record<Id /*weddingId*/, ForecastAssumptions>;
}
```
Not persisted: reference data (bundled), derived values (ledger, alerts, forecasts' live numbers, Bayesian scores), transient UI (loading flags, simulated-network state). Vendors are persisted only so vendor-persona edits (calendar, rate card, review replies) survive reload; seed re-merge on `seedVersion` change preserves user-created rows.

**Quota:** about 5 MB limit. Seeds (about 120 vendors, 3 weddings, 80 to 350 households each) are bundled static JSON and loaded into the store on first run; only a diff against seeds need be persisted if size becomes an issue (record in decisions.md if adopted). Large media are keys to bundled assets, never data URIs.

**Persistence policy:** debounce writes (about 300 ms), write on `visibilitychange`; migration function per `schemaVersion`; 'Reset demo data' removes both keys and reseeds.

**App clock (fast-forward):** domain code never reads `Date.now()`. `now() = baseRealTs + (realElapsed) + offsetMs`, or `frozenAt` when frozen. Dev control sets presets: T-7 days, wedding day, T+3 days, T+45 days (`offsetMs` recomputed from `Wedding.date` of the active wedding). All due dates, reminders (T-30/14/7), review prompts, quote expiry, milestone `due`/`overdue` status, escrow auto-release and RSVP cut-off are evaluated against `now()` at read time or by a pure `advanceClock()` reducer that materialises Notifications. Status fields such as `Milestone.status = 'overdue'` are derived on read from `dueDate` and the clock, not trusted from storage.

**Derived vs stored:** Ledger numbers, alert level, tier, feasibility verdict, forecast ranges, vendor `ratingAvgTenths` and Review `weight` are recomputed by pure functions in `src/lib/`; the stored copies are caches and may be rebuilt at any time.

## 7. Mock data authoring rules (seed validity)

- Every FK in seeds must resolve; a Vitest test `validateSeeds()` checks FKs, enum membership, integer money, allocation sums (each prior tier = 10000 bp), and per-wedding invariants (sum of wedding-level BudgetLine = totalBudget, sum of Milestone = Booking.totalAmount, one Review per booking+author+prompt).
- Seeds: 3 weddings (`wed_aarav_meera`, `wed_rohan_simran`, `wed_karan_anjali`), about 120 vendors, reviews 3 to 25 per vendor, Karan and Anjali has no bookings or guests (onboarding demo).
- Files: `src/data/vendors.json`, `packages.json`, `availability.json`, `reviews.json`, `templates.json`, `price-index.json`, `allocation-priors.json`, `muhurat.json`, `destinations.json`, `weddings/<slug>.json`.

## 8. PostgreSQL readiness

**Table mapping.** One table per entity above, snake_case, plural (`weddings`, `events`, `budget_lines`, ...). Every table: `id uuid primary key default gen_random_uuid()` (or UUIDv7), `created_at timestamptz not null default now()`, `updated_at timestamptz not null` maintained by trigger. Composite PKs: `members(wedding_id, user_id)`, `availability(vendor_id, date)`, `rsvps` unique `(household_id, event_id)`.

**Types.** Money columns are `bigint` (integer rupees; `check (amount >= 0)` except signed refund/delta fields). Basis points and permille are `integer`. Dates `date`, times `time`, timestamps `timestamptz` (UTC; render in `Asia/Kolkata`). Enums as native `create type ... as enum` or `text` with `check` constraints (prefer text+check for easier iteration). Booleans not null with defaults.

**Normalising Json fields.** Prototype Json arrays become child tables: `member_event_scopes`, `task_dependencies(task_id, depends_on_id)`, `household_events(household_id, event_id)` (invited matrix), `invitation_events`, `quote_line_items`, `package_inclusions`, `poll_options`, `votes`, `approval_approvers`, `approval_decisions`, `table_seats`, `room_assignments`, `review_ratings` (or five int columns), `review_media`, `change_requests`, `cancellation_tiers`, `milestone_templates`, `vendor_areas`, `vendor_badges(vendor_id, badge, checked_on)`. Truly free-form blobs (`ritual_steps`, `run_of_show`, `forecast assumptions`, `before/after` in activity) stay `jsonb`.

**Integrity and constraints.**
- FKs for every `...Id` with explicit `on delete` (cascade from wedding; restrict from vendor with bookings; set null for optional links).
- `budget_lines`: partial unique index `(wedding_id, category) where event_id is null`; trigger or deferred constraint that wedding-level amounts sum to `weddings.total_budget`.
- `bookings`: unique `(quote_id)`; check status transitions in application service.
- `reviews`: unique `(booking_id, author_user_id, prompt)`; insert allowed only if booking status is `completed` (enforced by trigger or service); no UPDATE on rating columns (revoke or trigger), appends go to `review_updates`.
- `payments`/`milestones`: sum of milestones per booking equals `bookings.total_amount` (deferred constraint); payments and escrow events are insert-only. Real build: a **double-entry ledger** (`ledger_accounts`, `ledger_entries`) with idempotency keys for webhooks; escrow only through a licensed payment aggregator (research 6.3).
- `households`: unique `(wedding_id, phone) where phone is not null and deleted_at is null` for duplicate detection.
- Polymorphic `approvals(entity_type, entity_id)` and `comments`: keep as polymorphic with check on entity_type, or split into typed link tables if referential integrity is needed.

**Indexes.** `events(wedding_id, date)`, `tasks(wedding_id, due_date, status)`, `vendors(category, city)` plus GIN on `tags`, `rsvps(event_id, status)`, `invitations(token)` unique, `availability(vendor_id, date)`, `quotes(wedding_id, status)`, `payments(booking_id)`, `notifications(user_id, read_at)`, `activity(wedding_id, created_at desc)`, `price_index(category, city, season)`.

**Search and geo (per research 6.3).** PostGIS `geography(Point)` for vendor-verified coordinates (never cached map-provider lat/lng beyond terms); OpenSearch for facets later; `pgvector` for semantic search on vendor and review embeddings (not modelled now).

**Security and privacy.** Row-level security by `wedding_id` through `members`; contributors limited by `member_event_scopes` and `can_see_full_budget`; vendors see only their own bookings and masked guest contact. Guest PII (`guests`, `households.phone`, `gifts`) encrypted at rest, minimum fields, deletion via soft-delete then purge job (DPDP). Audit via insert-only `activity`.

**Derived data.** Ledger numbers are SQL views (`v_budget_ledger`); materialise only if slow. Forecasts stay stored for history and accuracy reporting; rating aggregates in a materialised view refreshed on review change.

**Seed to prod.** Prototype ids are readable slugs; the migration script maps each slug to a generated uuid and keeps `legacy_id text` for traceability. `isMock` becomes a `is_demo boolean` and demo rows are excluded from production aggregates (price index, reviews).

**Out of scope here** (prototype rule: no migrations, no backend code): DDL, migration files, ORM models.

## Changelog

- v2 (2026-10-28): Full rewrite. Added all core and reference entities. **Breaking vs v1:** `Wedding.total_budget`/`city`/`guest_estimate` replaced by richer Wedding fields (`totalBudget`, `weddingCity`, per-event guest counts); `BudgetLine.allocated_pct`/`spent_amount` replaced by `weightBp`/`allocatedAmount` with committed/paid derived; `Vendor.rating`/`contact` replaced by `ratingAvgTenths` and masked contact; `Package.per_head` replaced by `unit: PriceUnit`; `Quote.status` gained `negotiating`, `declined`, `expired` and lost `rejected`; `Booking.status` and advance moved to Milestone/Payment; `Household.side` gained `common`; `RSVP` re-keyed from guest to household per event with headcounts; `Review` now requires `bookingId`. Naming moved from snake_case to camelCase in TS/JSON (snake_case remains for Postgres).
