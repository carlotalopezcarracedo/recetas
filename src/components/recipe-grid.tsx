import { EmptyState } from "@/components/empty-state";
import { RecipeCard } from "@/components/recipe-card";
import type { Recipe } from "@/types/recipe";

type RecipeGridProps = { recipes: Recipe[]; favoritesOnly?: boolean };

export function RecipeGrid({ recipes, favoritesOnly = false }: RecipeGridProps) {
  if (recipes.length === 0) return <EmptyState favoritesOnly={favoritesOnly} />;
  return <div className="recipe-grid">{recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}</div>;
}
