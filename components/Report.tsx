import React, { useState } from 'react';
import { AuditReport, EthicsSection, DarkPatternFinding, PairEval, UISignal, LegalPrecedent, RemediationPlan, GooglePairPrinciple } from '../types';
import { 
  CheckCircle2, 
  ExternalLink, 
  Megaphone, 
  Bell, 
  Award, 
  Wifi, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Settings,
  CircleDashed,
  ShieldCheck,
  Layout,
  Square,
  CheckSquare,
  Target,
  Gavel,
  Copy,
  TrendingUp,
  Terminal as TerminalIcon,
  Download,
  Check,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  BotOff
} from 'lucide-react';

interface ReportProps {
  report: AuditReport;
  resetToHome: () => void;
}

/**
 * Helper to translate score into forensic labels and colors
 */
const getForensicStatus = (val: number) => {
  if (val < 40) return {
    label: 'CRITICAL FAILURE',
    color: 'bg-[#FA4D56]',
    textColor: 'text-[#FA4D56]',
    desc: 'System completely hides its AI nature.'
  };
  if (val < 70) return {
    label: 'PARTIAL DISCLOSURE',
    color: 'bg-[#F1C21B]',
    textColor: 'text-[#F1C21B]',
    desc: 'User must dig for info; not obvious.'
  };
  return {
    label: 'OPTIMAL TRANSPARENCY',
    color: 'bg-[#42BE65]',
    textColor: 'text-[#42BE65]',
    desc: 'Clear, upfront indicators present.'
  };
};

/**
 * NULL STATE: Component for when no AI systems are detected
 */
const NoAiState: React.FC = () => (
  <div className="bg-gray-100 border-[3px] border-black p-10 md:p-20 flex flex-col items-center justify-center text-center rounded-none shadow-[10px_10px_0_0_#000] animate-in fade-in zoom-in-95 duration-500 min-h-[450px]">
    <BotOff size={96} className="text-gray-400 mb-6" strokeWidth={1.5} />
    <h3 className="text-xl font-black font-spacegrotesk uppercase italic tracking-tighter leading-none mb-4">
      NO ALGORITHMIC SYSTEMS DETECTED
    </h3>
    <p className="font-mono text-sm text-gray-600 leading-relaxed max-w-md mt-4 font-bold uppercase">
      Our forensic scan did not identify any chatbots, recommendation engines, or generative UI elements on this page. Transparency metrics are not applicable.
    </p>
    <div className="mt-8 flex items-center gap-3 border-[3px] border-black bg-white px-6 py-2 shadow-[4px_4px_0_0_#000]">
      <CheckCircle2 size={20} className="text-black" strokeWidth={3} />
      <span className="font-black font-spacegrotesk text-sm uppercase tracking-widest">HUMAN CURATED</span>
    </div>
  </div>
);

/**
 * BRUTALIST TOOLTIP: Explainable AI Logic Component
 */
const BrutalistTooltip: React.FC<{ children: React.ReactNode; text: string }> = ({ children, text }) => {
  const [show, setShow] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="cursor-help decoration-dotted underline decoration-black/30 group-hover:decoration-black transition-all">
        {children}
      </div>
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 bg-black text-white border-2 border-white shadow-[4px_4px_0px_#FFF] z-[100] pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200">
          <p className="font-mono text-[10px] leading-relaxed uppercase tracking-tight text-center">
            {text}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black"></div>
        </div>
      )}
    </div>
  );
};

export const DiagnosticBar = ({ label, desc, val }: { label: string, desc: string, val: number }) => {
  const status = getForensicStatus(val);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-black tracking-tight font-spacegrotesk uppercase">{label}</h4>
          <p className="text-[10px] opacity-50 uppercase font-mono leading-none mt-1">{desc}</p>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className={`text-xs font-black font-spacegrotesk ${status.textColor}`}>{status.label}</span>
          <span className="text-[10px] font-mono opacity-50">({val}%)</span>
        </div>
      </div>
      <div className="h-4 w-full bg-[#F4F4F4] border-[3px] border-black rounded-none overflow-hidden shadow-[2px_2px_0_0_#000]">
        <div 
          className={`h-full transition-all duration-1000 ${status.color}`} 
          style={{ width: `${val}%` }}
        ></div>
      </div>
      <p className="text-[9px] font-bold font-body italic text-gray-500">
        {status.desc}
      </p>
    </div>
  );
};

export const EthicsCard = ({ title, data, tooltipText }: { title: string, data: EthicsSection, tooltipText: string }) => {
  if (!data) return null;
  const scoreColors: Record<string, string> = {
    'A': 'bg-[#42BE65] text-black',
    'C': 'bg-[#F1C21B] text-black',
    'F': 'bg-[#FA4D56] text-white'
  };
  
  return (
    <div className="bg-white border-[3px] border-black p-6 md:p-8 shadow-[8px_8px_0_0_#000] rounded-none flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <h4 className="text-xl font-black font-spacegrotesk italic tracking-tight">{title}</h4>
        <BrutalistTooltip text={tooltipText}>
          <div className={`w-12 h-12 flex items-center justify-center text-2xl font-black border-[3px] border-black rounded-none ${scoreColors[data.score] || 'bg-[#F4F4F4]'}`}>
            {data.score}
          </div>
        </BrutalistTooltip>
      </div>
      <div className="space-y-4 flex-grow">
        {(data.items || []).map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {item.pass ? <CheckSquare className="text-[#42BE65]" size={18} strokeWidth={3} /> : <Square className="text-[#FA4D56]" size={18} strokeWidth={3} />}
            <span className={`text-[10px] font-black uppercase tracking-widest ${item.pass ? 'text-black' : 'text-gray-400 line-through'}`}>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t-[3px] border-black">
        <p className="text-xs font-bold italic text-gray-700 leading-relaxed font-body">"{data.explanation}"</p>
      </div>
    </div>
  );
};

export const SignalSection = ({ title, type, items }: { title: string, type: 'detractor' | 'validator', items: UISignal[] }) => {
  const filtered = (items || []).filter(item => item.type === type);
  const TitleIcon = type === 'detractor' ? AlertTriangle : CheckCircle2;
  return (
    <div className="bg-white border-[3px] border-black p-6 md:p-8 shadow-[8px_8px_0_0_#000] rounded-none flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6 border-b-[3px] border-black pb-2">
        <TitleIcon size={20} strokeWidth={3} className={type === 'detractor' ? 'text-[#FA4D56]' : 'text-[#42BE65]'} />
        <h4 className="text-xl font-black font-spacegrotesk italic tracking-tight">{title}</h4>
      </div>
      <div className="space-y-3 flex-grow">
        {filtered.length > 0 ? filtered.map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-[#F4F4F4] p-3 border-[3px] border-black">
            <div className={`w-3 h-3 mt-1 flex-shrink-0 border-[2px] border-black ${type === 'detractor' ? 'bg-[#FA4D56]' : 'bg-[#42BE65]'}`}></div>
            <span className="text-[10px] font-black leading-tight uppercase tracking-widest">{item.signal}</span>
          </div>
        )) : (
          <p className="text-[10px] uppercase opacity-40 font-mono italic font-bold">No signals identified.</p>
        )}
      </div>
    </div>
  );
};

export const CitationCard: React.FC<{ cite: LegalPrecedent }> = ({ cite }) => (
  <div className="bg-white border-[3px] border-black p-6 md:p-8 shadow-[10px_10px_0_0_#000] rounded-none hover:bg-gray-50 transition-all flex flex-col h-full group relative overflow-hidden">
    <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 font-mono text-[9px] font-black uppercase tracking-tighter transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
      FORENSIC_EVIDENCE
    </div>
    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#0F62FE] mb-6 tracking-widest font-mono">
      <Gavel size={14} strokeWidth={3} />
      {cite.relevance_tag}
    </div>
    <h4 className="text-2xl font-black font-spacegrotesk mb-4 uppercase leading-[0.9] italic tracking-tight border-l-4 border-black pl-4">
      {cite.case_name}
    </h4>
    <p className="text-xs font-bold text-gray-700 leading-relaxed mb-8 flex-grow font-body italic opacity-80">
      "{cite.summary}"
    </p>
    <div className="mt-auto">
      <a 
        href={cite.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 text-[10px] font-black uppercase bg-black text-white px-4 py-2 hover:bg-[#0F62FE] transition-colors font-spacegrotesk tracking-widest"
      >
        View source <ExternalLink size={14} strokeWidth={3} />
      </a>
    </div>
  </div>
);

export const FindingCard: React.FC<{ item: DarkPatternFinding; index: number; expanded?: boolean; onToggle?: () => void }> = ({ item, index, expanded, onToggle }) => {
  const isExpanded = expanded;
  const severityData = (sev: string) => {
    switch (sev) {
      case 'FLAGRANT': return { color: 'text-[#FA4D56]', icon: Megaphone, label: 'FLAGRANT SIGNAL' };
      case 'STRONG': return { color: 'text-[#FD7E14]', icon: Bell, label: 'STRONG SIGNAL' };
      case 'POTENTIAL': return { color: 'text-[#F1C21B]', icon: Award, label: 'POTENTIAL SIGNAL' };
      default: return { color: 'text-gray-500', icon: Wifi, label: 'LOW SIGNAL' };
    }
  };
  const { color, label, icon: SeverityIcon } = severityData(item.severity);

  return (
    <div className={`bg-white border-[3px] border-black shadow-[4px_4px_0_0_#000] mb-6 transition-all rounded-none`}>
      {/* HEADER: The Entry Point */}
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className={`text-2xl md:text-3xl font-black font-spacegrotesk italic tracking-tight ${color}`}>
          {item.name}
        </h3>
        {isExpanded ? <ChevronUp className="text-black" strokeWidth={3} /> : <ChevronDown className="text-black" strokeWidth={3} />}
      </button>

      {isExpanded && (
        <div className="px-5 md:px-8 pb-8 animate-in slide-in-from-top-2 duration-300">
          
          {/* THE LEDGER: Meta Meta Data */}
          <div className="border-y-[3px] border-black my-4 py-2 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs font-black uppercase tracking-wider text-black">
            <span className="flex items-center gap-2">
              <SeverityIcon size={14} strokeWidth={3} /> {label}
            </span>
            <span className="opacity-20">|</span>
            <BrutalistTooltip text="The AI's certainty level based on visual similarity to known dark pattern datasets (FTC/Nielsen Norman).">
              <span>CONFIDENCE: {item.confidence_score}%</span>
            </BrutalistTooltip>
            <span className="opacity-20">|</span>
            <span className="flex items-center gap-2">
              <Target size={14} strokeWidth={3} /> {item.cognitive_exploit}
            </span>
          </div>

          <p className="text-sm font-bold text-black leading-relaxed mb-6 font-body">
            {item.desc}
          </p>

          {/* THE EVIDENCE GRID: Toxic vs Ethical Split-Diff */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[3px] border-black mb-6">
            <div className="bg-red-50 p-5 md:p-6 border-b-[3px] md:border-b-0 md:border-r-[3px] border-black">
              <span className="text-[10px] font-black uppercase text-[#FA4D56] mb-3 block font-mono tracking-widest">
                // DETECTED_COPY
              </span>
              <p className="text-sm font-bold italic text-black font-body leading-relaxed">
                "{item.bad_copy_example || 'N/A'}"
              </p>
            </div>
            <div className="bg-green-50 p-5 md:p-6">
              <span className="text-[10px] font-black uppercase text-[#42BE65] mb-3 block font-mono tracking-widest">
                // ETHICAL_REWRITE
              </span>
              <p className="text-sm font-bold text-black font-body leading-relaxed">
                "{item.ethical_rewrite || 'N/A'}"
              </p>
            </div>
          </div>

          {/* THE RULING: Analysis paragraph */}
          <div className="space-y-4">
            <p className="text-sm font-bold text-gray-700 leading-relaxed font-body">
              {item.analysis}
            </p>
          </div>

          {/* THE FOOTER: Remediation & Legal Context */}
          <div className="bg-gray-100 p-5 md:p-6 border-t-[3px] border-black mt-6 space-y-4">
            <div>
              <h5 className="text-xs font-black uppercase flex items-center gap-2 mb-2 tracking-tight font-spacegrotesk">
                <Zap size={16} className="text-[#F1C21B]" strokeWidth={3} /> Remediation strategy
              </h5>
              <p className="text-xs font-black text-black leading-relaxed font-body">
                {item.fix}
              </p>
            </div>
            
            <div className="flex items-start gap-2 pt-2 border-t-[1px] border-black/10">
              <Settings size={14} className="text-gray-400 mt-0.5" strokeWidth={3} />
              <p className="text-[10px] font-mono text-gray-600 uppercase font-black">
                CIT_PRECEDENT: {item.citation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Report: React.FC<ReportProps> = ({ report, resetToHome }) => {
  const [activeTab, setActiveTab] = useState<'audit' | 'ethics' | 'transparency' | 'citations' | 'workbench'>('audit');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  if (!report) return null;

  const { is_ai_present = true, audit_results = [], global_rec = '', ethics = {} as any, transparency = {} as any, verified_citations = [], remediation_plans = [], google_pair_audit = { compliance_score: 0, principles: [] } } = report;

  // Use the forensic presence detector from the model
  const hasAiDetected = is_ai_present;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const downloadSingleFix = (plan: RemediationPlan) => {
    const blob = new Blob([plan.suggested_component.react_code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${plan.suggested_component.component_name}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deception = (score: number) => {
    if (score <= 15) return { label: 'ETHICAL', color: 'text-[#42BE65]' };
    if (score <= 40) return { label: 'NEUTRAL', color: 'text-[#F1C21B]' };
    if (score <= 75) return { label: 'MANIPULATIVE', color: 'text-[#FD7E14]' };
    return { label: 'PREDATORY', color: 'text-[#FA4D56]' };
  };

  const trans = (score: number) => {
    if (score <= 35) return { label: 'BLACK BOX', color: 'text-[#FA4D56]' };
    if (score <= 75) return { label: 'GREY BOX', color: 'text-[#F1C21B]' };
    return { label: 'GLASS BOX', color: 'text-[#42BE65]' };
  };

  const riskColor = (risk: string) => {
    const r = (risk || '').toUpperCase();
    if (r === 'HIGH') return 'text-[#FA4D56]';
    if (r === 'MEDIUM' || r === 'MED') return 'text-[#FD7E14]';
    return 'text-[#42BE65]';
  };

  const TabButton = ({ id, label }: { id: typeof activeTab; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-4 font-spacegrotesk font-black text-[10px] md:text-sm border-r-[3px] border-black transition-all rounded-none whitespace-nowrap ${
        activeTab === id ? 'bg-white border-b-4 border-b-[#42BE65]' : 'bg-[#F4F4F4] hover:bg-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* SUMMARY SCORECARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-white border-[3px] border-black p-6 md:p-10 shadow-[6px_6px_0_0_#000] rounded-none flex flex-col justify-between min-h-[180px] md:min-h-[220px]">
          <h5 className="text-[10px] font-black uppercase font-mono text-black tracking-widest">// Manipulation index</h5>
          <div className="py-2 md:py-4">
            <BrutalistTooltip text="Weighted scoring of detected patterns. 0-15: Ethical | 16-40: Neutral | 41-75: Manipulative | 76-100: Predatory.">
              <h2 className={`text-4xl md:text-5xl font-black font-spacegrotesk tracking-tighter italic uppercase ${deception(report.dashboard.manipulation).color}`}>
                {deception(report.dashboard.manipulation).label}
              </h2>
            </BrutalistTooltip>
            <div className="mt-2 text-[10px] md:text-xs font-black font-mono uppercase">SCORE_VAL: {report.dashboard.manipulation}/100</div>
          </div>
        </div>

        {/* AI OPACITY / PRESENCE CARD */}
        <div className={`${!hasAiDetected ? 'bg-gray-100' : 'bg-white'} border-[3px] border-black p-6 md:p-10 shadow-[6px_6px_0_0_#000] rounded-none flex flex-col justify-between min-h-[180px] md:min-h-[220px] transition-colors duration-500`}>
          <h5 className="text-[10px] font-black uppercase font-mono text-black tracking-widest">
            {hasAiDetected ? '// AI opacity' : '// AI PRESENCE'}
          </h5>
          <div className="py-2 md:py-4">
            {!hasAiDetected ? (
              <>
                <h2 className="text-4xl md:text-5xl font-black font-spacegrotesk tracking-tighter italic uppercase text-gray-400">
                  NONE DETECTED
                </h2>
                <div className="mt-2 text-[10px] md:text-xs font-black font-mono uppercase">STATUS: HUMAN_CURATED</div>
              </>
            ) : (
              <>
                <BrutalistTooltip text="Based on Google PAIR disclosure signals. <35: Black Box (No label) | 36-75: Grey Box (Partial) | >76: Glass Box (Full citation).">
                  <h2 className={`text-4xl md:text-5xl font-black font-spacegrotesk tracking-tighter italic uppercase ${trans(report.dashboard.opacity).color}`}>
                    {trans(report.dashboard.opacity).label}
                  </h2>
                </BrutalistTooltip>
                <div className="mt-2 text-[10px] md:text-xs font-black font-mono uppercase">SCORE_VAL: {report.dashboard.opacity}/100</div>
              </>
            )}
          </div>
        </div>

        <div className="bg-white border-[3px] border-black p-6 md:p-10 shadow-[6px_6px_0_0_#000] rounded-none flex flex-col justify-between min-h-[180px] md:min-h-[220px]">
          <h5 className="text-[10px] font-black uppercase font-mono text-black tracking-widest">// Regulatory risk</h5>
          <div className="py-2 md:py-4">
            <BrutalistTooltip text="Compliance projection based on EU AI Act Art. 52 (Transparency) and GDPR Art. 22 (Automated Decision Making).">
              <h2 className={`text-4xl md:text-5xl font-black font-spacegrotesk tracking-tighter italic uppercase ${riskColor(report.dashboard.risk)}`}>
                {(report.dashboard.risk || 'SAFE').toUpperCase()}
              </h2>
            </BrutalistTooltip>
            <div className="mt-2 text-[10px] md:text-xs font-black font-mono uppercase">STATUS: {report.dashboard.risk === 'HIGH' ? 'CRITICAL_ACTION' : 'MONITORING'}</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000] overflow-x-auto rounded-none no-scrollbar sticky top-[84px] z-40">
        <TabButton id="audit" label="Audit results" />
        <TabButton id="ethics" label="Ethics scorecard" />
        <TabButton id="transparency" label="AI transparency" />
        <TabButton id="workbench" label="Remediation" />
        <TabButton id="citations" label="Forensic citation" />
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'audit' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            <div className="lg:col-span-3">
              {audit_results.length > 0 ? (
                audit_results.map((item, idx) => (
                  <FindingCard 
                    key={idx} 
                    item={item} 
                    index={idx} 
                    expanded={expandedIndex === idx} 
                    onToggle={() => setExpandedIndex(expandedIndex === idx ? null : idx)} 
                  />
                ))
              ) : (
                <div className="bg-white border-[6px] border-[#42BE65] p-10 md:p-20 text-center shadow-[12px_12px_0_0_#000] rounded-none flex flex-col items-center gap-6">
                  <ShieldCheck size={80} className="text-[#42BE65]" strokeWidth={3} />
                  <h3 className="text-3xl md:text-5xl font-black font-spacegrotesk italic tracking-tighter leading-none">Compliance certificate</h3>
                  <p className="text-lg md:text-xl font-black opacity-60">No violations detected. System clean.</p>
                  <div className="w-full h-[3px] bg-black my-4"></div>
                  <p className="text-[10px] font-mono opacity-40 uppercase font-black tracking-widest">Certified Forensic Clearance v1.0.4</p>
                </div>
              )}
            </div>
            <div className="lg:col-span-1 bg-black p-6 md:p-8 text-white shadow-[8px_8px_0_0_#42BE65] rounded-none lg:sticky lg:top-48">
              <h3 className="text-xl md:text-2xl font-black font-spacegrotesk leading-none mb-6 italic border-b-[3px] border-white/20 pb-4 tracking-tight">Executive briefing:</h3>
              <p className="text-sm md:text-base font-bold leading-relaxed opacity-90 font-body">{global_rec || 'System analysis suggests standard architecture.'}</p>
            </div>
          </div>
        )}

        {activeTab === 'workbench' && (
          <div className="space-y-8 md:space-y-12 animate-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-12 md:space-y-16">
              {remediation_plans.length > 0 ? remediation_plans.map((plan, i) => (
                <div key={i} className="bg-[#F4F4F4] border-[3px] border-black shadow-[10px_10px_0_0_#000] rounded-none overflow-hidden">
                  <div className="bg-black text-white p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-[3px] border-black gap-2">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#42BE65] text-black font-black text-[10px] px-2 py-1 uppercase tracking-widest font-mono">PLAN_{i + 1}</span>
                      <h3 className="text-lg md:text-xl font-black font-spacegrotesk tracking-tight italic">{plan.pattern_name} fix</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-6 md:p-8 border-r-[3px] border-black space-y-8 bg-white">
                      <div className="space-y-4">
                        <div className="bg-[#FA4D56]/10 border-[3px] border-[#FA4D56] p-4 md:p-6 shadow-[4px_4px_0_0_#FA4D56]">
                          <span className="text-[10px] font-black uppercase text-[#FA4D56] mb-2 block font-mono">DETECTED_COPY</span>
                          <p className="text-xs md:text-sm font-bold italic font-body">"{plan.original_copy_snippet}"</p>
                        </div>
                        <div className="bg-[#42BE65]/10 border-[3px] border-[#42BE65] p-4 md:p-6 shadow-[4px_4px_0_0_#42BE65]">
                          <span className="text-[10px] font-black uppercase text-[#42BE65] mb-2 block font-mono">ETHICAL_VARIANT</span>
                          <p className="text-xs md:text-sm font-bold font-body">"{plan.rewritten_copy_snippet}"</p>
                        </div>
                      </div>
                      
                      <div className="bg-[#F4F4F4] border-[3px] border-black p-4 md:p-6">
                         <h5 className="text-[10px] font-black uppercase mb-3 text-black border-b-[2px] border-black pb-2 tracking-widest font-mono uppercase">Remediation_rationale</h5>
                         <p className="text-xs font-bold leading-relaxed text-gray-700 italic font-body">{plan.suggested_component.why_it_works}</p>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-0 flex flex-col min-h-[400px]">
                      <div className="bg-gray-800 border-b-[3px] border-black p-4 flex justify-between items-center">
                         <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 font-mono">
                           <Layout size={14} strokeWidth={3} /> {plan.suggested_component.component_name}.tsx
                         </span>
                         <div className="flex gap-2">
                           <button 
                            onClick={() => downloadSingleFix(plan)}
                            className="p-1.5 md:p-2 bg-white border-[2px] border-black hover:bg-[#42BE65] transition-colors rounded-none"
                            title="Download component"
                           >
                             <Download size={14} strokeWidth={3} />
                           </button>
                           <button 
                            onClick={() => copyToClipboard(plan.suggested_component.react_code, i)}
                            className={`min-w-[100px] md:min-w-[120px] text-[10px] font-black uppercase px-3 py-1 border-[2px] transition-all flex items-center justify-center gap-2 rounded-none relative overflow-hidden font-spacegrotesk ${
                              copiedCodeIndex === i 
                                ? 'bg-[#42BE65] border-black text-black scale-105' 
                                : 'bg-white border-white hover:bg-black hover:text-white'
                            }`}
                           >
                             {copiedCodeIndex === i ? (
                               <span className="flex items-center gap-1 animate-in slide-in-from-bottom-1 duration-300">
                                 <Check size={12} strokeWidth={4} /> COPIED
                               </span>
                             ) : (
                               <span className="flex items-center gap-1">
                                 <Copy size={12} strokeWidth={3} /> COPY_CODE
                               </span>
                             )}
                           </button>
                         </div>
                      </div>
                      <div className="flex-grow p-4 md:p-6 overflow-x-auto">
                        <pre className="text-green-400 font-mono text-[11px] leading-relaxed">
                          <code>{plan.suggested_component.react_code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F1C21B] border-t-[3px] border-black p-4 md:p-6 flex items-start gap-4">
                    <div className="bg-black text-[#F1C21B] p-2 border-[3px] border-black flex-shrink-0">
                      <TrendingUp size={24} strokeWidth={3} />
                    </div>
                    <div>
                      <h5 className="text-xs md:text-sm font-black tracking-tight text-black mb-1 font-spacegrotesk">
                        Business impact: {plan.business_justification.metric} ({plan.business_justification.projected_impact} IMPACT)
                      </h5>
                      <p className="text-xs font-bold leading-relaxed opacity-80 font-body">
                        {plan.business_justification.argument}
                      </p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-20 border-[3px] border-black bg-white text-center rounded-none italic font-bold opacity-40 font-body">
                  Audit system has not yet calculated remediation paths.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'transparency' && (
          <div className="space-y-8 md:space-y-12">
            {!hasAiDetected ? (
              <NoAiState />
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                  <div className="lg:col-span-1 bg-white border-[3px] border-black p-6 md:p-8 shadow-[10px_10px_0_0_#000] rounded-none flex flex-col h-full text-center">
                    <h4 className="text-xl font-black font-spacegrotesk mb-10 md:mb-12 text-left tracking-tight italic">Turing scale</h4>
                    <div className="flex-grow flex flex-col justify-center py-6">
                      <BrutalistTooltip text="Identity Classification: 'Black Box' = Impostor (Human-mimicry). 'Grey Box' = Unclear limits. 'Glass Box' = Transparent tools & citations.">
                        <h2 className={`text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 leading-none ${
                          report.dashboard.transparency_label === 'BLACK BOX' ? 'text-[#FA4D56]' : 
                          report.dashboard.transparency_label === 'GREY BOX' ? 'text-[#F1C21B]' : 'text-[#42BE65]'
                        }`}>
                          {report.dashboard.transparency_label || 'UNCLEAR'}
                        </h2>
                      </BrutalistTooltip>
                    </div>
                    <div className="mt-auto border-t-[3px] border-black pt-6">
                      <BrutalistTooltip text="Composite metric derived from 'Identity Disclosure', 'User Control', and 'Human Handoff' availability.">
                        <span className="text-xl font-black font-spacegrotesk tracking-tight uppercase">Trust_Score: {transparency.trust_score ?? 0}%</span>
                      </BrutalistTooltip>
                    </div>
                  </div>

                  <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <SignalSection title="Trust detractors" type="detractor" items={transparency.signals} />
                    <SignalSection title="Trust validators" type="validator" items={transparency.signals} />
                  </div>
                </div>

                <div className="bg-white border-[3px] border-black p-6 md:p-12 shadow-[12px_12px_0_0_#0F62FE] rounded-none space-y-8">
                    <h3 className="text-3xl md:text-4xl font-black font-spacegrotesk italic tracking-tighter border-b-[4px] border-black pb-4 leading-none">Explainability diagnostic</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                      <DiagnosticBar label="Identity disclosure" desc="Agent clearly labeled as AI?" val={transparency.metrics?.identity ?? 0} />
                      <DiagnosticBar label="User autonomy" desc="Clear opt-outs and exit paths?" val={transparency.metrics?.control ?? 0} />
                      <DiagnosticBar label="Causal clarity" desc="Explainable reasoning logic?" val={transparency.metrics?.handoff ?? 0} />
                    </div>
                </div>

                <div className="w-full bg-[#42BE65] border-[3px] border-black p-6 md:p-12 shadow-[10px_10px_0px_#000] rounded-none animate-in slide-in-from-bottom-8 duration-700">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 border-b-[4px] border-black pb-8">
                        <h3 className="text-3xl md:text-5xl font-black font-spacegrotesk text-black leading-none tracking-tighter italic">
                            Google PAIR evaluation
                        </h3>
                        <BrutalistTooltip text="Adherence rate to Google's 4 AI Design Principles: Explainability, Failure States, Feedback Controls, and Expectation Setting.">
                          <div className="bg-black text-white p-4 md:p-6 border-[3px] border-black shadow-[4px_4px_0px_#FFF] flex flex-col items-center justify-center min-w-[200px]">
                              <span className="text-[10px] font-mono font-black uppercase tracking-widest opacity-60 mb-1">COMPLIANCE_SCORE</span>
                              <div className="text-4xl md:text-5xl font-black font-spacegrotesk text-[#42BE65]">
                                  {google_pair_audit.compliance_score}%
                              </div>
                          </div>
                        </BrutalistTooltip>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(google_pair_audit.principles || []).map((principle, idx) => {
                            const isPass = principle.status === 'Pass';
                            const isFail = principle.status === 'Fail';
                            const isPartial = principle.status === 'Partial';

                            return (
                                <div key={idx} className="bg-white border-[3px] border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] relative flex flex-col h-full rounded-none group hover:-translate-y-2 transition-transform duration-300">
                                    <div className="mb-6 flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center border-[3px] border-black bg-white shadow-[3px_3px_0_0_#000]`}>
                                              {isPass && <CheckCircle2 size={24} className="text-[#42BE65]" strokeWidth={3} />}
                                              {isFail && <AlertTriangle size={24} className="text-[#FA4D56]" strokeWidth={3} />}
                                              {isPartial && <AlertCircle size={24} className="text-[#F1C21B]" strokeWidth={3} />}
                                            </div>
                                            <h4 className="text-xl font-black font-spacegrotesk tracking-tight italic">
                                                {principle.name}
                                            </h4>
                                        </div>
                                        <div className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border-[2px] border-black ${
                                            isPass ? 'bg-[#42BE65]' : isFail ? 'bg-[#FA4D56] text-white' : 'bg-[#F1C21B]'
                                        }`}>
                                            {principle.status}
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold leading-relaxed text-black italic font-body opacity-80 flex-grow">
                                        "{principle.observation}"
                                    </p>
                                    <div className="mt-6 pt-4 border-t-[2px] border-black/10 font-mono text-[9px] font-black uppercase opacity-40">
                                        PAIR_PRINCIPLE_AUDIT_V1
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'citations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {(verified_citations || []).length > 0 ? verified_citations.map((cite: LegalPrecedent, i: number) => (
              <CitationCard key={i} cite={cite} />
            )) : (
              <div className="col-span-full bg-white border-[3px] border-black p-10 md:p-20 text-center opacity-40 rounded-none italic flex flex-col items-center gap-6 font-body">
                <Gavel size={60} strokeWidth={3} className="text-gray-400" />
                <p className="text-lg md:text-xl font-black font-spacegrotesk italic tracking-widest">No legal forensics available</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ethics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <EthicsCard 
              title="User agency" 
              data={ethics.agency} 
              tooltipText="Grading Autonomy: 'A' = No Friction. 'C' = Confusing Navigation/Nudges. 'F' = Forced Action or Blocked Cancellation."
            />
            <EthicsCard 
              title="Safety & trust" 
              data={ethics.safety} 
              tooltipText="Grading Harm: 'A' = Privacy by Default. 'C' = Social Pressure/Urgency. 'F' = Financial Injury or Data Leakage."
            />
            <EthicsCard 
              title="Value alignment" 
              data={ethics.value} 
              tooltipText="Grading Intent: 'A' = User-Centric. 'C' = Drip Pricing/Ambiguity. 'F' = Deceptive/Business-First Defaults."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;