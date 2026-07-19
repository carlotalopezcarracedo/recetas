import {
  DIFFICULTIES,
  FLAVOR_TYPES,
  MEAL_TYPES,
  RECIPE_KINDS,
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
          (ingredient) =>
            (ingredient.quantity !== undefined || ingredient.quantityRange !== undefined) &&
            ingredient.scalable !== false,
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
    if (recipe.recipeKind && !RECIPE_KINDS.includes(recipe.recipeKind)) {
      issues.push({ recipe: context, message: `Tipo de receta inválido: ${recipe.recipeKind}` });
    }
    if (recipe.requiresScale && !recipe.tools.some((tool) => /balanza|báscula/i.test(tool))) {
      issues.push({ recipe: context, message: "La receta requiere balanza, pero no la incluye entre los utensilios." });
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

    const ingredientSectionIds = new Set<string>();
    for (const section of recipe.ingredientSections ?? []) {
      if (ingredientSectionIds.has(section.id)) {
        issues.push({ recipe: context, message: `Sección de ingredientes duplicada: ${section.id}` });
      }
      ingredientSectionIds.add(section.id);
      if (!recipe.ingredients.some((ingredient) => ingredient.sectionId === section.id)) {
        issues.push({ recipe: context, message: `La sección de ingredientes ${section.id} está vacía.` });
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
      if (group.sectionId && !ingredientSectionIds.has(group.sectionId)) {
        issues.push({ recipe: context, message: `El grupo ${group.id} referencia una sección inexistente.` });
      }
    }
    for (const ingredient of recipe.ingredients) {
      if (ingredient.quantity === undefined && ingredient.quantityRange === undefined && !ingredient.displayQuantity) {
        issues.push({ recipe: context, message: `El ingrediente ${ingredient.id} no tiene cantidad visible.` });
      }
      if (ingredient.quantity !== undefined && ingredient.quantity <= 0) {
        issues.push({ recipe: context, message: `El ingrediente ${ingredient.id} tiene una cantidad no válida.` });
      }
      if (
        ingredient.quantityRange &&
        (ingredient.quantityRange.min <= 0 ||
          ingredient.quantityRange.max <= 0 ||
          ingredient.quantityRange.min > ingredient.quantityRange.max)
      ) {
        issues.push({ recipe: context, message: `El ingrediente ${ingredient.id} tiene un rango no válido.` });
      }
      if (ingredient.groupId && !groupIds.has(ingredient.groupId)) {
        issues.push({ recipe: context, message: `El ingrediente ${ingredient.id} referencia un grupo inexistente.` });
      }
      if (ingredient.sectionId && !ingredientSectionIds.has(ingredient.sectionId)) {
        issues.push({ recipe: context, message: `El ingrediente ${ingredient.id} referencia una sección inexistente.` });
      }
    }

    if (recipe.proportionGuide) {
      const ingredientIds = new Set(recipe.ingredients.map((ingredient) => ingredient.id));
      if (recipe.proportionGuide.servings.some((servings) => servings <= 0)) {
        issues.push({ recipe: context, message: "La guía de proporciones contiene raciones no válidas." });
      }
      for (const column of recipe.proportionGuide.columns) {
        if (!ingredientIds.has(column.ingredientId)) {
          issues.push({ recipe: context, message: `La guía de proporciones referencia un ingrediente inexistente: ${column.ingredientId}` });
        }
      }
    }

    const stepSectionIds = new Set<string>();
    for (const section of recipe.stepSections ?? []) {
      if (stepSectionIds.has(section.id)) {
        issues.push({ recipe: context, message: `Sección de pasos duplicada: ${section.id}` });
      }
      stepSectionIds.add(section.id);
      if (!recipe.steps.some((step) => step.sectionId === section.id)) {
        issues.push({ recipe: context, message: `La sección de pasos ${section.id} está vacía.` });
      }
    }

    for (const item of [...recipe.ingredients, ...(recipe.ingredientGroups ?? []), ...(recipe.ingredientSections ?? []), ...recipe.steps, ...(recipe.stepSections ?? [])]) {
      if (nestedIds.has(item.id)) {
        issues.push({ recipe: context, message: `ID de ingrediente o paso duplicado: ${item.id}` });
      }
      nestedIds.add(item.id);
    }
    for (const step of recipe.steps) {
      if (step.sectionId && !stepSectionIds.has(step.sectionId)) {
        issues.push({ recipe: context, message: `El paso ${step.id} referencia una sección inexistente.` });
      }
      if (step.durationSeconds !== undefined && step.durationSeconds < 0) {
        issues.push({ recipe: context, message: `El paso ${step.id} tiene una duración negativa.` });
      }
      if (step.timerIncrementSeconds !== undefined && step.timerIncrementSeconds <= 0) {
        issues.push({ recipe: context, message: `El paso ${step.id} tiene un incremento de temporizador no válido.` });
      }
      if (step.reminderEverySeconds !== undefined && step.reminderEverySeconds <= 0) {
        issues.push({ recipe: context, message: `El paso ${step.id} tiene un recordatorio no válido.` });
      }
      if (step.completionCondition !== undefined && !step.completionCondition.trim()) {
        issues.push({ recipe: context, message: `El paso ${step.id} tiene una condición final vacía.` });
      }
      if (step.repeatable) {
        if (!step.repeatable.repeatInstruction.trim() || !step.repeatable.stopCondition.trim()) {
          issues.push({ recipe: context, message: `El paso repetible ${step.id} necesita instrucción y condición de parada.` });
        }
        if (step.repeatable.suggestedIntervalSeconds !== undefined && step.repeatable.suggestedIntervalSeconds <= 0) {
          issues.push({ recipe: context, message: `El paso repetible ${step.id} tiene un intervalo no válido.` });
        }
        if (step.repeatable.maxSuggestedRepeats !== undefined && step.repeatable.maxSuggestedRepeats <= 0) {
          issues.push({ recipe: context, message: `El paso repetible ${step.id} tiene un máximo orientativo no válido.` });
        }
      }
    }
  }

  return issues;
}
