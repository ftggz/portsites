import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

import { ComandaWhatsApp } from "@/components/pizzaria/comanda-whatsapp";

type HoursProps = {
  titulo: string;
  linhas: readonly string[];
  chamada: string;
  botao: string;
  mandar: ComponentProps<typeof ComandaWhatsApp>["mandar"];
  avisoId: string;
};

// Endereço e horário em linhas do tamanho de um letreiro, de uma borda à outra da página.
export function Hours({ titulo, linhas, chamada, botao, mandar, avisoId }: HoursProps) {
  return (
    <section id="horarios" aria-labelledby="horarios-titulo" className="forno-hours on-field-1">
      <h2 id="horarios-titulo" className="sr-only">
        {titulo}
      </h2>
      {linhas.map((linha) => (
        <p key={linha} className="forno-hours__row">
          {linha}
        </p>
      ))}
      <div className="forno-hours__row forno-hours__call">
        <span>{chamada}</span>
        <ComandaWhatsApp
          avisoId={avisoId}
          label={botao}
          mandar={mandar}
          className="forno-hours__button"
          icon={<ArrowRight aria-hidden="true" strokeWidth={1.75} />}
        />
      </div>
    </section>
  );
}
