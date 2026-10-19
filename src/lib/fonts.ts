import { Newsreader } from "next/font/google";

// Sem preload: o Turbopack anexa o preload desta fonte a todas as rotas, inclusive aos sites
// conceito, que não a usam. Na landing o texto aparece na hora com a fonte de reserva ajustada.
export const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  preload: false,
});
