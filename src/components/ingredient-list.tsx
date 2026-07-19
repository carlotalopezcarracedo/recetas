import { CircleCheck, ListChecks, Plus } from "lucide-react";
import { getIngredientQuantityText, isIngredientScalable } from "@/lib/servings";
import type { IngredientGroup, IngredientSection, RecipeIngredient } from "@/types/recipe";

type IngredientListProps = {
  ingredients: RecipeIngredient[];
  groups?: IngredientGroup[];
  sections?: IngredientSection[];
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

type IngredientCollectionProps = {
  ingredients: RecipeIngredient[];
  groups: IngredientGroup[];
  scaleFactor: number;
  nested?: boolean;
};

function IngredientCollection({ ingredients, groups, scaleFactor, nested = false }: IngredientCollectionProps) {
  const ungrouped = ingredients.filter((ingredient) => !ingredient.groupId);
  const required = ungrouped.filter((ingredient) => !ingredient.optional);
  const optional = ungrouped.filter((ingredient) => ingredient.optional);
  const Subheading = nested ? "h4" : "h3";

  return (
    <>
      {required.length > 0 && (
        <ul>
          {required.map((ingredient) => (
            <IngredientRow key={ingredient.id} ingredient={ingredient} scaleFactor={scaleFactor} icon="check" />
          ))}
        </ul>
      )}
      {optional.length > 0 && (
        <div className="optional-ingredients">
          <Subheading><Plus aria-hidden="true" size={18} /> Opcionales</Subheading>
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
                <Subheading id={`group-${group.id}`}>{group.title}</Subheading>
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
    </>
  );
}

export function IngredientList({ ingredients, groups = [], sections = [], compact = false, scaleFactor = 1 }: IngredientListProps) {
  const unsectionedIngredients = ingredients.filter((ingredient) => !ingredient.sectionId);
  const unsectionedGroups = groups.filter((group) => !group.sectionId);

  return (
    <div className={compact ? "ingredient-list compact" : "ingredient-list"}>
      {(unsectionedIngredients.length > 0 || unsectionedGroups.length > 0) && (
        <IngredientCollection ingredients={unsectionedIngredients} groups={unsectionedGroups} scaleFactor={scaleFactor} />
      )}
      {sections.map((section) => {
        const sectionIngredients = ingredients.filter((ingredient) => ingredient.sectionId === section.id);
        const sectionGroups = groups.filter((group) => group.sectionId === section.id);
        return (
          <section className="ingredient-section" key={section.id} aria-labelledby={`ingredient-section-${section.id}`}>
            <header>
              <h3 id={`ingredient-section-${section.id}`}>{section.title}</h3>
              {section.description && <p>{section.description}</p>}
            </header>
            <IngredientCollection ingredients={sectionIngredients} groups={sectionGroups} scaleFactor={scaleFactor} nested />
          </section>
        );
      })}
    </div>
  );
}
