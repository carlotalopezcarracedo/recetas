import type { Recipe } from "@/types/recipe";

// Duplica este objeto, elimina `export` si lo pegas dentro del array de recipes.ts
// y sustituye cada valor. Los IDs y el slug deben ser únicos.
export const recipeTemplate: Recipe = {
  id: "recipe-id-unico",
  slug: "nombre-de-la-receta",
  name: "Nombre de la receta",
  shortDescription: "Una descripción breve para la tarjeta.",
  description: "Una explicación algo más amplia.",
  // image: "/images/recipes/nombre-de-la-receta.jpg",
  // imageAlt: "Descripción accesible de la fotografía",
  mealTypes: ["comida"],
  flavorType: "salado",
  tags: ["rápida"],
  keywords: [],
  prepTimeMinutes: 0,
  cookTimeMinutes: 0,
  totalTimeMinutes: 0,
  difficulty: "facil",
  servings: { amount: 1, unit: "ración" },
  tools: [],
  ingredients: [
    { id: "ingrediente-id-unico", displayQuantity: "al gusto", name: "Ingrediente", scalable: false },
  ],
  steps: [
    { id: "paso-id-unico", title: "Título del paso", instruction: "Instrucción clara." },
  ],
  notes: [],
  warnings: [],
  variations: [],
  isFeatured: false,
  version: "1.0",
  lastUpdated: "AAAA-MM-DD",
};
