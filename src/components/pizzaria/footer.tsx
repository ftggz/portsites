import Link from "next/link";
import { Fragment } from "react";

import { DemoWhatsApp } from "@/components/demo-whatsapp";
import { SiteImage } from "@/components/site-image";
import { conceito } from "@/content/landing";
import type { ImageCredit, ImageKey } from "@/lib/images";

type NavItem = { readonly label: string; readonly href: string };

type PizzariaFooterProps = {
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
    readonly imagem: ImageKey;
  };
  credits: readonly ImageCredit[];
  avisoId: string;
};

const STRIPES = 64;

export function PizzariaFooter({ marca, nav, rodape, credits, avisoId }: PizzariaFooterProps) {
  return (
    <footer className="forno-footer">
      {/* A listra do toldo volta, fina, antes do rodapé. */}
      <div className="forno-footer__stripe" aria-hidden="true">
        {Array.from({ length: STRIPES }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="forno-footer__body">
        <SiteImage image={rodape.imagem} alt="" sizes="(min-width: 64rem) 50vw, 100vw" className="forno-footer__photo" />
        <div className="forno-footer__menu on-field-1">
          <p className="forno-footer__brand">{marca}</p>
          <nav aria-label={rodape.navegacao}>
            <ul className="forno-footer__links">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="forno-footer__info">
            <div>
              <p className="forno-footer__label">{rodape.contato}</p>
              <ul>
                <li>
                  <DemoWhatsApp id={avisoId} withNotice={false} label={rodape.whatsapp} className="forno-link" />
                </li>
                <li>{rodape.local}</li>
              </ul>
            </div>
            <p className="forno-footer__credits">
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
          <div className="forno-footer__legal">
            <p>
              {rodape.legal} <Link href={conceito.voltarHref}>{conceito.voltar}</Link>
            </p>
            <a href="#topo">{rodape.topo}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
