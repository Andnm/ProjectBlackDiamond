import type { Metadata } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin", "vietnamese"],
  variable: "--font-headline",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://blackdiamond.luxury"),
  applicationName: "BlackDiamond",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${manrope.variable} ${notoSerif.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
