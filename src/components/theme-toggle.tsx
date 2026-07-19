"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "system";
const STORAGE_KEY = "carlota-theme";
const EVENT_NAME = "carlota-theme-change";

function subscribe(callback: () => void): () => void {
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Theme {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    return "system";
  }
}

function getServerSnapshot(): Theme {
  return "system";
}

const options: Array<{ value: Theme; label: string; icon: typeof Sun }> = [
  { value: "light", label: "Tema claro", icon: Sun },
  { value: "dark", label: "Tema oscuro", icon: Moon },
  { value: "system", label: "Seguir el sistema", icon: Laptop },
];

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const currentIndex = options.findIndex((option) => option.value === theme);
  const current = options[currentIndex];
  const Icon = current.icon;

  function cycleTheme() {
    const next = options[(currentIndex + 1) % options.length].value;
    try {
      if (next === "system") window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // El tema sigue el sistema si no hay almacenamiento disponible.
    }
    window.dispatchEvent(new Event(EVENT_NAME));
  }

  return (
    <button className="icon-button" type="button" onClick={cycleTheme} aria-label={`${current.label}. Cambiar tema`} title={current.label}>
      <Icon aria-hidden="true" size={19} />
    </button>
  );
}
