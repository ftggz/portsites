import manifest from "./images.generated.json";

export type ImageKey = keyof typeof manifest;

export type ImageCredit = { author: string; url: string };

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  srcSet: string;
  credit?: ImageCredit;
};

export function getImage(key: ImageKey): ImageAsset {
  return manifest[key];
}

// Autores das fotos usadas numa página, na ordem em que aparecem e sem repetir.
export function creditsFor(keys: readonly ImageKey[]): ImageCredit[] {
  const seen = new Map<string, ImageCredit>();
  for (const key of keys) {
    const credit = getImage(key).credit;
    if (credit && !seen.has(credit.url)) seen.set(credit.url, credit);
  }
  return [...seen.values()];
}
