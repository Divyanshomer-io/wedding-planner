import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedEvents, seedWeddings } from '../data/seed'
import type { Wedding, WeddingEvent } from '../types'

export type Language = 'en' | 'hinglish'
export type Persona =
  | 'couple'
  | 'parent'
  | 'helper'
  | 'nri'
  | 'planner'
  | 'vendor'
  | 'admin'
  | 'guest'

interface AppState {
  language: Language
  persona: Persona
  simpleMode: boolean
  // Demo "app clock" (ISO timestamp). null = real time. Used for fast-forward demos.
  appClock: string | null
  weddings: Wedding[]
  events: WeddingEvent[]
  setLanguage: (l: Language) => void
  setPersona: (p: Persona) => void
  setSimpleMode: (v: boolean) => void
  setAppClock: (iso: string | null) => void
  resetDemo: () => void
}

const initial = {
  language: 'en' as Language,
  persona: 'couple' as Persona,
  simpleMode: false,
  appClock: null as string | null,
  weddings: seedWeddings,
  events: seedEvents,
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initial,
      setLanguage: (language) => set({ language }),
      setPersona: (persona) => set({ persona }),
      setSimpleMode: (simpleMode) => set({ simpleMode }),
      setAppClock: (appClock) => set({ appClock }),
      resetDemo: () => set({ ...initial }),
    }),
    { name: 'shaadi-planner-v1' },
  ),
)

// Domain logic must use this instead of Date.now() so time can be fast-forwarded.
export const now = (): Date => {
  const c = useAppStore.getState().appClock
  return c ? new Date(c) : new Date()
}
