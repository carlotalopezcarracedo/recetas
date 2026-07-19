import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { recipes } from "../src/data/recipes";
import { validateRecipes, type ValidationIssue } from "../src/lib/validate-recipes";

const issues: ValidationIssue[] = validateRecipes(recipes);

for (const recipe of recipes) {
  if (!recipe.image) continue;
  const imagePath = resolve(process.cwd(), "public", recipe.image.replace(/^\//, ""));
  if (!existsSync(imagePath)) {
    issues.push({ recipe: recipe.slug, message: `No existe la imagen: ${recipe.image}` });
  }
}

if (issues.length > 0) {
  console.error(`Se encontraron ${issues.length} problema(s):`);
  for (const issue of issues) {
    console.error(`- ${issue.recipe ? `[${issue.recipe}] ` : ""}${issue.message}`);
  }
  process.exitCode = 1;
} else {
  console.log(`✓ ${recipes.length} recetas validadas sin errores.`);
}
