"use client";

import { useEffect, useRef, type ReactNode } from "react";

type DragRowProps = {
  labelledBy: string;
  className?: string;
  children: ReactNode;
};

// Faixa que rola para o lado com o dedo, o trackpad e as setas do teclado (ela recebe foco).
// Com o mouse, o script deixa arrastar também.
export function DragRow({ labelledBy, className, children }: DragRowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = ref.current;
    if (!row) return;
    let start: { x: number; left: number } | null = null;

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      start = { x: event.clientX, left: row.scrollLeft };
      row.setPointerCapture(event.pointerId);
      row.dataset.dragging = "";
    };
    const onMove = (event: PointerEvent) => {
      if (start) row.scrollLeft = start.left - (event.clientX - start.x);
    };
    const onEnd = (event: PointerEvent) => {
      if (!start) return;
      start = null;
      if (row.hasPointerCapture(event.pointerId)) row.releasePointerCapture(event.pointerId);
      delete row.dataset.dragging;
    };
    const onDragStart = (event: DragEvent) => event.preventDefault();

    row.addEventListener("pointerdown", onDown);
    row.addEventListener("pointermove", onMove);
    row.addEventListener("pointerup", onEnd);
    row.addEventListener("pointercancel", onEnd);
    row.addEventListener("dragstart", onDragStart);
    return () => {
      row.removeEventListener("pointerdown", onDown);
      row.removeEventListener("pointermove", onMove);
      row.removeEventListener("pointerup", onEnd);
      row.removeEventListener("pointercancel", onEnd);
      row.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return (
    <div ref={ref} role="region" aria-labelledby={labelledBy} tabIndex={0} className={className}>
      {children}
    </div>
  );
}
