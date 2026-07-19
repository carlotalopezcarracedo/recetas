"use client";

import { CircleCheckBig, Plus, Repeat2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { adjustCycleCount } from "@/lib/repeatable-steps";
import type { RepeatableStep as RepeatableStepData } from "@/types/recipe";

type RepeatableStepProps = {
  repeatable: RepeatableStepData;
};

function formatInterval(seconds?: number): string | null {
  if (!seconds) return null;
  if (seconds < 60) return `${seconds} segundos`;
  const minutes = seconds / 60;
  return `${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
}

export function RepeatableStep({ repeatable }: RepeatableStepProps) {
  const [cycles, setCycles] = useState(0);
  const interval = formatInterval(repeatable.suggestedIntervalSeconds);

  return (
    <section className="repeatable-step" aria-label="Paso por ciclos">
      <div className="repeatable-heading">
        <Repeat2 aria-hidden="true" size={20} />
        <div>
          <strong>Ciclos completados</strong>
          <output aria-live="polite">{cycles}</output>
        </div>
      </div>
      <p><strong>Repite:</strong> {repeatable.repeatInstruction}</p>
      {interval && <p><strong>Revisa cada:</strong> {interval}.</p>}
      <p className="stop-condition"><CircleCheckBig aria-hidden="true" size={19} /><span><strong>Detente cuando:</strong> {repeatable.stopCondition}</span></p>
      {repeatable.maxSuggestedRepeats && (
        <small>Referencia: hasta {repeatable.maxSuggestedRepeats} ciclos suelen ser suficientes, pero es orientativo y puedes continuar manualmente.</small>
      )}
      <div className="cycle-actions">
        <button type="button" onClick={() => setCycles((current) => adjustCycleCount(current, "increment"))}>
          <Plus aria-hidden="true" size={19} /> Marcar otro ciclo
        </button>
        <button type="button" onClick={() => setCycles((current) => adjustCycleCount(current, "reset"))} disabled={cycles === 0}>
          <RotateCcw aria-hidden="true" size={18} /> Reiniciar ciclos
        </button>
      </div>
    </section>
  );
}
