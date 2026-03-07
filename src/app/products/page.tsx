"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ShieldCheck, Activity, Award, ArrowUpRight } from 'lucide-react';
import StatCounter from '@/components/StatCounter';
import SafeImage from '@/components/SafeImage';
import MagneticCard from '@/components/MagneticCard';
import Spotlight from '@/components/Spotlight';
import ProductQuickView from '@/components/ProductQuickView';

interface Product {
    id: string;
    title: string;
    desc: string;
    api: string;
    image: string;
    sector?: string;
}

const productSectors = [
    {
        id: "sector-1",
        title: "SECTOR 01: DRILLING & HEAVY MACHINERY",
        products: [
            { id: "mud-pumps", title: "Mud Pumps (500-2200 HP)", desc: "Horizontal Triplex single-action piston pump, forged steel fluid end.", api: "API Spec 7K", image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=2070" },
            { id: "land-rigs", title: "Land Drilling Rigs", desc: "1500HP Sub-structure and mast, newly refurbished technical specs.", api: "API 4F", image: "https://images.unsplash.com/photo-1544161515-4af6b1d8d16e?auto=format&fit=crop&q=80&w=2070" },
            { id: "top-drive", title: "Top Drive & Spares", desc: "Electric system with detailed gearbox and dynamic braking.", api: "API 8C", image: "https://images.unsplash.com/photo-1502224562085-639556652f44?auto=format&fit=crop&q=80&w=2070" },
            { id: "bops", title: "BOPs & Spares", desc: "13-5/8\" 10M Annular BOP, internal sealing element and pistons.", api: "API 16A", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587db0?auto=format&fit=crop&q=80&w=2070" },
        ]
    },
    {
        id: "sector-2",
        title: "SECTOR 02: TUBULARS & ACCESSORIES",
        products: [
            { id: "casing", title: "Casing", desc: "API Casing Schedule, Extreme Line threaded and coupled connect.", api: "API 5CT", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=2070" },
            { id: "drill-pipe", title: "Drill Pipe", desc: "API Drill Pipe tool joint, detailed thread geometry, 5DP color-code.", api: "API 5DP", image: "https://images.unsplash.com/photo-1504917595217-d4dc5f64977b?auto=format&fit=crop&q=80&w=2070" },
            { id: "tubing", title: "Tubing", api: "API 5CT", desc: "8-RD non-upset connections, full API specification compliance.", image: "https://images.unsplash.com/photo-1541888941259-773a941da793?auto=format&fit=crop&q=80&w=2070" },
        ]
    }
];

function AssetCard({ product, onOpen, sectorTitle }: { product: Product, onOpen: (p: Product, s: string) => void, sectorTitle: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white border border-[var(--neutral-100)] rounded-xl overflow-hidden shadow-sm card-spring cursor-pointer"
            onClick={() => onOpen(product, sectorTitle)}
        >
            <div className="aspect-[4/3] relative overflow-hidden bg-[var(--neutral-50)]">
                <SafeImage
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-50"
                />

                {/* Tech Overlay */}
                <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-[var(--space-8)]">
                    <div className="space-y-[var(--space-4)] text-center">
                        <span className="inline-flex px-3 py-1 bg-[var(--signal-red-500)] text-white text-[10px] font-bold rounded-full">{product.api}</span>
                        <p className="text-white text-sm font-medium leading-relaxed max-w-[240px]">
                            {product.desc}
                        </p>
                    </div>
                    <button className="mt-[var(--space-8)] px-6 py-3 bg-white text-[var(--carbon-black)] text-tech-label rounded-lg hover:bg-[var(--signal-red-500)] hover:text-white transition-all">
                        Request Payload Spec
                    </button>
                </div>
            </div>

            <div className="p-[var(--space-6)] flex justify-between items-center group-hover:bg-[var(--carbon-black)] transition-colors duration-500">
                <div className="space-y-1">
                    <h3 className="text-body-md font-[700] text-[var(--carbon-black)] group-hover:text-white transition-colors">{product.title}</h3>
                    <div className="flex items-center space-x-2 text-[var(--neutral-400)] text-[11px] font-bold uppercase tracking-widest">
                        <Activity size={12} className="text-[var(--signal-red-500)]" />
                        <span>Ready For Dispatch</span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-[var(--neutral-100)] flex items-center justify-center group-hover:bg-[var(--signal-red-500)] group-hover:border-[var(--signal-red-500)] transition-all">
                    <ArrowUpRight size={18} className="text-[var(--neutral-400)] group-hover:text-white" />
                </div>
            </div>
        </motion.div>
    );
}

export default function ProductsPage() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (product: Product, sector: string) => {
        setSelectedProduct({ ...product, sector });
        setIsModalOpen(true);
    };

    return (
        <main className="bg-white min-h-screen relative">
            <Navbar />

            <div className="relative z-10 pt-[var(--space-48)] px-[var(--space-8)] lg:px-[var(--space-24)]">
                {/* EXECUTIVE REGISTRY HEADER */}
                <div className="max-w-[1440px] mx-auto mb-[var(--space-32)] border-b border-[var(--neutral-100)] pb-[var(--space-24)]">
                    <div className="flex items-center space-x-[var(--space-3)] mb-[var(--space-10)]">
                        <div className="w-[var(--space-12)] h-[2px] bg-[var(--signal-red-500)]" />
                        <span className="text-tech-label text-[var(--neutral-400)]">Industrial Asset Registry V2</span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-[var(--space-12)]">
                        <div>
                            <h1 className="text-display-lg lg:text-[10rem] font-display font-[800] text-[var(--carbon-black)] uppercase tracking-[0.1em] leading-[0.85]">
                                ASSET<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--signal-red-500)] to-[var(--neutral-400)] italic">PRECISION</span>
                            </h1>
                        </div>

                        <div className="max-w-md space-y-[var(--space-8)]">
                            <p className="text-h4 text-[var(--neutral-400)] font-bold uppercase tracking-widest leading-relaxed">
                                Orchestrating 100% operational stability across <span className="text-[var(--signal-red-500)]">42+</span> mission-critical infrastructure sectors.
                            </p>
                            <div className="flex items-center space-x-[var(--space-3)] text-[var(--signal-red-500)] pb-4">
                                <ShieldCheck size={24} />
                                <span className="text-tech-label tracking-[0.2em]">API GLOBAL ACCREDITATION ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTOR LISTING */}
                <div className="max-w-[1440px] mx-auto pb-[var(--space-48)]">
                    {productSectors.map((sector) => (
                        <div key={sector.id} className="mb-[var(--space-32)]">
                            <div className="flex items-center space-x-[var(--space-4)] mb-[var(--space-16)]">
                                <div className="h-[var(--space-12)] w-[var(--space-2)] bg-[var(--signal-red-500)]" />
                                <h2 className="text-display-md font-display font-[800] text-[var(--carbon-black)] uppercase tracking-tighter">
                                    {sector.title}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[var(--space-8)]">
                                {sector.products.map(product => (
                                    <AssetCard
                                        key={product.id}
                                        product={product}
                                        onOpen={handleOpenModal}
                                        sectorTitle={sector.title}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />

            <ProductQuickView
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </main>
    );
}
