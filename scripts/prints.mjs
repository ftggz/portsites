// Fotografa os sites conceito (computador e celular) a partir do build em out/, com o Chrome
// ou o Edge instalados, controlados pelo DevTools Protocol (Node 22+, sem dependências).
// Os arquivos vão para assets/source/prints/ e depois passam pelo npm run images.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { startStaticServer } from "./lib/static-server.mjs";

const root = resolve(join(dirname(fileURLToPath(import.meta.url)), ".."));
const outDir = join(root, "out");
const printsDir = join(root, "assets", "source", "prints");

const sites = [
  { slug: "clinica", path: "/portfolio/clinica-estetica" },
  { slug: "oficina", path: "/portfolio/oficina-mecanica" },
  { slug: "pizzaria", path: "/portfolio/pizzaria" },
];

const devices = [
  { name: "desktop", width: 1440, height: 900, mobile: false },
  { name: "mobile", width: 375, height: 812, mobile: true },
];

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Google/Chrome/Application/chrome.exe"),
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/microsoft-edge",
  ];
  return candidates.find((path) => path && existsSync(path));
}

async function launch(browserPath) {
  const profile = mkdtempSync(join(tmpdir(), "prints-"));
  const child = spawn(
    browserPath,
    [
      "--headless=new",
      "--remote-debugging-port=0",
      `--user-data-dir=${profile}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--hide-scrollbars",
      "--force-prefers-reduced-motion",
      "about:blank",
    ],
    { stdio: "ignore" },
  );
  const portFile = join(profile, "DevToolsActivePort");
  for (let i = 0; i < 100 && !existsSync(portFile); i += 1) await sleep(100);
  if (!existsSync(portFile)) throw new Error("O navegador não abriu a porta do DevTools.");
  const port = readFileSync(portFile, "utf8").split("\n")[0]?.trim();
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = targets.find((target) => target.type === "page");
  if (!page) throw new Error("Nenhuma aba encontrada no navegador.");

  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((done, fail) => {
    socket.addEventListener("open", done, { once: true });
    socket.addEventListener("error", fail, { once: true });
  });

  let nextId = 0;
  const pending = new Map();
  const listeners = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(String(event.data));
    if (message.id && pending.has(message.id)) {
      const { done, fail } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) fail(new Error(message.error.message));
      else done(message.result);
    } else if (message.method && listeners.has(message.method)) {
      listeners.get(message.method)();
      listeners.delete(message.method);
    }
  });

  const send = (method, params = {}) =>
    new Promise((done, fail) => {
      nextId += 1;
      pending.set(nextId, { done, fail });
      socket.send(JSON.stringify({ id: nextId, method, params }));
    });
  const once = (method) => new Promise((done) => listeners.set(method, done));

  const close = () => {
    socket.close();
    child.kill();
    return sleep(300).then(() => rmSync(profile, { recursive: true, force: true }));
  };
  return { send, once, close };
}

async function capture(cdp, url, file, device) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: device.width,
    height: device.height,
    deviceScaleFactor: 2,
    mobile: device.mobile,
  });
  await cdp.send("Emulation.setTouchEmulationEnabled", { enabled: device.mobile });
  const loaded = cdp.once("Page.loadEventFired");
  await cdp.send("Page.navigate", { url });
  await loaded;
  await cdp.send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => true)", awaitPromise: true });
  await sleep(400);
  const { data } = await cdp.send("Page.captureScreenshot", { format: "png" });
  writeFileSync(file, Buffer.from(data, "base64"));
}

if (!existsSync(outDir)) {
  console.error("A pasta out/ não existe. Rode npm run build antes.");
  process.exit(1);
}

const browserPath = findBrowser();
if (!browserPath) {
  console.error("Chrome ou Edge não encontrado. Defina CHROME_PATH com o caminho do navegador.");
  process.exit(1);
}

mkdirSync(printsDir, { recursive: true });
const { server, url } = await startStaticServer(outDir);
const cdp = await launch(browserPath);
try {
  await cdp.send("Page.enable");
  for (const site of sites) {
    for (const device of devices) {
      await capture(cdp, `${url}${site.path}`, join(printsDir, `${site.slug}-${device.name}.png`), device);
      console.log(`${site.slug} ${device.name} ok`);
    }
  }
} finally {
  await cdp.close();
  server.close();
}
