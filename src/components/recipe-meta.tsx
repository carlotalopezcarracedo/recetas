import { ChefHat, Clock3, CookingPot, UsersRound } from "lucide-react";
import { formatDifficulty, formatMinutes } from "@/lib/recipe-utils";
import type { Recipe } from "@/types/recipe";

type RecipeMetaProps = Pick<Recipe, "prepTimeMinutes" | "cookTimeMinutes" | "totalTimeMinutes" | "difficulty" | "servings">;

export function RecipeMeta({ prepTimeMinutes, cookTimeMinutes, totalTimeMinutes, difficulty, servings }: RecipeMetaProps) {
  const items = [
    { label: "Preparación", value: formatMinutes(prepTimeMinutes), icon: Clock3 },
    { label: "Cocinado", value: formatMinutes(cookTimeMinutes), icon: CookingPot },
    { label: "Total", value: formatMinutes(totalTimeMinutes), icon: Clock3 },
    { label: "Dificultad", value: formatDifficulty(difficulty), icon: ChefHat },
    { label: "Cantidad", value: servings ? `${servings.amount} ${servings.unit}` : "—", icon: UsersRound },
  ];

  return (
    <dl className="recipe-meta">
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label}><dt><Icon aria-hidden="true" size={17} />{label}</dt><dd>{value}</dd></div>
      ))}
    </dl>
  );
}
