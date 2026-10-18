import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/landing/site-footer";
import { SkipLink } from "@/components/skip-link";
import { landing, site } from "@/content/landing";

const { privacidade } = landing;

export const metadata: Metadata = {
  title: { absolute: privacidade.meta.title },
  description: privacidade.meta.description,
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacidadePage() {
  return (
    <>
      <SkipLink label={landing.pularLink} />
      <header className="flex items-baseline justify-between gap-s4 px-margin pt-s5">
        <Link href="/" className="font-display leading-none font-medium no-underline">
          {site.marca}
        </Link>
        <Link href="/" className="text-small underline">
          {privacidade.voltar}
        </Link>
      </header>
      <main id="conteudo" className="px-margin py-section md:grid md:grid-cols-12 md:gap-x-gutter">
        <div className="md:col-span-7 md:col-start-4">
          <h1 className="m-0 text-head leading-[1.02] font-light tracking-(--tracking-display)">{privacidade.titulo}</h1>
          <p className="m-0 mt-s4 text-small text-muted-foreground">{privacidade.atualizada}</p>
          <div className="mt-s8 grid gap-s7">
            {privacidade.secoes.map((secao) => (
              <section key={secao.titulo} className="grid gap-s3">
                <h2 className="m-0 text-lead leading-tight font-normal">{secao.titulo}</h2>
                {secao.paragrafos.map((paragrafo) => (
                  <p key={paragrafo} className="m-0 max-w-[62ch]">
                    {paragrafo}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
