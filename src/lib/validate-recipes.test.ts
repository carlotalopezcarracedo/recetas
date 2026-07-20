import { describe, expect, it } from "vitest";
import { recipes } from "@/data/recipes";
import { validateRecipes } from "@/lib/validate-recipes";

describe("validateRecipes", () => {
  it("acepta el inventario inicial", () => {
    expect(validateRecipes(recipes)).toEqual([]);
  });

  it("mantiene únicos todos los slugs, incluidos los nuevos", () => {
    const slugs = recipes.map((recipe) => recipe.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toContain("tarta-queso-pequena");
    expect(slugs).toContain("tortilla-patata-soja-texturizada");
    expect(slugs).toContain("bol-avena-fruta-frutos-secos");
    expect(slugs).toContain("bolitas-soja-texturizada-verdura");
    expect(slugs).toContain("noquis-caseros-patata");
  });

  it("modela los ñoquis como preparación base precisa y escalable", () => {
    const gnocchi = recipes.find((recipe) => recipe.slug === "noquis-caseros-patata");
    const riceFlour = gnocchi?.ingredients.find((ingredient) => ingredient.id === "noquis-harina-arroz");

    expect(gnocchi?.recipeKind).toBe("preparacion-base");
    expect(gnocchi?.requiresScale).toBe(true);
    expect(gnocchi?.servings).toMatchObject({ amount: 1, min: 1, max: 8, scalable: true });
    expect(riceFlour?.quantityRange).toEqual({ min: 7, max: 8 });
    expect(gnocchi?.proportionGuide?.servings).toEqual([1, 2, 3, 4]);
    expect(gnocchi?.steps.some((step) => step.durationSeconds === 180)).toBe(true);
    expect(gnocchi?.steps.some((step) => step.durationSeconds === 1200 && step.reminderEverySeconds === 600)).toBe(true);
    expect(gnocchi?.warnings?.some((warning) => warning.includes("arepas"))).toBe(true);
    expect(gnocchi?.howToUse?.length).toBeGreaterThanOrEqual(4);
  });

  it("representa los ciclos de avena sin inventar una cantidad de claras", () => {
    const oatmeal = recipes.find((recipe) => recipe.slug === "bol-avena-fruta-frutos-secos");
    const repeatableStep = oatmeal?.steps.find((step) => step.repeatable);
    const eggWhites = oatmeal?.ingredients.find((ingredient) => ingredient.id === "avena-claras");

    expect(oatmeal?.ingredients.length).toBeGreaterThan(0);
    expect(oatmeal?.steps.length).toBeGreaterThan(0);
    expect(repeatableStep?.repeatable?.stopCondition).toBeTruthy();
    expect(eggWhites?.quantity).toBeUndefined();
    expect(eggWhites?.displayQuantity).toContain("necesarias");
    expect(oatmeal?.ingredientGroups?.find((group) => group.id === "avena-toppings")?.selection).toBe("any");
    expect(oatmeal?.ingredients.filter((ingredient) => ingredient.groupId === "avena-toppings").every((ingredient) => ingredient.optional)).toBe(true);
  });

  it("separa bolitas, acompañamiento y salsa, con elecciones exclusivas", () => {
    const bites = recipes.find((recipe) => recipe.slug === "bolitas-soja-texturizada-verdura");
    const sectionTitles = bites?.ingredientSections?.map((section) => section.title) ?? [];

    expect(bites?.ingredients.length).toBeGreaterThan(0);
    expect(bites?.steps.length).toBeGreaterThan(0);
    expect(sectionTitles).toEqual(expect.arrayContaining(["Bolitas de soja y verdura", "Acompañamiento de mazorca", "Salsa"]));
    expect(bites?.ingredientGroups?.find((group) => group.id === "bolitas-verdura")?.selection).toBe("one");
    expect(bites?.ingredientGroups?.find((group) => group.id === "bolitas-salsa-grasa")?.selection).toBe("one");
    expect(bites?.ingredients.find((ingredient) => ingredient.id === "bolitas-mazorca")?.optional).toBe(true);
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
