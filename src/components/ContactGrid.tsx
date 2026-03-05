"use client";

import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function ContactGrid() {
    return (
        <section className="py-32 bg-white px-8 border-t border-gray-100 relative z-20 shadow-2xl">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-12">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-3 mb-6"
                        >
                            <div className="w-12 h-1.5 bg-[#EE3124] rounded-full" />
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-[#EE3124]">Reach Out</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-black text-[#1E293B] uppercase tracking-tighter mt-4 font-montserrat leading-[1.1]"
                        >
                            Global <span className="text-[#0099CC]">Operations</span> Hub
                        </motion.h2>
                    </div>

                    <MagneticButton
                        className="px-16 py-8 bg-[#111827] text-white font-black rounded-[2.5rem] hover:bg-[#EE3124] transition-all shadow-3xl shadow-slate-900/20 uppercase tracking-[0.3em] text-sm flex items-center group"
                    >
                        Send Message
                        <Send className="w-5 h-5 ml-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                    </MagneticButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            icon: MapPin,
                            title: "Dubai HQ",
                            text: "Unit No. 3405, Platinum Tower, JLT, Dubai, UAE.",
                            sub: "DMCC Authority Hub"
                        },
                        {
                            icon: Phone,
                            title: "Ops Desk",
                            text: "+971 4 266 5748",
                            sub: "24/7 Strategic Support"
                        },
                        {
                            icon: Mail,
                            title: "Inquiries",
                            text: "ops@sigmaenergyservices.com",
                            sub: "24-Hour Technical ROI"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="flex flex-col p-12 bg-slate-50 rounded-[3.5rem] border border-slate-100 group transition-all duration-500 hover:bg-white hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)]"
                        >
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-xl group-hover:bg-[#FFCC00] group-hover:rotate-6 transition-all duration-500">
                                <item.icon size={36} className="text-[#EE3124] group-hover:text-[#111827]" />
                            </div>
                            <h3 className="text-2xl font-black text-[#1E293B] uppercase mb-4 tracking-tighter font-montserrat">{item.title}</h3>
                            <p className="text-slate-500 font-bold text-lg leading-relaxed mb-10 group-hover:text-slate-900 transition-colors">
                                {item.text}
                            </p>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0099CC] opacity-60">
                                {item.sub}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
