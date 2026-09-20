# VIixson Autos

Premium automotive dealership demo website for **VIixson Autos** (Accra, Ghana).

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide Icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Update dealership contact details in a single file:

`src/lib/config.ts`

- Phone / WhatsApp / email
- Social links
- `isDemo` flag (set to `false` for production)

## Inventory

Demo vehicles live in `src/data/vehicles.ts`. Swap to a database via `src/lib/vehicles.ts` without rewriting page components.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint
