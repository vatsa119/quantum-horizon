"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Scrollytelling range
    const scale = useTransform(scrollY, [0, 500], [1, 1.15]);
    const yParallax = useTransform(scrollY, [0, 500], [0, 80]);
    const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const textY = useTransform(scrollY, [0, 300], [0, -50]);

    return (
        <section
            ref={containerRef}
            // Executive Isolation: padding-top: 140px to ensure the brand name and the navbar have a "Golden Ratio" of white space between them.
            className="relative min-h-[95vh] w-full flex items-center overflow-hidden bg-[#111827] z-10 pt-[140px]"
        >
            {/* Whisk-Style Rig Image Layer */}
            <motion.div
                style={{ scale, y: yParallax }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/Hero-rig.jpg"
                    alt="Sigma Oilfield Rig"
                    fill
                    className="object-cover object-center"
                    priority
                    quality={100}
                />
                {/* Cinematic Overlays */}
                <div className="absolute inset-0 z-10 bg-black/40" />
            </motion.div>

            {/* Hero Content Layer */}
            <motion.div
                style={{ opacity: textOpacity, y: textY }}
                className="relative z-20 w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-24 py-20"
            >
                <div className="max-w-full lg:max-w-7xl font-montserrat">
                    {/* Executive Branding Header */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-[7vw] font-black leading-[1] text-white mb-10 tracking-tighter uppercase"
                    >
                        <span className="block mb-2">SIGMA OILFIELD</span>
                        <span className="block mb-2">& INDUSTRIAL SUPPLY</span>
                        <span className="text-[#EE3124]">DMCC</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="w-10 h-[2px] bg-[#EE3124]" />
                        <h2 className="text-sm md:text-base lg:text-lg font-extrabold text-white/80 uppercase tracking-[0.25em] font-montserrat">
                            Global Infrastructure Hub
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-base md:text-lg lg:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed font-medium font-montserrat"
                    >
                        Engineering 100% operational stability across global energy corridors with certified high-precision infrastructure.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <MagneticButton
                            className="inline-flex items-center px-16 py-7 bg-[#EE3124] text-white font-black rounded-lg hover:bg-white hover:text-[#111827] transition-all shadow-3xl shadow-[#EE3124]/40 uppercase tracking-[0.3em] text-xs"
                            onClick={() => window.location.href = '#contact'}
                        >
                            Get Started
                            <svg className="w-6 h-6 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </MagneticButton>
                    </motion.div>
                </div>
            </motion.div>

            {/* Surface Transition Mask */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#111827] to-transparent z-15" />
        </section>
    );
}
