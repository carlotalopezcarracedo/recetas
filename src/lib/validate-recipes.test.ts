import { describe, expect, it } from "vitest";
import { recipes } from "@/data/recipes";
import { validateRecipes } from "@/lib/validate-recipes";

describe("validateRecipes", () => {
  it("acepta el inventario inicial", () => {
    expect(validateRecipes(recipes)).toEqual([]);
  });

  it("incluye las nuevas recetas con sus raciones, opcionales y grupos de elección", () => {
    const cheesecake = recipes.find((recipe) => recipe.slug === "tarta-queso-pequena");
    const tortilla = recipes.find((recipe) => recipe.slug === "tortilla-patata-soja-texturizada");

    expect(cheesecake?.servings?.amount).toBe(2);
    expect(tortilla?.servings?.amount).toBe(1);
    expect(cheesecake?.ingredients.length).toBeGreaterThan(0);
    expect(cheesecake?.steps.length).toBeGreaterThan(0);
    expect(tortilla?.ingredients.length).toBeGreaterThan(0);
    expect(tortilla?.steps.length).toBeGreaterThan(0);
    expect(cheesecake?.ingredients.some((ingredient) => ingredient.optional)).toBe(true);
    expect(tortilla?.ingredientGroups?.some((group) => group.id === "verdura" && group.selection === "one")).toBe(true);
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
