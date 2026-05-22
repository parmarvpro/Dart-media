'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  CheckCheck, 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  Instagram, 
  PhoneCall, 
  CheckSquare, 
  User,
  Clock
} from 'lucide-react';

interface Stage {
  id: string;
  label: string;
  detail: string;
  iconName: string;
}

const pipelineStages: Stage[] = [
  { id: 'ad', label: 'Instagram Ad Click', detail: 'Buyer interacts with custom dynamic vertical lifestyle video creative.', iconName: 'Instagram' },
  { id: 'inquiry', label: 'WhatsApp Instant Inquiry', detail: 'Direct-redirect form pre-fills buyer intent message to active chat.', iconName: 'MessageSquare' },
  { id: 'reply', label: 'AI Cognitive Reply', detail: 'Instant, hyper-personalized, contextual reply generated within 2.5 seconds.', iconName: 'Bot' },
  { id: 'qualify', label: 'Lead Qualification', detail: 'AI questions extract buyer readiness, preferred units, and budget limits.', iconName: 'Sparkles' },
  { id: 'booking', label: 'Autonomous Booking', detail: 'Secures site visit appointment slot and synchronizes with developer calendar.', iconName: 'CheckSquare' },
  { id: 'followup', label: 'Sales Handover & Nudge', detail: 'Notifies human sales reps with qualification report and triggers automatic follow-ups.', iconName: 'PhoneCall' }
];

interface ChatMessage {
  sender: 'buyer' | 'ai' | 'system';
  text: string;
  timestamp: string;
}

interface Persona {
  id: string;
  name: string;
  avatar: string;
  investmentTier: string;
  prompt: string;
  chatSequence: ChatMessage[];
  qualificationReport: {
    budget: string;
    timeline: string;
    urgency: string;
    preferredUnit: string;
  };
}

const defaultPersonas: Persona[] = [
  {
    id: 'luxury_investor',
    name: 'Sarah Chen (Portfolio Investor)',
    avatar: 'SC',
    investmentTier: 'ULTRA HIGH-NET-WORTH (UHNW)',
    prompt: 'Saw Dart luxury tower ad. Looking for index pricing & 3-bedroom penthouse yield forecasts.',
    chatSequence: [
      { sender: 'buyer', text: 'Hi, I saw your ad for Dart Tower. Looking for pricing on three-bedroom penthouses and the projected rental yield. Is there availability?', timestamp: '10:42 AM' },
      { sender: 'system', text: '⚡ AI Engine Processed: INTENT_BUYER_SEARCH // SECTOR_DART', timestamp: '10:42 AM' },
      { sender: 'ai', text: 'Hello Sarah! Thank you for your interest in Dart Tower. Yes, we currently have two high-floor 3-bedroom penthouses available. Our historical rental yield in this sector is averaging 8.4% due to our executive layout designs.', timestamp: '10:42 AM' },
      { sender: 'buyer', text: 'Excellent yield. Can I get a copy of the floorplans? Also, what is the downpayment requirement?', timestamp: '10:43 AM' },
      { sender: 'system', text: '⚡ AI Engine Processed: QUALIFICATION_PHASE // DOWNPAYMENT_CHECK', timestamp: '10:43 AM' },
      { sender: 'ai', text: 'I have attached our complete high-res floorplan asset catalog! Our VIP pre-booking launch offer requires only a 15% booking reservation token. Would you like to review this on-site? We have private executive site previews available this Saturday at 11:00 AM or 3:00 PM.', timestamp: '10:43 AM' },
      { sender: 'buyer', text: 'Saturday at 3:00 PM works perfectly. Put me down.', timestamp: '10:44 AM' },
      { sender: 'system', text: '✅ AUTOMATED BOOKING LOCKED // CALENDAR_SYNC_SUCCESS // HANDOVER TO ADVISOR', timestamp: '10:44 AM' },
      { sender: 'ai', text: 'Perfect! Your Saturday private preview is locked for 3:00 PM. Our senior real estate strategist, Christopher, will meet you at the central VIP lounge and has prepared your physical prospectus packet. Looking forward to showing you the project!', timestamp: '10:44 AM' }
    ],
    qualificationReport: {
      budget: 'VIP ($2.8M - $3.5M)',
      timeline: 'Immediate Pre-Launch VIP',
      urgency: 'HIGH',
      preferredUnit: '3BR Penthouse Floor 42'
    }
  },
  {
    id: 'skeptic_buyer',
    name: 'David Brooks (Flexible Buyer)',
    avatar: 'DB',
    investmentTier: 'TIER 1 RETAIL INVESTOR',
    prompt: 'Inquiring if there are flexible subvention/instalment payment plans.',
    chatSequence: [
      { sender: 'buyer', text: 'Hi there, are there any flexible subvention payment plans for Dart Tower? Not looking to put 50% cash up front.', timestamp: '11:05 AM' },
      { sender: 'system', text: '⚡ AI Engine Processed: INTENT_FINANCE_QUERIES // INSTALMENT_DESIRE', timestamp: '11:05 AM' },
      { sender: 'ai', text: 'Hi David! We completely understand. We actually have an exclusive 15/85 subvention structure – you only pay 15% now during excavation, and the remaining 85% upon handover in 2028. No EMIs or interest in between.', timestamp: '11:05 AM' },
      { sender: 'buyer', text: 'That sounds a lot better. Is that applicable to the 2-bedroom corner units?', timestamp: '11:06 AM' },
      { sender: 'system', text: '⚡ AI Engine Processed: DATA_REF_MATCH // CORNER_UNITS_SEC_05', timestamp: '11:06 AM' },
      { sender: 'ai', text: 'Yes, it is! We have premium corner 2-bedroom slots with wrapping balconies that qualify perfectly under this payment plan. Would you like to reserve a slot to tour our physical sample apartment mock-up? It really brings the material quality to life.', timestamp: '11:06 AM' },
      { sender: 'buyer', text: 'Sure, can I swing by tomorrow afternoon around 2:00 PM?', timestamp: '11:07 AM' },
      { sender: 'system', text: '✅ APPOINTMENT_SECURED // FRIDAY_1400_HOURS // SALES_PREP_DONE', timestamp: '11:07 AM' },
      { sender: 'ai', text: 'Absolutely! You are locked in for tomorrow at 2:00 PM. We have allocated parking bay #5 for your visit, and representative Liam will guide your walkthrough. An SMS guide with location pin is on its way!', timestamp: '11:07 AM' }
    ],
    qualificationReport: {
      budget: '$1.1M - $1.4M Range',
      timeline: 'Handover 2028 (Flexible)',
      urgency: 'MEDIUM',
      preferredUnit: '2BR Corner Unit Type C'
    }
  },
  {
    id: 'corporate_developer',
    name: 'Elena Rostova (Commercial Lead)',
    avatar: 'ER',
    investmentTier: 'CORPORATE ACQUISITIONS',
    prompt: 'Inquiring if we have commercial workspace options and private parking bays.',
    chatSequence: [
      { sender: 'buyer', text: 'Hello, looking for information regarding commercial corporate floors in the podium section. Need private lift access and 12+ secured vehicle parking slots.', timestamp: '1:15 PM' },
      { sender: 'system', text: '⚡ AI Engine Processed: COMMERCIAL_SEGMENT_DETECTED // PODIUM_SPEC', timestamp: '1:15 PM' },
      { sender: 'ai', text: 'Greetings Elena. Yes! The Dart Podium section includes dedicated Grade-A commercial slabs from Level 2 to Level 5, featuring a dedicated high-speed foyer elevator bank and allocated smart camera vehicle parking zones.', timestamp: '1:15 PM' },
      { sender: 'buyer', text: 'Is the zoning completely commercial or mixed? Tell me about electricity back-up.', timestamp: '1:16 PM' },
      { sender: 'system', text: '⚡ AI Engine Processed: UTILITIES_INDEX_LOOKUP // Mixed-Use zoning verified', timestamp: '1:16 PM' },
      { sender: 'ai', text: 'It has designated commercial workspace zoning with complete corporate separations from the residences above. We provide dual-redundant 100% generator backs-up to guarantee continuous server grid uptime. Would you like to consult our commercial project director?', timestamp: '1:16 PM' },
      { sender: 'buyer', text: 'Yes, setting up a video consultation next Tuesday would be great. 10:00 AM?', timestamp: '1:17 PM' },
      { sender: 'system', text: '✅ BUSINESS_VIDEO_MEETING_LOCKED // GOOGLE_MEET_PROVISIONED', timestamp: '1:17 PM' },
      { sender: 'ai', text: 'Done! Next Tuesday at 10:00 AM is scheduled. A calendar appointment has been provisioned to your email, along with our corporate investor prospectus and electrical floor layouts. Our business director looks forward to briefing your team!', timestamp: '1:18 PM' }
    ],
    qualificationReport: {
      budget: 'Commercial Grade-A Corporate ($6.5M)',
      timeline: 'Q4 2026 Board Approval',
      urgency: 'STRICT',
      preferredUnit: 'Full Podium Floor Level 3'
    }
  }
];

export default function AIAutomationSimulator() {
  const [selectedPersonaIdx, setSelectedPersonaIdx] = useState(0);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [customInputText, setCustomInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const persona = defaultPersonas[selectedPersonaIdx];

  // Reset simulation whenever a new persona is selected
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleMessages([persona.chatSequence[0]]);
      setActiveStageIdx(1); // Point to WhatsApp inquiry initially
      setIsPlaying(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [selectedPersonaIdx, persona]);

  // Handle auto scroll inside chatbot
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [visibleMessages, isTyping]);

  // Simulate pipeline sequence animation step-by-step
  const startSimulation = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setVisibleMessages([persona.chatSequence[0]]);
    setActiveStageIdx(1); // Set to WhatsApp inquiry
    
    let currentMsgIndex = 1;
    const processNextMessage = () => {
      if (currentMsgIndex >= persona.chatSequence.length) {
        setIsPlaying(false);
        setActiveStageIdx(5); // Complete at Sales Follow-up
        return;
      }

      const nextMsg = persona.chatSequence[currentMsgIndex];
      
      if (nextMsg.sender === 'system') {
        // System logs are instant
        setTimeout(() => {
          setVisibleMessages(prev => [...prev, nextMsg]);
          // Map system events directly to stage updates
          if (nextMsg.text.includes('INTENT') || nextMsg.text.includes('DATA_REF')) {
            setActiveStageIdx(2); // AI Reply active
          } else if (nextMsg.text.includes('QUALIFICATION')) {
            setActiveStageIdx(3); // Qualification node active
          } else if (nextMsg.text.includes('BOOKING') || nextMsg.text.includes('APPOINTMENT')) {
            setActiveStageIdx(4); // Booking node active
          }
          currentMsgIndex++;
          processNextMessage();
        }, 800);
      } else if (nextMsg.sender === 'ai') {
        // AI simulates typing latency
        setIsTyping(true);
        const typingDelay = Math.max(1200, nextMsg.text.length * 6);
        setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages(prev => [...prev, nextMsg]);
          currentMsgIndex++;
          processNextMessage();
        }, typingDelay);
      } else if (nextMsg.sender === 'buyer') {
        // Buyer responses appear after brief pause
        setTimeout(() => {
          setVisibleMessages(prev => [...prev, nextMsg]);
          currentMsgIndex++;
          processNextMessage();
        }, 1500);
      }
    };

    // First delay after the starting message
    setTimeout(() => {
      processNextMessage();
    }, 1200);
  };

  // Allow custom message typing by user
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputText.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'buyer',
      text: customInputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setVisibleMessages(prev => [...prev, userMsg]);
    setCustomInputText('');
    setIsTyping(true);

    // Simulate smart dynamic AI routing
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Hello! Thanks for your inquiry. Our automated real estate growth systems are analyzing your request. Would you like to schedule an immersive digital Zoom showcase with one of our developer representatives to review available inventories?";
      
      const lower = userMsg.text.toLowerCase();
      if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing') || lower.includes('much')) {
        replyText = "Fascinating query! Our pricing models in the Dart System scale directly with square footage and floor heights. Standard luxury levels start from $1.2M, while penthouse levels start at $2.6M. We have custom ROI payment guides we can share. Shall I schedule an official on-site model tour?";
      } else if (lower.includes('plan') || lower.includes('payment') || lower.includes('instal')) {
        replyText = "We offer extreme payment flexibility, David. Under our developer subvention contract, you book with only 15% down, and enjoy zero interest or payments during the intermediate construction cycle. We handle the bank tie-ups natively. Would a call tomorrow afternoon help structure this for you?";
      } else if (lower.includes('where') || lower.includes('location') || lower.includes('address')) {
        replyText = "Dart Tower is centered perfectly in the newly zoned premium Coastal District, flanked by the private yacht marina and the new digital trade zone. High-floor units have complete unobstructed view vectors. Shall we lock in a WhatsApp digital walkthrough pin?";
      }

      const systemMsg: ChatMessage = {
        sender: 'system',
        text: '⚡ AI Context Evaluated // INSTANT DIRECT REPLY ENGINE ENGAGED',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const aiMsg: ChatMessage = {
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setVisibleMessages(prev => [...prev, systemMsg, aiMsg]);
      setActiveStageIdx(3); // Qualification node lights up for user custom inputs
    }, 1400);
  };

  return (
    <div id="ai-pipeline-simulator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-white">
      {/* 1. Left controls & visual pipeline path tracking (L-grid 5-span) */}
      <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#a3ff00] bg-[#a3ff00]/5 border border-[#a3ff00]/20 px-2.5 py-1.5 rounded-sm uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a3ff00] animate-pulse shadow-[0_0_6px_#a3ff00]" />
            LIVE AUTOMATION WORKSPACE
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-sans tracking-tight text-white uppercase">
            Turn Raw Ad Traffic Into Confirmed Site Visits
          </h3>
          <p className="text-stone-400 text-xs md:text-sm font-sans leading-relaxed opacity-85">
            Configure the AI system, choose a simulated target investor, and see how the automated Dart Media inquiry engine handles direct qualifying and calendar sync within seconds.
          </p>

          {/* Persona selector sliders */}
          <div className="space-y-2 pt-2">
            <span className="block font-mono text-[9px] text-[#a3ff00]/80 uppercase tracking-widest font-bold">1. SELECT BUYER INTENT DEMO:</span>
            <div id="persona-selection-hub" className="grid grid-cols-1 gap-2">
              {defaultPersonas.map((item, idx) => (
                <button
                  id={`sel-persona-${item.id}`}
                  key={item.id}
                  onClick={() => { if (!isPlaying) setSelectedPersonaIdx(idx); }}
                  disabled={isPlaying}
                  className={`w-full text-left p-3 border rounded-none transition flex flex-col justify-between relative overflow-hidden ${
                    selectedPersonaIdx === idx 
                      ? 'border-[#a3ff00] bg-white/5 shadow-[0_0_15px_rgba(163,255,0,0.15)]' 
                      : 'border-white/10 hover:border-white/20 bg-black/40 disabled:opacity-45'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-none flex items-center justify-center font-mono text-[10px] font-bold ${selectedPersonaIdx === idx ? 'bg-[#a3ff00] text-[#02120d]' : 'bg-white/10 text-white'}`}>
                        {item.avatar}
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-white uppercase">{item.name}</span>
                        <span className="block text-[8px] text-stone-500 tracking-wider font-mono uppercase">{item.investmentTier}</span>
                      </div>
                    </div>
                    {selectedPersonaIdx === idx && (
                      <span className="w-1.5 h-1.5 bg-[#a3ff00] rounded-full shadow-[0_0_5px_#a3ff00]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Big CTA Execution Trigger */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <button
            id="trigger-pipeline-sim"
            onClick={startSimulation}
            disabled={isPlaying}
            className="w-full h-11 bg-[#a3ff00] text-[#02120d] font-mono font-black text-xs uppercase tracking-widest hover:bg-[#b5ff33] flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(163,255,0,0.30)] disabled:opacity-50 disabled:cursor-not-allowed rounded-none"
          >
            {isPlaying ? (
              <>
                <span className="w-2.5 h-2.5 border-2 border-[#02120d] border-t-transparent animate-spin rounded-full" />
                SIMULATING LIVE FLOW PROTOCOL...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 animate-bounce" />
                GENERATE INQUIRY & START SIMULATOR
              </>
            )}
          </button>
          <div className="flex justify-between text-[9px] font-mono text-stone-500 select-none">
            <span>PORT_ADDR: localhost:3000 // VER: AI-9.2</span>
            <span>DATA ENCRYPTION: SECURE SSL</span>
          </div>
        </div>
      </div>

      {/* 2. Central 3D smartphone simulator (L-grid 7-span) */}
      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Stage progress visualizer (R-grid 5-span column) */}
        <div id="pipeline-stages" className="md:col-span-5 flex md:flex-col justify-between gap-1 border border-white/10 bg-black/60 p-3 rounded-none relative overflow-hidden h-[440px] md:h-[480px]">
          <div className="absolute top-0 left-0 w-2 h-full bg-white/5" />
          
          <div className="w-full text-left pb-2 border-b border-white/10">
            <span className="block font-mono text-[8.5px] text-[#a3ff00] font-bold">STATUS MONITOR</span>
            <span className="block text-xs font-bold font-sans uppercase text-white">PIPELINE STAGE FLOW</span>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-3.5 my-2">
            {pipelineStages.map((stage, sIdx) => {
              const active = sIdx <= activeStageIdx;
              const pulsing = sIdx === activeStageIdx && isPlaying;

              return (
                <div 
                  id={`stage-card-${stage.id}`}
                  key={stage.id} 
                  className={`flex items-start gap-2 text-left pl-3 py-1.5 border-l-2 transition-all duration-300 ${
                    pulsing
                      ? 'border-[#a3ff00] bg-[#a3ff00]/5 translate-x-1'
                      : active 
                        ? 'border-[#a3ff00]/60 text-stone-200' 
                        : 'border-white/5 text-stone-600'
                  }`}
                >
                  <div className={`mt-0.5 rounded-none w-4 h-4 flex items-center justify-center font-mono text-[9px] ${
                    pulsing 
                      ? 'bg-[#a3ff00] text-[#02120d] font-bold' 
                      : active 
                        ? 'bg-[#a3ff00]/20 text-[#a3ff00]' 
                        : 'bg-white/5 text-stone-700'
                  }`}>
                    {sIdx + 1}
                  </div>
                  <div>
                    <h5 className={`font-sans font-semibold text-[11px] leading-tight uppercase ${active ? 'text-white' : 'text-stone-600'}`}>
                      {stage.label}
                    </h5>
                    <p className="font-sans text-[9px] text-stone-500 leading-tight block mt-0.5 max-w-[130px] line-clamp-1 opacity-80">
                      {stage.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10 font-mono text-[8.5px] text-[#a3ff00]/80 bg-white/5 rounded-none p-1.5 w-full">
            <div className="flex justify-between font-bold text-stone-400 mb-1">
              <span>REPORT LOCKOUT</span>
            </div>
            <div>BUDGET: {isPlaying ? 'ANALYZING...' : persona.qualificationReport.budget}</div>
            <div>STATUS: {isPlaying ? 'RE-QUALIFYING...' : 'QUALIFIED & SYNCED'}</div>
          </div>
        </div>

        {/* Simulated Smartphone Workspace layout container (R-grid 7-span column) */}
        <div id="smartphone-wrapper" className="md:col-span-7 bg-[#0b0c0d] border border-stone-800 rounded-[24px] h-[480px] p-2 flex flex-col shadow-2xl relative">
          {/* Top Speaker Notch element */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-black rounded-full z-20 flex justify-center items-center">
            <span className="w-12 h-1 bg-stone-800 rounded-full" />
          </div>

          <div className="flex-1 rounded-[18px] bg-[#02120d] overflow-hidden flex flex-col border border-stone-900">
            {/* WhatsApp App Header bar */}
            <div className="bg-black/80 px-4 pt-4 pb-3 flex justify-between items-center border-b border-white/10 select-none">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-[#a3ff00]/60 flex items-center justify-center font-mono text-xs font-bold text-[#a3ff00]">
                    D
                  </div>
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#a3ff00] border border-black animate-pulse" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[11px] text-white leading-tight flex items-center gap-1">
                    DART AI SYSTEM <Clock className="w-3 h-3 text-[#a3ff00] animate-spin" />
                  </h4>
                  <span className="block font-mono text-[8px] text-[#a3ff00]/70">ACT_RE_DEMO // PROTOCOL_ONLINE</span>
                </div>
              </div>
              <span className="font-mono text-[7px] text-[#a3ff00] border border-[#a3ff00]/20 px-1 py-0.5 rounded-none bg-[#a3ff00]/5">
                ACTIVE
              </span>
            </div>

            {/* Chat message display boards */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin scrollbar-thumb-white/5">
              {visibleMessages.map((msg, index) => {
                if (msg.sender === 'system') {
                  return (
                    <div id={`chat-sys-log-${index}`} key={index} className="mx-auto text-center w-full my-1 select-none">
                      <span className="inline-block bg-[#a3ff00]/10 border border-[#a3ff00]/15 px-2 py-1 rounded-none text-[8px] font-mono text-[#a3ff00] uppercase tracking-widest text-shadow shadow-sm animate-pulse">
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                const isAI = msg.sender === 'ai';
                return (
                  <div
                    id={`chat-msg-${index}`}
                    key={index}
                    className={`flex flex-col max-w-[85%] ${isAI ? 'mr-auto items-start' : 'ml-auto items-end'}`}
                  >
                    <div className={`px-3 py-2.5 text-xs font-sans leading-relaxed rounded-none ${
                      isAI 
                        ? 'bg-white/5 border border-white/10 text-stone-200' 
                        : 'bg-[#a3ff00] text-[#02120d] font-semibold'
                    }`}>
                      <div className="flex items-center gap-1 mb-0.5 text-[8.5px] font-mono uppercase tracking-wider select-none font-bold">
                        {isAI ? (
                          <>
                            <Bot className="w-3.5 h-3.5 text-[#a3ff00]" />
                            <span className="text-[#a3ff00]">Dart AI Agent</span>
                          </>
                        ) : (
                          <>
                            <User className="w-3.5 h-3.5 text-[#02120d]/80" />
                            <span className="text-[#02120d]/85">Potential Investor</span>
                          </>
                        )}
                      </div>
                      <p className="font-sans leading-relaxed mt-1 text-[11px] md:text-xs">{msg.text}</p>
                    </div>
                    {/* Timestamp log */}
                    <span className="text-[7.5px] font-mono text-stone-600 mt-1 uppercase">
                      {msg.timestamp} {isAI && '✓✓ SENT'}
                    </span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex flex-col items-start mr-auto max-w-[85%] bg-white/5 border border-white/10 p-2.5 px-3 rounded-none">
                  <div className="flex items-center gap-1 text-[8.5px] font-mono text-[#a3ff00] font-bold mb-1 select-none">
                    <span className="w-1.5 h-1.5 bg-[#a3ff00] rounded-full animate-ping" />
                    🤖 DART CORE AGENT GENERATING RE_COGNITIVE REPLY...
                  </div>
                  <div className="flex gap-1.5 py-1 justify-center items-center">
                    <span className="w-1.5 h-1.5 bg-[#a3ff00] rounded-full animate-bounce duration-500" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#a3ff00] rounded-full animate-bounce duration-500" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#a3ff00] rounded-full animate-bounce duration-500" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Custom User Message Input trigger */}
            <form onSubmit={handleCustomSubmit} className="p-2 border-t border-white/10 bg-black flex gap-1.5 select-none z-10">
              <input
                id="custom-pipeline-input"
                type="text"
                value={customInputText}
                onChange={(e) => setCustomInputText(e.target.value)}
                placeholder={isPlaying ? "Simulation in progress..." : "Type custom buyer skepticisms/pricing questions..."}
                disabled={isPlaying}
                className="flex-1 bg-[#02120d] border border-white/10 hover:border-white/20 rounded-none px-3 text-[11px] font-sans text-stone-200 outline-none focus:border-[#a3ff00]/50 transition disabled:opacity-45"
              />
              <button
                id="submit-pipeline-input"
                type="submit"
                disabled={isPlaying || !customInputText.trim()}
                className="w-10 h-8 bg-[#a3ff00] disabled:bg-zinc-900 rounded-none flex items-center justify-center text-[#02120d] font-bold hover:bg-[#b5ff33] disabled:text-stone-600 transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
