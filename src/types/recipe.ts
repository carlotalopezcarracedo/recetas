export const MEAL_TYPES = [
  "desayuno",
  "comida",
  "cena",
  "merienda",
  "postre",
] as const;

export const FLAVOR_TYPES = ["dulce", "salado"] as const;
export const DIFFICULTIES = ["muy-facil", "facil", "media", "dificil"] as const;
export const RECIPE_KINDS = [
  "plato-completo",
  "preparacion-base",
  "salsa",
  "acompanamiento",
  "masa",
  "postre",
  "bebida",
] as const;

export type MealType = (typeof MEAL_TYPES)[number];
export type FlavorType = (typeof FLAVOR_TYPES)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];
export type RecipeKind = (typeof RECIPE_KINDS)[number];

export type RecipeIngredient = {
  id: string;
  name: string;
  quantity?: number;
  quantityRange?: {
    min: number;
    max: number;
  };
  unit?: string;
  unitPlural?: string;
  displayQuantity?: string;
  notes?: string;
  optional?: boolean;
  scalable?: boolean;
  groupId?: string;
  sectionId?: string;
};

export type IngredientGroup = {
  id: string;
  title: string;
  instruction: string;
  selection: "one" | "any";
  optional?: boolean;
  sectionId?: string;
};

export type IngredientSection = {
  id: string;
  title: string;
  description?: string;
};

export type StepSection = {
  id: string;
  title: string;
  description?: string;
};

export type RepeatableStep = {
  enabled: true;
  repeatInstruction: string;
  stopCondition: string;
  suggestedIntervalSeconds?: number;
  maxSuggestedRepeats?: number;
};

export type RecipeStep = {
  id: string;
  title?: string;
  instruction: string;
  durationSeconds?: number;
  timerLabel?: string;
  timerIncrementSeconds?: number;
  reminderEverySeconds?: number;
  timerNote?: string;
  warning?: string;
  sectionId?: string;
  completionCondition?: string;
  repeatable?: RepeatableStep;
};

export type Recipe = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  mealTypes: MealType[];
  flavorType: FlavorType;
  recipeKind?: RecipeKind;
  requiresScale?: boolean;
  precisionWarning?: string;
  tags: string[];
  keywords?: string[];
  prepTimeMinutes?: number;
  prepTimeLabel?: string;
  cookTimeMinutes?: number;
  cookTimeLabel?: string;
  totalTimeMinutes?: number;
  totalTimeLabel?: string;
  difficulty: Difficulty;
  servings?: {
    amount: number;
    unit: string;
    unitSingular?: string;
    scalable?: boolean;
    min?: number;
    max?: number;
  };
  tools: string[];
  ingredients: RecipeIngredient[];
  ingredientGroups?: IngredientGroup[];
  ingredientSections?: IngredientSection[];
  steps: RecipeStep[];
  stepSections?: StepSection[];
  proportionGuide?: {
    servings: number[];
    columns: Array<{
      ingredientId: string;
      label: string;
    }>;
  };
  servingScaleNote?: string;
  howToUse?: Array<{
    title: string;
    description: string;
  }>;
  restTimeLabel?: string;
  refrigerationTimeLabel?: string;
  recommendedAppliances?: string[];
  notes?: string[];
  warnings?: string[];
  variations?: Array<{
    name: string;
    description: string;
  }>;
  isFeatured?: boolean;
  version: string;
  lastUpdated: string;
};
