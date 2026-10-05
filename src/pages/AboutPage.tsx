import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { Sparkles, Heart, Gift, ShieldCheck, ArrowRight, Package } from 'lucide-react';

import { BrandLogo } from '../components/common/BrandLogo';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-cream-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Story */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <BrandLogo variant="circle" />
          </div>
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 px-3.5 py-1.5 rounded-full text-brand-700 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Curated by Priya Jain &bull; Bangalore</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal-950 tracking-tight">
            The Little Hamper Co.
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Founded with heart by <strong>Priya Jain</strong> in Bangalore, <strong>The Little Hamper Co.</strong> was born from a simple belief: a gift should never feel generic. From custom gift hampers, corporate gifting, and artisanal food platters to fresh flower bouquets and wedding packing, every creation is thoughtfully tailored to celebrate life's most precious moments.
          </p>
        </div>

        {/* Brand Image Banner */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] shadow-card border-4 border-white bg-cream-100">
          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85"
            alt="Little Hamper Co. Studio & Curation"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 5 Core Pillars (Prompt requirement 38) */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-600">
              What Guides Us
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950 mt-1">
              The Five Pillars of Little Hamper Co.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900">
                Thoughtful Gifting
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We take the time to understand who the recipient is and what the occasion signifies, ensuring every item serves a meaningful purpose.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle space-y-2">
              <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900">
                Beautiful Presentation
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                From handwoven willow cane baskets and velvet-lined trunks to custom satin ribbons and wax seals, the unboxing experience is designed to take their breath away.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900">
                Genuine Personalization
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                No automated generic printouts. We handwrite your personal messages with fountain pen calligraphy and accommodate special color themes, dietary requests, and custom packaging.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900">
                Quality Products Only
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We partner with boutique confectioners, certified organic orchards, and artisan tea estates. Full ingredient transparency, fresh produce, and airtight freshness.
              </p>
            </div>

            <div className="sm:col-span-2 bg-white p-6 rounded-3xl border border-cream-200 shadow-subtle space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                05
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900">
                Celebrating Little Moments
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Gifting isn't reserved only for grand annual holidays. We celebrate quiet milestones, a friend passing an exam, a new mother’s restful afternoon, a neighbor’s housewarming, or simply saying “I was thinking of you today.”
              </p>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="bg-charcoal-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Have a celebration in mind?
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto">
            You tell us the occasion, we create the hamper. Chat with our curation specialists on WhatsApp or launch our interactive hamper builder.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/custom-hamper"
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            >
              Build Your Hamper
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-charcoal-800 hover:bg-charcoal-700 text-stone-200 rounded-xl text-xs font-semibold transition-all border border-charcoal-700"
            >
              Contact Us ({siteConfig.phone})
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
