export const clinica = {
  meta: {
    title: "Vagar Estética | Projeto conceito",
    description: "Site conceito de uma clínica de estética fictícia no Rio de Janeiro, feito para portfólio.",
    themeColor: "#a6b3bc",
  },
  marca: { nome: "Vagar", descritor: "Estética" },
  pularLink: "Pular para o conteúdo",
  navLabel: "Seções da página",
  nav: [
    { label: "Procedimentos", href: "#procedimentos" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Contato", href: "#contato" },
  ],
  duracao: { minutos: "min", horas: "h" },
  moeda: "R$",

  hero: {
    titleLines: ["Vagar", "Estética"],
    lead: "Procedimentos estéticos com hora marcada, sem pressa e com os cuidados explicados antes e depois.",
    cta: "Agendar pelo WhatsApp",
    imagem: {
      mobile: "clinica-hero-retrato",
      desktop: "clinica-hero-paisagem",
      alt: "Vaso escuro com folhas secas sobre uma prateleira de madeira, ao lado de uma cama de lençóis claros.",
    },
  },

  procedimentos: {
    titulo: ["O tempo de cada", "procedimento"],
    intro: "Marque o que quer fazer e veja quanto tempo a visita leva e o que fazer antes e depois.",
    nota: "Preços de exemplo",
    escolhaLabel: "Procedimentos da sua visita",
    cuidados: "Cuidados",
    antes: "Antes",
    depois: "Depois",
    // "dias" é quanto tempo antes da visita o cuidado começa; "prazo" entra na frase da antecedência.
    grupos: [
      {
        nome: "Rosto",
        itens: [
          {
            id: "limpeza",
            nome: "Limpeza de pele",
            minutos: 75,
            preco: 180,
            descricao: "Vapor, retirada dos cravos com as mãos e máscara calmante. A pele pode ficar vermelha por algumas horas.",
            antes: { dias: 3, quando: "Três dias antes", prazo: "três dias", texto: "Pare de esfoliar o rosto." },
            depois: "Use protetor solar e deixe a maquiagem para o dia seguinte.",
          },
          {
            id: "hidratacao",
            nome: "Hidratação facial",
            minutos: 45,
            preco: 140,
            descricao: "Máscara hidratante e massagem leve no rosto, sem incômodo.",
            antes: { dias: 0, quando: "No dia", texto: "Venha sem maquiagem, se puder." },
            depois: "Evite sol forte no mesmo dia.",
          },
          {
            id: "peeling",
            nome: "Peeling de diamante",
            minutos: 50,
            preco: 160,
            descricao: "Uma ponteira com pó de diamante lixa de leve a camada de cima da pele. Dá para sentir um arranhado leve.",
            antes: {
              dias: 5,
              quando: "Cinco dias antes",
              prazo: "cinco dias",
              texto: "Pare de usar ácidos no rosto, como o glicólico ou o salicílico.",
            },
            depois: "Reaplique o protetor solar ao longo do dia, por uma semana.",
          },
          {
            id: "sobrancelhas",
            nome: "Design de sobrancelhas",
            minutos: 30,
            preco: 70,
            descricao: "Medição do rosto e retirada dos fios com pinça. Os primeiros fios incomodam um pouco.",
            antes: {
              dias: 14,
              quando: "Duas semanas antes",
              prazo: "duas semanas",
              texto: "Deixe os fios crescerem, sem tirar nenhum.",
            },
            depois: "Evite maquiagem na região até o dia seguinte.",
          },
        ],
      },
      {
        nome: "Corpo",
        itens: [
          {
            id: "drenagem",
            nome: "Drenagem linfática",
            minutos: 60,
            preco: 150,
            descricao: "Massagem com movimentos leves e ritmados, sem apertar.",
            antes: { dias: 0, quando: "No dia", texto: "Faça uma refeição leve antes." },
            depois: "Beba água ao longo do dia.",
          },
          {
            id: "relaxante",
            nome: "Massagem relaxante",
            minutos: 60,
            preco: 160,
            descricao: "Massagem com óleo morno, em ritmo lento.",
            antes: { dias: 0, quando: "No dia", texto: "Chegue dez minutos antes para trocar de roupa com calma." },
            depois: "Se puder, não marque nada corrido logo depois.",
          },
          {
            id: "esfoliacao",
            nome: "Esfoliação corporal",
            minutos: 45,
            preco: 130,
            descricao: "Esfoliação com sal fino e hidratação. A pele fica mais sensível por um dia.",
            antes: { dias: 0, quando: "No dia", texto: "Não se depile." },
            depois: "Hidrate a pele à noite.",
          },
          {
            id: "pedras",
            nome: "Massagem com pedras quentes",
            minutos: 75,
            preco: 190,
            descricao: "Pedras de basalto aquecidas, apoiadas nas costas. O calor é ajustado na hora.",
            aoMarcar: "Avise se estiver grávida ou tiver problema de circulação.",
            antes: { dias: 0, quando: "No dia", texto: "Evite refeição pesada nas duas horas anteriores." },
            depois: "Beba água ao longo do dia.",
          },
        ],
      },
    ],
    visita: {
      titulo: "Sua visita",
      vazio: "Marque um ou mais procedimentos para somar o tempo e juntar os cuidados.",
      total: "Tempo total da visita",
      contagem: { um: "procedimento", varios: "procedimentos" },
      escala: { minutos: 540, legenda: "Na escala de um dia de atendimento, das 10h às 19h." },
      valor: "Valor de exemplo",
      antecedencia: "Marque com pelo menos {prazo} de antecedência.",
      longa: { minutos: 180, texto: "É uma visita longa. Se preferir, dividimos em dois dias." },
      conflitos: [
        {
          ids: ["peeling", "limpeza"],
          texto:
            "Peeling de diamante e limpeza de pele ficam melhor em dias diferentes, porque a limpeza pede três dias sem esfoliar.",
        },
      ],
      cta: "Agendar esta visita pelo WhatsApp",
      ctaVazio: "Agendar pelo WhatsApp",
      limpar: "Desmarcar tudo",
      verVisita: "Ver a visita",
      voltarLista: "Voltar à lista",
      cuidadosTitulo: "Os cuidados da sua visita",
      aoMarcar: "Ao marcar",
      depois: "Depois",
      mensagem: {
        rotulo: "A mensagem iria assim:",
        modelo: "Olá! Quero marcar {procedimentos}, {tempo} no total. Que dias vocês têm?",
      },
      inicial: [],
    },
  },

  galeria: {
    label: "Galeria",
    fotos: [
      {
        imagem: "clinica-galeria-sombra",
        alt: "Sombra de folhas numa parede clara, com luz suave.",
        legenda: "Sombra de folhas na parede",
      },
      {
        imagem: "clinica-galeria-eucalipto",
        alt: "Ramos de eucalipto contra um fundo cinza.",
        legenda: "Eucalipto",
      },
      {
        imagem: "clinica-galeria-cortina",
        alt: "Sombra de uma planta numa cortina clara, com luz atravessando o tecido.",
        legenda: "Cortina de linho com sombra de planta",
      },
      {
        imagem: "clinica-galeria-ceramica",
        alt: "Detalhe de um vaso de cerâmica clara com relevo.",
        legenda: "Cerâmica com relevo",
      },
      {
        imagem: "clinica-galeria-pedras",
        alt: "Sete pedras de basalto escuras e lisas sobre um fundo escuro.",
        legenda: "Pedras de basalto, como as da massagem com pedras quentes",
      },
      {
        imagem: "clinica-galeria-linho",
        alt: "Cortina de linho bege caída sobre um piso de madeira.",
        legenda: "Linho caído no chão",
      },
    ],
  },

  comoFunciona: {
    titulo: "Como funciona",
    faixaLabel: "Passos da visita",
    anterior: "Ver o passo anterior",
    proximo: "Ver o próximo passo",
    passos: [
      {
        titulo: "Você escolhe",
        texto: "Marque os procedimentos na lista e veja quanto tempo a visita leva.",
        imagem: "clinica-passo-folhas",
      },
      {
        titulo: "Marca pelo WhatsApp",
        texto: "Combine dia e horário. A confirmação já diz quem vai atender.",
        imagem: "clinica-passo-janela",
      },
      {
        titulo: "Com antecedência",
        texto: "Mandamos os cuidados de antes com o prazo de cada um. Alguns começam duas semanas antes.",
        imagem: "clinica-passo-tarde",
      },
      {
        titulo: "No dia",
        texto: "Cada horário tem 15 minutos de folga. Ninguém espera e ninguém apressa você.",
        imagem: "clinica-passo-sala",
      },
      {
        titulo: "Durante",
        texto: "Explicamos cada etapa antes de começar. Você pode pedir uma pausa quando quiser.",
        imagem: "clinica-passo-capim",
      },
      {
        titulo: "Depois",
        texto: "Você sai com os cuidados por escrito e recebe uma mensagem no dia seguinte.",
        imagem: "clinica-passo-flores",
      },
    ],
  },

  perguntas: {
    titulo: "Antes de marcar",
    itens: [
      {
        pergunta: "Preciso marcar horário?",
        resposta: "Sim. A Vagar só atende com hora marcada, para ninguém esperar.",
      },
      {
        pergunta: "E se eu me atrasar?",
        resposta: "Cada horário tem 15 minutos de folga. Passando disso, remarcamos sem custo.",
      },
      {
        pergunta: "Vocês prometem resultado?",
        resposta:
          "Não. Cada procedimento da lista diz como é feito e o que você pode sentir, sem promessa e sem foto de antes e depois.",
      },
      {
        pergunta: "Posso fazer mais de um procedimento no mesmo dia?",
        resposta: "Pode. Marque os procedimentos na lista para ver o tempo total e juntar os cuidados.",
        link: { label: "Ir para a lista", href: "#procedimentos" },
      },
      {
        pergunta: "Como posso pagar?",
        resposta: "Pix, cartão de débito ou de crédito, no dia do atendimento.",
      },
      {
        pergunta: "Posso cancelar?",
        resposta: "Pode, avisando pelo WhatsApp até 24 horas antes.",
      },
    ],
  },

  contato: {
    titulo: "Contato",
    frase: "Marque pelo WhatsApp e conte se é a sua primeira vez.",
    imagem: { chave: "clinica-contato-tigela", alt: "Tigela de cerâmica creme." },
    pergunta: "Quer marcar um horário?",
    agendar: "Agendar pelo WhatsApp",
    rever: { label: "Rever os procedimentos", href: "#procedimentos" },
    cidade: "Rio de Janeiro, RJ. Respondemos em até duas horas, de terça a sábado.",
  },

  horarios: {
    titulo: "Horários",
    linhas: ["Terça a sexta, das 10h às 19h", "Sábado, das 9h às 15h", "Domingo e segunda, fechado"],
  },

  rodape: {
    local: ["Vagar Estética", "Rio de Janeiro, RJ"],
    navegacao: "Navegação",
    contato: "Contato",
    whatsapp: "WhatsApp",
    atendimento: "Só com hora marcada",
    legal: "© 2026 Vagar Estética. Negócio fictício, criado como projeto de portfólio.",
    creditos: "Fotos do Unsplash por",
  },
} as const;
