import type { Metadata } from "next";
import { BookHeart, RefreshCcw, Smartphone } from "lucide-react";

export const metadata: Metadata = { title: "Acerca de", description: "Por qué existe este recetario personal.", alternates: { canonical: "/acerca-de" } };

export default function AboutPage() {
  return (
    <main className="shell narrow-page">
      <span className="page-icon"><BookHeart aria-hidden="true" size={24} /></span>
      <p className="overline">La historia más corta posible</p>
      <h1>Un recetario con memoria</h1>
      <p className="about-lead">Este recetario existe porque las recetas de Carlota cambian cada vez que las cocina. Aquí se guarda siempre la última versión aprobada.</p>
      <div className="about-grid">
        <article><RefreshCcw aria-hidden="true" size={24} /><h2>Siempre la última</h2><p>Cada receta enseña su versión y la fecha de actualización. Se acabó aquello de «creo que esta vez llevaba más harina».</p></article>
        <article><Smartphone aria-hidden="true" size={24} /><h2>Lista para la encimera</h2><p>Texto grande, pasos claros, temporizadores y un modo cocina pensado para consultar con las manos ocupadas.</p></article>
      </div>
    </main>
  );
}
