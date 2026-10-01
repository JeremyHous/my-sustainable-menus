import { useSyncExternalStore } from "react";

// A list saved in the browser's localStorage under one key, with a React hook
// that re-renders when the list changes (in this tab or in another open tab).
export function createLocalStore<T>(storageKey: string) {
  const EMPTY: T[] = [];
  const listeners = new Set<() => void>();
  let cachedRaw: string | null = null;
  let cachedList: T[] = EMPTY;

  function readStorage(): string | null {
    try {
      return window.localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function getSnapshot(): T[] {
    const raw = readStorage();
    if (raw === cachedRaw) return cachedList;
    cachedRaw = raw;
    try {
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      cachedList = Array.isArray(parsed) ? (parsed as T[]) : EMPTY;
    } catch {
      cachedList = EMPTY;
    }
    return cachedList;
  }

  function getServerSnapshot(): T[] {
    return EMPTY;
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey) listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  function save(list: T[]) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(list));
    } catch {
      // Storage can be unavailable (private mode, quota); the list then won't persist.
    }
    listeners.forEach((listener) => listener());
  }

  function useItems(): T[] {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  }

  return { useItems, getItems: getSnapshot, save };
}
