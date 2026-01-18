'use client';

import type { Tournament } from '@/redux/features/tournaments/tournamentSlice';

interface ScheduleTabProps {
  tournament: Tournament;
}

export const ScheduleTab = ({ tournament }: ScheduleTabProps) => {
  // Mock Schedule Data
  const schedule = [
    {
      stage: 'Group Stage - Round 1',
      date: '20 Oct 2025',
      time: '10:00 AM',
      match: 'Team A vs Team B',
      status: 'Completed',
    },
    {
      stage: 'Group Stage - Round 2',
      date: '20 Oct 2025',
      time: '02:00 PM',
      match: 'Team C vs Team D',
      status: 'Upcoming',
    },
    {
      stage: 'Quarter Finals',
      date: '21 Oct 2025',
      time: '10:00 AM',
      match: 'TBD vs TBD',
      status: 'Upcoming',
    },
    {
      stage: 'Semi Finals',
      date: '22 Oct 2025',
      time: '04:00 PM',
      match: 'TBD vs TBD',
      status: 'Upcoming',
    },
    {
      stage: 'Grand Final',
      date: '25 Oct 2025',
      time: '08:00 PM',
      match: 'TBD vs TBD',
      status: 'Upcoming',
    },
  ];

  return (
    <div className="w-full ">
      <div className="mx-auto max-w-5xl">
        {/* Desktop: Table-like layout | Mobile: Card stack */}
        <div className="divide-border/50 hidden divide-y md:block">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="hover:bg-card/30 flex items-center justify-between px-2 py-3 transition-colors"
            >
              {/* Date & Time */}
              <div className="w-36 shrink-0">
                <span className="type-sm text-primary block font-semibold">
                  {item.date}
                </span>
                <span className="type-xs text-muted-foreground">
                  {item.time}
                </span>
              </div>

              {/* Match Info */}
              <div className="flex-1 px-4">
                <span className="type-base font-bold text-white">
                  {item.match}
                </span>
                <span className="type-xs text-muted-foreground ml-3 tracking-wide uppercase">
                  {item.stage}
                </span>
              </div>

              {/* Status Badge */}
              <span
                className={`type-xs rounded px-2.5 py-1 font-bold uppercase ${
                  item.status === 'Completed'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile: Stacked Cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="border-border bg-card/50 rounded border p-3"
            >
              {/* Top row: Date/Time + Status */}
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <span className="type-sm text-primary block font-semibold">
                    {item.date}
                  </span>
                  <span className="type-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                    item.status === 'Completed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Match Info */}
              <div className="type-sm font-bold text-white">{item.match}</div>
              <div className="type-xs text-muted-foreground mt-0.5 tracking-wide uppercase">
                {item.stage}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
