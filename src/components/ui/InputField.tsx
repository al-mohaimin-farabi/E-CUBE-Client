'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  registration?: any;
  containerClassName?: string;
}

export const InputField = ({
  label,
  required,
  className,
  error,
  registration,
  type,
  containerClassName,
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className={cn('min-w-0 space-y-2', containerClassName)}>
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
