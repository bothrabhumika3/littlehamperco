import React, { useEffect } from 'react';
import { useCustomHamperStore } from '../store/useCustomHamperStore';
import { ProgressBar } from '../components/custom-hamper/ProgressBar';
import { StepOccasion } from '../components/custom-hamper/StepOccasion';
import { StepRecipient } from '../components/custom-hamper/StepRecipient';
import { StepBudget } from '../components/custom-hamper/StepBudget';
import { StepProducts } from '../components/custom-hamper/StepProducts';
import { StepPackaging } from '../components/custom-hamper/StepPackaging';
import { StepTheme } from '../components/custom-hamper/StepTheme';
import { StepMessage } from '../components/custom-hamper/StepMessage';
import { StepSummary } from '../components/custom-hamper/StepSummary';
import { ArrowLeft, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

export const CustomHamperPage: React.FC = () => {
  const {
    currentStep,
    setStep,
    nextStep,
    prevStep,
    getTotalPerHamper,
    selectedItems,
    resetHamper,
  } = useCustomHamperStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const runningTotal = getTotalPerHamper();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOccasion />;
      case 2:
        return <StepRecipient />;
      case 3:
        return <StepBudget />;
      case 4:
        return <StepProducts />;
      case 5:
        return <StepPackaging />;
      case 6:
        return <StepTheme />;
      case 7:
        return <StepMessage />;
      case 8:
        return <StepSummary />;
      default:
        return <StepOccasion />;
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-widest text-brand-600 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Interactive Bespoke Curation</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950">
              Create Your Little Hamper
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Tell us what you're celebrating, and we'll help you create something special.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to reset your selections and start over?')) {
                resetHamper();
              }
            }}
            className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-stone-700 bg-white border border-cream-200 px-3 py-1.5 rounded-full transition-colors self-end sm:self-auto"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Start Fresh</span>
          </button>
        </div>

        {/* Visual Progress Bar */}
        <ProgressBar currentStep={currentStep} onStepClick={setStep} />

        {/* Main Step Canvas */}
        <div className="bg-white/70 backdrop-blur-xs rounded-3xl p-5 sm:p-8 border border-cream-200/80 shadow-subtle mb-24 sm:mb-20">
          {renderStep()}
        </div>

        {/* Sticky Bottom Control Bar */}
        {currentStep < 8 && (
          <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-cream-200 py-3.5 px-4 sm:px-8 shadow-card">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
              {/* Back Button */}
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  currentStep === 1
                    ? 'opacity-0 pointer-events-none'
                    : 'text-stone-700 hover:bg-cream-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {/* Items Selected Indicator */}
              <div className="text-center">
                <span className="text-[10px] text-stone-400 font-semibold uppercase block">
                  Items Selected
                </span>
                <span className="text-sm sm:text-base font-bold text-brand-600">
                  {selectedItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                </span>
              </div>

              {/* Next Step Button */}
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <span>
                  {currentStep === 7 ? 'Review Hamper' : 'Continue'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
