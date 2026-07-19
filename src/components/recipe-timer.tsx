"use client";

import { Pause, Play, RotateCcw, Timer } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type RecipeTimerProps = { durationSeconds: number; label?: string };

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

export function RecipeTimer({ durationSeconds, label }: RecipeTimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const [running, setRunning] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
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
  }, [running]);

  function reset() {
    setRunning(false);
    setRemaining(durationSeconds);
    completedRef.current = false;
  }

  const finished = remaining === 0;
  return (
    <div className={`timer${finished ? " is-finished" : ""}`} role="timer" aria-live="polite">
      <div className="timer-readout"><Timer aria-hidden="true" size={20} /><span>{formatTime(remaining)}</span></div>
      <div className="timer-copy">
        <strong>{finished ? "¡Tiempo!" : label ?? "Temporizador sugerido"}</strong>
        <small>{finished ? "Ya puedes continuar con el siguiente paso." : "Puedes pausarlo y retomarlo cuando quieras."}</small>
      </div>
      <div className="timer-actions">
        <button type="button" onClick={() => setRunning((value) => !value)} disabled={finished}>
          {running ? <Pause aria-hidden="true" size={18} /> : <Play aria-hidden="true" size={18} />}
          {running ? "Pausar" : remaining === durationSeconds ? "Iniciar" : "Reanudar"}
        </button>
        <button type="button" onClick={reset}><RotateCcw aria-hidden="true" size={18} /> Reiniciar</button>
      </div>
    </div>
  );
}
