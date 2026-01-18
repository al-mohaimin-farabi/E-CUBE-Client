'use client';

import { useState } from 'react';
import { useGetParticipatedTeamsQuery } from '@/redux/features/teams/teamApi';
import { Team } from '@/lib/data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Flag from 'react-world-flags';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/common/EmptyState';

interface ParticipatedTeamsTabProps {
  tournamentId?: string;
}

export const ParticipatedTeamsTab = ({
  tournamentId,
}: ParticipatedTeamsTabProps) => {
  const { data: teams, isLoading } = useGetParticipatedTeamsQuery();
  const [showRosters, setShowRosters] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!teams || teams.length === 0) {
    return (
      <div className="py-0 md:py-16">
        <EmptyState
          title="No Teams yet!"
          description="Be the first team to register for this tournament."
          actionLabel="Register Now"
          actionLink={`/tournaments/register/${tournamentId}`}
        />
      </div>
    );
  }

  return (
    <div className="@container w-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-primary text-lg font-bold">Participated Teams</h2>
        <Button
          variant="outline"
          onClick={() => setShowRosters(!showRosters)}
          className=""
          // border-primary/50 text-primary h-9 border bg-[#0b0e12] text-xs font-bold tracking-wider uppercase hover:bg-[#1a1d21]
        >
          {showRosters ? 'Hide Rosters' : 'Toggle Rosters'}
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 @sm:grid-cols-2 @md:gap-4 @xl:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5 @7xl:grid-cols-6">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} globalShowRoster={showRosters} />
        ))}
      </div>
    </div>
  );
};

// Team Card
const TeamCard = ({
  team,
  globalShowRoster,
}: {
  team: Team;
  globalShowRoster: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const showRoster = globalShowRoster || isHovered;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group border-border bg-card relative flex h-[260px] flex-col overflow-hidden rounded border transition-colors duration-300"
    >
      {/* 
        ACTIVE BORDER INDICATOR (Optional, based on design having left border) 
        The design shows a blue line on the left.
      */}
      <div className="bg-primary absolute top-0 bottom-0 left-0 w-[2px]" />

      {/* HEADER: Name & Flag */}
      <div className="border-border flex h-[40px] items-center justify-between border-b px-3 pl-4">
        <span className="truncate text-[11px] font-bold tracking-wider text-white uppercase">
          {team.name}
        </span>
        <Flag
          code={team.country}
          style={{ width: '24px', height: '18px', borderRadius: '2px' }}
        />
      </div>

      {/* BODY: Swappable Content (Logo vs Roster) */}
      <div className="relative flex-1">
        {/* LOGO VIEW (Default) */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center p-6 transition-all duration-500',
            showRoster
              ? 'opacity-10 blur-[2px] grayscale' // Transforms into Watermark
              : 'blur-0 opacity-100 grayscale-0' // Default State
          )}
        >
          <div className="relative h-24 w-24">
            <Image
              src={team.logo}
              alt={team.name}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* ROSTER VIEW (Hover/Toggle) */}
        <div
          className={cn(
            'absolute inset-0 z-10 flex flex-col justify-center px-4 py-2 transition-all duration-300',
            showRoster ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          )}
        >
          {/* Center the list vertically if needed, or stick to top */}
          <div className="space-y-1.5">
            {team.members.map((member, idx) => (
              <div
                key={idx}
                className="border-border flex items-center gap-2.5 border-b pb-1 last:border-0 last:pb-0"
              >
                {/* Status Dot */}
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_4px_rgba(239,68,68,0.5)]" />
                <span className="text-muted-foreground truncate text-[10px] font-bold tracking-wide uppercase group-hover:text-gray-300">
                  {member.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER: Group */}
      <div className="border-border flex h-[36px] items-center justify-center border-t">
        <span className="text-muted-foreground text-[10px] font-bold tracking-[0.2em] uppercase">
          {team.group}
        </span>
      </div>
    </div>
  );
};
