"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { getScaleFactor } from "@/lib/servings";
import type { Recipe } from "@/types/recipe";

type RecipeExperienceValue = {
  selectedServings: number;
  scaleFactor: number;
  cookingStarted: boolean;
  changeServings: (next: number) => boolean;
  startCooking: () => void;
};

const RecipeExperienceContext = createContext<RecipeExperienceValue | null>(null);

export function RecipeExperienceProvider({ recipe, children }: { recipe: Recipe; children: ReactNode }) {
  const baseServings = recipe.servings?.amount ?? 1;
  const [selectedServings, setSelectedServings] = useState(baseServings);
  const [cookingStarted, setCookingStarted] = useState(false);

  const value = useMemo<RecipeExperienceValue>(() => ({
    selectedServings,
    scaleFactor: getScaleFactor(baseServings, selectedServings),
    cookingStarted,
    changeServings(next) {
      if (next === selectedServings) return true;
      if (cookingStarted && !window.confirm("Cambiar las raciones modificará todas las cantidades. ¿Quieres continuar?")) {
        return false;
      }
      setSelectedServings(next);
      return true;
    },
    startCooking() {
      setCookingStarted(true);
    },
  }), [baseServings, cookingStarted, selectedServings]);

  return <RecipeExperienceContext.Provider value={value}>{children}</RecipeExperienceContext.Provider>;
}

export function useRecipeExperience(): RecipeExperienceValue {
  const context = useContext(RecipeExperienceContext);
  if (!context) throw new Error("useRecipeExperience debe utilizarse dentro de RecipeExperienceProvider.");
  return context;
}
