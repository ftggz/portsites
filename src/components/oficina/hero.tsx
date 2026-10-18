import { DemoWhatsApp } from "@/components/demo-whatsapp";
import { SiteImage } from "@/components/site-image";
import type { ImageKey } from "@/lib/images";

type Photo = { readonly key: ImageKey; readonly alt: string };

type OficinaHeroProps = {
  titleLines: readonly [string, string];
  descritor: string;
  frase: string;
  destaque: string;
  cta: string;
  images: { readonly elevador: Photo; readonly maos: Photo };
  avisoId: string;
};

export function OficinaHero({ titleLines, descritor, frase, destaque, cta, images, avisoId }: OficinaHeroProps) {
  return (
    <section aria-labelledby="oficina-title" className="claras-hero">
      <div className="claras-hero__name on-field-1">
        <h1 id="oficina-title">
          {titleLines[0]}
          <br />
          {titleLines[1]}
          <span className="sr-only"> {descritor}</span>
        </h1>
      </div>
      <div className="claras-hero__photo claras-shutter">
        <SiteImage
          image={images.elevador.key}
          alt={images.elevador.alt}
          sizes="(min-width: 48rem) 50vw, 100vw"
          priority
        />
      </div>
      <div className="claras-hero__photo claras-hero__second">
        <SiteImage image={images.maos.key} alt={images.maos.alt} sizes="(min-width: 48rem) 50vw, 100vw" />
      </div>
      <div className="claras-hero__pair">
        <p className="bg-surface">{frase}</p>
        <div className="claras-hero__offer on-field-2">
          <p>{destaque}</p>
          <DemoWhatsApp id={avisoId} withNotice={false} label={cta} className="claras-inverse-button" />
        </div>
      </div>
    </section>
  );
}
