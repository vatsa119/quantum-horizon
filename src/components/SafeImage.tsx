"use client";

import React, { useState, useEffect } from 'react';
import NextImage, { ImageProps } from 'next/image';
import { Box } from 'lucide-react';
import Skeleton from './Skeleton';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
    fallbackTitle?: string;
    showSkeleton?: boolean;
}

export default function SafeImage({
    src,
    alt,
    fallbackTitle,
    className,
    showSkeleton = true,
    ...props
}: SafeImageProps) {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    if (error || !src) {
        return (
            <div
                className={`w-full h-full flex flex-col items-center justify-center bg-[var(--neutral-100)] border border-[var(--neutral-200)] p-6 text-center ${className}`}
            >
                <Box className="w-12 h-12 text-[var(--neutral-400)] mb-3" />
                <span className="text-[var(--neutral-600)] text-[10px] font-black uppercase tracking-widest leading-tight">
                    {fallbackTitle || alt || 'Equipment Asset'}
                </span>
                <div className="mt-2 text-[var(--signal-red-400)] text-[8px] font-black uppercase tracking-tighter opacity-50">
                    Source Scan Failed
                </div>
            </div>
        );
    }

    return (
        <div className={`relative w-full h-full ${className}`}>
            {isLoading && showSkeleton && (
                <Skeleton
                    variant="image"
                    className="absolute inset-0 z-10"
                />
            )}
            <NextImage
                src={src}
                alt={alt}
                className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setError(true);
                    setIsLoading(false);
                }}
                {...props}
            />
        </div>
    );
}
