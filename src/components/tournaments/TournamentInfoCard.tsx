'use client';

import { useAppSelector } from '@/redux/hooks';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Flag from 'react-world-flags';
import { Globe } from 'lucide-react';
import Image from 'next/image';
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
        'border-border bg-secondary flex flex-col border text-xs sm:grid sm:grid-cols-2 sm:text-sm',
        className
      )}
    >
      <div className="text-muted-foreground border-border flex items-center border-b px-4 py-3 sm:border-r sm:border-b-0 sm:px-6 sm:py-4">
        {label}
      </div>
      <div className="flex items-center px-4 py-3 font-medium text-white sm:px-6 sm:py-4">
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Desktop Image - Side by side (hidden on mobile) */}
      <div className="relative hidden lg:block">
        <Image
          src="/assets/images/TournamentBanner.png"
          width={800}
          height={400}
          alt={tournament.title}
          className="border-border h-full w-full rounded-[2px] border"
        />
      </div>

      {/* Info Card - Contains mobile image inside */}
      <div className="border-border bg-card h-min w-full space-y-4 rounded-[2px] border-2 p-4">
        {/* Mobile Image (hidden on desktop) */}
        <div className="block w-full lg:hidden">
          <Image
            src="/assets/images/TournamentBanner.png"
            width={800}
            height={400}
            alt={tournament.title}
            className="h-auto w-full rounded-[2px] object-cover"
          />
        </div>

        {/* Info Rows */}
        <div className="flex flex-col gap-[10px]">
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

        <div className="pt-4">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-foreground h-12 w-full border text-sm font-normal tracking-wide uppercase transition-all"
          >
            Join Tournament Now
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
    <div className="flex flex-col gap-6">
      {filteredTournaments.map((tournament) => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
};
