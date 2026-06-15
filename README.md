# India Festival Calendar 🪔

A Next.js app for exploring Hindi and Marathi festivals — history, celebration guides, recipes, decorations, and a festival calendar.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build / Deploy

This project is configured for static export and GitHub Pages deployment:

```bash
npm run build
```

Output goes to `out/`. Pushing to `main` triggers the `.github/workflows/deploy.yml` workflow, which builds and publishes to GitHub Pages.

## Tech Stack

- Next.js 14 (static export)
- React 18 + TypeScript
- Tailwind CSS
- Radix UI + Framer Motion + Lucide icons

## Project Structure

- `app/` — Next.js app router pages and layout
- `components/` — UI components (festival lists, calendar, landing page, etc.)
- `data/` — festival data (JSON)
- `lib/` — utilities and API helpers
- `public/` — static assets (videos, manifest)
