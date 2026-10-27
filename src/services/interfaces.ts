// Service contracts. Mock implementations live in ./mock; a real backend can replace them later.
export interface AssistantReply {
  text: string
  citations?: string[]
}
export interface AssistantService {
  ask(message: string, weddingId: string): Promise<AssistantReply>
}
export interface PaymentResult {
  ok: boolean
  receiptId: string
}
export interface PaymentService {
  pay(bookingId: string, milestoneId: string, amountRupees: number): Promise<PaymentResult>
}
export interface MessagingService {
  sendInvite(householdId: string): Promise<{ sentAt: string }>
}
export interface ReviewService {
  canReview(userId: string, vendorId: string): Promise<boolean>
}
export interface VendorRepository {
  list(category?: string): Promise<unknown[]>
}
