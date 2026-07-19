"use client";

import { ArrowLeft, ArrowRight, CookingPot, ListChecks, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IngredientList } from "@/components/ingredient-list";
import { RecipeTimer } from "@/components/recipe-timer";
import type { Recipe } from "@/types/recipe";

type CookingModeProps = { recipe: Recipe };

export function CookingMode({ recipe }: CookingModeProps) {
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [showIngredients, setShowIngredients] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const triggerButton = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handleKeyDown);
      triggerButton?.focus();
    };
  }, [open]);

  const step = recipe.steps[stepIndex];

  return (
    <>
      <button ref={triggerRef} type="button" className="primary-button cook-mode-trigger" onClick={() => setOpen(true)}><CookingPot aria-hidden="true" size={20} /> Activar modo cocina</button>
      {open && (
        <div ref={dialogRef} className="cooking-mode" role="dialog" aria-modal="true" aria-labelledby="cooking-title">
          <header>
            <div><span>Modo cocina</span><h2 id="cooking-title">{recipe.name}</h2></div>
            <button ref={closeButtonRef} type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Salir del modo cocina"><X aria-hidden="true" size={24} /></button>
          </header>
          <div className="cooking-progress" aria-label={`Paso ${stepIndex + 1} de ${recipe.steps.length}`}>
            <span>Paso {stepIndex + 1} de {recipe.steps.length}</span>
            <div><span style={{ width: `${((stepIndex + 1) / recipe.steps.length) * 100}%` }} /></div>
          </div>
          <main>
            {showIngredients ? (
              <section className="cooking-ingredients"><h3>Ingredientes</h3><IngredientList ingredients={recipe.ingredients} groups={recipe.ingredientGroups} compact /></section>
            ) : (
              <section className="cooking-step">
                <span className="giant-step-number">{stepIndex + 1}</span>
                <h3>{step.title ?? `Paso ${stepIndex + 1}`}</h3>
                <p>{step.instruction}</p>
                {step.warning && <aside><strong>Ojo</strong>{step.warning}</aside>}
                {step.durationSeconds && (
                  <RecipeTimer
                    key={step.id}
                    durationSeconds={step.durationSeconds}
                    label={step.timerLabel}
                    recipeName={recipe.name}
                    stepName={step.title ?? `Paso ${stepIndex + 1}`}
                    incrementSeconds={step.timerIncrementSeconds}
                    reminderEverySeconds={step.reminderEverySeconds}
                    note={step.timerNote}
                  />
                )}
              </section>
            )}
          </main>
          <footer>
            <button type="button" className="ingredients-toggle" onClick={() => setShowIngredients((value) => !value)}><ListChecks aria-hidden="true" size={20} />{showIngredients ? "Volver al paso" : "Ver ingredientes"}</button>
            <div className="step-navigation">
              <button type="button" onClick={() => setStepIndex((index) => Math.max(0, index - 1))} disabled={stepIndex === 0}><ArrowLeft aria-hidden="true" size={22} /> Anterior</button>
              <button type="button" onClick={() => setStepIndex((index) => Math.min(recipe.steps.length - 1, index + 1))} disabled={stepIndex === recipe.steps.length - 1}>Siguiente <ArrowRight aria-hidden="true" size={22} /></button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
