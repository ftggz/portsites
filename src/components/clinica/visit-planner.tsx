"use client";

import { useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { fillTemplate } from "@/lib/contato";
import { formatDuration, formatMinutes, formatPrice, type DurationUnits } from "@/lib/format";
import { cn } from "@/lib/utils";

type CuidadoAntes = {
  readonly dias: number;
  readonly quando: string;
  readonly prazo?: string;
  readonly texto: string;
};

type Procedimento = {
  readonly id: string;
  readonly nome: string;
  readonly minutos: number;
  readonly preco: number;
  readonly descricao: string;
  readonly antes: CuidadoAntes;
  readonly depois: string;
  readonly aoMarcar?: string;
};

type Grupo = { readonly nome: string; readonly itens: readonly Procedimento[] };

type Visita = {
  readonly titulo: string;
  readonly vazio: string;
  readonly total: string;
  readonly contagem: { readonly um: string; readonly varios: string };
  readonly escala: { readonly minutos: number; readonly legenda: string };
  readonly valor: string;
  readonly antecedencia: string;
  readonly longa: { readonly minutos: number; readonly texto: string };
  readonly conflitos: readonly { readonly ids: readonly string[]; readonly texto: string }[];
  readonly cta: string;
  readonly ctaVazio: string;
  readonly limpar: string;
  readonly verVisita: string;
  readonly voltarLista: string;
  readonly cuidadosTitulo: string;
  readonly aoMarcar: string;
  readonly depois: string;
  readonly mensagem: { readonly rotulo: string; readonly modelo: string };
  readonly inicial: readonly string[];
};

type Aviso = { readonly titulo: string; readonly texto: string; readonly fechar: string };

type VisitPlannerProps = {
  grupos: readonly Grupo[];
  nota: string;
  escolhaLabel: string;
  cuidados: string;
  antes: string;
  depois: string;
  visita: Visita;
  aviso: Aviso;
  unidades: DurationUnits;
  moeda: string;
};

type Linha = { readonly texto: string; readonly origem: string };

const AVISO_ID = "aviso-visita";
const GAP = 4;

function lowerFirst(text: string): string {
  return text.charAt(0).toLocaleLowerCase("pt-BR") + text.slice(1);
}

// Junta as linhas iguais (dois procedimentos que pedem "beba água") e guarda de onde cada uma veio.
function mergeLines(lines: readonly Linha[]): Linha[] {
  const merged = new Map<string, string[]>();
  for (const line of lines) merged.set(line.texto, [...(merged.get(line.texto) ?? []), line.origem]);
  return [...merged].map(([texto, origens]) => ({ texto, origem: origens.join(", ") }));
}

export function VisitPlanner({
  grupos,
  nota,
  escolhaLabel,
  cuidados,
  antes,
  depois,
  visita,
  aviso,
  unidades,
  moeda,
}: VisitPlannerProps) {
  const [selected, setSelected] = useState<ReadonlySet<string>>(() => new Set(visita.inicial));
  const popoverRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const chosen = grupos.flatMap((grupo) => grupo.itens).filter((item) => selected.has(item.id));
  const minutes = chosen.reduce((sum, item) => sum + item.minutos, 0);
  const price = chosen.reduce((sum, item) => sum + item.preco, 0);
  const duration = formatDuration(minutes, unidades);
  const count = `${chosen.length} ${chosen.length === 1 ? visita.contagem.um : visita.contagem.varios}`;

  const lead = chosen.reduce<CuidadoAntes | null>(
    (longest, item) => (item.antes.dias > (longest?.dias ?? 0) ? item.antes : longest),
    null,
  );
  const conflicts = visita.conflitos.filter((conflito) => conflito.ids.every((id) => selected.has(id)));

  const atBooking = mergeLines(
    chosen.flatMap((item) => (item.aoMarcar ? [{ texto: item.aoMarcar, origem: item.nome }] : [])),
  );
  const beforeGroups = [...new Set(chosen.map((item) => item.antes.dias))]
    .sort((a, b) => b - a)
    .map((dias) => {
      const items = chosen.filter((item) => item.antes.dias === dias);
      return {
        dias,
        quando: items[0]?.antes.quando ?? "",
        linhas: mergeLines(items.map((item) => ({ texto: item.antes.texto, origem: item.nome }))),
      };
    });
  const afterLines = mergeLines(chosen.map((item) => ({ texto: item.depois, origem: item.nome })));

  const scale = Math.max(visita.escala.minutos, minutes);
  const segments = chosen.map((item, index) => ({
    id: item.id,
    x: chosen.slice(0, index).reduce((sum, previous) => sum + previous.minutos, 0),
    width: Math.max(item.minutos - GAP, 1),
  }));

  const names = new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction" }).format(
    chosen.map((item) => lowerFirst(item.nome)),
  );
  const message = fillTemplate(visita.mensagem.modelo, { procedimentos: names, tempo: duration });

  function toggle(id: string, on: boolean) {
    setSelected((current) => {
      const next = new Set(current);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function openNotice() {
    popoverRef.current?.showPopover();
    closeRef.current?.focus();
  }

  return (
    <div className="vagar-planner">
      <fieldset id="lista-procedimentos" className="vagar-planner__list">
        <legend className="sr-only">{escolhaLabel}</legend>
        <p className="vagar-planner__note">{nota}</p>
        {grupos.map((grupo) => (
          <div key={grupo.nome} className="vagar-group">
            <h3 className="vagar-group__name">{grupo.nome}</h3>
            <ul className="vagar-group__list">
              {grupo.itens.map((item) => {
                const id = `procedimento-${item.id}`;
                const time = formatMinutes(item.minutos, unidades);
                const cost = formatPrice(item.preco, moeda);
                return (
                  <li key={item.id} className="vagar-proc">
                    <input
                      type="checkbox"
                      id={id}
                      className="vagar-check"
                      checked={selected.has(item.id)}
                      onChange={(event) => toggle(item.id, event.target.checked)}
                      aria-label={`${item.nome}, ${time}, ${cost}`}
                      aria-describedby={`${id}-descricao`}
                    />
                    <label htmlFor={id} className="vagar-proc__label">
                      <span className="vagar-proc__time tabular">{time}</span>
                      <span className="vagar-proc__name">{item.nome}</span>
                      <span className="vagar-proc__price tabular">{cost}</span>
                    </label>
                    <p id={`${id}-descricao`} className="vagar-proc__desc">
                      {item.descricao}
                    </p>
                    <details className="vagar-proc__care">
                      <summary>
                        {cuidados}
                        <span className="sr-only"> {item.nome}</span>
                      </summary>
                      <dl>
                        {item.aoMarcar ? (
                          <>
                            <dt>{visita.aoMarcar}</dt>
                            <dd>{item.aoMarcar}</dd>
                          </>
                        ) : null}
                        <dt>{antes}</dt>
                        <dd>
                          {item.antes.quando}. {item.antes.texto}
                        </dd>
                        <dt>{depois}</dt>
                        <dd>{item.depois}</dd>
                      </dl>
                    </details>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {chosen.length ? (
          <a href="#sua-visita" className="vagar-planner__bar">
            <span className="tabular">{duration}</span>
            <span className="vagar-planner__bar-count">{count}</span>
            <span className="underline">{visita.verVisita}</span>
          </a>
        ) : null}
      </fieldset>

      <aside id="sua-visita" aria-labelledby="sua-visita-titulo" className="vagar-planner__visit on-field-1">
        <h3 id="sua-visita-titulo" className="m-0 text-lead font-normal">
          {visita.titulo}
        </h3>
        <p className="vagar-visit__total" aria-live="polite">
          {chosen.length ? (
            <>
              <span className="vagar-visit__time tabular">{duration}</span>
              <span className="block text-small">
                {visita.total}, {count}
              </span>
            </>
          ) : (
            <span className="block">{visita.vazio}</span>
          )}
        </p>
        {/* O botão vem logo abaixo do total para continuar à vista mesmo com muitos itens. */}
        <div className="vagar-visit__actions">
          <button type="button" className={buttonVariants()} onClick={openNotice} aria-haspopup="dialog">
            {chosen.length ? visita.cta : visita.ctaVazio}
          </button>
          {chosen.length > 1 ? (
            <button type="button" className="vagar-link" onClick={() => setSelected(new Set())}>
              {visita.limpar}
            </button>
          ) : null}
          <a href="#lista-procedimentos" className="vagar-link vagar-visit__back">
            {visita.voltarLista}
          </a>
        </div>
        {chosen.length ? (
          <>
            <div className="vagar-visit__scale">
              {/* A barra mede a visita contra um dia de atendimento; cada trecho é um procedimento. */}
              <svg
                className="vagar-visit__bar"
                viewBox={`0 0 ${scale} 10`}
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <rect className="vagar-visit__track" x="0" y="0" width={scale} height="10" />
                {segments.map((segment) => (
                  <rect
                    key={segment.id}
                    className="vagar-visit__segment"
                    x={segment.x}
                    y="0"
                    width={segment.width}
                    height="10"
                  />
                ))}
              </svg>
              <p className="m-0 text-small">{visita.escala.legenda}</p>
            </div>
            <p className="vagar-visit__items">{names.charAt(0).toLocaleUpperCase("pt-BR") + names.slice(1)}</p>
            <p className="m-0 text-small">
              {visita.valor} <span className="tabular">{formatPrice(price, moeda)}</span>
            </p>
            {lead?.prazo ? <p className="vagar-visit__note">{fillTemplate(visita.antecedencia, { prazo: lead.prazo })}</p> : null}
            {minutes > visita.longa.minutos ? <p className="vagar-visit__note">{visita.longa.texto}</p> : null}
            {conflicts.map((conflito) => (
              <p key={conflito.texto} className="vagar-visit__note">
                {conflito.texto}
              </p>
            ))}
          </>
        ) : null}
      </aside>

      {chosen.length ? (
        <section aria-labelledby="cuidados-titulo" className="vagar-planner__care">
          <h3 id="cuidados-titulo" className="m-0 text-lead font-normal">
            {visita.cuidadosTitulo}
          </h3>
          <ol className="vagar-timeline">
            {atBooking.length ? (
              <li>
                <h4>{visita.aoMarcar}</h4>
                <ul>
                  {atBooking.map((linha) => (
                    <li key={linha.texto}>
                      {linha.texto} <span className="vagar-timeline__origin">{linha.origem}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ) : null}
            {beforeGroups.map((grupo) => (
              <li key={grupo.dias}>
                <h4>{grupo.quando}</h4>
                <ul>
                  {grupo.linhas.map((linha) => (
                    <li key={linha.texto}>
                      {linha.texto} <span className="vagar-timeline__origin">{linha.origem}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li>
              <h4>{visita.depois}</h4>
              <ul>
                {afterLines.map((linha) => (
                  <li key={linha.texto}>
                    {linha.texto} <span className="vagar-timeline__origin">{linha.origem}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ol>
        </section>
      ) : null}

      <div
        ref={popoverRef}
        id={AVISO_ID}
        popover="auto"
        role="dialog"
        aria-labelledby={`${AVISO_ID}-titulo`}
        className="demo-popover"
      >
        <p id={`${AVISO_ID}-titulo`} className="m-0 font-display text-lead leading-tight">
          {aviso.titulo}
        </p>
        {chosen.length ? (
          <>
            <p className="mt-s2 mb-0 text-small">{visita.mensagem.rotulo}</p>
            <blockquote className="vagar-message">{message}</blockquote>
          </>
        ) : null}
        <p className="mt-s2 mb-0">{aviso.texto}</p>
        <button
          ref={closeRef}
          type="button"
          popoverTarget={AVISO_ID}
          popoverTargetAction="hide"
          className={cn(buttonVariants({ size: "sm" }), "mt-s4")}
        >
          {aviso.fechar}
        </button>
      </div>
    </div>
  );
}
