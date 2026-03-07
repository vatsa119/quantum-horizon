"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SmartStickyCTA() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Rule 4: Completely hidden on contact page
        if (pathname === '/contact') {
            setIsVisible(false);
            return;
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Rule 1: Hidden in hero section (bottom 80% of viewport)
            const heroThreshold = viewportHeight * 0.8;

            // Rule 3: Hidden when within 200px of the footer
            const footerThreshold = documentHeight - viewportHeight - 200;

            const shouldBeVisible = scrollY > heroThreshold && scrollY < footerThreshold;

            setIsVisible(shouldBeVisible);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, x: '-50%', opacity: 0 }}
                    animate={{ y: 0, x: '-50%', opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{
                        duration: 0.4,
                        ease: [0.34, 1.56, 0.64, 1] // Rule 5: Spring easing
                    }}
                    className="fixed bottom-8 left-1/2 z-[999]"
                >
                    <Link href="/contact" className="block">
                        <motion.button
                            whileHover={{
                                scale: 1.02,
                                boxShadow: '0 8px 32px rgba(220, 38, 38, 0.4)'
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-[var(--gradient-cta)] text-white px-8 py-4 rounded-[var(--radius-full)] flex items-center space-x-3 shadow-[0_4px_20px_rgba(220,38,38,0.3)] transition-all duration-300"
                            style={{
                                background: 'linear-gradient(135deg, #dc2626 0%, #ff6b5a 100%)'
                            }}
                        >
                            <span className="text-sm font-semibold tracking-[0.02em] font-sans">
                                GET A QUOTE
                            </span>
                            <ArrowRight size={18} className="translate-y-[0.5px]" />
                        </motion.button>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
