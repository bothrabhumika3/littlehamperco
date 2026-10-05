import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../../config/siteConfig';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultUrl = getWhatsAppLink(
    "Hi Little Hamper Co.! I'd like help creating a hamper for an upcoming occasion."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center flex-col sm:flex-row-reverse gap-3">
      {/* Floating Button */}
      <a
        href={defaultUrl}
        target="_blank"
        rel="noreferrer"
        className="group relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none"
        aria-label="Chat with Little Hamper Co. on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
      </a>

      {/* Popover Callout */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-charcoal-900 px-3.5 py-2 rounded-2xl shadow-card border border-cream-200 text-xs font-medium animate-in fade-in slide-in-from-right-2">
          <span>Need help choosing? Chat with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-stone-600 p-0.5"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
