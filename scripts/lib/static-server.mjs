import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, sep } from "node:path";

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

// Resolve /rota para rota.html ou rota/index.html, como o Cloudflare Pages faz com o export do Next.
function resolveFile(root, pathname) {
  const base = normalize(join(root, decodeURIComponent(pathname)));
  if (base !== root && !base.startsWith(root + sep)) return null;
  return [base, `${base}.html`, join(base, "index.html")].find((file) => existsSync(file) && statSync(file).isFile()) ?? null;
}

export function startStaticServer(root, port = 0) {
  const server = createServer((request, response) => {
    const { pathname } = new URL(request.url ?? "/", "http://localhost");
    const file = resolveFile(root, pathname);
    if (!file) {
      const notFound = join(root, "404.html");
      response.writeHead(404, { "content-type": types[".html"] });
      if (existsSync(notFound)) createReadStream(notFound).pipe(response);
      else response.end("404");
      return;
    }
    response.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(response);
  });
  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => {
      const address = server.address();
      resolve({ server, url: `http://127.0.0.1:${typeof address === "object" && address ? address.port : port}` });
    });
  });
}
