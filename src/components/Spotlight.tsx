"use client";

import React, { useRef, useEffect } from 'react';

interface SpotlightProps {
    children?: React.ReactNode;
    className?: string;
}

export default function Spotlight({ children, className = "" }: SpotlightProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={`spotlight-enabled ${className}`}
        >
            <div className="spotlight-layer" />
            {children}
        </div>
    );
}
