import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { BASE, IS_LIVE, SITE_NAME } from "@/lib/site";
import { dealerSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: { default: "Harga XPENG G6, X9, G9L November 2026 | Dealer XPENG", template: "%s" },
  description: "Dealer XPENG: harga G6, X9, G9L OTR Jakarta, simulasi kredit, dan booking test drive.",
  openGraph: { siteName: SITE_NAME, type: "website", locale: "id_ID" },
  // Selama domain belum live (kosong/vercel.app/pages.dev) situs tidak diindeks, supaya URL sementara tidak bersaing/terduplikasi.
  robots: IS_LIVE ? { index: true, follow: true } : { index: false, follow: false },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const dealer = dealerSchema();
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <JsonLd data={dealer ? [websiteSchema(), dealer] : [websiteSchema()]} />
      </head>
      <body><Header />{children}<Footer /></body>
    </html>
  );
}
