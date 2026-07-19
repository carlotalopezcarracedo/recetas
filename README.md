# Las recetas de Carlota

Recetario personal público, mobile-first y pensado para consultar mientras se cocina. Guarda recetas locales tipadas, permite buscar y combinar filtros, marcar favoritas, usar un modo cocina paso a paso y lanzar temporizadores sugeridos.

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

`validate-recipes` detecta IDs y slugs duplicados, recetas vacías, tiempos negativos, valores inválidos, formatos de imagen no admitidos y rutas de imágenes inexistentes.

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

Esta primera versión solo necesita dos recetas públicas y una única fuente de verdad. Los datos locales hacen el sitio rápido, gratuito, fácil de versionar en Git y sin credenciales ni mantenimiento externo. La interfaz recibe objetos `Recipe`, por lo que no conoce dónde se almacenan.

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
