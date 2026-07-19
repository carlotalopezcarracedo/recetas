"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";

type FavoriteButtonProps = {
  recipeId: string;
  compact?: boolean;
};

export function FavoriteButton({ recipeId, compact = false }: FavoriteButtonProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const active = favorites.includes(recipeId);

  return (
    <button
      type="button"
      className={`favorite-button${active ? " is-active" : ""}${compact ? " is-compact" : ""}`}
      onClick={() => toggleFavorite(recipeId)}
      aria-pressed={active}
      aria-label={active ? "Quitar de favoritas" : "Marcar como favorita"}
    >
      <Heart aria-hidden="true" size={20} fill={active ? "currentColor" : "none"} />
      {!compact && <span>{active ? "Favorita" : "Guardar"}</span>}
    </button>
  );
}
