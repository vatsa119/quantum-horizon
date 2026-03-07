"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
    const [shouldShow, setShouldShow] = useState(false);
    const { scrollYProgress } = useScroll();

    // Smooth spring for the bar width
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const checkHeight = () => {
            const pageHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            // Only show if page is at least 1.5x the viewport height
            setShouldShow(pageHeight > viewportHeight * 1.5);
        };

        // Initial check
        checkHeight();

        // Check on resize
        window.addEventListener('resize', checkHeight);

        // Check when content changes (useful for Next.js dynamic pages)
        const observer = new MutationObserver(checkHeight);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('resize', checkHeight);
            observer.disconnect();
        };
    }, []);

    if (!shouldShow) return null;

    return (
        <div className="scroll-progress" aria-hidden="true">
            <motion.div
                className="scroll-progress-bar"
                style={{ scaleX }}
            />
        </div>
    );
}
