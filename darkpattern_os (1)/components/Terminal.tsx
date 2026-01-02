
import React from 'react';
import { TerminalMessage } from '../types';

interface TerminalProps {
  messages: TerminalMessage[];
}

const Terminal: React.FC<TerminalProps> = ({ messages = [] }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-[#000] text-[#FFF] p-6 border-[3px] border-black shadow-[8px_8px_0_0_#000] h-64 overflow-y-auto mb-8 mono text-xs leading-relaxed rounded-none" ref={scrollRef}>
      {(messages || []).map((msg, i) => (
        <div key={i} className="mb-2">
          <span className="opacity-40 font-bold">[{msg.timestamp}]</span>{' '}
          <span className={
            msg.type === 'success' ? 'text-[#42BE65]' : 
            msg.type === 'error' ? 'text-[#FA4D56]' : 
            'text-[#FFF]'
          }>
            {msg.type === 'error' ? 'CRITICAL_ERROR: ' : msg.type === 'success' ? 'SYSTEM_READY: ' : 'LOG_ENTRY: '}
            {msg.text}
          </span>
        </div>
      ))}
      <div className="animate-pulse inline-block w-2 h-4 bg-[#42BE65] ml-1 align-middle"></div>
    </div>
  );
};

export default Terminal;
