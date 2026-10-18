"use client";

import { Camera } from "lucide-react";
import { useLayoutEffect, useRef, useState, type MouseEvent } from "react";

import { DemoWhatsApp } from "@/components/demo-whatsapp";
import { SiteImage } from "@/components/site-image";
import { fillTemplate } from "@/lib/contato";
import type { ImageKey } from "@/lib/images";

type Mensagem = {
  readonly id: string;
  readonly de: "oficina" | "voce";
  readonly hora: string;
  readonly texto: string;
  readonly imagem?: { readonly key: ImageKey; readonly alt: string };
};

type FollowServiceProps = {
  titulo: string;
  intro: string;
  servico: string;
  oficina: string;
  voce: string;
  foto: string;
  legenda: string;
  cta: string;
  mensagens: readonly Mensagem[];
  avisoId: string;
};

export function FollowService({
  titulo,
  intro,
  servico,
  oficina,
  voce,
  foto,
  legenda,
  cta,
  mensagens,
  avisoId,
}: FollowServiceProps) {
  const comFoto = mensagens.filter((mensagem) => mensagem.imagem);
  const [ativa, setAtiva] = useState(comFoto[0]?.id);
  const anchor = useRef<{ element: HTMLElement; top: number } | null>(null);
  const inlineRef = useRef<HTMLElement>(null);
  const atual = comFoto.find((mensagem) => mensagem.id === ativa);

  // No celular a foto abre logo abaixo da mensagem. Quando a anterior fecha mais acima, a página
  // volta o mesmo tanto, para a mensagem tocada não sair de baixo do dedo; depois rola só o
  // necessário para a foto nova aparecer inteira.
  useLayoutEffect(() => {
    const saved = anchor.current;
    anchor.current = null;
    if (!saved) return;
    const delta = saved.element.getBoundingClientRect().top - saved.top;
    if (Math.abs(delta) > 1) window.scrollBy(0, delta);
    const figure = inlineRef.current;
    if (figure && figure.offsetParent !== null) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      figure.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
    }
  }, [ativa]);

  function choose(id: string, event: MouseEvent<HTMLButtonElement>) {
    anchor.current = { element: event.currentTarget, top: event.currentTarget.getBoundingClientRect().top };
    setAtiva(id);
  }

  return (
    <section aria-labelledby="acompanhe-title" className="claras-follow">
      <div className="claras-follow__head">
        <h2 id="acompanhe-title">{titulo}</h2>
        <p>{intro}</p>
      </div>

      <div className="claras-follow__chat">
        <p id="acompanhe-servico" className="claras-follow__contact">
          <span>{oficina}</span>
          <span className="claras-follow__service">{servico}</span>
        </p>
        <ol className="claras-follow__thread" aria-labelledby="acompanhe-servico">
          {mensagens.map((mensagem) => {
            const pressed = mensagem.id === ativa;
            const meta = (
              <span className="claras-msg__meta">
                <span>{mensagem.de === "voce" ? voce : oficina}</span>
                <span className="claras-msg__time">
                  {mensagem.imagem ? (
                    <span className="claras-msg__photo">
                      <Camera aria-hidden="true" size={14} strokeWidth={2} />
                      {foto}
                    </span>
                  ) : null}
                  <span className="tabular">{mensagem.hora}</span>
                </span>
              </span>
            );
            return (
              <li key={mensagem.id} data-from={mensagem.de}>
                {mensagem.imagem ? (
                  <button
                    type="button"
                    className="claras-msg"
                    aria-pressed={pressed}
                    onClick={(event) => choose(mensagem.id, event)}
                  >
                    {meta}
                    <span className="claras-msg__text">{mensagem.texto}</span>
                  </button>
                ) : (
                  <div className="claras-msg">
                    {meta}
                    <span className="claras-msg__text">{mensagem.texto}</span>
                  </div>
                )}
                {mensagem.imagem && pressed ? (
                  <figure ref={inlineRef} className="claras-follow__inline">
                    <SiteImage image={mensagem.imagem.key} alt={mensagem.imagem.alt} sizes="100vw" />
                    <figcaption>{fillTemplate(legenda, { hora: mensagem.hora })}</figcaption>
                  </figure>
                ) : null}
              </li>
            );
          })}
        </ol>
        <DemoWhatsApp id={avisoId} withNotice={false} label={cta} className="claras-follow__cta" />
      </div>

      <figure className="claras-follow__photo">
        {/* Leitores de tela ouvem a troca de foto, que no desktop acontece longe do botão. */}
        <p className="sr-only" aria-live="polite">
          {atual?.imagem?.alt}
        </p>
        {comFoto.map((mensagem) =>
          mensagem.imagem ? (
            <div
              key={mensagem.id}
              className="claras-follow__frame"
              data-active={mensagem.id === ativa}
              aria-hidden={mensagem.id === ativa ? undefined : true}
            >
              <SiteImage image={mensagem.imagem.key} alt={mensagem.imagem.alt} sizes="(min-width: 64rem) 58vw, 50vw" />
            </div>
          ) : null,
        )}
        {atual ? (
          <figcaption className="claras-follow__caption">{fillTemplate(legenda, { hora: atual.hora })}</figcaption>
        ) : null}
      </figure>
    </section>
  );
}
