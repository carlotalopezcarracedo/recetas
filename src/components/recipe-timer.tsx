"use client";

import { BellRing, Pause, Play, Plus, RotateCcw, Timer } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type RecipeTimerProps = {
  durationSeconds: number;
  label?: string;
  recipeName: string;
  stepName: string;
  incrementSeconds?: number;
  reminderEverySeconds?: number;
  note?: string;
};

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function playCompletionSound() {
  try {
    const AudioContextClass = window.AudioContext;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = 740;
    gain.gain.setValueAtTime(0.12, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.45);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.45);
  } catch {
    // La señal visual sigue disponible si el navegador bloquea el audio.
  }
}

export function RecipeTimer({ durationSeconds, label, recipeName, stepName, incrementSeconds, reminderEverySeconds, note }: RecipeTimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const [, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [reminderMessage, setReminderMessage] = useState<string | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setElapsed((current) => {
        const next = current + 1;
        if (reminderEverySeconds && next % reminderEverySeconds === 0) {
          setReminderMessage(`Han pasado ${formatTime(next)}: toca remover o revisar.`);
        }
        return next;
      });
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setRunning(false);
          if (!completedRef.current) playCompletionSound();
          completedRef.current = true;
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [reminderEverySeconds, running]);

  function reset() {
    setRunning(false);
    setRemaining(durationSeconds);
    setElapsed(0);
    setReminderMessage(null);
    completedRef.current = false;
  }

  function addTime() {
    if (!incrementSeconds) return;
    setRemaining((current) => current + incrementSeconds);
    completedRef.current = false;
  }

  const finished = remaining === 0;
  return (
    <div className={`timer${finished ? " is-finished" : ""}`} role="timer" aria-live="polite">
      <div className="timer-readout"><Timer aria-hidden="true" size={20} /><span>{formatTime(remaining)}</span></div>
      <div className="timer-copy">
        <strong>{finished ? `Paso terminado: ${stepName}` : label ?? stepName}</strong>
        <small>{finished ? `${recipeName} · El siguiente paso no se inicia automáticamente.` : recipeName}</small>
      </div>
      {note && <p className="timer-note">{note}</p>}
      {reminderEverySeconds && <p className="timer-reminder"><BellRing aria-hidden="true" size={16} /> Recordatorio cada {formatTime(reminderEverySeconds)}</p>}
      {reminderMessage && <p className="timer-alert"><BellRing aria-hidden="true" size={17} />{reminderMessage}</p>}
      <div className={`timer-actions${incrementSeconds ? " has-extra" : ""}`}>
        <button type="button" onClick={() => setRunning((value) => !value)} disabled={finished}>
          {running ? <Pause aria-hidden="true" size={18} /> : <Play aria-hidden="true" size={18} />}
          {running ? "Pausar" : remaining === durationSeconds ? "Iniciar" : "Reanudar"}
        </button>
        <button type="button" onClick={reset}><RotateCcw aria-hidden="true" size={18} /> Reiniciar</button>
        {incrementSeconds && <button type="button" onClick={addTime}><Plus aria-hidden="true" size={18} /> Añadir {formatTime(incrementSeconds)}</button>}
      </div>
    </div>
  );
}
