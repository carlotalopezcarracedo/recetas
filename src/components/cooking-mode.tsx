"use client";

import { ArrowLeft, ArrowRight, CircleCheckBig, CookingPot, ListChecks, Minus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IngredientList } from "@/components/ingredient-list";
import { PrecisionNotice } from "@/components/precision-notice";
import { ProportionTable } from "@/components/proportion-table";
import { useRecipeExperience } from "@/components/recipe-experience";
import { RecipeTimer } from "@/components/recipe-timer";
import { RepeatableStep } from "@/components/repeatable-step";
import { adjustServingCount } from "@/lib/servings";
import type { Recipe } from "@/types/recipe";

type CookingModeProps = { recipe: Recipe };

export function CookingMode({ recipe }: CookingModeProps) {
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [showIngredients, setShowIngredients] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { selectedServings, scaleFactor, changeServings, startCooking } = useRecipeExperience();

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
  const currentSection = recipe.stepSections?.find((section) => section.id === step.sectionId);

  function jumpToSection(sectionId: string) {
    const index = recipe.steps.findIndex((item) => item.sectionId === sectionId);
    if (index >= 0) {
      setStepIndex(index);
      setShowIngredients(false);
    }
  }

  function openCookingMode() {
    startCooking();
    setOpen(true);
  }

  function adjustServings(action: "increment" | "decrement") {
    if (!recipe.servings) return;
    changeServings(adjustServingCount(selectedServings, action, {
      base: recipe.servings.amount,
      min: recipe.servings.min,
      max: recipe.servings.max,
    }));
  }

  return (
    <>
      <button ref={triggerRef} type="button" className="primary-button cook-mode-trigger" onClick={openCookingMode}><CookingPot aria-hidden="true" size={20} /> Activar modo cocina</button>
      {open && (
        <div ref={dialogRef} className={`cooking-mode${recipe.stepSections && recipe.stepSections.length > 1 ? " has-section-nav" : ""}`} role="dialog" aria-modal="true" aria-labelledby="cooking-title">
          <header>
            <div><span>Modo cocina</span><h2 id="cooking-title">{recipe.name}</h2></div>
            <button ref={closeButtonRef} type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Salir del modo cocina"><X aria-hidden="true" size={24} /></button>
          </header>
          <div className="cooking-progress" aria-label={`Paso ${stepIndex + 1} de ${recipe.steps.length}`}>
            <span>{currentSection ? `${currentSection.title} · ` : ""}Paso {stepIndex + 1} de {recipe.steps.length}</span>
            <div className="cooking-progress-bar"><span style={{ width: `${((stepIndex + 1) / recipe.steps.length) * 100}%` }} /></div>
            {recipe.servings && (
              <div className="cooking-servings">
                <span>Raciones activas</span>
                <div>
                  {recipe.servings.scalable && <button type="button" onClick={() => adjustServings("decrement")} disabled={selectedServings <= (recipe.servings?.min ?? 1)} aria-label="Reducir raciones durante el modo cocina"><Minus aria-hidden="true" size={16} /></button>}
                  <output aria-live="polite">{selectedServings} {selectedServings === 1 ? (recipe.servings.unitSingular ?? recipe.servings.unit) : recipe.servings.unit}</output>
                  {recipe.servings.scalable && <button type="button" onClick={() => adjustServings("increment")} disabled={selectedServings >= (recipe.servings?.max ?? 12)} aria-label="Aumentar raciones durante el modo cocina"><Plus aria-hidden="true" size={16} /></button>}
                </div>
              </div>
            )}
            <PrecisionNotice recipe={recipe} compact />
          </div>
          {recipe.stepSections && recipe.stepSections.length > 1 && (
            <nav className="cooking-sections" aria-label="Secciones de la receta">
              {recipe.stepSections.map((section) => (
                <button key={section.id} type="button" aria-current={currentSection?.id === section.id ? "step" : undefined} onClick={() => jumpToSection(section.id)}>{section.title}</button>
              ))}
            </nav>
          )}
          <main>
            <section className="cooking-ingredients" hidden={!showIngredients}>
              <h3>Ingredientes</h3>
              <IngredientList ingredients={recipe.ingredients} groups={recipe.ingredientGroups} sections={recipe.ingredientSections} scaleFactor={scaleFactor} compact />
              {recipe.proportionGuide && recipe.servings && <ProportionTable ingredients={recipe.ingredients} baseServings={recipe.servings.amount} guide={recipe.proportionGuide} compact />}
            </section>
            <section className="cooking-step" hidden={showIngredients}>
                <span className="giant-step-number">{stepIndex + 1}</span>
                {currentSection && <span className="cooking-section-label">{currentSection.title}</span>}
                <h3>{step.title ?? `Paso ${stepIndex + 1}`}</h3>
                <p>{step.instruction}</p>
                {step.completionCondition && <p className="cooking-completion"><CircleCheckBig aria-hidden="true" size={21} /><span><strong>Condición final</strong>{step.completionCondition}</span></p>}
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
                {step.repeatable && <RepeatableStep repeatable={step.repeatable} />}
              </section>
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
