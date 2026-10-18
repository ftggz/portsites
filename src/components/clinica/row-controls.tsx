"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

type RowControlsProps = {
  targetId: string;
  previousLabel: string;
  nextLabel: string;
};

// Botões de voltar e avançar da faixa horizontal. Ficam focáveis nas pontas (aria-disabled)
// para o foco do teclado não se perder quando a faixa chega ao fim.
export function RowControls({ targetId, previousLabel, nextLabel }: RowControlsProps) {
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const row = document.getElementById(targetId);
    if (!row) return;
    const update = () =>
      setEdges({
        start: row.scrollLeft <= 4,
        end: row.scrollLeft + row.clientWidth >= row.scrollWidth - 4,
      });
    // Mede as pontas já ao montar: numa tela muito larga a faixa inteira cabe e não há o que rolar.
    const frame = requestAnimationFrame(update);
    row.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      row.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  function move(direction: 1 | -1) {
    const row = document.getElementById(targetId);
    const item = row?.querySelector("li");
    const list = row?.querySelector("ol");
    if (!row || !item || !list) return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollBy({ left: direction * (item.getBoundingClientRect().width + gap), behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className="vagar-steps__controls">
      <button
        type="button"
        aria-label={previousLabel}
        aria-controls={targetId}
        aria-disabled={edges.start || undefined}
        onClick={() => move(-1)}
      >
        <ArrowLeft aria-hidden="true" size={20} strokeWidth={1.75} />
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        aria-controls={targetId}
        aria-disabled={edges.end || undefined}
        onClick={() => move(1)}
      >
        <ArrowRight aria-hidden="true" size={20} strokeWidth={1.75} />
      </button>
    </div>
  );
}
