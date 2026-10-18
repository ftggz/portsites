import { DemoWhatsApp } from "@/components/demo-whatsapp";
import { SiteImage } from "@/components/site-image";
import type { ImageKey } from "@/lib/images";

type NavItem = { readonly label: string; readonly href: string };
type Photo = { readonly key: ImageKey; readonly alt: string };

type OficinaHeroProps = {
  brand: { readonly nome: string; readonly sigla: string };
  navLabel: string;
  nav: readonly NavItem[];
  titleLines: readonly [string, string];
  frase: string;
  destaque: string;
  cta: string;
  images: { readonly elevador: Photo; readonly maos: Photo };
};

const tile = "relative overflow-hidden p-(--tile-pad)";
const photoTile = "relative min-h-56 overflow-hidden bg-surface";
const photo = "absolute inset-0 h-full w-full object-cover";

export function OficinaHero({ brand, navLabel, nav, titleLines, frase, destaque, cta, images }: OficinaHeroProps) {
  return (
    <section
      aria-labelledby="oficina-title"
      className="grid gap-gutter p-margin md:min-h-[calc(100svh-var(--banner-height,2.5rem))] md:grid-rows-[3.75rem_1fr]"
    >
      <div className="grid grid-cols-[3.75rem_1fr] gap-gutter lg:grid-cols-[3.75rem_1fr_auto]">
        <a
          href="#conteudo"
          aria-label={brand.nome}
          className="grid size-15 place-items-center bg-foreground text-lead font-medium text-background no-underline"
        >
          {brand.sigla}
        </a>
        <nav aria-label={navLabel} className="hidden items-center bg-surface px-(--tile-pad) lg:flex lg:pl-[calc(50%-4.25rem)]">
          <ul className="m-0 flex list-none gap-s6 p-0">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="no-underline hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <DemoWhatsApp
          id="aviso-oficina"
          label={cta}
          className="flex min-h-15 cursor-pointer items-center justify-start bg-primary px-(--tile-pad) text-left font-medium text-primary-foreground transition-colors duration-(--t-hover) hover:bg-foreground hover:text-background"
        />
      </div>

      <div className="grid gap-gutter md:grid-cols-2 md:grid-rows-2">
        <div className={`${tile} on-field-1 flex min-h-[30svh] items-end md:min-h-0`}>
          <h1 id="oficina-title" className="m-0 text-[22vw] leading-[0.9] font-medium tracking-(--tracking-display) md:text-display">
            {titleLines[0]}
            <br />
            {titleLines[1]}
          </h1>
        </div>
        <div className={`${photoTile} claras-shutter aspect-[4/3] md:aspect-auto`}>
          <SiteImage
            image={images.elevador.key}
            alt={images.elevador.alt}
            sizes="(min-width: 48rem) 50vw, 100vw"
            priority
            className={photo}
          />
        </div>
        <div className={`${photoTile} order-last aspect-[4/3] md:order-none md:aspect-auto`}>
          <SiteImage image={images.maos.key} alt={images.maos.alt} sizes="(min-width: 48rem) 50vw, 100vw" className={photo} />
        </div>
        <div className="grid grid-cols-2 gap-gutter">
          <p className={`${tile} m-0 aspect-square bg-surface text-lead leading-snug md:aspect-auto`}>{frase}</p>
          <p className={`${tile} on-field-2 m-0 aspect-square text-lead leading-snug md:aspect-auto`}>{destaque}</p>
        </div>
      </div>
    </section>
  );
}
