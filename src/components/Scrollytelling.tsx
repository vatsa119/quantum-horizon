"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

interface ParallaxProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}

export const ParallaxBackground = ({ children, speed = 0.2, className = "" }: ParallaxProps) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
    const springY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <div ref={ref} className={`parallax-container w-full h-full overflow-hidden relative ${className}`}>
            <motion.div style={{ y: springY }} className="parallax-bg absolute inset-0 w-full h-[120%] -top-[10%]">
                {children}
            </motion.div>
        </div>
    );
};

interface ScrollySectionProps {
    id?: string;
    children: React.ReactNode;
    className?: string;
    amount?: number;
}

export const ScrollySection = ({ id, children, className = "", amount = 0.2 }: ScrollySectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount });

    return (
        <section
            id={id}
            ref={ref}
            className={`${className} transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ scrollMarginTop: '100px' }}
        >
            {children}
        </section>
    );
};

export const RevealItem = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
