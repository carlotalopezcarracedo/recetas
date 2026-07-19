# Contribuir recetas

Las recetas se editan en `src/data/recipes.ts` usando el tipo `Recipe` de `src/types/recipe.ts`.

## Formato

- Usa un `id` y un `slug` únicos; el slug solo admite minúsculas, números y guiones.
- Usa IDs únicos también en cada ingrediente y paso.
- Usa `quantity` numérico y `unit` para cantidades exactas escalables.
- Usa `displayQuantity` y `scalable: false` para medidas aproximadas.
- Marca con `optional: true` cualquier ingrediente prescindible.
- Usa `ingredientGroups` y `groupId` cuando se deba escoger una alternativa, no todas.
- Conserva expresiones como “aproximadamente”, “pizca” o “al gusto” cuando no exista una medida probada.
- Usa `durationSeconds` solo cuando un paso deba ofrecer un temporizador.
- Añade `timerIncrementSeconds`, `reminderEverySeconds` o `timerNote` cuando el paso los necesite.
- Escribe `lastUpdated` como `AAAA-MM-DD` y actualiza `version` al cambiar la receta.
- Guarda fotos locales y añade siempre un `imageAlt` útil.

Antes de confirmar cambios:

```bash
npm run validate-recipes
npm test
npm run lint
npm run typecheck
```

La plantilla editable está en `src/data/recipe-template.ts`.
