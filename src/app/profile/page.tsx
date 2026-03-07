"use client";

import React, { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatCounter from '@/components/StatCounter';
import StaggeredGrid from '@/components/StaggeredGrid';
import Spotlight from '@/components/Spotlight';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ShieldCheck, Target, Award, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const sections = [
  { id: 'expertise', label: 'EXPERTISE' },
  { id: 'mission', label: 'MISSION' },
  { id: 'excellence', label: 'EXCELLENCE' },
  { id: 'quality', label: 'QUALITY' },
  { id: 'vision', label: 'VISION' }
];

import { ParallaxBackground, ScrollySection, RevealItem } from '@/components/Scrollytelling';
import ComparisonSlider from '@/components/ComparisonSlider';


const DotNav = ({ activeSection }: { activeSection: string }) => {
  return (
    <div className="fixed right-[var(--space-12)] top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col space-y-[var(--space-10)]">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => {
            const el = document.getElementById(section.id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex items-center justify-end space-x-6 relative"
        >
          <span className={`text-tech-label transition-all duration-500 whitespace-nowrap font-mono ${activeSection === section.id ? 'opacity-100 text-[var(--signal-red-500)] translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--neutral-400)]'}`}>
            {section.label}
          </span>
          <div className="relative flex items-center justify-center">
            <div className={`w-3 h-3 rounded-full border-2 transition-all duration-700 ${activeSection === section.id ? 'border-[var(--signal-red-500)] bg-[var(--signal-red-500)] scale-125' : 'border-[var(--neutral-300)] group-hover:border-[var(--signal-red-500)]'}`} />
          </div>
        </button>
      ))}
    </div>
  );
};

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('expertise');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.3 });
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white min-h-screen relative overflow-x-hidden font-sans">
      <Navbar />
      <DotNav activeSection={activeSection} />

      {/* 01. EXPERTISE - Cinematic Entry */}
      <ScrollySection id="expertise" className="pt-[var(--space-24)] pb-[var(--space-16)] px-[var(--space-8)] lg:px-[var(--space-24)] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-12)] lg:gap-[var(--space-24)] items-center">
            <div className="lg:col-span-12 space-y-[var(--space-8)] mb-[var(--space-12)] border-b border-[var(--neutral-100)] pb-[var(--space-12)]">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-[var(--space-3)] mb-[var(--space-4)]"
              >
                <div className="w-[var(--space-12)] h-[2px] bg-[var(--signal-red-500)]" />
                <span className="text-tech-label text-[var(--signal-red-500)] tracking-[0.2em] font-mono">Operational Intelligence</span>
              </motion.div>
              <h1 className="text-display-lg lg:text-[9rem] font-display font-[800] text-[var(--carbon-black)] uppercase tracking-tighter leading-[0.85]">
                UNVEILING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--signal-red-500)] to-[var(--neutral-400)] italic">EXPERTISE</span>
              </h1>
            </div>

            <div className="lg:col-span-6 space-y-[var(--space-8)]">
              <p className="text-h3 text-[var(--neutral-600)] font-medium leading-relaxed italic border-l-4 border-[var(--signal-red-500)] pl-6">
                Sigma bridges the gap between technical demand and executive reliability across global energy corridors.
              </p>
              <div className="space-y-[var(--space-6)] text-[17px] text-[var(--neutral-500)] leading-relaxed font-medium">
                <p>
                  Our primary expertise lies in the <span className="text-[var(--carbon-black)] font-bold">supply, refurbishment, and orchestration of API-standard Drilling Rigs</span>. We specialize in horizontal triplex mud pumps, top drives, and BOP systems, providing a single-point command for industrial mastery.
                </p>
                <p>
                  Along with our UAE partners, we provide 100% operational stability through a certified global sourcing nexus spanning the USA, EU, and China markets.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-[550px] rounded-[var(--radius-hud)] overflow-hidden shadow-2xl group image-reveal visible">
                <ParallaxBackground speed={0.4}>
                  <Image
                    src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=2070"
                    alt="Industrial Hub Operations"
                    fill
                    className="object-cover transition-all duration-[2s] group-hover:scale-110"
                  />
                </ParallaxBackground>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--carbon-black)] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute inset-0 p-[var(--space-10)] flex flex-col justify-end pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-2xl p-[var(--space-6)] rounded-2xl border border-[var(--signal-red-500)]/20 shadow-2xl w-fit">
                    <span className="text-tech-label text-[var(--signal-red-500)] block mb-1 font-mono">Registry ID: SI-DR-024</span>
                    <h3 className="text-h4 font-display font-[800] text-[var(--carbon-black)] uppercase tracking-tighter">Integrated Rig Performance</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollySection>

      {/* 01.5 REFURBISHMENT - Kinetic Transformation */}
      <ScrollySection id="refurbishment" className="py-[var(--space-20)] bg-[var(--neutral-50)]/30">
        <div className="max-w-7xl mx-auto px-[var(--space-8)] lg:px-[var(--space-24)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-12)] lg:gap-[var(--space-24)] items-center">
            <div className="lg:col-span-12 mb-[var(--space-8)] flex items-center justify-between">
              <div className="flex items-center space-x-[var(--space-3)]">
                <div className="w-[var(--space-12)] h-[2px] bg-[var(--signal-red-500)]" />
                <span className="text-tech-label text-[var(--signal-red-500)] font-mono">Refurbishment Lifecycle</span>
              </div>
              <span className="text-tech-label text-[var(--neutral-300)] font-mono">PROTOCOL: REBIRTH_V4</span>
            </div>

            <div className="lg:col-span-12 xl:col-span-5 space-y-[var(--space-8)]">
              <h2 className="text-display-md font-display font-[800] text-[var(--carbon-black)] uppercase tracking-tighter leading-[0.9]">
                Asset <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--signal-red-500)] to-[var(--neutral-400)] italic">Refinement</span>
              </h2>
              <p className="text-[17px] text-[var(--neutral-500)] font-medium leading-relaxed">
                Sigma transforms decommissioned industrial assets into certified high-performance machinery. Our protocol exceeds original OEM specifications through precision engineering.
              </p>

              <div className="space-y-[var(--space-4)]">
                {[
                  { title: "TEARDOWN", desc: "Complete structural ultrasonic analysis" },
                  { title: "ENGINEERING", desc: "Refurbished to API-Spec 7K standards" },
                  { title: "CERTIFICATION", desc: "100% operational load-testing" }
                ].map((item, i) => (
                  <RevealItem key={i} delay={i * 0.1} className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-[var(--neutral-100)] shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-[var(--neutral-50)] flex items-center justify-center text-[var(--signal-red-500)] font-black text-[11px] font-mono">0{i + 1}</div>
                    <div>
                      <h4 className="text-[12px] font-black text-[var(--carbon-black)] uppercase tracking-widest">{item.title}</h4>
                      <p className="text-[11px] text-[var(--neutral-400)]">{item.desc}</p>
                    </div>
                  </RevealItem>
                ))}
              </div>
            </div>

            <div className="lg:col-span-12 xl:col-span-7">
              <RevealItem delay={0.3} className="relative z-10">
                <ComparisonSlider
                  beforeImage="https://images.unsplash.com/photo-1541888941259-773a941da793?auto=format&fit=crop&q=80&w=2070"
                  afterImage="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=2070"
                  beforeLabel="DECOMMISSIONED"
                  afterLabel="SIGMA CERTIFIED"
                />
                <div className="mt-6 text-center">
                  <span className="text-tech-label text-[var(--neutral-300)] font-mono animate-pulse underline decoration-[var(--signal-red-500)]/30 underline-offset-4">SLIDE TO REVEAL TRANSFORMATION</span>
                </div>
              </RevealItem>
            </div>
          </div>
        </div>
      </ScrollySection>

      {/* 02. MISSION - Industrial Rhythm */}
      <ScrollySection id="mission" className="py-[var(--space-20)] bg-[var(--neutral-50)]">
        <div className="max-w-7xl mx-auto px-[var(--space-8)] lg:px-[var(--space-24)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-20)] items-center">
            <div className="space-y-[var(--space-8)]">
              <div className="flex items-center space-x-[var(--space-3)]">
                <div className="w-[var(--space-12)] h-[2px] bg-[var(--industrial-gold)]" />
                <span className="text-tech-label text-[var(--industrial-gold)] font-mono">Guiding Command</span>
              </div>
              <h2 className="text-display-lg font-display font-[800] text-[var(--carbon-black)] uppercase tracking-tighter leading-[0.9] slide-in-left visible">
                MISSION <br />
                <span className="text-[var(--industrial-gold)]">CRITICAL</span>
              </h2>
              <div className="relative">
                <p className="text-h4 font-display font-medium text-[var(--neutral-500)] leading-relaxed italic max-w-lg">
                  "Sigma&apos;s mission resonates with leadership and is built on its core values. Anchored in resourcefulness, Sigma aspires to become a premier regional oilfield supplier."
                </p>
                <div className="absolute -left-10 top-0 text-[120px] font-black text-[var(--neutral-200)] opacity-20 pointer-events-none select-none">"</div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="w-[380px] h-[380px] relative opacity-5"
              >
                <Image src="/sigma.png" alt="Sigma Brand Seal" fill className="object-contain" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  className="text-center space-y-2 bg-white/50 backdrop-blur-xl p-8 rounded-full border border-white shadow-2xl"
                >
                  <Target size={48} className="text-[var(--industrial-gold)] mx-auto mb-4" />
                  <span className="text-tech-label font-black text-[var(--carbon-black)] tracking-widest font-mono">EXECUTIVE ALIGNMENT</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </ScrollySection>

      {/* 03. EXCELLENCE - Performance Index */}
      <ScrollySection id="excellence" className="py-[var(--space-20)] bg-white">
        <div className="max-w-7xl mx-auto px-[var(--space-8)] lg:px-[var(--space-24)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-20)] items-center">
            <div className="space-y-[var(--space-8)] reveal-item visible">
              <div className="flex items-center space-x-[var(--space-3)]">
                <div className="w-[var(--space-12)] h-[2px] bg-[var(--signal-red-500)]" />
                <span className="text-tech-label text-[var(--signal-red-500)] font-mono">Performance Matrix</span>
              </div>
              <h2 className="text-display-lg font-display font-[800] text-[var(--carbon-black)] uppercase tracking-tighter leading-[0.9]">
                Elevating <br />
                <span className="text-[var(--signal-red-500)]">Excellence</span>
              </h2>
              <p className="text-h4 text-[var(--neutral-500)] leading-relaxed font-medium">
                Sigma DMCC bridges the gap between demand and supply, ensuring a <span className="text-[var(--carbon-black)] font-[900]">95% on-time delivery rate</span> across 42 active sectors.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-l-2 border-[var(--signal-red-500)]/20 pl-8">
                {["High-Performance Lube", "API Certified PPE", "Industrial Chemicals", "Rig Spares", "Fluid Additives"].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center space-x-3 text-tech-label !text-[13px] text-[var(--neutral-600)]"
                  >
                    <CheckCircle2 size={16} className="text-[var(--signal-red-500)]" />
                    <span className="font-bold">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative h-[500px] bg-[var(--neutral-50)] rounded-[var(--radius-hud)] flex flex-col items-center justify-center border border-[var(--neutral-100)] shadow-inner overflow-hidden group">
              <div className="text-center z-10">
                <StatCounter target={95} suffix="%" className="text-[10rem] font-display font-[800] text-[var(--carbon-black)] leading-none tracking-tighter" />
                <span className="text-tech-label text-[var(--neutral-400)] tracking-[0.4em] mt-4 block font-mono">PERFORMANCE INDEX [ACTIVE]</span>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="absolute top-10 right-10 w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-[var(--neutral-100)] cursor-crosshair"
              >
                <ShieldCheck size={48} className="text-[var(--tech-cyan-500)]" />
              </motion.div>
              {/* Blueprint grid decor */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,36,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,36,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 pointer-events-none" />
            </div>
          </div>
        </div>
      </ScrollySection>

      {/* 04. QUALITY - Anchor Protocol */}
      <ScrollySection id="quality" className="py-[var(--space-20)] bg-[var(--neutral-50)]">
        <div className="max-w-7xl mx-auto px-[var(--space-8)] lg:px-[var(--space-24)]">
          <div className="bg-white rounded-[var(--radius-hud)] p-[var(--space-10)] lg:p-[var(--space-16)] shadow-2xl border border-[var(--neutral-100)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--signal-red-500)]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-16)] items-center relative z-10">
              <div className="space-y-[var(--space-8)]">
                <div className="inline-flex px-4 py-1.5 bg-[var(--carbon-black)] text-white text-[10px] font-bold rounded-lg mb-4 tracking-widest font-mono">ISO 9001:2015 CERTIFIED</div>
                <h3 className="text-display-md font-display font-[800] text-[var(--carbon-black)] uppercase tracking-tighter leading-none slide-in-left visible">QUALITY <br /> ACCREDITATION</h3>
                <p className="text-[18px] text-[var(--neutral-600)] leading-relaxed font-medium italic border-l-4 border-[var(--neutral-200)] pl-6">
                  "Our unwavering commitment is to deliver tailored quality in design and engineering. We are dedicated to providing high-precision turnkey services, employing skilled professionals who adhere to international standards."
                </p>
                <div className="flex flex-wrap gap-3 pt-6">
                  {["API-7K Certified", "API-16A Compliant", "ISO 9001:2015", "HSE Compliant"].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-[var(--neutral-50)] text-tech-label border border-[var(--neutral-200)] rounded-xl text-[var(--carbon-black)] font-bold font-mono transition-colors hover:bg-[var(--signal-red-500)] hover:text-white hover:border-[var(--signal-red-500)] cursor-default">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="relative h-[480px] rounded-3xl overflow-hidden bg-[var(--neutral-50)] shadow-inner group">
                <ParallaxBackground speed={0.3}>
                  <Image src="/assets/renders/valve.webp" alt="API Components" fill className="object-contain p-12 transition-transform duration-1000 group-hover:scale-105" />
                </ParallaxBackground>
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--signal-red-500)]/5 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-xl text-center min-w-[140px]">
                  <span className="text-[10px] font-mono font-bold text-[var(--neutral-400)] block">PRECISION LEVEL</span>
                  <span className="text-h4 font-black text-[var(--signal-red-500)] tracking-tighter">0.001mm TOLERANCE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollySection>

      {/* 05. VISION - Global Sourcing Future */}
      <Spotlight>
        <section id="vision" className="pt-24 pb-32 px-8 lg:px-24 section-dark text-white relative overflow-hidden scroll-mt-24 font-sans">
          <div className="max-w-7xl mx-auto px-[var(--space-8)] lg:px-[var(--space-24)] relative z-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-[var(--space-4)] mb-[var(--space-10)] justify-center lg:justify-start"
            >
              <div className="w-[var(--space-16)] h-[2px] bg-[var(--signal-red-500)]" />
              <span className="text-tech-label text-[var(--signal-red-500)] tracking-[0.4em] font-mono">Future Trajectory</span>
            </motion.div>
            <h2 className="text-display-lg font-display font-[800] text-white uppercase tracking-tighter leading-[0.8] mb-[var(--space-10)] slide-in-left visible">
              VISION FOR <br />
              <span className="text-[var(--signal-red-500)] italic">THE FUTURE</span>
            </h2>
            <p className="text-display-md text-[var(--neutral-400)] max-w-5xl font-display leading-[1.1] tracking-tight italic reveal-item visible">
              "Envisioning a future defined by excellence, Sigma aspires to be the number one choice, becoming a distinctive, client-centric logistics services provider in the global energy industries."
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-16 px-10 py-5 bg-[var(--signal-red-500)] text-white font-black uppercase tracking-widest rounded-2xl shadow-glow-red flex items-center space-x-4 mx-auto lg:mx-0 group spring-scale"
            >
              <span>Partner With Sigma</span>
              <ArrowRight className="transition-transform group-hover:translate-x-2" />
            </motion.button>
          </div>
          {/* Kinetic Decor */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#EE3124]/5 blur-[200px] -mr-96 -mt-96 rounded-full" />
        </section>
      </Spotlight>

      <Footer />
    </main>
  );
}
