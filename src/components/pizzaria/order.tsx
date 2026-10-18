"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState, type ComponentProps } from "react";

import { useComanda, type LinhaComanda } from "@/components/pizzaria/comanda-context";
import { OvenStatus } from "@/components/pizzaria/oven-status";
import { buttonVariants } from "@/components/ui/button";
import { fillTemplate } from "@/lib/contato";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

type Bairro = { readonly nome: string; readonly taxa: number; readonly tempo: number };

type Comanda = {
  readonly titulo: string;
  readonly passos: readonly string[];
  readonly bairro: {
    readonly label: string;
    readonly escolha: string;
    readonly retirada: string;
    readonly dica: string;
  };
  readonly observacao: { readonly label: string; readonly dica: string };
  readonly entrega: string;
  readonly retirada: string;
  readonly semTaxa: string;
  readonly total: string;
  readonly tempoEntrega: string;
  readonly tempoRetirada: string;
  readonly menos: string;
  readonly mais: string;
  readonly enviar: string;
  readonly semItens: string;
  readonly semItensLink: string;
  readonly semBairro: string;
  readonly limpar: string;
  readonly desfazer: string;
  readonly anuncios: {
    readonly qtd: string;
    readonly saiu: string;
    readonly limpa: string;
    readonly voltou: string;
  };
  readonly mensagem: {
    readonly abertura: string;
    readonly entrega: string;
    readonly retirada: string;
    readonly observacao: string;
    readonly total: string;
    readonly rotulo: string;
  };
};

type OrderProps = {
  titulo: string;
  texto: string;
  comanda: Comanda;
  bairros: readonly Bairro[];
  retirada: { readonly tempo: number };
  tamanhos: { readonly media: string; readonly grande: string };
  aviso: { readonly titulo: string; readonly texto: string; readonly fechar: string };
  horario: ComponentProps<typeof OvenStatus>["horario"];
  status: ComponentProps<typeof OvenStatus>["mensagens"];
  moeda: string;
};

type Erro = "itens" | "bairro" | null;

const RETIRADA = "retirada";
const AVISO_ID = "aviso-comanda";
const OBSERVACAO_MAX = 160;

// A comanda se monta com o que entra pelo cardápio; enviar mostra a mensagem que iria para o WhatsApp.
export function Order({ titulo, texto, comanda, bairros, retirada, tamanhos, aviso, horario, status, moeda }: OrderProps) {
  const { linhas, mudar, limpar, desfazer, podeDesfazer, bairro, setBairro } = useComanda();
  const [erro, setErro] = useState<Erro>(null);
  const [, setTentativas] = useState(0);
  const [observacao, setObservacao] = useState("");
  const [anuncio, setAnuncio] = useState("");
  const slipRef = useRef<HTMLDivElement>(null);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const cardapioRef = useRef<HTMLAnchorElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Depois de remover uma linha, limpar ou errar o envio, o foco vai para onde a pessoa continua.
  // O alvo só existe depois da renderização, então o foco espera o efeito seguinte.
  const focoPendente = useRef<(() => void) | null>(null);

  useEffect(() => {
    const focar = focoPendente.current;
    if (!focar) return;
    focoPendente.current = null;
    focar();
  });

  const preco = (valor: number) => formatPrice(valor, moeda);
  const nomeLinha = (linha: LinhaComanda) =>
    linha.tamanho ? `${linha.nome} ${tamanhos[linha.tamanho].toLocaleLowerCase("pt-BR")}` : linha.nome;

  const destino = bairros.find((item) => item.nome === bairro);
  const taxa = destino?.taxa ?? 0;
  const subtotal = linhas.reduce((soma, linha) => soma + linha.qtd * linha.preco, 0);
  const total = subtotal + taxa;
  const tempo = bairro === RETIRADA ? retirada.tempo : destino?.tempo;
  const nota = observacao.trim();
  const erroItens = erro === "itens" && !linhas.length;
  const erroBairro = erro === "bairro" && !bairro;

  const mensagem = [
    comanda.mensagem.abertura,
    ...linhas.map((linha) => `${linha.qtd} ${nomeLinha(linha)} (${preco(linha.qtd * linha.preco)})`),
    bairro === RETIRADA
      ? comanda.mensagem.retirada
      : fillTemplate(comanda.mensagem.entrega, { bairro, taxa: preco(taxa) }),
    nota ? fillTemplate(comanda.mensagem.observacao, { texto: nota }) : "",
    fillTemplate(comanda.mensagem.total, { total: preco(total) }),
  ]
    .filter(Boolean)
    .join("\n");

  const focarTitulo = () => tituloRef.current?.focus();
  const focarMenos = (chave: string) => () =>
    slipRef.current?.querySelector<HTMLButtonElement>(`[data-menos="${chave}"]`)?.focus();

  function alterar(linha: LinhaComanda, indice: number, delta: 1 | -1) {
    const item = nomeLinha(linha);
    const qtd = linha.qtd + delta;
    if (qtd === 0) {
      const vizinha = linhas[indice + 1] ?? linhas[indice - 1];
      focoPendente.current = vizinha ? focarMenos(vizinha.chave) : focarTitulo;
      setAnuncio(fillTemplate(comanda.anuncios.saiu, { item }));
    } else {
      setAnuncio(
        fillTemplate(comanda.anuncios.qtd, { qtd: String(qtd), item, total: preco(total + delta * linha.preco) }),
      );
    }
    mudar(linha.chave, delta);
  }

  function limparComanda() {
    limpar();
    setErro(null);
    setAnuncio(comanda.anuncios.limpa);
    focoPendente.current = focarTitulo;
  }

  function desfazerLimpeza() {
    desfazer();
    setAnuncio(comanda.anuncios.voltou);
    focoPendente.current = focarTitulo;
  }

  function enviar() {
    if (!linhas.length || !bairro) {
      setErro(!linhas.length ? "itens" : "bairro");
      setTentativas((vezes) => vezes + 1);
      focoPendente.current = !linhas.length ? () => cardapioRef.current?.focus() : () => selectRef.current?.focus();
      return;
    }
    setErro(null);
    popoverRef.current?.showPopover();
    closeRef.current?.focus();
  }

  const dicaBairro = "pedido-bairro-dica";
  const erroBairroId = "pedido-erro-bairro";

  return (
    <section id="pedido" data-palco="pedido" aria-labelledby="pedido-titulo" className="forno-order">
      <h2 id="pedido-titulo" className="forno-heading">
        {titulo}
      </h2>
      <p className="forno-order__text">{texto}</p>

      <div ref={slipRef} className="forno-slip" data-ui>
        <h3 ref={tituloRef} tabIndex={-1} className="forno-slip__title">
          {comanda.titulo}
        </h3>
        {linhas.length ? (
          <ul className="forno-slip__lines">
            {linhas.map((linha, indice) => {
              const item = nomeLinha(linha);
              return (
                <li key={linha.chave}>
                  <span className="forno-slip__qty tabular">{linha.qtd}</span>
                  <span className="forno-slip__name">{item}</span>
                  <span className="forno-slip__dots" aria-hidden="true" />
                  <span className="forno-slip__price tabular">{preco(linha.qtd * linha.preco)}</span>
                  <span className="forno-slip__steppers">
                    <button
                      type="button"
                      data-menos={linha.chave}
                      aria-label={fillTemplate(comanda.menos, { item })}
                      onClick={() => alterar(linha, indice, -1)}
                    >
                      <Minus aria-hidden="true" size={16} strokeWidth={1.75} />
                    </button>
                    <button
                      type="button"
                      aria-label={fillTemplate(comanda.mais, { item })}
                      onClick={() => alterar(linha, indice, 1)}
                    >
                      <Plus aria-hidden="true" size={16} strokeWidth={1.75} />
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <ol className="forno-slip__steps">
            {comanda.passos.map((passo) => (
              <li key={passo}>{passo}</li>
            ))}
          </ol>
        )}
        {erroItens ? (
          <p role="alert" className="forno-slip__error">
            {comanda.semItens}{" "}
            <a ref={cardapioRef} href="#cardapio" className="forno-link">
              {comanda.semItensLink}
            </a>
          </p>
        ) : null}

        <label htmlFor="pedido-bairro" className="forno-slip__label">
          {comanda.bairro.label}
        </label>
        <select
          ref={selectRef}
          id="pedido-bairro"
          className="forno-slip__select"
          value={bairro}
          aria-invalid={erroBairro || undefined}
          aria-describedby={erroBairro ? `${erroBairroId} ${dicaBairro}` : dicaBairro}
          onChange={(event) => setBairro(event.target.value)}
        >
          <option value="" disabled>
            {comanda.bairro.escolha}
          </option>
          <option value={RETIRADA}>
            {comanda.bairro.retirada}, {comanda.semTaxa}
          </option>
          {bairros.map((item) => (
            <option key={item.nome} value={item.nome}>
              {item.nome}, {preco(item.taxa)}
            </option>
          ))}
        </select>
        {erroBairro ? (
          <p id={erroBairroId} className="forno-slip__error">
            {comanda.semBairro}
          </p>
        ) : null}
        <p id={dicaBairro} className="forno-slip__hint">
          {comanda.bairro.dica}
        </p>
        {bairro ? (
          <>
            <p className="forno-slip__row">
              <span>{bairro === RETIRADA ? comanda.retirada : fillTemplate(comanda.entrega, { bairro })}</span>
              <span className="forno-slip__dots" aria-hidden="true" />
              <span className="tabular">{bairro === RETIRADA ? comanda.semTaxa : preco(taxa)}</span>
            </p>
            {tempo ? (
              <p className="forno-slip__time">
                {fillTemplate(bairro === RETIRADA ? comanda.tempoRetirada : comanda.tempoEntrega, {
                  min: String(tempo),
                })}
              </p>
            ) : null}
          </>
        ) : null}

        <label htmlFor="pedido-observacao" className="forno-slip__label">
          {comanda.observacao.label}
        </label>
        <textarea
          id="pedido-observacao"
          className="forno-slip__note"
          rows={2}
          maxLength={OBSERVACAO_MAX}
          value={observacao}
          aria-describedby="pedido-observacao-dica"
          onChange={(event) => setObservacao(event.target.value)}
        />
        <p id="pedido-observacao-dica" className="forno-slip__hint">
          {comanda.observacao.dica}
        </p>

        {linhas.length ? (
          <p className="forno-slip__total">
            <span>{comanda.total}</span>
            <span className="forno-slip__dots" aria-hidden="true" />
            <span className="tabular">{preco(total)}</span>
          </p>
        ) : null}

        <OvenStatus horario={horario} mensagens={status} className="forno-slip__oven" />

        <div className="forno-slip__actions">
          <button
            type="button"
            className={buttonVariants({ shape: "pill" })}
            onClick={enviar}
            aria-haspopup="dialog"
          >
            {comanda.enviar}
          </button>
          {linhas.length ? (
            <button type="button" className="forno-link" onClick={limparComanda}>
              {comanda.limpar}
            </button>
          ) : podeDesfazer ? (
            <button type="button" className="forno-link" onClick={desfazerLimpeza}>
              {comanda.desfazer}
            </button>
          ) : null}
        </div>
        {/* O que muda pelos botões da própria comanda é dito ao leitor de tela; o cardápio tem o seu aviso. */}
        <p className="sr-only" aria-live="polite">
          {anuncio}
        </p>
      </div>

      <div
        ref={popoverRef}
        id={AVISO_ID}
        popover="auto"
        role="dialog"
        aria-labelledby={`${AVISO_ID}-titulo`}
        className="demo-popover"
      >
        <p id={`${AVISO_ID}-titulo`} className="m-0 font-display text-lead leading-tight">
          {comanda.mensagem.rotulo}
        </p>
        <blockquote className="forno-message">{mensagem}</blockquote>
        <p className="mt-s3 mb-0 font-medium">{aviso.titulo}</p>
        <p className="mt-s1 mb-0">{aviso.texto}</p>
        <button
          ref={closeRef}
          type="button"
          popoverTarget={AVISO_ID}
          popoverTargetAction="hide"
          className={cn(buttonVariants({ size: "sm", shape: "pill" }), "mt-s4")}
        >
          {aviso.fechar}
        </button>
      </div>
    </section>
  );
}
