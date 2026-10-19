import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { landing, site } from "@/content/landing";
import { contactHref, type ContactKind } from "@/lib/contato";

const WORDMARK_STEPS = [4, 6, 8, 9, 11, 15, 24] as const;

export function SiteFooter() {
  const { rodape } = landing;
  const letters = [...site.marca].length;
  const wordmarkSize = WORDMARK_STEPS.find((max) => letters <= max) ?? WORDMARK_STEPS[WORDMARK_STEPS.length - 1];
  return (
    <footer className="on-field-1 relative flex min-h-svh flex-col overflow-hidden">
      <div className="grid gap-s7 px-margin pt-s8 md:grid-cols-12 md:gap-x-gutter">
        <div className="grid justify-items-start gap-s6 md:col-span-7">
          <p className="m-0 text-head leading-[0.95] font-light tracking-(--tracking-display)">
            {rodape.convite[0]}
            <br />
            {rodape.convite[1]}
          </p>
          <a href={rodape.cta.href} className={buttonVariants({ variant: "inverse", size: "lg" })}>
            {rodape.cta.label}
          </a>
        </div>
        <div className="md:col-span-3 md:col-start-10">
          <h2 className="m-0 mb-s3 text-small font-medium">{rodape.contatosLabel}</h2>
          <ul className="m-0 grid list-none gap-s2 p-0">
            {rodape.contatos.map((contato) => {
              const href = contactHref(contato.kind as ContactKind, contato.valor);
              return (
                <li key={contato.label}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
                      {contato.label}
                    </a>
                  ) : (
                    <span>
                      {contato.label} {contato.valor}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="m-0 mt-s3">{rodape.atendimento}</p>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap justify-between gap-x-s6 gap-y-s2 px-margin pt-s8 pb-s3 text-small">
        <p className="m-0">
          {rodape.copyright}. {site.documento}
        </p>
        <Link href={rodape.politica.href} className="underline">
          {rodape.politica.label}
        </Link>
      </div>
      <p className="footer-wordmark m-0" data-size={wordmarkSize} aria-hidden="true">
        {site.marca}
      </p>
    </footer>
  );
}
