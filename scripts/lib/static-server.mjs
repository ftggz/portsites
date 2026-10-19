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

// Lê as regras de cabeçalho do vercel.json. As origens usam só trechos fixos e (.*), então a
// conversão para expressão regular é direta; outra sintaxe para o servidor, em vez de ser ignorada.
function loadHeaderRules(configFile) {
  if (!configFile || !existsSync(configFile)) return [];
  const config = JSON.parse(readFileSync(configFile, "utf8"));
  return (config.headers ?? []).map((rule) => {
    const parts = rule.source.split("(.*)");
    if (parts.some((part) => /[()[\]:*?+]/.test(part))) {
      throw new Error(`Origem não suportada pela prévia local: ${rule.source}`);
    }
    const pattern = new RegExp(`^${parts.map((part) => part.replace(/[.\\^$|{}]/g, "\\$&")).join(".*")}$`);
    return { pattern, headers: rule.headers };
  });
}

// Resolve /rota para rota.html ou rota/index.html, como a Vercel faz com cleanUrls.
function resolveFile(root, pathname) {
  const base = normalize(join(root, decodeURIComponent(pathname)));
  if (base !== root && !base.startsWith(root + sep)) return null;
  return [base, `${base}.html`, join(base, "index.html")].find((file) => existsSync(file) && statSync(file).isFile()) ?? null;
}

export function startStaticServer(root, port = 0, { configFile } = {}) {
  const rules = loadHeaderRules(configFile);
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
