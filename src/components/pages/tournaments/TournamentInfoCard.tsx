'use client';

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
        'border-border bg-secondary flex w-full items-stretch border text-xs lg:text-sm',
        className
      )}
    >
      {/* Label Section - Fixed width or 50% split */}
      <div className="text-muted-foreground border-border flex w-1/2 items-center border-r px-4 py-3 font-medium tracking-wide uppercase">
        {label}
      </div>
      {/* Value Section */}
      <div className="flex w-1/2 items-center justify-end px-4 py-3 text-right font-bold text-white">
        {value}
      </div>
    </div>
  );
};

interface TournamentInfoCardProps {
  tournament: Tournament;
}

export const TournamentInfoCard = ({ tournament }: TournamentInfoCardProps) => {
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
        <div className="flex items-center justify-end gap-2">
          {values.map((code) => {
            if (code === 'Global') {
              return (
                <Globe
                  key={code}
                  className="text-primary h-5 w-5"
                  aria-label="Global"
                />
              );
            }
            return (
              <div
                key={code}
                className="relative h-5 w-7 shrink-0 overflow-hidden rounded-[2px]"
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
    <div className="border-border bg-card mx-auto flex flex-col overflow-hidden border-2 lg:gap-6 lg:overflow-hidden @7xl:flex-row @7xl:border-0 @7xl:bg-transparent ">
      {/* Banner / Image Section */}
      <div className="">
        {tournament.bannerImage ? (
          <Image
            src={tournament.bannerImage}
            alt={tournament.title}
            width={600}
            height={600}
            className="border-border aspect-video h-full w-full border-b-2 object-cover @7xl:h-max @7xl:border-2"
            priority
          />
        ) : (
          <div className="bg-muted flex h-full items-center justify-center">
            <span className="text-muted-foreground">No Image Available</span>
          </div>
        )}
      </div>

      {/* Info Content Section */}
      <div className="bg-card @7xl:border-border w-full max-w-[750px] p-4 @7xl:border-2">
        <h2 className="font-khand type-xl mb-4 font-bold tracking-wide text-white uppercase">
          {tournament.title}
        </h2>

        {/* Info Rows */}
        <div className="flex flex-1 flex-col gap-3">
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

        {/* Action Button */}
        <div className="mt-4 pt-2">
          <Button
            className="h-12 w-full text-base font-bold tracking-wider uppercase transition-all hover:scale-[1.01] active:scale-[0.99]"
            size="lg"
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
