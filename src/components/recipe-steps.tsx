import { AlertTriangle } from "lucide-react";
import { RecipeTimer } from "@/components/recipe-timer";
import type { RecipeStep } from "@/types/recipe";

type RecipeStepsProps = { steps: RecipeStep[]; recipeName: string };

export function RecipeSteps({ steps, recipeName }: RecipeStepsProps) {
  return (
    <ol className="steps-list">
      {steps.map((step, index) => (
        <li key={step.id}>
          <span className="step-number" aria-hidden="true">{index + 1}</span>
          <div className="step-content">
            {step.title && <h3>{step.title}</h3>}
            <p>{step.instruction}</p>
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
          </div>
        </li>
      ))}
    </ol>
  );
}
