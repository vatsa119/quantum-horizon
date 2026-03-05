"use client";

import React, { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Mail, Phone, ShieldCheck, Globe, Target, Eye, ArrowUpRight, Award, Zap, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

// --- Neomorphism 2.0 Component ---
const NeoCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative bg-white rounded-[3rem] p-12 border border-slate-100 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.8),_5px_5px_15px_rgba(0,0,0,0.03)] ${className}`}>
    {children}
  </div>
);

const DotNav = ({ activeSection }: { activeSection: string }) => {
  const sections = [
    { id: 'expertise', label: 'Expertise' },
    { id: 'mission', label: 'Mission' },
    { id: 'excellence', label: 'Excellence' },
    { id: 'quality', label: 'Quality' },
    { id: 'vision', label: 'Vision' }
  ];
  return (
    <div className="fixed right-12 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col space-y-10">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => {
            const el = document.getElementById(section.id);
            if (el) {
              const offset = section.id === 'expertise' ? 0 : -100;
              const top = el.getBoundingClientRect().top + window.pageYOffset + offset;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          }}
          className="group flex items-center justify-end space-x-6 relative"
        >
          <span className={`text-sm font-serif italic transition-all duration-500 whitespace-nowrap ${activeSection === section.id ? 'opacity-100 text-[#EE3124] translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-slate-400'}`}>
            {section.label}
          </span>
          <div className="relative flex items-center justify-center">
            <div className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${activeSection === section.id ? 'border-[#EE3124] bg-[#EE3124]' : 'border-slate-300 group-hover:border-[#EE3124]'}`} />
            {activeSection === section.id && (
              <motion.div
                layoutId="active-dot-glow"
                className="absolute inset-0 w-8 h-8 bg-[#EE3124]/10 rounded-full -m-2.5 blur-sm"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

const ExpertiseSection = () => {
  const { scrollYProgress } = useScroll();
  const yHeader = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const yBody = useTransform(scrollYProgress, [0, 0.2], [0, 20]);

  return (
    <section id="expertise" className="py-24 pb-12 px-8 lg:px-24 bg-white overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <motion.div style={{ y: yHeader }}>
            <div className="flex items-center space-x-6 mb-8 text-[#EE3124]">
              <div className="w-12 h-[2px] bg-current" />
              <span className="text-xs font-black uppercase tracking-[0.5em]">Section 01</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter text-slate-900 leading-[0.85]">
              Unveiling Our <br />
              <span className="text-[#EE3124]">Expertise</span>
            </h2>
          </motion.div>

          <motion.div style={{ y: yBody }} className="space-y-8">
            <p className="text-xl md:text-2xl text-slate-500 font-inter leading-relaxed font-light">
              Sigma Oilfield & Industrial Supply along with its partners in UAE, take pride in providing a comprehensive range of equipment and services tailored for the global energy sector.
            </p>
            <p className="text-lg text-slate-400 font-inter leading-relaxed">
              Our primary expertise lies in the <span className="text-slate-900 font-bold">supply, refurbishment, and customization of used Drilling Rigs</span>, ensuring they meet the most rigorous international standards. We specialize in horizontal triplex mud pumps, top drives, and blowout preventers (BOPs), providing a single-point solution for high-precision industrial mastery.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative group h-[700px] rounded-[4rem] overflow-hidden border border-white/50 shadow-2xl"
        >
          {/* Subtle Red Lighting Accent */}
          <div className="absolute inset-0 bg-radial-gradient from-[#EE3124]/10 via-transparent to-transparent pointer-events-none z-10" />

          <Image
            src="/assets/renders/rig_substructure_final.png"
            alt="Integrated Rig Sub-structure (Top Drive, BOP Stack, Handling Tools)"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-all pointer-events-none" />

          {/* Liquid Glass Overlay */}
          <div className="absolute inset-0 p-12 flex flex-col justify-end backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all z-20">
            <div className="bg-white/90 backdrop-blur-3xl p-8 rounded-3xl border border-[#EE3124]/20 w-fit shadow-2xl">
              <span className="text-[10px] font-black text-[#EE3124] uppercase tracking-widest block mb-1">Technical Audit</span>
              <span className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Integrated Rig <span className="text-[#EE3124]">Performance</span></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Mission (Horizontal Pin-and-Scroll) ---
const MissionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const xText = useTransform(scrollYProgress, [0, 0.5], [0, -20]);

  return (
    <section id="mission" ref={sectionRef} className="h-[200vh] bg-slate-50 relative scroll-mt-24 m-0 p-0">
      <div className="sticky top-0 min-h-[700px] py-12 w-full flex items-center justify-center overflow-hidden px-8 lg:px-24">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          <motion.div style={{ x: xText }} className="space-y-12">
            <div className="flex items-center space-x-6 mb-8 text-[#EE3124]">
              <div className="w-12 h-[2px] bg-current" />
              <span className="text-xs font-black uppercase tracking-[0.5em]">Section 02</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter text-slate-900 leading-[0.85]">
              Guiding <br />
              <span className="text-[#EE3124]">Mission</span>
            </h2>
            <p className="text-xl md:text-2xl font-inter text-slate-500 leading-relaxed font-light">
              &quot;Sigma&apos;s mission resonates with leadership and is built on its core values. Anchored in resourcefulness, Sigma aspires to become a premier regional oilfield supplier and an integrated engineering services provider in the chosen lines of services.&quot;
            </p>
          </motion.div>

          <div className="relative flex items-center justify-center">
            <motion.div style={{ rotate }} className="relative w-[500px] h-[500px]">
              <Image
                src="/sigma.png"
                alt="Sigma DMCC Brand Seal"
                fill
                className="object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-50/50 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

import RefractionOverlay from '@/components/RefractionOverlay';

// ... (Expertise, Mission sections)

// --- Elevating Industry Excellence (The 95% Logic) ---
const ExcellenceSection = () => {
  const productList = [
    "High-Performance Lubricants",
    "API Certified PPE Gear",
    "Industrial Chemicals",
    "RIG Tools & Equipment",
    "Precision Spare Parts",
    "Drilling Fluid Additives",
    "Specialized Valve Seals"
  ];

  return (
    <section id="excellence" className="py-24 px-8 lg:px-24 bg-slate-50 relative overflow-hidden scroll-mt-24 font-sans">
      <RefractionOverlay />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="flex items-center space-x-6 mb-8 text-[#EE3124]">
              <div className="w-12 h-[2px] bg-current" />
              <span className="text-xs font-black uppercase tracking-[0.5em]">Section 03</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter text-slate-900 leading-[0.85]">
              Elevating Industry <br />
              <span className="text-[#EE3124]">Excellence</span>
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-slate-500 font-inter leading-relaxed max-w-xl">
                Sigma DMCC bridges the gap between demand and supply, ensuring a <span className="text-slate-900 font-bold">95% on-time delivery rate</span> for critical industrial assets across the UAE.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4 border-l-2 border-[#EE3124]/10 pl-8">
                {productList.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-sm font-bold text-slate-700 hover:text-[#EE3124] transition-colors cursor-default">
                    <CheckCircle2 size={16} className="text-[#EE3124]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            {/* Liquid Glass 95% Graphic Container */}
            <div className="relative w-full max-w-md aspect-square rounded-[3rem] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] flex items-center justify-center group overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/50">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EE3124]/10 via-transparent to-[#0099CC]/5" />
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#EE3124]/10 blur-[100px] animate-pulse" />
              <div className="text-center z-10 text-slate-900">
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-9xl font-black block leading-none tracking-tighter"
                >
                  95<span className="text-4xl text-[#EE3124]">%</span>
                </motion.span>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mt-6 block">Performance Index</span>
              </div>
              <div className="absolute top-10 right-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-white/80 backdrop-blur-3xl rounded-full flex items-center justify-center p-3 shadow-xl border border-white">
                  <ShieldCheck size={40} className="text-[#0099CC] drop-shadow-md" />
                </div>
                <span className="text-[8px] font-black text-[#0099CC] uppercase tracking-tighter mt-3 bg-white/80 px-3 py-1 rounded-full border border-slate-100">ISO 9001:2015</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
            <div className="absolute -z-10 w-[120%] h-[120%] bg-radial-gradient from-[#EE3124]/5 to-transparent blur-3xl opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};


const QualitySection = () => {
  return (
    <section id="quality" className="py-24 px-8 lg:px-24 bg-white relative scroll-mt-24 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <div className="flex items-center space-x-6 mb-8 text-[#EE3124]">
            <div className="w-12 h-[2px] bg-current" />
            <span className="text-xs font-black uppercase tracking-[0.5em]">Section 04</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter text-slate-900 leading-[0.85]">
            Excellence <br />
            <span className="text-[#EE3124]">Anchored</span>
          </h2>
        </div>

        <NeoCard className="group">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter font-montserrat">Quality Assurance</h3>
              <p className="text-xl text-slate-500 font-inter leading-relaxed">
                &quot;Our unwavering commitment is to deliver tailored quality in design, engineering, and workmanship. We are dedicated to providing high-precision turnkey services, employing skilled professionals who adhere to international standards and codes to build absolute shareholder trust.&quot;
              </p>
              <div className="flex flex-wrap gap-6 pt-8">
                <div className="flex items-center space-x-3 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 italic font-bold text-slate-900">
                  <CheckCircle2 size={18} className="text-[#EE3124]" />
                  <span>Skilled Employees</span>
                </div>
                <div className="flex items-center space-x-3 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 italic font-bold text-slate-900">
                  <CheckCircle2 size={18} className="text-[#0099CC]" />
                  <span>International Codes</span>
                </div>
              </div>
            </div>

            <div className="relative h-[600px] overflow-hidden rounded-[3rem] bg-slate-50 border border-slate-100 shadow-inner group/render">
              <Image
                src="/assets/renders/valve.webp"
                alt="API Certified Valve"
                fill
                className="object-contain p-20 z-10 relative transition-all duration-700 group-hover/render:scale-105"
                style={{ mixBlendMode: 'multiply' }}
              />

              {/* HUD Badges Reveal */}
              <div className="absolute inset-0 z-20 opacity-0 group-hover/render:opacity-100 transition-opacity duration-1000 flex flex-col justify-center items-center backdrop-blur-sm bg-white/10">
                <div className="grid grid-cols-1 gap-6 text-center">
                  <div className="px-10 py-5 bg-white shadow-2xl rounded-2xl border border-[#EE3124]/20">
                    <span className="text-[10px] font-black text-[#EE3124] uppercase tracking-widest block mb-1">Certification</span>
                    <span className="text-3xl font-black text-slate-900">API 7K</span>
                  </div>
                  <div className="px-10 py-5 bg-white shadow-2xl rounded-2xl border border-[#0099CC]/20">
                    <span className="text-[10px] font-black text-[#0099CC] uppercase tracking-widest block mb-1">Certification</span>
                    <span className="text-3xl font-black text-slate-900">API 16A</span>
                  </div>
                  <div className="px-10 py-5 bg-white shadow-2xl rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Certification</span>
                    <span className="text-3xl font-black text-slate-900">API 11B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NeoCard>
      </div>
    </section>
  );
};

const VisionSection = () => {
  return (
    <section id="vision" className="pt-24 pb-48 px-8 lg:px-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-24 font-sans">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center space-x-6 mb-12">
          <div className="w-16 h-[2px] bg-[#EE3124]" />
          <span className="text-xs font-black uppercase tracking-[0.7em] text-[#EE3124]">Section 05</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-[0.8] mb-16 text-white/90">
          Vision for <br />
          The <span className="text-[#EE3124]">Future</span>
        </h2>
        <p className="text-2xl md:text-5xl text-slate-400 max-w-5xl font-inter leading-tight font-light tracking-tight italic">
          &quot;Envisioning a future defined by excellence, Sigma aspires to be the number one choice for clients, becoming a distinctive, client-centric logistics services provider in the global oil, gas, and energy industries.&quot;
        </p>
      </div>

      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#EE3124]/5 blur-[200px] -mr-96 -mt-96 rounded-full" />
    </section>
  );
};

export default function AboutUsPage() {
  const [activeSection, setActiveSection] = useState('expertise');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    ['expertise', 'mission', 'excellence', 'quality', 'vision'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white min-h-screen relative font-inter selection:bg-[#EE3124] selection:text-white overflow-x-hidden flex flex-col gap-0">
      <Navbar />
      <DotNav activeSection={activeSection} />

      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-[9999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <ExpertiseSection />
      <MissionSection />
      <ExcellenceSection />
      <QualitySection />
      <VisionSection />

      <Footer />
    </main>
  );
}
