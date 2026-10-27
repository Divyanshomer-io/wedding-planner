# Decisions Log

Every agent appends here when making a significant decision. Newest at the bottom.

Format: `YYYY-MM-DD | agent | decision | why`

2026-10-28 | director | Prototype is frontend only with JSON mock data; no backend, payments or AI calls | Per project brief
2026-10-28 | director | Task 1 scaffold: Vite+React 19+Tailwind v4 (@tailwindcss/vite), Vitest for tests, oxlint; labels in src/lib/labels.js | Minimal toolchain per brief; report file currently contains only the summary (no budget tables/feature specs)
2026-10-28 | director | docs/research-report.md replaced with full report from Downloads/planner.md (includes budget tables s4, feature specs s5); brief in docs/user-stories.md is the build source of truth | Closes the earlier gap of summary-only report
2026-10-28 | data-architect | docs/data-model.md v2: money = integer rupees; percentages as integer basis points, multipliers as permille, ratings as integer tenths; ledger committed/paid/remaining derived not stored; localStorage blob wp.state.v1 with app clock; reference data bundled not persisted | Avoids floats and drift, keeps schema Postgres-ready
2026-10-28 | director | Converted scaffold to TypeScript (React 19 kept); added router, zustand, RHF+zod, recharts, lucide, date-fns, prettier, playwright; i18n dictionary replaces labels.ts; store has language/persona/simpleMode/appClock | Brief specifies TS and these deps; React 19 chosen over 18 (drop-in)
2026-10-28 | director | Epic 0 finished: seeds (3 weddings, 9 events, allocation priors in bp), typed domain subset, mock services, app-clock fast-forward, vitest priors tests, Playwright config + smoke spec (browsers not installed yet, e2e not run) | Per Epic 0 scope; qa-tester/budget-auditor review pending until agents load after restart
