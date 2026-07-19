import type { Metadata } from "next";
import { Heart } from "lucide-react";
import { RecipeExplorer } from "@/components/recipe-explorer";
import { SITE_URL } from "@/config/site";
import { recipes } from "@/data/recipes";

export const metadata: Metadata = { title: "Favoritas", description: "Tus recetas favoritas, guardadas en este dispositivo.", alternates: { canonical: `${SITE_URL}/favoritas` } };

export default function FavoritesPage() {
  return (
    <main className="shell page-shell">
      <header className="page-intro"><span className="page-icon"><Heart aria-hidden="true" size={22} /></span><div><h1>Recetas favoritas</h1><p>Tu selección se guarda solamente en este dispositivo. Íntimo, sencillo y sin cuentas.</p></div></header>
      <RecipeExplorer recipes={recipes} favoritesOnly />
    </main>
  );
}
