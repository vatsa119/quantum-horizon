"use client";

import React from 'react';
import Image from 'next/image';

const CLIENT_LOGOS = [
    { src: "/assets/partners/ongc.png", alt: "ONGC" },
    { src: "/assets/partners/oil_india.png", alt: "Oil India Limited" },
    { src: "/assets/partners/shivganga.png", alt: "Shivganga" },
    { src: "/assets/partners/gnrl.png", alt: "Gujarat Natural Resources Limited" },
    { src: "/assets/partners/sun_petro.png", alt: "Sun Petro" },
];

export default function LogoMarquee() {
    // Triple the logos to ensure the track is long enough and scrolls seamlessly
    const doubledLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

    return (
        <div className="marquee-wrapper border-y border-slate-100 bg-white/50 backdrop-blur-sm">
            <div className="marquee-track">
                {doubledLogos.map((logo, index) => (
                    <div key={`${logo.alt}-${index}`} className="flex items-center justify-center min-w-[200px]">
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={160}
                            height={60}
                            className="marquee-logo"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
