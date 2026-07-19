import { Scale, TriangleAlert } from "lucide-react";
import type { Recipe } from "@/types/recipe";

export function PrecisionNotice({ recipe, compact = false }: { recipe: Recipe; compact?: boolean }) {
  if (!recipe.requiresScale) return null;

  return (
    <aside className={`precision-notice${compact ? " is-compact" : ""}`} aria-label="Receta de precisión">
      <span className="precision-icon"><Scale aria-hidden="true" size={22} /></span>
      <div>
        <span>Seguir en gramos</span>
        <strong>Esta receta necesita balanza. Respeta los gramos para mantener la textura.</strong>
        {recipe.precisionWarning && <p><TriangleAlert aria-hidden="true" size={16} />{recipe.precisionWarning}</p>}
      </div>
    </aside>
  );
}
