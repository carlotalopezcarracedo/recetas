import { Scale } from "lucide-react";
import { getIngredientQuantityText, getScaleFactor } from "@/lib/servings";
import type { Recipe } from "@/types/recipe";

type ProportionTableProps = {
  ingredients: Recipe["ingredients"];
  baseServings: number;
  guide: NonNullable<Recipe["proportionGuide"]>;
  compact?: boolean;
};

export function ProportionTable({ ingredients, baseServings, guide, compact = false }: ProportionTableProps) {
  const columns = guide.columns.map((column) => ({
    ...column,
    ingredient: ingredients.find((ingredient) => ingredient.id === column.ingredientId),
  }));

  return (
    <section className={`proportion-guide${compact ? " is-compact" : ""}`} aria-labelledby={compact ? "cooking-proportions-title" : "proportions-title"}>
      <header>
        <Scale aria-hidden="true" size={19} />
        <div>
          <h3 id={compact ? "cooking-proportions-title" : "proportions-title"}>Proporciones exactas</h3>
          <p>Todos los valores se calculan desde la receta base.</p>
        </div>
      </header>
      <div className="proportion-table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Raciones</th>
              {columns.map((column) => <th scope="col" key={column.ingredientId}>{column.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {guide.servings.map((servings) => {
              const factor = getScaleFactor(baseServings, servings);
              return (
                <tr key={servings}>
                  <th scope="row">{servings}</th>
                  {columns.map((column) => (
                    <td key={column.ingredientId}>{column.ingredient ? getIngredientQuantityText(column.ingredient, factor) : "—"}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
