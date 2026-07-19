import { CookingPot } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell not-found"><CookingPot aria-hidden="true" size={42} /><p className="overline">Error 404</p><h1>Esta receta se nos ha quemado</h1><p>La página no existe o cambió de nombre mientras mirábamos el horno.</p><Link href="/" className="primary-button">Volver al recetario</Link></main>
  );
}
