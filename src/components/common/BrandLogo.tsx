import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'circle' | 'white';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'full',
  showSubtitle = true,
}) => {
  // Circular Instagram Avatar variant
  if (variant === 'circle') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shadow-sm transition-transform hover:scale-105">
          <div className="w-full h-full rounded-full bg-white p-[2px] flex items-center justify-center overflow-hidden">
            <img
              src="/logo.png"
              alt="The Little Hamper Co. - Thoughtful Gifting"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }

  // Dark background footer variant
  if (variant === 'white') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <div className="h-12 sm:h-14 p-1 rounded-xl bg-white/95 border border-cream-200/50 shadow-xs flex items-center justify-center overflow-hidden">
          <img
            src="/logo.png"
            alt="The Little Hamper Co."
            className="h-full w-auto object-contain"
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
            The Little Hamper Co.
          </span>
          {showSubtitle && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-gold-300 font-sans">
                Thoughtful Gifting
              </span>
              <span className="text-gold-400 text-[8px]">&bull;</span>
              <span className="text-[10px] tracking-wider font-sans text-stone-300">
                Bangalore
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Primary full header logo using the user's authentic uploaded logo
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="h-12 sm:h-14 flex items-center justify-center">
        <img
          src="/logo.png"
          alt="The Little Hamper Co. - Thoughtful Gifting"
          className="h-full w-auto object-contain drop-shadow-2xs rounded-lg"
        />
      </div>
      <div className="flex flex-col text-left">
        <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-charcoal-950 leading-none">
          The Little Hamper Co.
        </span>
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-600 font-sans">
              Thoughtful Gifting
            </span>
            <span className="text-gold-400 text-[8px]">&bull;</span>
            <span className="text-[10px] tracking-wider font-sans text-stone-500">
              Bangalore
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
