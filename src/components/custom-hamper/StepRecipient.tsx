import React, { useState } from 'react';
import { recipientOptions } from '../../data/customHamperOptions';
import { useCustomHamperStore } from '../../store/useCustomHamperStore';
import { Check, User } from 'lucide-react';

export const StepRecipient: React.FC = () => {
  const { recipient, setRecipient } = useCustomHamperStore();
  const [customRecipient, setCustomRecipient] = useState(
    recipientOptions.some((r) => r.id === recipient) ? '' : recipient
  );

  const isOther = !recipientOptions.slice(0, 9).some((r) => r.id === recipient);

  const handleSelect = (id: string) => {
    if (id === 'Other') {
      setRecipient(customRecipient || 'Other');
    } else {
      setRecipient(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
          Who is this hamper for?
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Helps us curate appropriate taste profiles, personalized notes, and presentation styles.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {recipientOptions.map((opt) => {
          const isSelected = opt.id === 'Other' ? isOther : recipient === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between group ${
                isSelected
                  ? 'border-brand-500 bg-brand-50/40 shadow-sm'
                  : 'border-cream-200/80 bg-white hover:border-cream-300 hover:bg-cream-50/50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-brand-500 text-white' : 'bg-cream-100 text-stone-600'
                  }`}
                >
                  <User className="w-4 h-4" />
                </div>
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

      {isOther && (
        <div className="max-w-md mx-auto p-4 bg-white rounded-2xl border border-cream-200 shadow-subtle animate-in fade-in duration-200">
          <label className="block text-xs font-bold text-charcoal-900 mb-1">
            Specify Recipient:
          </label>
          <input
            type="text"
            placeholder="e.g. Mentor, Sister-in-law, Doctor, Host"
            value={customRecipient}
            onChange={(e) => {
              setCustomRecipient(e.target.value);
              setRecipient(e.target.value || 'Custom Recipient');
            }}
            className="w-full px-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50"
          />
        </div>
      )}
    </div>
  );
};
