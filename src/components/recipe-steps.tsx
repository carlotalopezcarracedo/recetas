import { AlertTriangle, CircleCheckBig } from "lucide-react";
import { RecipeTimer } from "@/components/recipe-timer";
import { RepeatableStep } from "@/components/repeatable-step";
import type { RecipeStep, StepSection } from "@/types/recipe";

type RecipeStepsProps = {
  steps: RecipeStep[];
  recipeName: string;
  sections?: StepSection[];
};

type StepRowProps = {
  step: RecipeStep;
  index: number;
  recipeName: string;
};

function StepRow({ step, index, recipeName }: StepRowProps) {
  return (
    <li>
      <span className="step-number" aria-hidden="true">{index + 1}</span>
      <div className="step-content">
        {step.title && <h3>{step.title}</h3>}
        <p>{step.instruction}</p>
        {step.completionCondition && (
          <p className="completion-condition"><CircleCheckBig aria-hidden="true" size={18} />{step.completionCondition}</p>
        )}
        {step.warning && <p className="inline-warning"><AlertTriangle aria-hidden="true" size={18} />{step.warning}</p>}
        {step.durationSeconds && (
          <RecipeTimer
            durationSeconds={step.durationSeconds}
            label={step.timerLabel}
            recipeName={recipeName}
            stepName={step.title ?? `Paso ${index + 1}`}
            incrementSeconds={step.timerIncrementSeconds}
            reminderEverySeconds={step.reminderEverySeconds}
            note={step.timerNote}
          />
        )}
        {step.repeatable && <RepeatableStep repeatable={step.repeatable} />}
      </div>
    </li>
  );
}

export function RecipeSteps({ steps, recipeName, sections = [] }: RecipeStepsProps) {
  const unsectioned = steps.filter((step) => !step.sectionId);

  return (
    <div className="steps-by-section">
      {unsectioned.length > 0 && (
        <ol className="steps-list">
          {unsectioned.map((step) => <StepRow key={step.id} step={step} index={steps.indexOf(step)} recipeName={recipeName} />)}
        </ol>
      )}
      {sections.map((section) => {
        const sectionSteps = steps.filter((step) => step.sectionId === section.id);
        return (
          <section className="step-section" key={section.id} aria-labelledby={`step-section-${section.id}`}>
            <header>
              <span>Sección</span>
              <h3 id={`step-section-${section.id}`}>{section.title}</h3>
              {section.description && <p>{section.description}</p>}
            </header>
            <ol className="steps-list">
              {sectionSteps.map((step) => <StepRow key={step.id} step={step} index={steps.indexOf(step)} recipeName={recipeName} />)}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
