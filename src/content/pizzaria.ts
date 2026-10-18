export const pizzaria = {
  meta: {
    title: "Forno Aceso Pizzaria | Projeto conceito",
    description: "Site conceito de uma pizzaria fictícia de forno a lenha no Rio de Janeiro, feito para portfólio.",
    themeColor: "#351a2b",
  },
  marca: { nome: "Forno Aceso", descritor: "Pizzaria de forno a lenha" },
  navLabel: "Seções da página",
  nav: [
    { label: "Cardápio", href: "#cardapio" },
    { label: "Entrega", href: "#entrega" },
    { label: "Horários", href: "#horarios" },
  ],
  hero: {
    titleLines: ["Pizza de lenha,", "quentinha em casa"],
    lead: "Massa de fermentação lenta, forno aceso das 18h às 23h30 e entrega em oito bairros do Rio.",
    cta: "Pedir pelo WhatsApp",
    status: "O forno acende às 18h, de terça a domingo.",
    imagem: {
      key: "pizzaria-hero",
      alt: "Pizza saindo do forno a lenha numa pá de metal, com o fogo aceso ao fundo.",
    },
  },
} as const;
