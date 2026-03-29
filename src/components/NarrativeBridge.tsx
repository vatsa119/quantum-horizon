"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NarrativeBridge() {
    return (
        <div className="w-full bg-[var(--carbon-black)] py-12 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-8"
            >
                <Link
                    href="/contact"
                    className="block w-full"
                >
                    <div className="relative w-full bg-[var(--signal-red-500)] py-10 rounded-[2rem] flex items-center justify-center overflow-hidden shadow-[inset_4px_4px_8px_rgba(255,255,255,0.3),_inset_-4px_-4px_8px_rgba(0,0,0,0.3),_0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02] active:scale-95 group">
                        <span
                            className="text-white text-h2 tracking-[0.1em] text-center px-6 italic"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                            Partner for Industrial Excellence — <span className="font-sans font-black not-italic uppercase">GET A QUOTE</span>
                        </span>

                        {/* Kinetic Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />

                        {/* Neomorphism Inner Glow */}
                        <div className="absolute inset-0 pointer-events-none rounded-[2rem] border border-white/10" />
                    </div>
                </Link>
            </motion.div>
        </div>
    );
}
