import React, { useState, useEffect } from 'react';
import { Lock, ExternalLink, ShieldAlert, Cpu, AlertCircle, Terminal } from 'lucide-react';

interface ApiKeyModalProps {
  onAuthorized: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onAuthorized }) => {
  const [error, setError] = useState<string | null>(null);
  const [isPlatformSupported, setIsPlatformSupported] = useState<boolean>(true);

  useEffect(() => {
    if (!window.aistudio) {
      setIsPlatformSupported(false);
    }
  }, []);

  const handleOpenSelector = async () => {
    setError(null);
    if (!window.aistudio) {
      setError("PLATFORM_NOT_FOUND: The secure key selector is only available within the AI Studio environment. Please ensure you are running this app in the intended platform.");
      return;
    }

    try {
      await window.aistudio.openSelectKey();
      // Proceed immediately as per platform guidelines
      onAuthorized();
    } catch (err: any) {
      setError(`SELECTOR_ERROR: ${err.message || 'Failed to open secure key dialog.'}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white border-[3px] border-black p-8 w-full max-w-lg shadow-[16px_16px_0px_#000] relative animate-in zoom-in-95 duration-300">
        
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6 border-b-[3px] border-black pb-4">
          <ShieldAlert size={32} className="text-[#FA4D56]" strokeWidth={3} />
          <h2 className="text-3xl font-black font-spacegrotesk leading-none tracking-tighter uppercase italic">
            System Access Required
          </h2>
        </div>

        {/* Info Body */}
        <div className="space-y-6">
          <p className="text-sm font-bold text-gray-700 leading-relaxed font-body">
            DarkPattern_OS requires a valid <span className="bg-[#F1C21B] px-1 text-black font-black">Google Gemini API Key</span>. For security, we use the platform's encrypted "Glass Box" selector.
          </p>

          {!isPlatformSupported ? (
            <div className="bg-[#FA4D56]/10 border-[3px] border-[#FA4D56] p-4 space-y-3">
              <div className="flex items-center gap-2 text-[#FA4D56] font-black uppercase text-xs font-mono">
                <AlertCircle size={16} /> Environment_Warning
              </div>
              <p className="text-[10px] font-mono text-black leading-tight uppercase font-bold">
                Secure Platform API not detected. If you are developing locally, please ensure your <span className="underline">API_KEY</span> is set in your environment variables.
              </p>
            </div>
          ) : (
            <div className="bg-gray-100 border-[3px] border-black p-4 space-y-3">
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[#42BE65] hover:text-black transition-colors font-black uppercase text-xs tracking-widest font-spacegrotesk"
              >
                Get Free Key from AI Studio <ExternalLink size={14} strokeWidth={3} />
              </a>
              <p className="text-[10px] font-mono text-gray-500 leading-tight uppercase">
                The button below will open a secure dialog. Paste your key there to authorize this session.
              </p>
            </div>
          )}

          {error && (
            <div className="bg-black text-[#FA4D56] p-3 border-[2px] border-[#FA4D56] font-mono text-[9px] uppercase font-bold animate-pulse">
              {error}
            </div>
          )}

          <div className="flex items-start gap-3 pt-2">
            <Lock size={18} className="text-[#0F62FE] flex-shrink-0 mt-0.5" strokeWidth={3} />
            <p className="text-[10px] font-black font-mono text-gray-600 uppercase tracking-tighter">
              PRIVACY_NOTICE: Your key is never visible to the application code. It is injected at the network level by the platform.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleOpenSelector}
          disabled={!isPlatformSupported && !error}
          className="w-full bg-black text-white font-spacegrotesk uppercase font-black py-5 mt-8 border-[3px] border-black hover:bg-[#42BE65] hover:text-black hover:shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:grayscale"
        >
          <Cpu size={24} strokeWidth={3} />
          {isPlatformSupported ? 'Initialize Secure Auth' : 'Retry Platform Detection'}
        </button>

        <div className="mt-6 flex flex-col items-center gap-2">
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[9px] font-mono font-black text-gray-400 hover:text-black border-b border-transparent hover:border-black transition-all uppercase tracking-widest"
          >
            Billing Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;