import { ChefHat, CirclePlus, Clock3, Layers3, ListChecks, Repeat2, Scale, Snowflake } from "lucide-react";
import type { Recipe } from "@/types/recipe";

type RecipeHighlightsProps = Pick<
  Recipe,
  "servings" | "restTimeLabel" | "refrigerationTimeLabel" | "recommendedAppliances" | "ingredients" | "ingredientGroups" | "ingredientSections" | "steps"
>;

export function RecipeHighlights({ servings, restTimeLabel, refrigerationTimeLabel, recommendedAppliances, ingredients, ingredientGroups, ingredientSections, steps }: RecipeHighlightsProps) {
  const items = [
    servings?.scalable ? { label: "Receta escalable", value: `Base: ${servings.amount} ${servings.unit}`, icon: Scale } : null,
    restTimeLabel ? { label: "Reposo", value: restTimeLabel, icon: Clock3 } : null,
    refrigerationTimeLabel ? { label: "Refrigeración", value: refrigerationTimeLabel, icon: Snowflake } : null,
    recommendedAppliances?.length ? { label: "Aparato recomendado", value: recommendedAppliances.join(" · "), icon: ChefHat } : null,
    ingredients.some((ingredient) => ingredient.optional) ? { label: "Incluye opcionales", value: "Identificados por separado", icon: CirclePlus } : null,
    ingredientGroups?.some((group) => group.selection === "one") ? { label: "Hay alternativas", value: "Escoge una opción por grupo", icon: ListChecks } : null,
    ingredientSections?.length ? { label: "Preparación por secciones", value: ingredientSections.map((section) => section.title).join(" · "), icon: Layers3 } : null,
    steps.some((step) => step.repeatable) ? { label: "Preparación por ciclos", value: "Repite hasta alcanzar la textura indicada", icon: Repeat2 } : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) return null;
  return (
    <ul className="recipe-highlights" aria-label="Información destacada">
      {items.map(({ label, value, icon: Icon }) => (
        <li key={label}><Icon aria-hidden="true" size={18} /><span><strong>{label}</strong><small>{value}</small></span></li>
      ))}
    </ul>
  );
}
