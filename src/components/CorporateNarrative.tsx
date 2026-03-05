"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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

        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Define active radius for magnetic pull
        const radius = 200;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < radius) {
            // Soft lag-behind movement (magnetic pull)
            mouseX.set(distanceX * 0.2);
            mouseY.set(distanceY * 0.2);
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
        <section className="py-24 bg-white px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="md:w-1/2"
                >
                    <div className="flex items-center space-x-2 mb-6 text-montserrat font-black uppercase text-xs">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 48 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="h-1 bg-[#FFCC00]"
                        />
                        <span className="tracking-[0.4em] text-[#EE3124]">Corporate Profile</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-[#1E293B] uppercase font-montserrat tracking-tighter mb-8 leading-[1.1]">
                        Sigma Oilfield <br />
                        & Industrial <br />
                        Supply DMCC
                    </h2>

                    <div className="space-y-6 text-xl text-slate-600 font-medium leading-relaxed">
                        <p>
                            Sigma Oilfield & Industrial Supply along with its partners in UAE, take pride in providing
                            state-of-the-art specialized facilities prioritized with <span className="text-[#1E293B] font-black border-b-2 border-[#FFCC00]">API-Certified Quality Assurance</span> through our global network.
                        </p>
                        <p className="text-lg">
                            We are dedicated to providing high-precision turnkey services in the field of oil and gas drilling,
                            ensuring 100% operational stability and certified industrial safety.
                        </p>
                    </div>

                    <div className="mt-12">
                        <Link
                            href="/profile"
                            className="group flex items-center space-x-4"
                        >
                            <span className="px-10 py-5 bg-[#EE3124] text-white font-black rounded-xl hover:bg-[#D32F2F] transition-all shadow-xl shadow-[#EE3124]/20 inline-block uppercase tracking-widest active:scale-95 text-sm">
                                Read More
                            </span>
                            <motion.span
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="text-[#EE3124]"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.span>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="md:w-1/2 relative"
                >
                    <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.8 }}
                            src="https://images.unsplash.com/photo-1544161515-4af6b1d8d16e?auto=format&fit=crop&q=80&w=2070"
                            alt="Global Sourcing Network"
                            className="w-full h-[600px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </div>

                    {/* Magnetic API Callout Card */}
                    <motion.div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ x, y }}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="absolute -bottom-8 -left-8 bg-white p-10 rounded-[2rem] shadow-2xl border border-slate-100 hidden lg:block cursor-pointer z-20"
                    >
                        <div className="text-5xl font-black text-[#0099CC] font-montserrat tracking-tighter text-center">API</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#EE3124] mt-2 text-center">Certified Quality Assurance</div>
                        <div className="mt-4 flex gap-1">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-6 h-1 bg-[#FFCC00]/30 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 1, delay: 1 + (i * 0.2) }}
                                    className="h-full bg-[#FFCC00]"
                                />
                            </div>)}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
