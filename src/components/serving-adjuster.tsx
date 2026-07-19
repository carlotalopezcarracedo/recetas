"use client";

import { Minus, Plus, RotateCcw, Scale, TriangleAlert } from "lucide-react";
import { IngredientList } from "@/components/ingredient-list";
import { ProportionTable } from "@/components/proportion-table";
import { useRecipeExperience } from "@/components/recipe-experience";
import { adjustServingCount } from "@/lib/servings";
import type { IngredientGroup, IngredientSection, Recipe, RecipeIngredient } from "@/types/recipe";

type ServingAdjusterProps = {
  ingredients: RecipeIngredient[];
  groups?: IngredientGroup[];
  sections?: IngredientSection[];
  servings: NonNullable<Recipe["servings"]>;
  proportionGuide?: Recipe["proportionGuide"];
  servingScaleNote?: string;
};

function getServingLabel(value: number, servings: NonNullable<Recipe["servings"]>): string {
  return value === 1 ? (servings.unitSingular ?? servings.unit) : servings.unit;
}

export function ServingAdjuster({ ingredients, groups, sections, servings, proportionGuide, servingScaleNote }: ServingAdjusterProps) {
  const { selectedServings, scaleFactor, changeServings } = useRecipeExperience();
  const limits = { base: servings.amount, min: servings.min, max: servings.max };
  const min = servings.min ?? 1;
  const max = servings.max ?? 12;

  function adjust(action: "increment" | "decrement" | "reset") {
    changeServings(adjustServingCount(selectedServings, action, limits));
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
      {servingScaleNote && <p className="batch-warning"><TriangleAlert aria-hidden="true" size={18} />{servingScaleNote}</p>}
      <IngredientList ingredients={ingredients} groups={groups} sections={sections} scaleFactor={scaleFactor} />
      {proportionGuide && <ProportionTable ingredients={ingredients} baseServings={servings.amount} guide={proportionGuide} />}
    </div>
  );
}
