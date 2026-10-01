"use client";

import Link from "next/link";
import { useState } from "react";
import { useIngredients, type Ingredient } from "@/lib/ingredients";
import {
  addMenu,
  calculateImpact,
  deleteMenu,
  formatCo2,
  updateMenu,
  useMenus,
  type Menu,
  type MenuInput,
  type MenuItem,
} from "@/lib/menus";
import FanStar from "./fan-star";
import MenuDashboard from "./menu-dashboard";

const inputClass =
  "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50";

type Row = { key: string; ingredientId: string; grams: string };

const newRow = (): Row => ({ key: crypto.randomUUID(), ingredientId: "", grams: "" });

function parseGrams(text: string): number {
  return Number(text.trim().replace(",", "."));
}

// Rows with a chosen ingredient and a valid quantity, ready for the calculation.
function validItems(rows: Row[]): MenuItem[] {
  return rows
    .map((row) => ({ ingredientId: row.ingredientId, grams: parseGrams(row.grams) }))
    .filter((item) => item.ingredientId && Number.isFinite(item.grams) && item.grams > 0);
}

// Returns an error message, or the cleaned-up menu when the values are valid.
function validate(
  name: string,
  rows: Row[],
  menus: Menu[],
  currentId?: string,
): { error: string } | { input: MenuInput } {
  const trimmed = name.trim();
  if (!trimmed) return { error: "Please give your menu a name." };
  const duplicate = menus.some(
    (menu) => menu.id !== currentId && menu.name.toLowerCase() === trimmed.toLowerCase(),
  );
  if (duplicate) return { error: `A menu called "${trimmed}" already exists.` };

  if (rows.length === 0) return { error: "Add at least one ingredient." };
  for (const row of rows) {
    if (!row.ingredientId) return { error: "Choose an ingredient on every line, or remove the empty line." };
    const grams = parseGrams(row.grams);
    if (!row.grams.trim() || !Number.isFinite(grams) || grams <= 0) {
      return { error: "Every quantity must be a number of grams greater than 0." };
    }
  }
  return { input: { name: trimmed, items: validItems(rows) } };
}

function MenuEditor({
  menu,
  menus,
  ingredients,
  onDone,
}: {
  menu?: Menu;
  menus: Menu[];
  ingredients: Ingredient[];
  onDone: () => void;
}) {
  const [name, setName] = useState(menu?.name ?? "");
  const [rows, setRows] = useState<Row[]>(() =>
    menu
      ? menu.items.map((item) => ({
          key: crypto.randomUUID(),
          // An ingredient deleted from the library must be chosen again.
          ingredientId: ingredients.some((i) => i.id === item.ingredientId) ? item.ingredientId : "",
          grams: String(item.grams),
        }))
      : [newRow()],
  );
  const [fanApproved, setFanApproved] = useState(menu?.fanApproved ?? false);
  const [error, setError] = useState("");

  const { total } = calculateImpact(validItems(rows), ingredients);

  function updateRow(key: string, changes: Partial<Row>) {
    setRows(rows.map((row) => (row.key === key ? { ...row, ...changes } : row)));
  }

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    const result = validate(name, rows, menus, menu?.id);
    if ("error" in result) return setError(result.error);
    const input = { ...result.input, fanApproved };
    if (menu) updateMenu(menu.id, input);
    else addMenu(input);
    onDone();
  }

  return (
    <form
      onSubmit={handleSave}
      className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
        {menu ? `Editing: ${menu.name}` : "New menu"}
      </h2>
      <label className="flex flex-col gap-1 text-sm">
        Menu name (one portion for one adult)
        <input
          className={inputClass}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Menu name"
        />
      </label>

      <div className="flex flex-col gap-2">
        <p className="text-sm">Ingredients</p>
        {rows.map((row) => {
          const ingredient = ingredients.find((i) => i.id === row.ingredientId);
          const grams = parseGrams(row.grams);
          const rowImpact =
            ingredient && Number.isFinite(grams) && grams > 0
              ? formatCo2(grams * ingredient.emissionFactor)
              : "–";
          // Ingredients already used on another line are not offered again.
          const usedElsewhere = new Set(
            rows.filter((r) => r.key !== row.key).map((r) => r.ingredientId),
          );
          return (
            <div key={row.key} className="grid grid-cols-[1fr_7rem] items-center gap-2 sm:grid-cols-[1fr_8rem_8rem_auto]">
              <select
                aria-label="Ingredient"
                className={inputClass}
                value={row.ingredientId}
                onChange={(e) => updateRow(row.key, { ingredientId: e.target.value })}
              >
                <option value="">Choose an ingredient</option>
                {ingredients.map((i) => (
                  <option key={i.id} value={i.id} disabled={usedElsewhere.has(i.id)}>
                    {i.name} ({i.emissionFactor} gCO2e/g)
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-1 text-sm">
                <input
                  aria-label="Quantity in grams"
                  className={inputClass}
                  inputMode="decimal"
                  value={row.grams}
                  onChange={(e) => updateRow(row.key, { grams: e.target.value })}
                  placeholder="0"
                />
                g
              </label>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">{rowImpact}</span>
              <button
                type="button"
                onClick={() => setRows(rows.filter((r) => r.key !== row.key))}
                className="justify-self-start rounded-full border border-red-600 px-3 py-1 text-sm text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
              >
                Remove
              </button>
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => setRows([...rows, newRow()])}
          disabled={rows.length >= ingredients.length}
          className="self-start rounded-full border border-green-600 px-4 py-1.5 text-sm text-green-700 hover:bg-green-50 disabled:opacity-40 dark:text-green-400 dark:hover:bg-green-950"
        >
          + Add an ingredient
        </button>
      </div>

      <p className="rounded-md bg-green-50 px-4 py-3 text-green-800 dark:bg-green-950 dark:text-green-300">
        Carbon impact of this portion: <strong>{formatCo2(total)}</strong>
      </p>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={fanApproved}
          onChange={(e) => setFanApproved(e.target.checked)}
          className="h-4 w-4 accent-green-600"
        />
        Validated / enjoyed by fans <FanStar />
      </label>

      {error &&<p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-full bg-green-600 px-6 py-2 font-medium text-white hover:bg-green-700"
        >
          {menu ? "Save changes" : "Save menu"}
        </button>
        {menu && (
          <button
            type="button"
            onClick={onDone}
            className="rounded-full border border-zinc-300 px-6 py-2 dark:border-zinc-700"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function MenuCard({
  menu,
  ingredients,
  onEdit,
}: {
  menu: Menu;
  ingredients: Ingredient[];
  onEdit: () => void;
}) {
  const { total, missing } = calculateImpact(menu.items, ingredients);

  function handleDelete() {
    if (window.confirm(`Delete the menu "${menu.name}"?`)) deleteMenu(menu.id);
  }

  return (
    <li className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <p className="flex items-center gap-1 font-medium text-black dark:text-zinc-50">
            {menu.name}
            {menu.fanApproved && <FanStar />}
          </p>
          <p className="text-green-700 dark:text-green-400">
            {formatCo2(total)} per portion
          </p>
          <ul className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {menu.items.map((item) => {
              const ingredient = ingredients.find((i) => i.id === item.ingredientId);
              return (
                <li key={item.ingredientId}>
                  {ingredient
                    ? `${ingredient.name}: ${item.grams} g · ${formatCo2(item.grams * ingredient.emissionFactor)}`
                    : `Deleted ingredient: ${item.grams} g (not counted)`}
                </li>
              );
            })}
          </ul>
          {missing > 0 && (
            <p className="mt-2 text-sm text-red-600">
              {missing === 1 ? "1 ingredient was" : `${missing} ingredients were`} deleted from
              the library and {missing === 1 ? "is" : "are"} not counted. Edit the menu to fix it.
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-full border border-green-600 px-4 py-1.5 text-sm text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full border border-red-600 px-4 py-1.5 text-sm text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default function MenuLibrary({
  belowForm,
}: {
  /** Optional background shown below the menu form, behind the library list. */
  belowForm?: React.ReactNode;
}) {
  const ingredients = useIngredients();
  const menus = useMenus();
  // Id of the menu being edited; null means the editor is creating a new menu.
  const [editingId, setEditingId] = useState<string | null>(null);
  // Bumped after each save so the "new menu" editor starts empty again.
  const [formVersion, setFormVersion] = useState(0);

  const editingMenu = menus.find((menu) => menu.id === editingId);

  function handleDone() {
    setEditingId(null);
    setFormVersion((v) => v + 1);
  }

  function handleEdit(id: string) {
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0">
        {ingredients.length === 0 ? (
          <p className="rounded-lg border border-zinc-200 bg-white p-4 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            Your ingredient library is empty. First{" "}
            <Link href="/ingredients" className="font-medium text-green-700 underline dark:text-green-400">
              add ingredients
            </Link>{" "}
            with their emission factors, then come back to compose your menus.
          </p>
        ) : (
          <MenuEditor
            key={editingMenu ? editingMenu.id : `new-${formVersion}`}
            menu={editingMenu}
            menus={menus}
            ingredients={ingredients}
            onDone={handleDone}
          />
        )}

        {/* Library section; belowForm is drawn behind it as a background. */}
        <section className="relative mt-10 min-h-56">
          {belowForm}
          <div className="relative">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
              Your menu library ({menus.length})
            </h2>
            {menus.length === 0 ? (
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">No menus saved yet.</p>
            ) : (
              <ul className="mt-4 flex flex-col gap-3">
                {menus.map((menu) => (
                  <MenuCard
                    key={menu.id}
                    menu={menu}
                    ingredients={ingredients}
                    onEdit={() => handleEdit(menu.id)}
                  />
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      <div className="lg:sticky lg:top-4 lg:self-start">
        <MenuDashboard menus={menus} ingredients={ingredients} />
      </div>
    </div>
  );
}
