import type { Metadata } from "next";
import { Manrope, Noto_Serif, Noto_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import { defaultLocale } from "@/i18n/routing";
import "flag-icons/css/flag-icons.min.css";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body-latin",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin", "vietnamese"],
  variable: "--font-headline-latin",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-body-thai",
  display: "swap",
});

const notoSerifThai = Noto_Serif_Thai({
  subsets: ["thai"],
  variable: "--font-headline-thai",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.blackdiamondluxury.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "BlackDiamond",
  title: {
    default: "BlackDiamond Luxury | เพชรดำหายาก",
    template: "%s | BlackDiamond",
  },
  description:
    "จุดหมายปลายทางระดับสูงสำหรับเพชรดำธรรมชาติ — อัญมณีระดับสะสมที่ได้รับการรับรอง เครื่องประดับเชิงสถาปัตยกรรม และแหล่งที่มาที่ตรวจสอบได้",
  authors: [{ name: "BlackDiamond", url: siteUrl }],
  creator: "BlackDiamond",
  publisher: "BlackDiamond",
  category: "เครื่องประดับหรูหรา",
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
        alt: "BlackDiamond — เพชรดำธรรมชาติหายาก",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@blackdiamondluxury",
    creator: "@blackdiamondluxury",
    images: ["/images/education-background.png"],
  },
  verification: {
    // Add your Google Search Console verification code here:
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // The root layout sits above the [locale] segment, so it can't read
  // params.locale (and reading it via headers()/cookies() here would force
  // every route to render dynamically, losing static generation site-wide).
  // Default to defaultLocale statically; [locale]/layout.tsx corrects the
  // <html lang> client-side once it knows the real locale (see SyncHtmlLang).
  return (
    <html
      className={`${manrope.variable} ${notoSerif.variable} ${notoSansThai.variable} ${notoSerifThai.variable}`}
      lang={defaultLocale}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
