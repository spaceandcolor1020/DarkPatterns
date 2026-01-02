import React, { useState } from 'react';
import { Lock, ExternalLink, Cpu, Key, AlertCircle } from 'lucide-react';

interface ApiKeyModalProps {
  onAuthorized: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onAuthorized }) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveKey = () => {
    if (!apiKeyInput.trim()) return;
    
    setIsSaving(true);
    // Save to localStorage as requested
    localStorage.setItem('gemini_api_key', apiKeyInput.trim());
    
    // Trigger window reload to re-initialize the app with the new key
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white border-[3px] border-black p-8 w-full max-w-lg shadow-[16px_16px_0px_#000] relative animate-in zoom-in-95 duration-300">
        
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6 border-b-[3px] border-black pb-4">
          <Key size={32} className="text-[#42BE65]" strokeWidth={3} />
          <h2 className="text-3xl font-black font-spacegrotesk leading-none tracking-tighter uppercase italic">
            SYSTEM ACCESS REQUIRED
          </h2>
        </div>

        {/* Info Body */}
        <div className="space-y-6">
          <p className="text-sm font-bold text-gray-700 leading-relaxed font-body">
            To use this forensic tool, you must provide a valid Google Gemini API Key. Your key is stored locally in your browser and is never sent to our servers.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black font-mono uppercase tracking-widest text-gray-500">
                Input_API_Key
              </label>
              <input 
                type="password"
                placeholder="sk-..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="w-full border-[3px] border-black p-4 font-mono text-sm bg-gray-50 focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            <div className="bg-gray-100 border-[3px] border-black p-4 space-y-3">
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[#42BE65] hover:text-black transition-colors font-black uppercase text-xs tracking-widest font-spacegrotesk"
              >
                Get a free key from AI Studio <ExternalLink size={14} strokeWidth={3} />
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2">
            <Lock size={18} className="text-[#0F62FE] flex-shrink-0 mt-0.5" strokeWidth={3} />
            <p className="text-[10px] font-black font-mono text-gray-600 uppercase tracking-tighter leading-tight">
              PRIVACY_NOTICE: System credentials will be persisted in your local storage. Initializing the forensic engine requires a page refresh.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleSaveKey}
          disabled={!apiKeyInput.trim() || isSaving}
          className="w-full bg-black text-white font-spacegrotesk uppercase font-black py-5 mt-8 border-[3px] border-black hover:bg-[#42BE65] hover:text-black hover:shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:grayscale"
        >
          <Cpu size={24} strokeWidth={3} />
          {isSaving ? 'Initializing...' : 'Save & Initialize'}
        </button>
      </div>
    </div>
  );
};

export default ApiKeyModal;