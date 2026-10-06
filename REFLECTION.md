# Reflection: My Sustainable Menus

## 1. What I built and how I scoped it down

I built a web app that helps chefs design menus with a low carbon footprint. The chef enters their own ingredients and emission factors, builds menus from them, and the app shows the carbon impact of each portion. I kept the scope small. The app ships with no ingredient data and never suggests menus or ingredient swaps (rules I gave to Claude): the chef stays in charge, and the app only calculates and compares. I limited it to four pages (Home, About, Ingredients, Menus), one adult portion per menu, and simple units (grams and gCO2e per gram). On top of that I added a ranking dashboard, a podium for the top three menus, and a star to mark menus that consumers (fans) liked.

## 2. The persistence decision

As required, I chose the browser's localStorage. The app has one user, no login and no backend, and it is hosted as a static site on GitHub Pages, so there is no server where data could live. localStorage fits that: the data stays on the chef's device, works offline, and needs no database or extra packages. All reading and writing goes through one small helper, so the pages never touch storage directly.

## 3. One moment a Sprint 1 technique changed the outcome: search → paste → cite, or CLAUDE.md catching the agent drifting

Accidentally I asked Claude to create a navigation bar on its own (whereas I wanted to use the search → paste → cite we studied in Part 7). It worked though. Eventually I asked it to remove the navigation bar it had created itself, and then used search → paste → cite to create my links. Both results are/were functional, only the layout was different.

## 4. The design pass

I replaced the default Create Next App starter page with a home page of my own: a welcome text, clear buttons to Ingredients and Menus, and a pictogram. I added a navigation bar and gave each page a soft amber line pictogram in the same style. I later swapped one pictogram (sports fans) for a menu pictogram that fit better. The pages use Tailwind and work in dark mode. Finally, I added a guide on the Ingredients page that explains where to find reliable emission factors (this was suggested by Claude, I had not thought about it)

## 5. One thing that was harder than the plain-HTML app from the static-site lesson

Nothing comes to mind.

## 6. What you would keep or change next time

I would ask Claude more often to be proactive, because it has some nice ideas on how to improve the app. For example, Claude was the one who suggested adding guidance for chefs on how to find carbon emission factors.
