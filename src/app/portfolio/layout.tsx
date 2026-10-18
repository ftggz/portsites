import type { Metadata } from "next";

import { ConceptBanner } from "@/components/concept-banner";
import { SkipLink } from "@/components/skip-link";
import { conceito } from "@/content/landing";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function PortfolioLayout({ children }: LayoutProps<"/portfolio">) {
  return (
    <>
      {/* O link de pular vem antes do aviso para ser a primeira parada do Tab. */}
      <SkipLink label={conceito.pular} neutral />
      <ConceptBanner />
      {children}
    </>
  );
}
