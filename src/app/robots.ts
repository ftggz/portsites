import type { MetadataRoute } from "next";

import { site } from "@/content/landing";

export const dynamic = "force-static";

// O portfólio não é bloqueado aqui de propósito, porque o buscador precisa ler a página para ver o noindex.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
