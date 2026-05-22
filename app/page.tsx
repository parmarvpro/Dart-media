'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { 
  ArrowUpRight, 
  ChevronDown, 
  Cpu, 
  Network, 
  Terminal, 
  Layers, 
  Activity, 
  BookOpen, 
  PhoneCall, 
  ArrowRight,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Calendar,
  Layers3,
  Bot
} from 'lucide-react';

import HologramCanvas from '@/components/HologramCanvas';
import ServiceCard, { servicesData } from '@/components/ServiceCard';
import AIAutomationSimulator from '@/components/AIAutomationSimulator';
import SalesScriptSuite from '@/components/SalesScriptSuite';

// Interface for Scrolling Sequence Items
interface ScrollStep {
  phase: string;
  title: string;
  tagline: string;
  description: string;
  specs: string[];
  kpi: string;
  kpiValue: string;
}

const scrollSteps: ScrollStep[] = [
  {
    phase: 'showcase',
    title: 'Showcase the Project',
    tagline: 'Step 1: Production and Content Mastery',
    description: 'We turn abstract structural CAD file templates and dry floorplans into high-desire physical asset visual systems. Through FPV autonomous drones, lifestyle videography, and fully materialized 3D CGI artist walkthroughs, we showcase your development before excavation begins.',
    specs: ['Pre-programmed FPV orbits & path tracking', 'Automated dawns and twilight exposure bracketing', 'High-retaining vertical organic media framing'],
    kpi: 'ORGANIC VIDEO RETENTION',
    kpiValue: '92% Average'
  },
  {
    phase: 'generate',
    title: 'Generate Inquiries',
    tagline: 'Step 2: Direct-Response Ad Targeting',
    description: 'We deploy the creative assets straight into our proprietary, localized Meta and search ad architectures. Multi-variant testing algorithms target UHNW and premium buyers exactly within defined radius boundaries, matching high-intent copy with direct contact captures.',
    specs: ['Multi-demographic interest stacked targets', 'Localized micro-radius geolocation locks', 'Pre-tested developer copywriting frameworks'],
    kpi: 'AVERAGE ADS CAMPAIGN ROAS',
    kpiValue: '6.4x Return'
  },
  {
    phase: 'ai',
    title: 'AI Handles Leads',
    tagline: 'Step 3: Dual-Core Cognitive Handshake',
    description: 'When a lead clicks an ad, they are instantly routed straight to our active WhatsApp, SMS, or Instagram messaging pipeline. The Dart AI engine responds within 2.5 seconds—explaining layout advantages, sharing floor prospectus decks, and qualifying and filtering the buyer.',
    specs: ['24/7/365 active qualifying agents', 'Seamless WhatsApp/SMS API handshake', 'Immediate developer calendar sync'],
    kpi: 'AVERAGE RESPONSE LATENCY',
    kpiValue: '2.5 Seconds'
  },
  {
    phase: 'book',
    title: 'Book Site Visits',
    tagline: 'Step 4: Direct Conversion & Calendar Lock',
    description: 'Qualified buyers are autonomously navigated straight to site visit selection. The AI secures the exact date and private preview slot, synchronizes with the developer dashboard, structures parking requests, and routes coordinates directly to the buyer.',
    specs: ['Double-booking prevention security', 'Autonomous SMS/Map coordinate dispatch', 'Direct lead scoring qualification charts'],
    kpi: 'INQUIRY-TO-BOOKING CONVERSION',
    kpiValue: '8.4% Average'
  },
  {
    phase: 'close',
    title: 'Sales Team Closes',
    tagline: 'Step 5: Physical Closer Playbook Integration',
    description: 'As the booking coordinates lock, the prospective buyer profile is parsed directly to your physical sales force. We program your physical agents with custom objection matrices, site tour blueprints, and persistent WhatsApp nurture sequences to secure deposits.',
    specs: ['Fully integrated cold call framework guides', 'Emotional tactical sample-flat walking models', 'Objection-reframing quick scriptsheets'],
    kpi: 'REPRESENTATIVE CLOSE CAPACITY',
    kpiValue: '+38% Jump'
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollSectionRef = useRef<HTMLDivElement | null>(null);
  const bookingRef = useRef<HTMLDivElement | null>(null);

  // States to pass down directly into Hologram Canvas
  const [scrollProgressVal, setScrollProgressVal] = useState(0);
  const [activeScrollPhase, setActiveScrollPhase] = useState('showcase');

  // Track the scrolling factor of the custom interactive sticky section
  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
    offset: ['start start', 'end end']
  });

  // Safe frame motion listener to update responsive canvas orbit indices
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgressVal(latest);
    if (latest < 0.18) {
      setActiveScrollPhase('showcase');
    } else if (latest >= 0.18 && latest < 0.42) {
      setActiveScrollPhase('generate');
    } else if (latest >= 0.42 && latest < 0.66) {
      setActiveScrollPhase('ai');
    } else if (latest >= 0.66 && latest < 0.88) {
      setActiveScrollPhase('book');
    } else {
      setActiveScrollPhase('close');
    }
  });

  // Smooth scroll helper for explore CTA button
  const scrollToExplore = () => {
    if (scrollSectionRef.current) {
      scrollSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth scroll to Contact forms
  const scrollToContact = () => {
    if (bookingRef.current) {
      bookingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Contact Form States
  const [formData, setFormData] = useState({ name: '', company: '', phone: '', slots: 'tomorrow' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', company: '', phone: '', slots: 'tomorrow' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#02120d] text-white font-sans selection:bg-[#a3ff00] selection:text-[#02120d]" ref={containerRef}>
      {/* Technical Grid Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(#a3ff00 1px, transparent 1px), linear-gradient(90deg, #a3ff00 1px, transparent 1px)'
        }}
      />
      
      {/* Scanlines Effect */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
          zIndex: 10
        }}
      />

      {/* Sci-Fi Ambient Grid BG Watermark */}
      <div className="absolute inset-0 bg-radial-[circle_at_top,rgba(163,255,0,0.08)_0%,rgba(0,0,0,0)_70%] pointer-events-none" />       {/* Header Foyer navigation rails */}
      <header className="sticky top-0 z-40 bg-[#02120d]/85 backdrop-blur-md border-b border-[#a3ff00]/20">
        <div id="header-container" className="max-w-7xl mx-auto px-4 md:px-8 h-17 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div id="pioneer-logo" className="w-8 h-8 bg-[#a3ff00] rounded-sm rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(163,255,0,0.3)]">
              <div className="w-4 h-4 bg-[#02120d] rounded-sm -rotate-45 flex items-center justify-center font-mono text-[7px] text-[#a3ff00] font-black">
                DM
              </div>
            </div>
            <div>
              <span className="font-sans font-black text-lg uppercase tracking-wider text-white leading-none block">DART MEDIA</span>
              <span className="block text-[8px] text-[#a3ff00] font-mono tracking-[0.25em] uppercase font-bold">SYSTEM.v2.04 // REAL ESTATE</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-mono text-[10px] tracking-[0.2em] text-stone-400 select-none font-bold">
            <a href="#services-sec" className="hover:text-[#a3ff00] transition-colors">_SERVICES</a>
            <a href="#orbital-sec" className="hover:text-[#a3ff00] transition-colors">_THE_SYSTEM</a>
            <a href="#simulator-sec" className="hover:text-[#a3ff00] transition-colors">_AI_PIPELINE</a>
            <a href="#scripts-sec" className="hover:text-[#a3ff00] transition-colors">_PLAYBOOKS</a>
          </nav>

          <button
            id="header-cta-btn"
            onClick={scrollToContact}
            className="h-10 px-6 border border-[#a3ff00] text-[#a3ff00] text-xs font-mono font-bold uppercase tracking-widest bg-[#a3ff00]/5 hover:bg-[#a3ff00] hover:text-[#02120d] rounded-none transition-all duration-300 cursor-pointer"
          >
            BOOK A CALL
          </button>
        </div>
      </header>

      {/* Hero Visual Area */}
      <section className="relative pt-12 pb-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Dynamic decorative radar dot */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#a3ff00]/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute top-48 left-10 w-64 h-64 bg-[#a3ff00]/3 rounded-full filter blur-3xl pointer-events-none" />
 
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content block (L-grid 7-span) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 relative z-10 text-left">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#a3ff00] bg-[#a3ff00]/5 border border-[#a3ff00]/20 p-2 py-1 rounded-sm uppercase animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3ff00] shadow-[0_0_8px_#a3ff00]" />
              INTEGRATED VELOCITY MARKETING SPECIFICATION
            </div>
 
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white uppercase font-sans leading-[0.9] pr-4">
              We Build <span className="text-[#a3ff00]">Real Estate</span> Brands <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>
                That Dominate.
              </span>
            </h1>
 
            <p className="text-stone-300 font-sans text-sm md:text-base leading-relaxed max-w-xl font-normal opacity-80">
              Content. Ads. Websites. AI automation. Sales playbooks. Everything working together in a beautiful, unified technical ecosystem to turn interest into confirmed site visits.
            </p>
 
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-explore-cta"
                onClick={scrollToExplore}
                className="h-12 px-10 bg-[#a3ff00] text-[#02120d] font-black uppercase text-xs tracking-widest cursor-pointer font-mono hover:bg-[#b5ff33] transition-all duration-300 shadow-[0_0_20px_rgba(163,255,0,0.3)] flex items-center justify-center gap-2 rounded-none"
              >
                EXPLORE SYSTEM LAYOUT
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                id="hero-booking-cta"
                onClick={scrollToContact}
                className="h-12 px-10 border border-white/20 text-white hover:text-[#a3ff00] hover:border-[#a3ff00]/50 font-black uppercase text-xs tracking-widest cursor-pointer font-mono transition-all duration-300 flex items-center justify-center gap-1.5 rounded-none hover:bg-white/5"
              >
                BOOK DIAGNOSTIC CALL_
                <ArrowUpRight className="w-4 h-4 text-[#a3ff00] group-hover:text-lime-300" />
              </button>
            </div>
          </div>
 
          {/* Hero Right Visual Static Mockup (L-grid 5-span) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center items-center">
            {/* Ambient radar concentric loops and technical markers */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none">
              <div className="w-80 h-80 rounded-full border border-[#a3ff00]/10 animate-ping duration-10000" />
              <div className="w-[420px] h-[420px] rounded-full border border-white/5" />
              <div className="absolute font-mono text-[7px] text-[#a3ff00]/50 top-0 left-12">GRID_BOUND_V: 142.1</div>
              <div className="absolute font-mono text-[7px] text-[#a3ff00]/50 bottom-12 right-0">HDG: LOCK_OFF</div>
            </div>
 
            {/* A beautiful glowing isometric technical console graphic */}
            <div className="relative w-full max-w-[380px] bg-white/5 border border-white/10 p-5 rounded-sm shadow-2xl backdrop-blur-md z-10 font-mono space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-[10px] font-bold text-white uppercase flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#a3ff00] animate-pulse" />
                  Dart Core Telemetry
                </span>
                <span className="text-[8px] text-[#a3ff00] bg-[#a3ff00]/10 border border-[#a3ff00]/20 px-1.5 py-0.5 rounded-sm font-bold">SYS_OK</span>
              </div>
 
              <div className="space-y-2 text-[10px] text-stone-300">
                <div className="flex justify-between">
                  <span>ORBIT_STATUS</span>
                  <span className="text-[#a3ff00] font-bold uppercase tracking-wider">LOCKED_ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>ORBIT_ALTITUDE</span>
                  <span className="text-stone-300 opacity-80">142.7m (SYS_MAX)</span>
                </div>
                <div className="flex justify-between">
                  <span>SYSTEM_UPTIME</span>
                  <span className="text-[#a3ff00]">48.12.92 HOURS</span>
                </div>
                <div className="flex justify-between">
                  <span>LEADS_CONVERTED</span>
                  <span className="text-white font-bold font-sans">14,293 RECORDS</span>
                </div>
              </div>
 
              {/* Graphical visualizer lines */}
              <div className="h-10 bg-black/40 rounded-sm border border-white/5 p-1 flex items-end gap-1 overflow-hidden">
                <div className="flex-1 bg-[#a3ff00] h-[20%] opacity-80 animate-pulse" />
                <div className="flex-1 bg-[#a3ff00] h-[60%] opacity-80 animate-pulse" style={{ animationDelay: '100ms' }} />
                <div className="flex-1 bg-[#a3ff00] h-[45%] opacity-80 animate-pulse" style={{ animationDelay: '200ms' }} />
                <div className="flex-1 bg-[#a3ff00] h-[80%] opacity-80 animate-pulse" style={{ animationDelay: '300ms' }} />
                <div className="flex-1 bg-[#a3ff00] h-[30%] opacity-80 animate-pulse" style={{ animationDelay: '400ms' }} />
                <div className="flex-1 bg-[#a3ff00] h-[92%] opacity-80 animate-pulse" style={{ animationDelay: '500ms' }} />
              </div>

              <div className="text-center font-mono text-[7.5px] text-white/40 uppercase select-none p-1 border border-dashed border-white/10">
                SCROLL_DOWN_TO_ENGAGE_HUD_ENGINES
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HUD dashboard strip */}
      <section className="bg-white/5 backdrop-blur-md border-y border-white/10 select-none">
        <div id="hud-dashboard-strip" className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-wrap gap-6 md:gap-12 justify-between items-center text-left font-mono">
          <div className="flex items-center gap-2.5 min-w-[140px]">
            <span className="w-1.5 h-1.5 bg-[#a3ff00] rounded-full animate-ping shadow-[0_0_8px_#a3ff00]" />
            <div>
              <span className="block text-[8px] text-[#a3ff00]/70 uppercase tracking-widest font-bold">CONTENT CHANNEL</span>
              <span className="block text-xs font-semibold uppercase text-white">Content Engine: Online</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 min-w-[140px]">
            <span className="w-1.5 h-1.5 bg-[#a3ff00] rounded-full animate-ping shadow-[0_0_8px_#a3ff00]" style={{ animationDelay: '200ms' }} />
            <div>
              <span className="block text-[8px] text-[#a3ff00]/70 uppercase tracking-widest font-bold">ADS CONTROLLERS</span>
              <span className="block text-xs font-semibold uppercase text-white">Ads Engine: Online</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 min-w-[140px]">
            <span className="w-1.5 h-1.5 bg-[#a3ff00] rounded-full animate-ping shadow-[0_0_8px_#a3ff00]" style={{ animationDelay: '400ms' }} />
            <div>
              <span className="block text-[8px] text-[#a3ff00]/70 uppercase tracking-widest font-bold">LLM REWARD LAYER</span>
              <span className="block text-xs font-semibold uppercase text-white">AI Automation: Online</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 min-w-[140px]">
            <span className="w-1.5 h-1.5 bg-[#a3ff00] rounded-full animate-ping shadow-[0_0_8px_#a3ff00]" style={{ animationDelay: '600ms' }} />
            <div>
              <span className="block text-[8px] text-[#a3ff00]/70 uppercase tracking-widest font-bold">PSYCHOLOGY DESK</span>
              <span className="block text-xs font-semibold uppercase text-white">Sales Script: Online</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 min-w-[140px]">
            <span className="w-1.5 h-1.5 bg-[#a3ff00] rounded-full shadow-[0_0_8px_#a3ff00]" />
            <div>
              <span className="block text-[8px] text-[#a3ff00]/70 uppercase tracking-widest font-bold">HUD STAGE COMPOSER</span>
              <span className="block text-xs font-bold uppercase text-[#a3ff00]">Lead Conversion Layer: Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Grid */}
      <section id="services-sec" className="py-24 max-w-7xl mx-auto px-4 md:px-8 text-center space-y-12">
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1 font-mono text-[9px] text-[#a3ff00] bg-[#a3ff00]/5 border border-[#a3ff00]/20 px-2.5 py-1 rounded-sm">
            _INCLUDED SERVICES
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            Twelve Interlocking Growth Channels
          </h2>
          <p className="text-stone-400 text-xs md:text-sm font-sans leading-relaxed opacity-80">
            Most agencies operate in silos. We coordinate creative content, hyper-radius campaigns, autonomous AI responders, and sales objection coaching inside one unified tech ecosystem. Click any card to examine detailed blueprints.
          </p>
        </div>

        {/* 12 Series Cards */}
        <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 4. Scroll Animation Section */}
      <section id="orbital-sec" className="relative" ref={scrollSectionRef}>
        {/* Height wrapper to enable scrolling space logic */}
        <div className="h-[400vh] w-full relative">
          
          {/* Sticky container that locks during scroll */}
          <div className="sticky top-0 h-screen w-full flex flex-col lg:grid lg:grid-cols-12 overflow-hidden bg-gradient-to-b from-[#02120d] to-black z-20">
            
            {/* Sticky Left: Content descriptions shifting as scroll factors update (L-grid 5-span) */}
            <div className="lg:col-span-5 h-[40%] lg:h-full flex flex-col justify-center items-start px-6 md:px-12 py-6 relative z-30 select-none bg-gradient-to-b lg:bg-gradient-to-r from-[#02120d] to-transparent text-left space-y-6">
              
              {/* Backing structural HUD layout */}
              <div className="space-y-2.5">
                <span className="font-mono text-[9px] text-[#a3ff00] tracking-widest uppercase border border-[#a3ff00]/20 bg-[#a3ff00]/5 px-2.5 py-1 rounded-sm font-bold">
                  _SYSTEM PROTOCOLS
                </span>
                
                {/* Visual scrolling numbers */}
                <div className="flex gap-2 items-center font-mono my-2 select-none">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <div 
                      key={idx} 
                      className={`w-5 h-[4px] rounded-full transition-all duration-300 ${
                        idx <= scrollSteps.findIndex(s => s.phase === activeScrollPhase) 
                          ? 'bg-[#a3ff00] shadow-[0_0_8px_#a3ff00]' 
                          : 'bg-white/10'
                      }`} 
                    />
                  ))}
                  <span className="text-[10px] text-[#a3ff00] uppercase ml-2 select-none font-bold">ORBIT PHASE: {scrollProgressVal.toFixed(2)}</span>
                </div>
              </div>

              {/* Steps render loops displaying synchronized section details */}
              <div className="flex-1 flex flex-col justify-center max-w-md relative min-h-[180px] md:min-h-0">
                {scrollSteps.map((step, stepIdx) => {
                  const isActive = step.phase === activeScrollPhase;
                  return (
                    <div
                      key={step.phase}
                      className={`absolute inset-0 flex flex-col justify-center space-y-3.5 transition-all duration-500 transform ${
                        isActive 
                          ? 'opacity-100 translate-y-0 pointer-events-auto' 
                          : 'opacity-0 translate-y-4 pointer-events-none'
                      }`}
                    >
                      <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest font-semibold">{step.tagline}</span>
                      <h3 className="text-2xl md:text-3.5xl font-extrabold tracking-tight text-white uppercase leading-none font-sans">
                        {step.title}
                      </h3>
                      <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-sans opacity-85">
                        {step.description}
                      </p>

                      <div className="space-y-1.5 pt-2">
                        {step.specs.map((item, idX) => (
                          <div key={idX} className="flex items-center gap-2 text-xs font-mono text-[#a3ff00]">
                            <span className="w-1.5 h-1.5 bg-[#a3ff00] rounded-full shadow-[0_0_6px_#a3ff00]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs font-mono">
                        <div>
                          <span className="block text-[8px] text-stone-500">TARGET OUTCOME KPI</span>
                          <span className="text-white font-bold">{step.kpi}</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[8px] text-stone-500">GUARANTEED_MIN</span>
                          <span className="text-[#a3ff00] font-bold text-shadow shadow-sm">{step.kpiValue}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Instructional footer helper */}
              <div className="pt-4 border-t border-white/10 font-mono text-[8px] text-stone-500 uppercase tracking-wider hidden lg:block select-none pointer-events-none">
                _CONTINUE_SCROLLING_TO_ORBIT_DRONE // ALT_BOUNDS: LOCKED_OK
              </div>
            </div>

            {/* Sticky Right: The magnificent 3D Hologram (L-grid 7-span) */}
            <div className="lg:col-span-7 h-[60%] lg:h-full relative bg-[#010706]">
              <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.95)_100%] z-10 pointer-events-none" />
              <HologramCanvas scrollProgress={scrollProgressVal} activePhase={activeScrollPhase} />
            </div>

          </div>
        </div>
      </section>

      {/* 5. AI automation section */}
      <section id="simulator-sec" className="py-24 max-w-7xl mx-auto px-4 md:px-8 border-y border-white/10 relative">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#a3ff00]/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-2xl text-left mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-[9px] text-[#a3ff00] bg-[#a3ff00]/5 border border-[#a3ff00]/20 px-2.5 py-1.5 rounded-sm uppercase animate-pulse font-bold">
            <Cpu className="w-3.5 h-3.5" />
            II. LEAD WORKFLOW SIMULATOR
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            AI-Driven Inquiry Capture
          </h2>
          <p className="text-stone-400 text-xs md:text-sm font-sans opacity-85">
            No more waiting on human sales teams to check messages. Our AI responds instantly, qualifies buyer asset readiness, and routes live verified site tour requests onto your reps calendars automatically.
          </p>
        </div>

        {/* AI Simulator Frame Panel */}
        <AIAutomationSimulator />
      </section>

      {/* 6. Sales script playbook section */}
      <section id="scripts-sec" className="py-24 max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#a3ff00]/4 rounded-full filter blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-2xl text-left mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-[9px] text-[#a3ff00] bg-[#a3ff00]/5 border border-[#a3ff00]/20 px-2.5 py-1.5 rounded-sm uppercase font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            III. SALES PERSUASION SUITE
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            The Closer Playbook Suite
          </h2>
          <p className="text-stone-400 text-xs md:text-sm font-sans leading-relaxed opacity-85">
            Traffic and leads only create opportunities. Value closes transactions. We provide complete, pre-programmed script sheets, tactile walk-through templates, objection response frames, and automated WhatsApp drips to push prospects straight to deposits.
          </p>
        </div>

        {/* Sales playbooks container tab framework */}
        <SalesScriptSuite />
      </section>

      {/* 7. Final CTA Contact Session */}
      <section id="contact-sec" ref={bookingRef} className="py-24 max-w-7xl mx-auto px-4 md:px-8 border-t border-white/10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#a3ff00]/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Block (L-grid 6-span) */}
          <div className="lg:col-span-6 text-left space-y-6 md:space-y-8">
            <span className="inline-flex items-center gap-2 font-mono text-[9px] text-[#a3ff00] border border-[#a3ff00]/20 bg-[#a3ff00]/5 px-2.5 py-1.5 rounded-sm uppercase font-bold">
              <Calendar className="w-3.5 h-3.5" />
              SYSTEM_CONVERSION_GATEWAY_ONLINE
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[0.95] font-sans">
              Stop Wasting <br />
              <span className="text-[#a3ff00]">
                Real Estate Leads.
              </span>
            </h2>

            <p className="text-stone-300 font-sans text-sm md:text-base leading-relaxed opacity-85">
              Build a complete project marketing system that creates structural desire, captures verified inquiries, and converts prospects into site visits safely. Speak with our growth engineering desk to install the Dart System.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-5 h-5 text-[#a3ff00] mt-0.5" />
                <div>
                  <span className="block text-white font-semibold font-sans">EASY INSTALLATION</span>
                  <span className="text-stone-400 font-sans text-[11px] opacity-80">Deploy within 21 business days natively.</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-5 h-5 text-[#a3ff00] mt-0.5" />
                <div>
                  <span className="block text-white font-semibold font-sans">GUARANTEED PIPELINE</span>
                  <span className="text-stone-400 font-sans text-[11px] opacity-80">Pre-programmed automated metrics dashboards.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right contact Booking Form Panel (L-grid 6-span) */}
          <div className="lg:col-span-6">
            <div className="bg-[#02120d]/75 border border-[#a3ff00]/20 p-6 md:p-8 rounded-none relative overflow-hidden backdrop-blur-md">
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-grid-white/[0.012] pointer-events-none" />

              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="block font-mono text-[8px] text-[#a3ff00] font-bold">CONNECT_TERMINAL_INPUT</span>
                  <span className="block text-sm font-bold font-sans text-white uppercase">Dart Integration Form</span>
                </div>
                <div className="w-2.5 h-2.5 bg-[#a3ff00] rounded-full animate-pulse shadow-[0_0_8px_#a3ff00]" />
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center text-sm font-mono space-y-4 animate-fade-in select-none">
                  <div className="w-12 h-12 rounded-full bg-[#a3ff00]/20 border border-[#a3ff00] flex items-center justify-center mx-auto text-[#a3ff00]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans font-bold text-lg text-white uppercase">Integration Submission Secured</h4>
                  <p className="text-xs text-stone-400 font-sans">
                    Your request was synchronized with the developer dashboard safely. An AI coordinator will send floorplan prospectus guidelines to your terminal within 3 minutes.
                  </p>
                  <span className="block text-[8px] text-[#a3ff00]/70 tracking-[0.3em] font-mono animate-pulse">SECURE_HANDSHAKE_COMPLETED_200</span>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
                  <div className="space-y-1.5 text-left font-mono">
                    <label id="lbl-form-name" className="block text-[9px] text-[#a3ff00]/85 uppercase tracking-wider font-bold">I. DEVELOPER DESIGNATION NAME</label>
                    <input
                      id="input-form-name"
                      type="text"
                      required
                      placeholder="e.g., Sarah Jenkins, Acquisitions VP"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 bg-black/40 border border-white/10 hover:border-[#a3ff00]/40 rounded-none px-4 text-stone-200 outline-none focus:border-[#a3ff00]/70 transition-all duration-300 font-sans text-[11px]"
                    />
                  </div>

                  <div className="space-y-1.5 text-left font-mono font-semibold">
                    <label id="lbl-form-company" className="block text-[9px] text-[#a3ff00]/85 uppercase tracking-wider font-bold">II. ENTERPRISE GROUP NAME</label>
                    <input
                      id="input-form-company"
                      type="text"
                      required
                      placeholder="e.g., Summit Peak Estates"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full h-11 bg-black/40 border border-white/10 hover:border-[#a3ff00]/40 rounded-none px-4 text-stone-200 outline-none focus:border-[#a3ff00]/70 transition-all duration-300 font-sans text-[11px]"
                    />
                  </div>

                  <div className="space-y-1.5 text-left font-mono font-semibold">
                    <label id="lbl-form-phone" className="block text-[9px] text-[#a3ff00]/85 uppercase tracking-wider font-bold">III. CONVERSATIONAL DIRECT PHONE (WHATSAPP)</label>
                    <input
                      id="input-form-phone"
                      type="tel"
                      required
                      placeholder="e.g., +1 (555) 482-9102"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 bg-black/40 border border-white/10 hover:border-[#a3ff00]/40 rounded-none px-4 text-stone-200 outline-none focus:border-[#a3ff00]/70 transition-all duration-300 font-mono text-[11px]"
                    />
                  </div>

                  <div className="space-y-1.5 text-left font-mono font-semibold">
                    <label id="lbl-form-slots" className="block text-[9px] text-[#a3ff00]/85 uppercase tracking-wider font-bold">IV. DISCOVERY CALL TIMESLOT SECTOR</label>
                    <select
                      id="input-form-slots"
                      value={formData.slots}
                      onChange={(e) => setFormData({ ...formData, slots: e.target.value })}
                      className="w-full h-11 bg-black/40 border border-white/10 hover:border-[#a3ff00]/40 rounded-none px-4 text-stone-300 outline-none focus:border-[#a3ff00]/70 transition-all duration-300 font-sans text-[11px] select-none"
                    >
                      <option value="tomorrow">TOMORROW AFTERNOON // 2:00 PM - 5:00 PM</option>
                      <option value="saturday">SATURDAY AM LIVE // 10:00 AM - 12:00 PM</option>
                      <option value="next_week">URGENT BRIEFING // NEXT BUSINESS DAY AM</option>
                    </select>
                  </div>

                  <button
                    id="submit-contact-form"
                    type="submit"
                    className="w-full h-11 bg-[#a3ff00] text-[#02120d] font-black uppercase text-xs tracking-widest font-mono hover:bg-[#b5ff33] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 pt-0.5 shadow-[0_0_15px_rgba(163,255,0,0.2)] rounded-none"
                  >
                    DEPLOY DART GROWTH SYSTEM_
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer System Rails */}
      <footer className="bg-[#02120d] border-t border-white/10 py-12 text-stone-500 text-xs font-mono select-none">
        <div id="footer-container" className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#a3ff00] rounded-full shadow-[0_0_6px_#a3ff00]" />
            <span>DART_MEDIA_GROWTH_SYSTEM © 2026 // ALL PERMISSIONS LATEST SECURE</span>
          </div>

          <div className="flex gap-8 text-[10px]">
            <span>LATITUDE_COMPLIANT: USA:EAST:3000</span>
            <span>DATA CODES CHECKED: OK</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
