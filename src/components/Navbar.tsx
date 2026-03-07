"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Phone,
    Mail,
    ArrowRight
} from 'lucide-react';

export default function Navbar({ isDark = false }: { isDark?: boolean }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const mainNavItems = [
        { label: 'HOME', href: '/' },
        { label: 'PRODUCTS', href: '/products' },
        { label: 'OUR CLIENTS', href: '/clients' },
        { label: 'ABOUT US', href: '/profile' },
        { label: 'CONTACT US', href: '/contact' },
    ];

    return (
        <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${isDark ? 'header--dark' : ''}`}>
            {/* Top Tier: Utility Row */}
            <div className="hidden md:block w-full border-b border-white/5 py-[var(--space-2)]">
                <div className="max-w-7xl mx-auto px-[var(--space-8)] flex justify-end items-center space-x-[var(--space-6)]">
                    <div className="flex items-center space-x-[var(--space-6)]">
                        <div className="flex items-center space-x-[var(--space-2)] group cursor-default">
                            <Phone className="w-3.5 h-3.5 text-[var(--signal-red-500)]" />
                            <span className="text-tech-label text-white/60 group-hover:text-white transition-colors">
                                Direct Line: +971 4 266 5748
                            </span>
                        </div>
                        <div className="h-3 w-[1px] bg-white/10" />
                        <div className="flex items-center space-x-[var(--space-2)] group cursor-pointer">
                            <Mail className="w-3.5 h-3.5 text-[var(--signal-red-500)]" />
                            <span className="text-tech-label !lowercase text-white/60 group-hover:text-white transition-colors">
                                uma@sigmadxb.com
                            </span>
                        </div>
                    </div>
                    <div className="h-3 w-[1px] bg-white/10" />
                    <div className="flex items-center space-x-[var(--space-4)]">
                        {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                            <Link key={idx} href="#" className="text-white/40 hover:text-[var(--signal-red-500)] transition-all transform hover:scale-110">
                                <Icon size={14} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Tier: Navigation Row */}
            <div className="w-full py-[var(--space-4)] transition-all duration-[var(--transition-base)]">
                <div className="max-w-7xl mx-auto px-[var(--space-8)] flex justify-between items-center">

                    {/* Left: Branding Hub */}
                    <Link href="/" className="flex items-center group relative z-50">
                        <div className="relative w-10 h-10 shrink-0">
                            <Image
                                src="/sigma.png"
                                alt="Sigma Logo"
                                fill
                                className="object-contain filter brightness-110"
                                priority
                            />
                        </div>
                        <div className="ml-[var(--space-4)] flex flex-col">
                            <span className="text-[14px] font-[800] uppercase tracking-[0.05em] font-display branding-text mb-[-4px]">
                                SIGMA OILFIELD
                            </span>
                            <span className="text-[10px] font-[500] uppercase tracking-[0.2em] text-white/40 branding-text opacity-60">
                                & Industrial Supply DMCC
                            </span>
                        </div>
                    </Link>

                    {/* Center: Navigation */}
                    <nav className="hidden lg:flex items-center space-x-[var(--space-8)]">
                        {mainNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-[12px] font-[700] uppercase tracking-[0.15em] nav-link relative group ${isActive ? 'text-[var(--signal-red-500)]' : ''}`}
                                >
                                    {item.label}
                                    <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--signal-red-500)] transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : ''}`} />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right: Technical CTA */}
                    <div className="flex items-center space-x-[var(--space-6)]">
                        <Link
                            href="/contact"
                            className="nav-cta-beam text-white px-[var(--space-8)] py-[var(--space-3)] text-[13px] font-bold uppercase tracking-[0.05em] group transition-all rounded-full overflow-hidden spring-scale"
                        >
                            <span className="relative z-10 flex items-center">
                                Request Quote
                                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </div>

                </div>
            </div>
        </header>
    );
}
