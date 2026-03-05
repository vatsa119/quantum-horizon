import type { Metadata } from "next";
import { Montserrat, Inter, Playfair_Display, Cormorant_Garamond, Geist_Mono } from "next/font/google";
import FloatingIslandCTA from "@/components/FloatingIslandCTA";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["italic", "normal"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sigma Oilfield | Precision-Driven Oilfield Solutions",
  description: "Senior Performance Engineered offshore engineering and technical services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} ${playfair.variable} ${cormorant.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <FloatingIslandCTA />
      </body>
    </html>
  );
}
