import type { ComponentProps } from "react";

import { VisitPlanner } from "@/components/clinica/visit-planner";

type ProceduresProps = {
  titulo: readonly [string, string];
  intro: string;
} & ComponentProps<typeof VisitPlanner>;

export function Procedures({ titulo, intro, ...planner }: ProceduresProps) {
  return (
    <section id="procedimentos" aria-labelledby="procedimentos-title" className="vagar-procs on-field-2">
      <h2 id="procedimentos-title" className="vagar-procs__title reveal">
        <span className="vagar-procs__indent">{titulo[0]}</span> {titulo[1]}
      </h2>
      <p className="vagar-procs__intro reveal">{intro}</p>
      <VisitPlanner {...planner} />
    </section>
  );
}
