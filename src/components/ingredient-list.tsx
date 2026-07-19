import { CircleCheck, Plus } from "lucide-react";
import type { RecipeIngredient } from "@/types/recipe";

type IngredientListProps = { ingredients: RecipeIngredient[]; compact?: boolean };

export function IngredientList({ ingredients, compact = false }: IngredientListProps) {
  const required = ingredients.filter((ingredient) => !ingredient.optional);
  const optional = ingredients.filter((ingredient) => ingredient.optional);

  return (
    <div className={compact ? "ingredient-list compact" : "ingredient-list"}>
      <ul>
        {required.map((ingredient) => (
          <li key={ingredient.id}>
            <CircleCheck aria-hidden="true" size={19} />
            <span><strong>{ingredient.quantity}</strong> {ingredient.name}{ingredient.notes && <small>{ingredient.notes}</small>}</span>
          </li>
        ))}
      </ul>
      {optional.length > 0 && (
        <div className="optional-ingredients">
          <h3><Plus aria-hidden="true" size={18} /> Opcionales</h3>
          <ul>
            {optional.map((ingredient) => (
              <li key={ingredient.id}><Plus aria-hidden="true" size={18} /><span><strong>{ingredient.quantity}</strong> {ingredient.name}{ingredient.notes && <small>{ingredient.notes}</small>}</span></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
