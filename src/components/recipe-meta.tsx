import { ChefHat, Clock3, CookingPot, UsersRound } from "lucide-react";
import { formatDifficulty, formatMinutes } from "@/lib/recipe-utils";
import type { Recipe } from "@/types/recipe";

type RecipeMetaProps = Pick<Recipe, "prepTimeMinutes" | "prepTimeLabel" | "cookTimeMinutes" | "cookTimeLabel" | "totalTimeMinutes" | "totalTimeLabel" | "difficulty" | "servings">;

export function RecipeMeta({ prepTimeMinutes, prepTimeLabel, cookTimeMinutes, cookTimeLabel, totalTimeMinutes, totalTimeLabel, difficulty, servings }: RecipeMetaProps) {
  const items = [
    { label: "Preparación", value: prepTimeLabel ?? formatMinutes(prepTimeMinutes), icon: Clock3 },
    { label: "Cocinado", value: cookTimeLabel ?? formatMinutes(cookTimeMinutes), icon: CookingPot },
    { label: "Total", value: totalTimeLabel ?? formatMinutes(totalTimeMinutes), icon: Clock3 },
    { label: "Dificultad", value: formatDifficulty(difficulty), icon: ChefHat },
    { label: "Cantidad base", value: servings ? `${servings.amount} ${servings.amount === 1 ? (servings.unitSingular ?? servings.unit) : servings.unit}` : "—", icon: UsersRound },
  ];

  return (
    <dl className="recipe-meta">
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label}><dt><Icon aria-hidden="true" size={17} />{label}</dt><dd>{value}</dd></div>
      ))}
    </dl>
  );
}
