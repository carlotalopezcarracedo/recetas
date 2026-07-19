import { describe, expect, it } from "vitest";
import { recipes } from "@/data/recipes";
import { EMPTY_FILTERS, filterRecipes, normalizeText } from "@/lib/recipe-utils";

describe("normalizeText", () => {
  it("ignora tildes, mayúsculas y signos", () => {
    expect(normalizeText("  SARTÉN, Rápida  ")).toBe("sarten rapida");
  });
});

describe("filterRecipes", () => {
  it.each([
    "avena",
    "vainilla",
    "claras",
    "chocolate",
    "crepe",
    "queso",
    "maicena",
    "air fryer",
    "horno",
    "Camembert",
    "postre",
    "tortilla",
    "patata",
    "soja",
    "brocoli",
    "espinaca",
    "calabacin",
    "cena",
    "maiz",
  ])(
    "encuentra resultados para %s",
    (query) => {
      expect(filterRecipes(recipes, query, EMPTY_FILTERS).length).toBeGreaterThan(0);
    },
  );

  it("encuentra las recetas nuevas con texto normalizado", () => {
    expect(filterRecipes(recipes, "maiz", EMPTY_FILTERS).map((recipe) => recipe.slug)).toContain("tarta-queso-pequena");
    expect(filterRecipes(recipes, "brocoli", EMPTY_FILTERS).map((recipe) => recipe.slug)).toContain("tortilla-patata-soja-texturizada");
  });

  it("combina categoría, tipo y etiqueta", () => {
    const result = filterRecipes(recipes, "", {
      mealTypes: ["desayuno"],
      flavorTypes: ["dulce"],
      tags: ["microondas"],
      favoritesOnly: false,
    });
    expect(result.map((recipe) => recipe.slug)).toEqual(["bizcocho-microondas"]);
  });

  it("filtra favoritas usando el conjunto proporcionado", () => {
    const result = filterRecipes(
      recipes,
      "",
      { ...EMPTY_FILTERS, favoritesOnly: true },
      new Set(["recipe-crepes-caseras"]),
    );
    expect(result.map((recipe) => recipe.slug)).toEqual(["crepes-caseras"]);
  });
});
