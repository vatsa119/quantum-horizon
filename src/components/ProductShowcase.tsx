"use client";

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cog, Anchor, Toolbox, ArrowRight, ShieldCheck, Globe, Database } from 'lucide-react';
import Image from 'next/image';
import Spotlight from './Spotlight';

const allProducts = [
    {
        id: "mud-pumps",
        title: "Mud Pumps & Spares",
        image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=2070",
        icon: Cog,
        hud: [{ label: "API-SPEC", value: "7K" }, { label: "HP", value: "2200" }, { label: "PSI", value: "7500" }],
        category: "Drilling"
    },
    {
        id: "tubulars",
        title: "Tubulars & Accessories",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587db0?auto=format&fit=crop&q=80&w=2070",
        icon: Anchor,
        hud: [{ label: "API-SPEC", value: "5CT" }, { label: "OD", value: "9.625\"" }, { label: "LB/FT", value: "47" }],
        category: "OCTG"
    },
    {
        id: "artificial-lifts",
        title: "Artificial Lifts",
        image: "https://images.unsplash.com/photo-1544161515-4af6b1d8d16e?auto=format&fit=crop&q=80&w=2070",
        icon: Toolbox,
        hud: [{ label: "EFF", value: "94%" }, { label: "ROI", value: "14mo" }, { label: "DEPTH", value: "12k'" }],
        category: "Production"
    }
];

export default function ProductShowcase({ mode }: { mode: 'NITRO' | 'WALLET' }) {
    if (mode === 'NITRO') return <NitroView />;
    return <WalletView />;
}

/* 
  NITRO VIEW: Cinematic Industrial Brutalism
  - Fluid Full-Width Display Scales
  - High Contrast Red/Carbon Palette
*/
function NitroView() {
    return (
        <section className="bg-white py-[var(--space-24)] overflow-hidden min-h-screen">
            <div className="max-w-[1728px] mx-auto px-[var(--space-8)] lg:px-[var(--space-20)]">

                <div className="mb-[var(--space-24)]">
                    <motion.h2
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-display-2xl font-display font-[800] text-[var(--carbon-black)] leading-[0.8] tracking-tighter uppercase"
                    >
                        OFFSHORE<br />
                        <span className="text-[var(--signal-red-500)]">ASSET HUB</span>
                    </motion.h2>
                    <div className="flex items-center space-x-[var(--space-6)] mt-[var(--space-10)]">
                        <div className="w-[var(--space-24)] h-5 bg-[var(--signal-red-500)]" />
                        <span className="text-h4 font-[900] uppercase tracking-widest text-[var(--neutral-400)] italic">Powering Global Energy Corridors</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-3)]">
                    {allProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="group relative h-[700px] bg-[var(--carbon-900)] border border-[var(--neutral-200)] hover:border-[var(--signal-red-500)] transition-all duration-500 overflow-hidden product-card"
                        >
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-[1.5s]"
                            />

                            <div className="absolute inset-0 z-10 p-[var(--space-12)] flex flex-col justify-between">
                                <div className="space-y-[var(--space-4)]">
                                    <span className="text-tech-label text-[var(--signal-red-500)] block">REGISTRY {i + 1} / 0{allProducts.length}</span>
                                    <h3 className="text-display-md font-display font-[800] text-white leading-tight uppercase tracking-tighter">{product.title}</h3>
                                </div>

                                <div className="space-y-[var(--space-10)] translate-y-[var(--space-12)] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                    <div className="grid grid-cols-2 gap-[var(--space-4)]">
                                        {product.hud.map(h => (
                                            <div key={h.label} className="bg-white/5 backdrop-blur-md border border-white/10 p-[var(--space-4)] rounded-lg">
                                                <p className="text-tech-label text-white/30 mb-1">{h.label}</p>
                                                <p className="text-h4 font-mono font-bold text-white">{h.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full py-[var(--space-5)] bg-[var(--signal-red-500)] text-white font-[900] uppercase tracking-[0.2em] text-[11px] rounded-lg shadow-glow-red hover:bg-white hover:text-[var(--carbon-black)] transition-all spring-scale">
                                        Secure Technical Sheet
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* 
  WALLET VIEW: Luxury Kinetic Stacking
  - Deep Carbon Backgrounds
  - Crystal Refraction Overlays
*/
function WalletView() {
    return (
        <section className="bg-[var(--carbon-black)] py-[var(--space-24)] min-h-[400vh] relative overflow-hidden">
            <Spotlight className="absolute inset-0 z-0 h-full w-full" />
            <div className="max-w-7xl mx-auto px-[var(--space-8)] lg:px-[var(--space-20)] relative z-10">

                <div className="mb-[var(--space-32)] sticky top-[var(--space-24)] z-50">
                    <div className="flex items-center space-x-[var(--space-4)] mb-[var(--space-6)]">
                        <div className="w-[var(--space-10)] h-[2px] bg-[var(--tech-cyan-500)]" />
                        <span className="text-tech-label text-[var(--tech-cyan-500)]">Asset Collective</span>
                    </div>
                    <h2 className="text-display-lg font-display font-[800] text-white uppercase tracking-tighter leading-[0.9]">
                        Industrial <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--tech-cyan-500)] to-white/40 italic">Asset Registry</span>
                    </h2>
                </div>

                <div className="relative space-y-[var(--space-48)] mt-[var(--space-24)]">
                    {allProducts.map((product, i) => (
                        <WalletCard key={product.id} product={product} index={i} total={allProducts.length} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function WalletCard({ product, index, total }: { product: any, index: number, total: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="sticky top-[200px] w-full h-[650px] rounded-[var(--radius-hud)] overflow-hidden bg-[var(--carbon-900)] border border-white/5 shadow-2xl"
        >
            <div className="absolute inset-0 z-0">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover opacity-30 hover:scale-105 transition-transform duration-[3s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--carbon-black)] via-transparent to-transparent" />
                {/* Blueprint Decor Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
            </div>

            <div className="relative z-10 p-[var(--space-12)] lg:p-[var(--space-16)] h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="max-w-2xl">
                        <span className="text-tech-label text-[var(--tech-cyan-500)] block mb-[var(--space-4)]">DEPLOYMENT CATEGORY: {product.category}</span>
                        <h3 className="text-display-md font-display font-[800] text-white uppercase tracking-tighter leading-tight">
                            {product.title}
                        </h3>
                    </div>
                    <div className="w-16 h-16 bg-white/5 backdrop-blur-2xl rounded-2xl flex items-center justify-center border border-white/10 text-[var(--tech-cyan-500)] shadow-lg">
                        <product.icon size={32} />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between gap-[var(--space-8)]">
                    <div className="flex flex-wrap gap-[var(--space-[space-12)] bg-black/40 backdrop-blur-2xl px-[var(--space-10)] py-[var(--space-8)] rounded-3xl border border-white/5">
                        {product.hud.map((h: any) => (
                            <div key={h.label} className="min-w-[120px]">
                                <p className="text-tech-label text-white/30 mb-1">{h.label}</p>
                                <p className="text-h3 font-mono font-bold text-white">{h.value}</p>
                            </div>
                        ))}
                    </div>

                    <button className="px-[var(--space-12)] py-[var(--space-6)] bg-[var(--tech-cyan-500)] text-[var(--carbon-black)] font-[900] uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-white transition-all shadow-xl shadow-[var(--tech-cyan-500)]/20 spring-scale">
                        Initiate Procurement Link
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
