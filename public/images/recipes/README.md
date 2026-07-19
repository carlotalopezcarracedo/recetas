# Fotografías de recetas

Guarda aquí las fotografías reales. No se descargan imágenes externas y, mientras falte una foto, la interfaz muestra un placeholder local.

- Formatos admitidos: JPG, JPEG, PNG, WebP y AVIF.
- Nombre recomendado: el mismo slug de la receta, por ejemplo `bizcocho-microondas.jpg`.
- Procura usar imágenes horizontales (aproximadamente 16:10), comprimidas y sin datos sensibles.

Después añade al objeto correspondiente de `src/data/recipes.ts`:

```ts
image: "/images/recipes/bizcocho-microondas.jpg",
imageAlt: "Descripción concreta y accesible de la fotografía",
```

Ejecuta `npm run validate-recipes` para comprobar que la ruta existe y que la extensión es válida.
