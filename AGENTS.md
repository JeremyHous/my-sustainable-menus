<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- Everything below this line is project guidance maintained by hand. `next dev` only rewrites the block above. -->

# My Sustainable Menus: guide for coding agents

A tool that helps chefs design sustainable menus with a low carbon footprint. The chef builds an ingredient library with carbon emission factors, composes menus from it, and the app shows the carbon impact of their choices so they can decide what to put on the menu.

The chef designs the menu. The app supplies data and analysis, and never designs the menu for them.

## Rules

These rules apply to code and to your replies. Follow them unless the user explicitly asks otherwise.

1. **Do not add ingredient or emissions data.** The app ships with no ingredient data: chefs enter every ingredient and its emission factor themselves. Do not seed, hard-code, fetch or import ingredient lists or emission factors, and do not install packages for them.
2. **Do not suggest menus.** Never generate, recommend or auto-compose menus, dishes or recipes, either in code (for example, a "suggested menu" or "swap this ingredient" feature) or in your replies. The app only reports and compares the carbon impact of the ingredients the chef chooses.
3. **Use the `app/` folder for new pages.** Every new route goes under `app/` using App Router conventions (`app/<route>/page.tsx`). Do not create a `pages/` directory.
4. **Keep the site fully static.** The site is a static export hosted on GitHub Pages (`output: "export"` in `next.config.ts`), so there is no server at runtime. Do not use Server Actions, Route Handlers that read the request, `cookies()` or `headers()`, `proxy`, rewrites, redirects, ISR, or dynamic routes without `generateStaticParams()`. `next/image` needs `unoptimized`. See `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`.
5. **Do not add dependencies without asking.** The project runs on Next.js, React and Tailwind only.

## Stack

- **Next.js 16** (App Router), React 19
- **TypeScript** in strict mode (see `tsconfig.json`)
- **Tailwind CSS v4**, set up through `@tailwindcss/postcss`. Global styles live in `app/globals.css`.
- **ESLint 9** with `eslint-config-next`
- Node.js 20.9 or later

## Commands

```bash
npm install      # first time only
npm run dev      # dev server at http://localhost:3000 (no base path)
npm run build    # static export into out/ (served under /my-sustainable-menus)
npm run lint     # ESLint
```

`npm run start` does **not** work with a static export (`next start` refuses `output: "export"`). Use `npm run dev` to view the app and `npm run build` to check the export. There are no automated tests yet.

## Project structure

```
app/
  layout.tsx                 Root layout with the navigation bar
  page.tsx                   Home page
  about/page.tsx             About page
  ingredients/
    page.tsx                 Page shell (Server Component) with its pictogram
    ingredient-library.tsx   Ingredient form and list (Client Component)
  menus/
    page.tsx                 Page shell (Server Component) with its pictogram
    menu-library.tsx         Menu form and list (Client Component)
    menu-dashboard.tsx       Carbon ranking and podium
    fan-star.tsx             Fan-approval star
lib/
  local-store.ts             Generic localStorage list with a React hook
  ingredients.ts             Ingredient type and actions
  menus.ts                   Menu types, carbon calculation, ranking, formatting
docs/                        Next.js reference notes used while building
.github/workflows/deploy.yml GitHub Pages deployment
```

## Data model and storage

There is no backend or database. Data lives in the browser's `localStorage`, through `createLocalStore` in `lib/local-store.ts`:

| Key | Type | Defined in |
| --- | --- | --- |
| `sustainable-menus:ingredients` | `Ingredient[]` | `lib/ingredients.ts` |
| `sustainable-menus:menus` | `Menu[]` | `lib/menus.ts` |

- **Units:** emission factors are in **gCO2e per gram**, quantities in **grams**, and a menu is **one adult portion**. Impact = grams × emission factor. Show amounts with `formatCo2()` (it switches to kgCO2e from 1000 g).
- **Menus point to ingredients by `ingredientId`.** If an ingredient is deleted, `calculateImpact()` leaves it out and counts it in `missing`, and `rankMenus()` puts incomplete menus last. Keep that behaviour.
- **Chefs already have saved data.** Do not rename the storage keys or change existing fields in a breaking way. Add new fields as optional (like `fanApproved?`) and handle data saved before they existed.
- Read and write data only through the functions in `lib/`, not by calling `localStorage` directly from components.

## Conventions

- Write TypeScript only (`.ts` / `.tsx`), and give ingredient and emission data explicit types.
- Style with Tailwind utility classes, and support dark mode with `dark:` variants. Avoid adding new CSS files.
- Use Server Components by default. Add `"use client"` only when a component needs interactivity or `localStorage`. The existing pattern is a server `page.tsx` that renders a client `*-library.tsx`.
- Navigate with `next/link`, which adds the `/my-sustainable-menus` base path in production. A hard-coded URL to a file in `public/` needs that base path too.
- **Pictograms** are inline SVGs defined in the page that uses them: `fill="none"`, `stroke="currentColor"`, `strokeWidth="4"`, round caps and joins, `aria-hidden="true"`, and the colour classes `text-amber-500/15 dark:text-amber-300/10`.

## Before you finish a change

1. Run `npm run lint` and fix any errors.
2. Run `npm run build` when you change routes, configuration or anything that could break the static export.
3. Check the affected page in `npm run dev`.

## Git and deployment

- Every push to `main` deploys to the live site, https://jeremyhous.github.io/my-sustainable-menus/, through `.github/workflows/deploy.yml`. Do not push unless the user asks.
- Write short commit messages in the imperative mood that describe the change, for example "Add menu library to /menus page".
