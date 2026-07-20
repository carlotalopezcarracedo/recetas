import { describe, expect, it } from "vitest";
import { recipes } from "@/data/recipes";
import {
  adjustServingCount,
  formatKitchenQuantity,
  getIngredientQuantityText,
  getScaleFactor,
} from "@/lib/servings";
import type { RecipeIngredient } from "@/types/recipe";

describe("ajuste de raciones", () => {
  it("calcula factores de escala", () => {
    expect(getScaleFactor(2, 4)).toBe(2);
    expect(getScaleFactor(2, 1)).toBe(0.5);
  });

  it("formatea fracciones habituales y usa coma decimal", () => {
    expect(formatKitchenQuantity(0.25)).toBe("¼");
    expect(formatKitchenQuantity(0.5)).toBe("½");
    expect(formatKitchenQuantity(0.75)).toBe("¾");
    expect(formatKitchenQuantity(1.5)).toBe("1 ½");
    expect(formatKitchenQuantity(2.5)).toBe("2 ½");
    expect(formatKitchenQuantity(1.27)).toBe("1,27");
  });

  it("escala cantidades numéricas sin inventar cantidades aproximadas", () => {
    const cheese: RecipeIngredient = { id: "queso", name: "queso", quantity: 125, unit: "g" };
    const splash: RecipeIngredient = {
      id: "vainilla",
      name: "vainilla",
      displayQuantity: "un chorrito",
      scalable: false,
    };
    expect(getIngredientQuantityText(cheese, 2)).toBe("250 g");
    expect(getIngredientQuantityText(splash, 2)).toBe("un chorrito");
  });

  it("duplica correctamente la tarta de dos a cuatro raciones", () => {
    const recipe = recipes.find((item) => item.slug === "tarta-queso-pequena");
    const cheese = recipe?.ingredients.find((ingredient) => ingredient.id === "tarta-queso-fresco");
    const cornstarch = recipe?.ingredients.find((ingredient) => ingredient.id === "tarta-maicena");
    const vanilla = recipe?.ingredients.find((ingredient) => ingredient.id === "tarta-vainilla");
    const factor = getScaleFactor(recipe?.servings?.amount ?? 0, 4);

    expect(cheese && getIngredientQuantityText(cheese, factor)).toBe("250 g");
    expect(cornstarch && getIngredientQuantityText(cornstarch, factor)).toBe("2 cucharaditas de postre");
    expect(vanilla && getIngredientQuantityText(vanilla, factor)).toBe("un chorrito pequeño");
  });

  it("restaura la base y respeta los límites mínimo y máximo", () => {
    const limits = { base: 2, min: 1, max: 8 };
    expect(adjustServingCount(6, "reset", limits)).toBe(2);
    expect(adjustServingCount(1, "decrement", limits)).toBe(1);
    expect(adjustServingCount(8, "increment", limits)).toBe(8);
  });

  it("escala de forma exacta los rangos de los ñoquis", () => {
    const recipe = recipes.find((item) => item.slug === "noquis-caseros-patata");
    const flakes = recipe?.ingredients.find((ingredient) => ingredient.id === "noquis-copos");
    const water = recipe?.ingredients.find((ingredient) => ingredient.id === "noquis-agua");
    const salt = recipe?.ingredients.find((ingredient) => ingredient.id === "noquis-sal");
    const flour = recipe?.ingredients.find((ingredient) => ingredient.id === "noquis-harina-arroz");
    const turmeric = recipe?.ingredients.find((ingredient) => ingredient.id === "noquis-curcuma");

    expect(flakes && getIngredientQuantityText(flakes, 2)).toBe("40 g");
    expect(water && getIngredientQuantityText(water, 3)).toBe("210 g");
    expect(salt && getIngredientQuantityText(salt, 4)).toBe("4 g");
    expect(flour).toBeDefined();
    expect(turmeric).toBeDefined();
    expect([1, 2, 3, 4].map((servings) =>
      flour && getIngredientQuantityText(flour, getScaleFactor(1, servings)),
    )).toEqual(["7–8 g", "14–16 g", "21–24 g", "28–32 g"]);
    expect(turmeric && getIngredientQuantityText(turmeric, 4)).toBe("una pizca");
  });
});
