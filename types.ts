
export interface ComponentFix {
  component_name: string;
  react_code: string;
  why_it_works: string;
}

export interface BusinessCase {
  metric: string;
  argument: string;
  projected_impact: "High" | "Medium" | "Low";
}

export interface RemediationPlan {
  pattern_name: string;
  original_copy_snippet: string;
  rewritten_copy_snippet: string;
  suggested_component: ComponentFix;
  business_justification: BusinessCase;
}

export interface DarkPatternFinding {
  severity: 'FLAGRANT' | 'STRONG' | 'POTENTIAL' | 'LOW SIGNAL';
  name: string;
  desc: string;
  analysis: string;
  risk_factor: string;
  fix: string;
  citation: string;
  confidence_score: number;
  cognitive_exploit: string;
  bad_copy_example: string;
  ethical_rewrite: string;
}

export interface EthicsItem {
  label: string;
  pass: boolean;
}

export interface EthicsSection {
  score: 'A' | 'C' | 'F';
  items: EthicsItem[];
  explanation: string;
}

export interface PairEval {
  metric: string;
  status: 'Pass' | 'Fail' | 'Partial';
  desc: string;
}

export interface UISignal {
  signal: string;
  type: 'detractor' | 'validator';
}

export interface LegalPrecedent {
  case_name: string;
  url: string;
  relevance_tag: string;
  summary: string;
}

export interface GooglePairPrinciple {
  name: string;
  status: 'Pass' | 'Fail' | 'Partial';
  observation: string;
}

export interface GooglePairAudit {
  compliance_score: number;
  principles: GooglePairPrinciple[];
}

export interface AuditReport {
  is_ai_present: boolean;
  ai_detection_reason: string;
  scan_meta: { 
    risk: 'PREDATORY' | 'MANIPULATIVE' | 'NEUTRAL' | 'ETHICAL';
    raw_score: number;
  };
  dashboard: { 
    manipulation: number; 
    opacity: number; 
    risk: 'HIGH' | 'MED' | 'LOW';
    transparency_label: 'GLASS BOX' | 'GREY BOX' | 'BLACK BOX' | 'N/A';
  };
  audit_results: DarkPatternFinding[];
  global_rec: string;
  ethics: {
    agency: EthicsSection;
    safety: EthicsSection;
    value: EthicsSection;
  };
  transparency: {
    metrics: { identity: number; control: number; handoff: number };
    turing_status: string;
    trust_score: number;
    signals: UISignal[];
    pair_eval: PairEval[];
    ai_presence_confidence: number;
  };
  google_pair_audit: GooglePairAudit;
  verified_citations: LegalPrecedent[];
  remediation_plans: RemediationPlan[];
}

export interface TerminalMessage {
  text: string;
  type: 'info' | 'success' | 'error';
  timestamp: string;
}