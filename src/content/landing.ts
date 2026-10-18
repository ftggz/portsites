export const site = {
  marca: "[MARCA]",
  url: "https://dominio-a-confirmar.example",
  whatsapp: "[A CONFIRMAR]",
  email: "[A CONFIRMAR]",
  instagram: "[A CONFIRMAR]",
  documento: "CPF 205.831.427-10",
  cidade: "Rio de Janeiro",
  estado: "RJ",
  ano: 2026,
  atualizadoEm: "2026-10-18",
} as const;

export const conceito = {
  aviso: "Projeto conceito de portfólio. Negócio fictício.",
  pular: "Pular para o conteúdo",
  voltar: "Ver o portfólio",
  voltarHref: "/#portfolio",
  demo: {
    titulo: "Este site é uma demonstração",
    texto: "O negócio é fictício e o WhatsApp está desligado. Nenhuma mensagem é enviada.",
    fechar: "Entendi",
  },
} as const;

export const landing = {
  meta: {
    title: `${site.marca} | Sites para negócios locais do Rio de Janeiro`,
    description:
      "Site profissional para negócio local do Rio, rápido no celular e feito em código, que leva o cliente direto ao seu WhatsApp. Manutenção de R$ 129 por mês.",
    ogAlt: `${site.marca}: da busca ao WhatsApp. Sites para negócios locais do Rio de Janeiro.`,
  },
  pularLink: "Pular para o conteúdo",
  navLabel: "Seções da página",
  nav: [
    { label: "Portfólio", href: "#portfolio" },
    { label: "Planos", href: "#planos" },
    { label: "Contato", href: "#contato" },
  ],

  hero: {
    // Cada linha precisa caber inteira a 320 px de largura, porque a linha d'água corta o título
    // contando com exatamente duas linhas.
    titleLines: ["Da busca ao", "WhatsApp"],
    lead: "Site profissional para negócio local do Rio, rápido no celular, que leva quem procura direto para o seu WhatsApp.",
    primary: { label: "Quero um site", href: "#contato" },
    secondary: { label: "Ver portfólio", href: "#portfolio" },
  },

  problema: {
    titulo: "Procuram você à noite",
    nota: "Seu cliente decide depois do expediente, pelo celular. Se o seu negócio não aparece com endereço, horário e um jeito fácil de chamar, ele fecha com quem aparece.",
    fatosLabel: "Uma noite comum",
    fatos: [
      { hora: "22h10", texto: "Alguém procura “pizzaria perto de mim”." },
      { hora: "22h11", texto: "O concorrente aparece, com cardápio e WhatsApp." },
      { hora: "22h14", texto: "O pedido vai para ele." },
      { hora: "8h00", texto: "Você abre e nem sabe que perdeu esse cliente." },
    ],
  },

  portfolio: {
    titulo: "Três sites de exemplo",
    etiqueta: "Projeto conceito",
    linkLabel: "Ver o site",
    projetos: [
      {
        slug: "clinica",
        nome: ["Vagar", "Estética"],
        nicho: "Clínica de estética",
        descricao:
          "Procedimentos com duração e cuidados à vista, agendamento pelo WhatsApp e muito espaço em branco. Sem promessa de resultado e sem foto de antes e depois.",
        href: "/portfolio/clinica-estetica",
        imagens: {
          computador: "print-clinica-desktop",
          celular: "print-clinica-mobile",
        },
      },
      {
        slug: "oficina",
        nome: ["Às Claras", "Mecânica"],
        nicho: "Oficina mecânica",
        descricao:
          "Serviços com preço de exemplo e orçamento pelo WhatsApp. O cliente recebe foto e vídeo de cada etapa do conserto, como o nome promete.",
        href: "/portfolio/oficina-mecanica",
        imagens: {
          computador: "print-oficina-desktop",
          celular: "print-oficina-mobile",
        },
      },
      {
        slug: "pizzaria",
        nome: ["Forno", "Aceso"],
        nicho: "Pizzaria de forno a lenha",
        descricao:
          "Cardápio por categoria com tamanhos, bairros de entrega, pedido pelo WhatsApp e o forno sempre à vista, dizendo se está aceso agora.",
        href: "/portfolio/pizzaria",
        imagens: {
          computador: "print-pizzaria-desktop",
          celular: "print-pizzaria-mobile",
        },
      },
    ],
  },

  comoFunciona: {
    titulo: "Como funciona",
    pedidoLabel: "Você manda",
    respostaLabel: "Você recebe",
    passos: [
      {
        frase: "Primeiro, faço uma demonstração do seu site.",
        pedido: "Oi! Tenho uma oficina em Madureira e queria um site.",
        resposta:
          "Em até 5 dias úteis, o link de uma demonstração com o nome, os serviços e as fotos do seu negócio.",
      },
      {
        frase: "Depois, você aprova e pede ajustes.",
        pedido: "Dá para trocar a foto do topo e pôr o horário de sábado?",
        resposta: "Os ajustes na mesma demonstração, quantas vezes for preciso, até você aprovar.",
      },
      {
        frase: "Então, publico no seu domínio.",
        pedido: "E o endereço do site, como fica?",
        resposta:
          "O site no ar no seu endereço, com o cadeado no navegador. O domínio fica registrado no seu nome, e eu configuro o site para abrir nele.",
      },
      {
        frase: "Todo mês, cuido do site.",
        pedido: "Muda o preço da revisão para R$ 180?",
        resposta:
          "A alteração no ar em até 48 horas úteis, contando como uma das 3 do mês.",
      },
    ],
    cta: { label: "Quero a minha demonstração", href: "#contato" },
  },

  planos: {
    titulo: "Planos",
    lista: [
      {
        nome: "Criação",
        publico: "Para tirar o site do papel, uma vez só.",
        preco: {
          tipo: "projecao",
          texto: "Valor projetado para o seu negócio",
          nota: "Você recebe a projeção antes de decidir e paga uma vez.",
        },
        inclui: "Demonstração, ajustes até a sua aprovação e publicação no seu domínio.",
      },
      {
        nome: "Manutenção",
        publico: "Começa quando o site é publicado e faz parte do serviço, porque é ela que mantém o site no ar.",
        preco: { tipo: "fixo", moeda: "R$", valor: "129", periodo: "por mês" },
        inclui:
          "Hospedagem, HTTPS (o cadeado no navegador), atualizações de segurança, cópia de segurança e até 3 alterações por mês, entregues em até 48 horas úteis.",
      },
    ],
    cta: { label: "Quero um site", href: "#contato" },
    foraTitulo: "Fica de fora",
    fora: [
      "O domínio, que fica no seu nome e você paga direto ao Registro.br.",
      "Fotos profissionais.",
      "Funcionalidades novas, como agendamento ou loja, que vão em orçamento à parte.",
    ],
  },

  diferenciais: {
    titulo: "O que você recebe",
    itens: [
      {
        nome: "Feito em código",
        texto: "Escrevo cada site do zero, para o seu negócio, sem partir de um modelo pronto.",
      },
      {
        nome: "Abre rápido",
        texto: "Páginas e fotos leves, para abrir rápido mesmo no 4G. Meço antes de publicar.",
      },
      {
        nome: "Pensado para celular",
        texto: "Desenho primeiro para a tela pequena, que é onde o seu cliente procura.",
      },
      {
        nome: "Segurança revisada",
        texto: "Reviso a segurança antes de cada publicação, do cadeado no navegador ao código.",
      },
      {
        nome: "No seu nome",
        texto: "O domínio fica no seu nome e o código é seu. Se um dia sair, leva os dois.",
      },
    ],
  },

  perguntas: {
    titulo: "Perguntas",
    itens: [
      {
        pergunta: "Quanto custa?",
        resposta:
          "A criação tem um valor projetado para cada negócio, que você recebe antes de decidir e paga uma vez. A manutenção custa R$ 129 por mês.",
      },
      {
        pergunta: "Preciso contratar a manutenção?",
        resposta:
          "Sim. É a manutenção que paga a hospedagem e mantém o site no ar e seguro. Se um dia cancelar, você leva os arquivos.",
      },
      {
        pergunta: "Como pago?",
        resposta: "Por Pix ou cartão [A CONFIRMAR].",
      },
      {
        pergunta: "Qual é o prazo?",
        resposta:
          "A demonstração fica pronta em até 5 dias úteis depois que você me manda as informações do negócio. A publicação acontece assim que você aprova.",
      },
      {
        pergunta: "O que conta como uma alteração?",
        resposta:
          "Trocar um texto, um preço, um horário, uma foto ou um item do cardápio. Uma página ou uma função nova, como agendamento, é orçada à parte.",
      },
      {
        pergunta: "E o domínio?",
        resposta:
          "O domínio, como seunegocio.com.br, é registrado no seu nome e pago por você direto ao Registro.br. Eu configuro o site para abrir nele.",
      },
      {
        pergunta: "E se eu cancelar?",
        resposta:
          "Você avisa e a manutenção para no mês seguinte. O domínio já é seu, e eu entrego os arquivos do site para você levar a outra hospedagem.",
      },
    ],
  },

  contato: {
    titulo: ["Me conte do", "seu negócio"],
    frase:
      "O formulário só monta o texto e abre o seu WhatsApp. O texto não passa por servidor nem fica guardado. Respondo em até 4 horas úteis.",
    previa: {
      rotulo: "A mensagem vai assim",
      vazio: { nome: "(seu nome)", negocio: "(seu negócio)", bairro: "(seu bairro)" },
    },
    campos: {
      nome: { label: "Seu nome", placeholder: "Ana Souza" },
      negocio: { label: "Seu negócio", placeholder: "Pizzaria da Ana" },
      bairro: { label: "Bairro", placeholder: "Vila Isabel" },
      mensagem: {
        label: "Mensagem (opcional)",
        placeholder: "Quero mostrar o cardápio e receber pedidos pelo WhatsApp.",
      },
    },
    erros: {
      nome: "Escreva seu nome.",
      negocio: "Escreva o nome ou o tipo do seu negócio.",
      bairro: "Escreva o bairro do seu negócio.",
      longo: "Use até {max} caracteres.",
      resumo: "Confira os campos marcados.",
    },
    modelo: "Olá! Meu nome é {nome} e quero um site para o meu negócio, {negocio}, em {bairro}.",
    enviar: "Abrir no WhatsApp",
    sucesso: "Abri o WhatsApp em outra aba. Respondo em até 4 horas úteis. Se não abriu, use este link.",
    sucessoLink: "Abrir o WhatsApp",
    semNumero: "O número de WhatsApp ainda não foi configurado [A CONFIRMAR]. A mensagem está pronta, mas não há para onde enviar.",
    direto: "Prefere não preencher?",
    diretoLink: "Chame direto no WhatsApp",
    diretoTexto: "Olá! Vi o seu site e quero saber como ter um site para o meu negócio.",
  },

  rodape: {
    convite: ["Apareça para", "quem procura"],
    cta: { label: "Quero um site", href: "/#contato" },
    contatosLabel: "Contato",
    contatos: [
      { kind: "whatsapp", label: "WhatsApp", valor: site.whatsapp },
      { kind: "email", label: "E-mail", valor: site.email },
      { kind: "instagram", label: "Instagram", valor: site.instagram },
    ],
    politica: { label: "Política de privacidade", href: "/politica-de-privacidade" },
    copyright: `© ${site.ano} ${site.marca}`,
  },

  privacidade: {
    meta: {
      title: `Política de privacidade | ${site.marca}`,
      description: `Como o site da ${site.marca} trata os dados de quem visita e de quem usa o formulário de contato.`,
    },
    titulo: "Política de privacidade",
    atualizada: "Atualizada em 18 de outubro de 2026.",
    voltar: "Voltar para o início",
    secoes: [
      {
        titulo: "Quem é responsável",
        paragrafos: [
          `${site.marca}, ${site.documento}, é responsável por este site. Para falar sobre privacidade, escreva para ${site.email}.`,
        ],
      },
      {
        titulo: "O que este site guarda",
        paragrafos: [
          "O site não tem banco de dados e não usa cookies próprios. Também não carrega ferramentas de análise, publicidade ou rastreamento.",
          "As fontes e as imagens são servidas pelo próprio site, sem pedir nada a serviços de terceiros.",
        ],
      },
      {
        titulo: "O formulário de contato",
        paragrafos: [
          "Nome, negócio, bairro e mensagem servem só para montar o texto que abre no seu WhatsApp. O texto é montado no seu próprio navegador, não passa por servidor e não é salvo.",
          "A mensagem só chega até mim se você enviá-la no WhatsApp. A partir daí, vale também a política de privacidade do WhatsApp.",
        ],
      },
      {
        titulo: "Conversas no WhatsApp",
        paragrafos: [
          "Uso o que você me escreve só para responder e preparar o orçamento. Se pedir, apago a conversa.",
        ],
      },
      {
        titulo: "Hospedagem",
        paragrafos: [
          "O site fica hospedado na Vercel, empresa dos Estados Unidos, que pode registrar dados técnicos de acesso, como endereço IP e tipo de navegador, para segurança e funcionamento do serviço.",
        ],
      },
      {
        titulo: "Seus direitos",
        paragrafos: [
          `Pela Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode pedir acesso, correção ou exclusão dos seus dados pessoais. Escreva para ${site.email}.`,
        ],
      },
      {
        titulo: "Mudanças nesta política",
        paragrafos: ["Se esta política mudar, a data no topo da página muda junto."],
      },
    ],
  },

  naoEncontrada: {
    meta: { title: `Página não encontrada | ${site.marca}` },
    titulo: "Esta página não existe",
    texto: "O endereço pode estar errado ou a página mudou de lugar.",
    voltar: "Voltar para o início",
  },
} as const;
