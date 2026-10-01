import MenuLibrary from "./menu-library";

function SportFansPictogram() {
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
      {/* Fan 1: cheering with a drink */}
      <circle cx="70" cy="62" r="14" />
      <path d="M58 84h24M54 84l-4 8M86 84l4 8" />
      <path d="M44 156v-44c0-12 10-20 26-20s26 8 26 20v44" />
      <path d="M90 100l14-24" />
      <path d="M98 52h16l-3 22h-10Z" />
      <path d="M100 60h12" />
      {/* Fan 2: eating a burger */}
      <circle cx="170" cy="62" r="14" />
      <path d="M158 84h24M154 84l-4 8M186 84l4 8" />
      <path d="M144 156v-44c0-12 10-20 26-20s26 8 26 20v44" />
      <path d="M150 104l-4-18 8-12" />
      <path d="M140 64c0-8 8-12 14-12s14 4 14 12Z" />
      <path d="M140 70h28M142 76h24" />
      {/* Ball */}
      <circle cx="120" cy="136" r="16" />
      <path d="M120 128l7 5-3 8h-8l-3-8Z" />
      <path d="M120 120v8m7 5l8-3m-11 11l5 7m-13-7l-5 7m2-11l-8-3" />
    </svg>
  );
}

export default function Page() {
  return (
    <main className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <h1 className="text-center text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Create your Menu
      </h1>
      <p className="mt-4 mb-8 max-w-xl text-center text-zinc-600 dark:text-zinc-400">
        Name your menu, pick ingredients from your library and enter the
        quantity in grams for one adult portion. The carbon impact is
        calculated as you go.
      </p>
      <MenuLibrary belowForm={<SportFansPictogram />} />
    </main>
  );
}
