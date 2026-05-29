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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blackdiamondluxury.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "BlackDiamond",
  title: {
    default: "BlackDiamond Luxury | Rare Black Diamonds",
    template: "%s | BlackDiamond",
  },
  description:
    "A refined destination for natural black diamonds — certified collector-grade stones, architectural jewelry, and authenticated provenance.",
  authors: [{ name: "BlackDiamond", url: siteUrl }],
  creator: "BlackDiamond",
  publisher: "BlackDiamond",
  category: "Luxury Jewelry",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "BlackDiamond",
    images: [
      {
        url: "/images/education-background.png",
        width: 1200,
        height: 630,
        alt: "BlackDiamond — Rare Natural Black Diamonds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@blackdiamond",
    creator: "@blackdiamond",
    images: ["/images/education-background.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  verification: {
    // Add your Google Search Console verification code here:
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${manrope.variable} ${notoSerif.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
