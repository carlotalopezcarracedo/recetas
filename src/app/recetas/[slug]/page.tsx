import type { Metadata } from "next";
import { AlertTriangle, ArrowLeft, NotebookPen, Utensils } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IngredientList } from "@/components/ingredient-list";
import { RecipeActions } from "@/components/recipe-actions";
import { RecipeBadges } from "@/components/recipe-badges";
import { RecipeExperienceProvider } from "@/components/recipe-experience";
import { RecipeImage } from "@/components/recipe-image";
import { RecipeHighlights } from "@/components/recipe-highlights";
import { RecipeMeta } from "@/components/recipe-meta";
import { RecipeSteps } from "@/components/recipe-steps";
import { ServingAdjuster } from "@/components/serving-adjuster";
import { PrecisionNotice } from "@/components/precision-notice";
import { VersionBadge } from "@/components/version-badge";
import { SITE_CONFIG, SITE_URL } from "@/config/site";
import { getRecipeBySlug, recipes } from "@/data/recipes";
import { toIsoDuration } from "@/lib/recipe-utils";
import { getIngredientQuantityText } from "@/lib/servings";

export const dynamicParams = false;

type RecipePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return { title: "Receta no encontrada" };
  const path = `${SITE_URL}/recetas/${recipe.slug}`;
  return {
    title: recipe.name,
    description: recipe.shortDescription,
    alternates: { canonical: path },
    openGraph: { type: "article", locale: "es_ES", url: path, title: recipe.name, description: recipe.shortDescription, siteName: SITE_CONFIG.name },
    twitter: { card: "summary", title: recipe.name, description: recipe.shortDescription },
  };
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.name,
    description: recipe.shortDescription,
    url: `${SITE_URL}/recetas/${recipe.slug}`,
    dateModified: recipe.lastUpdated,
    recipeCategory: recipe.mealTypes,
    recipeYield: recipe.servings ? `${recipe.servings.amount} ${recipe.servings.unit}` : undefined,
    prepTime: toIsoDuration(recipe.prepTimeMinutes),
    cookTime: toIsoDuration(recipe.cookTimeMinutes),
    totalTime: toIsoDuration(recipe.totalTimeMinutes),
    recipeIngredient: recipe.ingredients.map((ingredient) =>
      `${getIngredientQuantityText(ingredient)} ${ingredient.name}${ingredient.optional || ingredient.groupId ? " (opcional o alternativa)" : ""}`.trim(),
    ),
    recipeInstructions: recipe.steps.map((step) => ({ "@type": "HowToStep", name: step.title, text: step.instruction })),
    keywords: recipe.tags.join(", "),
    image: recipe.image ? `${SITE_URL}${recipe.image}` : undefined,
  };

  return (
    <main className="shell recipe-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <Link href="/" className="back-link"><ArrowLeft aria-hidden="true" size={18} /> Volver a las recetas</Link>
      <RecipeExperienceProvider recipe={recipe}>
      <article>
        <div className="recipe-hero-grid">
          <RecipeImage {...recipe} priority />
          <div className="recipe-heading">
            <div className="eyebrow-row"><span>{recipe.mealTypes.join(" · ")}</span><VersionBadge version={recipe.version} /></div>
            <RecipeBadges recipe={recipe} />
            <h1>{recipe.name}</h1>
            <p>{recipe.description ?? recipe.shortDescription}</p>
            <ul className="tag-list" aria-label="Etiquetas">{recipe.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            <RecipeActions recipe={recipe} />
          </div>
        </div>
        <PrecisionNotice recipe={recipe} />
        <RecipeMeta {...recipe} />
        <RecipeHighlights {...recipe} />
        <div className="recipe-body-grid">
          <aside className="recipe-sidebar">
            <section className="content-card"><h2><Utensils aria-hidden="true" size={21} /> Utensilios</h2><ul className="plain-list">{recipe.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></section>
            <section className="content-card ingredient-card">
              <h2>Ingredientes</h2>
              {recipe.servings?.scalable ? (
                <ServingAdjuster ingredients={recipe.ingredients} groups={recipe.ingredientGroups} sections={recipe.ingredientSections} servings={recipe.servings} proportionGuide={recipe.proportionGuide} servingScaleNote={recipe.servingScaleNote} />
              ) : (
                <IngredientList ingredients={recipe.ingredients} groups={recipe.ingredientGroups} sections={recipe.ingredientSections} />
              )}
            </section>
          </aside>
          <div className="recipe-main-column">
            <section className="recipe-section"><div className="section-heading"><span>Sin prisa, pero sin perderse</span><h2>Pasos</h2></div><RecipeSteps steps={recipe.steps} sections={recipe.stepSections} recipeName={recipe.name} /></section>
            {recipe.warnings && recipe.warnings.length > 0 && <section className="warning-card"><h2><AlertTriangle aria-hidden="true" size={22} /> Advertencias importantes</h2><ul>{recipe.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul></section>}
            {recipe.notes && recipe.notes.length > 0 && <section className="content-card"><h2><NotebookPen aria-hidden="true" size={21} /> Notas</h2><ul className="plain-list">{recipe.notes.map((note) => <li key={note}>{note}</li>)}</ul></section>}
            {recipe.howToUse && recipe.howToUse.length > 0 && <section className="recipe-section how-to-use"><div className="section-heading"><span>Una base, varios platos</span><h2>Cómo utilizarla</h2></div><div className="use-cases-grid">{recipe.howToUse.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>}
            {recipe.variations && recipe.variations.length > 0 && <section className="recipe-section"><div className="section-heading"><span>Por si hoy apetece otra cosa</span><h2>Variaciones</h2></div><div className="variations-grid">{recipe.variations.map((variation) => <article key={variation.name}><h3>{variation.name}</h3><p>{variation.description}</p></article>)}</div></section>}
          </div>
        </div>
        <footer className="recipe-version"><VersionBadge version={recipe.version} /><p>Última actualización: <time dateTime={recipe.lastUpdated}>{formatDate(recipe.lastUpdated)}</time></p></footer>
      </article>
      </RecipeExperienceProvider>
    </main>
  );
}
