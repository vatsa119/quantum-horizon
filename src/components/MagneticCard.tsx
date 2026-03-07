"use client";

import React, { useRef, useState, useEffect } from 'react';

interface MagneticCardProps {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number;
}

export default function MagneticCard({
    children,
    className = '',
    maxTilt = 8
}: MagneticCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        // Update CSS variables for the glow effect
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`);
    };

    const handleMouseLeave = () => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
    };

    return (
        <div
            ref={cardRef}
            data-magnetic
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform }}
            className={`group ${className}`}
        >
            <div className="magnetic-glow" />
            <div className="relative z-[2] h-full">
                {children}
            </div>
        </div>
    );
}
