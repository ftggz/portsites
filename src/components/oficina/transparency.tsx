import { DemoWhatsApp } from "@/components/demo-whatsapp";
import { ArtDirectedImage } from "@/components/site-image";
import type { ImageKey } from "@/lib/images";

type Cell = readonly [coluna: number, linha: number];

type Layout = {
  readonly colunas: number;
  readonly linhas: number;
  readonly titulo: Cell;
  readonly larguraTitulo: number;
  readonly fatos: readonly Cell[];
  readonly acao: Cell;
};

// Blocos de cor sobre a foto, por coluna e linha a partir de 1. Nenhum encosta no outro,
// e a fileira da catraca grande, que é o assunto da foto, fica inteira à vista.
const DESKTOP: Layout = {
  colunas: 6,
  linhas: 4,
  titulo: [1, 1],
  larguraTitulo: 2,
  fatos: [
    [1, 3],
    [3, 3],
    [6, 3],
  ],
  acao: [5, 4],
};

const MOBILE: Layout = {
  colunas: 3,
  linhas: 6,
  titulo: [1, 1],
  larguraTitulo: 2,
  fatos: [
    [3, 2],
    [1, 4],
    [3, 5],
  ],
  acao: [2, 6],
};

function freeCells({ colunas, linhas, titulo, larguraTitulo, fatos, acao }: Layout): Cell[] {
  const tituloCells = Array.from({ length: larguraTitulo }, (_, i): Cell => [titulo[0] + i, titulo[1]]);
  const taken = new Set([...tituloCells, ...fatos, acao].map(([c, r]) => `${c},${r}`));
  const cells: Cell[] = [];
  for (let r = 1; r <= linhas; r += 1) {
    for (let c = 1; c <= colunas; c += 1) {
      if (!taken.has(`${c},${r}`)) cells.push([c, r]);
    }
  }
  return cells;
}

// Cada bloco leva a posição nas duas grades; um pedaço da foto sem posição no celular fica escondido lá.
function place(desktop: Cell, mobile?: Cell) {
  return { "data-x": desktop[0], "data-y": desktop[1], "data-mx": mobile?.[0], "data-my": mobile?.[1] };
}

type TransparencyProps = {
  titulo: string;
  descricao: string;
  fatos: readonly string[];
  cta: string;
  imagem: { readonly paisagem: ImageKey; readonly retrato: ImageKey };
  avisoId: string;
};

export function Transparency({ titulo, descricao, fatos, cta, imagem, avisoId }: TransparencyProps) {
  const pieces = freeCells(DESKTOP);
  const mobilePieces = freeCells(MOBILE);
  return (
    <section aria-labelledby="transparencia-title" className="claras-wall">
      <h2
        id="transparencia-title"
        className="claras-wall__tile claras-wall__title on-field-1"
        {...place(DESKTOP.titulo, MOBILE.titulo)}
      >
        {titulo}
      </h2>
      <p className="sr-only">{descricao}</p>
      {fatos.map((fato, index) => {
        const desktop = DESKTOP.fatos[index];
        if (!desktop) return null;
        return (
          <p key={fato} className="claras-wall__tile claras-wall__fact on-field-1" {...place(desktop, MOBILE.fatos[index])}>
            {fato}
          </p>
        );
      })}
      <div className="claras-wall__tile claras-wall__action" {...place(DESKTOP.acao, MOBILE.acao)}>
        <DemoWhatsApp id={avisoId} withNotice={false} label={cta} className="claras-wall__button" />
      </div>
      {pieces.map((cell, index) => (
        <div key={cell.join("-")} className="claras-wall__piece" aria-hidden="true" {...place(cell, mobilePieces[index])}>
          <span>
            <ArtDirectedImage
              mobile={imagem.retrato}
              desktop={imagem.paisagem}
              alt=""
              sizes="100vw"
              imgClassName="claras-wall__img"
            />
          </span>
        </div>
      ))}
    </section>
  );
}
