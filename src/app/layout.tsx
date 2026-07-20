import type { Metadata, Viewport } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sakanca.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sakanca Alliance",
    template: "%s | Sakanca Alliance",
  },
  description:
    "Sakanca Alliance adalah ekosistem kolaboratif yang menyatukan layanan kreatif (Sakanca Visual), otomotif (Sakanca Auto), wisata (Sakanca Escape), hardware (Sakanca Tech), dan software development (Sakanca Dev).",
  keywords: [
    "Sakanca Alliance",
    "Creative Agency Jogja",
    "Software House Yogyakarta",
    "Videography Jogja",
    "Custom PC Assembly",
    "City Tour Jogja",
    "Tour Guide Yogyakarta",
    "Tourism Jogja",
    "Tourism Yogyakarta",
    "Web Developer Indonesia",
    "Jasa Pembuatan Website Jogja",
    "Jasa Pembuatan Website Jawa Timur",
    "Jasa Pembuatan Website Terpercaya",
    "Jasa Pembuatan Website Sakanca",
    "Jasa Pembuatan Website Profesional",
    "Jasa Pembuatan Website Murah",
    "Jasa Pembuatan Website Terbaik",
    "Jasa Pembuatan Website Yogyakarta",
    "Jasa Pembuatan Video Kreatif Yogyakarta",
    "Jasa Pembuatan Video Animasi Yogyakarta",
    "Jasa Pembuatan Video Lomba Yogyakarta",
  ],
  authors: [{ name: "Sakanca Alliance Team" }],
  creator: "Sakanca Dev",
  publisher: "Sakanca Alliance",
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/?lang=id",
      "en-US": "/?lang=en",
      "ja-JP": "/?lang=jpn",
    },
  },
  openGraph: {
    title: "Sakanca Alliance - Your Collective Expert Creating Solutions",
    description: "Rumah bagi berbagai unit bisnis kolaboratif...",
    url: SITE_URL,
    siteName: "Sakanca Alliance",
    images: [`${SITE_URL}/storage/logos/logoSakanca.webp`], // PERBAIKAN HERE
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakanca Alliance",
    description: "Your Collective Expert Creating Solutions That Matter",
    images: [`${SITE_URL}/storage/logos/logoSakanca.webp`], // PERBAIKAN HERE
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sakanca Alliance",
    url: SITE_URL,
    logo: `${SITE_URL}/storage/logos/ogoSakanca.webp`, // PERBAIKAN HERE
    description: "Ekosistem kolaboratif yang menyatukan...",
  };

  return (
    <html
      lang="id"
      className={`${inter.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect DNS ke server API Backend untuk mempercepat koneksi */}
        <link rel="preconnect" href={API_URL} />
        <link rel="dns-prefetch" href={API_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
