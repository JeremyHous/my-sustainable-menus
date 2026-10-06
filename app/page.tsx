import Link from "next/link";

// Chalk markings of the pitch behind the hero: halfway line, centre circle
// and a corner arc. Each path is normalised to a length of 1 so the lines
// can draw in on load.
function PitchMarkings() {
  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-[#F3F1E7]/25 [stroke-dasharray:1] motion-safe:animate-chalk"
    >
      <path pathLength="1" d="M860 0V700" />
      <circle pathLength="1" cx="860" cy="350" r="160" />
      <circle cx="860" cy="350" r="5" fill="currentColor" />
      <path pathLength="1" d="M0 640a60 60 0 0 1 60 60" />
    </svg>
  );
}

const steps = [
  {
    title: "Stock your library",
    text: "Add each ingredient with its emission factor in gCO2e per gram. You enter the figures, from the sources you trust.",
    href: "/ingredients",
    link: "Open ingredients",
  },
  {
    title: "Build the matchday menu",
    text: "Pick ingredients from your library and enter the grams for one adult portion. The carbon impact updates as you go.",
    href: "/menus",
    link: "Open menus",
  },
  {
    title: "Read the score",
    text: "Your menus are ranked from lowest to highest carbon per portion, so you can decide what goes out to the stands.",
    href: "/menus",
    link: "Compare menus",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col font-[family-name:var(--font-body)]">
      <section className="relative overflow-hidden bg-[repeating-linear-gradient(90deg,#1F5130_0_96px,#245C37_96px_192px)] px-4 py-20 text-[#F3F1E7] sm:px-10 sm:py-28 dark:bg-[repeating-linear-gradient(90deg,#11301C_0_96px,#153822_96px_192px)]">
        <PitchMarkings />
        <div className="relative mx-auto max-w-6xl">
          <h1 className="max-w-[12ch] font-[family-name:var(--font-display)] text-6xl leading-[0.88] font-black uppercase sm:text-8xl lg:text-9xl">
            Cook for the whole stadium. Keep the carbon low.
          </h1>
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-[#F3F1E7]/85 sm:text-xl">
            Matchday menus feed thousands of fans in a few hours. Enter your
            ingredients and their emission factors, build your menus, and see
            the carbon per portion before anything goes on the board.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/ingredients"
              className="rounded-sm bg-[#F5C518] px-7 py-3.5 text-center text-lg font-semibold text-[#14231A] hover:bg-[#FFD84A] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#F5C518]"
            >
              Add ingredients
            </Link>
            <Link
              href="/menus"
              className="rounded-sm border-2 border-[#F3F1E7] px-7 py-3.5 text-center text-lg font-semibold hover:bg-[#F3F1E7] hover:text-[#14231A] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#F3F1E7]"
            >
              Design a menu
            </Link>
          </div>
        </div>
      </section>

      <section className="flex-1 bg-[#E4E9E2] px-4 py-16 text-[#14231A] sm:px-10 sm:py-20 dark:bg-[#0E1A12] dark:text-[#F3F1E7]">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold uppercase sm:text-5xl">
            Your game plan
          </h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="border-t-2 border-dashed border-[#1F5130]/40 pt-6 dark:border-[#F3F1E7]/30"
              >
                <span
                  aria-hidden="true"
                  className="block font-[family-name:var(--font-display)] text-7xl leading-none font-black text-transparent [-webkit-text-stroke:2px_#1F5130] dark:[-webkit-text-stroke:2px_#F5C518]"
                >
                  {index + 1}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[40ch] leading-relaxed text-[#14231A]/80 dark:text-[#F3F1E7]/75">
                  {step.text}
                </p>
                <Link
                  href={step.href}
                  className="mt-4 inline-block font-semibold text-[#1F5130] underline decoration-2 underline-offset-4 hover:decoration-[#F5C518] dark:text-[#F5C518]"
                >
                  {step.link}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
