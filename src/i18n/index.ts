import { useAppStore } from '../store'
import { en, type Dictionary } from './en'
import { hinglish } from './hinglish'

const dictionaries: Record<'en' | 'hinglish', Dictionary> = { en, hinglish }

export const useT = (): Dictionary => dictionaries[useAppStore((s) => s.language)]
