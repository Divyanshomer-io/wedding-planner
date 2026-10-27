// Mock analytics: logs to console and keeps a small in-memory buffer for a debug panel.
export interface AnalyticsEvent {
  event: string
  props?: Record<string, unknown>
  at: string
}

const buffer: AnalyticsEvent[] = []

export const analytics = {
  track(event: string, props?: Record<string, unknown>) {
    const e = { event, props, at: new Date().toISOString() }
    buffer.push(e)
    if (import.meta.env.DEV) console.debug('[analytics]', e)
  },
  events: () => [...buffer],
}
