import type { Ingredient } from "./ingredients";
import { createLocalStore } from "./local-store";

// The chef's menu library, saved in the browser's localStorage.
// A menu is one portion for one adult, made of ingredients from the ingredient library.

export type MenuItem = {
  ingredientId: string;
  /** Quantity of the ingredient in the portion, in grams. */
  grams: number;
};

export type Menu = {
  id: string;
  name: string;
  items: MenuItem[];
  /** Ticked by the chef when fans (consumers) validated or enjoyed the menu. */
  fanApproved?: boolean;
};

export type MenuInput = Omit<Menu, "id">;

const store = createLocalStore<Menu>("sustainable-menus:menus");

export function useMenus(): Menu[] {
  return store.useItems();
}

export function addMenu(input: MenuInput) {
  store.save([...store.getItems(), { id: crypto.randomUUID(), ...input }]);
}

export function updateMenu(id: string, input: MenuInput) {
  store.save(
    store.getItems().map((menu) => (menu.id === id ? { id, ...input } : menu)),
  );
}

export function deleteMenu(id: string) {
  store.save(store.getItems().filter((menu) => menu.id !== id));
}

/**
 * Carbon impact of a portion in gCO2e: sum of grams × emission factor (gCO2e/g).
 * Uses the current emission factors from the ingredient library. Items whose
 * ingredient was deleted from the library are left out and counted in `missing`.
 */
export function calculateImpact(
  items: MenuItem[],
  ingredients: Ingredient[],
): { total: number; missing: number } {
  let total = 0;
  let missing = 0;
  for (const item of items) {
    const ingredient = ingredients.find((i) => i.id === item.ingredientId);
    if (ingredient) total += item.grams * ingredient.emissionFactor;
    else missing += 1;
  }
  return { total, missing };
}

export type RankedMenu = { menu: Menu; total: number; missing: number };

/**
 * Menus sorted from lowest to highest carbon impact (best first); ties sorted by name.
 * Incomplete menus (using a deleted ingredient) come last, since their score is too low.
 */
export function rankMenus(menus: Menu[], ingredients: Ingredient[]): RankedMenu[] {
  return menus
    .map((menu) => ({ menu, ...calculateImpact(menu.items, ingredients) }))
    .sort(
      (a, b) =>
        Number(a.missing > 0) - Number(b.missing > 0) ||
        a.total - b.total ||
        a.menu.name.localeCompare(b.menu.name),
    );
}

/** Formats a gCO2e amount, switching to kgCO2e from 1000 g. */
export function formatCo2(grams: number): string {
  if (grams >= 1000) return `${(grams / 1000).toFixed(2)} kgCO2e`;
  return `${Math.round(grams * 10) / 10} gCO2e`;
}
