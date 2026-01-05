'use client';

import { Check, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Step {
  number: number;
  title: string;
  icon: LucideIcon;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (stepNumber: number) => void;
}

export const StepIndicator = ({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
}: StepIndicatorProps) => {
  const handleStepClick = (stepNumber: number) => {
    const isClickable =
      completedSteps.includes(stepNumber) || stepNumber === currentStep;
    if (isClickable && onStepClick) {
      onStepClick(stepNumber);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center">
        {steps.map((step, idx) => {
          const isCompleted = completedSteps.includes(step.number);
          const isCurrent = currentStep === step.number;
          const isClickable = isCompleted || isCurrent;
          const StepIcon = step.icon;
          const isLast = idx === steps.length - 1;

          return (
            <div
              key={step.number}
              className={cn('flex items-center', !isLast && 'flex-1')}
            >
              {/* Step Button */}
              <button
                onClick={() => handleStepClick(step.number)}
                disabled={!isClickable}
                className={cn(
                  'group flex items-center gap-3 transition-all',
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
                )}
              >
                {/* Circle */}
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200',
                    isCompleted
                      ? 'border-green-500 bg-green-500 text-white'
                      : isCurrent
                        ? 'border-primary bg-primary text-white'
                        : 'border-border bg-card text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <StepIcon className="h-5 w-5" />
                  )}
                </div>

                {/* Title */}
                <div className="hidden flex-col sm:flex">
                  <span
                    className={cn(
                      'text-xs tracking-wide uppercase',
                      isCompleted
                        ? 'text-green-400'
                        : isCurrent
                          ? 'text-primary'
                          : 'text-muted-foreground'
                    )}
                  >
                    Step {step.number}
                  </span>
                  <span
                    className={cn(
                      'text-sm font-medium',
                      isCurrent || isCompleted
                        ? 'text-white'
                        : 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              </button>

              {/* Connector Line */}
              {!isLast && (
                <div className="bg-border mx-4 h-[2px] flex-1 overflow-hidden rounded-full">
                  <div
                    className={cn(
                      'h-full transition-all duration-500 ease-out',
                      isCompleted ? 'w-full bg-green-500' : 'bg-primary w-0'
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
