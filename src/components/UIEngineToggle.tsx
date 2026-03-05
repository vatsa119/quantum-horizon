"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutPanelLeft } from 'lucide-react';

interface UIEngineToggleProps {
    mode: 'NITRO' | 'WALLET';
    setMode: (mode: 'NITRO' | 'WALLET') => void;
}

export default function UIEngineToggle({ mode, setMode }: UIEngineToggleProps) {
    return (
        <div className="fixed bottom-12 left-12 z-[2000] flex items-center bg-black/80 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-3xl">
            <div className="px-4 py-2 border-r border-white/10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">UI ENGINE</span>
            </div>
            <div className="flex p-1">
                <button
                    onClick={() => setMode('NITRO')}
                    className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${mode === 'NITRO'
                        ? 'bg-[#EE3124] text-white shadow-lg shadow-[#EE3124]/30'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <ZapataIcon size={16} className={mode === 'NITRO' ? 'animate-pulse' : ''} />
                    <span className="text-[11px] font-black uppercase tracking-widest">NITRO</span>
                </button>
                <button
                    onClick={() => setMode('WALLET')}
                    className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${mode === 'WALLET'
                        ? 'bg-[#0099CC] text-white shadow-lg shadow-[#0099CC]/30'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <LayoutPanelLeft size={16} />
                    <span className="text-[11px] font-black uppercase tracking-widest">WALLET</span>
                </button>
            </div>
        </div>
    );
}

// Simple Icon fallback since Zapata might not be in the lucide version
function ZapataIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m13 2-2 2.5h3L12 11l7-4.5H16L18 21l-7-11h3l-1-8Z" />
        </svg>
    );
}
