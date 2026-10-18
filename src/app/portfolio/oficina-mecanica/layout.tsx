import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";

import { oficina } from "@/content/oficina";

import "@/styles/sites/oficina.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  title: oficina.meta.title,
  description: oficina.meta.description,
};

export const viewport: Viewport = {
  themeColor: oficina.meta.themeColor,
};

export default function OficinaLayout({ children }: LayoutProps<"/portfolio/oficina-mecanica">) {
  return (
    <div data-site="oficina" className={hanken.variable}>
      {children}
    </div>
  );
}
