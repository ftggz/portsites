import type { Metadata } from "next";

import { landing, site } from "@/content/landing";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: landing.meta.title,
  description: landing.meta.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
