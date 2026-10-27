# Wedding Planner India — Prototype

## Goal
A PROTOTYPE of an AI wedding planning and booking app for India. Read these first, in order:
1. `docs/user-stories.md` — build brief, epics, acceptance criteria, build order (source of truth for WHAT to build)
2. `docs/research-report.md` — market research, budget allocation tables, feature specs (source of truth for WHY and the numbers)
3. `docs/data-model.md` — entities and conventions (read before changing any data structure)
4. `docs/decisions.md` — decision log

## Prototype scope
- Frontend only. Typed mock data (JSON/TS) and browser localStorage for persistence.
- NO backend, NO real payments, NO real AI/LLM calls, NO scraped data, NO API keys.
- AI, payment, WhatsApp, maps, notifications are simulated in `src/services/mock/` behind interfaces in `src/services/interfaces.ts`.
- Out-of-scope ideas: log as "deferred" in `docs/decisions.md`.

## Stack
- React 19 + TypeScript (strict) + Vite, Tailwind v4, React Router, Zustand (persisted), React Hook Form + Zod, Recharts, lucide-react, date-fns.
- Tests: Vitest for `src/**/*.test.ts`; Playwright smoke tests in `e2e/` if time allows. Lint: oxlint. Format: Prettier.
- Mobile-first (360px), parent-friendly (16px+ text, 44px tap targets). English + switchable Hinglish; all strings in `src/i18n/`, never hard-coded.

## Rules
- Money is integer INR rupees, never floats. Format with `src/lib/money.ts` (Indian grouping, lakh/crore shorthand).
- Budget logic lives in `src/lib/budget/` and RSVP logic in `src/lib/rsvp/` as pure, unit-tested functions. UI never computes budget numbers.
- Use `now()` from `src/store` instead of `Date.now()` so the demo clock can fast-forward.
- Every mocked number/feature carries a `DemoBadge`.
- Allocation priors and attendance parameters are ASSUMPTIONS from the research report; keep them in JSON data files and label them as such.
- Any data-structure change updates `docs/data-model.md` in the same change.
- Append significant decisions to `docs/decisions.md` (`YYYY-MM-DD | agent | decision | why`).
- Prefer the internal design system and shared libraries over new dependencies. Never commit secrets.
- Before proposing a commit run: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
- One commit per completed epic (conventional commits). Do not push unless asked.

## Director workflow
The main session acts as DIRECTOR:
1. Break each epic down; follow the build order in `docs/user-stories.md`.
2. Delegate to subagents in `.claude/agents/`: ui-ux-lead, wedding-planner, budget-auditor, data-architect, qa-tester, rsvp-guest-specialist. (If they are not loaded, restart Claude Code.)
3. budget-auditor reviews anything touching money/forecasts; qa-tester walks each epic's acceptance criteria before it is marked done.
4. Keep scope to the prototype; reject gold-plating.
5. Route any data-structure change through data-architect.
6. After each epic report: what was built, agents used, what is mocked, tests run, open questions.
