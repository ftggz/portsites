import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, sep } from "node:path";
import { gzipSync } from "node:zlib";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
};

const compressible = /^(text\/|application\/(json|xml)|image\/svg)/;

// Lê o arquivo _headers no formato do Cloudflare Pages: uma linha com o caminho, que aceita *,
// seguida das linhas recuadas "Nome: valor". Placeholders (:nome) não são usados e param a prévia.
function loadHeaderRules(headersFile) {
  if (!headersFile || !existsSync(headersFile)) return [];
  const rules = [];
  for (const line of readFileSync(headersFile, "utf8").split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      if (/:[a-z]/i.test(line)) throw new Error(`Caminho não suportado pela prévia local: ${line}`);
      const pattern = new RegExp(`^${line.trim().split("*").map((part) => part.replace(/[.\\^$|{}()[\]+?]/g, "\\$&")).join(".*")}$`);
      rules.push({ pattern, headers: [] });
      continue;
    }
    const separator = line.indexOf(":");
    rules.at(-1)?.headers.push({ key: line.slice(0, separator).trim(), value: line.slice(separator + 1).trim() });
  }
  return rules;
}

// Resolve /rota para rota.html ou rota/index.html, como o Cloudflare Pages faz.
function resolveFile(root, pathname) {
  const base = normalize(join(root, decodeURIComponent(pathname)));
  if (base !== root && !base.startsWith(root + sep)) return null;
  return [base, `${base}.html`, join(base, "index.html")].find((file) => existsSync(file) && statSync(file).isFile()) ?? null;
}

export function startStaticServer(root, port = 0, { headersFile } = {}) {
  const rules = loadHeaderRules(headersFile);
  const server = createServer((request, response) => {
    const { pathname } = new URL(request.url ?? "/", "http://localhost");
    const resolved = resolveFile(root, pathname);
    const file = resolved ?? join(root, "404.html");
    const status = resolved ? 200 : 404;

    const headers = { "content-type": types[extname(file)] ?? "application/octet-stream" };
    for (const rule of rules) {
      if (!rule.pattern.test(pathname)) continue;
      for (const { key, value } of rule.headers) headers[key.toLowerCase()] = value;
    }

    if (!existsSync(file)) {
      response.writeHead(404, headers);
      response.end("404");
      return;
    }
    let body = readFileSync(file);
    if (compressible.test(headers["content-type"]) && /\bgzip\b/.test(request.headers["accept-encoding"] ?? "")) {
      body = gzipSync(body);
      headers["content-encoding"] = "gzip";
      headers.vary = "Accept-Encoding";
    }
    headers["content-length"] = String(body.length);
    response.writeHead(status, headers);
    response.end(body);
  });
  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => {
      const address = server.address();
      resolve({ server, url: `http://127.0.0.1:${typeof address === "object" && address ? address.port : port}` });
    });
  });
}
