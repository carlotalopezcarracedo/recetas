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
  {
    id: "recipe-tarta-queso-pequena",
    slug: "tarta-queso-pequena",
    name: "Tarta de queso pequeña",
    shortDescription:
      "Una tarta de queso pequeña y cremosa para una o dos personas, preparada en air fryer u horno y mucho mejor después de pasar la noche en la nevera.",
    description:
      "Una tarta compacta y cremosa, probada para dos personas. Cabe holgadamente en la air fryer en su versión base; si aumenta el volumen, el horno y un molde mayor suelen ser la opción sensata.",
    mealTypes: ["merienda", "postre"],
    flavorType: "dulce",
    tags: ["air fryer", "horno", "alta en proteína", "escalable", "preparar con antelación"],
    keywords: ["queso", "maicena", "maíz", "Camembert", "mozzarella", "feta", "nevera", "postre"],
    prepTimeMinutes: 10,
    prepTimeLabel: "aprox. 10 min",
    cookTimeMinutes: 20,
    cookTimeLabel: "17–20 min",
    difficulty: "facil",
    servings: { amount: 2, unit: "personas", unitSingular: "persona", scalable: true, min: 1, max: 8 },
    restTimeLabel: "15–20 min",
    refrigerationTimeLabel: "idealmente toda la noche",
    recommendedAppliances: ["Air fryer para 2", "Horno para más volumen"],
    tools: [
      "Bol para preparar la mezcla",
      "Varillas manuales metálicas",
      "Cucharilla de postre",
      "Bol o molde pequeño de cerámica o metal apto para horno o air fryer",
      "Preferiblemente, uno de los boles blancos de la cocina de referencia",
      "Papel de horno",
      "Papel de aluminio o tapa apta para cocción",
      "Air fryer u horno",
      "Rejilla o encimera resistente al calor",
      "Nevera",
    ],
    ingredientGroups: [
      {
        id: "queso-adicional",
        title: "Queso adicional opcional: escoge uno o no añadas ninguno.",
        instruction:
          "Usa muy poca cantidad. Desmenuza o trocea el queso extremadamente bien e intégralo por completo; no deben quedar trozos grandes.",
        selection: "one",
        optional: true,
      },
    ],
    ingredients: [
      { id: "tarta-queso-fresco", quantity: 125, unit: "g", name: "queso fresco batido" },
      {
        id: "tarta-huevo",
        quantity: 1,
        unit: "huevo",
        unitPlural: "huevos",
        name: "batido cuando se use una fracción",
        notes: "Al reducir la receta, bate primero el huevo y utiliza la proporción necesaria.",
      },
      {
        id: "tarta-vainilla",
        displayQuantity: "un chorrito pequeño",
        name: "esencia de vainilla",
        notes: "Ajustar proporcionalmente sin excederse.",
        scalable: false,
      },
      { id: "tarta-sal", displayQuantity: "una pizca", name: "sal", scalable: false },
      {
        id: "tarta-maicena",
        quantity: 1,
        unit: "cucharadita de postre",
        unitPlural: "cucharaditas de postre",
        name: "maicena o harina fina de maíz cruda",
        notes: "Ligeramente colmada. No usar harina de maíz precocida para arepas.",
      },
      {
        id: "tarta-queso-mozzarella",
        displayQuantity: "una cantidad muy pequeña (aprox. 1 cucharadita de postre)",
        name: "mozzarella",
        notes: "Ajustar de forma aproximada; desmenuzar extremadamente bien.",
        optional: true,
        scalable: false,
        groupId: "queso-adicional",
      },
      {
        id: "tarta-queso-camembert",
        displayQuantity: "una cantidad muy pequeña (aprox. 1 cucharadita de postre)",
        name: "Camembert",
        notes: "Ajustar de forma aproximada; trocear extremadamente bien.",
        optional: true,
        scalable: false,
        groupId: "queso-adicional",
      },
      {
        id: "tarta-queso-feta",
        displayQuantity: "una cantidad muy pequeña (aprox. 1 cucharadita de postre)",
        name: "queso feta",
        notes: "Ajustar de forma aproximada; desmenuzar extremadamente bien.",
        optional: true,
        scalable: false,
        groupId: "queso-adicional",
      },
      {
        id: "tarta-queso-otro",
        displayQuantity: "una cantidad muy pequeña",
        name: "otro queso compatible",
        notes: "Ajustar de forma aproximada e integrar completamente.",
        optional: true,
        scalable: false,
        groupId: "queso-adicional",
      },
    ],
    steps: [
      {
        id: "tarta-paso-precalentar",
        title: "Precalienta",
        instruction:
          "Precalienta la air fryer o el horno a 160 °C, con calor arriba y abajo y ventilador. Si el aparato no permite elegir los modos por separado, usa una configuración equivalente con circulación de aire. Para dos personas sirve la air fryer; con más cantidad puede hacer falta el horno.",
      },
      {
        id: "tarta-paso-quesos",
        title: "Integra los quesos",
        instruction:
          "Pon el queso fresco batido en un bol. Si añades un queso adicional, usa muy poco, desmenúzalo o trocéalo extremadamente fino y bátelo con las varillas hasta integrarlo. La mezcla debe quedar homogénea y sin trozos grandes.",
      },
      {
        id: "tarta-paso-vainilla-sal",
        title: "Añade vainilla y sal",
        instruction: "Añade un chorrito pequeño de esencia de vainilla y una pizca de sal. Bate muy bien con las varillas.",
      },
      {
        id: "tarta-paso-huevo",
        title: "Incorpora el huevo",
        instruction:
          "Añade el huevo y bate enérgicamente hasta integrarlo por completo. No deben distinguirse partes de clara o yema. Para fracciones, bate el huevo aparte y usa la proporción indicada.",
      },
      {
        id: "tarta-paso-maicena",
        title: "Incorpora la maicena",
        instruction:
          "Añade la maicena o harina fina de maíz cruda. La cucharadita puede sobresalir ligeramente; no tiene que ser rasa. Bate hasta eliminar todos los grumos.",
        warning: "No uses harina de maíz precocida para arepas. Debe ser maicena o harina fina de maíz para espesar.",
      },
      {
        id: "tarta-paso-papel",
        title: "Prepara el papel de horno",
        instruction:
          "Corta papel suficiente para cubrir el recipiente, mójalo ligeramente bajo el grifo, arrúgalo formando una bola y escúrrelo muy bien. Vuelve a abrirlo. Así queda flexible y se adapta mejor al molde.",
      },
      {
        id: "tarta-paso-forrar",
        title: "Forra el recipiente",
        instruction:
          "Forra el interior del bol o molde con el papel húmedo y bien escurrido, ajustándolo al fondo y las paredes. El recipiente debe ser apto para horno o air fryer.",
      },
      {
        id: "tarta-paso-verter",
        title: "Vierte la mezcla",
        instruction:
          "Vierte la mezcla y da dos o tres golpes suaves con la base del recipiente contra la encimera para expulsar burbujas grandes y mejorar la textura. No golpees con fuerza ni arriesgues el recipiente.",
      },
      {
        id: "tarta-paso-coccion-tapada",
        title: "Primera cocción tapada",
        instruction:
          "Tapa con aluminio o una tapa apta e introduce el recipiente en el aparato precalentado a 160 °C. Cocina tapado durante los primeros siete minutos.",
        durationSeconds: 420,
        timerLabel: "7 minutos tapada",
        warning: "Retira después la cubierta con cuidado: puede acumular vapor muy caliente.",
      },
      {
        id: "tarta-paso-coccion-destapada",
        title: "Termina la cocción destapada",
        instruction:
          "Retira la cubierta con cuidado y continúa destapada entre 10 y 13 minutos. Empieza con diez minutos y amplía en intervalos cortos si hace falta. Los bordes deben estar cuajados y el centro ligeramente móvil, pero no líquido. No pinches ni abras el aparato cada minuto.",
        durationSeconds: 600,
        timerLabel: "10 minutos destapada",
        timerIncrementSeconds: 60,
        timerNote: "Después, añade intervalos cortos y comprueba por textura; no multipliques el tiempo por las raciones.",
      },
      {
        id: "tarta-paso-reposar",
        title: "Reposa a temperatura ambiente",
        instruction:
          "Saca el recipiente con protección y déjalo sobre una superficie resistente al calor entre 15 y 20 minutos para que empiece a enfriarse y asentarse.",
        durationSeconds: 900,
        timerLabel: "Reposo mínimo de 15 minutos",
        timerIncrementSeconds: 300,
        timerNote: "Puedes añadir cinco minutos para completar los 20 minutos orientativos.",
      },
      {
        id: "tarta-paso-refrigerar",
        title: "Refrigera",
        instruction:
          "Cuando el recipiente siga templado pero ya no queme intensamente, mételo en la nevera. Refrigera el mayor número de horas posible; el resultado ideal se consigue dejándolo toda la noche. No introduzcas un recipiente abrasador.",
      },
      {
        id: "tarta-paso-servir",
        title: "Sirve fría",
        instruction: "Saca la tarta de la nevera, retírala ayudándote del papel de horno, separa el papel con cuidado y sirve fría.",
      },
    ],
    warnings: [
      "Utiliza recipientes aptos para la temperatura y el aparato elegidos.",
      "El bol, el aluminio y el interior del aparato pueden provocar quemaduras.",
      "Retira la cubierta con cuidado por el vapor acumulado.",
      "No utilices harina precocida para arepas.",
      "No añadas demasiado queso adicional y desmenúzalo muy bien.",
      "Escurre completamente el papel de horno después de mojarlo.",
      "Los tiempos varían según el aparato, el diámetro del recipiente y el volumen de mezcla.",
      "Duplicar ingredientes no significa duplicar automáticamente el tiempo.",
      "Una receta de cuatro raciones puede no caber correctamente en la air fryer.",
      "No guardes en la nevera el recipiente cuando esté peligrosamente caliente.",
    ],
    notes: [
      "La textura mejora después de varias horas de refrigeración; lo ideal es toda la noche.",
      "El queso adicional modifica el sabor, pero no sustituye el queso fresco batido.",
      "La maicena ayuda a cuajar y a conseguir la textura adecuada.",
      "Los golpes suaves contra la encimera extraen burbujas.",
      "La tarta sigue asentándose mientras se enfría.",
      "Para una persona divide aproximadamente los ingredientes entre dos; para cuatro, duplícalos.",
      "Con cuatro raciones probablemente necesitarás horno y un recipiente mayor.",
    ],
    variations: [
      { name: "Suave", description: "Solo queso fresco batido, sin queso adicional." },
      { name: "Con mozzarella", description: "Añade una cantidad muy pequeña, extremadamente desmenuzada." },
      { name: "Con Camembert", description: "Añade una cantidad muy pequeña, muy bien troceada e integrada." },
      { name: "Con feta", description: "Añade una cantidad muy pequeña de feta bien desmenuzado." },
    ],
    isFeatured: true,
    version: "1.0",
    lastUpdated: "2026-07-19",
  },
  {
    id: "recipe-tortilla-patata-soja-texturizada",
    slug: "tortilla-patata-soja-texturizada",
    name: "Tortilla de patata con soja texturizada",
    shortDescription:
      "Una tortilla individual de patata, soja texturizada y verdura, cocinada primero en air fryer y terminada lentamente en sartén para que quede compacta y esponjosa.",
    description:
      "Una tortilla individual con patata dorada en air fryer, soja fina y una verdura a elegir. El reposo tapado y una sartén pequeña le dan estructura sin convertirla en una suela.",
    mealTypes: ["comida", "cena"],
    flavorType: "salado",
    tags: ["air fryer", "sartén", "alta en proteína", "con verduras", "cena", "personalizable"],
    keywords: ["tortilla", "patata", "soja", "brócoli", "espinaca", "calabacín", "verdura"],
    prepTimeMinutes: 15,
    prepTimeLabel: "aprox. 15 min",
    cookTimeMinutes: 45,
    cookTimeLabel: "35–45 min",
    difficulty: "media",
    servings: { amount: 1, unit: "personas", unitSingular: "persona", scalable: true, min: 1, max: 12 },
    restTimeLabel: "3 min tapada + 1–2 min al servir",
    recommendedAppliances: ["Air fryer", "Sartén pequeña con tapa"],
    tools: [
      "Air fryer",
      "Cuchillo, pelador y tabla de cortar",
      "Bol pequeño apto para microondas",
      "Film apto para microondas o cubierta adecuada con ventilación",
      "Bol grande para la mezcla",
      "Cuchara sopera y cucharilla de postre",
      "Sartén negra pequeña de la cocina de referencia o sartén pequeña antiadherente con tapa",
      "Papel de cocina",
      "Tapa que ajuste a la sartén",
      "Plato llano suficientemente grande para dar la vuelta",
      "Microondas",
      "Espátula, si fuese necesaria",
    ],
    ingredientGroups: [
      {
        id: "verdura",
        title: "Escoge una verdura.",
        instruction:
          "Usa una sola de estas opciones. Otras verduras compatibles también sirven si ajustas su tratamiento y humedad.",
        selection: "one",
      },
      {
        id: "hierba-alternativa",
        title: "Hierba alternativa (solo si no hay orégano)",
        instruction: "Escoge perejil o cilantro; el orégano sigue siendo la opción recomendada.",
        selection: "one",
        optional: true,
      },
    ],
    ingredients: [
      { id: "tortilla-patata", quantity: 1, unit: "unidad mediana", unitPlural: "unidades medianas", name: "patata", notes: "Pelada y cortada en rodajas o cubos pequeños." },
      { id: "tortilla-soja", quantity: 1, unit: "cucharada sopera grande", unitPlural: "cucharadas soperas grandes", name: "soja texturizada fina, triturada o en polvo" },
      { id: "tortilla-huevo", quantity: 1, unit: "huevo", unitPlural: "huevos", name: "entero" },
      { id: "tortilla-claras", displayQuantity: "un chorrito", name: "claras de huevo", optional: true, scalable: false, notes: "Solo cuando haya disponibles; ajustar proporcionalmente." },
      { id: "tortilla-leche", displayQuantity: "la necesaria para corregir la textura", name: "leche", scalable: false },
      { id: "tortilla-agua", displayQuantity: "la necesaria para corregir la textura", name: "agua", scalable: false },
      { id: "tortilla-aceite", displayQuantity: "una pequeña cantidad para engrasar", name: "aceite de oliva virgen extra", scalable: false },
      { id: "tortilla-sal", displayQuantity: "al gusto", name: "sal", scalable: false },
      { id: "tortilla-curcuma", displayQuantity: "una pequeña cantidad", name: "cúrcuma", scalable: false },
      { id: "tortilla-oregano", displayQuantity: "una pequeña cantidad", name: "orégano", notes: "Hierba recomendada.", scalable: false },
      {
        id: "tortilla-bicarbonato",
        quantity: 0.25,
        unit: "cucharadita de postre",
        unitPlural: "cucharaditas de postre",
        name: "bicarbonato de sodio",
        optional: true,
        notes: "Ayuda a que aumente ligeramente de volumen; no excederse.",
      },
      { id: "tortilla-brocoli", quantity: 4, unit: "ramillete", unitPlural: "ramilletes", name: "brócoli", notes: "Puede ser congelado.", groupId: "verdura" },
      { id: "tortilla-espinaca", displayQuantity: "aprox. 4 cubos", name: "espinaca congelada", notes: "El tamaño de los cubos puede variar; ajustar proporcionalmente.", scalable: false, groupId: "verdura" },
      { id: "tortilla-calabacin", quantity: 0.5, unit: "unidad mediana", unitPlural: "unidades medianas", name: "calabacín", notes: "Cortado muy fino y cocinado previamente si hace falta.", groupId: "verdura" },
      { id: "tortilla-otra-verdura", displayQuantity: "una cantidad adecuada", name: "otra verdura compatible", scalable: false, notes: "Ajustar el tratamiento y la humedad.", groupId: "verdura" },
      { id: "tortilla-perejil", displayQuantity: "una pequeña cantidad", name: "perejil", optional: true, scalable: false, groupId: "hierba-alternativa" },
      { id: "tortilla-cilantro", displayQuantity: "una pequeña cantidad", name: "cilantro", optional: true, scalable: false, groupId: "hierba-alternativa" },
    ],
    steps: [
      {
        id: "tortilla-paso-precalentar",
        title: "Precalienta la air fryer",
        instruction: "Precalienta la air fryer a 200 °C durante aproximadamente tres minutos.",
        durationSeconds: 180,
        timerLabel: "3 minutos de precalentamiento",
      },
      {
        id: "tortilla-paso-patata",
        title: "Prepara la patata",
        instruction:
          "Pela la patata y córtala en rodajas o cubos pequeños y uniformes. Todavía no añadas sal, aceite ni condimentos.",
      },
      {
        id: "tortilla-paso-cocinar-patata",
        title: "Cocina la patata",
        instruction:
          "Cocina la patata en la air fryer a 200 °C durante unos 20 minutos. Abre, agita o remueve cada cinco minutos para redistribuirla. Debe quedar cocinada y ligeramente dorada, no seca ni quemada.",
        durationSeconds: 1200,
        timerLabel: "20 minutos de patata",
        reminderEverySeconds: 300,
        timerNote: "Remueve aproximadamente cada 5 minutos.",
      },
      {
        id: "tortilla-paso-verdura",
        title: "Prepara la verdura elegida",
        instruction:
          "Para brócoli o espinaca congelados: usa un bol apto, film específico o tapa con un pequeño orificio y cocina unos ocho minutos a máxima potencia. Para calabacín u otra verdura fresca: córtala fina y cocínala previamente si hace falta para evitar que quede cruda o suelte demasiada agua. No apliques ocho minutos automáticamente a cualquier verdura.",
        durationSeconds: 480,
        timerLabel: "8 minutos de verdura congelada",
        timerNote: "Solo para brócoli o espinaca congelados; adapta el tiempo al microondas y al tamaño.",
        warning: "No cierres herméticamente. Usa solo film apto para microondas y destapa alejando el vapor de la cara y las manos.",
      },
      {
        id: "tortilla-paso-soja",
        title: "Prepara la base de soja",
        instruction:
          "Mezcla en un bol grande la soja texturizada fina, cúrcuma, sal y preferiblemente orégano. Si no hay orégano, escoge perejil o cilantro.",
      },
      {
        id: "tortilla-paso-huevo",
        title: "Añade el huevo",
        instruction: "Añade el huevo entero y mezcla muy bien con la soja y los condimentos. Si hay claras disponibles, incorpora además un chorrito.",
      },
      {
        id: "tortilla-paso-textura",
        title: "Corrige la textura",
        instruction:
          "Añade leche y agua poco a poco, en proporciones aproximadamente similares, removiendo entre cada adición. Busca una mezcla semilíquida: húmeda para unir, pero ni aguada como sopa ni seca y compacta.",
      },
      {
        id: "tortilla-paso-picar-verdura",
        title: "Pica la verdura",
        instruction:
          "Saca la verdura con cuidado, abre el recipiente alejando el vapor y pícala extremadamente fina. Si contiene mucha agua, escurre ligeramente el exceso. Añádela al bol y mezcla.",
      },
      {
        id: "tortilla-paso-incorporar-patata",
        title: "Incorpora la patata",
        instruction:
          "Añade la patata al bol y presiona suavemente algunos trozos con la cuchara, sin convertirla toda en puré. Deben quedar trozos pequeños reconocibles. Mezcla de manera homogénea.",
      },
      {
        id: "tortilla-paso-bicarbonato",
        title: "Añade bicarbonato opcional",
        instruction:
          "Si quieres una textura más esponjosa, añade ¼ de cucharadita de postre de bicarbonato al final y mezcla muy bien. Ayuda a aumentar ligeramente el volumen.",
        warning: "No excedas la cantidad: demasiado bicarbonato puede alterar el sabor.",
      },
      {
        id: "tortilla-paso-calentar-sarten",
        title: "Calienta y engrasa la sartén",
        instruction:
          "Calienta al nivel 7 una sartén negra pequeña o una sartén antiadherente pequeña con tapa. Añade un poco de aceite y repártelo con papel por el centro, bordes y parte baja de las paredes.",
        warning: "Acerca el papel con cuidado: la sartén está caliente.",
      },
      {
        id: "tortilla-paso-verter",
        title: "Baja el fuego y vierte",
        instruction: "Cuando la sartén esté caliente, baja al nivel 5, vierte la mezcla, distribúyela y aplánala suavemente. Coloca la tapa.",
      },
      {
        id: "tortilla-paso-primera-cara",
        title: "Cocina la primera cara",
        instruction:
          "Cocina tapada unos cinco minutos al nivel 5. Comprueba que los bordes estén asentados, que la parte superior empiece a cuajar y que exista estructura para reposar y voltearse. No hace falta que la superficie esté completamente seca.",
        durationSeconds: 300,
        timerLabel: "5 minutos en la primera cara",
      },
      {
        id: "tortilla-paso-reposo",
        title: "Reposa fuera del fuego",
        instruction:
          "Tapa de nuevo, retira la sartén de la placa y déjala sobre una superficie resistente al calor durante unos tres minutos. El calor residual y el vapor siguen cuajando la mezcla, ayudan a despegarla y reducen los fragmentos pegados.",
        durationSeconds: 180,
        timerLabel: "3 minutos de reposo tapado",
      },
      {
        id: "tortilla-paso-vuelta",
        title: "Da la vuelta",
        instruction:
          "Retira la tapa, coloca un plato suficientemente grande sobre la sartén, sujeta ambos con firmeza y protección térmica, gira con un movimiento seguro y desliza la tortilla de nuevo dentro.",
        warning:
          "No uses un plato pequeño. La sartén quema; no gires sobre el suelo ni cerca de otras personas. Si la tortilla no está firme, reposa algo más.",
      },
      {
        id: "tortilla-paso-segunda-cara",
        title: "Cocina la segunda cara",
        instruction:
          "Vuelve a la placa, sube al nivel 7, tapa y cocina de tres a cinco minutos. Empieza con tres, comprueba y amplía hasta dos minutos si hace falta. Debe quedar dorada, cuajada, húmeda pero no líquida y firme al cortar.",
        durationSeconds: 180,
        timerLabel: "3 minutos iniciales en la segunda cara",
        timerIncrementSeconds: 60,
        timerNote: "Comprueba el punto y añade hasta dos intervalos de un minuto si fuese necesario.",
      },
      {
        id: "tortilla-paso-servir",
        title: "Sirve",
        instruction: "Pasa la tortilla a un plato y déjala reposar uno o dos minutos antes de cortarla. Sírvela caliente o templada.",
      },
    ],
    warnings: [
      "No introduzcas recipientes no aptos en el microondas.",
      "El film debe ser apto para microondas y tener ventilación.",
      "Ten especial cuidado con el vapor de la verdura.",
      "Remueve la patata aproximadamente cada cinco minutos.",
      "No añadas de golpe demasiada leche o agua.",
      "Escurre las verduras que liberen mucha humedad.",
      "No uses una sartén demasiado grande para una ración.",
      "No superes la cantidad de bicarbonato indicada.",
      "Usa un plato suficientemente grande y protégete del calor durante el giro.",
      "Los niveles 5 y 7 pertenecen a la placa de referencia y pueden variar.",
      "La tortilla debe estar completamente cuajada antes de consumirla.",
    ],
    notes: [
      "Admite distintas verduras; brócoli y espinaca son las opciones habituales.",
      "Controla el calabacín porque puede aportar bastante agua.",
      "La soja debe estar muy fina para integrarse.",
      "La textura anterior a la sartén debe ser semilíquida.",
      "El reposo tapado fuera del fuego es parte importante del método.",
      "Una sartén pequeña ayuda a conseguir suficiente grosor.",
      "La primera vez en otro aparato, vigila especialmente la temperatura.",
    ],
    variations: [
      { name: "Con brócoli", description: "Usa cuatro ramilletes bien cocinados y picados." },
      { name: "Con espinaca", description: "Usa aproximadamente cuatro cubos, cocinados, escurridos y picados." },
      { name: "Con calabacín", description: "Usa medio calabacín muy picado y previamente cocinado o reducido." },
      { name: "Más esponjosa", description: "Añade ¼ de cucharadita de bicarbonato al final." },
      { name: "Con otras hierbas", description: "Sustituye el orégano por perejil o cilantro." },
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
