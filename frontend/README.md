# FundotStacks Frontend

React + Vite client for the FundotStacks v1 campaign platform.

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project layout

- `src/components/ui/` — shared primitive UI (Button, Input, Card, Dialog, ...)
- `src/components/common/` — app-wide shells (ErrorAlert, LoadingSpinner, ErrorBoundary)
- `src/components/campaign/` — campaign-specific composites
- `src/components/wallet/` — wallet connection affordances
- `src/hooks/` — domain hooks (useCampaigns) + generic utilities (useDebounce, useLocalStorage, ...)
- `src/lib/` — pure helpers (cn, format, validation, query keys, explorer URLs, ...)
- `src/constants/` — frozen enums (campaign status, HTTP, currency, time, variants)

## Path alias

Both Vite and vitest resolve `@/` to `src/`, e.g. `import { cn } from '@/lib/cn'`.

## Testing

```bash
npx vitest run
```

Tests live next to the code they cover under `__tests__/` or as `*.test.js` siblings.
