import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Game } from '@/lib/data';
import PlatformBadge from '@/components/badges/PlatformBadge';

interface GameCardProps {
  game: Game;
  className?: string;
}

import Link from 'next/link';

// ... imports

const GameCard = ({ game, className }: GameCardProps) => {
  return (
    <Link
      href={`/games/${encodeURIComponent(game.title)}`}
      className="block h-full w-full"
    >
      <div
        className={cn(
          'group bg-card hover:border-primary border-border relative aspect-3/2 h-[400px] w-full overflow-hidden rounded-md border shadow-sm transition-all hover:shadow-lg',
          className
        )}
      >
        {/* Background Image */}
        <Image
          src={game?.image}
          alt={game?.title}
          fill
          className="aspect-3/2! object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay Gradient: Darker at the bottom for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        {/* Platform Badge */}
        {game.platform && (
          <div className="absolute top-3 right-3">
            <PlatformBadge platform={game.platform} />
          </div>
        )}

        {/* Content */}
        <div className="absolute right-0 bottom-0 left-0 p-4 text-center">
          <h3 className="group-hover:text-primary type-md mb-1 font-bold text-white transition-all duration-300 xl:translate-y-3 xl:group-hover:translate-y-0">
            {game?.title}
          </h3>
          <p className="text-primary text-sm font-medium tracking-wide uppercase transition-all duration-300 xl:translate-y-4 xl:opacity-0 xl:group-hover:translate-y-0 xl:group-hover:opacity-100">
            {game?.tournamentCount} Tournaments
          </p>
        </div>
      </div>
    </Link>
  );
};
export default GameCard;

export const GameCardSkeleton = () => {
  return (
    <div className="bg-card border-border relative aspect-3/2 h-[400px] w-full overflow-hidden rounded-md border shadow-sm">
      {/* Background with standard muted color */}
      <div className="bg-muted h-full w-full animate-pulse" />

      {/* Dark Gradient Overlay to match real card's contrast */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

      {/* Platform Badge Skeleton */}
      <div className="absolute top-3 right-3">
        <div className="bg-muted/50 h-6 w-16 animate-pulse rounded-full" />
      </div>

      {/* Content Skeleton */}
      <div className="absolute right-0 bottom-0 left-0 flex flex-col items-center gap-2 p-4">
        {/* Title Line */}
        <div className="bg-muted/80 h-7 w-3/4 animate-pulse rounded-md" />
        {/* Subtitle Line */}
        <div className="bg-muted/60 h-4 w-1/3 animate-pulse rounded-md" />
      </div>
    </div>
  );
};
