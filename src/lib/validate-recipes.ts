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
    if (recipe.servings) {
      const { amount, min = 1, max = 12, scalable } = recipe.servings;
      if (amount <= 0 || min <= 0 || max <= 0 || min > max || amount < min || amount > max) {
        issues.push({ recipe: context, message: "La configuración de raciones es inválida." });
      }
      if (
        scalable &&
        !recipe.ingredients.some(
          (ingredient) => ingredient.quantity !== undefined && ingredient.scalable !== false,
        )
      ) {
        issues.push({ recipe: context, message: "La receta se marca como escalable, pero no tiene cantidades numéricas escalables." });
      }
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

    const groupIds = new Set<string>();
    for (const group of recipe.ingredientGroups ?? []) {
      if (groupIds.has(group.id)) {
        issues.push({ recipe: context, message: `Grupo de ingredientes duplicado: ${group.id}` });
      }
      groupIds.add(group.id);
      if (!recipe.ingredients.some((ingredient) => ingredient.groupId === group.id)) {
        issues.push({ recipe: context, message: `El grupo ${group.id} no contiene ingredientes.` });
      }
    }
    for (const ingredient of recipe.ingredients) {
      if (ingredient.quantity === undefined && !ingredient.displayQuantity) {
        issues.push({ recipe: context, message: `El ingrediente ${ingredient.id} no tiene cantidad visible.` });
      }
      if (ingredient.quantity !== undefined && ingredient.quantity <= 0) {
        issues.push({ recipe: context, message: `El ingrediente ${ingredient.id} tiene una cantidad no válida.` });
      }
      if (ingredient.groupId && !groupIds.has(ingredient.groupId)) {
        issues.push({ recipe: context, message: `El ingrediente ${ingredient.id} referencia un grupo inexistente.` });
      }
    }

    for (const item of [...recipe.ingredients, ...(recipe.ingredientGroups ?? []), ...recipe.steps]) {
      if (nestedIds.has(item.id)) {
        issues.push({ recipe: context, message: `ID de ingrediente o paso duplicado: ${item.id}` });
      }
      nestedIds.add(item.id);
    }
    for (const step of recipe.steps) {
      if (step.durationSeconds !== undefined && step.durationSeconds < 0) {
        issues.push({ recipe: context, message: `El paso ${step.id} tiene una duración negativa.` });
      }
      if (step.timerIncrementSeconds !== undefined && step.timerIncrementSeconds <= 0) {
        issues.push({ recipe: context, message: `El paso ${step.id} tiene un incremento de temporizador no válido.` });
      }
      if (step.reminderEverySeconds !== undefined && step.reminderEverySeconds <= 0) {
        issues.push({ recipe: context, message: `El paso ${step.id} tiene un recordatorio no válido.` });
      }
    }
  }

  return issues;
}
