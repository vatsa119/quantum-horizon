"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ShieldCheck, Activity, Award } from 'lucide-react';

const productSectors = [
    {
        id: "sector-1",
        title: "Sector 01: Drilling & Heavy Machinery",
        products: [
            { id: "mud-pumps", title: "Mud Pumps (500-2200 HP)", desc: "Horizontal Triplex single-action piston pump, forged steel fluid end.", api: "API Spec 7K", image: "/assets/products/mud_pump_triplex.png" },
            { id: "land-rigs", title: "Land Drilling Rigs", desc: "1500HP Sub-structure and mast, newly refurbished technical specs.", api: "API 4F", image: "/assets/products/land_drilling_rig.png" },
            { id: "top-drive", title: "Top Drive & Spares", desc: "Electric system with detailed gearbox and dynamic braking.", api: "API 8C", image: "/assets/products/top_drive.png" },
            { id: "bops", title: "BOPs & Spares", desc: "13-5/8\" 10M Annular BOP, internal sealing element and pistons.", api: "API 16A", image: "/assets/products/annular_bop.png" },
            { id: "pumping-unit", title: "Pumping Unit & Sucker Rod", desc: "Conventional Beam Unit, high-strength rod, motion-optimized.", api: "API 11B", image: "/assets/products/pumping_unit.png" },
        ]
    },
    {
        id: "sector-2",
        title: "Sector 02: Tubulars & Accessories",
        products: [
            { id: "casing", title: "Casing", desc: "API Casing Schedule, Extreme Line threaded and coupled connect.", api: "API 5CT", image: "/assets/products/api_casing.png" },
            { id: "drill-pipe", title: "Drill Pipe", desc: "API Drill Pipe tool joint, detailed thread geometry, 5DP color-code.", api: "API 5DP", image: "/assets/products/drill_pipe_joint.png" },
            { id: "tubing", title: "Tubing", api: "API 5CT", desc: "8-RD non-upset connections, full API specification compliance.", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587db0?auto=format&fit=crop&q=80&w=2070" },
            { id: "hwdp", title: "Heavy Weight Drill Pipe", desc: "Center-upset and extra-long tool joints, carbide hardbanding.", api: "API 7-1", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=2070" },
            { id: "drill-collars", title: "Drill Collars", desc: "Non-Magnetic rendered, clean surface, RP-7G thread protectors.", api: "API RP 7G", image: "https://images.unsplash.com/photo-1504917595217-d4dc5f64977b?auto=format&fit=crop&q=80&w=2070" },
            { id: "tool-joints", title: "Tool Joint Specifications", desc: "Critical tool joint dimensions, thread taper, make-up torque HUD.", api: "API Spec", image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=2070" },
            { id: "tubular-acc", title: "Tubular Accessories", desc: "Pup joints, cross-overs, and stabilizers set against light gray.", api: "API Spec", image: "https://images.unsplash.com/photo-1541888941259-773a941da793?auto=format&fit=crop&q=80&w=2070" },
        ]
    },
    {
        id: "sector-3",
        title: "Sector 03: Drilling & Downhole Tools",
        products: [
            { id: "motors", title: "Downhole Motors", desc: "Cylindrical drilling motor, high-torque power, bearing housing.", api: "API Spec", image: "https://images.unsplash.com/photo-1581092921461-7d1591f860b7?auto=format&fit=crop&q=80&w=2070" },
            { id: "integral-stabs", title: "Integral Blade Stabilizers", desc: "Spiral integral blades with tungsten carbide inserts, high-def.", api: "API 7-1", image: "https://images.unsplash.com/photo-1504917595217-d4dc5f64977b?auto=format&fit=crop&q=80&w=2070" },
            { id: "non-rot-stabs", title: "Non-Rotating Stabilizers", desc: "Smooth non-rotating rub/poly sleeve and steel mandrel.", api: "API 7-1", image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=2070" },
            { id: "sleeve-stabs", title: "Replaceable Sleeve Stabs", desc: "Steel body, macro detail of bolted blade sleeve and carbide.", api: "API 7-1", image: "https://images.unsplash.com/photo-1541888941259-773a941da793?auto=format&fit=crop&q=80&w=2070" },
            { id: "kellys", title: "Rotary Kelly", desc: "Hexagonal forged steel kelly pipe, high-polished finish.", api: "API 7-1", image: "https://images.unsplash.com/photo-1502224562085-639556652f44?auto=format&fit=crop&q=80&w=2070" },
            { id: "kelly-valves", title: "Kelly Valves", desc: "Ball-type safety valve, wrenched flats, internal mechanism.", api: "API 7-1", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=2070" },
            { id: "nm-drill-collars-v2", title: "Non-Magnetic Drill Collars", desc: "Chrome-like finish for directional drilling, studio lit reflections.", api: "API 7-1", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587db0?auto=format&fit=crop&q=80&w=2070" },
        ]
    },
    {
        id: "sector-4",
        title: "Sector 04: Specialized Valves & Subs",
        products: [
            { id: "fos-valve", title: "Full Opening Safety Valve", desc: "Internal bore path, cutaway illustrating sealing mechanism.", api: "API 7-1", image: "https://images.unsplash.com/photo-1541888941259-773a941da793?auto=format&fit=crop&q=80&w=2070" },
            { id: "check-valve-drop", title: "Drop-In Check Valve", desc: "Spring-loaded dart mechanism, API-certified markings.", api: "API Spec", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=2070" },
            { id: "gray-valve", title: "Inside BOP (Gray Valve)", desc: "Gray finish, detailed seat and plunger assembly.", api: "API 7-1", image: "https://images.unsplash.com/photo-1504917595217-d4dc5f64977b?auto=format&fit=crop&q=80&w=2070" },
            { id: "arrow-bpv", title: "Arrow Back Pressure Valve", desc: "Technical illustration highlighting flow direction and sealing.", api: "API 6A", image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=2070" },
            { id: "float-subs-v2", title: "Float Valve Subs", desc: "Cutaway showing plunger-type float valve and spring.", api: "API 7-1", image: "https://images.unsplash.com/photo-1502224562085-639556652f44?auto=format&fit=crop&q=80&w=2070" },
            { id: "bypass-v", title: "By-pass Valve", desc: "Internal flow paths and shifting sleeve for circ control.", api: "API Spec", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587db0?auto=format&fit=crop&q=80&w=2070" },
        ]
    },
    {
        id: "sector-5",
        title: "Sector 05: Drilling Jars & Shock Absorbers",
        products: [
            { id: "ht-jar", title: "High-Temp Hydraulic Jar", desc: "Macro close-up of high-temp seals and fluid dampeners.", api: "API Spec", image: "https://images.unsplash.com/photo-1581092921461-7d1591f860b7?auto=format&fit=crop&q=80&w=2070" },
            { id: "qy-jar", title: "QY Hydraulic Drilling Jar", desc: "Telescopic, industrial chrome finish and stroke indicators.", api: "API Spec", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=2070" },
            { id: "double-acting-jar", title: "QYSZ III Double Acting Jar", desc: "Bi-directional firing mechanism and spring system cutaway.", api: "API Spec", image: "https://images.unsplash.com/photo-1504917595217-d4dc5f64977b?auto=format&fit=crop&q=80&w=2070" },
            { id: "hybrid-jar", title: "JYSZ Mech-Hydraulic Jar", desc: "Hybrid drilling jar with both hydraulic and mech latch.", api: "API Spec", image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=2070" },
            { id: "qjz-mech-jar", title: "QJZ Mechanical Drilling Jar", desc: "Rigid mech latch, high-contrast macro details, all-steel.", api: "API Spec", image: "https://images.unsplash.com/photo-1541888941259-773a941da793?auto=format&fit=crop&q=80&w=2070" },
            { id: "zjs-int", title: "ZJS Jar Intensifier", desc: "Thick-walled steel cylinder and visible connection threads.", api: "API Spec", image: "https://images.unsplash.com/photo-1502224562085-639556652f44?auto=format&fit=crop&q=80&w=2070" },
            { id: "dw-shock-abs", title: "Double-Way Shock Absorbers", desc: "Cutaway highlighting internal spring/fluid dampeners.", api: "API 7-1", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587db0?auto=format&fit=crop&q=80&w=2070" },
            { id: "ow-shock-abs", title: "One-Way Shock Absorbers", desc: "Single-direction vibration dampener, robust construction.", api: "API 7-1", image: "https://images.unsplash.com/photo-1581092921461-7d1591f860b7?auto=format&fit=crop&q=80&w=2070" },
        ]
    },
    {
        id: "sector-6",
        title: "Sector 06: Fishing & Intervention Tools",
        products: [
            { id: "rev-os", title: "Releasable Reversing Overshot", desc: "Internal spiral grapples and release mechanism cutaway.", api: "API Spec", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=2070" },
            { id: "lr-os", title: "Lifting and Releasing Overshot", desc: "Close-up of internal basket grapple and flow ports.", api: "API Spec", image: "https://images.unsplash.com/photo-1504917595217-d4dc5f64977b?auto=format&fit=crop&q=80&w=2070" },
            { id: "rel-spear", title: "Releasing Spears", desc: "Internal spear with hardened steel slips, high-def engagement.", api: "API Spec", image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=2070" },
            { id: "spear-grapple-v2", title: "Segment-Type Spear Grapple", desc: "Segmented steel grapples, heat treatment highlighting macro.", api: "API Spec", image: "https://images.unsplash.com/photo-1541888941259-773a941da793?auto=format&fit=crop&q=80&w=2070" },
            { id: "fish-bump-sub", title: "Fishing Bumper Sub", desc: "Short stroke mechanical sub, isolated studio form shot.", api: "API Spec", image: "https://images.unsplash.com/photo-1502224562085-639556652f44?auto=format&fit=crop&q=80&w=2070" },
            { id: "lub-bump", title: "Lubricated Fishing Bumper Sub", desc: "Sealed lubrication system technical cutaway render.", api: "API Spec", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587db0?auto=format&fit=crop&q=80&w=2070" },
            { id: "junk-b", title: "Reverse Circulation Junk Basket", desc: "Internal 'finger' catchers, debris retrieval macro detail.", api: "API Spec", image: "https://images.unsplash.com/photo-1581092921461-7d1591f860b7?auto=format&fit=crop&q=80&w=2070" },
            { id: "fish-mag", title: "Standard Fishing Magnet", desc: "High-power magnet sub, magnetic field visualization.", api: "API Spec", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=2070" },
            { id: "ditch-mag", title: "Ditch Magnet", desc: "Chip detection and removal for drilling fluid, studio lit.", api: "API Spec", image: "https://images.unsplash.com/photo-1504917595217-d4dc5f64977b?auto=format&fit=crop&q=80&w=2070" },
            { id: "junk-m", title: "Junk Mills & MPD", desc: "Carbide cutting face and Managed Pressure Manifold.", api: "API Spec", image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=2070" },
        ]
    },
];

function AmazonStandardCard({ product }: { product: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden aspect-square cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
        >
            {/* The Amazon Hover Effect */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-10 transition-all duration-500 group-hover:brightness-[.2] group-hover:scale-110"
                />
            </div>

            {/* Tech Specs Reveal (Center) */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 text-center">
                <div className="flex items-center space-x-2 text-[#EE3124] mb-4">
                    <Activity size={12} className="animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[.4em]">Operational Telemetry</span>
                </div>
                <h4 className="text-white font-black uppercase tracking-tighter text-2xl mb-4 font-montserrat">
                    {product.api}
                </h4>
                <p className="text-white/80 font-bold text-xs leading-relaxed font-inter max-w-[220px]">
                    {product.desc}
                </p>
                <div className="mt-8 px-6 py-3 bg-[#EE3124] text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-white hover:text-black transition-all">
                    Request technical ROI
                </div>
            </div>

            {/* Static Bottom Nameplate */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-5 bg-white/10 backdrop-blur-md border-t border-white/20 group-hover:translate-y-full transition-transform duration-500">
                <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] text-center truncate">
                    {product.title}
                </h3>
            </div>
        </motion.div>
    );
}

export default function ProductsPage() {
    return (
        <main className="bg-[#F9FAFB] min-h-screen relative font-inter">
            <Navbar />

            {/* Floating Refraction Background Assets (Ghosted) */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#EE3124]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-[#0099CC]/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 pt-44 px-8 lg:px-24">
                {/* Executive Header */}
                <div className="max-w-[1400px] mx-auto mb-32 border-b border-gray-200 pb-24">
                    <div className="flex items-center space-x-4 mb-10">
                        <div className="w-12 h-[2px] bg-[#EE3124]" />
                        <span className="text-xs font-black uppercase tracking-[0.5em] text-slate-400">Sigma Asset Registry</span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <h1 className="text-6xl md:text-[8rem] font-black text-slate-900 uppercase tracking-tighter leading-none font-montserrat">
                            ASSET<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EE3124] to-slate-400 italic">PRECISION</span>
                        </h1>
                        <div className="max-w-md">
                            <p className="text-xl text-slate-400 font-bold uppercase tracking-widest leading-relaxed mb-8">
                                Engineering 100% operational stability across 42 high-fidelity industrial equipment sectors.
                            </p>
                            <div className="flex items-center space-x-3 text-[#EE3124]">
                                <ShieldCheck size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">API Certified Registry Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 42-Item Sector Grid */}
                <div className="max-w-[1400px] mx-auto pb-64">
                    {productSectors.map((sector) => (
                        <div key={sector.id} className="mb-48">
                            <h2 className="text-5xl font-black text-slate-900 uppercase font-montserrat tracking-tighter mb-20 border-l-[12px] border-[#EE3124] pl-10">
                                {sector.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                                {sector.products.map(product => (
                                    <AmazonStandardCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
