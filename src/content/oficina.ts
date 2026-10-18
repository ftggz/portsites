export const oficina = {
  meta: {
    title: "Às Claras Mecânica | Projeto conceito",
    description: "Site conceito de uma oficina mecânica fictícia no Rio de Janeiro, feito para portfólio.",
    themeColor: "#0a0a0a",
  },
  marca: { nome: "Às Claras", sigla: "ÀC", descritor: "Mecânica" },
  pularLink: "Pular para o conteúdo",
  navLabel: "Seções da página",
  nav: [
    { label: "Serviços", href: "#servicos" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Marcas", href: "#marcas" },
    { label: "Contato", href: "#contato" },
  ],
  hero: {
    titleLines: ["Às", "Claras"],
    frase: "Mecânica geral com orçamento pelo WhatsApp antes de mexer no carro.",
    destaque: "Foto e vídeo de cada etapa do serviço, direto no seu celular.",
    cta: "Pedir orçamento",
    imagens: {
      elevador: { key: "oficina-hero-elevador", alt: "Oficina com carro no elevador, pneus no chão e parede de ferramentas ao fundo." },
      maos: { key: "oficina-hero-maos", alt: "Mãos sujas de graxa apertando uma peça com chave inglesa embaixo de um carro." },
    },
  },
} as const;
