import type { Ingredient } from "@/lib/ingredients";
import { formatCo2, rankMenus, type Menu, type RankedMenu } from "@/lib/menus";
import FanStar from "./fan-star";

// Medal blocks in rank order. `order` draws them in the classic 2nd, 1st,
// 3rd arrangement while screen readers still hear 1st, 2nd, 3rd.
const steps = [
  { place: 1, label: "1st", height: "h-28", order: "order-2", medal: "bg-[#F5C518]", delay: "[animation-delay:150ms]" },
  { place: 2, label: "2nd", height: "h-20", order: "order-1", medal: "bg-[#C9CFCB]", delay: "[animation-delay:300ms]" },
  { place: 3, label: "3rd", height: "h-14", order: "order-3", medal: "bg-[#C98A4B]", delay: "[animation-delay:450ms]" },
];

// Medal ceremony on the pitch: the three lowest-carbon complete menus stand
// on a chalk touchline over turf stripes.
function Podium({ ranked }: { ranked: RankedMenu[] }) {
  return (
    <div className="overflow-hidden rounded-md bg-[repeating-linear-gradient(90deg,#1F5130_0_32px,#245C37_32px_64px)] px-3 pt-4 text-[#F3F1E7] dark:bg-[repeating-linear-gradient(90deg,#11301C_0_32px,#153822_32px_64px)]">
      <h2 className="font-[family-name:var(--font-display)] text-2xl leading-none font-black uppercase">
        Lowest carbon menus
      </h2>
      <p className="mt-1 text-xs text-[#F3F1E7]/75">Carbon per adult portion</p>
      <ol className="mt-4 flex items-end gap-2 border-b-4 border-[#F3F1E7]">
        {steps.map(({ place, label, height, order, medal, delay }) => {
          const entry = ranked[place - 1];
          return (
            <li key={place} className={`flex min-w-0 flex-1 flex-col ${order}`}>
              <span className="sr-only">{label}: </span>
              <p
                className="flex items-center justify-center gap-1 text-xs font-medium"
                title={entry?.menu.name}
              >
                <span className="truncate">{entry ? entry.menu.name : "No menu yet"}</span>
                {entry?.menu.fanApproved && <FanStar />}
              </p>
              <p className="mb-1.5 text-center font-[family-name:var(--font-display)] text-xl leading-tight font-bold">
                {entry ? formatCo2(entry.total) : " "}
              </p>
              <div
                aria-hidden="true"
                className={`flex origin-bottom justify-center rounded-t-sm pt-1 font-[family-name:var(--font-display)] text-5xl leading-none font-black motion-safe:animate-rise ${height} ${delay} ${
                  entry
                    ? `${medal} text-[#14231A]`
                    : "border-2 border-b-0 border-dashed border-[#F3F1E7]/50 text-[#F3F1E7]/50"
                }`}
              >
                {place}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function MenuDashboard({
  menus,
  ingredients,
}: {
  menus: Menu[];
  ingredients: Ingredient[];
}) {
  const ranked = rankMenus(menus, ingredients);
  const hasIncomplete = ranked.some((entry) => entry.missing > 0);

  return (
    <aside className="flex flex-col gap-6 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <Podium ranked={ranked.filter((entry) => entry.missing === 0)} />

      <div>
        <h2 className="mb-2 text-lg font-semibold text-black dark:text-zinc-50">Dashboard</h2>
        {ranked.length === 0 ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Saved menus will appear here with their carbon score.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                <th className="py-2 font-medium">Menu</th>
                <th className="py-2 text-right font-medium">Carbon score</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map(({ menu, total, missing }) => (
                <tr key={menu.id} className="border-b border-zinc-100 last:border-0 dark:border-zinc-900">
                  <td className="py-2 pr-2 text-black dark:text-zinc-50">{menu.name}</td>
                  <td className="py-2 text-right whitespace-nowrap text-green-700 dark:text-green-400">
                    {formatCo2(total)}
                    {missing > 0 && <span className="text-red-600">*</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {hasIncomplete && (
          <p className="mt-2 text-xs text-red-600">
            * Incomplete: uses an ingredient deleted from the library. Listed last and
            left off the podium.
          </p>
        )}
        {ranked.length > 0 && (
          <p className="mt-2 text-xs text-zinc-500">Carbon score per adult portion, lowest first.</p>
        )}
      </div>
    </aside>
  );
}
