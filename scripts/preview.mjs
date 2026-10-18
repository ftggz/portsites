// Serve a pasta out/ como o Cloudflare Pages faria, para conferir o build localmente.
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { startStaticServer } from "./lib/static-server.mjs";

const root = resolve(join(dirname(fileURLToPath(import.meta.url)), "..", "out"));

if (!existsSync(root)) {
  console.error("A pasta out/ não existe. Rode npm run build antes.");
  process.exit(1);
}

const { url } = await startStaticServer(root, Number(process.env.PORT ?? 4321));
console.log(`Prévia do build em ${url}`);
