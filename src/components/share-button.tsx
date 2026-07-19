"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

type ShareButtonProps = { title: string; text: string };

export function ShareButton({ title, text }: ShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url: window.location.href });
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2500);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("error");
    }
  }

  return (
    <button type="button" className="secondary-button" onClick={share}>
      {status === "copied" ? <Check aria-hidden="true" size={19} /> : <Share2 aria-hidden="true" size={19} />}
      {status === "copied" ? "Enlace copiado" : status === "error" ? "No se pudo copiar" : "Compartir"}
    </button>
  );
}
