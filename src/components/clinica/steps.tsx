import { RowControls } from "@/components/clinica/row-controls";
import { SiteImage } from "@/components/site-image";
import type { ImageKey } from "@/lib/images";

type Passo = { readonly titulo: string; readonly texto: string; readonly imagem: ImageKey };

type StepsProps = {
  titulo: string;
  faixaLabel: string;
  anterior: string;
  proximo: string;
  passos: readonly Passo[];
};

export function Steps({ titulo, faixaLabel, anterior, proximo, passos }: StepsProps) {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="vagar-steps on-field-1">
      <div className="vagar-steps__head">
        <h2 id="como-funciona-title" className="vagar-steps__title reveal">
          {titulo}
        </h2>
        <RowControls targetId="passos" previousLabel={anterior} nextLabel={proximo} />
      </div>
      <div className="vagar-steps__progress" aria-hidden="true">
        <span />
      </div>
      <div id="passos" className="vagar-steps__scroller" role="region" aria-label={faixaLabel} tabIndex={0}>
        <ol className="vagar-steps__row">
          {passos.map((passo) => (
            <li key={passo.titulo} className="vagar-step">
              <h3 className="vagar-step__title">{passo.titulo}</h3>
              <p className="vagar-step__text">{passo.texto}</p>
              <SiteImage image={passo.imagem} alt="" sizes="(min-width: 48rem) 280px, 72vw" className="vagar-step__img" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
