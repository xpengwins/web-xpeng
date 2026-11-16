import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://xpengwins.com"),
  title: { default: "XPENG Wins — The Line · G6 & X9", template: "%s | XPENG Wins" },
  description: "Lihat lineup XPENG G6 dan X9, pilih warna, simulasi cicilan, dan daftar test drive atau booking.",
  openGraph: { title: "XPENG Wins — The Line", description: "XPENG G6 & X9 — pilih varian & warna, test drive, booking.", type: "website", locale: "id_ID" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body><Header />{children}<Footer /></body>
    </html>
  );
}
