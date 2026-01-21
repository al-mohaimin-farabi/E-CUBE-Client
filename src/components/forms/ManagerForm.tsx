'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/InputField';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  saveManager,
  saveCoach,
  completeStep3,
  setCurrentStep,
  type ManagerInfo,
  type CoachInfo,
} from '@/redux/features/teamRegistration/teamRegistrationSlice';
import toast from 'react-hot-toast';

const personSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full Name must be at least 3 characters')
    .regex(/^[^0-9]+$/, 'Full Name cannot contain numbers'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, 'Invalid Bangladeshi phone number'),
  discordId: z.string().min(3, 'Invalid Discord ID'),
});

type PersonFormValues = z.infer<typeof personSchema>;

export const ManagerForm = () => {
  const dispatch = useAppDispatch();
  const { manager, hasManager, coach, hasCoach, completedSteps } =
    useAppSelector((state) => state.teamRegistration);

  const isLocked = completedSteps.includes(3);
  const [wantsManager, setWantsManager] = useState(hasManager);
  const [wantsCoach, setWantsCoach] = useState(hasCoach);

  // Manager form
  const {
    register: registerManager,
    handleSubmit: handleSubmitManager,
    formState: { errors: managerErrors },
    getValues: getManagerValues,
  } = useForm<PersonFormValues>({
    resolver: zodResolver(personSchema),
    defaultValues: manager || {
      fullName: '',
      email: '',
      phoneNumber: '',
      discordId: '',
    },
  });

  // Coach form
  const {
    register: registerCoach,
    handleSubmit: handleSubmitCoach,
    formState: { errors: coachErrors },
    getValues: getCoachValues,
  } = useForm<PersonFormValues>({
    resolver: zodResolver(personSchema),
    defaultValues: coach || {
      fullName: '',
      email: '',
      phoneNumber: '',
      discordId: '',
    },
  });

  const handleComplete = async () => {
    let isValid = true;

    // Validate manager form if opted in
    if (wantsManager) {
      const managerValid = await new Promise<boolean>((resolve) => {
        handleSubmitManager(
          () => resolve(true),
          () => resolve(false)
        )();
      });
      if (!managerValid) {
        toast.error('Please fix the errors in Manager form');
        isValid = false;
      }
    }

    // Validate coach form if opted in
    if (wantsCoach) {
      const coachValid = await new Promise<boolean>((resolve) => {
        handleSubmitCoach(
          () => resolve(true),
          () => resolve(false)
        )();
      });
      if (!coachValid) {
        toast.error('Please fix the errors in Coach form');
        isValid = false;
      }
    }

    if (!isValid) return;

    // Save data
    if (wantsManager) {
      dispatch(saveManager(getManagerValues() as ManagerInfo));
    } else {
      dispatch(saveManager(null));
    }

    if (wantsCoach) {
      dispatch(saveCoach(getCoachValues() as CoachInfo));
    } else {
      dispatch(saveCoach(null));
    }

    dispatch(completeStep3());
    toast.success('Team registration completed!');
  };

  const handleBack = () => {
    dispatch(setCurrentStep(2));
  };

  return (
    <div className="space-y-6">
      {/* Manager Toggle */}
      <div
        className={cn(
          'border-border rounded-[2px] border bg-white/5 p-4',
          isLocked && 'bg-zinc-800 opacity-70'
        )}
      >
        <label
          className={cn(
            'flex items-center gap-3',
            isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          <input
            type="checkbox"
            checked={wantsManager}
            onChange={(e) => setWantsManager(e.target.checked)}
            disabled={isLocked}
            className="accent-primary h-5 w-5"
          />
          <div>
            <span className="font-medium text-white">Add Team Manager</span>
            <p className="text-muted-foreground text-sm">
              Optional: Add a manager to help coordinate your team
            </p>
          </div>
        </label>
      </div>

      {/* Manager Form */}
      {wantsManager && (
        <div className="border-border space-y-4 rounded-[2px] border bg-white/5 p-4">
          <h3 className="font-medium text-white">Manager Information</h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              label="Full Name"
              placeholder="Manager's full name"
              required
              registration={registerManager('fullName')}
              error={managerErrors.fullName?.message}
              disabled={isLocked}
            />
            <InputField
              label="Email"
              type="email"
              placeholder="email@example.com"
              required
              registration={registerManager('email')}
              error={managerErrors.email?.message}
              disabled={isLocked}
            />
            <InputField
              label="Phone Number"
              type="tel"
              placeholder="01XXXXXXXXX"
              required
              registration={registerManager('phoneNumber')}
              error={managerErrors.phoneNumber?.message}
              disabled={isLocked}
            />
            <InputField
              label="Discord ID"
              placeholder="username#0000"
              required
              registration={registerManager('discordId')}
              error={managerErrors.discordId?.message}
              disabled={isLocked}
            />
          </div>
        </div>
      )}

      {/* Coach Toggle */}
      <div
        className={cn(
          'border-border rounded-[2px] border bg-white/5 p-4',
          isLocked && 'bg-zinc-800 opacity-70'
        )}
      >
        <label
          className={cn(
            'flex items-center gap-3',
            isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
        >
          <input
            type="checkbox"
            checked={wantsCoach}
            onChange={(e) => setWantsCoach(e.target.checked)}
            disabled={isLocked}
            className="accent-primary h-5 w-5"
          />
          <div>
            <span className="font-medium text-white">Add Team Coach</span>
            <p className="text-muted-foreground text-sm">
              Optional: Add a coach to guide your team's strategy and gameplay
            </p>
          </div>
        </label>
      </div>

      {/* Coach Form */}
      {wantsCoach && (
        <div className="border-border space-y-4 rounded-[2px] border bg-white/5 p-4">
          <h3 className="font-medium text-white">Coach Information</h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              label="Full Name"
              placeholder="Coach's full name"
              required
              registration={registerCoach('fullName')}
              error={coachErrors.fullName?.message}
              disabled={isLocked}
            />
            <InputField
              label="Email"
              type="email"
              placeholder="email@example.com"
              required
              registration={registerCoach('email')}
              error={coachErrors.email?.message}
              disabled={isLocked}
            />
            <InputField
              label="Phone Number"
              type="tel"
              placeholder="01XXXXXXXXX"
              required
              registration={registerCoach('phoneNumber')}
              error={coachErrors.phoneNumber?.message}
              disabled={isLocked}
            />
            <InputField
              label="Discord ID"
              placeholder="username#0000"
              required
              registration={registerCoach('discordId')}
              error={coachErrors.discordId?.message}
              disabled={isLocked}
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          size="xl"
          className="flex-1"
          onClick={handleBack}
        >
          Back
        </Button>
        {!isLocked && (
          <Button
            type="button"
            size="xl"
            className="flex-1"
            onClick={handleComplete}
          >
            Complete Registration
          </Button>
        )}
      </div>

      {/* Completed state */}
      {isLocked && (
        <div className="rounded-[2px] border border-green-500/30 bg-green-500/10 p-4 text-center">
          <p className="font-medium text-green-400">✓ Registration Complete!</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Your team has been registered for the tournament.
          </p>
        </div>
      )}
    </div>
  );
};
