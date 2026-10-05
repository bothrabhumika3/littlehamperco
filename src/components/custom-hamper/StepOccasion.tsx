import React, { useState } from 'react';
import { occasionOptions } from '../../data/customHamperOptions';
import { useCustomHamperStore } from '../../store/useCustomHamperStore';
import { Check } from 'lucide-react';

export const StepOccasion: React.FC = () => {
  const { occasion, setOccasion } = useCustomHamperStore();
  const [customInput, setCustomInput] = useState(
    occasionOptions.some((o) => o.id === occasion) ? '' : occasion
  );

  const handleSelect = (id: string) => {
    if (id === 'Other') {
      setOccasion(customInput || 'Other');
    } else {
      setOccasion(id);
    }
  };

  const isOther = !occasionOptions.slice(0, 12).some((o) => o.id === occasion);

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
          What is the special occasion?
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Select the celebration so our stylists can suggest the right mood, decorations, and treats.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {occasionOptions.map((opt) => {
          const isSelected =
            opt.id === 'Other' ? isOther : occasion === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between group ${
                isSelected
                  ? 'border-brand-500 bg-brand-50/40 shadow-sm'
                  : 'border-cream-200/80 bg-white hover:border-cream-300 hover:bg-cream-50/50'
              }`}
            >
              <div className="flex items-start justify-between w-full mb-2">
                <span className="text-2xl">{opt.icon}</span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-serif text-base font-bold text-charcoal-900 group-hover:text-brand-600 transition-colors">
                  {opt.label}
                </h4>
                <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* If "Other" selected, show custom text box */}
      {isOther && (
        <div className="max-w-md mx-auto p-4 bg-white rounded-2xl border border-cream-200 shadow-subtle animate-in fade-in duration-200">
          <label className="block text-xs font-bold text-charcoal-900 mb-1">
            Specify Your Unique Occasion:
          </label>
          <input
            type="text"
            placeholder="e.g. Pet Birthday, Farewell Party, Graduation, Diwali Puja"
            value={customInput}
            onChange={(e) => {
              setCustomInput(e.target.value);
              setOccasion(e.target.value || 'Custom Occasion');
            }}
            className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
          />
        </div>
      )}
    </div>
  );
};
