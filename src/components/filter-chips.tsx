import { ChevronDown, RotateCcw } from "lucide-react";
import { MEAL_TYPES, type FlavorType, type MealType } from "@/types/recipe";

type FilterChipsProps = {
  selectedMeals: MealType[];
  selectedFlavors: FlavorType[];
  selectedTags: string[];
  onMealToggle: (value: MealType) => void;
  onFlavorToggle: (value: FlavorType) => void;
  onTagToggle: (value: string) => void;
  onReset: () => void;
  hasFilters: boolean;
};

const primaryTagFilters = ["microondas", "horno", "alta en proteína"];
const extraTagFilters = ["con fruta", "con verduras", "con salsa", "por ciclos", "con acompañamiento", "sartén", "rápida", "vegetariana"];

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function FilterChips({ selectedMeals, selectedFlavors, selectedTags, onMealToggle, onFlavorToggle, onTagToggle, onReset, hasFilters }: FilterChipsProps) {
  return (
    <div className="filters" aria-label="Filtros de recetas">
      <div className="filter-row">
        <span className="filter-label">Momento</span>
        <div className="chip-scroll">
          {MEAL_TYPES.map((meal) => <button key={meal} type="button" className="chip" aria-pressed={selectedMeals.includes(meal)} onClick={() => onMealToggle(meal)}>{titleCase(meal)}</button>)}
        </div>
      </div>
      <div className="filter-row">
        <span className="filter-label">Tipo</span>
        <div className="chip-scroll">
          {(["dulce", "salado"] as const).map((flavor) => <button key={flavor} type="button" className="chip" aria-pressed={selectedFlavors.includes(flavor)} onClick={() => onFlavorToggle(flavor)}>{titleCase(flavor)}</button>)}
        </div>
      </div>
      <div className="filter-row">
        <span className="filter-label">También</span>
        <div className="chip-scroll">
          {primaryTagFilters.map((tag) => <button key={tag} type="button" className="chip" aria-pressed={selectedTags.includes(tag)} onClick={() => onTagToggle(tag)}>{titleCase(tag)}</button>)}
        </div>
      </div>
      <details className="more-filters">
        <summary>Más filtros <ChevronDown aria-hidden="true" size={17} /></summary>
        <div className="extra-filter-content chip-scroll">
          {extraTagFilters.map((tag) => <button key={tag} type="button" className="chip" aria-pressed={selectedTags.includes(tag)} onClick={() => onTagToggle(tag)}>{titleCase(tag)}</button>)}
        </div>
      </details>
      {hasFilters && <button type="button" className="reset-button" onClick={onReset}><RotateCcw aria-hidden="true" size={16} /> Restablecer filtros</button>}
    </div>
  );
}
