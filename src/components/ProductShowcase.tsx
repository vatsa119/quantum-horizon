"use client";

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Cog, Anchor, Toolbox, Activity, ShieldCheck, ArrowRight, Layers, Drill, Search, Settings } from 'lucide-react';
import Image from 'next/image';

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
  NITRO MODE: BRUTALIST POWER PLAY 
  - Massive Viewport Width Typography (12vw)
  - LayoutID pops
  - High Contrast Red/White
*/
function NitroView() {
    return (
        <section className="bg-white py-32 overflow-hidden min-h-screen">
            <div className="max-w-[1440px] mx-auto px-12">
                <div className="mb-32">
                    <motion.h2
                        layoutId="nitro-title"
                        className="text-[12vw] font-black uppercase text-[#111827] leading-[0.8] tracking-tighter"
                    >
                        SIGMA<br />
                        <span className="text-[#EE3124]">OILFIELD</span>
                    </motion.h2>
                    <div className="flex items-center space-x-6 mt-12">
                        <div className="w-24 h-4 bg-[#EE3124]" />
                        <span className="text-2xl font-black uppercase tracking-widest text-slate-500">Power Infrastructure</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease: "circOut" }}
                            className="group relative h-[600px] bg-slate-900 border-2 border-slate-900 hover:border-[#EE3124] transition-all overflow-hidden"
                        >
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 h-full"
                            />
                            <div className="absolute inset-0 z-10 p-12 flex flex-col justify-between">
                                <div className="text-white">
                                    <span className="text-[#EE3124] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">LEVEL 0{i + 1} / {product.category}</span>
                                    <h3 className="text-6xl font-black uppercase tracking-tighter leading-none">{product.title}</h3>
                                </div>

                                <div className="flex flex-wrap gap-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-8 group-hover:translate-y-0 duration-500">
                                    {product.hud.map(h => (
                                        <div key={h.label} className="bg-[#EE3124] text-white px-6 py-4 rounded-sm">
                                            <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">{h.label}</p>
                                            <p className="text-2xl font-black font-mono">{h.value}</p>
                                        </div>
                                    ))}
                                    <button className="bg-white text-black px-10 py-4 font-black uppercase text-xs tracking-widest">
                                        Request Spec
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
  WALLET MODE: LUXURY STACK 
  - Sticky Stacking (sticky top-20)
  - 3D Layering/Shadows
*/
function WalletView() {
    return (
        <section className="bg-[#111827] py-32 px-12 min-h-[300vh]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-32 sticky top-24 z-50">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-1 bg-[#0099CC]" />
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-[#0099CC]">Strategic Selection</span>
                    </div>
                    <h2 className="text-6xl font-black text-white uppercase tracking-tighter font-montserrat">
                        Certified <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099CC] to-white/40 italic">Industrial Assets</span>
                    </h2>
                </div>

                <div className="space-y-[40vh]">
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
            style={{ top: 120 + (index * 40) }}
            className="sticky w-full h-[600px] rounded-[3rem] overflow-hidden bg-slate-900 border border-white/10 shadow-[0_-50px_100px_rgba(0,0,0,0.5)] transform-gpu"
        >
            <div className="absolute inset-0 z-0 scale-105">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover opacity-40 hover:scale-110 transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>

            <div className="relative z-10 p-16 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-[10px] font-black text-[#0099CC] uppercase tracking-[0.4em] mb-4">ASSET {index + 1} / {total}</div>
                        <h3 className="text-5xl font-black text-white uppercase tracking-tighter leading-tight font-montserrat max-w-xl">
                            {product.title}
                        </h3>
                    </div>
                    <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2.5xl flex items-center justify-center border border-white/10">
                        <product.icon size={28} className="text-[#0099CC]" />
                    </div>
                </div>

                <div className="flex items-end justify-between">
                    <div className="grid grid-cols-3 gap-12 p-10 bg-black/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 w-fit">
                        {product.hud.map((h: any) => (
                            <div key={h.label}>
                                <p className="text-[9px] font-black uppercase tracking-widest text-[#0099CC] mb-1 italic font-mono">{h.label}</p>
                                <p className="text-2xl font-bold text-white font-mono">{h.value}</p>
                            </div>
                        ))}
                    </div>

                    <button className="px-12 py-6 bg-[#0099CC] text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl shadow-[#0099CC]/20">
                        Secure Delivery
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
