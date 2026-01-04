import React from 'react';
import { cn } from '@/lib/utils';

interface GradientWrapperProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  className?: string;
  isIcon?: boolean;
}

const GradientWrapper = ({
  children,
  direction = 'horizontal',
  className,
  isIcon = false,
}: GradientWrapperProps) => {
  const gradientId = React.useId();
  const safeId = gradientId.replace(/:/g, '-'); // Sanitize ID for URL usage

  if (isIcon && React.isValidElement(children)) {
    return (
      <>
        <svg
          width="0"
          height="0"
          className="absolute block h-0 w-0 overflow-hidden"
        >
          <defs>
            <linearGradient
              id={safeId}
              x1="0%"
              y1="0%"
              x2={direction === 'horizontal' ? '100%' : '0%'}
              y2={direction === 'vertical' ? '100%' : '0%'}
            >
              <stop offset="0%" stopColor="var(--palette-icon-orange)" />
              <stop offset="100%" stopColor="var(--palette-icon-yellow)" />
            </linearGradient>
          </defs>
        </svg>
        {React.cloneElement(children, {
          style: { stroke: `url(#${safeId})` },
          className: cn(
            (children as React.ReactElement<{ className?: string }>).props
              .className,
            className
          ),
        } as React.SVGProps<SVGSVGElement>)}
      </>
    );
  }

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
