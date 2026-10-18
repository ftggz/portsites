import Link from "next/link";

import { conceito } from "@/content/landing";

export function ConceptBanner() {
  return (
    <div className="concept-banner" data-concept-banner role="note">
      <p className="m-0">{conceito.aviso}</p>
      <Link href={conceito.voltarHref}>{conceito.voltar}</Link>
    </div>
  );
}
