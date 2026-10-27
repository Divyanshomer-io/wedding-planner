import { useT } from '../i18n'

export default function Placeholder({ title }: { title: string }) {
  const t = useT()
  return (
    <section>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-stone-600">{t.common.comingSoon}</p>
    </section>
  )
}
