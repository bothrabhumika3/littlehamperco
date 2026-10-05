import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../../config/siteConfig';

export const CustomHamperTeaser: React.FC = () => {
  const steps = [
    { num: '01', title: 'Choose Occasion & Recipient', desc: 'Birthdays, weddings, baby showers, or corporate milestones.' },
    { num: '02', title: 'Share Your Target Budget', desc: 'Every hamper is customized to your preferences and budget.' },
    { num: '03', title: 'Pick Products & Theme', desc: 'Select chocolates, dry fruits, bakes, or spa items in your aesthetic.' },
    { num: '04', title: 'Packaging & Note', desc: 'Choose cane baskets or velvet trunks, and add a handwritten note.' },
  ];

  const features = [
    'Budget transparency',
    'Custom color themes',
    'Handwritten calligraphy cards',
    'Direct WhatsApp confirmation',
    'A-Grade fresh food options',
    'Single or bulk quantities',
  ];

  return (
    <section className="py-20 bg-charcoal-900 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Value Prop */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-charcoal-800 border border-charcoal-700 px-3.5 py-1.5 rounded-full text-gold-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>The Little Hamper Co. Signature Experience</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              “You tell us the occasion, <br />
              <span className="italic text-brand-400 font-normal">we create the hamper.”</span>
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Every hamper is customized to your preferences and budget. Contact us for a personalized quote tailored to your exact recipient, dietary choices, and event theme.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 max-w-md mx-auto lg:mx-0 text-left">
              {features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-xs text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                to="/custom-hamper"
                className="w-full sm:w-auto px-7 py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Hamper Builder</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={getWhatsAppLink('Hi Little Hamper Co.! I would like help customizing a hamper.')}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-charcoal-800 hover:bg-charcoal-700 text-stone-200 border border-charcoal-700 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Discuss on WhatsApp ({siteConfig.phone})</span>
              </a>
            </div>
          </div>

          {/* Right Interactive Process Steps Card */}
          <div className="lg:col-span-6">
            <div className="bg-charcoal-800/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-charcoal-700 shadow-2xl space-y-6">
              <h3 className="font-serif text-xl font-bold text-white border-b border-charcoal-700 pb-4">
                How Custom Curation Works
              </h3>

              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.num}
                    className="flex items-start gap-4 p-3.5 rounded-2xl bg-charcoal-900/60 border border-charcoal-700/60 hover:border-brand-500/40 transition-colors"
                  >
                    <span className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-400 font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-brand-500/30">
                      {step.num}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-snug">{step.title}</h4>
                      <p className="text-xs text-stone-400 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <Link
                  to="/custom-hamper"
                  className="text-xs text-gold-400 hover:text-gold-300 font-semibold inline-flex items-center gap-1 hover:underline"
                >
                  <span>Ready to start? Takes less than 2 minutes &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
