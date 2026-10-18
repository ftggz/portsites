"use client";

import { useEffect, useState } from "react";

import { useComanda } from "@/components/pizzaria/comanda-context";
import { getImage, type ImageKey } from "@/lib/images";

type StageProps = {
  topo: ImageKey;
  secoes: Readonly<Record<string, ImageKey>>;
  fotosCardapio: readonly ImageKey[];
};

const SIZES = "(min-width: 64rem) 50vw, 100vw";

// A metade parada da tela. A foto troca quando outra seção chega ao meio da tela; no cardápio,
// segue a pizza em destaque. Cada foto só é baixada quando a sua seção se aproxima, e as do
// cardápio, além da primeira, só depois que o cardápio chega ao meio da tela.
export function Stage({ topo, secoes, fotosCardapio }: StageProps) {
  const { fotoCardapio } = useComanda();
  const [secao, setSecao] = useState("topo");
  const [perto, setPerto] = useState<ReadonlySet<string>>(() => new Set(["topo"]));
  const [vistas, setVistas] = useState<ReadonlySet<string>>(() => new Set(["topo"]));

  useEffect(() => {
    const alvos = [...document.querySelectorAll<HTMLElement>("[data-palco]")];
    const meio = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute("data-palco");
          if (!entry.isIntersecting || !id) continue;
          setSecao(id);
          setVistas((atual) => (atual.has(id) ? atual : new Set([...atual, id])));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    const proximo = new IntersectionObserver(
      (entries) => {
        const ids = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target.getAttribute("data-palco"));
        if (ids.length) setPerto((atual) => new Set([...atual, ...ids.filter((id): id is string => Boolean(id))]));
      },
      { rootMargin: "0px 0px 100% 0px" },
    );
    for (const alvo of alvos) {
      meio.observe(alvo);
      proximo.observe(alvo);
    }
    return () => {
      meio.disconnect();
      proximo.disconnect();
    };
  }, []);

  const atual = secao === "cardapio" ? (fotoCardapio ?? topo) : (secoes[secao] ?? topo);
  const montadas = new Set<ImageKey>([topo, atual]);
  for (const id of perto) {
    if (id === "cardapio" && fotosCardapio[0]) montadas.add(fotosCardapio[0]);
    else if (secoes[id]) montadas.add(secoes[id]);
  }
  if (vistas.has("cardapio")) fotosCardapio.forEach((key) => montadas.add(key));

  return (
    <aside className="forno-stage" aria-hidden="true">
      {[...montadas].map((key) => {
        const asset = getImage(key);
        const inicial = key === topo;
        return (
          <img
            key={key}
            src={asset.src}
            srcSet={asset.srcSet}
            sizes={SIZES}
            width={asset.width}
            height={asset.height}
            alt=""
            loading={inicial ? "eager" : "lazy"}
            fetchPriority={inicial ? "high" : "low"}
            decoding="async"
            data-active={key === atual}
          />
        );
      })}
    </aside>
  );
}
