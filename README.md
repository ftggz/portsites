# Site da [MARCA] e portfólio de sites conceito

Landing page do serviço de criação de sites para pequenos negócios do Rio de Janeiro, com três sites conceito de negócios fictícios que servem de portfólio. Tudo fica num único projeto Next.js, publicado como site estático.

## Páginas

| Rota | O que é |
| --- | --- |
| `/` | Landing do serviço |
| `/portfolio/clinica-estetica` | Vagar Estética, clínica de estética fictícia |
| `/portfolio/oficina-mecanica` | Às Claras Mecânica, oficina fictícia |
| `/portfolio/pizzaria` | Forno Aceso, pizzaria fictícia |
| `/politica-de-privacidade` | Política de privacidade da landing |

Os sites conceito têm uma faixa fixa avisando que o negócio é fictício e ficam fora dos buscadores (`noindex`). Os botões de WhatsApp deles abrem um aviso de demonstração em vez de mandar mensagem.

## Antes de publicar

O que ainda não foi definido aparece na tela como `[MARCA]` ou `[A CONFIRMAR]`. Tudo fica em `src/content/landing.ts`:

- `site.marca`: nome do negócio.
- `site.whatsapp`: número com DDD, com ou sem o 55, com qualquer pontuação. Enquanto estiver `[A CONFIRMAR]`, o formulário de contato monta a mensagem e avisa que ainda não há número.
- `site.email` e `site.instagram`. O e-mail também aparece na política de privacidade.
- `site.url`: o domínio definitivo. Entra no sitemap, no `robots.txt` e no link da imagem de compartilhamento.
- A resposta "Como pago?" das perguntas, que ainda diz "Por Pix ou cartão [A CONFIRMAR]".

## Requisitos

- Node.js 22 ou mais novo, com npm.
- Internet durante o build. O Next baixa as fontes do Google Fonts, e a imagem de compartilhamento da landing busca a Newsreader no Google Fonts.
- Chrome ou Edge, só para gerar os prints do portfólio.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm ci` | Instala as dependências na versão exata do `package-lock.json` |
| `npm run dev` | Servidor de desenvolvimento em <http://localhost:3000> |
| `npm run build` | Gera o site em `out/` e roda `scripts/postbuild.mjs`, que grava a CSP de cada página |
| `npm run preview` | Serve `out/` em <http://127.0.0.1:4321> com os cabeçalhos do `public/_headers` e gzip, como o Cloudflare Pages faria |
| `npm run check` | Lint, checagem de tipos e build, nessa ordem |
| `npm run lint` | Só o ESLint |
| `npm run typecheck` | Só a checagem de tipos |
| `npm run images` | Processa as fotos listadas em `assets/images.json` |
| `npm run prints` | Fotografa os sites conceito para os cards do portfólio |
| `npm run cn:tables` | Recompila as tabelas do `cn` depois de mudar o tema em `src/app/globals.css` |
| `node scripts/contrast.mjs` | Confere o contraste WCAG dos pares de cor de cada site |

O servidor de desenvolvimento não aplica a CSP. Para testar o site como ele vai ao ar, use `npm run build` e depois `npm run preview`.

## Onde mexer

- **Texto:** `src/content/landing.ts`, `clinica.ts`, `oficina.ts` e `pizzaria.ts`. Os componentes não têm texto fixo.
- **Visual de cada site:** `src/styles/sites/<site>.css`, com os tokens escopados por `[data-site]`. As decisões de design de cada site estão em `docs/design-systems.md`.
- **Componentes:** `src/components/<site>/`, e os compartilhados direto em `src/components/`.
- **Rotas:** `src/app/`. A landing e a política de privacidade ficam em `src/app/(landing)/`; os sites conceito, em `src/app/portfolio/`.

## Fotos

- A lista fica em `assets/images.json`: a foto no Unsplash, o autor, o recorte, as larguras e a qualidade de cada versão.
- `npm run images` baixa só os originais que faltam (em `assets/source/`, fora do git), recorta, gera WebP sem metadados em `public/images/` e reescreve `src/lib/images.generated.json` e o `CREDITS.md`.
- Todas as fotos são do Unsplash, com licença de uso comercial. O `CREDITS.md` traz autor e link de cada uma, e os créditos também aparecem no rodapé de cada site conceito.
- Para trocar uma foto, edite a entrada em `assets/images.json` e rode `npm run images`.

## Prints do portfólio

1. `npm run build`
2. `npm run prints` abre o Chrome ou o Edge sem janela, fotografa cada site conceito a 1440 × 900 e a 390 × 844, em resolução dobrada, e salva em `assets/source/prints/`. Se o navegador não for encontrado, defina a variável `CHROME_PATH` com o caminho dele.
3. `npm run images` gera os WebP usados nos cards da landing.

O print da pizzaria fixa o relógio numa sexta às 20h, para o forno aparecer aceso.

## Publicação no Cloudflare Pages

- No painel do Cloudflare, em **Workers & Pages → Create → Pages → Connect to Git**, escolha o repositório.
- Use **Framework preset: None**, **Build command: `npm run build`** e **Build output directory: `out`**. O Node 22 vem do arquivo `.node-version`. Não há variável de ambiente.
- Os cabeçalhos de segurança estão em `public/_headers`, que o build copia para `out/`.
- O site fica em `<projeto>.pages.dev`. Ponha esse endereço em `site.url` até existir um domínio próprio.
- Depois do primeiro deploy, siga a lista do fim de `docs/seguranca.md`: cabeçalhos com `curl -I`, redirecionamento para HTTPS, console sem violação de CSP e PageSpeed Insights.

## Segurança

O relatório completo, com os 20 controles verificados, está em `docs/seguranca.md`.

- A CSP de scripts usa um hash por script inline e não tem `'unsafe-inline'`. Ela é gravada em cada página pelo `scripts/postbuild.mjs`, porque os scripts do Next mudam a cada build. Os outros cabeçalhos ficam no `public/_headers`.
- O build falha se aparecer no HTML um atributo `style`, um bloco `<style>`, um evento inline (`onclick` e afins) ou uma URL `javascript:`. Por isso o código não usa `style` no JSX; variações e atrasos de animação vão por classes e atributos `data-`.
- Nenhum segredo vai para o repositório, e o `.env*` está no `.gitignore`.
- Links externos usam `rel="noopener noreferrer"`.

## Estrutura

```text
src/app/            rotas; landing em (landing)/, sites conceito em portfolio/
src/components/     componentes, com uma pasta por site
src/content/        todo o texto editável
src/styles/sites/   tokens e estilos de cada site
src/lib/            utilitários, manifesto das imagens e tabelas do cn
scripts/            pós-build, prévia, imagens, prints e contraste
assets/             lista das fotos; originais e prints ficam fora do git
public/images/      WebP gerados pelo npm run images
docs/               design systems e relatório de segurança
```

## Créditos

- **Fotos:** Unsplash, uma a uma no `CREDITS.md`.
- **Fontes:** Newsreader, Work Sans, Hanken Grotesk e EB Garamond, do Google Fonts, com licença OFL, servidas pelo próprio site com `next/font`.
- **Ícones:** Lucide, com licença ISC.
