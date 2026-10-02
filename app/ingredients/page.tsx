import IngredientLibrary from "./ingredient-library";

function IngredientsPictogram() {
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-56 w-80 max-w-full text-amber-500/15 dark:text-amber-300/10"
    >
      {/* Tomato */}
      <circle cx="52" cy="104" r="34" />
      <path d="M52 70l-10-8m10 8l10-8m-10 8l-14 4m14-4l14 4m-14-4v-12" />
      {/* Carrot */}
      <path d="M106 52c10-6 24-6 32 0l-14 100c-1 4-5 4-6 0Z" />
      <path d="M112 76h8m-4 22h8m-6 22h6" />
      <path d="M122 50c-4-14-12-22-22-26m22 26c0-16 4-26 12-32m-12 32c6-12 16-18 28-18" />
      {/* Onion */}
      <path d="M196 54c-2 14-34 30-34 62a34 34 0 0 0 68 0c0-32-32-48-34-62Z" />
      <path d="M196 70c-8 12-16 26-16 46s8 30 16 34m0-80c8 12 16 26 16 46s-8 30-16 34" />
      <path d="M190 150l-4 6m10-6v8m6-8l4 6" />
    </svg>
  );
}

// Collapsible help on finding and entering emission factors. It names kinds of
// sources only: the app never supplies emission data itself.
function EmissionFactorGuide() {
  return (
    <details className="mb-8 w-full max-w-3xl rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <summary className="cursor-pointer font-medium text-black dark:text-zinc-50">
        Where to find emission factors
      </summary>
      <div className="mt-4 flex flex-col gap-4">
        <section>
          <h2 className="font-medium text-black dark:text-zinc-50">
            Entering the number
          </h2>
          <p className="mt-1">
            Most sources give figures in kgCO2e per kg, which is the same
            number in gCO2e per gram: a figure of 2.5 kgCO2e/kg is entered as
            2.5. If a source gives gCO2e per 100 g, divide it by 100.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-black dark:text-zinc-50">
            Where to look
          </h2>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>
              National food life-cycle databases published by public
              environmental or agricultural agencies.
            </li>
            <li>
              Peer-reviewed studies and reviews of food life-cycle assessments.
            </li>
            <li>
              Your suppliers and producers, through product carbon labels or
              environmental product declarations.
            </li>
            <li>Food carbon-footprint tools and certification bodies.</li>
          </ul>
        </section>
        <section>
          <h2 className="font-medium text-black dark:text-zinc-50">
            Comparing fairly
          </h2>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>
              Use the same source for as many ingredients as you can, because
              sources measure in different ways.
            </li>
            <li>
              Check what the figure covers: farming only, or also processing,
              packaging and transport.
            </li>
            <li>
              Match the ingredient you actually buy: origin, season, fresh or
              frozen, and how it was produced.
            </li>
            <li>
              Check the weight basis (raw or cooked, whole or edible part), and
              enter your quantities in menus on the same basis.
            </li>
            <li>
              Note the source and its year in the Source field, so you can
              check or update the figure later.
            </li>
          </ul>
        </section>
      </div>
    </details>
  );
}

export default function Page() {
  return (
    <main className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <h1 className="text-center text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Register your ingredients here.
      </h1>
      <p className="mt-4 mb-8 max-w-xl text-center text-zinc-600 dark:text-zinc-400">
        Add each ingredient with its carbon emission factor in gCO2e per gram,
        and note where the figure comes from.
      </p>
      <EmissionFactorGuide />
      <IngredientLibrary belowForm={<IngredientsPictogram />} />
    </main>
  );
}
