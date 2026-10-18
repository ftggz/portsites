"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { SiteImage } from "@/components/site-image";
import type { ImageKey } from "@/lib/images";

type Foto = { readonly key: ImageKey; readonly legenda: string; readonly alt: string };

type GalleryProps = {
  titulo: string;
  lista: string;
  fotos: readonly Foto[];
  proxima: string;
  pausar: string;
  continuar: string;
};

const INTERVALO = 4200;
const MOVIMENTO = "(prefers-reduced-motion: reduce)";

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(MOVIMENTO);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

// Uma moldura só, com as fotos trocando dentro dela, e ao lado os cinco fatos do forno, todos à vista.
// Troca sozinha enquanto está na tela; escolher um fato ou tocar na moldura assume o controle e pausa.
// Com movimento reduzido, só troca quando a pessoa escolhe.
export function Gallery({ titulo, lista, fotos, proxima, pausar, continuar }: GalleryProps) {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const reduzido = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(MOVIMENTO).matches,
    () => true,
  );

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new IntersectionObserver(([entry]) => setVisivel(Boolean(entry?.isIntersecting)));
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (pausado || reduzido || !visivel) return;
    const id = window.setInterval(() => setIndice((atual) => (atual + 1) % fotos.length), INTERVALO);
    return () => window.clearInterval(id);
  }, [pausado, reduzido, visivel, fotos.length]);

  function mostrar(posicao: number) {
    setIndice(posicao);
    setPausado(true);
  }

  const atual = fotos[indice];

  return (
    <section id="galeria" data-palco="galeria" aria-labelledby="galeria-titulo" className="forno-gallery">
      <h2 id="galeria-titulo" className="forno-heading">
        {titulo}
      </h2>
      <div className="forno-gallery__body">
        <div ref={frameRef} className="forno-gallery__frame">
          <button
            type="button"
            className="forno-gallery__next"
            aria-label={proxima}
            onClick={() => mostrar((indice + 1) % fotos.length)}
          >
            {fotos.map((foto, posicao) => (
              <span key={foto.key} className="forno-gallery__shot" data-active={posicao === indice}>
                <SiteImage image={foto.key} alt="" sizes="(min-width: 84rem) 22vw, (min-width: 64rem) 41vw, (min-width: 48rem) 46vw, 88vw" />
              </span>
            ))}
          </button>
        </div>
        <div className="forno-gallery__side">
          <ol aria-label={lista} className="forno-gallery__facts">
            {fotos.map((foto, posicao) => (
              <li key={foto.key}>
                <button
                  type="button"
                  aria-current={posicao === indice ? "true" : undefined}
                  onClick={() => mostrar(posicao)}
                >
                  <span className="tabular" aria-hidden="true">
                    {posicao + 1}
                  </span>
                  <span>{foto.legenda}</span>
                </button>
              </li>
            ))}
          </ol>
          {reduzido ? null : (
            <button type="button" className="forno-gallery__pause" onClick={() => setPausado((valor) => !valor)}>
              {pausado ? <Play aria-hidden="true" size={14} strokeWidth={2} /> : <Pause aria-hidden="true" size={14} strokeWidth={2} />}
              {pausado ? continuar : pausar}
            </button>
          )}
        </div>
      </div>
      {/* A descrição da foto em destaque fica disponível para leitores de tela. */}
      <p className="sr-only">{atual?.alt}</p>
    </section>
  );
}
