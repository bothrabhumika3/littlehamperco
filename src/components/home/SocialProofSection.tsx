import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { demoReviews } from '../../data/mockReviews';

export const SocialProofSection: React.FC = () => {
  return (
    <section className="py-16 bg-cream-50/80 border-b border-cream-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-widest font-bold text-brand-600">
            Real Gifting Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950 tracking-tight mt-1">
            Loved Across Every Celebration
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Read what our recipients and gift-givers share about their Little Hamper Co. unboxing moments.
          </p>
          <span className="inline-block mt-1 text-[10px] text-stone-400 bg-cream-200/60 px-2 py-0.5 rounded font-mono">
            * Sample preview reviews
          </span>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-cream-200/80 shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-gold-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-cream-300" />
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-cream-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-charcoal-900">{rev.author}</h4>
                  <p className="text-[10px] text-stone-400">{rev.location}</p>
                </div>
                {rev.verifiedPurchase && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
