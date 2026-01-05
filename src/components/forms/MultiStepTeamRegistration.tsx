'use client';
import { scrollToTop } from '@/lib/utils';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setTournamentId,
  setCurrentStep,
} from '@/redux/features/teamRegistration/teamRegistrationSlice';
import { TeamInfoForm } from './TeamInfoForm';
import { PlayersForm } from './PlayersForm';
import { ManagerForm } from './ManagerForm';
import { StepIndicator, type Step } from '@/components/ui/StepIndicator';
import { Users, UserPlus, Briefcase } from 'lucide-react';

interface MultiStepTeamRegistrationProps {
  tournamentId: string;
}

const steps: Step[] = [
  { number: 1, title: 'Team Info', icon: Users },
  { number: 2, title: 'Players', icon: UserPlus },
  { number: 3, title: 'Manager', icon: Briefcase },
];

export const MultiStepTeamRegistration = ({
  tournamentId,
}: MultiStepTeamRegistrationProps) => {
  const dispatch = useAppDispatch();
  const { currentStep, completedSteps } = useAppSelector(
    (state) => state.teamRegistration
  );

  useEffect(() => {
    dispatch(setTournamentId(tournamentId));
  }, [tournamentId, dispatch]);

  useEffect(() => {
    scrollToTop();
  }, [currentStep]);

  const handleStepClick = (stepNumber: number) => {
    dispatch(setCurrentStep(stepNumber));
  };

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
      />

      {/* Step Content */}
      <div className="border-border bg-card/50 overflow-hidden rounded-[2px] border p-6">
        {currentStep === 1 && <TeamInfoForm />}
        {currentStep === 2 && <PlayersForm />}
        {currentStep === 3 && <ManagerForm />}
      </div>
    </div>
  );
};
