import type { Metadata, Viewport } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import Navbar from "@/components/layout/Navbar";
import SmartStickyCTA from "@/components/layout/SmartStickyCTA";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sigma Oilfield & Industrial Supply FZCO",
  description: "Precision Engineering. Global Reach. Trusted supply chain partner in the oilfield and industrial sectors.",
  openGraph: {
    title: "Sigma Oilfield & Industrial Supply FZCO",
    description: "Precision Engineering. Global Reach.",
    url: "https://sigmaoilfield.com",
    siteName: "Sigma Oilfield",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&f[]=general-sans@700,600,500,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased ${playfair.variable} ${mono.variable}`}>
        <Navbar />
        <Providers>
          <main>{children}</main>
        </Providers>
        <Footer />
        <SmartStickyCTA />
      </body>
    </html>
  );
}
