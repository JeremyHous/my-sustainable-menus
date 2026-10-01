@AGENTS.md

# My Sustainable Menus

A tool that helps chefs design sustainable menus with a low carbon footprint. The chef enters a list of ingredients, and the app shows the carbon emissions of their choices so they can decide what to put on the menu.

The chef designs the menu. The app supplies data and analysis, and never designs the menu for them.

## Stack

- **Next.js 16** (App Router), React 19
- **TypeScript** (strict mode, see `tsconfig.json`)
- **Tailwind CSS v4**, set up through `@tailwindcss/postcss`. Global styles live in `app/globals.css`.
- **ESLint 9** with `eslint-config-next`

This Next.js version has breaking changes compared with older releases. Before writing Next.js code, check the docs in `node_modules/next/dist/docs/` (see `AGENTS.md`).

## How to run

```bash
npm install      # first time only
npm run dev      # start the dev server, then open http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # run ESLint
```

## Project structure

- `app/` holds all routes, layouts and pages (App Router)
  - `app/layout.tsx` is the root layout
  - `app/page.tsx` is the home page
- `public/` holds static assets

## Rules

1. **Do not add new ingredient libraries.** Use only the ingredient and emissions data the project already has. Do not install packages, fetch external datasets, or hard-code new ingredient lists or emission factors unless the user explicitly asks for it.
2. **Do not suggest menus.** Never generate, recommend or auto-compose menus, dishes or recipes, either in code (for example, a "suggested menu" feature) or in your replies. The app only reports and compares the carbon impact of ingredients the chef chooses.
3. **Use the `app/` folder for new pages.** Every new route goes under `app/` using App Router conventions (`app/<route>/page.tsx`). Do not create a `pages/` directory.

## Conventions

- Write TypeScript only (`.ts` / `.tsx`), and give ingredient and emission data explicit types.
- Style with Tailwind utility classes. Avoid adding new CSS files.
- Use Server Components by default, and add `"use client"` only when a component needs interactivity.
- Run `npm run lint` before you consider a change done.
