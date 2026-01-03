import React from 'react';
import { cn } from '@/lib/utils';

interface GradientWrapperProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

const GradientWrapper = ({
  children,
  direction = 'horizontal',
  className,
}: GradientWrapperProps) => {
  return (
    <div
      className={cn('w-fit bg-clip-text text-transparent', className)}
      style={{
        backgroundImage: `linear-gradient(${
          direction === 'horizontal' ? 'to right' : 'to bottom'
        }, var(--palette-icon-orange), var(--palette-icon-yellow))`,
      }}
    >
      {children}
    </div>
  );
};

export default GradientWrapper;
