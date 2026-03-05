"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function RequestQuoteTab() {
    const { scrollYProgress } = useScroll();
    const [isVisible, setIsVisible] = useState(true);

    // Pinch and expand logic: as user scrolls (0 to 1), scale and change width subtly
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
    const width = useTransform(scrollYProgress, [0, 0.5, 1], ["4rem", "5rem", "4rem"]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If footer is visible, hide the tab
                setIsVisible(!entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        // Target the footer by tag or ID
        const footer = document.querySelector('footer');
        if (footer) observer.observe(footer);

        return () => observer.disconnect();
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    exit={{ x: 100 }}
                    style={{ scale, width }}
                    className="fixed right-0 top-1/2 -translate-y-1/2 z-[2000] hidden md:flex items-center justify-center bg-[#EE3124] h-64 origin-right shadow-2xl"
                >
                    <Link
                        href="/contact"
                        className="w-full h-full flex items-center justify-center group"
                    >
                        <span className="text-white font-mono text-sm font-black uppercase tracking-[0.5em] whitespace-nowrap -rotate-90 select-none transition-all group-hover:tracking-[0.6em]">
                            REQUEST QUOTE
                        </span>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
