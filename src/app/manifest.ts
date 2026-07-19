import type { MetadataRoute } from "next";
import { BASE_PATH, SITE_CONFIG, withBasePath } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    start_url: `${BASE_PATH}/`,
    display: "standalone",
    background_color: "#f6f1e8",
    theme_color: "#a4472a",
    lang: "es",
    icons: [{ src: withBasePath("/icon.svg"), sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
