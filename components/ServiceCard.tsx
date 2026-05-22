'use client';

import React, { useState } from 'react';
import * as Lucide from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  iconName: keyof typeof Lucide;
  metric: string;
  metricLabel: string;
  description: string;
  technicalCode: string;
  blueprintDetail: {
    title: string;
    description: string;
    deliverables: string[];
    technicalStack: string;
  };
}

export const servicesData: ServiceItem[] = [
  {
    id: 'graphics',
    title: 'Graphics & Social Creatives',
    iconName: 'Palette',
    metric: '4.8% CTR',
    metricLabel: 'Industry Avg: 1.2%',
    description: 'Stop-the-scroll thumb stopping renders and typography systems optimized for direct-response real estate ads.',
    technicalCode: 'DART_SYS.MEDIA_GRAPH_01',
    blueprintDetail: {
      title: 'Attention Direct-Response Creative Engine',
      description: 'Creating high-fidelity social media graphic systems incorporating oversized white typography and architectural visual grids that convey extreme premium quality.',
      deliverables: ['Custom visual design templates', 'Interactive static and ad layouts', 'High-contrast typography guideline'],
      technicalStack: 'Direct Response Creative Framework v4',
    },
  },
  {
    id: 'drone',
    title: 'Autonomous Drone Shoots',
    iconName: 'Compass',
    metric: '100% Orbit',
    metricLabel: 'Precision FPV Sweep',
    description: 'High-speed FPV drone orbits and cinematic flight paths designed to map construction progress and luxury scale.',
    technicalCode: 'DART_SYS.DRN_FLIGHT_02',
    blueprintDetail: {
      title: 'Geospatial FPV Drone Capture',
      description: 'Pre-programmed GPS flight paths combined with dynamic indoor/outdoor FPV aerobatic flyhroughs highlighting site dimensions.',
      deliverables: ['4K FPV flythrough loops', 'High-altitude ortho-mosaic mapping', 'Dynamic elevation parallax footage'],
      technicalStack: 'Autonomous GPS Waypoint Flight Controller',
    },
  },
  {
    id: 'videography',
    title: 'Cinematic Videography',
    iconName: 'Video',
    metric: '92% Retention',
    metricLabel: 'Hooked in first 3s',
    description: 'Premium masterclass videography for project site tours, surrounding neighborhood lifestyle, and developer heritage storytelling.',
    technicalCode: 'DART_SYS.CIN_VIDEO_03',
    blueprintDetail: {
      title: 'Structural Architecture Cinematic Filming',
      description: 'Masterfully edited video tours that elevate luxury brick-and-mortar into digital masterworks, driving emotional buyer desire.',
      deliverables: ['Full length project launch films', 'Reels / Shorts high-retaining edits', 'Executive developer interviews'],
      technicalStack: 'Cinematic Anamorphic Sensor Suite',
    },
  },
  {
    id: 'photography',
    title: 'High-End Photography',
    iconName: 'Camera',
    metric: '60+ Renders',
    metricLabel: 'Ultra high-res layouts',
    description: 'Architectural, interior, and lifestyle photography captured with precision lighting setup and luxury exposure bracketings.',
    technicalCode: 'DART_SYS.ARCH_PHOTO_04',
    blueprintDetail: {
      title: 'HDR Architecture Exposure System',
      description: 'High dynamic range bracketing mapping the precise interior natural light flow, highlighting luxury materials and dimensions.',
      deliverables: ['Interior walkthrough catalog photos', 'Aerial masterplan panoramas', 'Dawn/Twilight high-contrast exterior photography'],
      technicalStack: 'HDR Exposure Bracketing Multi-Pass Processing',
    },
  },
  {
    id: 'video_editing',
    title: 'Micro-Retention Video Editing',
    iconName: 'Film',
    metric: '+240% Share',
    metricLabel: 'Viral distribution loop',
    description: 'Fast-paced storytelling with soundscapes, typography tracks, and color grading tuned to hold user attention throughout the full clip.',
    technicalCode: 'DART_SYS.RE_EDITING_05',
    blueprintDetail: {
      title: 'High-Pass Retention Audio/Visual Editing',
      description: 'Tuning raw footage with high-fidelity sound-design (wooshes, visual cues) and neon-grid styled layout templates for high algorithmic engagement.',
      deliverables: ['Viral-retaining vertical ad edits', 'Atmospheric cinematic color gradings', 'Foley and high-impact sound design assets'],
      technicalStack: 'Direct Attention Retaining Timeline Controls',
    },
  },
  {
    id: 'visuals_3d',
    title: '3D Artist Visualizations',
    iconName: 'Layers',
    metric: '99.8% Perfect',
    metricLabel: 'Photorealistic precision',
    description: 'CGI, interior walkthrough fly-throughs, and structural blueprints converted into immersive pre-built luxury vistas.',
    technicalCode: 'DART_SYS.CGI_WIRE_06',
    blueprintDetail: {
      title: 'Ultra-Fidelity Photorealistic CGI',
      description: 'Translating CAD vectors into photorealistic materials, landscaping animations, and sun-angle shadow matching diagrams.',
      deliverables: ['3D animated exterior walkthroughs', 'Interactive 360-degree unit tours', 'High-contrast raw render plates'],
      technicalStack: 'Ray-Traced Architectural Shader Arrays',
    },
  },
  {
    id: 'meta_ads',
    title: 'Hyper-Targeted Meta Ads',
    iconName: 'TrendingUp',
    metric: '6.4x ROAS',
    metricLabel: 'Direct inquiry conversions',
    description: 'Custom-built real estate campaign architectures utilizing interest stacks and local demographic radius target lock bounds.',
    technicalCode: 'DART_SYS.ADS_ENGINE_07',
    blueprintDetail: {
      title: 'Target Lock Buyer Acquisition Ads',
      description: 'Optimized Meta campaign arrays matching custom local demographics with high-intent direct call-to-action triggers to capture qualified contact records immediately.',
      deliverables: ['Advanced demographics radius maps', 'A/B dynamic creative variants', 'Direct lead webhook sync channels'],
      technicalStack: 'Direct Match Conversion Integrations v2',
    },
  },
  {
    id: 'emails',
    title: 'Nurture Campaign Automation',
    iconName: 'Send',
    metric: '44% Open Rate',
    metricLabel: 'Industry Avg: 15%',
    description: 'Automated email story flows that educate, generate prestige around the building, and drip project development highlights.',
    technicalCode: 'DART_SYS.MAIL_NU_08',
    blueprintDetail: {
      title: 'High-LTV Email Story Sequences',
      description: 'Direct copywriting flows that guide potential investors through the development phases, ROI models, and floorplan advantages, cultivating high buyer trust.',
      deliverables: ['9-stage automated investor sequences', 'Weekly construction update journals', 'Interactive VIP pricing catalog triggers'],
      technicalStack: 'Dynamic User Segmentation Mail Pipeline',
    },
  },
  {
    id: 'landing_page',
    title: 'Conversion Websites',
    iconName: 'Globe',
    metric: '8.4% Booking',
    metricLabel: 'Industry Avg: 1.8%',
    description: 'Extreme-speed websites and interactive floorplan explorers featuring glowing lime accents, custom maps, and direct Booking funnels.',
    technicalCode: 'DART_SYS.WEB_HOST_09',
    blueprintDetail: {
      title: 'Next-Generation Unit Explorer Web System',
      description: 'Ultra-fast Next.js based landing pages with embedded coordinates, interactive maps, and responsive form integrations driving rapid inquiries.',
      deliverables: ['Next.js App Router landing spaces', 'Digital vector interactive building plan', 'Direct sales booking system modules'],
      technicalStack: 'React Next.js App Router + Tailwind CSS Engine',
    },
  },
  {
    id: 'ai_inquiries',
    title: 'AI Inquiry Automations',
    iconName: 'Bot',
    metric: '2.5s Reply',
    metricLabel: '24/7/365 Qualification',
    description: 'Automated AI agents that instantly respond to WhatsApp, SMS, and Instagram inquiries, qualify leads, and suggest site visits.',
    technicalCode: 'DART_SYS.AI_REPLY_10',
    blueprintDetail: {
      title: 'Instant-Qualification Conversational Intelligence',
      description: 'State-of-the-art multilingual real estate AI agents trained to outline floor availabilities, answer pricing and community rules, and secure immediate site visits.',
      deliverables: ['Integrated WhatsApp/Instagram AI agent', 'Qualifying logic dialog tree rules', 'Real-time booking trigger webhooks'],
      technicalStack: 'Gemini LLM Prompting & Function Binding API',
    },
  },
  {
    id: 'dm_followup',
    title: 'DM Follow-Up Automation',
    iconName: 'MessageSquareCode',
    metric: '92% Contact',
    metricLabel: 'Never lose an ad lead',
    description: 'Immediate WhatsApp auto-initiation and automated check-ins scheduled to nudge cooler leads and reactive inactive prospects.',
    technicalCode: 'DART_SYS.NUDGE_BOT_11',
    blueprintDetail: {
      title: 'Auto-Trigger Lead Recycler',
      description: 'Intelligent DM flows that initiate follow-ups precisely 2 hours, 24 hours, and 5 days after lead inactivity, guaranteeing zero lead drop-offs.',
      deliverables: ['Instant follow-up nudge sequences', 'Custom multi-channel chat routing', 'Failed-handshake automated alerts'],
      technicalStack: 'Event-Driven Real-time Nudge Webhooks',
    },
  },
  {
    id: 'sales_scripts',
    title: 'Sales Team Script Packs',
    iconName: 'FileText',
    metric: '+38% Close',
    metricLabel: 'Boosts team efficiency',
    description: 'Hyper-tuned cold calling models, site visit templates, objection solvers, and WhatsApp conversational flow packs.',
    technicalCode: 'DART_SYS.SCRIPTS_12',
    blueprintDetail: {
      title: 'Developer Close Playbook Framework',
      description: 'Tactical psychological conversational path scripts that train your sales agents to handle real estate skepticisms, outline construction quality, and trigger deposits.',
      deliverables: ['Cold call trigger playbook', 'Site visit physical walkthrough tour script', 'Objection-response fast matrices'],
      technicalStack: 'Real Estate Sales Psychology Playbooks',
    },
  },
];

export default function ServiceCard({ service }: { service: ServiceItem }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Dynamically resolve the Lucide component
  const IconComponent = (Lucide[service.iconName] as React.ComponentType<{ className?: string }>) || Lucide.HelpCircle;

  return (
    <>
      <div
        id={`service-card-${service.id}`}
        onClick={() => setIsOpen(true)}
        className="group relative bg-[#02120d]/75 backdrop-blur-md border border-white/10 hover:border-[#a3ff00]/60 rounded-none p-5 cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(163,255,0,0.15)] flex flex-col justify-between h-48 select-none overflow-hidden"
      >
        {/* Subtle high-tech diagonal grid line overlay */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#a3ff00]/10 to-transparent pointer-events-none transition-transform duration-500 group-hover:scale-150 rotate-45" />
        <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-tr from-[#a3ff00]/3 to-transparent pointer-events-none rounded-full" />

        {/* Card Header information */}
        <div>
          <div className="flex justify-between items-start mb-3">
            <div id={`icon-wrapper-${service.id}`} className="p-2 border border-[#a3ff00]/20 bg-[#a3ff00]/5 rounded-none text-[#a3ff00] group-hover:text-white group-hover:bg-[#a3ff00]/20 group-hover:border-[#a3ff00]/40 transition-colors">
              <IconComponent className="w-5 h-5" />
            </div>
            <span className="font-mono text-[8px] text-stone-500 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded-none">
              {service.technicalCode}
            </span>
          </div>

          <h3 className="font-sans font-semibold text-sm text-white group-hover:text-[#a3ff00] transition-colors uppercase tracking-tight">
            {service.title}
          </h3>
          <p className="font-sans text-stone-400 text-xs mt-1.5 line-clamp-2 leading-relaxed opacity-85">
            {service.description}
          </p>
        </div>

        {/* Core performance parameter / metric */}
        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-end font-mono">
          <div>
            <span className="block text-[8px] text-[#a3ff00]/70 tracking-wider">KPI OUTCOME</span>
            <span className="text-[#a3ff00] text-xs font-bold font-mono tracking-tighter uppercase">{service.metric}</span>
          </div>
          <div className="text-right">
            <span className="block text-[7px] text-stone-500 font-medium">BENCHMARK</span>
            <span className="text-stone-400 text-[9px] font-sans font-medium">{service.metricLabel}</span>
          </div>
        </div>

        {/* Technical bottom indicator border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 group-hover:bg-[#a3ff00] transition-all duration-300" />
      </div>

      {isOpen && (
        <div
          id={`service-modal-${service.id}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            id={`service-modal-panel-${service.id}`}
            className="relative w-full max-w-2xl bg-[#02120d] border border-white/10 rounded-none p-6 md:p-8 overflow-hidden shadow-[0_0_35px_rgba(163,255,0,0.15)] flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tech grid framing overlay */}
            <div className="absolute inset-0 bg-grid-white/[0.015] pointer-events-none" />
            <div className="absolute top-4 right-4 flex items-center gap-3">
              <span className="font-mono text-[8.5px] text-[#a3ff00] bg-[#a3ff00]/10 border border-[#a3ff00]/20 px-2 py-1 rounded-none uppercase font-bold tracking-wider">
                STATUS: DEPLOY_READY
              </span>
              <button
                id={`close-modal-${service.id}`}
                onClick={() => setIsOpen(false)}
                className="p-1 px-2.5 text-xs text-stone-400 border border-white/10 hover:border-[#a3ff00]/35 hover:text-white transition rounded-none font-mono"
              >
                [ESC_CLOSE]
              </button>
            </div>

            {/* Blueprint Header */}
            <div className="border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-2.5 text-[#a3ff00] mb-2 font-mono text-[10px] font-bold">
                <IconComponent className="w-4 h-4" />
                <span>{service.technicalCode} - SERVICE SPECIFICATION SHEET</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black font-sans text-white uppercase tracking-tight">
                {service.blueprintDetail.title}
              </h2>
            </div>

            {/* Blueprint Content Sections */}
            <div className="space-y-5 overflow-y-auto pr-1 flex-1 text-sm md:text-base leading-relaxed text-stone-300">
              <div>
                <h4 className="text-[10px] font-mono text-[#a3ff00] uppercase tracking-widest mb-1.5 font-bold">I. FUNCTIONAL OVERVIEW</h4>
                <p className="text-xs text-stone-300 leading-relaxed bg-black/45 p-3 border-l-2 border-[#a3ff00] rounded-none font-sans opacity-90">
                  {service.blueprintDetail.description}
                </p>
              </div>

              <div>
                <h4 className="text-[10px] font-mono text-[#a3ff00] uppercase tracking-widest mb-1.5 font-bold">II. CORE ARCHITECTURAL DELIVERABLES</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {service.blueprintDetail.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white/5 border border-white/10 p-2.5 rounded-none font-sans">
                      <span className="text-[#a3ff00] font-mono font-bold">[{idx + 1}]</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[10px] font-mono text-[#a3ff00] uppercase tracking-widest mb-1 font-bold">III. ENGINE KPI MATRIX</h4>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-none">
                    <div className="flex justify-between items-center text-xs mb-1.0">
                      <span className="text-stone-400 font-sans">DART ESTIMATE SYSTEM RATE</span>
                      <span className="text-[#a3ff00] font-mono font-bold uppercase">{service.metric}</span>
                    </div>
                    {/* Visual Progress Bar element */}
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#a3ff00] shadow-[0_0_8px_#a3ff00] rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono text-[#a3ff00] uppercase tracking-widest mb-1 font-bold">IV. PROPRIETARY SYSTEM LAYER</h4>
                  <div className="bg-black/50 border border-white/10 p-3 rounded-none font-mono text-[9.5px] text-[#a3ff00] uppercase tracking-wide">
                    {service.blueprintDetail.technicalStack}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Graphic Frame */}
            <div className="border-t border-white/10 pt-4 mt-5 flex justify-between items-center select-none font-mono text-[9px] text-stone-500">
              <span>DART INTEL SPEC © 2026</span>
              <span>CLASSIFIED DEVELOPER METRIC SYSTEM</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
