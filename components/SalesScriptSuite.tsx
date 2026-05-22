'use client';

import React, { useState } from 'react';
import { Play, Copy, CheckSquare, MessageSquare, ShieldAlert, Check, HelpCircle, FileText } from 'lucide-react';

interface ScriptLine {
  role: string;
  text: string;
  intentTag: string;
  intentColor: string;
  intentExplanation: string;
}

interface ScriptTab {
  id: string;
  title: string;
  iconName: string;
  headline: string;
  summary: string;
  payload: {
    overview: string;
    lines?: ScriptLine[];
    matrices?: { objection: string; reply: string; tactic: string }[];
    templates?: { trigger: string; template: string; goal: string }[];
  };
}

const scriptTabs: ScriptTab[] = [
  {
    id: 'call',
    title: 'Discovery Call',
    iconName: 'Play',
    headline: 'Transitioning Leads to Appointments in Under 3 Minutes',
    summary: 'The cold/warm call architecture optimized to qualify and guide online ad leads toward a physical layout preview.',
    payload: {
      overview: 'This script intercepts the lead while their cognitive attention is peak. It is structured around structural qualification, establishing developer prestige, and forcing the site visit.',
      lines: [
        {
          role: 'DART AGENT',
          text: '“Hi Sarah, this is Christopher from the Dart Tower executive client desk. I received your digital reservation request regarding our 3-bedroom corner floorplans. First off, congratulations on locking in early-stage access.”',
          intentTag: 'PRESTIGE / PATTERN INTERRUPT',
          intentColor: 'border-lime-500/50 bg-lime-950/20 text-lime-400',
          intentExplanation: 'By immediately framed as an “executive desk” and congratulating them on "locking in early-stage access", you instantly shift the dynamic from salesperson to a prestige consultant.'
        },
        {
          role: 'BUYER',
          text: '“Oh, thank you. Yes, I saw your ad. I wanted to check the pricing. What are the starting rates for high floor units?”',
          intentTag: 'PRICE RESISTANCE TAG',
          intentColor: 'border-orange-500/50 bg-orange-950/20 text-orange-400',
          intentExplanation: 'Buyers ask for price first to quickly bucket your product and hang up. Refuse to give a cold flat rate without contextual value framing.'
        },
        {
          role: 'DART AGENT',
          text: '“I have those details prepped for you! Floor configurations range depending on corner layouts and unobstructed water exposure. To make sure I quote your specific preferences, are you viewing this tower primarily as a diversification asset for rental yield, or is it a personal multi-generational residency?”',
          intentTag: 'CONVERSATIONAL PIVOT',
          intentColor: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-400',
          intentExplanation: 'Acknowledging the pricing inquiry but immediately pivoting to qualification questions. This maintains conversational authority and reveals buyer intent.'
        },
        {
          role: 'DART AGENT',
          text: '“Perfect. We actually have an exclusive, private walkthrough of our physical sample apartment mock-ups and panoramic models scheduled this coming Saturday. We only host two selected portfolios an hour to keep the experience private. I have a VIP slot available either at 11:00 AM or 3:00 PM. Which works best with your schedule?”',
          intentTag: 'ASSUMPTIVE CHRONO CLOSE',
          intentColor: 'border-emerald-500/50 bg-emerald-950/15 text-emerald-400',
          intentExplanation: 'Providing an assumptive binary choice (11:00 AM vs 3:00 PM) framed by scarcity (two portfolios an hour) makes scheduling comfortable, natural, and highly prioritized.'
        }
      ]
    }
  },
  {
    id: 'visit',
    title: 'Site Walkthrough',
    iconName: 'CheckSquare',
    headline: 'The Emotional Path: Creating Sensory Ownership',
    summary: 'Chronicles the physical walkthrough process – guiding potential buyers from the layout grid directly into deposit commitment.',
    payload: {
      overview: 'A site tour is not a structural feature-dump. Your job is to physically guide the client around the mock-up, helping them visually project their personal or financial future into the brick-and-mortar space.',
      lines: [
        {
          role: 'DART AGENT',
          text: '“As you step onto this wrap-around terrace, I want you to notice the physical span. We purposefully used 11-foot floor-to-ceiling glass grids to make sure the sunrise water horizon is the actual wall of your living room.”',
          intentTag: 'ESTABLISHING SENSORY OWNERSHIP',
          intentColor: 'border-lime-500/50 bg-lime-950/20 text-lime-400',
          intentExplanation: 'Notice the command “I want you to notice”. It directs the buyer’s spatial tracking and links sensory visuals (sunrise water horizon) directly to luxury physical scale.'
        },
        {
          role: 'DART AGENT',
          text: '“Typically, traditional developers cut costs on the partition frames. We opted for premium solid acoustic-isolation drywalls throughout. If you feel this surface, you can feel the sound-dampening index scale. You are getting complete corporate-grade silence 42 floors up.”',
          intentTag: 'TACTILE VALUE-ANCHOR',
          intentColor: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-400',
          intentExplanation: 'Leading the buyer to touch the physical surfaces and comparing it against "traditional developers cutting costs" establishes extreme material value superiority.'
        },
        {
          role: 'DART AGENT',
          text: '“We are currently taking expressions of interest on the high-floor corner indices. Only three units remain under our interest-neutral 15/85 payment subvention plan. Let’s sit down in the lounge, examine the structural blueprints, and see if we can secure your preferred view level before the token window closes.”',
          intentTag: 'NATURAL CLOSING TRANSITION',
          intentColor: 'border-emerald-500/50 bg-emerald-950/15 text-emerald-400',
          intentExplanation: 'A logical progression: Transition the client from the walk-through area back to the closing desk, anchored by scarcity (only three units left under the 15/85 payment program).'
        }
      ]
    }
  },
  {
    id: 'objections',
    title: 'Objection Matrix',
    iconName: 'ShieldAlert',
    headline: 'Pre-Empting Skepticism with Dynamic Reframing',
    summary: 'The analytical table outlining developer response logic for high-frequency direct objection hurdles.',
    payload: {
      overview: 'Objections are not red lights. They are simply flags indicating a lack of value confidence or safety clarification. Reframe the objection into a reason to buy.',
      matrices: [
        {
          objection: '“Your pricing is 15% higher than the competitor skyscraper across the avenue.”',
          tactic: 'PREMIUM QUALITY ANCHORING',
          reply: '“We understand completely, David. On paper, the prices seem comparable. However, the competitor features hollow drywall partitions with standard 8ft door headers. Dart Tower incorporates structural monolithic post-tension concrete cores and high-grade 11ft glass spans. The competitor pricing is lower because their structural material lifecycle is shortened. We build for generational wealth preservation. Would you prefer a lower up-front rate, or structural engineering that preserves property asset valuation?”'
        },
        {
          objection: '“The real estate market is peaking. I should wait for a structural correction.”',
          tactic: 'INFLATION / RE-CONSTRUCT ADVANTAGE',
          reply: '“Fascinating perspective. In a standard cyclical retail market, waiting might yield benefits. However, with our VIP early-stage subvention, you lock in today’s pre-excavation square-footage rate while only putting down 15%. Over the next 3 years of construction, you carry zero debt exposure while your asset benefits from compounding developer progression. Waiting means buying at completed retail rates. By locking today, you capture the peak developer capital appreciation.”'
        },
        {
          objection: '“I need to review these floorplans with my board / family before deciding.”',
          tactic: 'DEPOSIT DE-RISK FRAME',
          reply: '“That is highly sensible. Family alignment on global assets is crucial. However, our launch tier reservations close this evening, and we have multiple site visits scheduled tomorrow for this exact corner column. What we usually do for our high-profile clients is secure this unit with a fully refundable 3% reservation token. This places the inventory offline for 5 days. You can present the layout to your board tomorrow safely. If they object, we return the token immediately. Shall we protect your position first?”'
        }
      ]
    }
  },
  {
    id: 'followup',
    title: 'Inbox Nurture',
    iconName: 'MessageSquare',
    headline: 'High-Converting Text & WhatsApp Campaign Templates',
    summary: 'Pre-written, short-form messaging templates optimized for high response rates on mobile messenger networks.',
    payload: {
      overview: 'Never follow up with boring text blocks like "Hey, just checking in!" It adds zero value. Always offer micro construction updates, layout opportunities, or market updates.',
      templates: [
        {
          trigger: '24-Hours Post Discovery Call',
          goal: 'Secure Scheduling Handshake',
          template: '“Hi [First Name], Christopher here from Dart Tower. I was sharing your search specs with our engineering team this morning—they confirmed that unit 34-F has the unobstructed sunrise harbor angle you preferred. I’ve held the layout details on my desk. Do you have 2 minutes for a brief call to see if this matches your schedule?”'
        },
        {
          trigger: 'Construction Progression Update (Monthly)',
          goal: 'Build Social Proof & Momentum',
          template: '“⚡ Dart Tower Update: Level 12 core concrete pour is officially complete! 🏗️ Property valuations in this sector have just shown a +4.2% quarterly uptick. I have attached a 30-second drone sweep showing the panoramic view from Level 12 so you can visualize the horizon rise. Let me know if you want to swing by for a coffee on-site this week.”'
        },
        {
          trigger: 'The "Ghosting" Lead Re-Engage',
          goal: 'Forced Decision Re-activation',
          template: '“Hi [First Name], are you still exploring property assets in the Coastal District, or has your portfolio shifted directions for Q3? Let me know so I can release the subvention priority allocation on your account.”'
        }
      ]
    }
  }
];

export default function SalesScriptSuite() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [copiedTextIdx, setCopiedTextIdx] = useState<number | null>(null);
  const [hoveredAnnotation, setHoveredAnnotation] = useState<string | null>(null);
  const currentTab = scriptTabs[activeTabIdx];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedTextIdx(index);
    setTimeout(() => setCopiedTextIdx(null), 2000);
  };

  return (
    <div id="sales-playbook-suite" className="bg-[#011c14]/90 border border-emerald-950 hover:border-emerald-900 rounded-sm p-6 md:p-8 relative overflow-hidden backdrop-blur-md select-none transition-all duration-300">
      {/* Sci-Fi Decorative Grid lines */}
      <div className="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-lime-500/30 to-transparent" />
      <div className="absolute top-0 left-0 w-[1px] h-32 bg-gradient-to-b from-lime-500/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-lime-500/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[1px] h-32 bg-gradient-to-t from-lime-500/10 to-transparent" />

      {/* Playbook Header info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-emerald-950 pb-6 mb-6">
        <div>
          <span className="block font-mono text-[9px] text-lime-400 tracking-wider uppercase mb-1 font-bold">PROPRIETARY SALES TEAM LAYER</span>
          <h3 className="text-xl md:text-2xl font-bold font-sans uppercase text-white tracking-tight">
            We Don’t Just Bring Leads. We Help Close Them.
          </h3>
          <p className="text-stone-400 text-xs md:text-sm font-sans mt-1">
            Every Dart Media growth installation includes complete, psychologically optimized developer script frameworks.
          </p>
        </div>

        {/* Tab switch buttons */}
        <div id="script-tab-row" className="flex flex-wrap items-center gap-2 bg-black/60 border border-emerald-950 p-1 rounded-sm w-full md:w-auto">
          {scriptTabs.map((tab, idx) => (
            <button
              id={`tab-trigger-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTabIdx(idx)}
              className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-[2px] font-mono text-[10px] uppercase font-bold tracking-tight transition flex items-center justify-center gap-1.5 ${
                activeTabIdx === idx 
                  ? 'bg-lime-500 text-black' 
                  : 'text-emerald-500 hover:text-lime-400 hover:bg-emerald-950/20'
              }`}
            >
              {tab.id === 'call' && <Play className="w-3 h-3" />}
              {tab.id === 'visit' && <CheckSquare className="w-3 h-3" />}
              {tab.id === 'objections' && <ShieldAlert className="w-3 h-3" />}
              {tab.id === 'followup' && <MessageSquare className="w-3 h-3" />}
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Playbook Workspace container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Core details & descriptive side block (L-grid 5-span) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-2">
            <span className="block font-mono text-[8px] text-emerald-500 uppercase tracking-widest font-bold">TAB IDENTIFIER: {currentTab.id.toUpperCase()}_ENGINE</span>
            <h4 className="text-lg font-bold font-sans text-white uppercase leading-normal tracking-tight">
              {currentTab.headline}
            </h4>
            <p className="text-stone-400 text-xs md:text-sm font-sans leading-relaxed">
              {currentTab.summary}
            </p>
          </div>

          <div className="p-4 bg-[#01140e] border border-emerald-950 text-xs font-sans text-stone-300 leading-normal rounded-sm">
            <h5 className="font-mono text-[8px] text-lime-400 uppercase tracking-wider mb-2 font-bold">OPERATOR SUMMARY SHEET</h5>
            <p className="italic font-sans text-stone-400 leading-relaxed">
              {currentTab.payload.overview}
            </p>
          </div>

          {hoveredAnnotation && (
            <div className="p-4 bg-emerald-950/25 border border-lime-500/30 rounded-sm text-xs animate-fade-in space-y-1.5">
              <div className="flex items-center gap-1.5 text-[9.5px] font-mono font-bold text-lime-300 uppercase">
                <HelpCircle className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
                PSYCHOLOGY ANNOTATION
              </div>
              <p className="text-stone-300 font-sans text-xs leading-relaxed">
                {hoveredAnnotation}
              </p>
            </div>
          )}
        </div>

        {/* Dynamic script line / matrix blocks (L-grid 7-span) */}
        <div id="playbook-script-display" className="lg:col-span-7 bg-[#01110b]/80 border border-emerald-950 p-4 md:p-5 rounded-sm relative overflow-hidden h-[340px] md:h-[400px] overflow-y-auto scrollbar-thin">
          <div className="absolute top-2 right-2 flex items-center gap-1.5 font-mono text-[8px] text-emerald-600">
            <FileText className="w-3 h-3 text-emerald-600 animate-pulse" />
            LIVE_TRANSCRIPT_SUITE
          </div>

          {/* Render script lines (Dialogue tabs) */}
          {currentTab.payload.lines && (
            <div className="space-y-4 pt-3">
              {currentTab.payload.lines.map((line, idx) => (
                <div 
                  id={`script-line-${idx}`}
                  key={idx} 
                  className="space-y-1.5 border-b border-emerald-950 pb-3 last:border-0"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`font-mono text-[8.5px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase select-none ${
                      line.role === 'DART AGENT' ? 'bg-lime-500 text-black' : 'bg-stone-800 text-stone-300'
                    }`}>
                      {line.role}
                    </span>
                    
                    {/* Hoverable annotation tag */}
                    <button
                      id={`annotation-trigger-${idx}`}
                      onMouseEnter={() => setHoveredAnnotation(line.intentExplanation)}
                      onMouseLeave={() => setHoveredAnnotation(null)}
                      onClick={() => setHoveredAnnotation(line.intentExplanation)}
                      className={`font-mono text-[8px] border px-1.5 py-0.5 rounded-[2px] uppercase transition cursor-pointer ${line.intentColor}`}
                    >
                      🛡️ [PSY_LOCK: {line.intentTag}]
                    </button>
                  </div>
                  <p className="font-sans text-xs text-stone-200 pl-1 leading-relaxed">
                    {line.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Render Objection matrices (Table format) */}
          {currentTab.payload.matrices && (
            <div className="space-y-4 pt-3">
              {currentTab.payload.matrices.map((item, idx) => (
                <div 
                  id={`objection-row-${idx}`}
                  key={idx} 
                  className="space-y-2 border-b border-emerald-955/40 pb-4 last:border-0"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[8.5px]">
                    <span className="text-red-400 font-bold uppercase tracking-wider bg-red-950/20 border border-red-900/30 px-1.5 py-0.5 rounded-sm">
                      OBJECTION: {idx + 1}
                    </span>
                    <span className="text-lime-400 bg-emerald-950/40 border border-emerald-900/30 px-1.5 py-0.5 rounded-sm">
                      TACTIC: {item.tactic}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                    <div className="md:col-span-4 bg-[#01140e] border border-emerald-950 p-2.5 rounded-sm italic text-stone-400 font-sans">
                      {item.objection}
                    </div>
                    <div className="md:col-span-8 bg-emerald-950/15 border border-emerald-950 p-2.5 rounded-sm font-sans text-stone-200 leading-relaxed text-[11px] md:text-xs">
                      {item.reply}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Render follow-up messaging templates with simple copy utility */}
          {currentTab.payload.templates && (
            <div className="space-y-4 pt-3">
              {currentTab.payload.templates.map((flow, idx) => (
                <div 
                  id={`template-row-${idx}`}
                  key={idx} 
                  className="border border-emerald-950 p-3 rounded-sm space-y-2 relative overflow-hidden bg-black/40 group hover:border-[#84cc16]/30 transition"
                >
                  <div className="flex justify-between items-center border-b border-emerald-955/30 pb-2">
                    <div>
                      <span className="block font-mono text-[8px] text-lime-400 uppercase font-bold tracking-tight">TRIGGER: {flow.trigger}</span>
                      <span className="block font-sans text-[9px] text-stone-500">GOAL: {flow.goal}</span>
                    </div>

                    <button
                      id={`copy-script-${idx}`}
                      onClick={() => copyToClipboard(flow.template, idx)}
                      className="p-1 text-xs border border-emerald-950 hover:border-lime-500/20 text-stone-500 hover:text-white transition rounded-[2px] font-mono flex items-center justify-center gap-1 cursor-pointer bg-black/50"
                    >
                      {copiedTextIdx === idx ? (
                        <>
                          <Check className="w-3 h-3 text-lime-400" />
                          <span className="text-lime-300 text-[8px]">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-stone-500" />
                          <span className="text-[8px]">COPY</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="font-sans text-xs text-stone-300 leading-relaxed font-normal p-1 pl-0">
                    {flow.template}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
