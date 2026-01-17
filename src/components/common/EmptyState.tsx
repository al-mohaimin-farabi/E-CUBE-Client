import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SearchX } from 'lucide-react';

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
        'bg-border/40 border-border flex min-h-[400px] w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-md border px-4 py-12 text-center backdrop-blur-sm md:px-8',
        className
      )}
    >
      {/* Icon / Graphic */}
      <div className="relative flex items-center justify-center pt-8">
        <div className="bg-primary/20 absolute h-32 w-32 rounded-full blur-3xl"></div>
        <div className="border-border bg-background/50 relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border shadow-2xl">
          <SearchX className="text-muted-foreground h-10 w-10 opacity-70" />
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
          <Button size={'xl'} onClick={onReset} variant="outline" className="shadow-black/25 shadow-lg">
            Reset Filters
          </Button>
        )}

        {actionLabel && actionLink && (
          <Button asChild size={'xl'} className="shadow-primary/25 shadow-lg">
            <Link href={actionLink}>{actionLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
