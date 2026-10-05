import React from 'react';
import { budgetOptions } from '../../data/customHamperOptions';
import { useCustomHamperStore } from '../../store/useCustomHamperStore';
import { Check, Sparkles, Gift } from 'lucide-react';

export const StepBudget: React.FC = () => {
  const { budget, customBudgetAmount, setBudget } = useCustomHamperStore();

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
          What scale of hamper are you looking for?
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Choose your preferred hamper tier and presentation scale. We will curate every element to match.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {budgetOptions.map((opt) => {
          const isSelected = budget === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setBudget(opt.id)}
              className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between group ${
                isSelected
                  ? 'border-brand-500 bg-brand-50/40 shadow-sm'
                  : 'border-cream-200/80 bg-white hover:border-cream-300 hover:bg-cream-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-brand-500 text-white' : 'bg-cream-100 text-brand-600'
                  }`}
                >
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal-900 group-hover:text-brand-600 transition-colors">
                    {opt.label}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    {opt.description || 'Curated Curation'}
                  </p>
                </div>
              </div>

              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0 ml-2">
                  <Check className="w-3 h-3" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {budget === 'Custom / Bespoke' && (
        <div className="max-w-md mx-auto p-4 bg-white rounded-2xl border border-cream-200 shadow-subtle animate-in fade-in duration-200">
          <label className="block text-xs font-bold text-charcoal-900 mb-1">
            Special Scale or Theme Preferences (Optional):
          </label>
          <div className="relative">
            <Sparkles className="w-4 h-4 text-brand-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Ultra-luxury VIP trunk, specific color palette..."
              value={customBudgetAmount || ''}
              onChange={(e) => setBudget('Custom / Bespoke', e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs border border-cream-300 rounded-xl focus:outline-none focus:border-brand-500 bg-cream-50 font-medium"
            />
          </div>
        </div>
      )}
    </div>
  );
};
