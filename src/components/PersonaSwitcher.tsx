import { useT } from '../i18n'
import { useAppStore, type Persona } from '../store'

const personas: Persona[] = ['couple', 'parent', 'helper', 'nri', 'planner', 'vendor', 'admin', 'guest']

export default function PersonaSwitcher() {
  const t = useT()
  const persona = useAppStore((s) => s.persona)
  const setPersona = useAppStore((s) => s.setPersona)
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="sr-only">{t.common.persona}</span>
      <select
        value={persona}
        onChange={(e) => setPersona(e.target.value as Persona)}
        className="min-h-11 rounded bg-white/10 px-2 text-white"
      >
        {personas.map((p) => (
          <option key={p} value={p} className="text-stone-900">
            {t.personas[p]}
          </option>
        ))}
      </select>
    </label>
  )
}
