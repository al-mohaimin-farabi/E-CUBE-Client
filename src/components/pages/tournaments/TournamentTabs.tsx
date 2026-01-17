'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface TournamentTabsProps {
  className?: string;
}

const TABS = [
  'Overview',
  'Rulebook',
  'Participated Teams',
  'Schedule',
  'Bracket',
];

export const TournamentTabs = ({ className }: TournamentTabsProps) => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className={cn('mx-auto w-full max-w-[1200px]', className)}>
      <div className="border-border bg-background/60 scrollbar-hide flex w-full flex-row overflow-x-auto rounded border backdrop-blur-sm md:overflow-visible">
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab;
          const isLast = index === TABS.length - 1;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'group hover:bg-border/40 relative flex h-14 min-w-fit flex-1 cursor-pointer items-center justify-center px-4 transition-colors focus:outline-none md:min-w-0 md:px-6',
                // Right Border
                !isLast && 'border-border border-r',
                // Active Background
                isActive && 'bg-white/5'
              )}
            >
              <span
                className={cn(
                  'text-sm font-bold tracking-wider uppercase transition-colors',
                  isActive
                    ? 'text-white'
                    : 'text-muted-foreground group-hover:text-white'
                )}
              >
                {tab}
              </span>

              {/* Active Indicator */}
              {isActive && (
                <div className="bg-primary absolute bottom-0 left-0 h-[2px] w-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
