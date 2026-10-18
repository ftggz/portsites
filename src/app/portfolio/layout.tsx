import type { Metadata } from "next";

import { ConceptBanner } from "@/components/concept-banner";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function PortfolioLayout({ children }: LayoutProps<"/portfolio">) {
  return (
    <>
      <ConceptBanner />
      {children}
    </>
  );
}
