"use client";

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import FresnelCard from '@/components/FresnelCard';

const partners = [
  {
    id: "ongc",
    name: "ONGC",
    logo: "/ONGC.png",
    description: "india's largest crude oil and natural gas company, contributing around 71% to indian domestic production."
  },
  {
    id: "oil",
    name: "Oil India Limited",
    logo: "/OIL.png",
    description: "a premier indian public sector emanation engaged in the business of exploration, development, and production of crude oil and natural gas."
  },
  {
    id: "sun",
    name: "Sun Petrochemicals",
    logo: "/Sun.jpg",
    description: "a private indian company focused on oil and gas production, specializing in enhancing output from mature and marginal fields."
  },
  {
    id: "shivganga",
    name: "Shivganga Drillers Pvt Ltd",
    logo: "/SDPL.png",
    description: "a specialized technical provider in drilling services, supporting onshore exploration projects with precision equipment."
  },
  {
    id: "gnrl",
    name: "Gujarat Natural Resources Limited",
    logo: "/HNRL.jpg",
    description: "an emerging player in the upstream oil and gas sector, primarily focused on exploration and production opportunities within the cambay basin."
  }
];

const TechnicalBlueprint = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineCoords, setLineCoords] = useState({ x: 0, y: 0 });

  // Triple for infinite vertical scroll
  const tickerItems = [...partners, ...partners, ...partners];
  const itemHeight = 160; // Set height for logos

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
    <div ref={containerRef} className="relative w-full h-[800px] bg-slate-50 overflow-hidden flex items-center justify-center font-inter pt-10">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(238,49,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(238,49,36,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

      {/* The Belt Ticker (Mechanical Stepped Logic) */}
      <div className="absolute left-10 lg:left-32 w-48 h-full flex flex-col items-center justify-center z-20">
        <div className="h-[640px] w-full overflow-hidden relative">
          {/* Mechanical Track lines */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-slate-200 border-x border-slate-300/10" />

          <motion.div
            className="flex flex-col items-center"
            animate={{
              y: [0, -partners.length * itemHeight]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
            style={{
              // We'll use a stepped approach for the visual movement if needed, 
              // but a smooth infinite scroll with pauses on specific points is complex with pure CSS/Framer linear.
              // Let's implement a 'stepped' transition by providing specific keyframes.
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {tickerItems.map((item, idx) => (
              <div
                key={idx}
                className="h-[160px] w-full flex items-center justify-center p-4"
                onMouseEnter={(e) => handleMouseEnter(idx, e)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <FresnelCard>
                  <div className={`relative w-32 h-20 bg-white border border-slate-200 rounded-xl shadow-sm transition-all duration-500 flex items-center justify-center cursor-crosshair ${hoveredIdx === (idx % partners.length) ? 'border-[#EE3124] shadow-lg z-30' : 'scale-100 grayscale-0 opacity-100'}`}>
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={100}
                      height={60}
                      className="object-contain"
                    />
                    {/* Bolt Details */}
                    <div className="absolute top-1 left-1 w-1 h-1 bg-slate-300 rounded-full" />
                    <div className="absolute top-1 right-1 w-1 h-1 bg-slate-300 rounded-full" />
                    <div className="absolute bottom-1 left-1 w-1 h-1 bg-slate-300 rounded-full" />
                    <div className="absolute bottom-1 right-1 w-1 h-1 bg-slate-300 rounded-full" />
                  </div>
                </FresnelCard>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Inspect Lead-Line SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <AnimatePresence>
          {hoveredIdx !== null && (
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              d={`M ${lineCoords.x + 80} ${lineCoords.y} L ${650} ${400}`}
              stroke="#EE3124"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
          )}
        </AnimatePresence>
      </svg>

      {/* Central Liquid Glass Info Card */}
      <div className="relative z-30 flex items-center justify-center w-[550px] h-[350px]">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-3xl border border-white/50 rounded-[3.5rem] shadow-[30px_30px_80px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[6px] bg-[#EE3124]" />
          <div className="p-14 h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {hoveredIdx !== null ? (
                <motion.div
                  key={partners[hoveredIdx].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-[10px] font-black text-[#EE3124] uppercase tracking-[0.5em] mb-4">Partner Profile</h4>
                  <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-tight font-montserrat">
                    {partners[hoveredIdx].name}
                  </h3>
                  <p className="text-[15px] font-mono text-slate-600 leading-relaxed font-normal lowercase">
                    {partners[hoveredIdx].description}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="mb-8 flex justify-center">
                    <div className="w-16 h-1 w-8 bg-[#EE3124]/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#EE3124] w-1/2"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif italic text-slate-900 uppercase tracking-widest mb-2">Partner Insights</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">Select Logo for Profile</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Blueprint Coordinates */}
      <div className="absolute bottom-10 right-10 text-[10px] font-mono text-slate-400 space-y-1 text-right">
        <p>SYSTEM.UMA: active</p>
        <p>PROTOCOL: uma@sigmadxb.com</p>
        <p>LATENCY: 0.04ms</p>
      </div>
    </div>
  );
};

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden relative selection:bg-[#EE3124] selection:text-white flex flex-col gap-0 pt-32">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-8 lg:px-24 mb-12">
        {/* Header Protocol */}
        <div className="mb-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-6 mb-8 text-[#EE3124]"
          >
            <div className="w-12 h-[2px] bg-current" />
            <span className="text-xs font-black uppercase tracking-[0.5em]">Network 04</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-serif italic text-slate-900 uppercase tracking-[0.1em] leading-none mb-4"
          >
            THE <br />
            <span className="text-[#EE3124]">CLIENTELE</span>
            <span className="text-slate-200">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-12 text-xl text-slate-500 max-w-2xl font-inter leading-relaxed"
          >
            Sigma bridges technical demand with executive reliability, fueling the growth of India&apos;s most critical energy infrastructure players.
          </motion.p>
        </div>
      </div>

      {/* Technical Blueprint Section */}
      <TechnicalBlueprint />

      {/* Global Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#EE3124]/5 blur-[200px] -mr-96 -mt-96 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0099CC]/5 blur-[150px] -ml-48 -mb-48 rounded-full" />
      </div>

      <Footer />
    </main>
  );
}
