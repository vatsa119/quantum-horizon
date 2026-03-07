"use client";

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SafeImage from '@/components/SafeImage';
import LogoMarquee from '@/components/LogoMarquee';
import { ScrollySection, RevealItem } from '@/components/Scrollytelling';

const partners = [
  { id: "ongc", name: "ONGC", logo: "/ONGC.png", description: "India's largest crude oil and natural gas company, contributing around 71% to domestic production." },
  { id: "oil", name: "Oil India Limited", logo: "/OIL.png", description: "A premier Indian public sector emanation engaged in exploration and production of crude oil." },
  { id: "sun", name: "Sun Petrochemicals", logo: "/Sun.jpg", description: "A private Indian company focused on enhancing output from mature and marginal fields." },
  { id: "shivganga", name: "Shivganga Drillers", logo: "/SDPL.png", description: "Specialized technical provider in drilling services, supporting onshore exploration." },
  { id: "gnrl", name: "GNRL", logo: "/HNRL.jpg", description: "Emerging player in the upstream sector, focused on Cambay Basin opportunities." }
];

const TechnicalBlueprint = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineCoords, setLineCoords] = useState({ x: 0, y: 0 });

  const tickerItems = [...partners, ...partners];
  const itemHeight = 160;

  const handleMouseEnter = (idx: number, e: React.MouseEvent) => {
    setHoveredIdx(idx % partners.length);
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      setLineCoords({
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top
      });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[800px] bg-[var(--neutral-50)] overflow-hidden flex items-center justify-center pt-[var(--space-10)] border-y border-[var(--neutral-100)]">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,36,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

      {/* The Belt Ticker */}
      <div className="absolute left-[var(--space-10)] lg:left-[var(--space-32)] w-48 h-full flex flex-col items-center justify-center z-20">
        <div className="h-[640px] w-full overflow-hidden relative">
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, -partners.length * itemHeight] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {tickerItems.map((item, idx) => (
              <div
                key={idx}
                className="h-[160px] w-full flex items-center justify-center p-4"
                onMouseEnter={(e) => handleMouseEnter(idx, e)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className={`relative w-32 h-20 bg-white border border-[var(--neutral-100)] rounded-xl shadow-sm transition-all duration-500 flex items-center justify-center cursor-crosshair ${hoveredIdx === (idx % partners.length) ? 'border-[var(--signal-red-500)] shadow-xl z-30 scale-110' : 'grayscale opacity-60'}`}>
                  <SafeImage src={item.logo} alt={item.name} width={80} height={50} className="object-contain" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lead-Line SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <AnimatePresence>
          {hoveredIdx !== null && (
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              d={`M ${lineCoords.x + 80} ${lineCoords.y} L 600 400`}
              stroke="var(--signal-red-500)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4,4"
            />
          )}
        </AnimatePresence>
      </svg>

      {/* Central Info Engine */}
      <div className="relative z-30 flex items-center justify-center w-[550px] h-[350px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-white shadow-2xl rounded-[var(--radius-hud)] border border-[var(--neutral-100)] overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-[4px] bg-[var(--signal-red-500)]" />
          <div className="p-[var(--space-12)] h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {hoveredIdx !== null ? (
                <motion.div
                  key={partners[hoveredIdx].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-[var(--space-6)]"
                >
                  <span className="text-tech-label text-[var(--signal-red-500)]">Partner Verification</span>
                  <h3 className="text-display-md font-display font-[800] text-[var(--carbon-black)] uppercase tracking-tighter leading-none">
                    {partners[hoveredIdx].name}
                  </h3>
                  <p className="text-[17px] text-[var(--neutral-600)] font-medium leading-relaxed">
                    {partners[hoveredIdx].description}
                  </p>
                </motion.div>
              ) : (
                <div className="text-center space-y-[var(--space-4)]">
                  <div className="w-12 h-1 bg-[var(--neutral-200)] mx-auto rounded-full overflow-hidden">
                    <motion.div className="h-full bg-[var(--signal-red-500)] w-1/2" animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                  </div>
                  <p className="text-tech-label text-[var(--neutral-400)]">Select Entity For Data Reveal</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Technical Metadata */}
      <div className="absolute bottom-[var(--space-10)] right-[var(--space-10)] space-y-1 text-right">
        <p className="text-tech-label text-[var(--neutral-400)]">CORE.UMA: SYNCHRONIZED</p>
        <p className="text-tech-label text-[var(--signal-red-500)] uppercase font-bold">Protocol Active</p>
      </div>
    </div>
  );
};

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden relative pt-[var(--space-20)]">
      <Navbar />

      <ScrollySection className="max-w-7xl mx-auto w-full px-[var(--space-8)] lg:px-[var(--space-20)] mb-[var(--space-24)]">
        <div className="space-y-[var(--space-10)]">
          <RevealItem
            className="flex items-center space-x-[var(--space-4)] text-[var(--signal-red-500)]"
          >
            <div className="w-[var(--space-12)] h-[2px] bg-current" />
            <span className="text-tech-label">Global Network Index</span>
          </RevealItem>

          <RevealItem
            delay={0.1}
          >
            <h1 className="text-display-lg lg:text-[9rem] font-display font-[800] text-[var(--carbon-black)] uppercase tracking-tight leading-[0.85]">
              THE <br />
              <span className="text-[var(--signal-red-500)]">PARTNERSHIP</span>
            </h1>
          </RevealItem>

          <RevealItem
            delay={0.2}
          >
            <p className="text-h3 text-[var(--neutral-600)] max-w-2xl font-medium leading-relaxed italic border-l-4 border-[var(--signal-red-500)]/20 pl-6">
              Sigma bridges technical demand with executive reliability, fueling the growth of the three energy corridors.
            </p>
          </RevealItem>
        </div>
      </ScrollySection>

      <LogoMarquee />
      <ScrollySection className="mt-[var(--space-20)]">
        <TechnicalBlueprint />
      </ScrollySection>

      <Footer />
    </main>
  );
}
