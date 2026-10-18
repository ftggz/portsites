import type { MetadataRoute } from "next";

import { site } from "@/content/landing";

export const dynamic = "force-static";

// Só as páginas que devem ser indexadas; o portfólio tem noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.atualizadoEm);
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/politica-de-privacidade`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
