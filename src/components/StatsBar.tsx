"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Building2, ShieldCheck } from 'lucide-react';

export default function StatsBar() {
    const stats = [
        {
            label: "Global Supply",
            value: "USA, Europe, China Rigs",
            icon: Globe,
            color: "text-[#0099CC]",
            bg: "bg-[#0099CC]/10"
        },
        {
            label: "Global Sourcing",
            value: "Network (USA/EU/China)",
            icon: Building2,
            color: "text-[#FFCC00]",
            bg: "bg-[#FFCC00]/10"
        },
        {
            label: "API Certified",
            value: "Equipment Standards",
            icon: ShieldCheck,
            color: "text-[#EE3124]",
            bg: "bg-[#EE3124]/10"
        }
    ];

    return (
        <div className="relative z-30 -mt-16 max-w-7xl mx-auto px-6">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_32px_100px_rgba(0,0,0,0.15)] border border-white/50 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden"
            >
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        transition={{
                            delay: 0.3 + (i * 0.2),
                            duration: 0.5,
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        }}
                        viewport={{ once: true }}
                        className="p-10 flex items-center space-x-6 hover:bg-slate-50 transition-all group relative overflow-hidden cursor-default"
                    >
                        <div className={`p-5 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 group-hover:rotate-6 transition-all relative z-10`}>
                            <stat.icon size={36} strokeWidth={2.5} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 font-montserrat">{stat.label}</p>
                            <p className="text-xl font-bold text-[#1E293B] font-montserrat tracking-tight leading-none">{stat.value}</p>
                        </div>

                        {/* Hover Decor */}
                        <div className={`absolute bottom-0 right-0 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity ${stat.bg} -mr-12 -mb-12 rounded-full`} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
