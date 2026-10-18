import type { Viewport } from "next";

import { newsreader } from "@/lib/fonts";

import "@/styles/sites/landing.css";

export const viewport: Viewport = {
  themeColor: "#e2e2e2",
};

export default function LandingLayout({ children }: LayoutProps<"/">) {
  return (
    <div data-site="landing" className={newsreader.variable}>
      {children}
    </div>
  );
}
