# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production (Next.js static export for GitHub Pages)
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured.

## Architecture

This repository powers the `hovanhoa | status` page at `https://status.hovanhoa.net/`. The source code is hosted at `https://github.com/dryfolio/status.hovanhoa.net`. It is a static status page hosted on GitHub Pages (or a similar static host). It monitors services via scheduled GitHub Actions and displays status history using data committed to the repository.

### Data Flow

1. **Collection**: `scripts/health-check.sh` runs via GitHub Actions cron (`.github/workflows/health-check.yml`) — pings each URL in `public/urls.cfg`, appends results to `public/status/{service_name}_report.log`, commits and pushes
2. **Log format**: `YYYY-MM-DD HH:MM, success/failed, response_time_ms`
3. **Display**: The Next.js app fetches logs directly from GitHub raw content URLs at runtime (client-side), parses them, and renders a 90-day histogram

### Key Source Locations

- **`src/services/hooks/useServices.tsx`** — fetches log files from `raw.githubusercontent.com`, aggregates daily summaries, calculates uptime over 90 days
- **`src/services/hooks/useSystemStatus.tsx`** — derives overall system status from all services
- **`src/incidents/hooks/useIncidents.tsx`** — fetches GitHub Issues with `incident` label via GitHub API, groups by month
- **`src/utils/constants.tsx`** — `Status` enum: `OPERATIONAL`, `PARTIAL_OUTAGE`, `OUTAGE`, `UNKNOWN`

### Hardcoded Repository References

Several hooks contain hardcoded references to the `dryfolio/status.hovanhoa.net` repository that must be updated if forking:
- Raw content URLs in `useServices.tsx` / `useSystemStatus.tsx`
- GitHub Issues API URL in `useIncidents.tsx`

### Deployment

GitHub Pages deployment uses `next.config.js` asset prefix set to the repo name in production. The GitHub Actions workflow builds and deploys automatically on push to `main`.

### Styling

Tailwind CSS with a custom color palette (`midnight`, `tahiti`, `bermuda`, etc.) defined in `tailwind.config.js`. Dark mode is class-based, applied globally via `_document.tsx`. Custom component classes (`.card`, `.histogram`, `.bar`) are in `styles/globals.css`.
