import { Clock3, Sparkles } from "lucide-react";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";
import { RecipeImage } from "@/components/recipe-image";
import { RecipeBadges } from "@/components/recipe-badges";
import { formatDifficulty, formatMinutes } from "@/lib/recipe-utils";
import type { Recipe } from "@/types/recipe";

type RecipeCardProps = { recipe: Recipe };

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="recipe-card">
      <RecipeImage {...recipe} />
      <div className="card-favorite"><FavoriteButton recipeId={recipe.id} compact /></div>
      <div className="recipe-card-body">
        <div className="eyebrow-row">
          <span>{recipe.mealTypes.slice(0, 2).join(" · ")}</span>
          {recipe.isFeatured && <span className="featured-label"><Sparkles aria-hidden="true" size={13} /> Destacada</span>}
        </div>
        <RecipeBadges recipe={recipe} compact />
        <h2><Link href={`/recetas/${recipe.slug}`}>{recipe.name}</Link></h2>
        <p>{recipe.shortDescription}</p>
        <div className="card-meta">
          <span><Clock3 aria-hidden="true" size={16} />{recipe.totalTimeLabel ?? recipe.cookTimeLabel ?? formatMinutes(recipe.totalTimeMinutes)}</span>
          <span>{formatDifficulty(recipe.difficulty)}</span>
        </div>
        <ul className="tag-list" aria-label="Etiquetas">
          {recipe.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
    </article>
  );
}
