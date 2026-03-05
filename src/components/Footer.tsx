"use client";

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ShieldCheck } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative w-full bg-[#111827] text-white py-24 border-t-8 border-[#EE3124] overflow-hidden">
            {/* Liquid Glass Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#EE3124]/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
                <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#0099CC]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">

                    {/* Column 1: Company Address */}
                    <div className="space-y-8">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-[2px] bg-[#EE3124]" />
                            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-[#EE3124]">Company Address</h3>
                        </div>
                        <div className="flex items-start space-x-4 group">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#EE3124]/10 group-hover:border-[#EE3124]/20 transition-all">
                                <MapPin className="w-6 h-6 text-[#EE3124]" />
                            </div>
                            <p className="text-slate-400 font-bold leading-relaxed text-sm">
                                Unit No: I5-PF-97, Detached Retail I5,<br />
                                Plot No: JLT-PH1-RET-I5, Gold Tower,<br />
                                Cluster I, Jumeirah Lakes Towers,<br />
                                Dubai - UAE.
                            </p>
                        </div>
                        <div className="pt-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 block mb-2">Registration</span>
                            <span className="text-[11px] font-black text-white bg-white/5 px-4 py-2 rounded-lg border border-white/10">DMCC-654871</span>
                        </div>
                    </div>

                    {/* Column 2: Direct Contacts */}
                    <div className="space-y-8">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-[2px] bg-[#0099CC]" />
                            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-[#0099CC]">Direct Contacts</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-4 group">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#0099CC]/10 group-hover:border-[#0099CC]/20 transition-all">
                                        <Phone className="w-5 h-5 text-[#0099CC]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Office Line</span>
                                        <p className="text-white font-black">+971 4 266 5748</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 group">
                                    <a href="https://wa.me/971502580299" target="_blank" className="flex items-center space-x-4 group">
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#0099CC]/10 group-hover:border-[#0099CC]/20 transition-all">
                                            <Phone className="w-5 h-5 text-[#0099CC]" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Mobile / WhatsApp</span>
                                            <p className="text-white font-black hover:text-[#0099CC] transition-colors">+971 50 258 0299</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-4 pt-4 border-t border-white/5">
                                <div className="flex items-center space-x-4 group">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#EE3124]/10 transition-all">
                                        <Mail className="w-5 h-5 text-[#EE3124]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <Link href="mailto:uma@sigmadxb.com" className="text-white font-black hover:text-[#EE3124] transition-colors text-[11px] tracking-widest leading-none mb-1">uma@sigmadxb.com</Link>
                                        <Link href="mailto:tangirala@sigmadxb.com" className="text-slate-400 font-bold hover:text-[#EE3124] transition-colors text-[11px] tracking-widest leading-none">tangirala@sigmadxb.com</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Follow Us */}
                    <div className="space-y-8">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-[2px] bg-[#FFCC00]" />
                            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-[#FFCC00]">Follow Us</h3>
                        </div>
                        <p className="text-slate-400 font-bold leading-relaxed text-sm">
                            Connect with our global network for real-time asset updates and industry-leading procurement insights.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="#" className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-[#EE3124] hover:text-white transition-all group">
                                <Facebook size={18} className="text-[#EE3124] group-hover:text-white" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">Facebook</span>
                            </Link>
                            <Link href="#" className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-[#EE3124] hover:text-white transition-all group">
                                <Linkedin size={18} className="text-[#EE3124] group-hover:text-white" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">LinkedIn</span>
                            </Link>
                            <Link href="#" className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-[#EE3124] hover:text-white transition-all group">
                                <Twitter size={18} className="text-[#EE3124] group-hover:text-white" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">Twitter</span>
                            </Link>
                            <Link href="#" className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-[#EE3124] hover:text-white transition-all group">
                                <Instagram size={18} className="text-[#EE3124] group-hover:text-white" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">Instagram</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Sub Footer */}
                <div className="border-t border-white/5 pt-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <ShieldCheck size={16} className="text-[#EE3124]" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">API Certified Standards</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-[#0099CC] rounded-full animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Global Sourcing Network</span>
                            </div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
                            © 2026 SIGMA OILFIELD & INDUSTRIAL SUPPLY DMCC
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
