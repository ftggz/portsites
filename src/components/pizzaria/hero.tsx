import type { ComponentProps } from "react";

import { ComandaWhatsApp } from "@/components/pizzaria/comanda-whatsapp";
import { OvenStatus } from "@/components/pizzaria/oven-status";
import { SiteImage } from "@/components/site-image";
import { buttonVariants } from "@/components/ui/button";
import type { ImageKey } from "@/lib/images";

type NavItem = { readonly label: string; readonly href: string };

type PizzariaHeroProps = {
  brand: { readonly nome: string };
  navLabel: string;
  nav: readonly NavItem[];
  titleLines: readonly [string, string];
  lead: string;
  cta: string;
  mandar: ComponentProps<typeof ComandaWhatsApp>["mandar"];
  horario: ComponentProps<typeof OvenStatus>["horario"];
  status: ComponentProps<typeof OvenStatus>["mensagens"];
  image: { readonly key: ImageKey; readonly alt: string };
  avisoId: string;
};

const AWNING_STRIPES = 32;

export function PizzariaHero({
  brand,
  navLabel,
  nav,
  titleLines,
  lead,
  cta,
  mandar,
  horario,
  status,
  image,
  avisoId,
}: PizzariaHeroProps) {
  return (
    <section aria-labelledby="pizzaria-title" data-palco="topo" className="forno-hero">
      {/* No celular e no tablet a foto do forno abre a página; no desktop ela é a metade parada da tela. */}
      <div className="forno-hero__photo">
        <SiteImage
          image={image.key}
          alt={image.alt}
          sizes="(min-width: 64rem) 50vw, 100vw"
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="forno-hero__card">
        <div className="awning" aria-hidden="true">
          {Array.from({ length: AWNING_STRIPES }, (_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="forno-hero__body rise-in">
          <p className="forno-hero__brand">{brand.nome}</p>
          <h1 id="pizzaria-title" className="forno-hero__title">
            {titleLines[0]}
            <br />
            {titleLines[1]}
          </h1>
          <p className="forno-hero__lead">{lead}</p>
          {/* O estado do forno vem antes do botão, porque decide se o pedido sai agora. */}
          <OvenStatus horario={horario} mensagens={status} className="forno-hero__status" />
          <ComandaWhatsApp
            avisoId={avisoId}
            label={cta}
            mandar={mandar}
            className={buttonVariants({ shape: "pill", size: "lg" })}
          />
        </div>
        <nav aria-label={navLabel} className="forno-hero__nav">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
