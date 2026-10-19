# Relatório de segurança pré-deploy

**Stack identificada:** Next.js 16.4.2 (App Router, export estático em `out/`), TypeScript, Tailwind CSS 4. Sem banco de dados, sem login e sem API. Hospedagem estática no Cloudflare Pages, no endereço gratuito `.pages.dev`.
**Veredito:** LIBERADO (0 críticos em aberto). Três itens dependem do ambiente publicado e ficam para conferir depois do primeiro deploy (lista no fim).

| #  | Controle                         | Status          | Severidade | Onde |
|----|----------------------------------|-----------------|------------|------|
| 1  | Esconder chaves de API           | OK              | —          | Nenhuma chave no código, no build ou em variável de ambiente; `.env*` no `.gitignore` |
| 2  | Limpar segredos do histórico     | OK              | —          | Busca por padrões de chave em todos os commits; nenhum `.env` já commitado |
| 3  | Só a chave pública do banco      | Não se aplica   | —          | Sem banco |
| 4  | Row-Level Security               | Não se aplica   | —          | Sem banco |
| 5  | Criptografar dados sensíveis     | Não se aplica   | —          | O site não guarda dados; o tráfego usa HTTPS com HSTS |
| 6  | Autenticação no servidor         | Não se aplica   | —          | Sem login nem rotas de API |
| 7  | Acesso por registro              | Não se aplica   | —          | Sem registros de usuário |
| 8  | Adulteração de campos            | Não se aplica   | —          | Nada é gravado em servidor |
| 9  | Cookies de sessão                | Não se aplica   | —          | O site não grava cookie nem usa `localStorage` |
| 10 | Hash de senhas                   | Não se aplica   | —          | Sem senhas |
| 11 | Rate limit no login              | Não se aplica   | —          | Sem login |
| 12 | Proteção contra bots             | Não se aplica   | —          | O formulário de contato não envia nada a servidor; monta a mensagem e abre o WhatsApp |
| 13 | Queries parametrizadas           | Não se aplica   | —          | Sem banco |
| 14 | Validar toda entrada             | Não se aplica   | —          | Sem servidor; no navegador o Zod valida o formulário e o texto vai ao WhatsApp com `encodeURIComponent` (`src/lib/contato.ts:16`) |
| 15 | Escapar conteúdo do usuário      | OK              | —          | O React escapa o texto; o único `dangerouslySetInnerHTML` é o JSON-LD com dados fixos e `<` escapado (`src/lib/structured-data.ts:51`) |
| 16 | Restringir upload                | Não se aplica   | —          | Sem upload |
| 17 | Enxugar a resposta da API        | Não se aplica   | —          | Sem API |
| 18 | Headers de segurança             | OK              | —          | `public/_headers` e CSP por página gravada no build (`scripts/postbuild.mjs`) |
| 19 | Forçar HTTPS                     | OK em parte     | —          | HSTS no `public/_headers` e nenhum recurso por `http://`; o redirecionamento para HTTPS é do Cloudflare e fica para conferir no deploy |
| 20 | Escanear dependências            | OK              | —          | `npm audit` sem vulnerabilidades; `package-lock.json` versionado; `radix-ui` e `tw-animate-css` removidas por não serem usadas |

## Cabeçalhos e CSP

Cabeçalhos de todas as respostas, no `public/_headers` (formato do Cloudflare Pages):

```
Content-Security-Policy: frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'; upgrade-insecure-requests
Strict-Transport-Security: max-age=63072000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Cross-Origin-Opener-Policy: same-origin
```

CSP de cada página, numa `<meta>` gravada pelo `scripts/postbuild.mjs` logo depois da `<meta charset>`:

```
default-src 'self'; script-src 'self' 'sha256-…' (um hash por script inline da página); style-src 'self';
img-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self';
form-action 'self'; upgrade-insecure-requests
```

Por que a CSP de scripts fica numa `<meta>`:

- O Next põe scripts inline em cada página, e eles levam o id do build, que muda a cada build. Nonce exige servidor, e o export é estático (confirmado em `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`).
- Um arquivo de cabeçalhos fixo no repositório não acompanharia hashes que mudam a cada build. Calculados no próprio build, eles sempre batem com o HTML publicado.
- O que uma `<meta>` não aceita (`frame-ancestors`) fica no cabeçalho. O navegador aplica as duas políticas juntas.
- Nenhuma diretiva usa `'unsafe-inline'` nem `'unsafe-eval'`. O build falha se aparecer atributo `style`, bloco `<style>`, evento inline ou URL `javascript:` no HTML.

`preload` ficou fora do HSTS até o domínio existir: entrar na lista de preload é difícil de desfazer e vale para todos os subdomínios.

## Outras decisões

- O Cloudflare Pages publica a pasta `out/` como site estático, com build `npm run build` e Node 22 (`.node-version`). O `_headers` vai de `public/` para `out/` no build.
- A hospedagem trocou da Vercel para o Cloudflare Pages em 19/10/2026: o plano gratuito da Vercel não permite uso comercial, e a landing divulga um serviço.
- No Windows, o export do Next 16.4.2 grava os arquivos de prefetch em pastas (`__next.a/b.txt`) onde o navegador pede `__next.a.b.txt`, e o console mostra 404. O mesmo código gera o nome certo no Linux, onde o Cloudflare compila. O `postbuild.mjs` corrige os nomes quando o build é feito no Windows.
- A Newsreader, fonte da landing, carrega sem preload: o Turbopack anexava o preload dela a todas as rotas, e os sites conceito baixavam 129 KB de uma fonte que não usam.

## Lighthouse

Lighthouse 13.5.0 com o Edge, sobre a prévia local (`npm run preview`), que aplica os cabeçalhos do `_headers` e gzip. Notas de desempenho, acessibilidade, boas práticas e SEO.

| Página | Celular | Desktop |
|---|---|---|
| Landing (`/`) | 98 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |
| Clínica | 96 · 100 · 100 · 66 | 100 · 100 · 100 · 66 |
| Oficina | 97 · 100 · 100 · 66 | 100 · 100 · 100 · 66 |
| Pizzaria | 93 · 100 · 100 · 66 | 100 · 100 · 100 · 66 |
| Política de privacidade | 96 · 100 · 100 · 100 | 100 · 100 · 100 · 100 |

- O SEO de 66 nos sites conceito vem só da auditoria "a página pode ser indexada", que reprova o `noindex` pedido no briefing. As outras oito auditorias de SEO passam.
- O desempenho no celular varia alguns pontos entre rodadas; a pizzaria ficou entre 91 e 99 em três rodadas seguidas.
- A oficina no desktop marcou deslocamento de layout de 0,40 (desempenho 81) em 3 de cerca de 45 rodadas, sempre com o mesmo valor. Não reproduziu com gravação de trace, não aparece nos quadros do Lighthouse e não aparece na medição direta no navegador. Fica para conferir no PageSpeed Insights com o site publicado.

## Para conferir depois do primeiro deploy

- `curl -I https://<domínio>/` mostra os sete cabeçalhos acima, e `curl -I http://<domínio>/` responde 301 ou 308 para HTTPS.
- Uma página conceito aberta no navegador não mostra violação de CSP no console.
- Ativar os alertas do Dependabot quando o repositório for para o GitHub.
- Rodar o PageSpeed Insights nas cinco páginas, principalmente na oficina em modo desktop.
