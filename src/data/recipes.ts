import type { Recipe } from "@/types/recipe";
import { validateRecipes } from "@/lib/validate-recipes";

// Para añadir una receta, duplica la plantilla de recipe-template.ts, rellénala
// y agrégala a este array. La interfaz no necesita ningún cambio.
export const recipes: Recipe[] = [
  {
    id: "recipe-bizcocho-microondas",
    slug: "bizcocho-microondas",
    name: "Bizcocho de microondas",
    shortDescription:
      "Un bizcocho individual, rápido y personalizable que queda mejor cuando se respetan el bol, la potencia y los cuatro minutos exactos.",
    description:
      "La versión afinada del bizcocho exprés de casa: una sola ración, pocos utensilios y cuatro minutos de cocción sin negociar.",
    mealTypes: ["desayuno", "merienda", "postre"],
    flavorType: "dulce",
    tags: ["rápida", "microondas", "alta en proteína", "personalizable"],
    keywords: ["avena", "vainilla", "cacao", "chocolate", "mug cake"],
    prepTimeMinutes: 5,
    cookTimeMinutes: 4,
    totalTimeMinutes: 9,
    difficulty: "muy-facil",
    servings: { amount: 1, unit: "ración" },
    tools: [
      "Bol redondo pequeño o mediano apto para microondas",
      "Preferiblemente, un bol con paredes rectas",
      "Varilla manual metálica",
      "Cucharilla",
      "Lengua o espátula de silicona",
      "Plato que cubra completamente la abertura del bol",
      "Microondas",
    ],
    ingredients: [
      { id: "biz-huevo", displayQuantity: "1", name: "huevo" },
      { id: "biz-vainilla", displayQuantity: "1 chorro", name: "esencia de vainilla", notes: "Cantidad deliberadamente aproximada" },
      { id: "biz-sal", displayQuantity: "1 pizca", name: "sal", notes: "Cantidad deliberadamente aproximada" },
      { id: "biz-proteina", displayQuantity: "1 cucharadita pequeña", name: "proteína en polvo" },
      { id: "biz-avena", displayQuantity: "3 cucharaditas pequeñas", name: "harina de avena" },
      { id: "biz-bicarbonato", displayQuantity: "aprox. 1/4 de cucharadita pequeña", name: "bicarbonato" },
      { id: "biz-cacao", displayQuantity: "al gusto", name: "cacao puro en polvo", optional: true },
      { id: "biz-chocolate", displayQuantity: "al gusto", name: "chocolate troceado o pepitas", optional: true },
      { id: "biz-frutos-secos", displayQuantity: "al gusto", name: "frutos secos troceados", optional: true },
      { id: "biz-otros", displayQuantity: "al gusto", name: "otros añadidos compatibles", optional: true },
    ],
    steps: [
      {
        id: "biz-paso-recipiente",
        title: "Escoge el recipiente correcto",
        instruction:
          "Usa un bol redondo, no demasiado grande y apto para microondas. Lo ideal es que tenga paredes rectas para que el bizcocho suba uniformemente. En la cocina de referencia funcionan los boles blancos o el tazón negro de paredes rectas; evita los boles negros de paredes curvas.",
        warning: "La geometría del bol cambia el resultado: prioriza siempre las paredes rectas.",
      },
      {
        id: "biz-paso-primera-mezcla",
        title: "Prepara la primera mezcla",
        instruction:
          "Añade el huevo, la esencia de vainilla, la sal y la proteína en polvo. Bate muy enérgicamente con la varilla hasta obtener una mezcla completamente integrada y homogénea. Hay que batir de verdad, no darle solamente dos vueltas.",
      },
      {
        id: "biz-paso-secos",
        title: "Incorpora los ingredientes secos",
        instruction:
          "Añade las tres cucharaditas pequeñas de harina de avena y aproximadamente un cuarto de cucharadita pequeña de bicarbonato. Mezcla muy bien hasta que no queden grumos secos visibles.",
      },
      {
        id: "biz-paso-variacion",
        title: "Añade la variación elegida",
        instruction:
          "Si quieres, incorpora cacao, chocolate troceado, pepitas, frutos secos u otros añadidos compatibles. Intégralos en la masa.",
      },
      {
        id: "biz-paso-bordes",
        title: "Limpia los bordes",
        instruction:
          "Con la lengua o espátula, retira la masa salpicada o adherida en las paredes superiores del bol. Así crecerá de forma más uniforme y no quedarán restos quemados en el borde.",
      },
      {
        id: "biz-paso-tapar",
        title: "Tapa el bol",
        instruction:
          "Coloca encima un plato que cubra completamente la abertura. El bol debe entrar tapado en el microondas.",
        warning: "No lo cocines sin el plato que cubre el bol.",
      },
      {
        id: "biz-paso-cocinar",
        title: "Cocina cuatro minutos",
        instruction:
          "Selecciona la penúltima potencia del microondas, un nivel por debajo del máximo. Cocina durante cuatro minutos exactos sin abrir, detener ni modificar el tiempo.",
        durationSeconds: 240,
        warning:
          "Los cuatro minutos están ajustados al microondas habitual de la casa. En otro aparato, haz una prueba controlada y nunca uses la potencia máxima.",
      },
      {
        id: "biz-paso-sacar",
        title: "Saca con cuidado",
        instruction:
          "Retira el plato y el bol con precaución porque pueden estar calientes. Deja reposar unos instantes antes de comer.",
        warning: "El plato y el bol pueden quemar.",
      },
    ],
    warnings: [
      "No usar la potencia máxima.",
      "No cocinar más ni menos de cuatro minutos en el microondas de referencia.",
      "No interrumpir la cocción.",
      "No cocinar sin el plato que cubre el bol.",
      "El recipiente debe ser apto para microondas.",
      "El plato y el bol pueden quemar.",
      "En otro microondas puede ser necesaria una prueba controlada.",
    ],
    notes: [
      "La geometría del bol influye en el resultado.",
      "Lo ideal es un bol de paredes rectas.",
      "Esta receta está pensada para una sola persona.",
      "Las cantidades expresadas como «chorro» o «pizca» son deliberadamente aproximadas.",
      "La receta seguirá perfeccionándose; comprueba siempre su versión y fecha.",
    ],
    variations: [
      { name: "Chocolate", description: "Añade cacao puro en polvo." },
      { name: "Pepitas", description: "Añade chocolate troceado o pepitas de chocolate." },
      { name: "Frutos secos", description: "Añade frutos secos troceados." },
      { name: "Chocolate y frutos secos", description: "Combina ambos añadidos." },
    ],
    isFeatured: true,
    version: "1.0",
    lastUpdated: "2026-07-19",
  },
  {
    id: "recipe-crepes-caseras",
    slug: "crepes-caseras",
    name: "Crepes caseras",
    shortDescription:
      "Crepes finas hechas con una masa muy sencilla y una sartén bien caliente. El secreto está en engrasar toda la superficie y mover rápido la masa.",
    description:
      "Una masa rápida de shaker y una sartén bien preparada. La primera crepe hace de comité de calibración; las demás ya salen con ventaja.",
    mealTypes: ["desayuno", "merienda", "postre"],
    flavorType: "dulce",
    tags: ["sartén", "rápida", "personalizable"],
    keywords: ["claras", "vainilla", "harina", "leche", "crepe"],
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    totalTimeMinutes: 15,
    difficulty: "facil",
    servings: { amount: 1, unit: "tanda de varias crepes" },
    tools: [
      "Shaker con bola metálica o vaso para batidora",
      "Batidora (solo si no se usa el shaker)",
      "Sartén crepera",
      "Zona grande de la placa de inducción",
      "Papel de cocina",
      "Espátula amarilla o una espátula fina adecuada",
      "Cucharas",
      "Plato para las crepes terminadas",
    ],
    ingredients: [
      { id: "crepes-claras", displayQuantity: "aprox. 3 dedos de altura", name: "claras de huevo", notes: "Medidos desde la base del shaker o vaso" },
      { id: "crepes-leche", displayQuantity: "1 chorrito pequeño", name: "leche", notes: "Aproximadamente una cucharada sopera generosa" },
      { id: "crepes-sal", displayQuantity: "1 pizca", name: "sal", notes: "Cantidad aproximada" },
      { id: "crepes-vainilla", displayQuantity: "1 chorrito pequeño", name: "esencia de vainilla", notes: "Cantidad aproximada" },
      { id: "crepes-harina", displayQuantity: "2 cucharaditas pequeñas", name: "harina de trigo blanca común" },
      { id: "crepes-aceite", displayQuantity: "una pequeña cantidad", name: "aceite de oliva virgen extra", notes: "Para engrasar toda la sartén; cantidad aproximada" },
    ],
    steps: [
      {
        id: "crepes-paso-calentar",
        title: "Calienta la sartén",
        instruction:
          "Mientras preparas la masa, coloca la sartén crepera sobre la zona grande de la placa de inducción y caliéntala al nivel 7. Debe estar bien caliente antes de la primera porción.",
        warning: "El nivel 7 corresponde a la placa habitual y puede variar en otros aparatos.",
      },
      {
        id: "crepes-paso-ingredientes",
        title: "Añade los ingredientes",
        instruction:
          "En el shaker o vaso, añade claras hasta aproximadamente tres dedos de altura desde la base, un chorrito de leche (aprox. una cucharada generosa), sal, vainilla y dos cucharaditas de harina.",
      },
      {
        id: "crepes-paso-mezclar",
        title: "Mezcla con energía",
        instruction:
          "Con shaker: introduce la bola, ciérralo bien y agita enérgicamente. Con vaso: bate muy bien con la batidora. La masa debe quedar homogénea y sin grumos visibles.",
      },
      {
        id: "crepes-paso-engrasar",
        title: "Engrasa toda la sartén",
        instruction:
          "Añade un poco de aceite de oliva virgen extra y repártelo con papel de cocina por toda la superficie, incluidos los bordes.",
        warning: "Hazlo con mucho cuidado: la sartén y el aceite ya están calientes.",
      },
      {
        id: "crepes-paso-verter",
        title: "Vierte y extiende",
        instruction:
          "Sujeta la sartén por el mango, inclínala un poco hacia delante y vierte una pequeña cantidad de masa. Muévela inmediatamente en círculos para crear una capa fina y vuelve a apoyarla en la placa.",
      },
      {
        id: "crepes-paso-primera-cara",
        title: "Cocina la primera cara",
        instruction:
          "Cocina entre 10 y 20 segundos observando los bordes. Cuando empiecen a tostarse o despegarse, separa suavemente el borde con la espátula.",
        durationSeconds: 15,
      },
      {
        id: "crepes-paso-vuelta",
        title: "Dale la vuelta",
        instruction:
          "Una vez despegado el borde, gira la crepe con cuidado. Si no tienes práctica o el borde está demasiado caliente, usa una espátula suficientemente amplia.",
        warning: "No la toques con las manos si no puedes hacerlo con total seguridad.",
      },
      {
        id: "crepes-paso-segunda-cara",
        title: "Cocina la segunda cara",
        instruction: "Déjala aproximadamente 20 segundos por el otro lado y pásala a un plato.",
        durationSeconds: 20,
      },
      {
        id: "crepes-paso-repetir",
        title: "Repite",
        instruction:
          "Repite hasta terminar la masa. Vuelve a engrasar ligeramente toda la sartén cuando sea necesario.",
      },
    ],
    warnings: [
      "La sartén debe estar caliente antes de empezar.",
      "Engrasa toda la sartén, incluidos los bordes.",
      "El aceite y la sartén caliente pueden provocar quemaduras.",
      "No toques la crepe con las manos si no puedes hacerlo con seguridad.",
      "Las cantidades son aproximadas y pueden ajustarse según la textura.",
      "Si queda demasiado espesa, añade una cantidad mínima de leche.",
      "Si queda demasiado líquida y se rompe, corrígela con una pequeña cantidad de harina.",
    ],
    notes: [
      "Extiende la masa rápido: empieza a cuajar en cuanto toca la sartén.",
      "El nivel 7 corresponde a la placa habitual y puede variar en otros aparatos.",
      "La primera crepe sirve para ajustar la cantidad de masa y la temperatura.",
      "La espátula amarilla es la de la cocina de referencia; cualquier espátula fina y segura sirve.",
    ],
    variations: [
      { name: "Con cacao", description: "Añade cacao a la masa y ajusta la textura si hace falta." },
      { name: "Con canela", description: "Añade canela al gusto." },
      { name: "Con relleno de chocolate", description: "Rellena la crepe terminada con chocolate." },
      { name: "Con fruta", description: "Sírvela con fruta cortada." },
      { name: "Con crema de frutos secos", description: "Añade la crema al servir." },
    ],
    isFeatured: true,
    version: "1.0",
    lastUpdated: "2026-07-19",
  },
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}

if (process.env.NODE_ENV === "development") {
  const issues = validateRecipes(recipes);
  if (issues.length > 0) {
    throw new Error(`Inventario de recetas inválido:\n${issues.map((issue) => `- ${issue.message}`).join("\n")}`);
  }
}
