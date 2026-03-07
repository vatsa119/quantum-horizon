"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface StaggeredGridProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    stagger?: number;
    once?: boolean;
}

const containerVariants = (stagger: number) => ({
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: stagger,
        }
    }
});

export const staggerItemVariants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1] as any
        }
    }
};

export default function StaggeredGrid({
    children,
    className = "",
    stagger = 0.06,
    once = true
}: StaggeredGridProps) {
    return (
        <motion.div
            variants={containerVariants(stagger)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.1 }}
            className={className}
            data-stagger-grid
            data-stagger-delay={stagger * 1000}
        >
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;

                return (
                    <motion.div variants={staggerItemVariants} data-stagger-item>
                        {child}
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
