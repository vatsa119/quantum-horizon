"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Building2, ShieldCheck, Target, ArrowRight } from 'lucide-react';
import GlobeScene from './GlobeScene';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1] as any, // The 'as any' tells the computer to stop being so strict
        },
    },
};
export default function CorporateBento() {
    return (
        <section className="py-32 px-8 bg-white overflow-hidden">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8"
            >
                {/* 1. Corporate Profile (Col: 5) */}
                <motion.div
                    variants={itemVariants}
                    className="md:col-span-5 relative group bg-slate-50 rounded-[4rem] p-16 border border-slate-100 flex flex-col justify-between overflow-hidden shadow-2xl shadow-slate-200/50"
                >
                    <div className="relative z-10">
                        <div className="flex items-center space-x-3 mb-10">
                            <div className="w-10 h-1 bg-[#EE3124]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#EE3124]">Corporate Profile</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1E293B] uppercase tracking-tighter mb-8 font-montserrat leading-none">
                            Sigma Oilfield <br /> & Industrial
                        </h2>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm mb-12">
                            A premier Dubai-based hub providing mission-critical assets for global energy corridors.
                        </p>
                    </div>

                    <Link href="/profile" className="relative z-10 w-fit group/btn flex items-center space-x-4">
                        <span className="px-10 py-5 bg-[#111827] text-white font-black rounded-2xl hover:bg-[#EE3124] transition-all shadow-xl shadow-slate-900/20 uppercase tracking-widest text-xs">
                            Discover Profile
                        </span>
                        <div className="p-4 bg-slate-100 rounded-2xl group-hover/btn:bg-[#EE3124]/10 transition-all">
                            <ArrowRight className="text-[#EE3124]" size={20} />
                        </div>
                    </Link>

                    {/* Background Decor */}
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-slate-200/20 blur-3xl rounded-full" />
                </motion.div>

                {/* 2. Global Services (Col: 7) */}
                <motion.div
                    variants={itemVariants}
                    className="md:col-span-7 relative group bg-[#111827] rounded-[4rem] p-16 overflow-hidden flex flex-col justify-between"
                >
                    <div className="relative z-10">
                        <div className="flex items-center space-x-3 mb-10">
                            <div className="w-10 h-1 bg-[#0099CC]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0099CC]">Global Services</span>
                        </div>
                        <h3 className="text-4xl md:text-[5rem] font-black text-white uppercase tracking-tighter mb-10 font-montserrat leading-[0.85]">
                            Strategic <br /> Supply
                        </h3>
                    </div>

                    <div className="relative z-10 grid grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#0099CC] transition-all duration-500">
                                <Target className="text-[#0099CC] group-hover:text-white" size={24} />
                            </div>
                            <p className="text-white font-bold tracking-tight text-lg">Precision Engineering</p>
                            <p className="text-slate-400 text-sm">Certified technical support for complex wellbore operations.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-[#0099CC] transition-all duration-500">
                                <ShieldCheck className="text-[#0099CC] group-hover:text-white" size={24} />
                            </div>
                            <p className="text-white font-bold tracking-tight text-lg">Inventory Integrity</p>
                            <p className="text-slate-400 text-sm">API-standard logistics hub with 24/7 strategic response.</p>
                        </div>
                    </div>

                    {/* Blueprint Decor Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 pointer-events-none" />
                </motion.div>

                {/* 3. Global Sourcing Network (Col: 12) */}
                <motion.div
                    variants={itemVariants}
                    className="md:col-span-12 relative h-[500px] rounded-[4.5rem] overflow-hidden group shadow-3xl bg-[#111827]"
                >
                    <div className="absolute inset-0 z-0">
                        <GlobeScene />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/90 via-[#111827]/40 to-transparent pointer-events-none" />

                    <div className="absolute inset-0 p-20 flex flex-col justify-center pointer-events-none">
                        <div className="mb-8">
                            <span className="px-6 py-3 bg-[#EE3124] text-white text-[10px] font-black uppercase tracking-widest rounded-full">Operational Reach</span>
                        </div>
                        <h4 className="text-[4rem] md:text-[6rem] font-black text-white uppercase tracking-tighter leading-none font-montserrat">
                            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/10 uppercase italic">Sourcing</span> Network
                        </h4>
                        <p className="text-2xl text-white/60 font-medium tracking-tight mt-6 max-w-xl uppercase italic">
                            API-Certified Quality Assurance across USA, EU, and China energy corridors.
                        </p>
                    </div>

                    <div className="absolute bottom-12 right-12 flex items-center space-x-4 pointer-events-none">
                        <div className="w-16 h-1 bg-[#EE3124]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Certified Procurement</span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
