# Design systems

Quatro identidades, uma por site. Os valores vivem em `src/styles/sites/<site>.css` (escopados por `[data-site]`); este arquivo registra as decisões que o CSS não mostra. As fichas completas da Taste Skill ficam em `.taste-skill/<site>.json` (fora do git).

Todas as fontes são do Google Fonts (OFL), servidas pelo próprio site via `next/font`. Contraste conferido com `node scripts/contrast.mjs`.

| | Landing | Clínica (Vagar) | Oficina (Às Claras) | Pizzaria (Forno Aceso) |
| --- | --- | --- | --- | --- |
| Direção | Type and nothing else | Photographs at uneven sizes | The well-kept board | The split stage |
| Topo | Waterline headline | Small name, open sky | Two-by-two board | Striped card beside the room |
| Fonte | Newsreader | Work Sans | Hanken Grotesk | EB Garamond |
| Paleta | Oxblood e cinza | Ardósia, sálvia, pedra e oliva | Preto, branco gelo e amarelo de segurança | Rosado e berinjela |
| Raio | 0 | 0 | 0 | 16 px, botão em pílula |
| DESIGN_VARIANCE | 4 | 6 | 3 | 5 |
| MOTION_INTENSITY | 3 | 4 | 2 | 5 |
| VISUAL_DENSITY | 5 | 2 | 7 | 5 |

A Taste Skill instalada é a v2, que não tem esses três controles. Os números são o alvo; variância orienta a direção e a composição, movimento orienta o orçamento de animação e densidade orienta a escala de espaçamento e o conteúdo por tela.

## Ideia e elemento vivo

- **Landing.** O caminho do cliente, da busca até a conversa no WhatsApp, vira a linha que divide o topo em dois campos. No contato, a mensagem do WhatsApp se monta na tela enquanto a pessoa preenche o formulário.
- **Clínica.** Vagar é tempo sem pressa; a duração e os cuidados de cada procedimento medem a página. "Monte sua visita" soma o tempo dos procedimentos marcados e lista os cuidados.
- **Oficina.** O jogo de soquetes, onde cada peça tem seu lugar, vira o quadro de blocos; tudo fica à vista. "Acompanhe um serviço" mostra a foto e a mensagem de cada etapa de um serviço de exemplo, com o orçamento aberto em mão de obra e peças.
- **Pizzaria.** O forno fica sempre à vista na metade parada da tela. A página diz, pelo horário do Rio, se o forno está aceso agora, e o pedido se monta como uma comanda.

## Seções planejadas

- **Landing.** Problema (título, nota, linha de fatos) · Portfólio (título e um bloco por site com print grande) · Como funciona (conversa no padrão do WhatsApp, com a mensagem do cliente à direita) · Planos (Criação no fundo, Manutenção no oxblood, um botão só) · Diferenciais (cinco linhas em tamanho de cartaz) · Perguntas (texto corrido em duas colunas) · Contato (cupom com a mensagem ao vivo) · Rodapé (convite sobre o nome cortado). As seções vizinhas alternam fundo e superfície; nenhuma fica no mesmo cinza da anterior.
- **Clínica.** Procedimentos (lista à direita; "Sua visita" presa à esquerda, com a barra do tempo num dia de atendimento, e os cuidados em linha do tempo, do prazo mais longo ao dia seguinte) · Galeria (pares desencontrados) · Como funciona (faixa horizontal) · Perguntas (`<details>` recuados) · Contato (frase, foto, botão e link) · Rodapé (colunas e nome em largura total, sem a cortina, que o inspetor lê como título coberto).
- **Oficina.** Serviços (palavra gigante, barras `<details>` com o preço da mão de obra e "+ peças", bloco para quem não sabe o defeito) · Tudo à vista (foto de um jogo de soquetes cortada em blocos) · Como funciona (três blocos que crescem, cada passo com a sua foto) · Acompanhe um serviço (conversa do WhatsApp; a foto troca ao lado no desktop e abre embaixo da mensagem no celular) · Marcas (nomes em tamanho de cartaz) · Galeria (faixa arrastável) · Perguntas (uma faixa por pergunta) · Contato (barra de orçamento em três células) · Rodapé (nome em blocos com medidas de soquete). O amarelo marca as ações e o que é do cliente: o balão "Você" e os passos 1 e 3.
- **Pizzaria.** Cardápio (foto parada e lista ativa) · Galeria (uma moldura que troca de foto) · Como pedir (comanda serrilhada) · Perguntas (sanfona ao lado de foto alta) · Localização e horários (linhas grandes) · Rodapé (foto e menu).

## O que mudou em relação ao sorteio

- **Landing.** Paleta (tabaco e oliva lembrava charutaria e caía em creme com ocre); fonte duas vezes (Zodiak e Cabinet Grotesk são da Fontshare); portfólio (a planta pedia 10 a 18 projetos); planos (tabela de planos concorrentes, depois recibo, que repetiria a comanda da pizzaria); contato (planta sem formulário).
- **Clínica.** Paleta (tangerina viva demais para delicada); blush retirado dos campos para não repetir a pizzaria; foto do topo espelhada no recorte horizontal.
- **Oficina.** Paleta (verde-floresta puxava para ecologia); fonte (General Sans é da Fontshare); carmim trocado pelo amarelo de segurança, cor do próprio assunto, para não repetir o vermelho da landing; como funciona (diagrama abstrato sem etapas concretas). Na construção: o contato ficou sem a tira de fotos, que repetia fotos da página; os títulos usam o tamanho de enunciado, e o de "Tudo à vista" ocupa dois blocos; a foto cortada é um jogo de soquetes, porque as paredes de ferramentas livres no Unsplash eram de bicicletaria.
- **Pizzaria.** Paleta (azul-marinho com rosa não é calorosa); fonte duas vezes (Bodoni Moda "joalheria e moda", Archivo "finanças"); contato (e-mail gigante, quando o contato real é WhatsApp, cidade e horário).

## Regras que valem para os quatro

- Sem atributo `style` no HTML: o CSP não terá `'unsafe-inline'` em `style-src`. Atrasos de animação usam `:nth-child`.
- Toda animação fica dentro de `@media (prefers-reduced-motion: no-preference)`; com movimento reduzido, a página já aparece pronta.
- Dentro de um campo de cor, use `.on-field-N`, que troca a cor do anel de foco para a tinta do campo.
- O aviso de projeto conceito é neutro (preto e branco, fonte do sistema), para não parecer parte da marca fictícia.
- Nos sites conceito, o link "Pular para o conteúdo" fica no layout de portfólio, antes do aviso, para ser a primeira parada do Tab; cada página só precisa ter o `<main id="conteudo">`.
