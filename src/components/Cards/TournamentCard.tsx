import Image from 'next/image';
import { Trophy } from 'lucide-react';
import type { Tournament } from '@/redux/features/tournaments/tournamentSlice';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TournamentCardProps {
  tournament: Tournament;
  className?: string;
}

const TournamentCard = ({ tournament, className }: TournamentCardProps) => {
  return (
    <div
      className={cn(
        'group bg-card border-border/50 hover:border-border @container overflow-hidden rounded-md border shadow-sm transition-all hover:shadow-md',
        className
      )}
    >
      {/* Banner Section */}
      <div className="relative h-48 w-full overflow-hidden">
        {tournament.bannerImage ? (
          <Image
            src={tournament.bannerImage}
            alt={tournament.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}

        {/* Overlay Gradient */}
        {/* <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" /> */}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {tournament.game && (
            <span className="rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
              {tournament.game}
            </span>
          )}
          {tournament.platform && (
            <span className="rounded-full bg-black/60 px-4 py-1 text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-sm">
              {tournament.platform}
            </span>
          )}
        </div>

        {/* Prize Pool Overlay */}
        <div className="absolute bottom-0 px-3 py-2 bg-black/60 left-0 right-0 flex items-center gap-2">
          <Trophy className="size-5 text-[#ed9c00]" />
          <span className="text-lg font-bold text-white">
            {tournament.prizePool}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-4 p-3 @[300px]:p-4">
        {/* Title */}
        <h3 className="group-hover:text-primary line-clamp-1 text-lg font-bold text-white transition-colors">
          {tournament.title}
        </h3>

        {/* Stats Grid */}
        <div className="border-border grid grid-cols-2 gap-2 border-b pb-4 text-center @[350px]:grid-cols-4">
          <div className="flex flex-col items-start gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase">
              Entry
            </span>
            <span className="text-sm font-bold tracking-tight text-white">
              {tournament.entryFee}
            </span>
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase">
              Mode
            </span>
            <span className="text-sm font-bold text-white">
              {tournament.mode}
            </span>
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase">
              Region
            </span>
            <span className="truncate text-sm font-bold text-white">
              {typeof tournament.location === 'string'
                ? tournament.location
                : 'Global'}
            </span>
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase">
              Slots
            </span>
            <span className="text-sm font-bold text-white">
              {tournament.filledSlots}/{tournament.totalSlots}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
              Starting
            </span>
            <span className="text-sm font-bold text-gray-300 uppercase">
              {/* Shortened Date to prevent wrapping */}
              {tournament.eventStart.split('•')[0].trim()}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-primary hover:text-primary hover:border-primary/30 border-white/10 bg-transparent font-bold tracking-wider uppercase hover:bg-white/5"
          >
            Join Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
