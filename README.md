# My Sustainable Menus

A web app that helps chefs design menus with a low carbon footprint. Chefs build their own ingredient library with carbon emission factors, compose menus from it, and see the carbon impact of every portion as they go.

The chef designs the menu. The app only provides the data and the calculations.

**Live site:** https://jeremyhous.github.io/my-sustainable-menus/

## Features

- **Ingredient library** (`/ingredients`): add, edit and delete ingredients, each with a carbon emission factor in gCO2e per gram and the source of that figure.
- **Menu library** (`/menus`): create, name, edit and delete menus (one adult portion), choosing ingredients from the library and entering quantities in grams.
- **Carbon impact:** calculated live for each ingredient and for the whole portion (grams × emission factor).
- **Dashboard and podium:** every menu ranked by carbon score, lowest first, with the top 3 shown on a podium.
- **Fan approval:** tick a box when fans validated or enjoyed a menu, and a yellow star appears next to its name.

The app ships with no ingredient data and never suggests menus or dishes: every ingredient, emission factor and menu comes from the chef.

## How the carbon score is calculated

- Each ingredient has an emission factor in **gCO2e per gram**, entered by the chef along with its source.
- Each menu is **one adult portion**, with a quantity in **grams** for each ingredient.
- Ingredient impact = grams × emission factor. The menu's score is the sum of its ingredients' impacts, shown in gCO2e, or in kgCO2e from 1000 g.
- Scores always use the current emission factors, so editing an ingredient updates every menu that uses it.
- If an ingredient is deleted from the library, menus that used it are flagged as incomplete and ranked last on the dashboard.

## Finding emission factors

The app doesn't supply emission factors: chefs bring their own. The **Where to find emission factors** panel on `/ingredients` gives them this guidance:

- **Units:** most sources publish kgCO2e per kg, which is the same number in gCO2e per gram (2.5 kgCO2e/kg is entered as 2.5). A figure in gCO2e per 100 g is divided by 100.
- **Where to look:** national food life-cycle databases from public agencies, peer-reviewed studies and reviews, suppliers' carbon labels or environmental product declarations, and food carbon-footprint tools or certification bodies.
- **Comparing fairly:** use one source for as many ingredients as possible, check what each figure covers (farming only, or also processing, packaging and transport), match the ingredient actually bought (origin, season, fresh or frozen, production method), keep menu quantities on the same weight basis as the figure (raw or cooked, whole or edible part), and record the source and year.

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

`npm run start` does not work, because `next start` cannot serve a static export. Use `npm run dev` to view the app, and `npm run build` to check that the export builds.

## Data storage

There is no backend. Ingredients and menus are saved in the browser's `localStorage`, so:

- the data stays on one browser on one device;
- data entered locally (`localhost:3000`) does not appear on the live site, and the other way round;
- clearing the browser's site data erases the libraries;
- there is no export or backup yet.

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
public/               Static assets
```

## Deployment

The site is deployed to GitHub Pages as a static export.

- `next.config.ts` enables `output: "export"` and serves production builds under `/my-sustainable-menus` (the dev server has no base path).
- `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`. It can also be run by hand from the **Actions** tab.

In the repository settings, **Settings → Pages → Source** must be set to **GitHub Actions**.

Because there is no server, the app can't use features such as Server Actions, API routes or image optimization.

## Working with AI coding agents

`AGENTS.md` holds the project rules and conventions for coding agents, and `CLAUDE.md` imports it for Claude Code. Its top block is managed by `next dev`; edit only below it.
