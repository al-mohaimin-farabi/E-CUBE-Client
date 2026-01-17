import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionLink?: string;
  className?: string;
  onReset?: () => void;
}

const EmptyState = ({
  title = 'No Data Found',
  description = "We couldn't find what you were looking for.",
  actionLabel,
  actionLink,
  className,
  onReset,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex min-h-[400px] w-full flex-col items-center justify-center gap-6 rounded-md overflow-hidden bg-border/40 px-4 py-12 text-center backdrop-blur-sm md:px-8',
        className
      )}
    >
      {/* Icon / Graphic */}
      <div className="relative flex items-center justify-center pt-8">
        <div className="bg-primary/20 absolute h-32 w-32 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-white/0 shadow-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-muted-foreground h-10 w-10 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex gap-4">
        {onReset && (
          <Button
            onClick={onReset}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 hover:text-primary-foreground h-12 rounded-xl px-8 font-semibold tracking-wider uppercase"
          >
            Reset Filters
          </Button>
        )}

        {actionLabel && actionLink && (
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 shadow-primary/25 h-12 rounded-xl px-8 font-semibold tracking-wider text-white uppercase shadow-lg"
          >
            <Link href={actionLink}>{actionLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
