import { describe, expect, it } from "vitest";
import { recipes } from "@/data/recipes";
import { validateRecipes } from "@/lib/validate-recipes";

describe("validateRecipes", () => {
  it("acepta el inventario inicial", () => {
    expect(validateRecipes(recipes)).toEqual([]);
  });

  it("detecta slugs duplicados, colecciones vacías y tiempos negativos", () => {
    const invalid = {
      ...recipes[0],
      id: "otra-id",
      ingredients: [],
      steps: [],
      prepTimeMinutes: -1,
    };
    const issues = validateRecipes([recipes[0], invalid]);
    expect(issues.some((issue) => issue.message.includes("Slug duplicado"))).toBe(true);
    expect(issues.some((issue) => issue.message.includes("no tiene ingredientes"))).toBe(true);
    expect(issues.some((issue) => issue.message.includes("no tiene pasos"))).toBe(true);
    expect(issues.some((issue) => issue.message.includes("no puede ser negativo"))).toBe(true);
  });
});
