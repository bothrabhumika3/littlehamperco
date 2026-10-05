import React, { useState } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { Phone, Sparkles, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-brand-500 text-cream-50 text-xs sm:text-sm py-2 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center flex items-center justify-center gap-2 font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-gold-300 animate-pulse hidden sm:inline" />
          <span>{siteConfig.announcementText}</span>
          <span className="hidden md:inline text-cream-200">|</span>
          <a
            href={`tel:${siteConfig.phone}`}
            className="hidden md:inline-flex items-center gap-1 text-gold-200 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span>Call / WhatsApp: {siteConfig.phone}</span>
          </a>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-cream-200 hover:text-white p-1 rounded transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
