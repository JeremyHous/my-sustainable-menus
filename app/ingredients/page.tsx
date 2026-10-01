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
      <IngredientLibrary belowForm={<IngredientsPictogram />} />
    </main>
  );
}
