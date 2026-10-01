import Link from "next/link";

function ChefPictogram() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 m-auto h-[28rem] w-[28rem] max-w-full text-amber-500/15 dark:text-amber-300/10"
    >
      {/* Chef's hat */}
      <path d="M72 62c-14 0-22-10-22-20s10-20 22-18c4-12 16-18 28-18s24 6 28 18c12-2 22 8 22 18s-8 20-22 20" />
      <path d="M72 62v16h56V62" />
      {/* Face */}
      <circle cx="100" cy="102" r="22" />
      {/* Neckerchief */}
      <path d="M86 124l14 12 14-12" />
      {/* Jacket */}
      <path d="M40 194c0-34 22-56 46-62l14 12 14-12c24 6 46 28 46 62" />
      {/* Buttons */}
      <circle cx="92" cy="160" r="2" />
      <circle cx="108" cy="160" r="2" />
      <circle cx="92" cy="178" r="2" />
      <circle cx="108" cy="178" r="2" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center overflow-hidden bg-zinc-50 px-4 pt-16 font-sans dark:bg-black">
      <ChefPictogram />
      <div className="relative flex flex-col items-center">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Welcome to Sustainable Menus App
        </h1>
        <p className="mt-4 text-center text-xl text-green-600 dark:text-green-400">
          What do you want today
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/ingredients"
            className="rounded-full bg-green-600 px-6 py-3 text-center font-medium text-white hover:bg-green-700"
          >
            Add ingredients
          </Link>
          <Link
            href="/menus"
            className="rounded-full border-2 border-green-600 px-6 py-3 text-center font-medium text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
          >
            Design a Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
