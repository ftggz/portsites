import Link from "next/link";
import { Fragment } from "react";

import { DemoWhatsApp } from "@/components/demo-whatsapp";
import { conceito } from "@/content/landing";
import type { ImageCredit } from "@/lib/images";

type NavItem = { readonly label: string; readonly href: string };

type OficinaFooterProps = {
  marca: string;
  nav: readonly NavItem[];
  rodape: {
    readonly navegacao: string;
    readonly contato: string;
    readonly whatsapp: string;
    readonly local: string;
    readonly legal: string;
    readonly creditos: string;
    readonly topo: string;
    readonly medidas: readonly string[];
  };
  credits: readonly ImageCredit[];
  avisoId: string;
};

const DEGRAUS = 8;

// Cada letra do nome vira um bloco; as alturas sobem da primeira à última, como num jogo de
// chaves, e cada bloco leva gravada uma medida de soquete.
function blocks(marca: string, medidas: readonly string[]) {
  const palavras = marca.toLocaleUpperCase("pt-BR").split(/\s+/).filter(Boolean);
  const total = palavras.reduce((sum, palavra) => sum + [...palavra].length, 0);
  let index = 0;
  return palavras.map((palavra, palavraIndex) => ({
    palavra: palavraIndex,
    letras: [...palavra].map((letra) => {
      const degrau = total > 1 ? Math.round((index / (total - 1)) * (DEGRAUS - 1)) + 1 : DEGRAUS;
      const medida = medidas[index];
      index += 1;
      return { letra, degrau, medida, chave: `${palavraIndex}-${index}` };
    }),
  }));
}

export function OficinaFooter({ marca, nav, rodape, credits, avisoId }: OficinaFooterProps) {
  return (
    <footer className="claras-footer">
      <div className="claras-mark" aria-hidden="true">
        {blocks(marca, rodape.medidas).map((grupo) => (
          <Fragment key={grupo.palavra}>
            {grupo.palavra > 0 ? <span className="claras-mark__space" /> : null}
            {grupo.letras.map((item) => (
              <span key={item.chave} className="claras-mark__block" data-word={grupo.palavra} data-step={item.degrau}>
                {item.medida ? <span className="claras-mark__size">{item.medida}</span> : null}
                {item.letra}
              </span>
            ))}
          </Fragment>
        ))}
      </div>

      <div className="claras-footer__cols">
        <nav aria-label={rodape.navegacao} className="claras-footer__col">
          <p className="claras-footer__label">{rodape.navegacao}</p>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="claras-footer__col">
          <p className="claras-footer__label">{rodape.contato}</p>
          <ul>
            <li>
              <DemoWhatsApp id={avisoId} withNotice={false} label={rodape.whatsapp} className="claras-link" />
            </li>
            <li>{rodape.local}</li>
          </ul>
        </div>
        <div className="claras-footer__col claras-footer__credits">
          <p>
            {rodape.creditos}{" "}
            {credits.map((credit, index) => (
              <Fragment key={credit.url}>
                {index > 0 ? ", " : null}
                <a href={credit.url} target="_blank" rel="noopener noreferrer">
                  {credit.author}
                </a>
              </Fragment>
            ))}
          </p>
        </div>
      </div>

      <div className="claras-footer__legal">
        <p>
          {rodape.legal} <Link href={conceito.voltarHref}>{conceito.voltar}</Link>
        </p>
        <a href="#topo" className="claras-footer__top">
          {rodape.topo}
        </a>
      </div>
    </footer>
  );
}
