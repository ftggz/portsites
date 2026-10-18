import Link from "next/link";
import { Fragment } from "react";

import { DemoWhatsApp } from "@/components/demo-whatsapp";
import { conceito } from "@/content/landing";
import type { ImageCredit } from "@/lib/images";

type NavItem = { readonly label: string; readonly href: string };

type ClinicaFooterProps = {
  marca: string;
  nav: readonly NavItem[];
  rodape: {
    readonly local: readonly string[];
    readonly navegacao: string;
    readonly contato: string;
    readonly whatsapp: string;
    readonly atendimento: string;
    readonly legal: string;
    readonly creditos: string;
  };
  credits: readonly ImageCredit[];
  avisoId: string;
};

export function ClinicaFooter({ marca, nav, rodape, credits, avisoId }: ClinicaFooterProps) {
  const [nome, ...local] = rodape.local;
  return (
    <footer className="vagar-footer on-field-3">
      <div className="vagar-footer__cols">
        <div>
          <p>{nome}</p>
          {local.map((linha) => (
            <p key={linha} className="vagar-footer__soft">
              {linha}
            </p>
          ))}
        </div>
        <nav aria-label={rodape.navegacao}>
          <p>{rodape.navegacao}</p>
          <ul className="vagar-footer__soft">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p>{rodape.contato}</p>
          <ul className="vagar-footer__soft">
            <li>
              <DemoWhatsApp id={avisoId} withNotice={false} label={rodape.whatsapp} className="vagar-link" />
            </li>
            <li>{rodape.atendimento}</li>
          </ul>
        </div>
      </div>

      <p className="vagar-footer__wordmark" aria-hidden="true">
        {marca}
      </p>

      <div className="vagar-footer__legal">
        <p>
          {rodape.legal}{" "}
          <Link href={conceito.voltarHref} className="underline">
            {conceito.voltar}
          </Link>
        </p>
        <p>
          {rodape.creditos}{" "}
          {credits.map((credit, index) => (
            <Fragment key={credit.url}>
              {index > 0 ? ", " : null}
              <a href={credit.url} target="_blank" rel="noopener noreferrer" className="underline">
                {credit.author}
              </a>
            </Fragment>
          ))}
        </p>
      </div>
    </footer>
  );
}
