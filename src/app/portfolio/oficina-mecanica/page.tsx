import { OficinaHero } from "@/components/oficina/hero";
import { SkipLink } from "@/components/skip-link";
import { oficina } from "@/content/oficina";

export default function OficinaPage() {
  return (
    <>
      <SkipLink label={oficina.pularLink} />
      <main id="conteudo">
        <OficinaHero
          brand={oficina.marca}
          navLabel={oficina.navLabel}
          nav={oficina.nav}
          titleLines={oficina.hero.titleLines}
          frase={oficina.hero.frase}
          destaque={oficina.hero.destaque}
          cta={oficina.hero.cta}
          images={oficina.hero.imagens}
        />
      </main>
    </>
  );
}
