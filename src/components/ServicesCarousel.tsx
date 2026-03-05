"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Drill as DrillIcon, Compass, Cable, Layers, Waves } from 'lucide-react';

const services = [
    { title: "Drilling", icon: DrillIcon, desc: "High-precision onshore and offshore drilling operations." },
    { title: "Directional Drilling", icon: Compass, desc: "Advanced trajectory control for complex wellbore designs." },
    { title: "MWD/LWD", icon: Cable, desc: "Real-time measurement and logging while drilling." },
    { title: "Coring", icon: Layers, desc: "High-recovery core sampling for geological analysis." },
    { title: "Drilling Mud Services", icon: Waves, desc: "Optimized fluid systems for wellbore stability." }
];

export default function ServicesCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 font-montserrat">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <span className="text-[#EE3124] font-black uppercase tracking-[0.3em] text-xs">Our Expertise</span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1E293B] uppercase tracking-tighter mt-2">What We Do</h2>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="p-4 rounded-full bg-white shadow-sm border border-slate-200 hover:bg-[#EE3124] hover:text-white transition-all active:scale-90"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-4 rounded-full bg-white shadow-sm border border-slate-200 hover:bg-[#EE3124] hover:text-white transition-all active:scale-90"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            className="min-w-[300px] md:min-w-[400px] snap-center bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:border-[#FFCC00] transition-colors group"
                        >
                            <div className="w-16 h-16 bg-blue-50 text-[#0099CC] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#FFCC00] group-hover:text-[#111827] transition-all">
                                <service.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-[#1E293B] uppercase mb-4 tracking-tight">{service.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
