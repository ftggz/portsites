"use client";

import type { ReactNode } from "react";

import { useComanda } from "@/components/pizzaria/comanda-context";
import { fillTemplate } from "@/lib/contato";

type ComandaWhatsAppProps = {
  avisoId: string;
  label: string;
  mandar: { readonly um: string; readonly varios: string };
  className?: string;
  // Com ícone, o botão mostra só o ícone e o texto fica para leitores de tela.
  icon?: ReactNode;
};

// Com a comanda vazia, abre o aviso do WhatsApp desligado. Com itens, leva até a comanda,
// onde o pedido é conferido e mandado, para que nenhum botão de WhatsApp ignore o que já foi escolhido.
export function ComandaWhatsApp({ avisoId, label, mandar, className, icon }: ComandaWhatsAppProps) {
  const { linhas } = useComanda();
  const qtd = linhas.reduce((soma, linha) => soma + linha.qtd, 0);
  const texto = qtd ? fillTemplate(qtd === 1 ? mandar.um : mandar.varios, { qtd: String(qtd) }) : label;
  const conteudo = icon ? (
    <>
      {icon}
      <span className="sr-only">{texto}</span>
    </>
  ) : (
    texto
  );

  if (qtd) {
    return (
      <a href="#pedido" className={className}>
        {conteudo}
      </a>
    );
  }
  return (
    <button type="button" popoverTarget={avisoId} className={className}>
      {conteudo}
    </button>
  );
}
