import { useSyncExternalStore } from "react";

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

const STORAGE_KEY = "sustainable-menus:ingredients";
const EMPTY: Ingredient[] = [];

const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedList: Ingredient[] = EMPTY;

function readStorage(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getSnapshot(): Ingredient[] {
  const raw = readStorage();
  if (raw === cachedRaw) return cachedList;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cachedList = Array.isArray(parsed) ? (parsed as Ingredient[]) : EMPTY;
  } catch {
    cachedList = EMPTY;
  }
  return cachedList;
}

function getServerSnapshot(): Ingredient[] {
  return EMPTY;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep other open tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function save(list: Ingredient[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Storage can be unavailable (private mode, quota); the list then won't persist.
  }
  listeners.forEach((listener) => listener());
}

export function useIngredients(): Ingredient[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function addIngredient(input: IngredientInput) {
  save([...getSnapshot(), { id: crypto.randomUUID(), ...input }]);
}

export function updateIngredient(id: string, input: IngredientInput) {
  save(getSnapshot().map((item) => (item.id === id ? { id, ...input } : item)));
}

export function deleteIngredient(id: string) {
  save(getSnapshot().filter((item) => item.id !== id));
}
