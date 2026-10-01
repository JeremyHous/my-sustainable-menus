import type { Ingredient } from "@/lib/ingredients";
import { formatCo2, rankMenus, type Menu, type RankedMenu } from "@/lib/menus";
import FanStar from "./fan-star";

// Podium steps, drawn in the classic order: 2nd, 1st, 3rd.
const steps = [
  { place: 2, height: "h-16", tone: "bg-zinc-300 dark:bg-zinc-700" },
  { place: 1, height: "h-24", tone: "bg-amber-400 dark:bg-amber-500" },
  { place: 3, height: "h-10", tone: "bg-orange-300 dark:bg-orange-800" },
];

function Podium({ ranked }: { ranked: RankedMenu[] }) {
  return (
    <div className="flex items-end gap-2" role="img" aria-label="Podium of the three menus with the lowest carbon impact">
      {steps.map(({ place, height, tone }) => {
        const entry = ranked[place - 1];
        return (
          <div key={place} className="flex min-w-0 flex-1 flex-col items-center">
            <p
              className="flex w-full items-center justify-center gap-1 text-sm font-medium text-black dark:text-zinc-50"
              title={entry?.menu.name}
            >
              <span className="truncate">{entry ? entry.menu.name : "–"}</span>
              {entry?.menu.fanApproved && <FanStar />}
            </p>
            <p className="mb-1 text-xs text-green-700 dark:text-green-400">
              {entry ? formatCo2(entry.total) : " "}
            </p>
            <div
              className={`flex w-full items-start justify-center rounded-t-md pt-1 text-lg font-bold text-white ${height} ${tone}`}
            >
              {place}
            </div>
          </div>
        );
      })}
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
      <div>
        <h2 className="mb-4 text-lg font-semibold text-black dark:text-zinc-50">
          Lowest carbon menus
        </h2>
        <Podium ranked={ranked.filter((entry) => entry.missing === 0)} />
      </div>

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
