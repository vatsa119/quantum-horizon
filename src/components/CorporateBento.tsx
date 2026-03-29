"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Building2, ShieldCheck, Target, ArrowRight } from 'lucide-react';
import GlobeScene from './GlobeScene';
import StatCounter from './StatCounter';
import MagneticCard from './MagneticCard';
import StaggeredGrid from './StaggeredGrid';
import Spotlight from './Spotlight';

export default function CorporateBento() {
    return (
        <section className="py-[var(--space-24)] px-[var(--space-8)] bg-white overflow-hidden">
            <StaggeredGrid className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-[var(--space-8)]" stagger={0.1}>

                {/* 1. CORPORATE PROFILE - High Light Intensity */}
                <div className="md:col-span-5 h-full">
                    <MagneticCard className="h-full bg-[var(--neutral-50)] rounded-[var(--radius-hud)] p-[var(--space-12)] border border-[var(--neutral-100)] flex flex-col justify-between overflow-hidden shadow-lg shadow-[var(--neutral-200)]/50">
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="mb-[var(--space-12)]">
                                <div className="flex items-center space-x-[var(--space-3)] mb-[var(--space-6)]">
                                    <div className="w-[var(--space-10)] h-[2px] bg-[var(--signal-red-500)]" />
                                    <span className="text-tech-label text-[var(--signal-red-500)]">Executive Profile</span>
                                </div>
                                <h2 className="text-display-md font-display font-[800] text-[var(--carbon-black)] uppercase tracking-tighter leading-[0.9] mb-[var(--space-6)]">
                                    Sigma <br /> Oilfield
                                </h2>
                                <p className="text-[17px] text-[var(--neutral-600)] font-medium leading-relaxed max-w-sm">
                                    A premier Dubai-based technical hub providing mission-critical assets for global energy corridors.
                                </p>
                            </div>

                            <Link href="/profile" className="group/btn flex items-center space-x-[var(--space-4)] mt-auto">
                                <span className="px-[var(--space-10)] py-[var(--space-5)] bg-[var(--carbon-black)] text-white font-[900] rounded-2xl group-hover/btn:bg-[var(--signal-red-500)] transition-all shadow-xl uppercase tracking-widest text-[10px] spring-scale">
                                    Enter Profile
                                </span>
                                <div className="p-[var(--space-4)] bg-[var(--neutral-100)] rounded-2xl group-hover/btn:bg-[var(--signal-red-500)] group-hover/btn:text-white transition-all">
                                    <ArrowRight size={20} />
                                </div>
                            </Link>
                        </div>
                    </MagneticCard>
                </div>

                {/* 2. STRATEGIC SUPPLY - Deep Carbon Intensity */}
                <div className="md:col-span-7 h-full">
                    <Spotlight className="h-full rounded-[var(--radius-hud)]">
                        <MagneticCard className="h-full section-dark rounded-[var(--radius-hud)] p-[var(--space-12)] overflow-hidden flex flex-col justify-between min-h-[500px]">
                            <div className="relative z-10">
                                <div className="flex items-center space-x-[var(--space-3)] mb-[var(--space-10)]">
                                    <div className="w-[var(--space-10)] h-[2px] bg-[var(--tech-cyan-500)]" />
                                    <span className="text-tech-label text-[var(--tech-cyan-500)]">Global Logistics</span>
                                </div>
                                <h3 className="text-display-lg font-display font-[800] text-white uppercase tracking-tighter leading-[0.8] mb-[var(--space-12)]">
                                    Strategic <br /> Supply
                                </h3>
                            </div>

                            <div className="relative z-10 grid grid-cols-2 gap-[var(--space-12)]">
                                <div className="space-y-[var(--space-4)] group/item">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/item:border-[var(--tech-cyan-500)]/50 group-hover/item:bg-[var(--tech-cyan-500)]/10 transition-all duration-500">
                                        <Target className="text-[var(--tech-cyan-500)]" size={26} />
                                    </div>
                                    <h4 className="text-white font-bold tracking-tight text-lg">Engineering Precision</h4>
                                    <p className="text-white/40 text-sm leading-relaxed">Certified technical support for complex high-pressure wellbore operations.</p>
                                </div>

                                <div className="space-y-[var(--space-4)] group/item">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/item:border-[var(--tech-cyan-500)]/50 group-hover/item:bg-[var(--tech-cyan-500)]/10 transition-all duration-500">
                                        <ShieldCheck className="text-[var(--tech-cyan-500)]" size={26} />
                                    </div>
                                    <div className="flex items-baseline space-x-2">
                                        <StatCounter target={24} suffix="/7" className="text-white !text-4xl" />
                                        <p className="text-white font-bold tracking-tight text-lg">Inventory Readiness</p>
                                    </div>
                                    <p className="text-white/40 text-sm leading-relaxed">Rapid-response API-standard logistics hub with strategic distribution.</p>
                                </div>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
                        </MagneticCard>
                    </Spotlight>
                </div>

                {/* 3. GLOBAL REACH - Orbital Intelligence */}
                <div className="md:col-span-12 relative min-h-[600px] rounded-[var(--radius-hud)] overflow-hidden group shadow-2xl">
                    <Spotlight className="h-full section-dark rounded-[var(--radius-hud)]">
                        <div className="absolute inset-0 z-0">
                            <GlobeScene />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--carbon-black)] via-[var(--carbon-black)]/40 to-transparent pointer-events-none" />

                        <div className="absolute inset-0 p-[var(--space-16)] lg:p-[var(--space-24)] flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                                className="max-w-2xl space-y-[var(--space-8)]"
                            >
                                <span className="inline-flex px-[var(--space-6)] py-[var(--space-2)] bg-[var(--signal-red-500)] text-white text-tech-label rounded-full">Operational Reach</span>
                                <h4 className="text-display-xl font-display font-[800] text-white uppercase tracking-tighter leading-[0.85]">
                                    Global <span className="text-transparent bg-clip-text bg-[var(--gradient-text)] italic">Sourcing</span> Network
                                </h4>
                                <p className="text-h3 text-white/40 font-medium tracking-tight uppercase italic">
                                    US / EU / CHINA Corridors
                                </p>
                            </motion.div>
                        </div>

                        <div className="absolute bottom-[var(--space-12)] right-[var(--space-12)] flex items-center space-x-[var(--space-4)] pointer-events-none">
                            <div className="w-[var(--space-16)] h-[2px] bg-[var(--signal-red-500)]" />
                            <span className="text-tech-label text-white/60">Certified Procurement Intel</span>
                        </div>
                    </Spotlight>
                </div>
            </StaggeredGrid>
        </section>
    );
}
