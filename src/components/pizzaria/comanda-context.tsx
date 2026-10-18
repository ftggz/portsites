"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import type { ImageKey } from "@/lib/images";

export type Tamanho = "media" | "grande";

export type LinhaComanda = {
  readonly chave: string;
  readonly nome: string;
  readonly tamanho?: Tamanho;
  readonly preco: number;
  readonly qtd: number;
};

type ComandaState = {
  linhas: readonly LinhaComanda[];
  adicionar: (linha: Omit<LinhaComanda, "qtd">) => void;
  mudar: (chave: string, delta: number) => void;
  limpar: () => void;
  desfazer: () => void;
  podeDesfazer: boolean;
  bairro: string;
  setBairro: (bairro: string) => void;
  fotoCardapio: ImageKey | null;
  setFotoCardapio: (key: ImageKey) => void;
};

const ComandaContext = createContext<ComandaState | null>(null);

export function useComanda(): ComandaState {
  const value = useContext(ComandaContext);
  if (!value) throw new Error("useComanda precisa do ComandaProvider");
  return value;
}

// Guarda a comanda e a pizza em destaque, que o cardápio, a comanda e a foto parada compartilham.
// Limpar guarda as linhas até a próxima mudança, para que a limpeza possa ser desfeita.
export function ComandaProvider({ fotoInicial, children }: { fotoInicial: ImageKey | null; children: ReactNode }) {
  const [linhas, setLinhas] = useState<readonly LinhaComanda[]>([]);
  const [guardadas, setGuardadas] = useState<readonly LinhaComanda[]>([]);
  const [bairro, setBairro] = useState("");
  const [fotoCardapio, setFotoCardapio] = useState<ImageKey | null>(fotoInicial);

  const value = useMemo<ComandaState>(
    () => ({
      linhas,
      adicionar: (linha) => {
        setGuardadas([]);
        setLinhas((atual) => {
          const existente = atual.find((item) => item.chave === linha.chave);
          if (existente) return atual.map((item) => (item.chave === linha.chave ? { ...item, qtd: item.qtd + 1 } : item));
          return [...atual, { ...linha, qtd: 1 }];
        });
      },
      mudar: (chave, delta) => {
        setGuardadas([]);
        setLinhas((atual) =>
          atual
            .map((item) => (item.chave === chave ? { ...item, qtd: item.qtd + delta } : item))
            .filter((item) => item.qtd > 0),
        );
      },
      limpar: () => {
        setGuardadas(linhas);
        setLinhas([]);
      },
      desfazer: () => {
        setLinhas(guardadas);
        setGuardadas([]);
      },
      podeDesfazer: guardadas.length > 0,
      bairro,
      setBairro,
      fotoCardapio,
      setFotoCardapio,
    }),
    [linhas, guardadas, bairro, fotoCardapio],
  );

  return <ComandaContext.Provider value={value}>{children}</ComandaContext.Provider>;
}
