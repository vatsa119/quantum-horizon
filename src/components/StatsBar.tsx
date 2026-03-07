"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Building2, ShieldCheck } from 'lucide-react';

export default function StatsBar() {
    const stats = [
        {
            label: "Mission Profile",
            value: "USA / EU / China Rigs",
            icon: Globe,
            color: "text-[var(--tech-cyan-500)]",
            bg: "bg-[var(--tech-cyan-500)]/10"
        },
        {
            label: "Global Logistics",
            value: "DMCC Hub Command",
            icon: Building2,
            color: "text-[var(--industrial-gold)]",
            bg: "bg-[var(--industrial-gold)]/10"
        },
        {
            label: "Audit Integrity",
            value: "API Series Certified",
            icon: ShieldCheck,
            color: "text-[var(--signal-red-500)]",
            bg: "bg-[var(--signal-red-500)]/10"
        }
    ];

    return (
        <div className="relative z-30 -mt-[var(--space-16)] max-w-7xl mx-auto px-[var(--space-6)]">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-white/95 backdrop-blur-2xl rounded-[var(--radius-3xl)] shadow-lg border border-white/50 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden"
            >
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        whileHover={{ y: -5 }}
                        transition={{
                            delay: 0.2 + (i * 0.1),
                            duration: 0.5,
                            type: "spring"
                        }}
                        viewport={{ once: true }}
                        className="p-[var(--space-10)] flex items-center space-x-[var(--space-6)] hover:bg-slate-50 transition-all group relative overflow-hidden cursor-default"
                    >
                        <div className={`p-[var(--space-5)] rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 group-hover:rotate-3 transition-all relative z-10`}>
                            <stat.icon size={32} strokeWidth={2.5} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-tech-label text-slate-400 mb-1">{stat.label}</p>
                            <p className="text-h4 font-display font-bold text-[var(--carbon-black)] tracking-tight leading-none">{stat.value}</p>
                        </div>

                        {/* HOVER GLOW VECTOR */}
                        <div className={`absolute bottom-0 right-0 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity ${stat.bg} -mr-12 -mb-12 rounded-full`} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
