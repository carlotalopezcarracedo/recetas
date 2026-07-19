import { CakeSlice, CookingPot } from "lucide-react";
import Image from "next/image";
import { withBasePath } from "@/config/site";
import type { Recipe } from "@/types/recipe";

type RecipeImageProps = Pick<Recipe, "name" | "image" | "imageAlt" | "flavorType"> & {
  priority?: boolean;
};

export function RecipeImage({ name, image, imageAlt, flavorType, priority = false }: RecipeImageProps) {
  if (image) {
    return (
      <div className="recipe-image-wrap">
        <Image src={withBasePath(image)} alt={imageAlt ?? name} fill sizes="(max-width: 720px) 100vw, 640px" priority={priority} className="recipe-photo" />
      </div>
    );
  }

  const Icon = flavorType === "dulce" ? CakeSlice : CookingPot;
  return (
    <div className={`recipe-placeholder placeholder-${flavorType}`} role="img" aria-label={`Ilustración para ${name}`}>
      <span className="placeholder-orb"><Icon aria-hidden="true" size={38} /></span>
      <span className="placeholder-name">{name}</span>
      <span className="placeholder-caption">Foto pendiente. La receta no.</span>
    </div>
  );
}
