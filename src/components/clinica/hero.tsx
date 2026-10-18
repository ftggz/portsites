import { DemoWhatsApp } from "@/components/demo-whatsapp";
import { ArtDirectedImage } from "@/components/site-image";
import { buttonVariants } from "@/components/ui/button";
import type { ImageKey } from "@/lib/images";

type ClinicaHeroProps = {
  titleLines: readonly [string, string];
  lead: string;
  cta: string;
  image: { readonly mobile: ImageKey; readonly desktop: ImageKey; readonly alt: string };
  avisoId: string;
};

export function ClinicaHero({ titleLines, lead, cta, image, avisoId }: ClinicaHeroProps) {
  return (
    <section aria-labelledby="clinica-title" className="vagar-hero">
      <ArtDirectedImage
        className="vagar-hero__photo"
        mobile={image.mobile}
        desktop={image.desktop}
        alt={image.alt}
        sizes="100vw"
        media="(orientation: landscape) and (min-width: 48rem)"
        priority
      />
      {/* Duas camadas de cor lisa mudam a luz da foto devagar, como o sol mudando de lado na sala. */}
      <div className="vagar-hero__light vagar-hero__light--warm" aria-hidden="true" />
      <div className="vagar-hero__light vagar-hero__light--cool" aria-hidden="true" />
      <div aria-hidden="true" />
      <div className="vagar-hero__bottom rise-in relative z-10 grid gap-s4 px-margin pb-s4 md:grid-cols-2 md:items-end md:pb-s5">
        <h1
          id="clinica-title"
          className="m-0 text-display leading-none font-light tracking-(--tracking-display)"
        >
          {titleLines[0]}
          <br />
          {titleLines[1]}
        </h1>
        <div className="flex max-w-[32ch] flex-col items-start gap-s3 md:justify-self-end md:items-end md:text-right">
          <p className="m-0">{lead}</p>
          <DemoWhatsApp id={avisoId} label={cta} className={buttonVariants()} />
        </div>
      </div>
    </section>
  );
}
