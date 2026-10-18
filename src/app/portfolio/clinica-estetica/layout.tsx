import type { Metadata, Viewport } from "next";
import { Work_Sans } from "next/font/google";

import { clinica } from "@/content/clinica";

import "@/styles/sites/clinica.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: clinica.meta.title,
  description: clinica.meta.description,
};

export const viewport: Viewport = {
  themeColor: clinica.meta.themeColor,
};

export default function ClinicaLayout({ children }: LayoutProps<"/portfolio/clinica-estetica">) {
  return (
    <div data-site="clinica" className={workSans.variable}>
      {children}
    </div>
  );
}
