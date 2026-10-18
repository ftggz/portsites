"use client";

import { useRef, useState, type FormEvent } from "react";

import { buttonVariants } from "@/components/ui/button";
import { fillTemplate } from "@/lib/contato";
import { cn } from "@/lib/utils";

type Campo = { readonly label: string; readonly exemplo: string };

type QuoteFormProps = {
  campos: { readonly carro: Campo; readonly problema: Campo };
  enviar: string;
  mensagem: { readonly comCarro: string; readonly semCarro: string };
  mensagemRotulo: string;
  nota: string;
  aviso: { readonly titulo: string; readonly texto: string; readonly fechar: string };
};

const AVISO_ID = "aviso-orcamento";
const NOTA_ID = "orcamento-nota";
const LIMITE_CARRO = 60;
const LIMITE_PROBLEMA = 140;

// O defeito entra como frase própria, com a primeira letra maiúscula e ponto final se faltar.
function asSentence(text: string): string {
  const clean = text.trim().replace(/\s+/g, " ");
  if (!clean) return "";
  const capitalized = clean.charAt(0).toLocaleUpperCase("pt-BR") + clean.slice(1);
  return /[.!?]$/.test(capitalized) ? capitalized : `${capitalized}.`;
}

// Barra de três células; enviar mostra a mensagem que iria para o WhatsApp, que está desligado na demonstração.
export function QuoteForm({ campos, enviar, mensagem, mensagemRotulo, nota, aviso }: QuoteFormProps) {
  const [carro, setCarro] = useState("");
  const [problema, setProblema] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const carroLimpo = carro.trim().replace(/\s+/g, " ");
  const abertura = carroLimpo ? fillTemplate(mensagem.comCarro, { carro: carroLimpo }) : mensagem.semCarro;
  const message = [abertura, asSentence(problema)].filter(Boolean).join(" ");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    popoverRef.current?.showPopover();
    closeRef.current?.focus();
  }

  return (
    <form className="claras-quote" onSubmit={onSubmit} aria-describedby={NOTA_ID}>
      <div className="claras-quote__cell">
        <label htmlFor="orcamento-carro">{campos.carro.label}</label>
        <input
          id="orcamento-carro"
          name="carro"
          autoComplete="off"
          maxLength={LIMITE_CARRO}
          placeholder={campos.carro.exemplo}
          value={carro}
          onChange={(event) => setCarro(event.target.value)}
        />
      </div>
      <div className="claras-quote__cell">
        <label htmlFor="orcamento-problema">{campos.problema.label}</label>
        <input
          id="orcamento-problema"
          name="problema"
          autoComplete="off"
          maxLength={LIMITE_PROBLEMA}
          placeholder={campos.problema.exemplo}
          value={problema}
          onChange={(event) => setProblema(event.target.value)}
        />
      </div>
      <button type="submit" className="claras-quote__submit" aria-haspopup="dialog">
        {enviar}
      </button>
      <p id={NOTA_ID} className="claras-quote__note">
        {nota}
      </p>

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
        <p className="mt-s2 mb-0 text-small">{mensagemRotulo}</p>
        <blockquote className="claras-message">{message}</blockquote>
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
    </form>
  );
}
