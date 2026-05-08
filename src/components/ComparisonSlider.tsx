"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ComparisonSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    className?: string;
}

export default function ComparisonSlider({
    beforeImage,
    afterImage,
    beforeLabel = "Before",
    afterLabel = "After",
    className = ""
}: ComparisonSliderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(50); // percentage
    const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });

    // Transform the motion value to a percentage string for CSS
    const widthPercentage = useTransform(smoothX, (v) => `${v}%`);
    const leftPercentage = useTransform(smoothX, (v) => `${v}%`);

    const [isDragging, setIsDragging] = useState(false);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
        mouseX.set(pos);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        handleMove(e.clientX);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) handleMove(e.clientX);
        };

        const handleTouchMove = (e: Event) => {
            if (isDragging) {
                const touchEvent = e as TouchEvent;
                handleMove(touchEvent.touches[0].clientX);
            }
        };

        const handleEnd = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging]);

    return (
        <div className={`comparison-slider group ${className}`}>
            <div
                ref={containerRef}
                className="comparison-container"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                {/* AFTER IMAGE (Bottom) */}
                <div className="relative aspect-video w-full">
                    <Image
                        src={afterImage}
                        alt="After Refurbishment"
                        fill
                        className="object-cover pointer-events-none"
                    />
                </div>

                {/* BEFORE IMAGE (Top Clipped) */}
                <motion.div
                    className="comparison-before-wrapper"
                    style={{ width: widthPercentage }}
                >
                    <div className="relative aspect-video w-full h-full">
                        <Image
                            src={beforeImage}
                            alt="Before Refurbishment"
                            fill
                            className="object-cover pointer-events-none"
                            style={{ minWidth: containerRef.current?.offsetWidth || '1000px' }}
                        />
                    </div>
                </motion.div>

                {/* HANDLE */}
                <motion.div
                    className="comparison-handle"
                    style={{ left: leftPercentage }}
                >
                    <div className="comparison-handle-line" />
                    <div className="comparison-handle-circle">
                        <svg className="comparison-arrows" viewBox="0 0 24 24">
                            <path d="M8 5l-5 7 5 7M16 5l5 7-5 7" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                    <div className="comparison-handle-line" />
                </motion.div>
            </div>

            <div className="comparison-labels">
                <span className="comparison-label comparison-label--before">{beforeLabel}</span>
                <span className="comparison-label comparison-label--after">{afterLabel}</span>
            </div>
        </div>
    );
}
