# JS Quest

A production-ready, beginner-friendly JavaScript learning experience built with Next.js, TypeScript, Tailwind CSS, and local Shadcn-style UI primitives.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Architecture

- `data/lessons.json`: lesson curriculum and challenge content
- `components/progress-provider.tsx`: localStorage-backed XP and completion state
- `components/ui`: reusable interface primitives
- `app/dashboard`: progress dashboard and lesson map
- `app/lesson/[id]`: reusable six-step lesson engine with confidence checks
- `app/mistakes`: searchable-style library of common beginner mistakes
- `app/playground`: Monaco-powered, browser-only JavaScript playground
