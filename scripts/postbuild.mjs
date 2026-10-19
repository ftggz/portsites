// Roda depois do next build, sobre a pasta out/. Corrige os nomes dos arquivos de prefetch quando o
// build é feito no Windows e grava em cada página a CSP com os hashes dos seus scripts inline.
//
// A CSP de scripts fica numa <meta> e não no public/_headers porque o Next põe scripts inline que
// mudam a cada build (levam o id do build). Calculando aqui, os hashes sempre batem com o HTML
// publicado. O que uma <meta> não aceita (frame-ancestors) fica no _headers; o navegador aplica as
// duas políticas juntas.
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");

if (!existsSync(outDir)) {
  console.error("A pasta out/ não existe. Rode o next build antes.");
  process.exit(1);
}

function walk(dir, list = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    list.push(full);
    if (statSync(full).isDirectory()) walk(full, list);
  }
  return list;
}

// O export do Next monta o nome de cada arquivo de segmento trocando "/" por ".", mas no Windows as
// partes do caminho vêm separadas por "\" e viram pastas (__next.a\b.txt). O roteador do navegador
// pede o nome com pontos (__next.a.b.txt), que é o que o mesmo código gera no Linux.
function flattenSegments() {
  let moved = 0;
  const segmentDirs = walk(outDir)
    .filter((path) => statSync(path).isDirectory() && path.split(sep).pop()?.startsWith("__next."))
    .filter((path, _index, all) => !all.some((other) => other !== path && path.startsWith(other + sep)));
  for (const dir of segmentDirs) {
    for (const file of walk(dir).filter((path) => statSync(path).isFile())) {
      const flat = [dir.split(sep).pop(), ...relative(dir, file).split(sep)].join(".");
      renameSync(file, join(dirname(dir), flat));
      moved += 1;
    }
    rmSync(dir, { recursive: true, force: true });
  }
  return moved;
}

const sha256 = (text) => `'sha256-${createHash("sha256").update(text, "utf8").digest("base64")}'`;

function policy(scriptHashes) {
  return [
    "default-src 'self'",
    `script-src 'self' ${scriptHashes.join(" ")}`,
    "style-src 'self'",
    "img-src 'self'",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

const CSP_META = /<meta http-equiv="Content-Security-Policy" content="[^"]*"\s*\/?>/;
const CHARSET = /<meta charSet="utf-8"\s*\/?>/i;

function protect(file) {
  let html = readFileSync(file, "utf8").replace(CSP_META, "");
  const problems = [];
  if (/\sstyle="/i.test(html)) problems.push("atributo style no HTML");
  if (/<style\b/i.test(html)) problems.push("bloco <style> inline");
  if (/\son[a-z]+="/i.test(html)) problems.push("evento inline (on...=)");
  if (/(?:href|src)="javascript:/i.test(html)) problems.push("URL javascript:");
  if (problems.length) throw new Error(`${relative(outDir, file)}: ${problems.join(", ")}. A CSP sem 'unsafe-inline' bloquearia isso.`);

  // Blocos de dados (JSON-LD) não são executados e não passam pela CSP.
  const hashes = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(([, attributes]) => !/\bsrc=/i.test(attributes) && !/type="application\/(?:ld\+)?json"/i.test(attributes))
    .map(([, , content]) => sha256(content));

  const meta = `<meta http-equiv="Content-Security-Policy" content="${policy([...new Set(hashes)])}"/>`;
  if (!CHARSET.test(html)) throw new Error(`${relative(outDir, file)}: não achei a <meta charset> para pôr a CSP logo depois.`);
  html = html.replace(CHARSET, (charset) => charset + meta);
  writeFileSync(file, html);
  return hashes.length;
}

const moved = flattenSegments();
const pages = walk(outDir).filter((path) => path.endsWith(".html"));
let scripts = 0;
for (const page of pages) scripts += protect(page);
console.log(
  `CSP gravada em ${pages.length} páginas (${scripts} scripts inline com hash)` +
    (moved ? `; ${moved} arquivos de prefetch renomeados.` : "."),
);
