"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FloatingIslandCTA() {
    const pathname = usePathname();

    // Hide on contact page
    if (pathname === '/contact') return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, x: '-50%', opacity: 0 }}
                animate={{ y: 0, x: '-50%', opacity: 1 }}
                transition={{ duration: 0.8, ease: "circOut", delay: 1 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[2000] hidden md:block"
            >
                <Link href="/contact" className="block outline-none">
                    <div className="bg-[#EE3124] backdrop-blur-3xl border border-white/20 rounded-full px-10 py-5 flex items-center space-x-6 shadow-[0_0_30px_rgba(238,49,36,0.3)] hover:bg-[#EE3124]/90 hover:scale-[1.02] transition-all group">
                        <span className="text-white font-serif italic text-lg tracking-widest leading-none">
                            GET A <span className="font-sans font-black not-italic text-white underline decoration-white/30 underline-offset-8">QUOTE</span>
                        </span>
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <ArrowRight size={20} className="text-[#EE3124] group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>
            </motion.div>
        </AnimatePresence>
    );
}
