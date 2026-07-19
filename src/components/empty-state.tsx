import { SearchX } from "lucide-react";

type EmptyStateProps = { favoritesOnly?: boolean };

export function EmptyState({ favoritesOnly = false }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <SearchX aria-hidden="true" size={34} />
      <h2>{favoritesOnly ? "Todavía no hay favoritas" : "Aquí no hay ni una miga"}</h2>
      <p>{favoritesOnly ? "Marca una receta con el corazón y aparecerá aquí." : "Prueba otra búsqueda o quita algún filtro."}</p>
    </div>
  );
}
