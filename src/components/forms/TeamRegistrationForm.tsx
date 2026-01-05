'use client';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CloudUpload, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

// Zod Schema (without password fields)
const registrationSchema = z.object({
  teamName: z.string().min(3, 'Team Name must be at least 3 characters'),
  leaderName: z
    .string()
    .min(3, 'Leader/IGL Name must be at least 3 characters'),
  leaderId: z.string().regex(/^\d{5,12}$/, 'PUBGM ID must be 5-12 digits'),
  leaderFullName: z.string().min(3, 'Full Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, 'Invalid Bangladeshi phone number'),
  discordId: z.string().min(3, 'Invalid Discord ID'),
  logo: z.any().optional(),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: any;
}

const InputField = ({
  label,
  required,
  className,
  error,
  registration,
  type,
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <div className="relative">
        <Input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={cn(
            error && 'border-red-500 focus-visible:ring-red-500',
            isPassword && 'pr-10',
            className
          )}
          {...registration}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 hover:text-white"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

interface TeamRegistrationFormProps {
  tournamentId: string;
}

export const TeamRegistrationForm = ({
  tournamentId,
}: TeamRegistrationFormProps) => {
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetLogo(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetLogo(file);
    }
  };

  const validateAndSetLogo = (file: File) => {
    const validTypes = ['image/png', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setLogoError('Only PNG, SVG, or WebP files are allowed');
      return;
    }
    setLogoError(null);
    setLogo(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: RegistrationFormValues) => {
    if (!logo) {
      setLogoError('Team Logo is required');
      return;
    }
    console.log('Form submitted for tournament:', tournamentId, {
      ...data,
      logo,
    });
    toast.success('Team registered successfully!');
    // Handle submission logic
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Team Logo Section */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-white">
            Team Logo<span className="ml-1 text-red-500">*</span>
          </label>
          <span className="text-sm font-medium text-white">Preview</span>
        </div>

        <div className="flex h-[180px] gap-4">
          {/* Upload Area */}
          <div
            onClick={triggerFileInput}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={cn(
              'border-border group flex flex-1 cursor-pointer flex-col items-center justify-center rounded-[2px] border-2 border-dashed bg-white/5 transition-colors hover:bg-white/10',
              logoError && 'border-red-500'
            )}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/png, image/svg+xml, image/webp"
              onChange={handleFileChange}
            />
            <CloudUpload className="text-muted-foreground group-hover:text-primary mb-3 h-8 w-8 transition-colors" />
            <p className="text-muted-foreground text-sm font-medium">
              Click or Drop a file here
            </p>
            <p className="text-muted-foreground/60 text-xs">
              Supported formats: PNG, SVG, WebP
            </p>
          </div>

          {/* Preview Area */}
          <div className="border-border relative flex w-[180px] items-center justify-center overflow-hidden rounded-[2px] border-2 border-dashed bg-white/5">
            {logoPreview ? (
              <Image
                src={logoPreview}
                alt="Logo Preview"
                fill
                className="object-contain p-2"
              />
            ) : (
              <div className="h-full w-full" />
            )}
          </div>
        </div>
        {logoError && <p className="mt-1 text-xs text-red-500">{logoError}</p>}

        {/* Logo Requirements */}
        <div className="text-muted-foreground mt-4 space-y-1 text-xs">
          <p className="font-medium text-white/80">
            Submit Your Logo. Must contain:
          </p>
          <ul className="ml-1 list-inside list-disc space-y-0.5">
            <li>500x500 or 1:1 Ratio</li>
            <li>
              Make sure logo don't have any{' '}
              <span className="font-bold text-white/90">white-space</span>
            </li>
            <li>Logo must have to be transparent.</li>
          </ul>
        </div>
      </div>

      {/* Inputs Section */}
      <div className="space-y-4">
        <InputField
          label="Team Name"
          placeholder="Event Execution Experts: Ecube"
          required
          registration={register('teamName')}
          error={errors.teamName?.message}
        />
        <InputField
          label="Leader/IGL Name"
          placeholder="Angular Esports"
          required
          registration={register('leaderName')}
          error={errors.leaderName?.message}
        />
        <InputField
          label="Leader/IGL PUBGM ID"
          placeholder="Angular Esports"
          required
          registration={register('leaderId')}
          error={errors.leaderId?.message}
        />
        <InputField
          label="Leader Full Name"
          placeholder="Angular Esports"
          required
          registration={register('leaderFullName')}
          error={errors.leaderFullName?.message}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="hello@angular.gg"
          required
          registration={register('email')}
          error={errors.email?.message}
        />
        <InputField
          label="Phone Number"
          type="tel"
          placeholder="01300000000"
          required
          registration={register('phoneNumber')}
          error={errors.phoneNumber?.message}
        />
        <InputField
          label="Discord ID"
          placeholder="THEMIS#0423 or themisuwu"
          required
          registration={register('discordId')}
          error={errors.discordId?.message}
        />
      </div>

      <Button type="submit" size={'xl'} className="w-full">
        Register Team
      </Button>
    </form>
  );
};
