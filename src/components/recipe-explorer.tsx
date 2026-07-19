"use client";

import { useMemo, useState } from "react";
import { FilterChips } from "@/components/filter-chips";
import { RecipeGrid } from "@/components/recipe-grid";
import { SearchBar } from "@/components/search-bar";
import { useFavorites } from "@/hooks/use-favorites";
import { EMPTY_FILTERS, filterRecipes, type RecipeFilters } from "@/lib/recipe-utils";
import type { FlavorType, MealType, Recipe } from "@/types/recipe";

type RecipeExplorerProps = { recipes: Recipe[]; favoritesOnly?: boolean };

function toggleValue<T>(values: T[], value: T): T[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function RecipeExplorer({ recipes, favoritesOnly = false }: RecipeExplorerProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<RecipeFilters>({ ...EMPTY_FILTERS, favoritesOnly });
  const { favorites } = useFavorites();
  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);
  const filteredRecipes = useMemo(
    () => filterRecipes(recipes, query, filters, favoriteSet),
    [recipes, query, filters, favoriteSet],
  );
  const hasFilters = query.length > 0 || filters.mealTypes.length > 0 || filters.flavorTypes.length > 0 || filters.tags.length > 0;

  function updateList<K extends "mealTypes" | "flavorTypes" | "tags">(key: K, value: RecipeFilters[K][number]) {
    setFilters((current) => ({ ...current, [key]: toggleValue(current[key], value) }));
  }

  return (
    <section className="explorer" aria-labelledby="recipe-results-title">
      <SearchBar value={query} onChange={setQuery} />
      <FilterChips
        selectedMeals={filters.mealTypes}
        selectedFlavors={filters.flavorTypes}
        selectedTags={filters.tags}
        onMealToggle={(value: MealType) => updateList("mealTypes", value)}
        onFlavorToggle={(value: FlavorType) => updateList("flavorTypes", value)}
        onTagToggle={(value: string) => updateList("tags", value)}
        onReset={() => { setQuery(""); setFilters({ ...EMPTY_FILTERS, favoritesOnly }); }}
        hasFilters={hasFilters}
      />
      <div className="results-heading">
        <h2 id="recipe-results-title">{favoritesOnly ? "Tus favoritas" : "Recetas"}</h2>
        <p aria-live="polite">{filteredRecipes.length} {filteredRecipes.length === 1 ? "receta encontrada" : "recetas encontradas"}</p>
      </div>
      <RecipeGrid recipes={filteredRecipes} favoritesOnly={favoritesOnly && favorites.length === 0 && !hasFilters} />
    </section>
  );
}
