"use client";

import React from 'react';

interface SkeletonProps {
    variant?: 'image' | 'card' | 'avatar' | 'text' | 'title';
    width?: string | number;
    height?: string | number;
    className?: string;
    circle?: boolean;
}

export default function Skeleton({
    variant = 'text',
    width,
    height,
    className = '',
    circle = false
}: SkeletonProps) {

    const baseClasses = "skeleton transition-opacity duration-300";

    const getVariantClasses = () => {
        switch (variant) {
            case 'image':
                return "w-full aspect-square rounded-[var(--radius-lg)]";
            case 'card':
                return "w-full p-6 rounded-[var(--radius-xl)] bg-white border border-[var(--neutral-100)]";
            case 'avatar':
                return `rounded-full ${circle ? 'aspect-square' : ''}`;
            case 'title':
                return "h-6 w-3/4 mb-4 rounded-[var(--radius-sm)]";
            case 'text':
                return "h-4 rounded-[var(--radius-sm)] mb-2";
            default:
                return "";
        }
    };

    if (variant === 'card') {
        return (
            <div className={`${getVariantClasses()} ${className}`}>
                <div className="skeleton w-full aspect-video rounded-[var(--radius-lg)] mb-6" />
                <div className="skeleton h-6 w-3/4 mb-4 rounded-[var(--radius-sm)]" />
                <div className="skeleton h-4 w-full mb-2 rounded-[var(--radius-sm)]" />
                <div className="skeleton h-4 w-full mb-2 rounded-[var(--radius-sm)]" />
                <div className="skeleton h-4 w-3/5 rounded-[var(--radius-sm)]" />
            </div>
        );
    }

    const style: React.CSSProperties = {
        width: width,
        height: height,
    };

    return (
        <div
            className={`${baseClasses} ${getVariantClasses()} ${className}`}
            style={style}
        />
    );
}
