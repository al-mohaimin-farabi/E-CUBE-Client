import Image from 'next/image';
import Link from 'next/link';
import { Trophy } from 'lucide-react';
import type { Tournament } from '@/redux/features/tournaments/tournamentSlice';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import GameBadge from '@/components/badges/GameBadge';
import PlatformBadge from '@/components/badges/PlatformBadge';

interface TournamentCardProps {
  tournament: Tournament;
  className?: string;
}

const TournamentCard = ({ tournament, className }: TournamentCardProps) => {
  return (
    <div
      className={cn(
        'group bg-card border-border/50 hover:border-primary @container overflow-hidden rounded-md border shadow-sm transition-all hover:shadow-md',
        className
      )}
    >
      {/* Banner Section */}
      <div className="relative h-48 w-full overflow-hidden">
        {tournament.bannerImage ? (
          <Image
            src={tournament.bannerImage}
            alt={tournament.title}
            width={365}
            height={190}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}

        {/* Overlay Gradient */}
        {/* <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" /> */}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {tournament.game && <GameBadge game={tournament.game} />}
          {tournament.platform && (
            <PlatformBadge platform={tournament.platform} />
          )}
        </div>

        {/* Prize Pool Overlay */}
        <div className="from-primary/40 absolute right-0 bottom-0 left-0 flex items-center gap-2 bg-linear-to-r to-transparent px-4 py-1">
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
          <div className="flex flex-col items-end gap-1 @[350px]:items-start">
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
          <div className="flex flex-col items-end gap-1 @[350px]:items-start">
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
          <Button variant="outline" size="sm" asChild>
            <Link href={`/tournaments/${tournament.id}`}>Join Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TournamentCard;

export const TournamentCardSkeleton = () => {
  return (
    <div className="bg-card border-border/50 group @container relative flex w-full flex-col overflow-hidden rounded-md border shadow-sm">
      {/* Banner Skeleton */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden">
        <div className="bg-muted h-full w-full animate-pulse" />

        {/* Badges Skeleton */}
        <div className="absolute top-3 right-3 flex gap-2">
          <div className="bg-muted/50 h-5 w-16 animate-pulse rounded-md" />
          <div className="bg-muted/50 h-5 w-16 animate-pulse rounded-md" />
        </div>

        {/* Prize Pool Overlay Skeleton */}
        <div className="absolute right-0 bottom-0 left-0 flex items-center gap-2 px-4 py-1">
          <div className="bg-muted/50 size-5 animate-pulse rounded-full" />
          <div className="bg-muted/50 h-5 w-20 animate-pulse rounded-md" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col space-y-4 p-3 @[300px]:p-4">
        {/* Title */}
        <div className="bg-muted h-7 w-3/4 animate-pulse rounded-md" />

        {/* Stats Grid */}
        <div className="border-border grid grid-cols-2 gap-2 border-b pb-4 text-center @[350px]:grid-cols-4">
          {/* Entry */}
          <div className="flex flex-col items-start gap-1">
            <div className="bg-muted h-3 w-8 animate-pulse rounded-sm" />
            <div className="bg-muted h-4 w-12 animate-pulse rounded-sm" />
          </div>
          {/* Mode */}
          <div className="flex flex-col items-end gap-1 @[350px]:items-start">
            <div className="bg-muted h-3 w-8 animate-pulse rounded-sm" />
            <div className="bg-muted h-4 w-12 animate-pulse rounded-sm" />
          </div>
          {/* Region */}
          <div className="flex flex-col items-start gap-1">
            <div className="bg-muted h-3 w-10 animate-pulse rounded-sm" />
            <div className="bg-muted h-4 w-16 animate-pulse rounded-sm" />
          </div>
          {/* Slots */}
          <div className="flex flex-col items-end gap-1 @[350px]:items-start">
            <div className="bg-muted h-3 w-8 animate-pulse rounded-sm" />
            <div className="bg-muted h-4 w-10 animate-pulse rounded-sm" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col gap-1">
            <div className="bg-muted h-3 w-12 animate-pulse rounded-sm" />
            <div className="bg-muted h-4 w-20 animate-pulse rounded-sm" />
          </div>
          <div className="bg-muted h-9 w-24 animate-pulse rounded-md" />
        </div>
      </div>
    </div>
  );
};
