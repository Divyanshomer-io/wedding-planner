import type { WeddingEvent, Wedding } from '../types'

// Seed skeletons for the three demo weddings (all mock). Fuller data arrives with later epics.
export const seedWeddings: Wedding[] = [
  {
    id: 'wed_aarav_meera',
    brideName: 'Meera',
    groomName: 'Aarav',
    weddingCity: 'Delhi NCR',
    isDestination: false,
    community: 'hindu_punjabi',
    totalBudget: 3_500_000,
    tier: 'mid',
    guestEstimate: 350,
    priorities: ['catering', 'venue', 'photo_video'],
    status: 'planning',
    isMock: true,
  },
  {
    id: 'wed_rohan_simran',
    brideName: 'Simran',
    groomName: 'Rohan',
    weddingCity: 'Udaipur',
    isDestination: true,
    community: 'sikh',
    totalBudget: 8_000_000,
    tier: 'destination',
    guestEstimate: 220,
    priorities: ['venue', 'guest_hospitality', 'decor'],
    status: 'planning',
    isMock: true,
  },
  {
    id: 'wed_karan_anjali',
    brideName: 'Anjali',
    groomName: 'Karan',
    weddingCity: 'Gurugram',
    isDestination: false,
    community: 'hindu_north',
    totalBudget: 1_200_000,
    tier: 'budget',
    guestEstimate: 180,
    priorities: ['catering', 'venue', 'decor'],
    status: 'draft',
    isMock: true,
  },
]

export const seedEvents: WeddingEvent[] = [
  { id: 'evt_am_haldi', weddingId: 'wed_aarav_meera', type: 'haldi', name: 'Haldi', sortOrder: 1, guestCountPlanned: 120, isMock: true },
  { id: 'evt_am_sangeet', weddingId: 'wed_aarav_meera', type: 'sangeet', name: 'Sangeet', sortOrder: 2, guestCountPlanned: 300, isMock: true },
  { id: 'evt_am_pheras', weddingId: 'wed_aarav_meera', type: 'pheras', name: 'Pheras', sortOrder: 3, guestCountPlanned: 350, isMock: true },
  { id: 'evt_am_reception', weddingId: 'wed_aarav_meera', type: 'reception', name: 'Reception', sortOrder: 4, guestCountPlanned: 350, isMock: true },
  { id: 'evt_rs_mehendi', weddingId: 'wed_rohan_simran', type: 'mehendi', name: 'Mehendi', sortOrder: 1, guestCountPlanned: 120, isMock: true },
  { id: 'evt_rs_sangeet', weddingId: 'wed_rohan_simran', type: 'sangeet', name: 'Sangeet', sortOrder: 2, guestCountPlanned: 220, isMock: true },
  { id: 'evt_rs_cocktail', weddingId: 'wed_rohan_simran', type: 'cocktail', name: 'Cocktail', sortOrder: 3, guestCountPlanned: 200, isMock: true },
  { id: 'evt_rs_anand', weddingId: 'wed_rohan_simran', type: 'anand_karaj', name: 'Anand Karaj', sortOrder: 4, guestCountPlanned: 220, isMock: true },
  { id: 'evt_rs_reception', weddingId: 'wed_rohan_simran', type: 'reception', name: 'Reception', sortOrder: 5, guestCountPlanned: 220, isMock: true },
]
