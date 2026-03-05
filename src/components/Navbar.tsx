"use client";

import React from 'react';
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

export default function Navbar() {
    const pathname = usePathname();

    const mainNavItems = [
        { label: 'HOME', href: '/' },
        { label: 'PRODUCTS', href: '/products' },
        { label: 'OUR CLIENTS', href: '/clients' },
        { label: 'ABOUT US', href: '/profile' },
        { label: 'CONTACT US', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-[1000] w-full bg-white/95 backdrop-blur-xl shadow-sm">
            {/* 
        Top Tier (Utility Row)
        Executive Right-Aligned Telemetry
      */}
            <div className="hidden md:block w-full border-b border-gray-100 py-2">
                <div className="max-w-7xl mx-auto px-8 flex justify-end items-center space-x-6">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <Phone className="w-3.5 h-3.5 text-[#EE3124] fill-[#EE3124]" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                Direct Line: +971 4 266 5748
                            </span>
                        </div>
                        <div className="h-3 w-[1px] bg-slate-200" />
                        <div className="flex items-center space-x-2">
                            <Mail className="w-3.5 h-3.5 text-[#EE3124]" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                uma@sigmadxb.com
                            </span>
                        </div>
                    </div>
                    <div className="h-3 w-[1px] bg-slate-200" />
                    <div className="flex items-center space-x-3">
                        <Link href="#" className="text-slate-400 hover:text-[#EE3124] transition-colors"><Facebook size={14} /></Link>
                        <Link href="#" className="text-slate-400 hover:text-[#EE3124] transition-colors"><Twitter size={14} /></Link>
                        <Link href="#" className="text-slate-400 hover:text-[#EE3124] transition-colors"><Instagram size={14} /></Link>
                        <Link href="#" className="text-slate-400 hover:text-[#EE3124] transition-colors"><Linkedin size={14} /></Link>
                    </div>
                </div>
            </div>

            {/* 
        Main Tier (Navigation Row)
        Executive Branding & Power CTA
      */}
            <div className="w-full py-4">
                <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">

                    {/* Left: Branding */}
                    <Link href="/" className="flex items-center group">
                        <div className="relative w-10 h-10 shrink-0">
                            <Image
                                src="/sigma.png"
                                alt="Sigma Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="ml-4 text-[14px] font-black text-slate-900 uppercase tracking-tight font-montserrat">
                            SIGMA OILFIELD & INDUSTRIAL SUPPLY DMCC
                        </span>
                    </Link>

                    {/* Center: Navigation (Hidden on small screens) */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {mainNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-[12px] font-black uppercase tracking-[0.15em] transition-colors duration-300 ${isActive ? 'text-[#EE3124]' : 'text-slate-600 hover:text-[#EE3124]'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right: Power CTA */}
                    <Link
                        href="/contact"
                        className="bg-[#EE3124] text-white px-8 py-3 rounded-md text-[11px] font-black uppercase tracking-[0.2em] flex items-center group hover:bg-slate-900 transition-all shadow-lg shadow-[#EE3124]/20"
                    >
                        Get a Quote
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>

                </div>
            </div>
        </header>
    );
}
