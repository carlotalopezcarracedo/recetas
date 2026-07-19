import { CookingMode } from "@/components/cooking-mode";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareButton } from "@/components/share-button";
import { WakeLockButton } from "@/components/wake-lock-button";
import type { Recipe } from "@/types/recipe";

type RecipeActionsProps = { recipe: Recipe };

export function RecipeActions({ recipe }: RecipeActionsProps) {
  return (
    <div className="recipe-actions">
      <CookingMode recipe={recipe} />
      <div className="secondary-actions">
        <FavoriteButton recipeId={recipe.id} />
        <ShareButton title={recipe.name} text={recipe.shortDescription} />
      </div>
      <WakeLockButton />
    </div>
  );
}
