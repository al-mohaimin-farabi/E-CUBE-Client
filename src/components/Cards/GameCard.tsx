import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Game } from '@/redux/features/games/gamesSlice';
import PlatformBadge from '@/components/badges/PlatformBadge';

interface GameCardProps {
  game: Game;
  className?: string;
}

const GameCard = ({ game, className }: GameCardProps) => {
  return (
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
  );
};

export default GameCard;
