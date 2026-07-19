"use client";

import { Minus, Plus, RotateCcw, Scale, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { IngredientList } from "@/components/ingredient-list";
import { adjustServingCount, getScaleFactor } from "@/lib/servings";
import type { IngredientGroup, Recipe, RecipeIngredient } from "@/types/recipe";

type ServingAdjusterProps = {
  ingredients: RecipeIngredient[];
  groups?: IngredientGroup[];
  servings: NonNullable<Recipe["servings"]>;
};

function getServingLabel(value: number, servings: NonNullable<Recipe["servings"]>): string {
  return value === 1 ? (servings.unitSingular ?? servings.unit) : servings.unit;
}

export function ServingAdjuster({ ingredients, groups, servings }: ServingAdjusterProps) {
  const [selectedServings, setSelectedServings] = useState(servings.amount);
  const limits = { base: servings.amount, min: servings.min, max: servings.max };
  const factor = getScaleFactor(servings.amount, selectedServings);
  const min = servings.min ?? 1;
  const max = servings.max ?? 12;

  function adjust(action: "increment" | "decrement" | "reset") {
    setSelectedServings((current) => adjustServingCount(current, action, limits));
  }

  return (
    <div className="serving-adjuster">
      <div className="serving-heading">
        <span className="serving-icon"><Scale aria-hidden="true" size={20} /></span>
        <div>
          <h3>Ajustar raciones</h3>
          <p>Receta probada para <strong>{servings.amount} {getServingLabel(servings.amount, servings)}</strong>.</p>
        </div>
      </div>
      <div className="serving-controls" aria-label="Ajustar número de raciones">
        <button type="button" onClick={() => adjust("decrement")} disabled={selectedServings <= min} aria-label="Reducir raciones">
          <Minus aria-hidden="true" size={22} />
        </button>
        <output aria-live="polite">
          <strong>{selectedServings}</strong>
          <span>{getServingLabel(selectedServings, servings)}</span>
        </output>
        <button type="button" onClick={() => adjust("increment")} disabled={selectedServings >= max} aria-label="Aumentar raciones">
          <Plus aria-hidden="true" size={22} />
        </button>
      </div>
      <button type="button" className="serving-reset" onClick={() => adjust("reset")} disabled={selectedServings === servings.amount}>
        <RotateCcw aria-hidden="true" size={16} /> Recuperar cantidad original
      </button>
      <p className="scaling-warning"><TriangleAlert aria-hidden="true" size={18} />Las cantidades se ajustan automáticamente, pero el recipiente, el tiempo de cocción y el aparato pueden necesitar cambios.</p>
      <IngredientList ingredients={ingredients} groups={groups} scaleFactor={factor} />
    </div>
  );
}
