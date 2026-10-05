import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Truck } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-cream-100/50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-cream-200/60">
      {/* Subtle decorative background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-200/20 rounded-full blur-3xl -z-10 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-200/30 rounded-full blur-3xl -z-10 pointer-events-none transform -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200/80 px-3.5 py-1.5 rounded-full text-brand-700 text-xs font-semibold tracking-wide shadow-subtle">
              <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
              <span>Thoughtfully Packed. Beautifully Gifted.</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal-950 tracking-tight leading-[1.12]">
              Little Hampers. <br />
              <span className="italic font-normal text-brand-600">Big Moments.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {siteConfig.subtagline} You choose the occasion, the budget and the goodies—we create an unforgettable hamper.
            </p>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-7 py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-card hover:shadow-hover transition-all flex items-center justify-center gap-2"
              >
                <span>Shop Hampers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/custom-hamper"
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-cream-100 text-charcoal-900 border border-cream-300 rounded-xl font-bold text-xs uppercase tracking-wider shadow-subtle transition-all flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-gold-500 group-hover:rotate-12 transition-transform" />
                <span>Create Your Own Hamper</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-cream-200/70 grid grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-brand-500 shrink-0" />
                <div className="text-[11px] text-stone-600 leading-tight">
                  <span className="font-bold text-charcoal-900 block">Pan-India</span>
                  <span>Safe Express Dispatch</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-sage-600 shrink-0" />
                <div className="text-[11px] text-stone-600 leading-tight">
                  <span className="font-bold text-charcoal-900 block">Fresh &amp; Gourmet</span>
                  <span>Artisanal Quality Only</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <HeartHandshake className="w-4 h-4 text-gold-500 shrink-0" />
                <div className="text-[11px] text-stone-600 leading-tight">
                  <span className="font-bold text-charcoal-900 block">Bespoke Curation</span>
                  <span>Handwritten Notes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Lifestyle Hero Image */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85"
                  alt="Little Hamper Co. Curated Luxury Hampers"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Floating Accent Card 1: Fresh & Gourmet */}
              <div className="absolute -bottom-6 -left-6 bg-white p-3.5 sm:p-4 rounded-2xl shadow-card border border-cream-200 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xs">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-cream-100">
                  <img
                    src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=200&q=80"
                    alt="Fresh Fruit Basket"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-sage-600 tracking-wider">
                    Fresh Food Hampers
                  </p>
                  <p className="text-xs font-bold text-charcoal-900 leading-snug">
                    Orchard fruits &amp; artisanal treats
                  </p>
                </div>
              </div>

              {/* Floating Accent Card 2: Bespoke Ribbon Note */}
              <div className="absolute -top-4 -right-4 bg-brand-500 text-white py-2 px-3.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-1.5 rotate-2">
                <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                <span>Custom Built For You</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
