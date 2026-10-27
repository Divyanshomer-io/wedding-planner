import type {
  AssistantService,
  MessagingService,
  PaymentService,
  ReviewService,
  VendorRepository,
} from '../interfaces'
import { analytics } from '../../lib/analytics'
import { mockDelay } from './delay'
import { now } from '../../store'

// All mock services: clearly demo-only, no network, no real money or messages.
export const mockAssistant: AssistantService = {
  async ask() {
    await mockDelay()
    return { text: 'Demo assistant: full answers arrive in Epic 3.', citations: [] }
  },
}

export const mockPayments: PaymentService = {
  async pay(bookingId, milestoneId, amountRupees) {
    await mockDelay()
    analytics.track('payment_simulated', { bookingId, milestoneId, amountRupees })
    return { ok: true, receiptId: `rcpt_${milestoneId}` }
  },
}

export const mockMessaging: MessagingService = {
  async sendInvite(householdId) {
    await mockDelay()
    analytics.track('invite_simulated', { householdId })
    return { sentAt: now().toISOString() }
  },
}

export const mockReviews: ReviewService = {
  async canReview() {
    await mockDelay()
    return false
  },
}

export const mockVendors: VendorRepository = {
  async list() {
    await mockDelay()
    return []
  },
}
