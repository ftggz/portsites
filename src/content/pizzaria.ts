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
    { label: "Como pedir", href: "#pedido" },
    { label: "Entrega", href: "#entrega" },
    { label: "Horários", href: "#horarios" },
  ],
  moeda: "R$",

  // Horário do forno, no fuso do Rio. Os minutos contam a partir da meia-noite; 0 é domingo.
  funcionamento: {
    fuso: "America/Sao_Paulo",
    diasAbertos: [0, 2, 3, 4, 5, 6],
    abre: 1080,
    ultimoPedido: 1380,
    fecha: 1410,
  },

  hero: {
    titleLines: ["Pizza à lenha,", "quentinha em casa"],
    lead: "Massa de fermentação lenta, forno aceso das 18h às 23h30 e entrega em oito bairros da Zona Sul.",
    cta: "Pedir pelo WhatsApp",
    status: {
      padrao: "O forno acende às 18h, de terça a domingo.",
      aceso: "Forno aceso agora. Pedidos até as 23h.",
      fechando: "Forno aceso até 23h30. Os pedidos de hoje já fecharam.",
      hoje: "Forno apagado agora. Acende hoje às 18h.",
      amanha: "Forno apagado agora. Acende amanhã às 18h.",
      outroDia: "Forno apagado agora. Acende {dia} às 18h.",
      dias: ["no domingo", "na segunda", "na terça", "na quarta", "na quinta", "na sexta", "no sábado"],
    },
    imagem: {
      key: "pizzaria-hero",
      alt: "Pizza saindo do forno a lenha numa pá de metal, com o fogo aceso ao fundo.",
    },
  },

  // Foto da metade parada da tela enquanto cada seção passa; no cardápio ela segue a pizza em destaque.
  palco: {
    pedido: "pizzaria-caixa",
    entrega: "pizzaria-caixas",
    galeria: "pizzaria-fogo",
    perguntas: "pizzaria-forno",
  },

  cardapio: {
    titulo: "Cardápio",
    nota: "Preços de exemplo. A média tem 6 fatias e a grande, 8.",
    indice: "Categorias do cardápio",
    tamanhos: { media: "Média", grande: "Grande" },
    adicionar: "Pôr na comanda",
    noPedido: "{qtd} na comanda",
    categorias: [
      {
        id: "classicas",
        nome: "Clássicas",
        itens: [
          {
            id: "margherita",
            nome: "Margherita",
            descricao: "Molho de tomate, muçarela de búfala e manjericão.",
            precos: { media: 52, grande: 68 },
            imagem: { key: "pizzaria-margherita", mini: "pizzaria-margherita-mini", alt: "Pizza margherita com folhas de manjericão sobre a muçarela." },
          },
          {
            id: "calabresa",
            nome: "Calabresa",
            descricao: "Calabresa artesanal em rodelas finas sobre muçarela.",
            precos: { media: 54, grande: 70 },
            imagem: { key: "pizzaria-calabresa", mini: "pizzaria-calabresa-mini", alt: "Pizza de calabresa fatiada sobre uma tábua de madeira." },
          },
          {
            id: "portuguesa",
            nome: "Portuguesa",
            descricao: "Presunto, ovo, cebola, ervilha e azeitona.",
            precos: { media: 58, grande: 76 },
          },
          {
            id: "queijos",
            nome: "Quatro queijos",
            descricao: "Muçarela, gorgonzola, parmesão e catupiry.",
            precos: { media: 60, grande: 78 },
            imagem: { key: "pizzaria-queijos", mini: "pizzaria-queijos-mini", alt: "Pizza de queijos fatiada sobre uma toalha xadrez azul." },
          },
        ],
      },
      {
        id: "da-casa",
        nome: "Da casa",
        itens: [
          {
            id: "forno-aceso",
            nome: "Forno Aceso",
            descricao: "Linguiça de pernil, cebola caramelizada e provolone defumado.",
            precos: { media: 64, grande: 82 },
          },
          {
            id: "parma",
            nome: "Parma e rúcula",
            descricao: "Presunto cru, rúcula e lascas de parmesão, postos depois do forno.",
            precos: { media: 68, grande: 88 },
            imagem: { key: "pizzaria-parma", mini: "pizzaria-parma-mini", alt: "Pizza coberta de rúcula fresca sobre uma tábua." },
          },
          {
            id: "abobrinha",
            nome: "Abobrinha na brasa",
            descricao: "Abobrinha, ricota fresca, hortelã e raspas de limão.",
            precos: { media: 58, grande: 76 },
          },
          {
            id: "carne-seca",
            nome: "Carne seca",
            descricao: "Carne seca desfiada, catupiry e cebola roxa.",
            precos: { media: 66, grande: 86 },
          },
        ],
      },
      {
        id: "doces",
        nome: "Doces",
        itens: [
          {
            id: "chocolate",
            nome: "Chocolate",
            descricao: "Chocolate meio amargo derretido sobre a massa fina.",
            precos: { media: 52, grande: 66 },
            imagem: { key: "pizzaria-chocolate", mini: "pizzaria-chocolate-mini", alt: "Pizza doce coberta de chocolate em fios." },
          },
          {
            id: "banana",
            nome: "Banana com canela",
            descricao: "Banana, açúcar mascavo, canela e muçarela.",
            precos: { media: 46, grande: 58 },
          },
          {
            id: "romeu",
            nome: "Romeu e Julieta",
            descricao: "Goiabada cascão e queijo minas.",
            precos: { media: 48, grande: 62 },
          },
        ],
      },
      {
        id: "bebidas",
        nome: "Bebidas",
        itens: [
          { id: "guarana", nome: "Guaraná, lata", preco: 7 },
          { id: "mate", nome: "Mate gelado, 500 ml", preco: 9 },
          { id: "caju", nome: "Suco de caju, 500 ml", preco: 12 },
          { id: "agua", nome: "Água com gás", preco: 6 },
        ],
      },
    ],
  },

  pedido: {
    titulo: "Como pedir",
    texto: "A gente confirma o endereço pelo WhatsApp e responde com o horário de chegada. O pagamento é na entrega, por Pix, cartão ou dinheiro.",
    comanda: {
      titulo: "Comanda",
      passos: ["Escolha as pizzas no cardápio", "Diga se é entrega ou retirada", "Mande a comanda pelo WhatsApp"],
      bairro: {
        label: "Entrega ou retirada",
        escolha: "Escolha o bairro ou a retirada",
        retirada: "Retirar no balcão",
        dica: "Fora desses oito bairros, dá para retirar no balcão.",
      },
      observacao: { label: "Observação", dica: "Meio a meio, troco para quanto, sem cebola." },
      entrega: "Entrega em {bairro}",
      retirada: "Retirada no balcão",
      semTaxa: "sem taxa",
      total: "Total",
      tempoEntrega: "Chega em cerca de {min} min",
      tempoRetirada: "Pronta em cerca de {min} min",
      menos: "Diminuir a quantidade de {item}",
      mais: "Aumentar a quantidade de {item}",
      enviar: "Pedir pelo WhatsApp",
      semItens: "A comanda ainda está vazia.",
      semItensLink: "Escolher no cardápio",
      semBairro: "Escolha o bairro ou a retirada no balcão.",
      limpar: "Limpar a comanda",
      desfazer: "Desfazer a limpeza",
      anuncios: {
        qtd: "{qtd} {item} na comanda. Total {total}.",
        saiu: "{item} saiu da comanda.",
        limpa: "Comanda limpa.",
        voltou: "A comanda voltou.",
      },
      mensagem: {
        abertura: "Olá! Quero pedir:",
        entrega: "Entrega em {bairro} ({taxa}).",
        retirada: "Vou retirar no balcão.",
        observacao: "Observação: {texto}",
        total: "Total: {total}.",
        rotulo: "Sua comanda iria assim",
      },
    },
    barra: { um: "item", varios: "itens", subtotal: "subtotal", ver: "Ver comanda" },
    // Com itens na comanda, os botões de WhatsApp de fora dela levam até a comanda.
    mandar: { um: "Mandar a comanda, 1 item", varios: "Mandar a comanda, {qtd} itens" },
  },

  entrega: {
    titulo: "Entrega",
    texto: "Oito bairros da Zona Sul, de terça a domingo, com pedidos até as 23h.",
    colunas: { bairro: "Bairro", taxa: "Taxa", tempo: "Tempo" },
    minutos: "{min} min",
    bairros: [
      { nome: "Botafogo", taxa: 6, tempo: 30 },
      { nome: "Flamengo", taxa: 6, tempo: 30 },
      { nome: "Humaitá", taxa: 7, tempo: 35 },
      { nome: "Laranjeiras", taxa: 7, tempo: 35 },
      { nome: "Catete", taxa: 7, tempo: 35 },
      { nome: "Urca", taxa: 8, tempo: 40 },
      { nome: "Glória", taxa: 8, tempo: 40 },
      { nome: "Jardim Botânico", taxa: 9, tempo: 45 },
    ],
    retirada: { tempo: 25, texto: "Retirada no balcão sem taxa, pronta em cerca de 25 minutos." },
  },

  galeria: {
    titulo: "Do forno",
    lista: "Fotos do forno",
    fotos: [
      { key: "pizzaria-galeria-massa", legenda: "A massa descansa 48 horas antes de abrir.", alt: "Mãos segurando uma bola de massa enfarinhada." },
      { key: "pizzaria-galeria-farinha", legenda: "Cada bola de massa vira uma pizza média.", alt: "Bola de massa sobre um pano escuro com farinha." },
      { key: "pizzaria-galeria-molho", legenda: "O molho é de tomate pelado, sem açúcar.", alt: "Molho de tomate espalhado sobre a massa aberta, no balcão de inox." },
      { key: "pizzaria-galeria-assando", legenda: "A lenha é de eucalipto, e o forno passa dos 400 °C.", alt: "Pizzas assando no forno a lenha, com o fogo ao fundo." },
      { key: "pizzaria-galeria-borda", legenda: "Noventa segundos lá dentro, e a borda sai com bolhas.", alt: "Pizza dentro do forno, perto da boca, com a lenha acesa." },
    ],
    proxima: "Próxima foto",
    pausar: "Pausar as fotos",
    continuar: "Continuar as fotos",
  },

  perguntas: {
    titulo: "Antes do pedido",
    fatos: ["Rio de Janeiro, RJ", "Terça a domingo, das 18h às 23h30", "Entrega e retirada no balcão"],
    itens: [
      {
        pergunta: "Quanto tempo leva a entrega?",
        resposta: "De 30 a 45 minutos, conforme o bairro. O tempo de cada um está na tabela de entrega.",
      },
      {
        pergunta: "Posso pedir meio a meio?",
        resposta: "Pode, nas pizzas grandes. Ponha na comanda a grande do sabor mais caro e escreva o outro sabor na observação.",
      },
      {
        pergunta: "Tem pizza sem glúten?",
        resposta: "Não. A farinha circula pela cozinha toda, e não dá para garantir uma pizza sem contato com o glúten.",
      },
      {
        pergunta: "Como pago?",
        resposta: "Pix, cartão ou dinheiro na entrega. Se precisar de troco, escreva na observação da comanda.",
      },
      {
        pergunta: "Posso buscar no balcão?",
        resposta: "Pode. Escolha a retirada na comanda e passe na hora combinada, sem taxa de entrega.",
      },
      {
        pergunta: "A pizza chega quente?",
        resposta: "Sai do forno direto para a caixa, que vai numa bolsa térmica. Nenhum pedido espera mais de cinco minutos no balcão.",
      },
    ],
    botao: "Pedir pelo WhatsApp",
    link: { label: "Ver o cardápio", href: "#cardapio" },
    imagem: { key: "pizzaria-forno", alt: "Forno a lenha aceso, com uma pizza lá dentro e pratos empilhados ao lado." },
  },

  contato: {
    titulo: "Horários e contato",
    linhas: ["Forno Aceso", "Rio de Janeiro, RJ", "Terça a domingo", "Das 18h às 23h30", "Segunda, forno apagado"],
    chamada: "Peça agora",
    botao: "Pedir pelo WhatsApp",
  },

  rodape: {
    navegacao: "Navegação",
    contato: "Contato",
    whatsapp: "WhatsApp",
    local: "Rio de Janeiro, RJ",
    legal: "© 2026 Forno Aceso Pizzaria. Negócio fictício, criado como projeto de portfólio.",
    creditos: "Fotos do Unsplash por",
    topo: "Voltar ao topo",
    imagem: "pizzaria-rodape",
  },
} as const;
