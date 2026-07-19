import type { RecipeIngredient } from "@/types/recipe";

export type ServingLimits = {
  base: number;
  min?: number;
  max?: number;
};

export type ServingAction = "increment" | "decrement" | "reset";

const FRACTIONS = [
  { value: 1 / 8, symbol: "⅛" },
  { value: 1 / 4, symbol: "¼" },
  { value: 1 / 3, symbol: "⅓" },
  { value: 1 / 2, symbol: "½" },
  { value: 2 / 3, symbol: "⅔" },
  { value: 3 / 4, symbol: "¾" },
  { value: 7 / 8, symbol: "⅞" },
] as const;

export function clampServings(value: number, { min = 1, max = 12 }: ServingLimits): number {
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function adjustServingCount(
  current: number,
  action: ServingAction,
  limits: ServingLimits,
): number {
  if (action === "reset") return clampServings(limits.base, limits);
  return clampServings(current + (action === "increment" ? 1 : -1), limits);
}

export function getScaleFactor(baseServings: number, selectedServings: number): number {
  if (baseServings <= 0 || selectedServings <= 0) {
    throw new Error("Las raciones deben ser mayores que cero.");
  }
  return selectedServings / baseServings;
}

export function formatKitchenQuantity(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  const whole = Math.floor(rounded);
  const decimal = rounded - whole;
  const fraction = FRACTIONS.find(({ value: fractionValue }) =>
    Math.abs(decimal - fractionValue) < 0.015,
  );

  if (fraction) return whole > 0 ? `${whole} ${fraction.symbol}` : fraction.symbol;
  return new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 }).format(rounded);
}

export function getIngredientQuantityText(
  ingredient: RecipeIngredient,
  scaleFactor = 1,
): string {
  if (ingredient.quantityRange) {
    const factor = ingredient.scalable === false ? 1 : scaleFactor;
    const min = formatKitchenQuantity(ingredient.quantityRange.min * factor);
    const max = formatKitchenQuantity(ingredient.quantityRange.max * factor);
    return `${min}–${max}${ingredient.unit ? ` ${ingredient.unit}` : ""}`;
  }
  if (ingredient.quantity !== undefined && ingredient.scalable !== false) {
    const scaledQuantity = ingredient.quantity * scaleFactor;
    const formatted = formatKitchenQuantity(scaledQuantity);
    const unit = Math.abs(scaledQuantity) > 1 ? (ingredient.unitPlural ?? ingredient.unit) : ingredient.unit;
    return unit ? `${formatted} ${unit}` : formatted;
  }
  if (ingredient.quantity !== undefined) {
    const formatted = formatKitchenQuantity(ingredient.quantity);
    return ingredient.unit ? `${formatted} ${ingredient.unit}` : formatted;
  }
  return ingredient.displayQuantity ?? "";
}

export function isIngredientScalable(ingredient: RecipeIngredient): boolean {
  return (ingredient.quantity !== undefined || ingredient.quantityRange !== undefined) && ingredient.scalable !== false;
}
