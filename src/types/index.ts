// Domain types. Mirrors docs/data-model.md (subset used so far; extend alongside the doc).
export type Id = string
export type Rupees = number // integer INR
export type Bp = number // integer basis points (10000 = 100%)

export type BudgetTier = 'budget' | 'mid' | 'premium' | 'destination'
export type BudgetCategory =
  | 'venue'
  | 'catering'
  | 'decor'
  | 'photo_video'
  | 'attire'
  | 'makeup_mehendi'
  | 'music_entertainment'
  | 'guest_hospitality'
  | 'invites_gifts'
  | 'rituals'
  | 'contingency'

export interface AllocationPriors {
  note: string
  tiers: Record<BudgetTier, Record<BudgetCategory, Bp>>
}

export interface Wedding {
  id: Id
  brideName: string
  groomName: string
  weddingCity: string
  isDestination: boolean
  community: string
  totalBudget: Rupees
  tier: BudgetTier
  guestEstimate: number
  priorities: BudgetCategory[]
  status: 'draft' | 'planning' | 'live' | 'completed'
  isMock: boolean
}

export interface WeddingEvent {
  id: Id
  weddingId: Id
  type: string
  name: string
  sortOrder: number
  guestCountPlanned: number
  isMock: boolean
}
