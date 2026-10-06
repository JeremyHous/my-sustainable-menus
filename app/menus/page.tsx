import { Big_Shoulders } from "next/font/google";
import MenuLibrary from "./menu-library";

// Stadium-signage face for the podium numbers and scores.
const display = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "900"],
});

function MenuPictogram() {
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
      {/* Open menu card */}
      <path d="M120 22L40 30v112l80 8 80-8V30Z" />
      <path d="M120 22v128" />
      {/* Left page: title and dishes */}
      <path d="M54 50h52" />
      <path d="M58 70h44m-44 14h30m-30 18h44m-44 14h30m-30 14h40" />
      {/* Right page: leaf and dishes */}
      <path d="M150 66c0-14 10-22 22-22 0 14-10 22-22 22Zm0 0l14-14" />
      <path d="M136 86h50m-46 16h42m-42 14h30m-30 14h42" />
    </svg>
  );
}

export default function Page() {
  return (
    <main className={`${display.variable} flex flex-1 flex-col items-center bg-zinc-50 px-4 py-16 font-sans dark:bg-black`}>
      <h1 className="text-center text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Create your Menu
      </h1>
      <p className="mt-4 mb-8 max-w-xl text-center text-zinc-600 dark:text-zinc-400">
        Name your menu, pick ingredients from your library and enter the
        quantity in grams for one adult portion. The carbon impact is
        calculated as you go.
      </p>
      <MenuLibrary belowForm={<MenuPictogram />} />
    </main>
  );
}
