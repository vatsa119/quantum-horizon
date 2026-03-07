"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function CorporateNarrative() {
    // Magnetic logic for the API card
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        const radius = 250;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < radius) {
            mouseX.set(distanceX * 0.15);
            mouseY.set(distanceY * 0.15);
        } else {
            mouseX.set(0);
            mouseY.set(0);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section className="py-[var(--space-24)] bg-white px-[var(--space-8)] overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-[var(--space-16)] lg:gap-[var(--space-24)]">

                {/* LEFT: NARATIVE CONTENT */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="lg:w-1/2 space-y-[var(--space-10)]"
                >
                    <div className="flex items-center space-x-[var(--space-3)]">
                        <div className="w-[var(--space-12)] h-[2px] bg-[var(--industrial-gold)]" />
                        <span className="text-tech-label text-[var(--signal-red-500)]">Executive Narrative</span>
                    </div>

                    <h2 className="text-display-lg font-display font-[800] text-[var(--carbon-black)] uppercase tracking-tighter leading-[0.95] mb-[var(--space-8)]">
                        Sigma <br />
                        <span className="text-[var(--signal-red-500)]">Industrial</span> <br />
                        Excellence
                    </h2>

                    <div className="space-y-[var(--space-8)] text-[18px] text-[var(--neutral-600)] font-medium leading-relaxed max-w-xl">
                        <p>
                            Sigma Oilfield & Industrial Supply along with its partners in UAE, take pride in providing
                            state-of-the-art specialized facilities prioritized with <span className="text-[var(--carbon-black)] font-[800] border-b-2 border-[var(--industrial-gold)]">API-Certified Quality Assurance</span>.
                        </p>
                        <p>
                            We deliver high-precision turnkey services for offshore and onshore drilling corridors,
                            ensuring 100% operational stability through a certified global sourcing nexus.
                        </p>
                    </div>

                    <div className="pt-[var(--space-8)]">
                        <Link
                            href="/profile"
                            className="group flex items-center space-x-[var(--space-4)]"
                        >
                            <span className="px-[var(--space-12)] py-[var(--space-6)] bg-[var(--signal-red-500)] text-white font-[900] rounded-xl hover:bg-[var(--carbon-black)] transition-all shadow-glow-red uppercase tracking-widest text-[11px]">
                                Detailed Profile
                            </span>
                            <motion.div
                                animate={{ x: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="p-[var(--space-4)] bg-[var(--neutral-50)] rounded-full text-[var(--signal-red-500)] group-hover:bg-[var(--signal-red-500)] group-hover:text-white transition-all shadow-sm"
                            >
                                <ArrowRight size={20} />
                            </motion.div>
                        </Link>
                    </div>
                </motion.div>

                {/* RIGHT: KINETIC VISUAL HUB */}
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="lg:w-1/2 relative group"
                >
                    <div className="relative rounded-[var(--radius-hud)] overflow-hidden shadow-2xl">
                        <motion.img
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 1.5 }}
                            src="https://images.unsplash.com/photo-1544161515-4af6b1d8d16e?auto=format&fit=crop&q=80&w=2070"
                            alt="Industrial Precision Hub"
                            className="w-full h-[650px] object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-[2s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--carbon-black)]/60 via-transparent to-transparent" />
                    </div>

                    {/* MAGNETIC TELEMETRY CARD */}
                    <motion.div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ x, y }}
                        className="absolute -bottom-10 -left-10 bg-white/95 backdrop-blur-3xl p-[var(--space-10)] rounded-[var(--radius-hud)] shadow-2xl border border-[var(--neutral-100)] hidden lg:flex flex-col items-center justify-center cursor-pointer min-w-[200px] z-20 overflow-hidden"
                    >
                        <ShieldCheck className="text-[var(--tech-cyan-500)] w-12 h-12 mb-[var(--space-4)]" />
                        <div className="text-display-md font-display font-[800] text-[var(--tech-cyan-500)] tracking-tighter leading-none">API</div>
                        <p className="text-tech-label text-[var(--signal-red-500)] mt-[var(--space-2)] text-center">Quality Guard</p>

                        <div className="w-full h-[1px] bg-[var(--neutral-100)] my-[var(--space-6)]" />

                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-1 bg-[var(--industrial-gold)]/20 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "100%" }}
                                        transition={{ duration: 1, delay: 1 + (i * 0.1) }}
                                        className="h-full bg-[var(--industrial-gold)] shadow-[0_0_8px_var(--industrial-gold)]"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
