import type { ComponentProps } from "react";

import { ComandaWhatsApp } from "@/components/pizzaria/comanda-whatsapp";
import { SiteImage } from "@/components/site-image";
import { buttonVariants } from "@/components/ui/button";
import type { ImageKey } from "@/lib/images";

type Item = { readonly pergunta: string; readonly resposta: string };

type FaqProps = {
  titulo: string;
  fatos: readonly string[];
  itens: readonly Item[];
  botao: string;
  mandar: ComponentProps<typeof ComandaWhatsApp>["mandar"];
  link: { readonly label: string; readonly href: string };
  imagem: { readonly key: ImageKey; readonly alt: string };
  avisoId: string;
};

export function Faq({ titulo, fatos, itens, botao, mandar, link, imagem, avisoId }: FaqProps) {
  return (
    <section id="perguntas" data-palco="perguntas" aria-labelledby="perguntas-titulo" className="forno-faq">
      {/* No celular e no tablet a foto do forno vem aqui; no desktop ela fica na metade parada. */}
      <SiteImage image={imagem.key} alt={imagem.alt} sizes="100vw" className="forno-faq__photo" />
      <h2 id="perguntas-titulo" className="forno-heading">
        {titulo}
      </h2>
      <ul className="forno-faq__facts">
        {fatos.map((fato) => (
          <li key={fato}>{fato}</li>
        ))}
      </ul>
      <div className="forno-faq__list">
        {itens.map((item) => (
          <details key={item.pergunta} className="forno-faq__item">
            <summary>
              {item.pergunta}
              <span className="forno-chevron" aria-hidden="true" />
            </summary>
            <p>{item.resposta}</p>
          </details>
        ))}
      </div>
      <div className="forno-faq__actions">
        <ComandaWhatsApp avisoId={avisoId} label={botao} mandar={mandar} className={buttonVariants({ shape: "pill" })} />
        <a href={link.href} className="forno-link">
          {link.label}
        </a>
      </div>
    </section>
  );
}
