"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import Spotlight from './Spotlight';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const [videoFailed, setVideoFailed] = useState(false);

    const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);
    const textY = useTransform(scrollY, [0, 500], [0, 100]);
    const rigScale = useTransform(scrollY, [0, 1000], [1, 1.2]);
    const rigOpacity = useTransform(scrollY, [0, 800], [0.4, 0.1]);

    return (
        <Spotlight>
            <section ref={containerRef} className="relative min-h-screen w-full flex items-center overflow-hidden bg-[var(--carbon-black)]">
                {/* BACKGROUND RIG LAYER - Cinematic Depth */}
                <motion.div
                    style={{ scale: rigScale, opacity: rigOpacity }}
                    className="absolute inset-0 z-0 pointer-events-none"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--carbon-black)] via-transparent to-[var(--carbon-black)] z-10" />
                    <Image
                        src="/offshore-rig.jpg"
                        alt="Offshore Infrastructure"
                        fill
                        className="object-cover grayscale contrast-125 brightness-50"
                        priority
                        sizes="100vw"
                    />
                </motion.div>

                {/* RADAR OVERLAY - Technical Pattern */}
                <div className="absolute inset-0 z-1 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--carbon-600)_1px,transparent_1px)] bg-[size:32px_32px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--carbon-700)_1px,transparent_1px),linear-gradient(to_bottom,var(--carbon-700)_1px,transparent_1px)] bg-[size:128px_128px] opacity-10" />
                </div>

                {/* HERO CONTENT ENGINE */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="relative z-20 w-full max-w-7xl mx-auto px-[var(--space-8)] sm:px-[var(--space-12)] lg:px-[var(--space-20)] py-[var(--space-20)]"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-12)] lg:gap-[var(--space-24)] items-center">

                        {/* LEFT COLUMN: BRAND HUB */}
                        <div className="col-span-12 lg:col-span-8 relative z-20">
                            <div className="max-w-[800px]">
                                {/* OVERLINE TELEMETRY */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="flex items-center gap-[var(--space-4)] mb-[var(--space-8)]"
                                >
                                    <div className="w-[var(--space-12)] h-[2px] bg-[var(--signal-red-500)]" />
                                    <span className="text-tech-label text-white/80 tracking-[0.2em]">
                                        Global Infrastructure Protocol: Active
                                    </span>
                                </motion.div>

                                {/* EXECUTIVE HEADLINE - VIDEO MASKED */}
                                <motion.h1
                                    initial={{ opacity: 0, y: 60 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-display-2xl font-display font-[800] leading-[0.95] text-white mb-[var(--space-12)] uppercase tracking-[-0.04em]"
                                >
                                    <div className="hero-text-mask-container mb-[var(--space-2)] rounded-2xl overflow-hidden">
                                        {!videoFailed && (
                                            <video
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="hero-bg-video"
                                                onError={() => setVideoFailed(true)}
                                            >
                                                <source src="/videos/industrial-loop.mp4" type="video/mp4" />
                                            </video>
                                        )}
                                        <span className={`block hero-masked-text ${videoFailed ? 'hero-headline-masked' : ''}`}>
                                            SIGMA
                                        </span>
                                    </div>
                                    <span className="block mb-[var(--space-2)]">OILFIELD</span>
                                    <span className="text-[var(--signal-red-500)] italic">& INDUSTRIAL</span>
                                </motion.h1>

                                {/* SUB-ORCHESTRATION */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                    className="text-body-lg lg:text-[22px] text-white/50 mb-[var(--space-16)] max-w-2xl leading-relaxed font-medium"
                                >
                                    Engineering absolute operational stability across the global energy corridor.
                                    Precision hardware for high-stakes infrastructure.
                                </motion.p>

                                {/* INTERACTIVE VECTOR */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                    className="flex flex-wrap gap-[var(--space-6)]"
                                >
                                    <MagneticButton
                                        className="inline-flex items-center px-[var(--space-16)] py-[var(--space-6)] bg-[var(--signal-red-500)] text-white font-[900] rounded-xl hover:bg-white hover:text-[var(--carbon-black)] transition-all shadow-glow-red uppercase tracking-[0.2em] text-[11px]"
                                        onClick={() => {
                                            const contactSection = document.getElementById('contact');
                                            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        Initiate Deployment
                                        <ArrowRight className="w-5 h-5 ml-4" />
                                    </MagneticButton>

                                    <button className="inline-flex items-center px-[var(--space-12)] py-[var(--space-6)] bg-white/5 backdrop-blur-md border border-white/10 text-white font-[700] rounded-xl hover:bg-white/10 spring-scale uppercase tracking-[0.2em] text-[11px]">
                                        View Asset Registry
                                    </button>
                                </motion.div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: HUD ASSET */}
                        <div className="hidden lg:block lg:col-span-4 relative z-30">
                            <motion.div
                                initial={{ opacity: 0, x: 60, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 1.2, delay: 0.4 }}
                                className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-[var(--space-12)] rounded-hud shadow-2xl relative overflow-hidden group"
                            >
                                <div className="flex items-center justify-between mb-[var(--space-10)]">
                                    <div className="flex items-center space-x-[var(--space-3)]">
                                        <div className="w-2 h-2 bg-[var(--signal-red-500)] rounded-full animate-pulse" />
                                        <span className="text-tech-label text-white/40">SYSTEM STATUS</span>
                                    </div>
                                    <span className="text-tech-label text-[var(--signal-red-500)] font-black">NOMINAL</span>
                                </div>

                                <div className="space-y-[var(--space-3)] mb-[var(--space-12)]">
                                    <h3 className="text-h3 font-display font-bold text-white uppercase tracking-tighter leading-none">
                                        High-Precision<br />Engineered
                                    </h3>
                                    <p className="text-tech-label text-white/30 tracking-[0.2em]">API SERIES 16A/6A</p>
                                </div>

                                <div className="space-y-[var(--space-8)]">
                                    {[
                                        { label: 'Integrity Index', value: '100%' },
                                        { label: 'Deploy Readiness', value: '24/7' },
                                        { label: 'Global Node', value: 'Dubai/DMCC' }
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-[var(--space-2)]">
                                            <div className="flex justify-between items-center text-tech-label text-white/40">
                                                <span>{stat.label}</span>
                                                <span className="text-white font-bold">{stat.value}</span>
                                            </div>
                                            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: '100%' }}
                                                    transition={{ duration: 2, delay: 1 + (i * 0.2) }}
                                                    className="h-full bg-[var(--signal-red-500)] shadow-[0_0_10px_var(--signal-red-500)]"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* HUD DECORATORS */}
                                <div className="absolute top-0 right-0 p-[var(--space-6)] opacity-20">
                                    <div className="w-16 h-16 border-t-[1px] border-r-[1px] border-white/40" />
                                </div>
                                <div className="absolute bottom-0 left-0 p-[var(--space-6)] opacity-20">
                                    <div className="w-16 h-16 border-b-[1px] border-l-[1px] border-white/40" />
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </motion.div>

                {/* SURFACE TRANSITION MASK */}
                <div className="absolute bottom-0 left-0 w-full h-[var(--space-48)] bg-gradient-to-t from-[var(--carbon-black)] to-transparent z-15" />
            </section>
        </Spotlight>
    );
}