"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Package, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: string;
    title: string;
    desc: string;
    api: string;
    image: string;
    sector?: string;
    model?: string;
}

interface ProductQuickViewProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
    // Disable body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // ESC key listener
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* OVERLAY */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="modal-overlay"
                    />

                    {/* MODAL CONTAINER */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="modal-container"
                    >
                        <div className="modal-handle" />

                        <div className="modal-header">
                            <h3 className="modal-title font-display">{product.title}</h3>
                            <button onClick={onClose} className="modal-close" aria-label="Close modal">
                                <X size={24} className="text-[var(--carbon-black)]" />
                            </button>
                        </div>

                        <div className="modal-body custom-scrollbar">
                            <div className="modal-grid">
                                {/* LEFT: IMAGE PREVIEW */}
                                <div className="modal-image-container group">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--carbon-black)]/40 to-transparent" />
                                    <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                                        <div className="px-3 py-1 bg-[var(--signal-red-500)] text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                                            {product.api}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT: DETAILS & ACTION */}
                                <div className="modal-details">
                                    <div className="modal-sector">
                                        {product.sector || "SECTOR 01: DRILLING & INFRASTRUCTURE"}
                                    </div>

                                    <div className="modal-specs">
                                        <div className="spec-item">
                                            <span className="spec-label">Part Number</span>
                                            <span className="spec-value">SI-{product.id.toUpperCase()}-026</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Certification</span>
                                            <span className="spec-value">{product.api}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Integrity Status</span>
                                            <span className="spec-value">Verified Nominal</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Availability</span>
                                            <span className="spec-value">JLT / Dubai Hub</span>
                                        </div>
                                    </div>

                                    <div className="modal-description">
                                        <p>{product.desc} Engineered for high-stakes operational stability and certified to the highest industrial standards for performance in complex wellbore environments.</p>
                                    </div>

                                    {/* QUICK QUOTE FORM */}
                                    <form className="modal-quote-form" onSubmit={(e) => { e.preventDefault(); alert("Quote Request Transmitted."); onClose(); }}>
                                        <div className="flex items-center space-x-2 mb-6">
                                            <ShieldCheck size={18} className="text-[var(--signal-red-500)]" />
                                            <span className="text-tech-label text-[var(--neutral-400)] uppercase tracking-widest">Secure Technical Request</span>
                                        </div>

                                        <div className="form-row">
                                            <input type="text" placeholder="Executive Name" required className="form-input" />
                                            <input type="email" placeholder="Corporate Email" required className="form-input" />
                                        </div>
                                        <textarea placeholder="Specific technical requirements or quantity index..." className="form-textarea" required></textarea>

                                        <button type="submit" className="w-full py-4 bg-[var(--carbon-black)] text-white font-[900] uppercase tracking-[0.2em] text-[12px] rounded-xl hover:bg-[var(--signal-red-500)] transition-all flex items-center justify-center group shadow-xl hover:shadow-[var(--signal-red-500)]/20 spring-scale">
                                            Transmit Quotation Request
                                            <ArrowRight size={18} className="ml-3 transition-transform group-hover:translate-x-2" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
