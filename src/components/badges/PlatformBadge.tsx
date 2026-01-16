import { cn } from '@/lib/utils';

interface PlatformBadgeProps {
  platform: string;
  className?: string;
}

const PlatformBadge = ({ platform, className }: PlatformBadgeProps) => {
  return (
    <span
      className={cn(
        'bg-primary/90 text-primary-foreground rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-md backdrop-blur-sm',
        className
      )}
    >
      {platform}
    </span>
  );
};

export default PlatformBadge;
