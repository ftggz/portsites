// Baixa as fotos listadas em assets/images.json (só as que faltam), recorta, gera WebP em
// várias larguras sem metadados e escreve o manifesto usado pelos componentes e o CREDITS.md.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(readFileSync(join(root, "assets/images.json"), "utf8"));
const sourceDir = join(root, "assets/source");
const publicDir = join(root, "public/images");
mkdirSync(sourceDir, { recursive: true });

const photos = new Map(config.photos.map((photo) => [photo.id, photo]));

async function loadSource(photo) {
  if (photo.file) {
    const local = join(root, photo.file);
    if (!existsSync(local)) throw new Error(`${photo.file} não existe. Rode npm run prints antes.`);
    return readFileSync(local);
  }
  const file = join(sourceDir, `${photo.id}.jpg`);
  if (!existsSync(file)) {
    const response = await fetch(`${photo.url}?fm=jpg&q=90&w=2400`);
    if (!response.ok) throw new Error(`Falha ao baixar ${photo.id}: HTTP ${response.status}`);
    writeFileSync(file, Buffer.from(await response.arrayBuffer()));
  }
  // Lido como buffer porque a libvips não aceita caminhos longos no Windows.
  return readFileSync(file);
}

function cropBox(width, height, ratio, [focusX, focusY]) {
  let boxWidth = width;
  let boxHeight = Math.round(width / ratio);
  if (boxHeight > height) {
    boxHeight = height;
    boxWidth = Math.round(height * ratio);
  }
  const clamp = (value, max) => Math.min(Math.max(value, 0), max);
  return {
    left: clamp(Math.round(focusX * width - boxWidth / 2), width - boxWidth),
    top: clamp(Math.round(focusY * height - boxHeight / 2), height - boxHeight),
    width: boxWidth,
    height: boxHeight,
  };
}

const manifest = {};
for (const output of config.outputs) {
  const photo = photos.get(output.photo);
  if (!photo) throw new Error(`Foto ${output.photo} não está em photos`);
  const input = await loadSource(photo);
  const { width, height } = await sharp(input).metadata();
  const [ratioW, ratioH] = output.aspect.split(":").map(Number);
  const box = cropBox(width, height, ratioW / ratioH, output.focus ?? [0.5, 0.5]);
  const dir = join(publicDir, output.dir);
  mkdirSync(dir, { recursive: true });

  const variants = [];
  for (const targetWidth of output.widths.filter((w) => w <= box.width)) {
    const targetHeight = Math.round((targetWidth * ratioH) / ratioW);
    let pipeline = sharp(input).extract(box).resize(targetWidth, targetHeight);
    if (output.flop) pipeline = pipeline.flop();
    if (output.grayscale) pipeline = pipeline.grayscale();
    // Fotos de textura fina (parede, tecido) pesam muito em WebP; um desfoque leve tira o grão sem mudar a imagem.
    if (output.soften) pipeline = pipeline.blur(output.soften);
    const buffer = await pipeline.webp({ quality: output.quality ?? 72 }).toBuffer();
    const name = `${output.key}-${targetWidth}.webp`;
    writeFileSync(join(dir, name), buffer);
    variants.push({ src: `/images/${output.dir}/${name}`, width: targetWidth, height: targetHeight, kb: Math.round(buffer.length / 1024) });
  }
  if (!variants.length) throw new Error(`${output.key}: nenhuma largura cabe no recorte de ${box.width}px`);

  const largest = variants.at(-1);
  manifest[output.key] = {
    src: largest.src,
    width: largest.width,
    height: largest.height,
    srcSet: variants.map((variant) => `${variant.src} ${variant.width}w`).join(", "),
    ...(photo.author ? { credit: { author: photo.author, url: photo.authorUrl } } : {}),
  };
  console.log(output.key, variants.map((variant) => `${variant.width}w ${variant.kb}KB`).join(" · "));
}

writeFileSync(join(root, "src/lib/images.generated.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const rows = config.photos.filter((photo) => photo.author).map(
  (photo) => `| ${photo.description} | ${photo.usedIn} | [${photo.author}](${photo.authorUrl}) | <${photo.pageUrl}> |`,
);
writeFileSync(
  join(root, "CREDITS.md"),
  [
    "# Créditos das imagens",
    "",
    "Todas as fotos vêm do Unsplash e são usadas sob a [Licença Unsplash](https://unsplash.com/license), que permite uso comercial. A licença não exige atribuição, mas cada autor fica registrado aqui.",
    "",
    "| Foto | Onde aparece | Autor | Página da foto |",
    "| --- | --- | --- | --- |",
    ...rows,
    "",
    "Este arquivo é gerado por `npm run images` a partir de `assets/images.json`. Para trocar uma foto, edite a lista e rode o comando de novo.",
    "",
  ].join("\n"),
);
console.log(`${Object.keys(manifest).length} imagens, ${rows.length} créditos`);
