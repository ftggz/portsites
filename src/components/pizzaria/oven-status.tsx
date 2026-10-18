"use client";

import { Clock, Flame } from "lucide-react";
import { useEffect, useState } from "react";

import { fillTemplate } from "@/lib/contato";
import { cn } from "@/lib/utils";

type Funcionamento = {
  readonly fuso: string;
  readonly diasAbertos: readonly number[];
  readonly abre: number;
  readonly ultimoPedido: number;
  readonly fecha: number;
};

type Mensagens = {
  readonly padrao: string;
  readonly aceso: string;
  readonly fechando: string;
  readonly hoje: string;
  readonly amanha: string;
  readonly outroDia: string;
  readonly dias: readonly string[];
};

type Estado = { readonly texto: string; readonly aceso: boolean };

const DIAS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function agora(fuso: string) {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: fuso,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const valor = (tipo: Intl.DateTimeFormatPartTypes) => partes.find((parte) => parte.type === tipo)?.value ?? "";
  return { dia: DIAS_EN.indexOf(valor("weekday")), minutos: Number(valor("hour")) * 60 + Number(valor("minute")) };
}

function descrever(horario: Funcionamento, mensagens: Mensagens): Estado {
  const { dia, minutos } = agora(horario.fuso);
  const abreHoje = horario.diasAbertos.includes(dia);
  if (abreHoje && minutos >= horario.abre && minutos < horario.ultimoPedido) return { texto: mensagens.aceso, aceso: true };
  if (abreHoje && minutos >= horario.ultimoPedido && minutos < horario.fecha) return { texto: mensagens.fechando, aceso: true };
  if (abreHoje && minutos < horario.abre) return { texto: mensagens.hoje, aceso: false };
  for (let passo = 1; passo <= 7; passo += 1) {
    const proximo = (dia + passo) % 7;
    if (!horario.diasAbertos.includes(proximo)) continue;
    return {
      texto: passo === 1 ? mensagens.amanha : fillTemplate(mensagens.outroDia, { dia: mensagens.dias[proximo] ?? "" }),
      aceso: false,
    };
  }
  return { texto: mensagens.padrao, aceso: false };
}

type OvenStatusProps = { horario: Funcionamento; mensagens: Mensagens; className?: string };

// Diz, pelo relógio do Rio, se o forno está aceso agora. Sem JavaScript fica a frase fixa do horário.
// A chama marca o forno aceso; o relógio, o forno apagado e a hora em que acende.
export function OvenStatus({ horario, mensagens, className }: OvenStatusProps) {
  const [estado, setEstado] = useState<Estado | null>(null);

  useEffect(() => {
    const atualizar = () => setEstado(descrever(horario, mensagens));
    const frame = requestAnimationFrame(atualizar);
    const relogio = window.setInterval(atualizar, 60_000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(relogio);
    };
  }, [horario, mensagens]);

  const Marca = estado?.aceso ? Flame : Clock;
  return (
    <p className={cn("forno-status", className)} data-aceso={estado?.aceso ? "" : undefined}>
      <Marca aria-hidden="true" size={18} strokeWidth={1.75} />
      <span>{estado?.texto ?? mensagens.padrao}</span>
    </p>
  );
}
