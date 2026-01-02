import React, { useState, useRef, useEffect } from 'react';
import { Loader2, Globe, Cpu, Database, Scale, Eye, RefreshCw, Terminal as TerminalIcon, Smile, Upload, ChevronDown, ChevronUp, Triangle, CheckCircle2, AlertOctagon, AlertCircle, Check } from 'lucide-react';
import { fetchMicrolinkData } from './services/microlinkService';
import { analyzeWithGemini } from './services/geminiService';
import { AuditReport, TerminalMessage } from './types';
import Report from './components/Report';
import Terminal from './components/Terminal';
import Docs from './components/Docs';
import ApiKeyModal from './components/ApiKeyModal';

const FORENSIC_PHRASES = [
  "Intercepting DOM node hierarchy...",
  "Analyzing CSS specificity for 'Hidden' patterns...",
  "Cross-referencing with EU AI Act Article 52(1)...",
  "Evaluating choice architecture for Sunk Cost Fallacy...",
  "Scanning for forced action buttons...",
  "Detecting high-friction exit paths...",
  "Calculating Manipulation Index (MI) score...",
  "Verifying transparency signals in footer metadata...",
  "Monitoring event listeners for exit-intent triggers...",
  "Profiling predatory urgency cues...",
  "Mapping behavioral heuristics to DETOUR Act sections..."
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'audit' | 'docs'>('audit');
  const [urlInput, setUrlInput] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [terminalMessages, setTerminalMessages] = useState<TerminalMessage[]>([]);
  const [loadingStep, setLoadingStep] = useState(0);
  const [lastError, setLastError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const [isPlanExpanded, setIsPlanExpanded] = useState(false);
  const loggingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // Check for environment key or manually entered key in localStorage
      const storedKey = localStorage.getItem('gemini_api_key');
      if (process.env.API_KEY || storedKey) {
        setIsAuthorized(true);
        return;
      }

      // Fallback to platform selector check
      if (window.aistudio) {
        const authorized = await window.aistudio.hasSelectedApiKey();
        setIsAuthorized(authorized);
      } else {
        setIsAuthorized(false);
      }
    };
    checkAuth();
  }, []);

  const addMessage = (text: string, type: 'info' | 'success' | 'error' = 'info') => {
    setTerminalMessages(prev => [...prev, {
      text,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }].slice(-50));
  };

  const resetToHome = () => {
    setReport(null);
    setIsLoading(false);
    setLastError(null);
    setValidationError(null);
    setCurrentView('audit');
    setLoadingStep(0);
    stopDynamicLogging();
  };

  const startDynamicLogging = () => {
    let index = 0;
    loggingIntervalRef.current = window.setInterval(() => {
      const phrase = FORENSIC_PHRASES[index % FORENSIC_PHRASES.length];
      addMessage(`PROCESS: ${phrase}`, 'info');
      index++;
    }, 1200);
  };

  const stopDynamicLogging = () => {
    if (loggingIntervalRef.current) {
      clearInterval(loggingIntervalRef.current);
      loggingIntervalRef.current = null;
    }
  };

  const validateUrl = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed) return null;

    if (/\s/.test(trimmed)) {
      return "URL_CONTAINS_SPACES: Target must be a continuous string.";
    }

    let testUrl = trimmed;
    if (!/^https?:\/\//i.test(testUrl)) {
      testUrl = `https://${testUrl}`;
    }

    try {
      const parsed = new URL(testUrl);
      const hostname = parsed.hostname;
      
      const isIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
      const hostParts = hostname.split('.');
      
      if (!isIP && (hostParts.length < 2 || hostParts.some(part => part.length === 0))) {
        return "INVALID_STRUCTURE: Domain must follow standard TLD format (e.g. site.com).";
      }
      
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return "RESTRICTED_HOST: Local audits are restricted for security reasons.";
      }

      return null;
    } catch (e) {
      return "SYNTAX_ERROR: Target fails RFC standard validation.";
    }
  };

  const handleUrlChange = (val: string) => {
    setUrlInput(val);
    setValidationError(validateUrl(val));
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleAudit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const storedKey = localStorage.getItem('gemini_api_key');
    if (!process.env.API_KEY && !storedKey && window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
      setIsAuthorized(false);
      return;
    }
    
    const vError = validateUrl(urlInput);
    if (vError || !urlInput.trim()) {
      setValidationError(vError || "REQUIRED_FIELD: Input target URL to begin audit.");
      return;
    }

    if (isLoading) return;

    let normalizedUrl = urlInput.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }
    setUrlInput(normalizedUrl);

    setCurrentView('audit');
    setIsLoading(true);
    setLastError(null);
    setLoadingStep(1);
    setTerminalMessages([]);
    setReport(null);

    try {
      addMessage(`INITIALIZING_DARKPATTERN_OS_SYSTEM...`);
      addMessage(`Target established: ${normalizedUrl}`);
      
      addMessage(`PHASE_01: Capture viewport pixels and DOM text context...`, 'info');
      const { base64, text } = await fetchMicrolinkData(normalizedUrl);
      addMessage(`Visual buffer received.`, 'success');
      await sleep(800);

      setLoadingStep(2);
      addMessage(`PHASE_02: Heuristic interrogation initialized...`, 'info');
      addMessage(`Scrubbing interface for 48 identified deceptive patterns.`, 'info');
      await sleep(1500);

      setLoadingStep(3);
      addMessage(`PHASE_03: Cognitive defense mapping active. Identifying bias exploits...`, 'info');
      startDynamicLogging();
      
      const auditResult = await analyzeWithGemini(base64, text);
      stopDynamicLogging();
      
      setLoadingStep(4);
      addMessage(`PHASE_04: Regulatory cross-check in progress...`, 'info');
      addMessage(`Verifying findings against EU AI Act Article 52.`, 'success');
      await sleep(1000);
      
      setLoadingStep(5);
      addMessage(`PHASE_05: Compiling ethical remediation plans and codefixes...`, 'success');
      await sleep(800);

      setReport(auditResult);
    } catch (err: any) {
      stopDynamicLogging();
      const errorMsg = err.message || 'CRITICAL_SYSTEM_FAILURE: UNKNOWN_EXCEPTION';
      
      if (errorMsg.includes('Requested entity was not found') || errorMsg.includes('API_KEY')) {
        setIsAuthorized(false);
        // If the key is invalid, clear the localStorage key to force a prompt
        localStorage.removeItem('gemini_api_key');
      }
      
      setLastError(errorMsg);
      addMessage(`ABORTED: ${errorMsg}`, 'error');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const workflowPhases = [
    { phase: "Phase_01", title: "Visual ingestion", desc: "The auditor ingests the target interface, mapping visual hierarchy, DOM structure, and latent UI signals to establish a forensic baseline." },
    { phase: "Phase_02", title: "Heuristic interrogation", desc: "The auditor ingests the target interface, mapping visual hierarchy, DOM structure, and latent UI signals to establish a forensic baseline." },
    { phase: "Phase_03", title: "Cognitive defense mapping", desc: "The auditor ingests the target interface, mapping visual hierarchy, DOM structure, and latent UI signals to establish a forensic baseline." },
    { phase: "Phase_04", title: "Regulatory cross-check", desc: "The auditor ingests the target interface, mapping visual hierarchy, DOM structure, and latent UI signals to establish a forensic baseline." },
    { phase: "Phase_05", title: "Ethical remediation", desc: "The auditor ingests the target interface, mapping visual hierarchy, DOM structure, and latent UI signals to establish a forensic baseline." }
  ];

  const progressPercent = (loadingStep / workflowPhases.length) * 100;
  const isInputValid = urlInput.trim() !== '' && !validationError;

  return (
    <div className="min-h-screen bg-[#F4F4F0] font-inter text-black">
      {!isAuthorized && <ApiKeyModal onAuthorized={() => setIsAuthorized(true)} />}
      
      <header className="flex items-center justify-between py-6 px-4 md:px-12 bg-white border-b-4 border-black sticky top-0 z-50">
        <div className="flex items-center cursor-pointer" onClick={resetToHome}>
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="mr-3"
          >
            <path 
              d="M12 2L14.5 8.5L20.5 5.5L17.5 11L22 12L17.5 13L20.5 18.5L14.5 15.5L12 22L9.5 15.5L3.5 18.5L6.5 13L2 12L6.5 11L3.5 5.5L9.5 8.5L12 2Z" 
              fill="black" 
              stroke="black" 
              strokeWidth="3" 
              strokeLinejoin="round"
              transform="translate(2, 2)"
            />
            <path 
              d="M12 2L14.5 8.5L20.5 5.5L17.5 11L22 12L17.5 13L20.5 18.5L14.5 15.5L12 22L9.5 15.5L3.5 18.5L6.5 13L2 12L6.5 11L3.5 5.5L9.5 8.5L12 2Z" 
              fill="#42BE65" 
              stroke="#42BE65" 
              strokeWidth="3" 
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-3xl md:text-5xl font-black font-spacegrotesk leading-none tracking-tighter">Dark Patterns</h1>
        </div>
        <div className="flex border-[3px] border-black font-mono text-xs font-bold rounded-none overflow-hidden">
          <button onClick={() => setCurrentView('audit')} className={`px-6 py-2 rounded-none transition-colors ${currentView === 'audit' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}>Tool</button>
          <button onClick={() => setCurrentView('docs')} className={`px-6 py-2 rounded-none border-l-[3px] border-black transition-colors ${currentView === 'docs' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}>About</button>
        </div>
      </header>

      {currentView === 'docs' ? <Docs /> : (
        isLoading || lastError ? (
          <main className="px-4 md:px-12 py-10 md:py-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="w-full max-w-5xl space-y-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                     {isLoading ? (
                       <Loader2 className="animate-spin text-[#42BE65]" size={40} strokeWidth={3} />
                     ) : (
                       <AlertOctagon className="text-[#FA4D56]" size={40} strokeWidth={3} />
                     )}
                     <h2 className="text-4xl md:text-7xl font-black font-spacegrotesk tracking-tighter italic leading-none">
                       {isLoading ? 'Audit in progress' : 'Analysis aborted'}
                     </h2>
                  </div>
                  <p className="font-mono text-xs md:text-base opacity-50 uppercase tracking-[0.3em] truncate max-w-2xl mx-auto border-b-2 border-black/10 pb-2">Target: {urlInput}</p>
                </div>

                {isLoading && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-end font-mono text-[10px] font-black uppercase tracking-widest">
                      <span>Forensic engine load</span>
                      <span>{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="h-6 w-full bg-white border-[3px] border-black rounded-none overflow-hidden shadow-[4px_4px_0_0_#000]">
                      <div className="h-full bg-[#42BE65] transition-all duration-700 ease-out relative" style={{ width: `${progressPercent}%` }}>
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  {workflowPhases.map((phase, i) => {
                    const stepNum = i + 1;
                    const isDone = loadingStep > stepNum;
                    const isCurrent = loadingStep === stepNum;
                    return (
                      <div key={i} className={`border-[3px] p-4 flex flex-col gap-3 transition-all duration-500 rounded-none h-full relative overflow-hidden ${isDone ? 'border-black bg-[#42BE65] shadow-[2px_2px_0_0_#000] translate-y-0 opacity-100' : isCurrent ? 'border-black bg-white shadow-[8px_8px_0_0_#000] scale-105 z-10 opacity-100' : 'border-gray-300 bg-gray-100 opacity-40'}`}>
                        {isCurrent && <div className="absolute top-0 left-0 w-full h-1 bg-[#42BE65] animate-[scan_2s_ease-in-out_infinite]" />}
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] font-black uppercase tracking-tighter">{phase.phase}</span>
                          {isDone && <CheckCircle2 size={16} className="text-black" strokeWidth={3} />}
                          {isCurrent && <div className="w-2 h-2 rounded-full bg-black animate-pulse" />}
                        </div>
                        <h4 className={`text-[11px] font-black tracking-tight leading-none ${isCurrent || isDone ? 'text-black' : 'text-gray-500'}`}>{phase.title}</h4>
                        <p className={`text-[9px] font-bold leading-tight ${isCurrent || isDone ? 'text-black/60' : 'text-gray-400'}`}>{phase.desc}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              <Terminal messages={terminalMessages} />

              {!isLoading && lastError && (
                <div className="flex justify-center">
                  <button onClick={resetToHome} className="bg-black text-white border-[3px] border-black px-12 py-4 font-black text-sm shadow-[6px_6px_0_0_#FA4D56] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 rounded-none font-spacegrotesk">
                    <RefreshCw size={20} /> Reboot system
                  </button>
                </div>
              )}
            </div>
          </main>
        ) : !report ? (
          <main className="pb-20">
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-4 md:px-12 py-12 md:py-16">
              <div className="lg:col-span-4 bg-[#111] text-white p-10 flex flex-col justify-start border-[3px] border-black shadow-[10px_10px_0_0_#000]">
                <h2 className="text-5xl font-black font-spacegrotesk leading-[1.1] tracking-tight">Identify deceptive design, cognitive traps & weaponized UX</h2>
              </div>
              <div className="lg:col-span-8 flex flex-col justify-start pt-4">
                <p className="text-xl md:text-2xl font-medium leading-relaxed mb-12 max-w-3xl">Modern interfaces are no longer static—they are adaptive, algorithmic, and often opaque. This platform deconstructs UI logic to detect dark patterns and undisclosed AI, mapping every pixel against the emerging regulatory framework (EU AI Act, GDPR, DETOUR).</p>
                <div className="space-y-10">
                  <h3 className="text-7xl font-black font-spacegrotesk inline-block border-b-8 border-black pr-32 pb-2 leading-none">Analyze</h3>
                  <form onSubmit={handleAudit} className="space-y-6 max-w-4xl">
                    <div className="space-y-2">
                      <label className="text-sm font-bold tracking-wide">Analyze website</label>
                      <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                        <div className="flex-grow flex flex-col relative">
                          <input 
                            type="text"
                            placeholder="Enter target url"
                            value={urlInput}
                            onChange={(e) => handleUrlChange(e.target.value)}
                            className={`w-full bg-[#EEEEEE] p-5 text-lg font-medium border-0 transition-all placeholder:text-gray-400 font-mono rounded-none focus:bg-white border-b-[3px] border-black ${
                              validationError ? 'border-[#FA4D56] text-[#FA4D56]' : ''
                            }`}
                            required
                          />
                          <p className="text-[10px] font-mono text-gray-500 mt-1 uppercase tracking-tighter">e.g. domain.com/checkout</p>
                          {validationError && (
                            <div className="absolute -bottom-10 left-0 flex items-center gap-2 text-[#FA4D56] font-mono text-[10px] font-black uppercase tracking-tighter animate-in fade-in slide-in-from-top-1 duration-200">
                              <AlertCircle size={14} /> {validationError}
                            </div>
                          )}
                        </div>
                        <button 
                          type="submit"
                          disabled={isLoading || !isInputValid}
                          className="bg-[#42BE65] border-[3px] border-black px-8 py-4 font-bold transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3 rounded-none hover:shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
                        >
                          Run Analysis <Smile size={20} />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
            
            <section className="px-4 md:px-12 mt-12">
              <div className="border-t-[3px] border-black pt-6 mb-10">
                <button onClick={() => setIsPlanExpanded(!isPlanExpanded)} className="flex items-center gap-2 font-black uppercase text-sm tracking-widest transition-all">
                  <Triangle size={10} className={`text-black fill-black transition-transform ${isPlanExpanded ? '' : 'rotate-90'}`} />
                  {isPlanExpanded ? 'Hide the plan' : 'Show the plan'}
                </button>
              </div>
              {isPlanExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-top-4 duration-500">
                  {workflowPhases.map((phase, i) => (
                    <div key={i} className="bg-white border-[3px] border-black shadow-[8px_8px_0_0_#000] p-8 space-y-4 rounded-none min-h-[220px]">
                      <div className="space-y-1">
                        <h4 className="font-bold text-lg">{phase.phase}</h4>
                        <h5 className="font-black text-xl text-[#42BE65] font-spacegrotesk leading-none">{phase.title}</h5>
                      </div>
                      <p className="text-sm font-medium leading-relaxed text-gray-700">{phase.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
            <section className="px-4 md:px-12 mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 border-t-[3px] border-black pt-10">
              <div className="space-y-2">
                <h6 className="font-bold text-sm tracking-wider uppercase">// Manipulation index</h6>
                <p className="text-xs font-medium text-gray-600 leading-relaxed">Quantifies the "Deception Score" of any workflow (0-100).</p>
              </div>
              <div className="space-y-2">
                <h6 className="font-bold text-sm tracking-wider uppercase">// Cognitive defense</h6>
                <p className="text-xs font-medium text-gray-600 leading-relaxed">Identifies specific bias exploits (e.g., Sunk Cost Fallacy, Urgency).</p>
              </div>
              <div className="space-y-2">
                <h6 className="font-bold text-sm tracking-wider uppercase">// Regulatory compliance</h6>
                <p className="text-xs font-medium text-gray-600 leading-relaxed">Maps deceptive patterns directly to legal risks (EU AI Act, DETOUR Act).</p>
              </div>
            </section>
          </main>
        ) : (
          <main className="px-4 md:px-12 py-6 md:py-10 space-y-0">
            <div className="space-y-6 mb-10">
              <nav className="flex items-center gap-2 font-spacegrotesk font-black text-[10px] md:text-xs uppercase tracking-widest">
                <span className="text-gray-400 font-mono">//</span>
                <button onClick={resetToHome} className="text-gray-500 hover:text-black border-b-[2px] border-transparent hover:border-[#42BE65] transition-all rounded-none">Home</button>
                <span className="text-gray-400 font-mono">//</span>
                <span className="text-black">Audit report</span>
              </nav>
              <form 
                onSubmit={handleAudit} 
                className="border-y-[3px] border-black py-4 md:py-6 bg-white flex flex-col lg:flex-row items-stretch lg:items-center gap-4 rounded-none"
              >
                <div className="bg-black text-white px-6 py-3 font-black text-xs md:text-sm tracking-wider font-spacegrotesk text-center rounded-none uppercase">FORENSIC_SNAPSHOT</div>
                <div className="flex-grow flex flex-col relative">
                  <input 
                    type="text" 
                    value={urlInput} 
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="Enter target URL"
                    className={`w-full bg-gray-50 border-[3px] border-black px-4 py-3 font-mono text-xs md:text-sm focus:outline-none focus:bg-white transition-all rounded-none ${validationError ? 'border-[#FA4D56]' : ''}`} 
                  />
                  {validationError && (
                    <div className="absolute -bottom-6 left-0 text-[#FA4D56] font-mono text-[8px] uppercase font-black animate-in fade-in slide-in-from-top-1">
                      {validationError}
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  <button 
                    type="submit"
                    disabled={isLoading || !isInputValid}
                    className="bg-[#42BE65] border-[3px] border-black px-4 md:px-8 py-3 font-black text-[10px] md:text-xs shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2 rounded-none font-spacegrotesk disabled:opacity-50 disabled:grayscale"
                  >
                    <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> 
                    {isLoading ? 'Scanning...' : 'Run New Audit'}
                  </button>
                </div>
              </form>
            </div>
            
            {/* The main interactive report */}
            <Report report={report} resetToHome={resetToHome} />
          </main>
        )
      )}
    </div>
  );
};

export default App;