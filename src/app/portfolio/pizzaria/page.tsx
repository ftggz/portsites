import { PizzariaHero } from "@/components/pizzaria/hero";
import { SkipLink } from "@/components/skip-link";
import { pizzaria } from "@/content/pizzaria";

export default function PizzariaPage() {
  return (
    <>
      <SkipLink label={pizzaria.pularLink} />
      <main id="conteudo">
        <PizzariaHero
          brand={pizzaria.marca}
          navLabel={pizzaria.navLabel}
          nav={pizzaria.nav}
          titleLines={pizzaria.hero.titleLines}
          lead={pizzaria.hero.lead}
          cta={pizzaria.hero.cta}
          status={pizzaria.hero.status}
          image={pizzaria.hero.imagem}
        />
      </main>
    </>
  );
}
