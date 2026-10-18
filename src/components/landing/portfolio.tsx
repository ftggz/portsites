import Link from "next/link";

import { ArtDirectedImage } from "@/components/site-image";
import type { ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

type Projeto = {
  readonly slug: string;
  readonly nome: readonly [string, string];
  readonly nicho: string;
  readonly descricao: string;
  readonly href: string;
  readonly imagens: { readonly computador: ImageKey; readonly celular: ImageKey };
};

type PortfolioProps = {
  titulo: string;
  etiqueta: string;
  linkLabel: string;
  projetos: readonly Projeto[];
};

// Cada bloco tem uma altura diferente para o ritmo mudar sem mudar a estrutura.
const visualHeights = ["md:h-[80svh]", "md:h-[60svh]", "md:h-[90svh]"];

// Até 64rem a coluna grande é estreita e alta, e o print de celular cabe nela sem cortar a lateral.
const wideScreen = "(min-width: 64rem)";

export function Portfolio({ titulo, etiqueta, linkLabel, projetos }: PortfolioProps) {
  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="overflow-x-clip py-section">
      <h2
        id="portfolio-title"
        className="reveal m-0 mb-s8 px-margin text-head leading-[1.02] font-light tracking-(--tracking-display) md:mb-[7.5rem]"
      >
        {titulo}
      </h2>
      <div className="grid gap-y-[5.5rem] md:gap-y-[8.75rem]">
        {projetos.map((projeto, index) => (
          <article
            key={projeto.slug}
            aria-labelledby={`projeto-${projeto.slug}`}
            className="grid gap-y-s5 md:grid-cols-12 md:items-end md:gap-x-gutter md:pr-margin"
          >
            <Link
              href={projeto.href}
              tabIndex={-1}
              aria-hidden="true"
              className={cn(
                "portfolio-visual relative block aspect-[4/5] overflow-hidden bg-surface md:col-span-7 md:aspect-auto",
                visualHeights[index % visualHeights.length],
              )}
            >
              <ArtDirectedImage
                mobile={projeto.imagens.celular}
                desktop={projeto.imagens.computador}
                media={wideScreen}
                alt=""
                sizes="(min-width: 48rem) 58vw, 100vw"
                className="reveal-settle absolute inset-0"
                imgClassName="h-full w-full object-cover object-left-top"
              />
            </Link>
            <div className="grid content-end gap-s4 px-margin md:col-span-4 md:col-start-9 md:px-0">
              <ArtDirectedImage
                mobile={projeto.imagens.computador}
                desktop={projeto.imagens.celular}
                media={wideScreen}
                alt=""
                sizes="(min-width: 64rem) 12vw, (min-width: 48rem) 30vw, 70vw"
                className="ml-auto block w-[70%] bg-surface md:ml-0 md:w-full lg:w-[36%]"
                imgClassName="h-auto w-full"
              />
              <h3
                id={`projeto-${projeto.slug}`}
                className="m-0 mt-s3 text-lead leading-[1.02] font-light tracking-(--tracking-display)"
              >
                {projeto.nome[0]}
                <br />
                {projeto.nome[1]}
              </h3>
              <p className="m-0 text-small text-muted-foreground">
                {projeto.nicho} · {etiqueta}
              </p>
              <p className="m-0 max-w-[40ch]">{projeto.descricao}</p>
              <Link href={projeto.href} className="justify-self-start underline hover:decoration-2">
                {linkLabel}
                <span className="sr-only">: {projeto.nome.join(" ")}</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
