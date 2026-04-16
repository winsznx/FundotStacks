# Development notes

This file tracks conventions for working on FundotStacks outside the user-facing
docs (which live in `README.md` and `INTEGRATION.md`).

## Frontend layout

- Primitives live in `frontend/src/components/ui/`.
- Domain composites live in `frontend/src/components/{campaign,common,wallet}/`.
- Pure helpers and formatters live in `frontend/src/lib/`.
- Enum-like constants live in `frontend/src/constants/` and are frozen.
- Generic React hooks live in `frontend/src/hooks/`.

## Imports

Prefer the `@/` alias for absolute imports (resolved by both Vite and vitest):

```js
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui'
import { useDebounce } from '@/hooks'
```

## Testing

Frontend tests run via `vitest` using `frontend/vitest.config.js`. Keep tests
colocated under `__tests__/` with the code they cover.

## Style

ESLint rules in `frontend/eslint.config.js` enforce `eqeqeq`, `no-var`,
`prefer-const`, and warn on `console.log`. Run `npm run lint --prefix frontend`
before opening a PR.
