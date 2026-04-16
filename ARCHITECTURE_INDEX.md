# Architecture index

This repo ships three moving parts:

1. **Contracts** (`contracts/`) — Clarity contracts for campaigns, milestones,
   NFT rewards, and refunds. See `Clarinet.toml` and `DEPLOYMENT.md`.
2. **Frontend** (`frontend/`) — Vite + React client. See `frontend/README.md`
   and `DEVELOPMENT.md`.
3. **Integration surface** (`INTEGRATION.md`) — how the contracts and frontend
   are wired together for v1.

## Where to add things

| Concern | Home |
| --- | --- |
| New primitive UI | `frontend/src/components/ui/` |
| New React hook | `frontend/src/hooks/` |
| New pure helper | `frontend/src/lib/` |
| New constant/enum | `frontend/src/constants/` |
| New contract read | `frontend/src/api/queries.js` |
| New contract write | `frontend/src/api/transactions.js` |

See `DEVELOPMENT.md` for conventions and `frontend/README.md` for paths and
testing.
