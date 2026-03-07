"use client";

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ShieldCheck, Globe } from 'lucide-react';
import Spotlight from '@/components/Spotlight';

export default function Footer() {
    return (
        <Spotlight>
            <footer className="footer-kinetic w-full text-white py-[var(--space-24)] overflow-hidden">
                {/* Cinematic depth layers */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[var(--signal-red-500)] opacity-5 blur-[150px] rounded-full -translate-y-1/2 -translate-x-1/2" />
                    <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[var(--tech-cyan-500)] opacity-5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
                </div>

                <div className="max-w-7xl mx-auto px-[var(--space-8)] relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-16)] mb-[var(--space-24)]">

                        {/* Left: Global HQ */}
                        <div className="space-y-[var(--space-8)]">
                            <div className="flex items-center space-x-[var(--space-3)] mb-[var(--space-6)]">
                                <div className="w-[var(--space-10)] h-[2px] bg-[var(--signal-red-500)]" />
                                <h3 className="text-overline text-[var(--signal-red-500)]">Global Headquarters</h3>
                            </div>
                            <div className="flex items-start space-x-[var(--space-4)] group">
                                <div className="p-[var(--space-4)] bg-white/5 rounded-2xl border border-white/10 group-hover:bg-[var(--signal-red-500)]/10 group-hover:border-[var(--signal-red-500)]/20 transition-all duration-500">
                                    <MapPin className="w-6 h-6 text-[var(--signal-red-500)]" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-white/60 font-medium leading-[1.6] text-[15px]">
                                        Unit No: I5-PF-97, Detached Retail I5,<br />
                                        Gold Tower, Cluster I, JLT,<br />
                                        Dubai - UAE.
                                    </p>
                                    <div className="pt-[var(--space-4)]">
                                        <span className="text-tech-label block mb-2 text-white/30">Registry ID</span>
                                        <span className="inline-flex px-3 py-1 bg-[var(--carbon-900)] border border-white/10 text-tech-label text-[var(--signal-red-500)] rounded-md">DMCC-654871</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Center: Command Centers */}
                        <div className="space-y-[var(--space-8)]">
                            <div className="flex items-center space-x-[var(--space-3)] mb-[var(--space-6)]">
                                <div className="w-[var(--space-10)] h-[2px] bg-[var(--tech-cyan-500)]" />
                                <h3 className="text-overline text-[var(--tech-cyan-500)]">Direct Channels</h3>
                            </div>

                            <div className="space-y-[var(--space-6)]">
                                <div className="space-y-[var(--space-4)]">
                                    <div className="flex items-center space-x-[var(--space-4)] group cursor-pointer">
                                        <div className="p-[var(--space-3)] bg-white/5 rounded-xl border border-white/10 group-hover:bg-[var(--tech-cyan-500)]/20 transition-all">
                                            <Phone className="w-5 h-5 text-[var(--tech-cyan-500)]" />
                                        </div>
                                        <div>
                                            <span className="text-tech-label text-white/30 block mb-1">Office Ops</span>
                                            <p className="text-white font-mono group-hover:text-[var(--tech-cyan-500)] transition-colors">+971 4 266 5748</p>
                                        </div>
                                    </div>

                                    <a href="mailto:uma@sigmadxb.com" className="flex items-center space-x-[var(--space-4)] group">
                                        <div className="p-[var(--space-3)] bg-white/5 rounded-xl border border-white/10 group-hover:bg-[var(--signal-red-500)]/20 transition-all">
                                            <Mail className="w-5 h-5 text-[var(--signal-red-500)]" />
                                        </div>
                                        <div>
                                            <span className="text-tech-label text-white/30 block mb-1">Executive Link</span>
                                            <p className="text-white font-mono lowercase group-hover:text-[var(--signal-red-500)] transition-colors">uma@sigmadxb.com</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right: Global Connectivity */}
                        <div className="space-y-[var(--space-8)]">
                            <div className="flex items-center space-x-[var(--space-3)] mb-[var(--space-6)]">
                                <div className="w-[var(--space-10)] h-[2px] bg-[var(--white)]/20" />
                                <h3 className="text-overline text-white/60">Network Connectivity</h3>
                            </div>
                            <p className="text-white/40 font-medium leading-relaxed text-[14px]">
                                Synchronizing global procurement across three primary energy corridors through certified industrial engineering.
                            </p>
                            <div className="flex gap-[var(--space-3)]">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                                    <Link
                                        key={idx}
                                        href="#"
                                        className="p-[var(--space-4)] bg-white/5 rounded-2xl border border-white/10 hover:bg-[var(--signal-red-500)] hover:border-[var(--signal-red-500)] transition-all group"
                                    >
                                        <Icon size={18} className="text-white/40 group-hover:text-white transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Tier: Legal & Compliance */}
                    <div className="border-t border-white/5 pt-[var(--space-12)]">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-[var(--space-8)]">
                            <div className="flex flex-wrap justify-center items-center gap-[var(--space-8)]">
                                <div className="flex items-center space-x-[var(--space-2)]">
                                    <ShieldCheck size={16} className="text-[var(--signal-red-500)]" />
                                    <span className="text-tech-label text-white/60 tracking-widest">API CERTIFIED SERIES</span>
                                </div>
                                <div className="flex items-center space-x-[var(--space-2)]">
                                    <Globe size={16} className="text-[var(--tech-cyan-500)]" />
                                    <span className="text-tech-label text-white/60 tracking-widest">ISO 9001:2015 ACCREDITED</span>
                                </div>
                            </div>
                            <p className="text-tech-label text-white/20">
                                © {new Date().getFullYear()} SIGMA OILFIELD & INDUSTRIAL SUPPLY DMCC. ALL RIGHTS RESERVED.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </Spotlight>
    );
}
