import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyableTextProps {
  text: string | number;
  children: React.ReactNode;
  className?: string;
}

export const CopyableText: React.FC<CopyableTextProps> = ({ text, children, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(String(text));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className={`group relative inline-flex items-center gap-1.5 ${className}`}>
      <span>{children}</span>
      <button
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-blue-600 focus:outline-none flex-shrink-0"
        title="复制"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </span>
  );
};
