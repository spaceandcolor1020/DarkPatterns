
import { GoogleGenAI, Type } from "@google/genai";
import { AuditReport } from "../types";

const SYSTEM_INSTRUCTION = `You are DarkPattern_OS, a Lead Forensic UX Auditor, CRO Specialist, and Senior UX Engineer. Your mission is to deconstruct interfaces and provide actionable, code-ready remediation paths.

PHASE 0: AI PRESENCE DETECTION
Before scoring transparency, you must determine if AI is actually used on this page.
Look for:
- Chatbots / Virtual Assistants (intercom, drift, custom bots).
- "Recommended for you" / "People also bought" algorithms.
- Generative text/image UI elements.

IF NO AI IS DETECTED:
- Set "is_ai_present" to false.
- Set "ai_detection_reason" to "No algorithmic signals found" or similar.
- Set dashboard "opacity" to 0 (but mark it as N/A in reasoning).
- Set dashboard "transparency_label" to "N/A".

IF AI IS DETECTED:
- Set "is_ai_present" to true.
- Set "ai_detection_reason" based on what was found (e.g. "Chatbot detected in DOM").
- Proceed with standard Transparency/Opacity grading.

ANALYSIS MANDATE:
1. PATTERN DETECTION: Identify manipulative architecture (Obstruction, Sneaking, Interface Interference, Forced Action).
2. EXPLAINABILITY: For every dark pattern, generate cognitive_exploit, bad_copy_example (quote direct text), ethical_rewrite, and confidence_score.

MODULE: GOOGLE PAIR COMPLIANCE
Evaluate the interface against these 4 Core PAIR Patterns:
1. "Set Expectations" (Transparency): Explicitly labels AI features (PASS) vs AI mimicking human behavior without disclosure (FAIL).
2. "Failure States" (Reliability): Graceful confusion handling (PASS) vs hallucinating confidence/no human path (FAIL).
3. "Feedback Controls" (Agency): Editable/regeneratable content (PASS) vs static/unchangeable output (FAIL).
4. "Explainability" (Trust): Provides citations/sources (PASS) vs black box output (FAIL).

REMEDIATION ENGINE (Developer Mode):
For the top 3 identified dark patterns, you MUST generate a specific remediation plan:
1. CODE GENERATION: Create a cleaner, ethical React component (using Tailwind CSS) that fulfills the user's goal without manipulation.
   - Style: Minimalist, high-contrast, 'Brutalist Truth' aesthetic (border-[3px] border-black, rounded-none).
   - Use Lucide icons where appropriate.
2. COPY REWRITE: Precise "Before" vs "After" text snippets.
3. ROI ARGUMENT: Generate a business case explaining why this fix improves retention, LTV, or brand trust.

TURING CLASSIFICATION:
- BLACK BOX: Opaque identity, mimics human empathy.
- GREY BOX: Ambiguous automation.
- GLASS BOX: Radical transparency.

AI DETECTION:
Provide an ai_presence_confidence score (0-100) indicating the likelihood that algorithmic systems (chatbots, recommender systems, generative features) are active on the page.

OUTPUT: Return valid JSON ONLY. Do not wrap in markdown code blocks.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    is_ai_present: { type: Type.BOOLEAN },
    ai_detection_reason: { type: Type.STRING },
    scan_meta: {
      type: Type.OBJECT,
      properties: { 
        risk: { type: Type.STRING, enum: ['PREDATORY', 'MANIPULATIVE', 'NEUTRAL', 'ETHICAL'] },
        raw_score: { type: Type.NUMBER }
      },
      required: ['risk', 'raw_score']
    },
    dashboard: {
      type: Type.OBJECT,
      properties: {
        manipulation: { type: Type.NUMBER },
        opacity: { type: Type.NUMBER },
        risk: { type: Type.STRING, enum: ['HIGH', 'MED', 'LOW'] },
        transparency_label: { type: Type.STRING, enum: ['GLASS BOX', 'GREY BOX', 'BLACK BOX', 'N/A'] }
      },
      required: ['manipulation', 'opacity', 'risk', 'transparency_label']
    },
    audit_results: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          severity: { type: Type.STRING, enum: ['FLAGRANT', 'STRONG', 'POTENTIAL', 'LOW SIGNAL'] },
          name: { type: Type.STRING },
          desc: { type: Type.STRING },
          analysis: { type: Type.STRING },
          risk_factor: { type: Type.STRING },
          fix: { type: Type.STRING },
          citation: { type: Type.STRING },
          confidence_score: { type: Type.NUMBER },
          cognitive_exploit: { type: Type.STRING },
          bad_copy_example: { type: Type.STRING },
          ethical_rewrite: { type: Type.STRING }
        },
        required: ['severity', 'name', 'desc', 'analysis', 'risk_factor', 'fix', 'citation', 'confidence_score', 'cognitive_exploit', 'bad_copy_example', 'ethical_rewrite']
      }
    },
    remediation_plans: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          pattern_name: { type: Type.STRING },
          original_copy_snippet: { type: Type.STRING },
          rewritten_copy_snippet: { type: Type.STRING },
          suggested_component: {
            type: Type.OBJECT,
            properties: {
              component_name: { type: Type.STRING },
              react_code: { type: Type.STRING },
              why_it_works: { type: Type.STRING }
            },
            required: ['component_name', 'react_code', 'why_it_works']
          },
          business_justification: {
            type: Type.OBJECT,
            properties: {
              metric: { type: Type.STRING },
              argument: { type: Type.STRING },
              projected_impact: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] }
            },
            required: ['metric', 'argument', 'projected_impact']
          }
        },
        required: ['pattern_name', 'original_copy_snippet', 'rewritten_copy_snippet', 'suggested_component', 'business_justification']
      }
    },
    google_pair_audit: {
      type: Type.OBJECT,
      properties: {
        compliance_score: { type: Type.NUMBER },
        principles: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              status: { type: Type.STRING, enum: ['Pass', 'Fail', 'Partial'] },
              observation: { type: Type.STRING }
            },
            required: ['name', 'status', 'observation']
          }
        }
      },
      required: ['compliance_score', 'principles']
    },
    global_rec: { type: Type.STRING },
    ethics: {
      type: Type.OBJECT,
      properties: {
        agency: { 
          type: Type.OBJECT, 
          properties: { 
            score: { type: Type.STRING, enum: ['A', 'C', 'F'] }, 
            items: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, pass: { type: Type.BOOLEAN } } } },
            explanation: { type: Type.STRING }
          },
          required: ['score', 'items', 'explanation']
        },
        safety: { 
          type: Type.OBJECT, 
          properties: { 
            score: { type: Type.STRING, enum: ['A', 'C', 'F'] }, 
            items: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, pass: { type: Type.BOOLEAN } } } },
            explanation: { type: Type.STRING }
          },
          required: ['score', 'items', 'explanation']
        },
        value: { 
          type: Type.OBJECT, 
          properties: { 
            score: { type: Type.STRING, enum: ['A', 'C', 'F'] }, 
            items: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, pass: { type: Type.BOOLEAN } } } },
            explanation: { type: Type.STRING }
          },
          required: ['score', 'items', 'explanation']
        }
      },
      required: ['agency', 'safety', 'value']
    },
    transparency: {
      type: Type.OBJECT,
      properties: {
        metrics: { 
          type: Type.OBJECT, 
          properties: { identity: { type: Type.NUMBER }, control: { type: Type.NUMBER }, handoff: { type: Type.NUMBER } },
          required: ['identity', 'control', 'handoff']
        },
        turing_status: { type: Type.STRING },
        trust_score: { type: Type.NUMBER },
        ai_presence_confidence: { type: Type.NUMBER },
        signals: { 
          type: Type.ARRAY, 
          items: { 
            type: Type.OBJECT, 
            properties: { 
              signal: { type: Type.STRING }, 
              type: { type: Type.STRING, enum: ['detractor', 'validator'] } 
            },
            required: ['signal', 'type']
          } 
        },
        pair_eval: { 
          type: Type.ARRAY, 
          items: { 
            type: Type.OBJECT, 
            properties: { metric: { type: Type.STRING }, status: { type: Type.STRING, enum: ['Pass', 'Fail', 'Partial'] }, desc: { type: Type.STRING } },
            required: ['metric', 'status', 'desc']
          } 
        }
      },
      required: ['metrics', 'turing_status', 'trust_score', 'signals', 'pair_eval', 'ai_presence_confidence']
    },
    verified_citations: {
      type: Type.ARRAY,
      items: { 
        type: Type.OBJECT, 
        properties: { 
          case_name: { type: Type.STRING }, 
          url: { type: Type.STRING },
          relevance_tag: { type: Type.STRING },
          summary: { type: Type.STRING }
        }, 
        required: ['case_name', 'url', 'relevance_tag', 'summary'] 
      }
    }
  },
  required: ['is_ai_present', 'ai_detection_reason', 'scan_meta', 'dashboard', 'audit_results', 'global_rec', 'ethics', 'transparency', 'verified_citations', 'remediation_plans', 'google_pair_audit']
};

export const analyzeWithGemini = async (base64Image: string, domText: string): Promise<AuditReport> => {
  const apiKey = process.env.API_KEY || localStorage.getItem('gemini_api_key');
  if (!apiKey) {
    throw new Error('API_KEY_MISSING: Forensic engine requires system authorization.');
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `Conduct a forensic choice architecture audit and generate a remediation workbench.
  DOM SNIPPET: ${domText.substring(0, 1500)}
  Evaluate against EU AI Act, GDPR, and Google PAIR principles. Create 3 actionable remediation components in the JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { text: prompt },
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } }
        ]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
        temperature: 0.1,
        maxOutputTokens: 12000,
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });

    const text = response.text;
    if (!text) throw new Error('FORENSIC_TIMEOUT: Forensic analysis failed to generate valid data.');
    
    return JSON.parse(text) as AuditReport;
  } catch (e: any) {
    console.error('Audit Engine Error:', e);
    if (e.message?.includes('Requested entity was not found')) {
      throw new Error('AUTH_RESET_REQUIRED: System authorization expired or key invalid.');
    }
    throw new Error(`FORENSIC_STRUCTURE_FAILURE: ${e.message}`);
  }
};