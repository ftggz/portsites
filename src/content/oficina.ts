export const oficina = {
  meta: {
    title: "Às Claras Mecânica | Projeto conceito",
    description: "Site conceito de uma oficina mecânica fictícia no Rio de Janeiro, feito para portfólio.",
    themeColor: "#0a0a0a",
  },
  marca: { nome: "Às Claras", sigla: "ÀC", descritor: "Mecânica" },
  navLabel: "Seções da página",
  menu: "Menu",
  nav: [
    { label: "Serviços", href: "#servicos" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Marcas", href: "#marcas" },
    { label: "Contato", href: "#contato" },
  ],
  moeda: "R$",

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

  servicos: {
    palavra: "Serviços",
    nota: "Preços de exemplo, só da mão de obra. As peças entram no orçamento, cada uma com foto.",
    categorias: [
      {
        nome: "Revisão",
        itens: [
          { nome: "Revisão de 10 mil km", detalhe: "Troca de óleo e filtros e 30 itens conferidos", preco: 180, extra: "+ peças" },
          { nome: "Revisão de 20 mil km", detalhe: "A de 10 mil, mais troca das velas e do fluido de freio", preco: 260, extra: "+ peças" },
          { nome: "Revisão de 40 mil km", detalhe: "A de 20 mil, mais troca das correias e do aditivo", preco: 390, extra: "+ peças" },
        ],
      },
      {
        nome: "Óleo e filtros",
        itens: [
          { nome: "Troca de óleo e filtro", preco: 60, extra: "+ peças" },
          { nome: "Troca do filtro de ar", preco: 30, extra: "+ peça" },
          { nome: "Troca do filtro de cabine", preco: 30, extra: "+ peça" },
          { nome: "Troca do filtro de combustível", preco: 50, extra: "+ peça" },
        ],
      },
      {
        nome: "Freios",
        itens: [
          { nome: "Troca das pastilhas dianteiras", preco: 120, extra: "+ peças" },
          { nome: "Troca de discos e pastilhas dianteiros", preco: 220, extra: "+ peças" },
          { nome: "Troca das lonas traseiras", preco: 140, extra: "+ peças" },
          { nome: "Troca do fluido de freio", preco: 90, extra: "+ fluido" },
        ],
      },
      {
        nome: "Suspensão e direção",
        itens: [
          { nome: "Troca dos amortecedores dianteiros, o par", preco: 260, extra: "+ peças" },
          { nome: "Troca do terminal de direção", preco: 110, extra: "+ peça" },
          { nome: "Alinhamento", preco: 80 },
          { nome: "Balanceamento das quatro rodas", preco: 60 },
        ],
      },
      {
        nome: "Motor",
        itens: [
          { nome: "Troca da correia dentada com tensor", preco: 380, extra: "+ peças" },
          { nome: "Troca das velas e dos cabos", preco: 90, extra: "+ peças" },
          { nome: "Limpeza dos bicos injetores", preco: 150 },
          { nome: "Diagnóstico da injeção eletrônica", preco: 100 },
        ],
      },
      {
        nome: "Arrefecimento",
        itens: [
          { nome: "Troca do aditivo", preco: 90, extra: "+ aditivo" },
          { nome: "Troca do radiador", preco: 180, extra: "+ peça" },
          { nome: "Troca da bomba d'água", preco: 260, extra: "+ peça" },
        ],
      },
      {
        nome: "Elétrica e ar-condicionado",
        itens: [
          { nome: "Troca da bateria, com teste", preco: 40, extra: "+ bateria" },
          { nome: "Troca do alternador", preco: 160, extra: "+ peça" },
          { nome: "Higienização do ar-condicionado", preco: 120 },
          { nome: "Recarga do gás do ar-condicionado", preco: 180, extra: "+ gás" },
        ],
      },
    ],
    ajuda: {
      texto: "Não sabe o que o carro tem? Mande uma foto do painel ou o barulho gravado em áudio.",
      cta: "Pedir orçamento",
    },
  },

  transparencia: {
    titulo: "Tudo à vista",
    descricao: "Foto de um jogo de soquetes aberto, com as catracas, as extensões e cada soquete no seu lugar.",
    fatos: [
      "Foto da peça antes de trocar.",
      "Vídeo de cada etapa no seu WhatsApp.",
      "A peça velha volta com você.",
    ],
    cta: "Pedir orçamento",
    imagem: { paisagem: "oficina-quadro", retrato: "oficina-quadro-retrato" },
  },

  comoFunciona: {
    titulo: "Como funciona",
    passos: [
      {
        titulo: "Você manda",
        texto: "Uma foto do painel ou o barulho gravado em áudio, pelo WhatsApp.",
        imagem: { key: "oficina-passo-painel", alt: "Painel de carro com luzes de advertência acesas." },
      },
      {
        titulo: "A gente olha de perto",
        texto: "Com o carro aqui, mandamos a foto do que achamos e o orçamento.",
        imagem: { key: "oficina-passo-perto", alt: "Disco e pinça de freio vistos de perto." },
      },
      {
        titulo: "Você decide",
        texto: "Só mexemos no carro depois do seu ok, com o valor fechado.",
        imagem: { key: "oficina-passo-ok", alt: "Mãos trabalhando no disco de freio de um carro." },
      },
    ],
  },

  acompanhe: {
    titulo: "Acompanhe um serviço",
    intro: "Um serviço de exemplo, do jeito que as mensagens chegam no seu WhatsApp. Escolha uma mensagem com foto para ver.",
    servico: "Civic 2017, troca de discos e pastilhas dianteiros",
    oficina: "Às Claras",
    voce: "Você",
    foto: "Foto",
    legenda: "Foto enviada às {hora}",
    cta: "Pedir orçamento",
    mensagens: [
      {
        id: "chegada",
        de: "oficina",
        hora: "8h40",
        texto: "Seu carro chegou. Vamos começar pelos freios, que estavam fazendo barulho.",
        imagem: { key: "oficina-servico-chegada", alt: "Carro de capô aberto, suspenso em cavaletes no meio da oficina." },
      },
      {
        id: "freio",
        de: "oficina",
        hora: "9h25",
        texto:
          "Disco riscado e pastilha no fim, como na foto. Troca dos dois: R$ 220 de mão de obra e R$ 340 de peças, R$ 560 no total. Posso seguir?",
        imagem: { key: "oficina-servico-freio", alt: "Disco de freio e pinça do carro, já sem a roda." },
      },
      { id: "ok", de: "voce", hora: "9h31", texto: "Pode seguir." },
      {
        id: "troca",
        de: "oficina",
        hora: "11h05",
        texto: "Trocando agora. O disco velho já saiu e o novo vai no lugar.",
        imagem: { key: "oficina-servico-troca", alt: "Mão de luva no cubo da roda, já sem o disco de freio." },
      },
      {
        id: "pronto",
        de: "oficina",
        hora: "14h20",
        texto: "Pronto e testado. O disco velho está separado para você ver.",
        imagem: { key: "oficina-servico-peca", alt: "Disco de freio velho, gasto e enferrujado." },
      },
    ],
  },

  marcas: {
    titulo: "Marcas que atendemos",
    lista: [
      "Fiat",
      "Volkswagen",
      "Chevrolet",
      "Ford",
      "Renault",
      "Toyota",
      "Honda",
      "Hyundai",
      "Nissan",
      "Peugeot",
      "Citroën",
      "Jeep",
    ],
    nota: "Carros de passeio, nacionais e importados. Não atendemos motores a diesel nem carros elétricos.",
  },

  galeria: {
    titulo: "Na oficina",
    contagem: "6 fotos",
    fotos: [
      { key: "oficina-galeria-pneus", alt: "Pneus empilhados com uma roda em cima." },
      { key: "oficina-galeria-maleta", alt: "Maleta de chaves de soquete aberta no chão da oficina." },
      { key: "oficina-galeria-banda", alt: "Pneus amontoados, com a banda de rodagem à mostra." },
      { key: "oficina-galeria-luvas", alt: "Mãos de luva conferindo o motor de um carro." },
      { key: "oficina-galeria-motor", alt: "Mãos ajustando as válvulas de um motor." },
      { key: "oficina-galeria-chave", alt: "Chave apertando uma peça no motor de um carro." },
    ],
  },

  perguntas: {
    titulo: "Antes de trazer",
    itens: [
      {
        pergunta: "O orçamento é de graça?",
        resposta: "É. Mandamos pelo WhatsApp, com fotos, antes de qualquer serviço.",
      },
      {
        pergunta: "E se vocês acharem outro problema?",
        resposta: "Paramos, mandamos a foto e o novo valor, e só seguimos com o seu ok.",
      },
      {
        pergunta: "Posso levar as peças velhas?",
        resposta: "Pode. Elas ficam separadas para você, num saco com o nome do serviço.",
      },
      {
        pergunta: "Vocês dão garantia?",
        resposta: "Três meses no serviço, e as peças têm a garantia do fabricante.",
      },
      {
        pergunta: "Quanto tempo leva?",
        resposta: "A maioria dos serviços sai no mesmo dia. Quando não dá, o prazo vem escrito no orçamento.",
      },
      {
        pergunta: "Precisa marcar?",
        resposta: "Para revisão, sim. Para barulho ou luz acesa no painel, pode trazer que a gente olha.",
      },
    ],
  },

  contato: {
    titulo: "Peça um orçamento",
    campos: {
      carro: { label: "Carro e ano", exemplo: "Onix 2019" },
      problema: { label: "O que está acontecendo?", exemplo: "Barulho ao frear" },
    },
    enviar: "Pedir orçamento",
    mensagem: {
      comCarro: "Olá! Queria um orçamento para o meu {carro}.",
      semCarro: "Olá! Queria um orçamento.",
    },
    mensagemRotulo: "A mensagem iria assim:",
    nota: "Abre o WhatsApp com a mensagem pronta. O orçamento é grátis.",
    local: "Rio de Janeiro, RJ",
    resposta: "Respondemos em até uma hora, no horário de atendimento.",
  },

  horarios: {
    titulo: "Horários",
    linhas: ["Segunda a sexta, das 8h às 18h", "Sábado, das 8h às 13h", "Domingo, fechado"],
  },

  rodape: {
    navegacao: "Navegação",
    contato: "Contato",
    whatsapp: "WhatsApp",
    local: "Rio de Janeiro, RJ",
    legal: "© 2026 Às Claras Mecânica. Negócio fictício, criado como projeto de portfólio.",
    creditos: "Fotos do Unsplash por",
    topo: "Voltar ao topo",
    // Medidas de soquete gravadas nos blocos do nome, como num jogo de chaves.
    medidas: ["8", "10", "12", "13", "14", "17", "19", "22"],
  },
} as const;
