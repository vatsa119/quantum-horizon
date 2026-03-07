"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Drill as DrillIcon, Compass, Cable, Layers, Waves } from 'lucide-react';

const services = [
    { title: "Drilling", icon: DrillIcon, desc: "High-precision onshore and offshore drilling operations with certified toolsets." },
    { title: "Directional Drilling", icon: Compass, desc: "Advanced trajectory control and optimization for complex wellbore designs." },
    { title: "MWD/LWD", icon: Cable, desc: "Real-time measurement and logging systems for sub-surface data accuracy." },
    { title: "Coring", icon: Layers, desc: "High-recovery core sampling and analysis for strategic geological insight." },
    { title: "Drilling Mud Services", icon: Waves, desc: "Optimized fluid systems engineering for 100% wellbore stability." }
];

export default function ServicesCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-[var(--space-24)] bg-[var(--neutral-50)] overflow-hidden">
            <div className="max-w-7xl mx-auto px-[var(--space-8)]">

                <div className="flex items-center justify-between mb-[var(--space-12)]">
                    <div className="space-y-[var(--space-2)]">
                        <div className="flex items-center space-x-[var(--space-3)]">
                            <div className="w-[var(--space-10)] h-[2px] bg-[var(--signal-red-500)]" />
                            <span className="text-tech-label text-[var(--signal-red-500)] tracking-[0.3em]">Operational Expertise</span>
                        </div>
                        <h2 className="text-display-md font-display font-[800] text-[var(--carbon-black)] uppercase tracking-tighter leading-none">Primary Services</h2>
                    </div>

                    <div className="flex gap-[var(--space-4)]">
                        <button
                            onClick={() => scroll('left')}
                            className="p-5 rounded-full bg-white shadow-sm border border-[var(--neutral-100)] hover:bg-[var(--signal-red-500)] hover:text-white transition-all active:scale-90"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-5 rounded-full bg-white shadow-sm border border-[var(--neutral-100)] hover:bg-[var(--signal-red-500)] hover:text-white transition-all active:scale-90"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-[var(--space-8)] overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-[var(--space-10)]"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="min-w-[320px] md:min-w-[450px] snap-center bg-white p-[var(--space-12)] rounded-[var(--radius-hud)] shadow-sm border border-[var(--neutral-100)] hover:border-[var(--tech-cyan-500)]/30 hover:shadow-xl transition-all group card"
                        >
                            <div className="w-20 h-20 bg-[var(--tech-cyan-500)]/5 text-[var(--tech-cyan-500)] rounded-2xl flex items-center justify-center mb-[var(--space-10)] group-hover:bg-[var(--tech-cyan-500)] group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                                <service.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-h3 font-display font-[800] text-[var(--carbon-black)] uppercase mb-[var(--space-4)] tracking-tighter leading-tight">{service.title}</h3>
                            <p className="text-[17px] text-[var(--neutral-600)] font-medium leading-relaxed">{service.desc}</p>

                            <div className="mt-[var(--space-10)] flex items-center space-x-2 text-tech-label text-[var(--tech-cyan-500)] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                                <span>Learn More</span>
                                <ChevronRight size={14} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
