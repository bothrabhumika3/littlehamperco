import React from 'react';
import { packagingOptions } from '../../data/customHamperOptions';
import { useCustomHamperStore } from '../../store/useCustomHamperStore';
import { Check, Sparkles } from 'lucide-react';

export const StepPackaging: React.FC = () => {
  const { packaging, setPackaging } = useCustomHamperStore();

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
          Choose Your Signature Packaging
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Every hamper is finished with satin ribbons, protective nesting, and our gold-foil seal.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {packagingOptions.map((pkg) => {
          const isSelected = packaging?.id === pkg.id;

          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setPackaging(pkg)}
              className={`relative bg-white rounded-3xl overflow-hidden border-2 text-left transition-all duration-200 flex flex-col justify-between group shadow-subtle hover:shadow-card ${
                isSelected
                  ? 'border-brand-500 ring-2 ring-brand-200/50'
                  : 'border-cream-200/80 hover:border-cream-300'
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-cream-100">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {pkg.badge && (
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-charcoal-900 px-2.5 py-1 rounded-full border border-cream-200">
                    {pkg.badge}
                  </span>
                )}

                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-serif text-lg font-bold text-charcoal-900 group-hover:text-brand-600 transition-colors">
                      {pkg.name}
                    </h4>
                    <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                      Custom Styled
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed">{pkg.description}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-cream-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-gold-500" />
                    <span>Includes ribbons &amp; fill</span>
                  </span>
                  <span
                    className={`font-semibold ${
                      isSelected ? 'text-brand-600' : 'text-stone-400 group-hover:text-stone-700'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
