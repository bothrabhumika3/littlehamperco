import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  onStepClick: (step: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps = 8,
  onStepClick,
}) => {
  const stepLabels = [
    'Occasion',
    'Recipient',
    'Hamper Scale',
    'Products',
    'Packaging',
    'Theme',
    'Message',
    'Review',
  ];

  return (
    <div className="w-full py-4 mb-6">
      {/* Mobile step progress indicator */}
      <div className="sm:hidden flex items-center justify-between px-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
          Step {currentStep} of {totalSteps}: {stepLabels[currentStep - 1]}
        </span>
        <span className="text-xs font-mono text-stone-500">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      <div className="sm:hidden w-full h-2 bg-cream-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-500 transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-cream-200 -translate-y-1/2 -z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-brand-500 -translate-y-1/2 transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {stepLabels.map((label, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <button
              key={label}
              type="button"
              onClick={() => {
                // Allow jumping to already completed steps or current
                if (stepNum <= currentStep) {
                  onStepClick(stepNum);
                }
              }}
              disabled={stepNum > currentStep}
              className={`relative z-10 flex flex-col items-center group focus:outline-none ${
                stepNum <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 border-2 ${
                  isCompleted
                    ? 'bg-brand-500 border-brand-500 text-white'
                    : isCurrent
                    ? 'bg-white border-brand-500 text-brand-600 ring-4 ring-brand-100'
                    : 'bg-white border-stone-300 text-stone-400'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
              </div>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider mt-1.5 transition-colors ${
                  isCurrent
                    ? 'text-brand-700 font-bold'
                    : isCompleted
                    ? 'text-stone-700'
                    : 'text-stone-400'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
