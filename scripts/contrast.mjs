// Confere o contraste WCAG 2.2 dos pares de cor de cada site, lendo os tokens de src/styles/sites.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "src/styles/sites");

const TEXT = 4.5;
const UI = 3;

const pairs = [
  ["foreground", "background", TEXT, "texto principal sobre o fundo"],
  ["muted-foreground", "background", TEXT, "texto secundário sobre o fundo"],
  ["foreground", "surface", TEXT, "texto principal sobre a superfície"],
  ["muted-foreground", "surface", TEXT, "texto secundário sobre a superfície"],
  ["foreground", "surface-2", TEXT, "texto principal sobre a superfície 2"],
  ["muted-foreground", "surface-2", TEXT, "texto secundário sobre a superfície 2"],
  ["foreground", "surface-3", TEXT, "texto principal sobre a superfície 3"],
  ["muted-foreground", "surface-3", TEXT, "texto secundário sobre a superfície 3"],
  ["primary-foreground", "primary", TEXT, "texto do botão principal"],
  ["primary", "background", UI, "botão e anel de foco contra o fundo"],
  ["field-1-foreground", "field-1", TEXT, "texto sobre o campo 1"],
  ["field-1-muted", "field-1", TEXT, "exemplo dentro do campo, sobre o campo 1"],
  ["field-2-foreground", "field-2", TEXT, "texto sobre o campo 2"],
  ["field-3-foreground", "field-3", TEXT, "texto sobre o campo 3"],
  ["field-3-muted", "field-3", TEXT, "texto secundário sobre o campo 3"],
];

// Combinações que só existem em um site; nos outros, o texto secundário não vai sobre esses campos.
const sitePairs = {
  clinica: [
    ["muted-foreground", "field-1", TEXT, "texto secundário sobre o campo 1"],
    ["muted-foreground", "field-2", TEXT, "texto secundário sobre o campo 2"],
  ],
  oficina: [
    ["field-2-foreground", "field-2-cell", TEXT, "texto nas células do orçamento"],
    ["field-2-muted", "field-2-cell", TEXT, "exemplo dentro da célula do orçamento"],
    ["field-2", "field-2-foreground", TEXT, "texto do botão de enviar, amarelo sobre preto"],
  ],
};

function luminance(hex) {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? [...value].map((c) => c + c).join("") : value;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255).map((c) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function ratio(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

let failures = 0;
const extra = { banner: { text: "#f5f5f5", bg: "#111111" } };

for (const file of readdirSync(dir).filter((f) => f.endsWith(".css")).sort()) {
  const css = readFileSync(join(dir, file), "utf8");
  const block = css.match(/\[data-site="([a-z]+)"\]\s*\{([\s\S]*?)\n\}/);
  if (!block) continue;
  const [, site, body] = block;
  const tokens = Object.fromEntries([...body.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,6})\s*;/g)].map((m) => [m[1], m[2]]));
  console.log(`\n## ${site}`);
  console.log("| Par | Cores | Contraste | Mínimo | Resultado |");
  console.log("| --- | --- | --- | --- | --- |");
  for (const [fg, bg, min, label] of [...pairs, ...(sitePairs[site] ?? [])]) {
    if (!tokens[fg] || !tokens[bg]) continue;
    const value = ratio(tokens[fg], tokens[bg]);
    const ok = value >= min;
    if (!ok) failures += 1;
    const level = value >= 7 ? "AAA" : value >= 4.5 ? "AA" : value >= 3 ? "AA grande / UI" : "reprova";
    console.log(`| ${label} | ${tokens[fg]} / ${tokens[bg]} | ${value.toFixed(2)}:1 | ${min}:1 | ${ok ? "passa" : "REPROVA"} (${level}) |`);
  }
}

const banner = ratio(extra.banner.text, extra.banner.bg);
console.log(`\n## aviso de projeto conceito\n| texto do aviso | ${extra.banner.text} / ${extra.banner.bg} | ${banner.toFixed(2)}:1 | 4.5:1 | ${banner >= TEXT ? "passa" : "REPROVA"} |`);
if (banner < TEXT) failures += 1;

if (failures) {
  console.error(`\n${failures} par(es) abaixo do mínimo.`);
  process.exit(1);
}
console.log("\nTodos os pares passam.");
