"use client";

import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function ContactGrid() {
    return (
        <section className="py-[var(--space-24)] bg-white px-[var(--space-8)] border-t border-[var(--neutral-100)] relative z-20 shadow-2xl">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-center mb-[var(--space-24)] gap-[var(--space-12)]">
                    <div className="max-w-2xl space-y-[var(--space-6)]">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-[var(--space-3)]"
                        >
                            <div className="w-[var(--space-12)] h-[2px] bg-[var(--signal-red-500)]" />
                            <span className="text-tech-label text-[var(--signal-red-500)]">Global Operations Command</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-display-lg font-display font-[800] text-[var(--carbon-black)] uppercase tracking-tighter leading-[0.95]"
                        >
                            Direct <br /> <span className="text-[var(--tech-cyan-500)]">Strategic</span> Nexus
                        </motion.h2>
                    </div>

                    <MagneticButton
                        className="px-[var(--space-16)] py-[var(--space-8)] bg-[var(--carbon-black)] text-white font-[900] rounded-[var(--radius-hud)] hover:bg-[var(--signal-red-500)] transition-all shadow-xl uppercase tracking-[0.2em] text-[11px] flex items-center group"
                    >
                        Send Transmission
                        <Send className="w-5 h-5 ml-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                    </MagneticButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-10)]">
                    {[
                        {
                            icon: MapPin,
                            title: "Global HQ",
                            text: "Unit No. I5-PF-97, Gold Tower, Cluster I, JLT, Dubai, UAE.",
                            sub: "DMCC Authority Hub",
                            color: "text-[var(--signal-red-500)]",
                            bg: "bg-[var(--signal-red-500)]/5"
                        },
                        {
                            icon: Phone,
                            title: "Mission Desk",
                            text: "+971 4 266 5748",
                            sub: "24/7 Strategic Support",
                            color: "text-[var(--industrial-gold)]",
                            bg: "bg-[var(--industrial-gold)]/5"
                        },
                        {
                            icon: Mail,
                            title: "Direct Inquiries",
                            text: "uma@sigmadxb.com",
                            sub: "Executive Operational ROI",
                            color: "text-[var(--tech-cyan-500)]",
                            bg: "bg-[var(--tech-cyan-500)]/5"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="flex flex-col p-[var(--space-12)] bg-[var(--neutral-50)] rounded-[var(--radius-hud)] border border-[var(--neutral-100)] group transition-all duration-500 hover:bg-white hover:shadow-2xl"
                        >
                            <div className={`w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-[var(--space-10)] shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${item.bg}`}>
                                <item.icon size={36} className={`${item.color}`} />
                            </div>
                            <h3 className="text-h3 font-display font-[800] text-[var(--carbon-black)] uppercase mb-[var(--space-4)] tracking-tighter">{item.title}</h3>
                            <div className="space-y-[var(--space-8)] mt-auto">
                                <p className="text-[17px] text-[var(--neutral-600)] font-medium leading-relaxed group-hover:text-[var(--carbon-black)] transition-colors">
                                    {item.text}
                                </p>
                                <span className="text-tech-label opacity-40 group-hover:opacity-100 transition-opacity block border-t border-[var(--neutral-100)] pt-[var(--space-4)]">
                                    {item.sub}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
