'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Trash2, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/InputField';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  savePlayers,
  saveSubstitutes,
  completeStep2,
  setCurrentStep,
  type PlayerInfo,
} from '@/redux/features/teamRegistration/teamRegistrationSlice';
import toast from 'react-hot-toast';

// Player schema with all contact fields required
const playerSchema = z.object({
  igName: z.string().min(3, 'IG Name must be at least 3 characters'),
  fullName: z
    .string()
    .min(3, 'Full Name must be at least 3 characters')
    .regex(/^[^0-9]+$/, 'Full Name cannot contain numbers'),
  pubgmId: z.string().regex(/^\d{5,12}$/, 'PUBGM ID must be 5-12 digits'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, 'Invalid Bangladeshi phone number'),
  discordId: z.string().min(3, 'Invalid Discord ID'),
  isCoLeader: z.boolean().optional(),
});

const playersFormSchema = z.object({
  players: z
    .array(playerSchema)
    .length(3, 'You must add exactly 3 players')
    .refine(
      (players) => players.filter((p) => p.isCoLeader).length === 1,
      'You must select one player as Co-Leader'
    ),
  substitutes: z.array(playerSchema).max(2, 'Maximum 2 substitutes allowed'),
});

type PlayersFormValues = z.infer<typeof playersFormSchema>;

const emptyPlayer: PlayerInfo = {
  igName: '',
  fullName: '',
  pubgmId: '',
  email: '',
  phoneNumber: '',
  discordId: '',
  isCoLeader: false,
};

export const PlayersForm = () => {
  const dispatch = useAppDispatch();
  const {
    players: savedPlayers,
    substitutes: savedSubstitutes,
    completedSteps,
  } = useAppSelector((state) => state.teamRegistration);

  const isLocked = completedSteps.includes(2);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PlayersFormValues>({
    resolver: zodResolver(playersFormSchema),
    defaultValues: {
      players:
        savedPlayers.length > 0
          ? (savedPlayers as any)
          : [emptyPlayer, emptyPlayer, emptyPlayer],
      substitutes: savedSubstitutes.length > 0 ? (savedSubstitutes as any) : [],
    },
  });

  const { fields: playerFields } = useFieldArray({
    control,
    name: 'players',
  });

  const {
    fields: substituteFields,
    append: appendSubstitute,
    remove: removeSubstitute,
  } = useFieldArray({
    control,
    name: 'substitutes',
  });

  const watchPlayers = watch('players');

  const handleCoLeaderChange = (index: number) => {
    if (isLocked) return;

    // Toggle co-leader: if already co-leader, unset; otherwise set this one
    const currentlyCoLeader = watchPlayers?.[index]?.isCoLeader;

    // Unset all co-leaders first
    playerFields.forEach((_, i) => {
      setValue(`players.${i}.isCoLeader`, false);
    });

    // Set new co-leader if toggling on
    if (!currentlyCoLeader) {
      setValue(`players.${index}.isCoLeader`, true);
    }
  };

  const onSubmit = (data: PlayersFormValues) => {
    dispatch(savePlayers(data.players));
    dispatch(saveSubstitutes(data.substitutes));
    dispatch(completeStep2());
    toast.success('Players added');
    dispatch(setCurrentStep(3));
  };

  const handleBack = () => {
    // Save current data before going back
    const currentData = watch();
    dispatch(savePlayers(currentData.players));
    dispatch(saveSubstitutes(currentData.substitutes));
    dispatch(setCurrentStep(1));
  };

  const onError = (formErrors: any) => {
    if (formErrors.players?.root?.message) {
      toast.error(formErrors.players.root.message);
    } else if (formErrors.players?.message) {
      toast.error(formErrors.players.message);
    } else {
      toast.error('Please fix the errors in the form');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      {/* Info Banner */}
      <div className="flex items-start gap-3 rounded-[2px] border border-blue-500/30 bg-blue-500/10 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
        <p className="text-sm text-blue-300">
          You must select one player as Co-Leader. All contact information is
          required for every player and substitute.
        </p>
      </div>

      {/* 3 Required Players */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white">
          Team Members (Required)
        </h3>

        {playerFields.map((field, index) => {
          const isCoLeader = watchPlayers?.[index]?.isCoLeader;

          return (
            <div
              key={field.id}
              className={cn(
                'space-y-4 overflow-hidden rounded-[2px] border p-4',
                isCoLeader
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-white/5'
              )}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white">Player {index + 1}</h4>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isCoLeader || false}
                    onChange={() => handleCoLeaderChange(index)}
                    disabled={isLocked}
                    className="h-4 w-4 accent-white"
                  />
                  <span className="text-muted-foreground">Co-Leader</span>
                </label>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <InputField
                  label="IG Name"
                  placeholder="In-game name"
                  required
                  registration={register(`players.${index}.igName`)}
                  error={errors.players?.[index]?.igName?.message}
                  disabled={isLocked}
                />
                <InputField
                  label="Full Name"
                  placeholder="Real name"
                  required
                  registration={register(`players.${index}.fullName`)}
                  error={errors.players?.[index]?.fullName?.message}
                  disabled={isLocked}
                />
                <InputField
                  label="PUBGM ID"
                  placeholder="5-12 digit ID"
                  required
                  registration={register(`players.${index}.pubgmId`)}
                  error={errors.players?.[index]?.pubgmId?.message}
                  disabled={isLocked}
                />
              </div>

              {/* Contact Info (required for all players) */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <InputField
                  label="Email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  registration={register(`players.${index}.email`)}
                  error={errors.players?.[index]?.email?.message}
                  disabled={isLocked}
                />
                <InputField
                  label="Phone Number"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  required
                  registration={register(`players.${index}.phoneNumber`)}
                  error={errors.players?.[index]?.phoneNumber?.message}
                  disabled={isLocked}
                />
                <InputField
                  label="Discord ID"
                  placeholder="username#0000"
                  required
                  registration={register(`players.${index}.discordId`)}
                  error={errors.players?.[index]?.discordId?.message}
                  disabled={isLocked}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Substitutes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            Substitute Players (Optional)
          </h3>
          {!isLocked && substituteFields.length < 2 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendSubstitute(emptyPlayer)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Substitute
            </Button>
          )}
        </div>

        {substituteFields.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No substitutes added. You can add up to 2 substitute players.
          </p>
        )}

        {substituteFields.map((field, index) => (
          <div
            key={field.id}
            className="border-border space-y-4 rounded-[2px] border bg-white/5 p-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-white">Substitute {index + 1}</h4>
              {!isLocked && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSubstitute(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Basic Info for substitutes */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <InputField
                label="IG Name"
                placeholder="In-game name"
                required
                registration={register(`substitutes.${index}.igName`)}
                error={errors.substitutes?.[index]?.igName?.message}
                disabled={isLocked}
              />
              <InputField
                label="Full Name"
                placeholder="Real name"
                required
                registration={register(`substitutes.${index}.fullName`)}
                error={errors.substitutes?.[index]?.fullName?.message}
                disabled={isLocked}
              />
              <InputField
                label="PUBGM ID"
                placeholder="5-12 digit ID"
                required
                registration={register(`substitutes.${index}.pubgmId`)}
                error={errors.substitutes?.[index]?.pubgmId?.message}
                disabled={isLocked}
              />
            </div>

            {/* Contact Info for substitutes (required) */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <InputField
                label="Email"
                type="email"
                placeholder="email@example.com"
                required
                registration={register(`substitutes.${index}.email`)}
                error={errors.substitutes?.[index]?.email?.message}
                disabled={isLocked}
              />
              <InputField
                label="Phone Number"
                type="tel"
                placeholder="01XXXXXXXXX"
                required
                registration={register(`substitutes.${index}.phoneNumber`)}
                error={errors.substitutes?.[index]?.phoneNumber?.message}
                disabled={isLocked}
              />
              <InputField
                label="Discord ID"
                placeholder="username#0000"
                required
                registration={register(`substitutes.${index}.discordId`)}
                error={errors.substitutes?.[index]?.discordId?.message}
                disabled={isLocked}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="space-y-4">
        {isLocked && (
          <div className="rounded-[2px] border border-green-500/30 bg-green-500/10 p-3 text-center text-sm text-green-400">
            ✓ Players added
          </div>
        )}
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
          {!isLocked ? (
            <Button type="submit" size="xl" className="flex-1 gap-2">
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              size="xl"
              className="flex-1 gap-2"
              onClick={() => dispatch(setCurrentStep(3))}
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};
