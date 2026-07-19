import { CircleCheck, ListChecks, Plus } from "lucide-react";
import { getIngredientQuantityText, isIngredientScalable } from "@/lib/servings";
import type { IngredientGroup, RecipeIngredient } from "@/types/recipe";

type IngredientListProps = {
  ingredients: RecipeIngredient[];
  groups?: IngredientGroup[];
  compact?: boolean;
  scaleFactor?: number;
};

type IngredientRowProps = {
  ingredient: RecipeIngredient;
  scaleFactor: number;
  icon: "check" | "plus";
};

function IngredientRow({ ingredient, scaleFactor, icon }: IngredientRowProps) {
  const Icon = icon === "check" ? CircleCheck : Plus;
  const quantity = getIngredientQuantityText(ingredient, scaleFactor);
  const approximateScale = scaleFactor !== 1 && !isIngredientScalable(ingredient);

  return (
    <li>
      <Icon aria-hidden="true" size={19} />
      <span>
        {quantity && <strong>{quantity}</strong>} {ingredient.name}
        {ingredient.notes && <small>{ingredient.notes}</small>}
        {approximateScale && (
          <small className="scale-note">Medida no matemática: ajustar proporcionalmente.</small>
        )}
      </span>
    </li>
  );
}

export function IngredientList({ ingredients, groups = [], compact = false, scaleFactor = 1 }: IngredientListProps) {
  const ungrouped = ingredients.filter((ingredient) => !ingredient.groupId);
  const required = ungrouped.filter((ingredient) => !ingredient.optional);
  const optional = ungrouped.filter((ingredient) => ingredient.optional);

  return (
    <div className={compact ? "ingredient-list compact" : "ingredient-list"}>
      <ul>
        {required.map((ingredient) => (
          <IngredientRow key={ingredient.id} ingredient={ingredient} scaleFactor={scaleFactor} icon="check" />
        ))}
      </ul>
      {optional.length > 0 && (
        <div className="optional-ingredients">
          <h3><Plus aria-hidden="true" size={18} /> Opcionales</h3>
          <ul>
            {optional.map((ingredient) => (
              <IngredientRow key={ingredient.id} ingredient={ingredient} scaleFactor={scaleFactor} icon="plus" />
            ))}
          </ul>
        </div>
      )}
      {groups.map((group) => {
        const choices = ingredients.filter((ingredient) => ingredient.groupId === group.id);
        return (
          <section className="ingredient-choice-group" key={group.id} aria-labelledby={`group-${group.id}`}>
            <div className="choice-heading">
              <ListChecks aria-hidden="true" size={19} />
              <div>
                <h3 id={`group-${group.id}`}>{group.title}</h3>
                <p>{group.instruction}</p>
              </div>
            </div>
            <span className="choice-badge">{group.selection === "one" ? "Escoge una" : "Combina al gusto"}</span>
            <ul>
              {choices.map((ingredient) => (
                <IngredientRow key={ingredient.id} ingredient={ingredient} scaleFactor={scaleFactor} icon="plus" />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
