import { SiteImage } from "@/components/site-image";
import type { ImageKey } from "@/lib/images";

type Passo = {
  readonly titulo: string;
  readonly texto: string;
  readonly imagem: { readonly key: ImageKey; readonly alt: string };
};

type StepsProps = {
  titulo: string;
  passos: readonly Passo[];
};

// Largura de cada bloco no grid de 12 colunas (3, 4 e 5 colunas) e no celular.
const SIZES = ["(min-width: 64rem) 25vw, 100vw", "(min-width: 64rem) 33vw, 100vw", "(min-width: 64rem) 42vw, 100vw"];

// A ordem vem do tamanho, porque cada bloco é maior que o anterior e mostra a mesma peça mais de perto.
export function Steps({ titulo, passos }: StepsProps) {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="claras-steps">
      <h2 id="como-funciona-title" className="claras-steps__title">
        {titulo}
      </h2>
      <ol className="claras-steps__list">
        {passos.map((passo, index) => (
          <li key={passo.titulo} className="claras-step">
            <div className="claras-step__tile">
              <SiteImage image={passo.imagem.key} alt={passo.imagem.alt} sizes={SIZES[index] ?? "100vw"} />
            </div>
            <h3 className="claras-step__name">{passo.titulo}</h3>
            <p className="claras-step__text">{passo.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
