"use client";

import React, { useState, useEffect, useRef } from 'react';

interface StatCounterProps {
    target: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    duration?: number;
    className?: string;
}

export default function StatCounter({
    target,
    suffix = '',
    prefix = '',
    decimals = 0,
    duration = 2000,
    className = ''
}: StatCounterProps) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    setIsVisible(true);
                    hasAnimated.current = true;
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Ease-out cubic formula: 1 - Math.pow(1 - progress, 3)
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const currentCount = easedProgress * target;
            setCount(currentCount);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [isVisible, target, duration]);

    return (
        <span
            ref={elementRef}
            className={`stat-number ${className}`}
            data-counter
            data-target={target}
            data-suffix={suffix}
            data-prefix={prefix}
            data-decimals={decimals}
        >
            {prefix}
            {count.toFixed(decimals)}
            {suffix && <span className="suffix">{suffix}</span>}
        </span>
    );
}
