'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Trophy, BookOpen, Users, Sparkles } from 'lucide-react';
import AuthModal from '@/components/AuthModal';

export default function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('register');

  const openAuth = (view: 'login' | 'register') => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans selection:bg-primary/10 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b border-slate-200 z-40 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-serif font-bold text-primary tracking-tight">
              Aptitude<span className="text-accent">Pro</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <a href="#about" className="text-slate-600 hover:text-primary text-sm font-semibold tracking-wide uppercase transition-colors">About</a>
            <a href="#research" className="text-slate-600 hover:text-primary text-sm font-semibold tracking-wide uppercase transition-colors">Assessment Research</a>
            <a href="#contact" className="text-slate-600 hover:text-primary text-sm font-semibold tracking-wide uppercase transition-colors">Contact</a>
            <div className="h-6 w-px bg-slate-200"></div>
            <button onClick={() => openAuth('login')} className="text-primary font-bold text-sm tracking-wide uppercase hover:opacity-80 transition-opacity">
              Library Access
            </button>
            <button
              onClick={() => openAuth('register')}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded text-xs tracking-[0.15em] uppercase transition-all shadow-sm"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 border-b border-slate-100 relative overflow-hidden">
        {/* Abstract Background Decoration (from original HTML) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
          <div className="absolute top-0 left-1/2 -ml-[40rem] w-[80rem] h-[80rem] rounded-full bg-blue-50 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 -mr-20 w-[60rem] h-[60rem] rounded-full bg-amber-50 opacity-30 blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Original Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-10 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Powered by Advanced AI Assessment</span>
              <span className="text-secondary font-bold text-[10px]">&rarr;</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-primary leading-[1.1] mb-10 max-w-4xl mx-auto">
              Your Complete Academic & Career Hub
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto font-medium opacity-90">
              Designed for the Tanzanian professional. Master aptitude tests, connect with top mentors, and secure your future with our comprehensive assessment platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => openAuth('register')}
                className="w-full sm:w-auto bg-primary text-white text-xs font-bold tracking-[0.2em] uppercase py-5 px-10 rounded shadow-lg hover:bg-primary/95 transition-all"
              >
                Get Started
              </button>
              <button className="w-full sm:w-auto bg-white border border-slate-200 text-primary text-xs font-bold tracking-[0.2em] uppercase py-5 px-10 rounded hover:bg-slate-50 transition-all">
                Learn more &rarr;
              </button>
            </div>

            {/* Trust Indicators (Restored from original) */}
            <div className="mt-24 pt-12 border-t border-slate-100/60">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">Trusted by Institutions across Tanzania</p>
              <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                <span className="text-lg font-bold text-primary opacity-60">e-GA</span>
                <span className="text-lg font-bold text-primary opacity-60">CRDB</span>
                <span className="text-lg font-bold text-primary opacity-60">TRA</span>
                <span className="text-lg font-bold text-primary opacity-60">NMB</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values / Content Sections */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-primary mb-8 leading-tight">
                Academic Integrity & Data Accuracy
              </h2>
              <div className="academic-divider w-24 ml-0 mb-8 border-accent border-b-2 bg-transparent h-0"></div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Our methodology is rooted in psychometric research, ensuring that every evaluation provides a clear, objective measure of professional potential. We prioritize precision over aesthetic trends.
              </p>
              <ul className="space-y-4">
                {['Verified Psychometric Standards', 'Regional Career Benchmarking', 'Instant Analytical Reporting'].map((item) => (
                  <li key={item} className="flex items-center text-slate-800 font-semibold tracking-tight">
                    <CheckCircle2 size={18} className="mr-4 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 p-12 border border-slate-100 flex flex-col justify-center min-h-[400px]">
              <div className="space-y-12">
                <div className="flex gap-8 items-start">
                  <span className="font-serif text-5xl text-accent/30 font-bold italic">01</span>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Structured Learning</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Modular assessment paths designed for long-term skill retention and verification.</p>
                  </div>
                </div>
                <div className="flex gap-8 items-start">
                  <span className="font-serif text-5xl text-accent/30 font-bold italic">02</span>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Institution Support</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Direct partnership with organizations to streamline internal evaluation processes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-16 md:gap-8 border-b border-white/10 pb-16">
            <div className="col-span-1">
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                Aptitude<span className="text-accent">Pro</span>
              </span>
              <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                The premier academic platform for professional aptitude evaluation and institutional readiness in Tanzania.
              </p>
            </div>
            <div className="col-span-1 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-6">Program</h4>
                <ul className="space-y-4 text-slate-400 text-sm font-medium">
                  <li><a href="#" className="hover:text-white transition-colors">Curriculum</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-6">Legal</h4>
                <ul className="space-y-4 text-slate-400 text-sm font-medium">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Ethics Standards</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="col-span-1">
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-6">Connect</h4>
              <p className="text-slate-400 text-sm font-medium mb-4">Subscribe to our academic newsletter for the latest research.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded px-4 py-2 text-sm w-full focus:border-accent outline-none transition-colors" />
                <button className="bg-accent text-primary p-2 rounded hover:brightness-110 transition-all"><ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest gap-4">
            <p>© 2024 AptitudePro. All Rights Reserved.</p>
            <p>Designed for Academic Excellence.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authView}
      />
    </div>
  );
}
