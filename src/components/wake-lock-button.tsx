"use client";

import { Lightbulb, LightbulbOff } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type WakeLockSentinelLike = { release: () => Promise<void>; addEventListener: (type: "release", listener: () => void) => void };
type NavigatorWithWakeLock = Navigator & { wakeLock?: { request: (type: "screen") => Promise<WakeLockSentinelLike> } };

function subscribeToSupport(): () => void {
  return () => undefined;
}

function getSupportSnapshot(): boolean {
  return Boolean((navigator as NavigatorWithWakeLock).wakeLock);
}

function getServerSupportSnapshot(): boolean {
  return true;
}

export function WakeLockButton() {
  const [active, setActive] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);
  const sentinelRef = useRef<WakeLockSentinelLike | null>(null);
  const supported = useSyncExternalStore(subscribeToSupport, getSupportSnapshot, getServerSupportSnapshot);

  useEffect(() => {
    return () => { void sentinelRef.current?.release(); };
  }, []);

  async function toggleWakeLock() {
    if (sentinelRef.current) {
      await sentinelRef.current.release();
      sentinelRef.current = null;
      setActive(false);
      return;
    }
    try {
      const wakeLock = (navigator as NavigatorWithWakeLock).wakeLock;
      if (!wakeLock) { setRequestFailed(true); return; }
      const sentinel = await wakeLock.request("screen");
      sentinelRef.current = sentinel;
      sentinel.addEventListener("release", () => { sentinelRef.current = null; setActive(false); });
      setActive(true);
    } catch {
      setRequestFailed(true);
    }
  }

  if (!supported || requestFailed) {
    return <p className="compatibility-note"><LightbulbOff aria-hidden="true" size={18} /> Tu navegador no permite mantener la pantalla activa. Puedes ampliar el tiempo de bloqueo en los ajustes del móvil.</p>;
  }

  return (
    <button type="button" className="secondary-button" onClick={toggleWakeLock} aria-pressed={active}>
      <Lightbulb aria-hidden="true" size={19} />{active ? "Pantalla activa" : "Mantener pantalla activa"}
    </button>
  );
}
