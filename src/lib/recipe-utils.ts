import type { MealType, Recipe } from "@/types/recipe";

export type RecipeFilters = {
  mealTypes: MealType[];
  flavorTypes: Array<Recipe["flavorType"]>;
  tags: string[];
  favoritesOnly: boolean;
};

export const EMPTY_FILTERS: RecipeFilters = {
  mealTypes: [],
  flavorTypes: [],
  tags: [],
  favoritesOnly: false,
};

export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function searchableText(recipe: Recipe): string {
  return normalizeText(
    [
      recipe.name,
      recipe.shortDescription,
      recipe.description,
      ...recipe.mealTypes,
      recipe.flavorType,
      recipe.recipeKind,
      recipe.requiresScale ? "requiere balanza seguir en gramos precisión" : undefined,
      recipe.precisionWarning,
      ...recipe.tags,
      ...(recipe.keywords ?? []),
      ...(recipe.howToUse ?? []).flatMap((useCase) => [useCase.title, useCase.description]),
      ...(recipe.ingredientSections ?? []).flatMap((section) => [section.title, section.description]),
      ...(recipe.stepSections ?? []).flatMap((section) => [section.title, section.description]),
      ...(recipe.ingredientGroups ?? []).flatMap((group) => [group.title, group.instruction]),
      ...recipe.ingredients.flatMap((ingredient) => [
        ingredient.name,
        ingredient.quantity,
        ingredient.quantityRange?.min,
        ingredient.quantityRange?.max,
        ingredient.displayQuantity,
        ingredient.unit,
        ingredient.notes,
      ]),
      ...recipe.steps.flatMap((step) => [
        step.title,
        step.instruction,
        step.completionCondition,
        step.repeatable?.repeatInstruction,
        step.repeatable?.stopCondition,
      ]),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

export function recipeMatchesQuery(recipe: Recipe, query: string): boolean {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return true;
  const haystack = searchableText(recipe);
  return normalizedQuery.split(" ").every((term) => haystack.includes(term));
}

export function filterRecipes(
  allRecipes: Recipe[],
  query: string,
  filters: RecipeFilters,
  favoriteIds: ReadonlySet<string> = new Set(),
): Recipe[] {
  return allRecipes.filter((recipe) => {
    const matchesMeals =
      filters.mealTypes.length === 0 ||
      filters.mealTypes.every((mealType) => recipe.mealTypes.includes(mealType));
    const matchesFlavor =
      filters.flavorTypes.length === 0 ||
      filters.flavorTypes.includes(recipe.flavorType);
    const matchesTags =
      filters.tags.length === 0 ||
      filters.tags.every((tag) =>
        recipe.tags.some((recipeTag) => normalizeText(recipeTag) === normalizeText(tag)),
      );
    const matchesFavorite = !filters.favoritesOnly || favoriteIds.has(recipe.id);

    return (
      recipeMatchesQuery(recipe, query) &&
      matchesMeals &&
      matchesFlavor &&
      matchesTags &&
      matchesFavorite
    );
  });
}

export function formatDifficulty(difficulty: Recipe["difficulty"]): string {
  return {
    "muy-facil": "Muy fácil",
    facil: "Fácil",
    media: "Media",
    dificil: "Difícil",
  }[difficulty];
}

export function formatMinutes(minutes?: number): string {
  return minutes === undefined ? "—" : `${minutes} min`;
}

export function toIsoDuration(minutes?: number): string | undefined {
  return minutes === undefined ? undefined : `PT${minutes}M`;
}
