import {
  DIFFICULTIES,
  FLAVOR_TYPES,
  MEAL_TYPES,
  type Recipe,
} from "@/types/recipe";

export type ValidationIssue = {
  recipe?: string;
  message: string;
};

const VALID_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

export function validateRecipes(recipes: Recipe[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const recipeIds = new Set<string>();
  const slugs = new Set<string>();
  const nestedIds = new Set<string>();

  for (const recipe of recipes) {
    const context = recipe.slug || recipe.name || "receta sin identificar";

    if (recipeIds.has(recipe.id)) {
      issues.push({ recipe: context, message: `ID de receta duplicado: ${recipe.id}` });
    }
    recipeIds.add(recipe.id);

    if (slugs.has(recipe.slug)) {
      issues.push({ recipe: context, message: `Slug duplicado: ${recipe.slug}` });
    }
    slugs.add(recipe.slug);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(recipe.slug)) {
      issues.push({ recipe: context, message: "El slug debe usar minúsculas, números y guiones." });
    }
    if (recipe.ingredients.length === 0) {
      issues.push({ recipe: context, message: "La receta no tiene ingredientes." });
    }
    if (recipe.steps.length === 0) {
      issues.push({ recipe: context, message: "La receta no tiene pasos." });
    }
    if (!FLAVOR_TYPES.includes(recipe.flavorType)) {
      issues.push({ recipe: context, message: `Tipo de sabor inválido: ${recipe.flavorType}` });
    }
    if (!DIFFICULTIES.includes(recipe.difficulty)) {
      issues.push({ recipe: context, message: `Dificultad inválida: ${recipe.difficulty}` });
    }
    for (const mealType of recipe.mealTypes) {
      if (!MEAL_TYPES.includes(mealType)) {
        issues.push({ recipe: context, message: `Categoría inválida: ${mealType}` });
      }
    }
    for (const [label, value] of [
      ["preparación", recipe.prepTimeMinutes],
      ["cocinado", recipe.cookTimeMinutes],
      ["total", recipe.totalTimeMinutes],
    ] as const) {
      if (value !== undefined && value < 0) {
        issues.push({ recipe: context, message: `El tiempo de ${label} no puede ser negativo.` });
      }
    }
    if (recipe.image) {
      const extension = recipe.image.slice(recipe.image.lastIndexOf(".")).toLowerCase();
      if (!VALID_IMAGE_EXTENSIONS.includes(extension)) {
        issues.push({ recipe: context, message: `Formato de imagen no admitido: ${extension || "sin extensión"}` });
      }
    }

    for (const item of [...recipe.ingredients, ...recipe.steps]) {
      if (nestedIds.has(item.id)) {
        issues.push({ recipe: context, message: `ID de ingrediente o paso duplicado: ${item.id}` });
      }
      nestedIds.add(item.id);
    }
    for (const step of recipe.steps) {
      if (step.durationSeconds !== undefined && step.durationSeconds < 0) {
        issues.push({ recipe: context, message: `El paso ${step.id} tiene una duración negativa.` });
      }
    }
  }

  return issues;
}
