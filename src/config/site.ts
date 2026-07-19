export const SITE_CONFIG = {
  name: "Las recetas de Carlota",
  shortName: "Recetas de Carlota",
  tagline: "Las versiones definitivas. Hasta que las vuelva a cambiar.",
  description:
    "Un recetario personal con recetas claras, probadas y siempre en su última versión aprobada.",
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
