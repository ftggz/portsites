// Serve a pasta out/ como a Vercel faria, com os cabeçalhos do vercel.json e compressão,
// para conferir o build localmente.
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { startStaticServer } from "./lib/static-server.mjs";

const projectRoot = resolve(join(dirname(fileURLToPath(import.meta.url)), ".."));
const root = join(projectRoot, "out");

if (!existsSync(root)) {
  console.error("A pasta out/ não existe. Rode npm run build antes.");
  process.exit(1);
}

const { url } = await startStaticServer(root, Number(process.env.PORT ?? 4321), {
  configFile: join(projectRoot, "vercel.json"),
});
console.log(`Prévia do build em ${url}`);
