"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import CorporateBento from '@/components/CorporateBento';
import RequestQuoteTab from '@/components/RequestQuoteTab';
import { motion } from 'framer-motion';

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
    <main className="bg-[#F9FAFB] min-h-screen">
      <Navbar />

      <motion.div
        variants={homeContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 
                    Hero Component: 
                    - Set to text-7xl 
                    - tracking-tighter
                    - High-res industrial rig background
                */}
        <Hero />

        {/* 
                    Corporate Bento Component:
                    - 12-column Grid
                    - Global Sourcing Network
                    - Professional Slide-ins
                */}
        <div className="bg-[#F9FAFB]">
          <CorporateBento />
        </div>
      </motion.div>

      <RequestQuoteTab />
      <Footer />
    </main>
  );
}
