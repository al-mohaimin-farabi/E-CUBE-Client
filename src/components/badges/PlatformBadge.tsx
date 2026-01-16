import { cn } from '@/lib/utils';

interface PlatformBadgeProps {
  platform: string;
  className?: string;
}

const getPlatformColor = (platform: string) => {
  const lowerPlatform = platform.toLowerCase();

  switch (lowerPlatform) {
    case 'pc':
      return 'bg-primary text-white';
    case 'mobile':
      return 'bg-emerald-600 text-white';
    case 'console':
      return 'bg-purple-600 text-white';
    case 'cross-platform':
      return 'bg-orange-600 text-white';
    default:
      return 'bg-gray-600 text-white';
  }
};

const PlatformBadge = ({ platform, className }: PlatformBadgeProps) => {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-md backdrop-blur-sm',
        getPlatformColor(platform),
        className
      )}
    >
      {platform}
    </span>
  );
};

export default PlatformBadge;
