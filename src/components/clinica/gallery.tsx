import { SiteImage } from "@/components/site-image";
import type { ImageKey } from "@/lib/images";

type Foto = { readonly imagem: ImageKey; readonly alt: string; readonly legenda: string };

type GalleryProps = {
  label: string;
  fotos: readonly Foto[];
};

// Largura de cada foto no grid de 12 colunas e na coluna única do celular, na ordem do conteúdo.
const SIZES = [
  "(min-width: 48rem) 30vw, 70vw",
  "(min-width: 48rem) 45vw, 84vw",
  "(min-width: 48rem) 45vw, 56vw",
  "(min-width: 48rem) 22vw, 100vw",
  "(min-width: 48rem) 30vw, 70vw",
  "(min-width: 48rem) 45vw, 84vw",
];

export function Gallery({ label, fotos }: GalleryProps) {
  return (
    <section aria-label={label} className="vagar-gallery">
      {fotos.map((foto, index) => (
        <figure key={foto.imagem} className="vagar-shot">
          <div className="vagar-shot__frame">
            <SiteImage
              image={foto.imagem}
              alt={foto.alt}
              sizes={SIZES[index % SIZES.length] ?? "100vw"}
              className="vagar-shot__img"
            />
          </div>
          <figcaption className="vagar-shot__caption">{foto.legenda}</figcaption>
        </figure>
      ))}
    </section>
  );
}
