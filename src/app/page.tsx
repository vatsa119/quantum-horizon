"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import CorporateBento from '@/components/CorporateBento';
import StatsBar from '@/components/StatsBar';
import ProductShowcase from '@/components/ProductShowcase';
import ServicesCarousel from '@/components/ServicesCarousel';
import CorporateNarrative from '@/components/CorporateNarrative';
import ContactGrid from '@/components/ContactGrid';
import LogoMarquee from '@/components/LogoMarquee';

const homeContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <main className="bg-[var(--neutral-50)] min-h-screen">
      <Navbar isDark={true} />

      <motion.div
        variants={homeContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* PHASE 1: NOCTURNAL ENTRANCE */}
        <Hero />

        {/* PHASE 2: INDUSTRIAL TELEMETRY */}
        <StatsBar />

        {/* PHASE 3: CORPORATE ARCHITECTURE */}
        <LogoMarquee />

        <div className="bg-white">
          <CorporateNarrative />
        </div>

        {/* PHASE 4: ASSET REGISTRY - NITRO MODE */}
        <ProductShowcase mode="NITRO" />

        {/* PHASE 5: STRATEGIC BENTO */}
        <div className="bg-[var(--neutral-50)]">
          <CorporateBento />
        </div>

        {/* PHASE 6: OPERATIONAL EXPERTISE */}
        <ServicesCarousel />

        {/* PHASE 7: GLOBAL CONTACT NEXUS */}
        <ContactGrid />
      </motion.div>

      <Footer />
    </main>
  );
}
