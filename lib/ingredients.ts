import { createLocalStore } from "./local-store";

// The chef's ingredient library, saved in the browser's localStorage.
// Shared by /ingredients (to manage the list) and /menus (dropdowns and calculations).

export type Ingredient = {
  id: string;
  name: string;
  /** Carbon emission factor in gCO2e per gram of ingredient. */
  emissionFactor: number;
  /** Where the emission factor comes from (database, study, supplier...). */
  source: string;
};

export type IngredientInput = Omit<Ingredient, "id">;

const store = createLocalStore<Ingredient>("sustainable-menus:ingredients");

export function useIngredients(): Ingredient[] {
  return store.useItems();
}

export function addIngredient(input: IngredientInput) {
  store.save([...store.getItems(), { id: crypto.randomUUID(), ...input }]);
}

export function updateIngredient(id: string, input: IngredientInput) {
  store.save(
    store.getItems().map((item) => (item.id === id ? { id, ...input } : item)),
  );
}

export function deleteIngredient(id: string) {
  store.save(store.getItems().filter((item) => item.id !== id));
}
