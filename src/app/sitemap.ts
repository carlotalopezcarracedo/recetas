import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { recipes } from "@/data/recipes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/favoritas`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/acerca-de`, changeFrequency: "yearly", priority: 0.3 },
    ...recipes.map((recipe) => ({ url: `${SITE_URL}/recetas/${recipe.slug}`, lastModified: recipe.lastUpdated, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
