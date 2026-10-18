import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { landing, site } from "@/content/landing";
import { newsreader } from "@/lib/fonts";

import "@/styles/sites/landing.css";

const { naoEncontrada } = landing;

export const metadata: Metadata = {
  title: { absolute: naoEncontrada.meta.title },
};

export default function NotFound() {
  return (
    <div data-site="landing" className={`${newsreader.variable} grid min-h-dvh grid-rows-[auto_1fr]`}>
      <header className="px-margin pt-s5">
        <Link href="/" className="font-display leading-none font-medium no-underline">
          {site.marca}
        </Link>
      </header>
      <main className="grid content-center justify-items-start gap-s5 px-margin py-section">
        <h1 className="m-0 text-head leading-[1.02] font-light tracking-(--tracking-display)">{naoEncontrada.titulo}</h1>
        <p className="m-0 max-w-[40ch]">{naoEncontrada.texto}</p>
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          {naoEncontrada.voltar}
        </Link>
      </main>
    </div>
  );
}
