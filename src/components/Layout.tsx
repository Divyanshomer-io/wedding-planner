import { NavLink, Outlet } from 'react-router-dom'
import { useT } from '../i18n'
import { now, useAppStore } from '../store'
import DemoBadge from './DemoBadge'
import PersonaSwitcher from './PersonaSwitcher'

const tabs = [
  { to: '/', key: 'home' },
  { to: '/budget', key: 'budget' },
  { to: '/book', key: 'book' },
  { to: '/guests', key: 'guests' },
  { to: '/more', key: 'more' },
] as const

export default function Layout() {
  const t = useT()
  const language = useAppStore((s) => s.language)
  const setLanguage = useAppStore((s) => s.setLanguage)
  const resetDemo = useAppStore((s) => s.resetDemo)
  const appClock = useAppStore((s) => s.appClock)
  const setAppClock = useAppStore((s) => s.setAppClock)
  const fastForward = () => setAppClock(new Date(now().getTime() + 7 * 86_400_000).toISOString())
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col">
      <header className="flex flex-wrap items-center justify-between gap-2 bg-rose-900 px-4 py-3 text-white">
        <h1 className="text-xl font-bold">{t.appName}</h1>
        <div className="flex items-center gap-2">
          <PersonaSwitcher />
          <button
            className="min-h-11 rounded bg-white/10 px-3 text-sm"
            onClick={() => setLanguage(language === 'en' ? 'hinglish' : 'en')}
          >
            {language === 'en' ? 'हिंग्लिश' : 'English'}
          </button>
        </div>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="flex items-center justify-between px-4 pb-2 text-xs text-stone-600">
        <DemoBadge />
        {appClock && <span>{new Date(appClock).toDateString()}</span>}
        <button className="min-h-11 underline" onClick={fastForward}>
          {t.common.fastForward}
        </button>
        <button className="min-h-11 underline" onClick={resetDemo}>
          {t.common.resetDemo}
        </button>
      </footer>
      <nav className="sticky bottom-0 grid grid-cols-5 border-t border-stone-300 bg-white">
        {tabs.map(({ to, key }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex min-h-14 items-center justify-center px-1 text-sm font-medium ${
                isActive ? 'text-rose-900' : 'text-stone-600'
              }`
            }
          >
            {t.nav[key]}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
