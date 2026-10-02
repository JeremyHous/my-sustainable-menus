# Sustainable Menus

A web app that helps chefs design menus with a low carbon footprint. Chefs build their own ingredient library with carbon emission factors, compose menus from it, and see the carbon impact of every portion as they go.

The chef designs the menu. The app only provides the data and the calculations.

**Live site:** https://jeremyhous.github.io/my-sustainable-menus/

## Features

- **Ingredient library** (`/ingredients`): add, edit and delete ingredients, each with a carbon emission factor in gCO2e per gram and the source of that figure.
- **Menu library** (`/menus`): create, name, edit and delete menus (one adult portion), choosing ingredients from the library and entering quantities in grams.
- **Carbon impact:** calculated live for each ingredient and for the whole portion (grams × emission factor).
- **Dashboard and podium:** every menu ranked by carbon score, lowest first, with the top 3 shown on a podium.
- **Fan approval:** tick a box when fans validated or enjoyed a menu, and a yellow star appears next to its name.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) with React 19
- TypeScript
- Tailwind CSS v4
- ESLint

## Getting started

Requires Node.js 20.9 or later.

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build    # build the static site into out/
npm run lint     # run ESLint
```

## Data storage

There is no backend. Ingredients and menus are saved in the browser's `localStorage`, so:

- the data stays on one browser on one device;
- data entered locally (`localhost:3000`) does not appear on the live site, and the other way round;
- clearing the browser's site data erases the libraries.

## Project structure

```
app/
  layout.tsx          Root layout with the navigation bar
  page.tsx            Home page
  about/              About page
  ingredients/        Ingredient library page
  menus/              Menu library, dashboard and podium
lib/
  local-store.ts      Shared localStorage helper
  ingredients.ts      Ingredient data and actions
  menus.ts            Menu data, carbon calculation and ranking
docs/                 Next.js reference notes used while building
```

## Deployment

The site is deployed to GitHub Pages as a static export.

- `next.config.ts` enables `output: "export"` and serves production builds under `/my-sustainable-menus`.
- `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

In the repository settings, **Settings → Pages → Source** must be set to **GitHub Actions**.
