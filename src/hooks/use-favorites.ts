"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "carlota-recipe-favorites";
const CHANGE_EVENT = "carlota-favorites-change";

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getServerSnapshot(): string {
  return "[]";
}

export function useFavorites() {
  const serialized = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const favorites = useMemo<string[]>(() => {
    try {
      const parsed: unknown = JSON.parse(serialized);
      return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
    } catch {
      return [];
    }
  }, [serialized]);

  const toggleFavorite = useCallback((recipeId: string) => {
    try {
      const current = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown;
      const ids = new Set(Array.isArray(current) ? current.filter((id): id is string => typeof id === "string") : []);
      if (ids.has(recipeId)) ids.delete(recipeId);
      else ids.add(recipeId);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      // La receta sigue siendo usable aunque el navegador bloquee localStorage.
    }
  }, []);

  return { favorites, toggleFavorite };
}
