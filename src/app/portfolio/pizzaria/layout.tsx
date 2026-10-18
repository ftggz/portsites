import type { Metadata, Viewport } from "next";
import { EB_Garamond } from "next/font/google";

import { pizzaria } from "@/content/pizzaria";

import "@/styles/sites/pizzaria.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
});

export const metadata: Metadata = {
  title: pizzaria.meta.title,
  description: pizzaria.meta.description,
};

export const viewport: Viewport = {
  themeColor: pizzaria.meta.themeColor,
};

export default function PizzariaLayout({ children }: LayoutProps<"/portfolio/pizzaria">) {
  return (
    <div data-site="pizzaria" className={garamond.variable}>
      {children}
    </div>
  );
}
