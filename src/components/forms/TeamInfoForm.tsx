'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/InputField';
import { ImageDropzone } from '@/components/ui/ImageDropzone';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  saveTeamInfo,
  completeStep1,
  setCurrentStep,
  type TeamInfo,
} from '@/redux/features/teamRegistration/teamRegistrationSlice';
import toast from 'react-hot-toast';

const teamSchema = z.object({
  teamName: z.string().min(3, 'Team Name must be at least 3 characters'),
  leaderName: z
    .string()
    .min(3, 'Leader/IGL Name must be at least 3 characters'),
  leaderId: z.string().regex(/^\d{5,12}$/, 'PUBGM ID must be 5-12 digits'),
  leaderFullName: z
    .string()
    .min(3, 'Full Name must be at least 3 characters')
    .regex(/^[^0-9]+$/, 'Full Name cannot contain numbers'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, 'Invalid Bangladeshi phone number'),
  discordId: z.string().min(3, 'Invalid Discord ID'),
});

type TeamFormValues = z.infer<typeof teamSchema>;

const logoRequirements = [
  '500x500 or 1:1 Ratio',
  'No white-space around logo',
  'Transparent background required',
];

export const TeamInfoForm = () => {
  const dispatch = useAppDispatch();
  const { teamInfo, completedSteps } = useAppSelector(
    (state) => state.teamRegistration
  );

  const isLocked = completedSteps.includes(1);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    teamInfo?.logoPreview || null
  );
  const [logoError, setLogoError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: teamInfo
      ? {
          teamName: teamInfo.teamName,
          leaderName: teamInfo.leaderName,
          leaderId: teamInfo.leaderId,
          leaderFullName: teamInfo.leaderFullName,
          email: teamInfo.email,
          phoneNumber: teamInfo.phoneNumber,
          discordId: teamInfo.discordId,
        }
      : undefined,
  });

  const handleLogoSelect = (file: File, preview: string) => {
    const validTypes = ['image/png', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setLogoError('Only PNG, SVG, or WebP files are allowed');
      return;
    }
    setLogoError(null);
    setLogoFile(file);
    setLogoPreview(preview);
  };

  const handleLogoClear = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  const onSubmit = (data: TeamFormValues) => {
    if (!logoPreview) {
      setLogoError('Team Logo is required');
      return;
    }

    const teamData: TeamInfo = {
      ...data,
      logoPreview,
    };

    dispatch(saveTeamInfo(teamData));
    dispatch(completeStep1());
    toast.success('Team info saved!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Logo Upload */}
      <ImageDropzone
        onFileSelect={handleLogoSelect}
        onClear={handleLogoClear}
        preview={logoPreview}
        error={logoError}
        requirements={logoRequirements}
        disabled={isLocked}
      />

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <InputField
            label="Team Name"
            placeholder="Enter your team name"
            required
            registration={register('teamName')}
            error={errors.teamName?.message}
            disabled={isLocked}
          />
        </div>
        <InputField
          label="Leader/IGL Name"
          placeholder="In-game name"
          required
          registration={register('leaderName')}
          error={errors.leaderName?.message}
          disabled={isLocked}
        />
        <InputField
          label="Leader PUBGM ID"
          placeholder="5-12 digit ID"
          required
          registration={register('leaderId')}
          error={errors.leaderId?.message}
          disabled={isLocked}
        />
        <InputField
          label="Leader Full Name"
          placeholder="Real name"
          required
          registration={register('leaderFullName')}
          error={errors.leaderFullName?.message}
          disabled={isLocked}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="leader@email.com"
          required
          registration={register('email')}
          error={errors.email?.message}
          disabled={isLocked}
        />
        <InputField
          label="Phone Number"
          type="tel"
          placeholder="01XXXXXXXXX"
          required
          registration={register('phoneNumber')}
          error={errors.phoneNumber?.message}
          disabled={isLocked}
        />
        <InputField
          label="Discord ID"
          placeholder="username#0000"
          required
          registration={register('discordId')}
          error={errors.discordId?.message}
          disabled={isLocked}
        />
      </div>

      {/* Submit Button */}
      {!isLocked && (
        <Button type="submit" size="xl" className="w-full gap-2">
          Next: Add Team Members <ArrowRight className="h-4 w-4" />
        </Button>
      )}

      {isLocked && (
        <div className="space-y-4">
          <div className="rounded-[2px] border border-green-500/30 bg-green-500/10 p-3 text-center text-sm text-green-400">
            ✓ Team registered
          </div>
          <Button
            type="button"
            size="xl"
            className="w-full gap-2"
            onClick={() => dispatch(setCurrentStep(2))}
          >
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </form>
  );
};
