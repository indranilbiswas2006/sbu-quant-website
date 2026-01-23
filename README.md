# SBU Quant Website

Official website for the Stony Brook Quant Club. Built with Next.js and Tailwind CSS, featuring interactive educational demos and club info pages.

Deployed site: https://sbu-quant-website-kotr.vercel.app/

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- Recharts + Plotly.js

## Requirements

- Node.js 20+ (see `.nvmrc`)
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

- `npm run dev` - Start the dev server
- `npm run build` - Production build
- `npm run start` - Start the production server
- `npm run lint` - Run lint checks

## Project Structure

- `app/` - App Router pages and layout
- `components/` - Reusable UI and interactive demos
- `public/` - Static assets
- `types/` - Shared TypeScript types

## Deployment (Vercel)

The project is configured for Vercel via `vercel.json`. Deploy by connecting the GitHub repo to Vercel and using the default Next.js settings.

Key commands:

- Build: `npm run build`
- Output: `.next`

## Notes

- Google Fonts are loaded via `next/font` in `app/layout.tsx`.
- This project uses client-side-only Plotly components where needed.
