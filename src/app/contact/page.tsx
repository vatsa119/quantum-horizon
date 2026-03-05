"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ShieldCheck, Globe } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen relative overflow-hidden font-inter">
      <Navbar />

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#EE3124]/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0099CC]/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 pt-44 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">

          {/* Header Section */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 mb-8"
            >
              <div className="w-12 h-[2px] bg-[#EE3124]" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-slate-400">Global Communication Portal</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter leading-none font-montserrat"
            >
              CONNECT <br />
              <span className="text-[#EE3124] italic font-medium">PRECISION</span>
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-48">

            {/* Contact Info Column */}
            <div className="space-y-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-4"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                    <Phone className="text-[#EE3124]" size={20} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Direct Line</h3>
                  <p className="text-xl font-black text-[#1E293B]">+971 4 266 5748</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-4"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                    <Phone className="text-[#0099CC]" size={20} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mobile</h3>
                  <p className="text-xl font-black text-[#1E293B]">+971 50 258 0299</p>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ y: -5 }}
                className="p-10 bg-[#111827] rounded-[2.5rem] text-white space-y-6 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                    <MapPin className="text-[#EE3124]" size={20} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#EE3124]">Global HQ Address</h3>
                  <p className="text-lg font-bold leading-relaxed mt-4 max-w-sm">
                    Unit No: I5-PF-97, Detached Retail I5,<br />
                    Plot No: JLT-PH1-RET-I5, Gold Tower,<br />
                    Cluster I, Jumeirah Lakes Towers,<br />
                    Dubai - UAE.
                  </p>
                </div>
                {/* Tech pattern overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none" />
              </motion.div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <ShieldCheck size={18} className="text-[#EE3124]" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">API Certified Standards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe size={18} className="text-[#0099CC]" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Global Sourcing Network</span>
                </div>
              </div>
            </div>

            {/* Send Us a Message Column */}
            <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl relative">
              <div className="flex items-center space-x-3 mb-10">
                <div className="w-10 h-[2px] bg-[#EE3124]" />
                <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-900">Send us a Message</h2>
              </div>

              <p className="text-slate-500 font-medium mb-12 text-lg">
                For immediate technical ROI analysis and procurement inquiries, contact our lead architects directly:
              </p>

              <div className="space-y-6">
                <motion.a
                  href="mailto:uma@sigmadxb.com"
                  whileHover={{ x: 10 }}
                  className="flex items-center justify-between p-8 bg-slate-50 rounded-2xl border border-slate-100 group transition-all"
                >
                  <div className="flex items-center space-x-5">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-[#EE3124] transition-all border border-slate-100 shadow-sm">
                      <Mail size={20} className="text-[#EE3124] group-hover:text-white" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Procurement Lead</span>
                      <p className="text-lg font-black text-[#1E293B]">uma@sigmadxb.com</p>
                    </div>
                  </div>
                  <Send size={20} className="text-slate-300 group-hover:text-[#EE3124] transition-all" />
                </motion.a>

                <motion.a
                  href="mailto:tangirala@sigmadxb.com"
                  whileHover={{ x: 10 }}
                  className="flex items-center justify-between p-8 bg-slate-50 rounded-2xl border border-slate-100 group transition-all"
                >
                  <div className="flex items-center space-x-5">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:bg-[#EE3124] transition-all border border-slate-100 shadow-sm">
                      <Mail size={20} className="text-[#EE3124] group-hover:text-white" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Technical Support</span>
                      <p className="text-lg font-black text-[#1E293B]">tangirala@sigmadxb.com</p>
                    </div>
                  </div>
                  <Send size={20} className="text-slate-300 group-hover:text-[#EE3124] transition-all" />
                </motion.a>
              </div>

              <div className="mt-12 pt-12 border-t border-slate-50 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Average Response Time: &lt; 2 Hours</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
