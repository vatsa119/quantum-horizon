import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import ScrollProgress from "@/components/ScrollProgress";
import SmartStickyCTA from "@/components/SmartStickyCTA";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic", "normal"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
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
        className={`${inter.variable} ${plusJakarta.variable} ${playfair.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ScrollProgress />
        {children}
        <SmartStickyCTA />
      </body>
    </html>
  );
}
