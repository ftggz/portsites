"use client";

import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";

import { useComanda, type Tamanho } from "@/components/pizzaria/comanda-context";
import { SiteImage } from "@/components/site-image";
import { fillTemplate } from "@/lib/contato";
import { formatPrice } from "@/lib/format";
import type { ImageKey } from "@/lib/images";

type Imagem = { readonly key: ImageKey; readonly mini: ImageKey; readonly alt: string };

type Pizza = {
  readonly id: string;
  readonly nome: string;
  readonly descricao: string;
  readonly precos: { readonly media: number; readonly grande: number };
  readonly imagem?: Imagem;
};

type Bebida = { readonly id: string; readonly nome: string; readonly preco: number };

type Categoria = { readonly id: string; readonly nome: string; readonly itens: readonly (Pizza | Bebida)[] };

type MenuProps = {
  titulo: string;
  nota: string;
  indice: string;
  tamanhos: { readonly media: string; readonly grande: string };
  adicionar: string;
  noPedido: string;
  categorias: readonly Categoria[];
  barra: { readonly um: string; readonly varios: string; readonly subtotal: string; readonly ver: string };
  moeda: string;
};

const TAMANHOS: readonly Tamanho[] = ["media", "grande"];
const DESKTOP = "(min-width: 64rem)";

function isPizza(item: Pizza | Bebida): item is Pizza {
  return "precos" in item;
}

export function Menu({ titulo, nota, indice, tamanhos, adicionar, noPedido, categorias, barra, moeda }: MenuProps) {
  const { linhas, adicionar: porNaComanda, fotoCardapio, setFotoCardapio } = useComanda();
  const quantidade = (chave: string) => linhas.find((linha) => linha.chave === chave)?.qtd ?? 0;
  const totalItens = linhas.reduce((soma, linha) => soma + linha.qtd, 0);
  const totalValor = linhas.reduce((soma, linha) => soma + linha.qtd * linha.preco, 0);

  const sectionRef = useRef<HTMLElement>(null);

  // No desktop, a foto parada mostra a pizza que passa pelo meio da tela, ou a que a pessoa aponta ou foca.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const destacar = (event: Event) => {
      const alvo = event.target instanceof Element ? event.target.closest("[data-foto]") : null;
      const foto = alvo?.getAttribute("data-foto");
      if (foto) setFotoCardapio(foto as ImageKey);
    };
    const desktop = window.matchMedia(DESKTOP);
    const meio = new IntersectionObserver(
      (entries) => {
        if (!desktop.matches) return;
        for (const entry of entries) {
          const foto = entry.target.getAttribute("data-foto");
          if (entry.isIntersecting && foto) setFotoCardapio(foto as ImageKey);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    section.querySelectorAll("[data-foto]").forEach((item) => meio.observe(item));
    section.addEventListener("pointerover", destacar);
    section.addEventListener("focusin", destacar);
    return () => {
      meio.disconnect();
      section.removeEventListener("pointerover", destacar);
      section.removeEventListener("focusin", destacar);
    };
  }, [setFotoCardapio]);

  return (
    <section
      ref={sectionRef}
      id="cardapio"
      data-palco="cardapio"
      aria-labelledby="cardapio-titulo"
      className="forno-menu"
    >
      <h2 id="cardapio-titulo" className="forno-heading">
        {titulo}
      </h2>
      <p className="forno-menu__note">{nota}</p>
      <nav aria-label={indice} className="forno-menu__index">
        <ul>
          {categorias.map((categoria) => (
            <li key={categoria.id}>
              <a href={`#cardapio-${categoria.id}`}>{categoria.nome}</a>
            </li>
          ))}
        </ul>
      </nav>

      {categorias.map((categoria) => (
        <div key={categoria.id} id={`cardapio-${categoria.id}`} className="forno-menu__group">
          <h3 className="forno-menu__category">{categoria.nome}</h3>
          <ul className="forno-menu__list">
            {categoria.itens.map((item) => {
              const naComanda = isPizza(item)
                ? TAMANHOS.reduce((soma, tamanho) => soma + quantidade(`${item.id}-${tamanho}`), 0)
                : quantidade(item.id);
              return (
                <li
                  key={item.id}
                  className="forno-dish"
                  data-foto={isPizza(item) ? item.imagem?.key : undefined}
                  data-active={isPizza(item) && item.imagem?.key === fotoCardapio ? "" : undefined}
                >
                  {isPizza(item) && item.imagem ? (
                    <SiteImage image={item.imagem.mini} alt="" sizes="72px" className="forno-dish__mini" />
                  ) : null}
                  <div className="forno-dish__text">
                    <h4 className="forno-dish__name">{item.nome}</h4>
                    {isPizza(item) ? <p className="forno-dish__desc">{item.descricao}</p> : null}
                    {naComanda ? (
                      <p className="forno-dish__count">{fillTemplate(noPedido, { qtd: String(naComanda) })}</p>
                    ) : null}
                  </div>
                  <div className="forno-dish__prices" data-ui>
                    {isPizza(item) ? (
                      TAMANHOS.map((tamanho) => {
                        const preco = item.precos[tamanho];
                        const rotulo = `${item.nome} ${tamanhos[tamanho].toLocaleLowerCase("pt-BR")}`;
                        return (
                          <button
                            key={tamanho}
                            type="button"
                            className="forno-price"
                            aria-label={`${adicionar}: ${rotulo}, ${formatPrice(preco, moeda)}`}
                            onClick={() =>
                              porNaComanda({ chave: `${item.id}-${tamanho}`, nome: item.nome, tamanho, preco })
                            }
                          >
                            <span className="forno-price__size">{tamanhos[tamanho]}</span>
                            <span className="tabular">{formatPrice(preco, moeda)}</span>
                            <Plus aria-hidden="true" size={16} strokeWidth={1.75} />
                          </button>
                        );
                      })
                    ) : (
                      <button
                        type="button"
                        className="forno-price"
                        aria-label={`${adicionar}: ${item.nome}, ${formatPrice(item.preco, moeda)}`}
                        onClick={() => porNaComanda({ chave: item.id, nome: item.nome, preco: item.preco })}
                      >
                        <span className="tabular">{formatPrice(item.preco, moeda)}</span>
                        <Plus aria-hidden="true" size={16} strokeWidth={1.75} />
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Resumo preso ao pé do cardápio enquanto ele rola; leva até a comanda. */}
      <div className="forno-menu__bar" aria-live="polite">
        {totalItens ? (
          <a href="#pedido" className="forno-menu__bar-link">
            <span className="tabular">
              {totalItens} {totalItens === 1 ? barra.um : barra.varios}
            </span>
            <span className="tabular">
              {barra.subtotal} {formatPrice(totalValor, moeda)}
            </span>
            <span className="forno-menu__bar-cta">{barra.ver}</span>
          </a>
        ) : null}
      </div>
    </section>
  );
}
