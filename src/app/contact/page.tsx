"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ShieldCheck, Globe, Activity } from 'lucide-react';
import MagneticCard from '@/components/MagneticCard';

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen relative overflow-hidden">
      <Navbar />

      {/* Cinematic Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--signal-red-500)]/5 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--tech-cyan-500)]/5 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-10 pt-[var(--space-48)] px-[var(--space-8)] lg:px-[var(--space-24)]">
        <div className="max-w-[1440px] mx-auto">

          {/* EXECUTIVE COMMAND HEADER */}
          <div className="mb-[var(--space-32)] border-b border-[var(--neutral-100)] pb-[var(--space-24)]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-[var(--space-3)] mb-[var(--space-10)]"
            >
              <div className="w-[var(--space-12)] h-[2px] bg-[var(--signal-red-500)]" />
              <span className="text-tech-label text-[var(--neutral-400)]">Global Communication Command</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-display-lg lg:text-[10rem] font-display font-[800] text-[var(--carbon-black)] uppercase tracking-tighter leading-[0.85]"
            >
              CONNECT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--signal-red-500)] to-[var(--neutral-400)] italic">PRECISION</span>
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-24)] mb-[var(--space-48)]">

            {/* LEFT: TELEMETRY & LOCATION */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-[var(--space-16)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-8)]">
                <MagneticCard className="bg-[var(--neutral-50)] rounded-[var(--radius-hud)] border border-[var(--neutral-100)] p-[var(--space-10)] space-y-[var(--space-4)]">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-[var(--neutral-100)]">
                    <Phone className="text-[var(--signal-red-500)]" size={24} />
                  </div>
                  <h3 className="text-tech-label text-[var(--neutral-400)]">Direct Ops Line</h3>
                  <p className="text-h3 font-display font-bold text-[var(--carbon-black)] tracking-tight">+971 4 266 5748</p>
                </MagneticCard>

                <MagneticCard className="bg-[var(--neutral-50)] rounded-[var(--radius-hud)] border border-[var(--neutral-100)] p-[var(--space-10)] space-y-[var(--space-4)]">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-[var(--neutral-100)]">
                    <Activity className="text-[var(--tech-cyan-500)]" size={24} />
                  </div>
                  <h3 className="text-tech-label text-[var(--neutral-400)]">Mobile Strategic</h3>
                  <p className="text-h3 font-display font-bold text-[var(--carbon-black)] tracking-tight">+971 50 258 0299</p>
                </MagneticCard>
              </div>

              <div className="bg-[var(--carbon-black)] rounded-[var(--radius-hud)] p-[var(--space-12)] text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-[var(--space-8)] border border-white/10">
                    <MapPin className="text-[var(--signal-red-500)]" size={32} />
                  </div>
                  <h3 className="text-tech-label text-[var(--signal-red-500)] mb-4">Command Center Address</h3>
                  <p className="text-h3 font-display font-medium leading-relaxed max-w-md">
                    Unit No: I5-PF-97, Gold Tower,<br />
                    Cluster I, JLT - PH1-RET-I5,<br />
                    Jumeirah Lakes Towers,<br />
                    Dubai - UAE.
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 pointer-events-none" />
              </div>

              <div className="flex items-center space-x-[var(--space-8)] pt-[var(--space-4)]">
                <div className="flex items-center space-x-2">
                  <ShieldCheck size={20} className="text-[var(--signal-red-500)]" />
                  <span className="text-tech-label text-[var(--neutral-400)]">API CERTIFIED HUB</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe size={20} className="text-[var(--tech-cyan-500)]" />
                  <span className="text-tech-label text-[var(--neutral-400)]">GLOBAL SOURCING ACTIVE</span>
                </div>
              </div>
            </div>

            {/* RIGHT: DIRECT TRANSMISSION CHANNELS */}
            <div className="lg:col-span-12 xl:col-span-7 bg-white p-[var(--space-12)] lg:p-[var(--space-16)] rounded-[var(--radius-hud)] border border-[var(--neutral-100)] shadow-2xl relative">
              <div className="flex items-center space-x-[var(--space-4)] mb-[var(--space-10)]">
                <div className="w-[var(--space-12)] h-[2px] bg-[var(--signal-red-500)]" />
                <h2 className="text-tech-label text-[var(--carbon-black)] font-bold">Initiate Transmission</h2>
              </div>

              <p className="text-h4 text-[var(--neutral-500)] font-medium mb-[var(--space-12)] leading-relaxed">
                For immediate technical ROI analysis and operational procurement, contact our executive leads directly:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-6)]">
                {[
                  { name: "Executive Ops", email: "uma@sigmadxb.com", label: "Procurement Lead" },
                  { name: "Technical Support", email: "ops@sigmadxb.com", label: "Strategic Response" }
                ].map((channel, i) => (
                  <motion.a
                    key={i}
                    href={`mailto:${channel.email}`}
                    whileHover={{ y: -5 }}
                    className="flex flex-col p-[var(--space-10)] bg-[var(--neutral-50)] rounded-3xl border border-[var(--neutral-100)] group transition-all"
                  >
                    <div className="flex items-center justify-between mb-[var(--space-6)]">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center group-hover:bg-[var(--signal-red-500)] group-hover:text-white transition-all border border-[var(--neutral-100)] shadow-md">
                        <Mail size={24} />
                      </div>
                      <Send size={20} className="text-[var(--neutral-300)] group-hover:text-[var(--signal-red-500)] transition-all" />
                    </div>
                    <span className="text-tech-label text-[var(--neutral-400)] mb-1">{channel.label}</span>
                    <p className="text-h4 font-display font-[800] text-[var(--carbon-black)] break-all">{channel.email}</p>
                  </motion.a>
                ))}
              </div>

              <div className="mt-[var(--space-16)] pt-[var(--space-12)] border-t border-[var(--neutral-100)] flex justify-between items-center text-tech-label">
                <span className="text-[var(--neutral-400)]">Average Response Resolution</span>
                <span className="text-[var(--signal-red-500)] font-bold animate-pulse">&lt; 120 Minutes</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
