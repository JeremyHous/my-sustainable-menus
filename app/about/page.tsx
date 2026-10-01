function MealPictogram() {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 m-auto h-[28rem] w-[28rem] max-w-full text-amber-500/15 dark:text-amber-300/10"
    >
      {/* Steam */}
      <path d="M85 30c-6-8 6-12 0-20" />
      <path d="M100 26c-6-8 6-12 0-20" />
      <path d="M115 30c-6-8 6-12 0-20" />
      {/* Bowl */}
      <path d="M45 70h110a55 55 0 0 1-110 0Z" />
      <path d="M60 70c4-10 14-16 22-16s14 6 18 10c4-6 12-10 20-8s14 8 18 14" />
      {/* Fork */}
      <path d="M20 40v30m-6-30v14a6 6 0 0 0 12 0V40m-6 36v60" />
      {/* Knife */}
      <path d="M180 40c-8 6-10 22-6 34h6v62" />
    </svg>
  );
}

export default function Page() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-zinc-50 px-4 font-sans dark:bg-black">
      <MealPictogram />
      <div className="relative max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          About
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Sustainable Menus helps chefs design menus with a lower carbon
          footprint. Enter the ingredients you plan to cook with, and the app
          shows the carbon emissions linked to each one, so you can compare
          options and make informed choices. You stay in charge of the menu:
          the app gives you the data, and the creative decisions are yours.
        </p>
      </div>
    </main>
  );
}
