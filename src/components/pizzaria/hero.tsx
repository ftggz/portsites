import { DemoWhatsApp } from "@/components/demo-whatsapp";
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
  status: string;
  image: { readonly key: ImageKey; readonly alt: string };
};

const AWNING_STRIPES = 32;

export function PizzariaHero({ brand, navLabel, nav, titleLines, lead, cta, status, image }: PizzariaHeroProps) {
  return (
    <section
      aria-labelledby="pizzaria-title"
      className="on-field-1 grid gap-gutter p-margin md:min-h-[calc(100svh-var(--banner-height,2.5rem))] md:grid-cols-2"
    >
      <div className="forno-hero__photo relative h-[34svh] overflow-hidden rounded-site md:order-2 md:h-auto">
        <SiteImage
          image={image.key}
          alt={image.alt}
          sizes="(min-width: 48rem) 50vw, 100vw"
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 -mt-6 flex flex-col overflow-hidden rounded-site bg-background text-foreground [--ring:var(--primary)] md:mt-0">
        <div className="awning" aria-hidden="true">
          {Array.from({ length: AWNING_STRIPES }, (_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="rise-in flex flex-1 flex-col items-center justify-center gap-s3 px-(--column-pad) py-s5 text-center md:gap-s4 md:py-s6">
          <p className="m-0 font-display text-head leading-none font-medium italic">{brand.nome}</p>
          <h1 id="pizzaria-title" className="m-0 text-display leading-[1.08] font-normal tracking-(--tracking-display)">
            {titleLines[0]}
            <br />
            {titleLines[1]}
          </h1>
          <p className="m-0 max-w-[36ch]">{lead}</p>
          <DemoWhatsApp id="aviso-pizzaria" label={cta} className={buttonVariants({ shape: "pill", size: "lg" })} />
          <p className="m-0 text-small text-muted-foreground">{status}</p>
        </div>
        <nav aria-label={navLabel} className="pb-s5">
          <ul className="m-0 flex list-none justify-center gap-s5 p-0 text-small">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="underline decoration-[0.07em] underline-offset-[0.18em]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
