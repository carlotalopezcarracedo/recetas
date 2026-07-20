import { Ruler, Scale, Shapes } from "lucide-react";
import type { Recipe } from "@/types/recipe";

const kindLabels: Record<NonNullable<Recipe["recipeKind"]>, string> = {
  "plato-completo": "Plato completo",
  "preparacion-base": "Preparación base",
  salsa: "Salsa",
  acompanamiento: "Acompañamiento",
  masa: "Masa",
  postre: "Postre",
  bebida: "Bebida",
};

export function RecipeBadges({ recipe, compact = false }: { recipe: Recipe; compact?: boolean }) {
  const badges = [
    recipe.recipeKind && recipe.recipeKind !== "plato-completo" ? { label: kindLabels[recipe.recipeKind], icon: Shapes } : null,
    recipe.requiresScale ? { label: "Requiere balanza", icon: Ruler } : null,
    recipe.servings?.scalable ? { label: "Escalable", icon: Scale } : null,
  ].filter((badge): badge is NonNullable<typeof badge> => badge !== null);

  if (badges.length === 0) return null;
  return (
    <ul className={`recipe-badges${compact ? " is-compact" : ""}`} aria-label="Características de la receta">
      {badges.map(({ label, icon: Icon }) => <li className="recipe-badge" key={label}><Icon aria-hidden="true" size={compact ? 13 : 15} />{label}</li>)}
    </ul>
  );
}
