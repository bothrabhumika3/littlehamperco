import React, { useState } from 'react';
import { themeOptions } from '../../data/customHamperOptions';
import { useCustomHamperStore } from '../../store/useCustomHamperStore';
import { ThemeChoice } from '../../types/customHamper';
import { Check, Palette } from 'lucide-react';

export const StepTheme: React.FC = () => {
  const { theme, customThemeDetails, setTheme } = useCustomHamperStore();
  const [customText, setCustomText] = useState(customThemeDetails);

  const handleSelect = (id: ThemeChoice) => {
    setTheme(id, customText);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
          Select Your Aesthetic &amp; Color Theme
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          We match the tissue layers, satin ribbons, floral sprigs, and greeting tags to your vibe.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {themeOptions.map((th) => {
          const isSelected = theme === th.id;

          return (
            <button
              key={th.id}
              type="button"
              onClick={() => handleSelect(th.id)}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between group bg-white ${
                isSelected
                  ? 'border-brand-500 bg-brand-50/30 shadow-sm'
                  : 'border-cream-200/80 hover:border-cream-300'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div
                  className="w-8 h-8 rounded-full border border-black/10 shadow-xs flex items-center justify-center text-white"
                  style={{ backgroundColor: th.colorHex }}
                >
                  <Palette className="w-3.5 h-3.5 opacity-60 mix-blend-difference" />
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-serif text-sm font-bold text-charcoal-900 group-hover:text-brand-600 transition-colors">
                  {th.name}
                </h4>
                <p className="text-[10px] text-stone-500 mt-1 leading-relaxed">
                  {th.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Specific theme details box */}
      <div className="max-w-xl mx-auto p-5 bg-white rounded-2xl border border-cream-200 shadow-subtle space-y-2">
        <label className="block text-xs font-bold text-charcoal-900">
          Have a specific color code, wedding moodboard, or event theme?
        </label>
        <p className="text-[11px] text-stone-500">
          Share details like "Blush pink and rose gold", "Mint green with white lace", or "Company branding colors (Pantone Blue)".
        </p>
        <textarea
          rows={2}
          placeholder="e.g. Sage green accents with ivory satin ribbon and dry lavender sprigs..."
          value={customText}
          onChange={(e) => {
            setCustomText(e.target.value);
            setTheme(theme, e.target.value);
          }}
          className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
        />
      </div>
    </div>
  );
};
