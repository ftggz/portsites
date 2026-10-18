import { ImageResponse } from "next/og";

import { landing, site } from "@/content/landing";

export const alt = landing.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const GROUND = "#e2e2e2";
const INK = "#7d0c14";
const SEAM = 315;
const FONT_SIZE = 132;
const LINE = FONT_SIZE * 0.92;
const TITLE_TOP = SEAM - LINE * 1.5;

// Baixa do Google Fonts só os caracteres usados na imagem, no formato TrueType que o gerador aceita.
async function loadNewsreader(weight: number, text: string): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Newsreader:wght@${weight}&text=${encodeURIComponent(text)}`,
  ).then((response) => response.text());
  const source = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!source) throw new Error("A fonte Newsreader não veio do Google Fonts.");
  return fetch(source).then((response) => response.arrayBuffer());
}

function Title({ lines, color, offset }: { lines: readonly string[]; color: string; offset: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: TITLE_TOP - offset,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color,
        fontSize: FONT_SIZE,
        lineHeight: 0.92,
        letterSpacing: "-0.04em",
      }}
    >
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </div>
  );
}

export default async function OpengraphImage() {
  const lines = landing.hero.titleLines;
  const font = await loadNewsreader(300, `${lines.join("")}${site.marca}`);

  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", backgroundColor: GROUND, fontFamily: "Newsreader" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: SEAM, display: "flex", overflow: "hidden" }}>
          <Title lines={lines} color={INK} offset={0} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: SEAM, bottom: 0, display: "flex", overflow: "hidden", backgroundColor: INK }}>
          <Title lines={lines} color={GROUND} offset={SEAM} />
        </div>
        <div style={{ position: "absolute", left: 56, top: 40, display: "flex", fontSize: 32, color: INK }}>{site.marca}</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Newsreader", data: font, weight: 300, style: "normal" }] },
  );
}
