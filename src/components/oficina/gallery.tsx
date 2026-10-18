import { DragRow } from "@/components/oficina/drag-row";
import { SiteImage } from "@/components/site-image";
import type { ImageKey } from "@/lib/images";

type Foto = { readonly key: ImageKey; readonly alt: string };

type GalleryProps = {
  titulo: string;
  contagem: string;
  fotos: readonly Foto[];
};

type Modulo = "alto" | "par" | "largo";

// A faixa alterna três formatos: foto alta, duas fotos empilhadas e foto larga.
const SEQUENCIA: readonly Modulo[] = ["alto", "par", "largo", "par"];
// A faixa tem 68vh de altura a partir do tablet; a largura de cada formato sai dela.
const SIZES: Record<Modulo, string> = {
  alto: "(min-width: 48rem) 51vh, 72vw",
  par: "(min-width: 48rem) 46vh, 64vw",
  largo: "(min-width: 48rem) 109vh, 88vw",
};

function group(fotos: readonly Foto[]) {
  const modulos: { tipo: Modulo; fotos: Foto[] }[] = [];
  let index = 0;
  while (index < fotos.length) {
    const tipo = SEQUENCIA[modulos.length % SEQUENCIA.length] ?? "alto";
    const tamanho = tipo === "par" ? 2 : 1;
    modulos.push({ tipo, fotos: fotos.slice(index, index + tamanho) });
    index += tamanho;
  }
  return modulos;
}

export function Gallery({ titulo, contagem, fotos }: GalleryProps) {
  return (
    <section aria-labelledby="galeria-title" className="claras-gallery">
      <div className="claras-gallery__head">
        <h2 id="galeria-title">{titulo}</h2>
        <p>{contagem}</p>
      </div>
      <DragRow labelledBy="galeria-title" className="claras-gallery__row">
        <ul className="claras-gallery__track">
          {group(fotos).map((modulo) => (
            <li key={modulo.fotos[0]?.key} className="claras-mod" data-kind={modulo.tipo}>
              {modulo.fotos.map((foto) => (
                <SiteImage key={foto.key} image={foto.key} alt={foto.alt} sizes={SIZES[modulo.tipo]} />
              ))}
            </li>
          ))}
        </ul>
      </DragRow>
    </section>
  );
}
