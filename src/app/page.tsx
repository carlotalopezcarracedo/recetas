import { ArrowDown, Sparkles } from "lucide-react";
import { RecipeExplorer } from "@/components/recipe-explorer";
import { SITE_CONFIG } from "@/config/site";
import { recipes } from "@/data/recipes";

export default function HomePage() {
  return (
    <main>
      <section className="hero shell">
        <div className="hero-kicker"><Sparkles aria-hidden="true" size={16} /> Recetas probadas en una cocina real</div>
        <h1>{SITE_CONFIG.name}</h1>
        <p>{SITE_CONFIG.tagline}</p>
        <a href="#explorar" className="hero-link">¿Qué cocinamos? <ArrowDown aria-hidden="true" size={18} /></a>
      </section>
      <div id="explorar" className="shell content-section">
        <RecipeExplorer recipes={recipes} />
      </div>
    </main>
  );
}
