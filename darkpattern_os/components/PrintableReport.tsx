
import React from 'react';
import { AuditReport, DarkPatternFinding } from '../types';
import { FindingCard, EthicsCard, DiagnosticBar, SignalSection, CitationCard } from './Report';

interface PrintableReportProps {
  report: AuditReport;
  url: string;
}

const PrintableReport: React.FC<PrintableReportProps> = ({ report, url }) => {
  const { 
    audit_results = [], 
    global_rec = '', 
    ethics = {} as any, 
    transparency = {} as any, 
    verified_citations = [], 
    remediation_plans = [], 
    google_pair_audit = { compliance_score: 0, principles: [] },
    dashboard = { manipulation: 0, opacity: 0, risk: 'LOW', transparency_label: 'GLASS BOX' }
  } = report;

  const dateStr = new Date().toLocaleDateString();

  return (
    <div className="bg-[#F4F4F0] p-10 font-inter text-black max-w-[210mm] mx-auto">
      {/* Dossier Header */}
      <div className="border-b-4 border-black pb-8 mb-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-black font-spacegrotesk uppercase italic tracking-tighter leading-none mb-2">Forensic Dossier</h1>
            <p className="font-mono text-[10px] uppercase opacity-60">System Version: DarkPattern_OS v1.0.4 // Scan_Date: {dateStr}</p>
          </div>
          <div className="bg-black text-white p-4 font-mono text-[10px] font-black uppercase tracking-widest border-[3px] border-black">
            Classified: INTERNAL_ONLY
          </div>
        </div>
        <div className="bg-white border-[3px] border-black p-4 font-mono text-xs">
          <span className="opacity-40">TARGET_URL:</span> {url}
        </div>
      </div>

      {/* Summary Scorecards */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="bg-white border-[3px] border-black p-6 text-center">
          <h5 className="text-[9px] font-black uppercase font-mono mb-4 tracking-widest">// MANIPULATION</h5>
          <h2 className="text-3xl font-black font-spacegrotesk italic uppercase mb-2">{dashboard.manipulation}/100</h2>
        </div>
        <div className="bg-white border-[3px] border-black p-6 text-center">
          <h5 className="text-[9px] font-black uppercase font-mono mb-4 tracking-widest">// AI_OPACITY</h5>
          <h2 className="text-3xl font-black font-spacegrotesk italic uppercase mb-2">{dashboard.opacity}/100</h2>
        </div>
        <div className="bg-white border-[3px] border-black p-6 text-center">
          <h5 className="text-[9px] font-black uppercase font-mono mb-4 tracking-widest">// RISK_LEVEL</h5>
          <h2 className="text-3xl font-black font-spacegrotesk italic uppercase mb-2">{dashboard.risk}</h2>
        </div>
      </div>

      <div className="bg-black text-white p-6 mb-12 border-[3px] border-black">
        <h3 className="text-xl font-black font-spacegrotesk uppercase italic mb-2 tracking-tight">Executive_Briefing</h3>
        <p className="text-sm font-bold opacity-80 leading-relaxed font-body">{global_rec}</p>
      </div>

      {/* Audit Findings */}
      <section className="mb-16">
        <h3 className="text-3xl font-black font-spacegrotesk uppercase italic border-b-[3px] border-black pb-2 mb-8 tracking-tighter">01. Audit_Scan_Findings</h3>
        <div className="space-y-6">
          {audit_results.map((item, idx) => (
            <div key={idx} className="bg-white border-[3px] border-black p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-2xl font-black font-spacegrotesk uppercase italic tracking-tight">{item.name}</h4>
                <div className="bg-[#FA4D56] text-white px-2 py-1 text-[8px] font-black uppercase font-mono">{item.severity}</div>
              </div>
              <p className="text-sm font-bold mb-4 font-body">{item.desc}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 p-3 text-[10px] font-mono border-[2px] border-black">
                  <span className="block font-black uppercase opacity-40 mb-1">COGNITIVE_EXPLOIT</span>
                  {item.cognitive_exploit}
                </div>
                <div className="bg-gray-100 p-3 text-[10px] font-mono border-[2px] border-black">
                  <span className="block font-black uppercase opacity-40 mb-1">REMEDIATION_PLAN</span>
                  {item.fix}
                </div>
              </div>
              <div className="text-[9px] font-mono opacity-40 border-t pt-3 uppercase">CITATION: {item.citation}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ethics Scorecard */}
      <section className="mb-16">
        <h3 className="text-3xl font-black font-spacegrotesk uppercase italic border-b-[3px] border-black pb-2 mb-8 tracking-tighter">02. Ethics_Scorecard</h3>
        <div className="grid grid-cols-3 gap-6">
          {/* Fix: Added missing tooltipText prop to EthicsCard components as required by the component definition in Report.tsx */}
          <EthicsCard 
            title="User Agency" 
            data={ethics.agency} 
            tooltipText="Grading Autonomy: 'A' = No Friction. 'C' = Confusing Navigation/Nudges. 'F' = Forced Action or Blocked Cancellation."
          />
          <EthicsCard 
            title="Safety & Trust" 
            data={ethics.safety} 
            tooltipText="Grading Harm: 'A' = Privacy by Default. 'C' = Social Pressure/Urgency. 'F' = Financial Injury or Data Leakage."
          />
          <EthicsCard 
            title="Value Alignment" 
            data={ethics.value} 
            tooltipText="Grading Intent: 'A' = User-Centric. 'C' = Drip Pricing/Ambiguity. 'F' = Deceptive/Business-First Defaults."
          />
        </div>
      </section>

      {/* Transparency & AI */}
      <section className="mb-16">
        <h3 className="text-3xl font-black font-spacegrotesk uppercase italic border-b-[3px] border-black pb-2 mb-8 tracking-tighter">03. AI_Transparency_Audit</h3>
        <div className="grid grid-cols-2 gap-8 mb-10">
          <SignalSection title="TRUST DETRACTORS" type="detractor" items={transparency.signals} />
          <SignalSection title="TRUST VALIDATORS" type="validator" items={transparency.signals} />
        </div>
        <div className="bg-white border-[3px] border-black p-10 mb-10">
          <h4 className="text-xl font-black font-spacegrotesk uppercase italic mb-8">Explainability Diagnostic</h4>
          <div className="grid grid-cols-3 gap-8">
            <DiagnosticBar label="Identity Disclosure" desc="AI Labeling" val={transparency.metrics?.identity ?? 0} />
            <DiagnosticBar label="User Autonomy" desc="Exit Paths" val={transparency.metrics?.control ?? 0} />
            <DiagnosticBar label="Causal Clarity" desc="Reasoning" val={transparency.metrics?.handoff ?? 0} />
          </div>
        </div>
      </section>

      {/* Citations */}
      <section className="mb-16">
        <h3 className="text-3xl font-black font-spacegrotesk uppercase italic border-b-[3px] border-black pb-2 mb-8 tracking-tighter">04. Forensic_Citations</h3>
        <div className="grid grid-cols-2 gap-8">
          {verified_citations.map((cite, i) => (
            <div key={i} className="bg-white border-[3px] border-black p-6">
              <div className="text-[#0F62FE] font-mono text-[9px] font-black uppercase mb-4">{cite.relevance_tag}</div>
              <h4 className="text-lg font-black font-spacegrotesk italic uppercase mb-2 leading-none">{cite.case_name}</h4>
              <p className="text-[10px] font-bold opacity-70 italic font-body">"{cite.summary}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer info */}
      <div className="text-center pt-20 pb-10 border-t-[3px] border-black border-dashed">
        <p className="text-[10px] font-black font-spacegrotesk uppercase tracking-widest opacity-30">
          END_OF_DOSSIER // ADVERSARIAL UX FORENSICS ENGINE // DARKPATTERN_OS
        </p>
      </div>
    </div>
  );
};

export default PrintableReport;
