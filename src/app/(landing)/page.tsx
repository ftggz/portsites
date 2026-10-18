import type { Metadata } from "next";

import { Contact } from "@/components/landing/contact";
import { Faq } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Plans } from "@/components/landing/plans";
import { Portfolio } from "@/components/landing/portfolio";
import { Problem } from "@/components/landing/problem";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { WaterlineHero } from "@/components/landing/waterline-hero";
import { SkipLink } from "@/components/skip-link";
import { landing, site } from "@/content/landing";
import { professionalServiceJsonLd, serializeJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: { absolute: landing.meta.title },
  description: landing.meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.marca,
    title: landing.meta.title,
    description: landing.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: landing.meta.title,
    description: landing.meta.description,
  },
};

export default function HomePage() {
  return (
    <div className="relative">
      <SkipLink label={landing.pularLink} />
      <SiteHeader brand={site.marca} navLabel={landing.navLabel} nav={landing.nav} />
      <main id="conteudo">
        <WaterlineHero
          titleLines={landing.hero.titleLines}
          lead={landing.hero.lead}
          primary={landing.hero.primary}
          secondary={landing.hero.secondary}
        />
        <Problem {...landing.problema} />
        <Portfolio {...landing.portfolio} />
        <HowItWorks {...landing.comoFunciona} />
        <Plans {...landing.planos} />
        <Features {...landing.diferenciais} />
        <Faq {...landing.perguntas} />
        <Contact />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(professionalServiceJsonLd()) }}
      />
    </div>
  );
}
