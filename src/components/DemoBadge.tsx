import { useT } from '../i18n'

export default function DemoBadge() {
  const t = useT()
  return (
    <span className="rounded-full bg-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-900">
      {t.common.demo}
    </span>
  )
}
