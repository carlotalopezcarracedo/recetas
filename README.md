# Las recetas de Carlota

Recetario personal público, mobile-first y pensado para consultar mientras se cocina. Guarda recetas locales tipadas, permite buscar y combinar filtros, ajustar raciones y rangos, distinguir platos de preparaciones base, organizar ingredientes y pasos por secciones, contar ciclos repetidos, marcar favoritas, usar un modo cocina paso a paso y lanzar temporizadores sugeridos.

> “Las versiones definitivas. Hasta que las vuelva a cambiar.”

## Tecnologías

- Next.js 16 con App Router y generación estática.
- React 19 y TypeScript.
- Tailwind CSS 4, con componentes propios y estilos globales.
- Lucide React para iconos.
- Vitest para las pruebas unitarias de datos y filtrado.
- ESLint y el comprobador de TypeScript.

No utiliza base de datos, autenticación ni servicios de pago. Las recetas viven en `src/data/recipes.ts`; favoritas y tema se guardan en `localStorage` del navegador.

## Requisitos

- Node.js 20.9 o posterior (se recomienda una versión LTS actual).
- npm 10 o posterior.

## Instalación y uso local

```bash
npm install
npm run dev
```

Abre exactamente [http://localhost:3000](http://localhost:3000). En Windows, si PowerShell bloquea `npm.ps1`, usa `npm.cmd run dev`.

Para comprobar una versión de producción:

```bash
npm run build
npm start
```

## Comandos de calidad

```bash
npm run lint
npm run typecheck
npm test
npm run validate-recipes
npm run build
```

`validate-recipes` detecta IDs y slugs duplicados, recetas vacías, raciones o cantidades inválidas, grupos o secciones rotos, ciclos incompletos, tiempos negativos y formatos de imagen no admitidos.

## Añadir una receta

1. Abre `src/data/recipe-template.ts`.
2. Duplica el objeto de ejemplo dentro del array de `src/data/recipes.ts`.
3. Sustituye todos los valores y usa IDs únicos para la receta, ingredientes y pasos.
4. Usa un slug legible en minúsculas, por ejemplo `tortilla-de-patatas`.
5. Añade opcionalmente una imagen como se explica abajo.
6. Ejecuta `npm run validate-recipes` y `npm test`.

No hay que modificar rutas ni componentes: `/recetas/[slug]`, el buscador y el sitemap usan automáticamente el array local.

## Modificar una receta

Edita su objeto en `src/data/recipes.ts`, incrementa `version` y actualiza `lastUpdated` con formato `AAAA-MM-DD`. Conserva las cantidades aproximadas como texto explícito; no las conviertas en medidas exactas sin haberlas probado.

Para perfeccionar cualquiera de las recetas nuevas, busca `tarta-queso-pequena`, `tortilla-patata-soja-texturizada`, `bol-avena-fruta-frutos-secos` o `bolitas-soja-texturizada-verdura`. Ajusta los datos, pasos o tiempos comprobados, actualiza `version` y `lastUpdated`, y ejecuta todas las comprobaciones de calidad.

## Recetas escalables

La cantidad base siempre es la cantidad realmente probada. Activa el selector en `servings`:

```ts
servings: {
  amount: 2,
  unit: "personas",
  unitSingular: "persona",
  scalable: true,
  min: 1,
  max: 8,
},
```

Una cantidad numérica se escala automáticamente. La tarta usa:

```ts
{ id: "tarta-queso-fresco", quantity: 125, unit: "g", name: "queso fresco batido" }
```

Con cuatro raciones se muestra `250 g`. Para unidades con plural añade `unitPlural`; por ejemplo, una cucharadita puede convertirse en dos cucharaditas.

Una medida aproximada se mantiene como texto y debe marcarse como no escalable:

```ts
{
  id: "tarta-vainilla",
  displayQuantity: "un chorrito pequeño",
  name: "esencia de vainilla",
  scalable: false,
  notes: "Ajustar proporcionalmente sin excederse.",
}
```

No conviertas “pizca”, “al gusto”, “tres dedos” o “cantidad necesaria” en cifras inventadas. El selector conserva esos textos y avisa de que deben ajustarse proporcionalmente.

También se admite un intervalo exacto mediante `quantityRange`. Por ejemplo, los ñoquis usan `7–8 g` de harina por ración y muestran automáticamente `14–16 g`, `21–24 g` y `28–32 g` para dos, tres y cuatro raciones.

## Preparaciones base y recetas de precisión

Una masa, salsa o base reutilizable puede declarar `recipeKind: "preparacion-base"` y explicar sus destinos mediante `howToUse`. Si la receta depende de proporciones precisas, activa `requiresScale`, incluye una balanza en `tools` y añade `precisionWarning`. La interfaz mostrará “Preparación base”, “Requiere balanza” y “Escalable” tanto en el listado como en la ficha.

`proportionGuide` genera una tabla de raciones desde los mismos ingredientes; no se copian cantidades manualmente. La receta `noquis-caseros-patata` incluye la tabla completa de una a cuatro raciones, dos harinas alternativas y una guía de uso como acompañamiento, ensalada o bowl.

En esa receta la sal está documentada provisionalmente como `1 g` por ración para que sea fácil corregirla cuando se confirme. Al ampliar raciones puede ser necesario trabajar en varias tandas: el selector recalcula ingredientes, pero nunca multiplica automáticamente el tiempo ni la temperatura.

Importante: aumentar raciones solo recalcula ingredientes numéricos. Nunca multiplica automáticamente tiempos, temperatura, tamaño del recipiente ni capacidad del aparato. En la tarta, cuatro raciones probablemente requieren horno y un molde mayor aunque los ingredientes se dupliquen exactamente.

## Grupos de alternativas

Para indicar que no se usan todos los ingredientes a la vez, declara un grupo y enlaza sus opciones mediante `groupId`:

```ts
ingredientGroups: [{
  id: "verdura",
  title: "Escoge una verdura.",
  instruction: "Usa una sola opción.",
  selection: "one",
}],
ingredients: [
  { id: "brocoli", quantity: 4, unit: "ramillete", unitPlural: "ramilletes", name: "brócoli", groupId: "verdura" },
  { id: "calabacin", quantity: 0.5, unit: "unidad mediana", name: "calabacín", groupId: "verdura" },
],
```

La tortilla usa este patrón para las verduras; la tarta lo usa para el queso adicional opcional.

## Secciones de ingredientes y pasos

Las listas siguen siendo planas para conservar compatibilidad con las recetas existentes. Una sección declara su título y cada elemento la referencia mediante `sectionId`:

```ts
ingredientSections: [
  { id: "salsa", title: "Salsa", description: "Se prepara mientras se hornean las bolitas." },
],
ingredients: [
  { id: "queso", quantity: 2, unit: "cucharaditas", name: "de queso fresco batido", sectionId: "salsa" },
],
stepSections: [
  { id: "principal", title: "Preparación principal" },
  { id: "acompanamiento", title: "Acompañamiento" },
  { id: "salsa-pasos", title: "Salsa" },
],
steps: [
  { id: "mezclar", title: "Prepara la mezcla", instruction: "…", sectionId: "principal" },
],
```

Los grupos de elección también admiten `sectionId`. Las bolitas usan este sistema para separar preparación principal, mazorca y salsa, y para mostrar aceite y aguacate como alternativas, no como dos ingredientes obligatorios.

## Pasos repetibles y condiciones finales

Usa `repeatable` cuando la persona que cocina deba decidir cuántas veces repetir un ciclo:

```ts
repeatable: {
  enabled: true,
  repeatInstruction: "Rompe la mezcla, añade claras, remueve y cocina otros 30 segundos.",
  stopCondition: "El bol está casi lleno, la avena sigue suelta y no queda clara cruda.",
  suggestedIntervalSeconds: 30,
  maxSuggestedRepeats: 6,
},
```

La interfaz muestra un contador manual con “Marcar otro ciclo” y “Reiniciar ciclos”. `maxSuggestedRepeats` es solo una referencia: nunca bloquea más ciclos ni inicia temporizadores automáticamente. Para una señal visual de finalización que no dependa de repetir, añade `completionCondition` al paso. En modo cocina se muestra destacada.

La cantidad de claras del bol de avena se guarda como `displayQuantity` porque depende del tamaño del recipiente, la absorción y el número de ciclos; no se inventa una cifra total.

## Temporizadores en los pasos

Cada paso puede tener su propio temporizador sucesivo:

```ts
{
  title: "Termina la cocción destapada",
  durationSeconds: 600,
  timerLabel: "10 minutos destapada",
  timerIncrementSeconds: 60,
  timerNote: "Amplía en intervalos cortos y comprueba por textura.",
}
```

- `durationSeconds`: tiempo inicial sugerido.
- `timerIncrementSeconds`: botón para añadir tiempo sin automatizar el siguiente paso.
- `reminderEverySeconds`: recordatorio periódico, como remover la patata cada cinco minutos.
- `timerNote`: comprobación o contexto visible junto al temporizador.

Al terminar se muestra la receta y el nombre del paso, se avisa visualmente y se reproduce un sonido si el navegador lo permite.

Para un aviso intermedio, configura el tiempo total y usa `reminderEverySeconds`. El bol de avena utiliza 60 segundos con un aviso a los 30 para sacar, romper y continuar. Si cada intervalo requiere una decisión independiente, utiliza un paso repetible con un temporizador de 30 segundos.

## Añadir una fotografía

1. Guarda un JPG, JPEG, PNG, WebP o AVIF en `public/images/recipes`.
2. Se recomienda que el archivo coincida con el slug: `bizcocho-microondas.jpg`.
3. Añade al objeto de la receta:

```ts
image: "/images/recipes/bizcocho-microondas.jpg",
imageAlt: "Bizcocho individual servido en su bol",
```

Consulta también `public/images/recipes/README.md`.

## Cambiar el nombre del recetario

Edita `SITE_CONFIG.name` y, si procede, `shortName` en `src/config/site.ts`. El encabezado, metadata y manifiesto reutilizan esa configuración.

## URL pública y SEO

Copia `.env.example` a `.env.local` y configura:

```env
NEXT_PUBLIC_SITE_URL=https://tu-proyecto.vercel.app
```

No incluyas una barra final. Durante desarrollo se usa `http://localhost:3000`. Esta URL alimenta enlaces canónicos, datos estructurados, sitemap y robots.

## Subir a GitHub

Con [GitHub CLI](https://cli.github.com/) autenticado:

```bash
git add .
git commit -m "feat: crear recetario de Carlota"
gh repo create recetas-de-carlota --public --source=. --remote=origin --push
```

Sin GitHub CLI:

1. Crea en GitHub un repositorio vacío llamado `recetas-de-carlota`, sin README ni `.gitignore` adicionales.
2. Ejecuta:

```bash
git add .
git commit -m "feat: crear recetario de Carlota"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/recetas-de-carlota.git
git push -u origin main
```

## Publicar con GitHub Actions y GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` se ejecuta al subir cambios a `master` o manualmente desde **Actions**. Instala con `npm ci`, ejecuta lint, TypeScript, pruebas y validación, genera una exportación estática en `out/` y la publica con las acciones oficiales de GitHub Pages.

Para activarlo una vez en GitHub:

1. Abre **Settings → Pages** en el repositorio.
2. En **Build and deployment → Source**, selecciona **GitHub Actions**.
3. Sube estos cambios a `master` o ejecuta **Comprobar y publicar en GitHub Pages** desde la pestaña **Actions**.
4. Cuando termine, abre `https://carlotalopezcarracedo.github.io/recetas/`.

El workflow calcula el usuario y el nombre del repositorio automáticamente. Durante esa compilación establece `GITHUB_PAGES=true`, `NEXT_PUBLIC_BASE_PATH=/recetas` y la URL pública correspondiente. `next.config.ts` activa entonces `output: "export"`, rutas con barra final e imágenes sin optimización de servidor. En local esas opciones permanecen desactivadas.

Para reproducir exactamente la exportación de Pages en PowerShell:

```powershell
$env:GITHUB_PAGES="true"
$env:NEXT_PUBLIC_BASE_PATH="/recetas"
$env:NEXT_PUBLIC_SITE_URL="https://carlotalopezcarracedo.github.io/recetas"
npm.cmd run build
```

El resultado queda en `out/`. El `basePath` se integra en los enlaces de Next.js; los recursos públicos y el manifiesto también utilizan el prefijo del repositorio.

## Desplegar gratis en Vercel

1. Entra en [vercel.com/new](https://vercel.com/new) con tu cuenta de GitHub.
2. Importa `recetas-de-carlota`.
3. Vercel detectará Next.js; deja los comandos y el directorio raíz por defecto.
4. En **Environment Variables**, crea `NEXT_PUBLIC_SITE_URL` con la URL definitiva (por ejemplo, `https://recetas-de-carlota.vercel.app`) para Production, Preview y Development.
5. Pulsa **Deploy**.
6. Si primero desplegaste para conocer la URL, actualiza la variable y pulsa **Redeploy** una vez.

También puedes usar la CLI:

```bash
npx vercel
npx vercel env add NEXT_PUBLIC_SITE_URL
npx vercel --prod
```

Cada `git push` posterior en la rama principal genera un nuevo despliegue. Para publicar una receta actualizada: edita datos, sube versión y fecha, valida, confirma los cambios y haz `git push`.

## Por qué los datos son locales

Esta primera versión mantiene un inventario pequeño de recetas públicas y una única fuente de verdad. Los datos locales hacen el sitio rápido, gratuito, fácil de versionar en Git y sin credenciales ni mantenimiento externo. La interfaz recibe objetos `Recipe`, por lo que no conoce dónde se almacenan.

## Migración futura a Supabase

Cuando haga falta editar desde un panel o sincronizar datos sin desplegar, se puede crear una capa de repositorio que consulte Supabase y mantenga las mismas funciones (`getRecipes`, `getRecipeBySlug`). Los componentes seguirían recibiendo el mismo tipo `Recipe`. Después se migrarían recetas, ingredientes y pasos a tablas relacionadas, se añadirían validaciones en el servidor y se elegiría una estrategia de caché/revalidación. Supabase no está instalado ni simulado en esta versión.

## Estructura principal

```text
src/
├── app/                 # Rutas, metadata, manifiesto, robots y sitemap
├── components/          # Componentes visuales y controles interactivos
├── config/site.ts       # Nombre, textos comunes y URL pública
├── data/                # Recetas y plantilla editable
├── hooks/               # Favoritas persistentes
├── lib/                 # Búsqueda, filtros, formato y validación
└── types/recipe.ts      # Modelo de datos explícito
scripts/                 # Validación ejecutable del inventario
public/images/recipes/   # Fotografías locales
```

## PWA

El sitio incluye favicon, icono y `manifest.webmanifest`, y puede añadirse a la pantalla de inicio. No registra un service worker ni promete funcionamiento sin conexión; se ha evitado añadir una capa offline frágil a esta primera versión.

## Licencia

[MIT](LICENSE).
