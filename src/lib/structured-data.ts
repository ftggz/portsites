import { landing, site } from "@/content/landing";
import { isConfirmed, whatsappNumber } from "@/lib/contato";

// Dados estruturados de serviço profissional. Campos ainda não confirmados ficam de fora.
export function professionalServiceJsonLd() {
  const [criacao, manutencao] = landing.planos.lista;
  const telefone = whatsappNumber(site.whatsapp);
  const mensal = Number(manutencao.preco.valor);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.marca,
    description: landing.meta.description,
    url: `${site.url}/`,
    areaServed: { "@type": "City", name: site.cidade },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.cidade,
      addressRegion: site.estado,
      addressCountry: "BR",
    },
    ...(telefone ? { telephone: `+${telefone}` } : {}),
    ...(isConfirmed(site.email) ? { email: site.email } : {}),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.atendimento.dias,
      opens: site.atendimento.abre,
      closes: site.atendimento.fecha,
    },
    makesOffer: [
      // A criação não leva preço, porque o valor é projetado para cada negócio.
      {
        "@type": "Offer",
        name: `${criacao.nome} de site`,
        description: criacao.inclui,
      },
      {
        "@type": "Offer",
        name: `${manutencao.nome} mensal`,
        description: manutencao.inclui,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: mensal,
          priceCurrency: "BRL",
          unitText: "mês",
        },
      },
    ],
  };
}

// O "<" é escapado para o JSON não conseguir fechar a tag <script> em que é inserido.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
