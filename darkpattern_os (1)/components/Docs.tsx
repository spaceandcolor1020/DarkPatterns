import React from 'react';
import { ShieldCheck, Zap, Scale, Cpu, Globe, Terminal, Info, AlertTriangle, BookOpen, Layers, Brain, Rocket, FolderTree, Wrench } from 'lucide-react';

const Docs: React.FC = () => {
  return (
    <main className="px-4 md:px-12 py-10 md:py-20 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 border-[3px] border-black bg-white shadow-[6px_6px_0_0_#42BE65] flex items-center justify-center rounded-none">
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Layer 1: The Hard Drop Shadow (Offset) */}
                <path 
                  d="M12 2L14.5 8.5L20.5 5.5L17.5 11L22 12L17.5 13L20.5 18.5L14.5 15.5L12 22L9.5 15.5L3.5 18.5L6.5 13L2 12L6.5 11L3.5 5.5L9.5 8.5L12 2Z" 
                  fill="black" 
                  stroke="black" 
                  strokeWidth="3" 
                  strokeLinejoin="round"
                  transform="translate(2, 2)"
                />
                
                {/* Layer 2: The Main Green Shape */}
                <path 
                  d="M12 2L14.5 8.5L20.5 5.5L17.5 11L22 12L17.5 13L20.5 18.5L14.5 15.5L12 22L9.5 15.5L3.5 18.5L6.5 13L2 12L6.5 11L3.5 5.5L9.5 8.5L12 2Z" 
                  fill="#42BE65" 
                  stroke="#42BE65" 
                  strokeWidth="3" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl md:text-7xl font-black font-spacegrotesk uppercase italic tracking-tighter leading-none">
            UX Forensic Auditor
          </h2>
          <div className="inline-block bg-black text-white px-4 py-1 font-mono text-[10px] tracking-[0.2em] font-bold uppercase rounded-none">
            // SYSTEM_STATUS: OPERATIONAL
          </div>
        </div>

        <hr className="border-t-[3px] border-black" />

        {/* About Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-black">
            <ShieldCheck size={32} strokeWidth={3} />
            <h3 className="text-2xl md:text-4xl font-black font-spacegrotesk uppercase italic tracking-tight">About The Project</h3>
          </div>
          <div className="bg-white border-[3px] border-black p-6 md:p-8 shadow-[8px_8px_0_0_#000] rounded-none">
            <p className="text-lg md:text-xl font-bold leading-relaxed mb-6 font-body">
              <strong className="text-black">UX Forensic Auditor</strong> is a digital governance tool designed to deconstruct interfaces, identify deceptive design patterns ("Dark Patterns"), and enforce ethical compliance standards (EU AI Act, GDPR, DETOUR).
            </p>
            <p className="text-base font-bold text-gray-700 leading-relaxed font-body">
              Unlike standard accessibility tools, this auditor takes an adversarial approach—interrogating the UI for manipulative intent, hidden friction, and undisclosed AI behaviors.
            </p>
            <div className="mt-8 bg-[#F4F4F4] border-l-[6px] border-[#42BE65] p-6 font-spacegrotesk">
              <span className="block text-[10px] font-black uppercase tracking-widest mb-2 text-[#42BE65] flex items-center gap-2">
                <AlertTriangle size={14} strokeWidth={3} /> "VIBE CODED" ORIGIN:
              </span>
              <p className="text-sm font-black italic uppercase leading-tight">
                This entire application—from the "Brutalist" visual design system to the forensic logic engine—was <span className="underline decoration-[#42BE65] decoration-4">Vibe Coded</span> using Google AI Studio and Gemini 2.0 Flash. It represents a new paradigm of software development where human intent directs high-fidelity AI execution.
              </p>
            </div>
          </div>
        </section>

        {/* Methodologies */}
        <section className="space-y-10">
          <div className="flex items-center gap-4 text-black">
            <Brain size={32} strokeWidth={3} />
            <h3 className="text-2xl md:text-4xl font-black font-spacegrotesk uppercase italic tracking-tight">Core Methodologies</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border-[3px] border-black p-6 md:p-8 shadow-[8px_8px_0_0_#FA4D56] rounded-none space-y-4">
              <h4 className="text-xl font-black font-spacegrotesk uppercase italic tracking-tight border-b-[3px] border-black pb-2">1. The Deception Index</h4>
              <p className="text-xs font-bold leading-relaxed font-body">Quantifies manipulative intent using a weighted analysis of known dark patterns:</p>
              <ul className="space-y-2 text-[11px] font-black uppercase tracking-wider font-mono">
                <li className="flex gap-2 items-center"><div className="w-2 h-2 bg-[#FA4D56] border-[1px] border-black"></div> Obstruction: Roach Motels, Hard-to-Cancel flows.</li>
                <li className="flex gap-2 items-center"><div className="w-2 h-2 bg-[#FA4D56] border-[1px] border-black"></div> Sneaking: Hidden costs, non-consensual harvesting.</li>
                <li className="flex gap-2 items-center"><div className="w-2 h-2 bg-[#FA4D56] border-[1px] border-black"></div> Interference: Disguised ads, trick questions.</li>
              </ul>
            </div>

            <div className="bg-white border-[3px] border-black p-6 md:p-8 shadow-[8px_8px_0_0_#42BE65] rounded-none space-y-4">
              <h4 className="text-xl font-black font-spacegrotesk uppercase italic tracking-tight border-b-[3px] border-black pb-2">2. The Ethics Scorecard</h4>
              <p className="text-xs font-bold leading-relaxed font-body">Evaluates every flow against three immutable bioethical principles:</p>
              <ul className="space-y-2 text-[11px] font-black uppercase tracking-wider font-mono">
                <li className="flex gap-2 items-center"><div className="w-2 h-2 bg-[#42BE65] border-[1px] border-black"></div> Autonomy: Does the user have free will?</li>
                <li className="flex gap-2 items-center"><div className="w-2 h-2 bg-[#42BE65] border-[1px] border-black"></div> Beneficence: Does this design help the user?</li>
                <li className="flex gap-2 items-center"><div className="w-2 h-2 bg-[#42BE65] border-[1px] border-black"></div> Non-maleficence: Does this avoid harm?</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border-[3px] border-black p-6 md:p-8 shadow-[8px_8px_0_0_#0F62FE] rounded-none space-y-4">
            <h4 className="text-xl font-black font-spacegrotesk uppercase italic tracking-tight border-b-[3px] border-black pb-2">3. AI Transparency (Google PAIR Standard)</h4>
            <p className="text-sm font-bold leading-relaxed font-body">
              Audits the interface for adherence to <strong className="text-[#0F62FE]">Google's People + AI Research (PAIR)</strong> guidelines:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-[#0F62FE] font-mono tracking-widest">// DISCLOSURE</span>
                <p className="text-xs font-bold font-body">Is the AI engine clearly labeled?</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-[#0F62FE] font-mono tracking-widest">// EXPLAINABILITY</span>
                <p className="text-xs font-bold font-body">Can the user see 'why' a prediction was made?</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-[#0F62FE] font-mono tracking-widest">// FAILURE STATES</span>
                <p className="text-xs font-bold font-body">Graceful handling of uncertainty.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-black">
            <Wrench size={32} strokeWidth={3} />
            <h3 className="text-2xl md:text-4xl font-black font-spacegrotesk uppercase italic tracking-tight">Tech Stack</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Engine", value: "Gemini 2.0 Flash", icon: Cpu, color: "bg-black text-white" },
              { label: "Framework", value: "React 19 + ESM", icon: Layers, color: "bg-white text-black" },
              { label: "Styling", value: "Tailwind CSS", icon: Globe, color: "bg-white text-black" },
              { label: "Architect", value: "Google AI Studio", icon: Terminal, color: "bg-[#42BE65] text-black" }
            ].map((tech, i) => (
              <div key={i} className={`border-[3px] border-black p-4 shadow-[4px_4px_0_0_#000] flex flex-col items-center justify-center text-center gap-2 rounded-none ${tech.color}`}>
                <tech.icon size={20} strokeWidth={3} />
                <span className="text-[9px] font-black uppercase opacity-60 font-mono tracking-widest">{tech.label}</span>
                <span className="text-xs font-black uppercase font-spacegrotesk leading-none">{tech.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-black">
            <Rocket size={32} strokeWidth={3} />
            <h3 className="text-2xl md:text-4xl font-black font-spacegrotesk uppercase italic tracking-tight">Getting Started</h3>
          </div>
          <div className="bg-black text-[#42BE65] p-6 md:p-8 border-[3px] border-black shadow-[8px_8px_0_0_#000] rounded-none space-y-6 font-mono">
            <div className="space-y-2">
              <span className="text-[10px] uppercase opacity-40 font-black tracking-widest">// STEP_01: INSTALLATION</span>
              <pre className="text-xs md:text-sm overflow-x-auto whitespace-pre-wrap">
                git clone https://github.com/your-username/ux-forensic-auditor.git<br/>
                cd ux-forensic-auditor<br/>
                npm install
              </pre>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase opacity-40 font-black tracking-widest">// STEP_02: CONFIGURATION</span>
              <p className="text-xs">Create a .env.local file:</p>
              <pre className="text-xs md:text-sm text-white">GEMINI_API_KEY=your_actual_api_key_here</pre>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase opacity-40 font-black tracking-widest">// STEP_03: EXECUTION</span>
              <pre className="text-xs md:text-sm">npm run dev</pre>
            </div>
          </div>
        </section>

        {/* Project Structure */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-black">
            <FolderTree size={32} strokeWidth={3} />
            <h3 className="text-2xl md:text-4xl font-black font-spacegrotesk uppercase italic tracking-tight">Project Structure</h3>
          </div>
          <div className="bg-white border-[3px] border-black p-6 md:p-8 shadow-[8px_8px_0_0_#000] rounded-none font-mono text-xs space-y-1">
            <div className="text-black font-black">ux-forensic-auditor/</div>
            <div className="pl-4 border-l-[2px] border-gray-200">├── src/</div>
            <div className="pl-8 border-l-[2px] border-gray-200">├── components/ # UI Scorecards & FindingCards</div>
            <div className="pl-8 border-l-[2px] border-gray-200">├── services/ # geminiService.ts (The Engine)</div>
            <div className="pl-8 border-l-[2px] border-gray-200">├── types.ts # TS Definitions</div>
            <div className="pl-8 border-l-[2px] border-gray-200">└── App.tsx # Main Orchestrator</div>
            <div className="pl-4 border-l-[2px] border-gray-200">├── public/ # Static Assets</div>
            <div className="pl-4 border-l-[2px] border-gray-200">└── tailwind.config.js # Brutalist Design Tokens</div>
          </div>
        </section>

        {/* Footer info */}
        <div className="text-center pt-10 pb-20 space-y-4">
          <div className="flex justify-center items-center gap-4 text-[10px] font-black uppercase tracking-widest font-spacegrotesk">
            BUILT WITH <span className="text-[#42BE65] border-[2px] border-black px-2 py-0.5">GOOGLE AI STUDIO</span>
            • POWERED BY <span className="text-[#0F62FE] border-[2px] border-black px-2 py-0.5">GEMINI 2.0</span>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Docs;