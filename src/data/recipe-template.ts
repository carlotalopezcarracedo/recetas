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
  // Para activar el selector: scalable: true. El amount es la cantidad probada.
  servings: { amount: 2, unit: "personas", unitSingular: "persona", scalable: true, min: 1, max: 12 },
  tools: [],
  ingredients: [
    // Cantidad exacta: se recalcula automáticamente.
    { id: "ingrediente-exacto", quantity: 125, unit: "g", name: "Ingrediente exacto" },
    // Cantidad aproximada: nunca se convierte falsamente en un número.
    { id: "ingrediente-aproximado", displayQuantity: "un chorrito", name: "Ingrediente aproximado", scalable: false },
    // Alternativa dentro del grupo declarado abajo.
    { id: "alternativa-a", quantity: 1, unit: "unidad", unitPlural: "unidades", name: "Alternativa A", groupId: "alternativas" },
    { id: "alternativa-b", displayQuantity: "al gusto", name: "Alternativa B", scalable: false, groupId: "alternativas" },
  ],
  ingredientGroups: [
    { id: "alternativas", title: "Escoge una alternativa", instruction: "No se utilizan todas a la vez.", selection: "one" },
  ],
  steps: [
    {
      id: "paso-id-unico",
      title: "Título del paso",
      instruction: "Instrucción clara.",
      durationSeconds: 300,
      timerLabel: "5 minutos sugeridos",
      timerIncrementSeconds: 60,
      reminderEverySeconds: 120,
      timerNote: "Explica aquí qué debe comprobarse.",
    },
  ],
  notes: [],
  warnings: [],
  variations: [],
  isFeatured: false,
  version: "1.0",
  lastUpdated: "AAAA-MM-DD",
};
