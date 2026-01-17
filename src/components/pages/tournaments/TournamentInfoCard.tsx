'use client';

import { useAppSelector } from '@/redux/hooks';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Flag from 'react-world-flags';
import { Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Tournament } from '@/redux/features/tournaments/tournamentSlice';

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

const InfoRow = ({ label, value, className }: InfoRowProps) => {
  return (
    <div
      className={cn(
        'border-border bg-secondary flex flex-col border text-xs sm:grid sm:grid-cols-2 lg:text-sm',
        className
      )}
    >
      <div className="text-muted-foreground border-border flex items-center border-b px-4 py-3 sm:border-r sm:border-b-0">
        {label}
      </div>
      <div className="flex items-center px-4 py-3 font-medium text-white">
        {value}
      </div>
    </div>
  );
};

interface TournamentCardProps {
  tournament: Tournament;
}

export const TournamentCard = ({ tournament }: TournamentCardProps) => {
  // Configuration for dynamic rows
  const rowsConfig: {
    label: string;
    key: keyof Tournament;
    render?: (value: any) => React.ReactNode;
  }[] = [
    {
      label: 'Country',
      key: 'country',
      render: (values: string[]) => (
        <div className="flex items-center gap-2">
          {values.map((code) => {
            if (code === 'Global') {
              return (
                <Globe
                  key={code}
                  className="h-5 w-5 text-blue-400"
                  aria-label="Global"
                />
              );
            }
            return (
              <div
                key={code}
                className="relative h-5 w-7 overflow-hidden rounded-[2px]"
                title={code}
              >
                <Flag code={code} height="20" />
              </div>
            );
          })}
        </div>
      ),
    },
    { label: 'Location', key: 'location' },
    { label: 'Total Slots', key: 'totalSlots' },
    { label: 'Registration Starting Date & Time', key: 'registrationStart' },
    { label: 'Registration Closing Date & Time', key: 'registrationClose' },
    { label: 'Event Start Date', key: 'eventStart' },
    { label: 'Event End Date', key: 'eventEnd' },
  ];

  return (
    <div className="relative grid w-full grid-cols-1 gap-6 @[1520px]:grid-cols-2">
      {/* Desktop Image - Side by side (hidden on mobile) */}
      <div className="relative hidden @[1520px]:block">
        <Image
          src="/assets/images/TournamentBanner.png"
          width={800}
          height={490}
          alt={tournament.title}
          className="border-border aspect-video h-full max-h-[490px] w-full rounded-[2px] border"
        />
      </div>

      {/* Info Card - Contains mobile image inside */}
      <div className="border-border bg-card flex w-full flex-col gap-4 rounded-[2px] border-2 p-4 @[1520px]:h-min">
        {/* Mobile Image (hidden on desktop) */}
        <div className="block w-full @[1520px]:hidden">
          <Image
            src="/assets/images/TournamentBanner.png"
            width={800}
            height={400}
            alt={tournament.title}
            className="h-auto w-full rounded-[2px] object-cover"
          />
        </div>

        {/* Info Rows */}
        <div className="flex flex-1 flex-col gap-[10px]">
          {rowsConfig.map((row) => {
            const value = tournament[row.key];
            return (
              <InfoRow
                key={row.label}
                label={row.label}
                value={
                  row.render ? row.render(value) : (value as React.ReactNode)
                }
              />
            );
          })}
        </div>

        {/* Button always at bottom */}
        <div className="mt-auto pt-4">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-foreground h-12 w-full border text-sm font-normal tracking-wide uppercase transition-all"
            asChild
          >
            <Link href={`/tournaments/register/${tournament.id}`}>
              Join Tournament Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Wrapper component to display the list
export const TournamentList = () => {
  const { filteredTournaments } = useAppSelector((state) => state.tournaments);

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @[764px]:grid-cols-2 @[1520px]:grid-cols-1">
        {filteredTournaments.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </div>
    </div>
  );
};
