'use client';

import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface TournamentTabsProps {
  className?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TABS = [
  'Overview',
  'Rulebook',
  'Participated Teams',
  'Schedule',
  'Bracket',
];

export const TournamentTabs = ({
  className,
  activeTab,
  setActiveTab,
}: TournamentTabsProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={cn('mx-auto w-full px-6 md:max-w-[1200px]', className)}>
      {/* MOBILE: Dropdown Selector */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="border-border bg-background/60 flex w-full items-center justify-between rounded border px-4 py-3 backdrop-blur-sm"
        >
          <span className="text-sm font-bold tracking-wide text-white uppercase">
            {activeTab}
          </span>
          <ChevronDown
            className={cn(
              'text-muted-foreground size-5 transition-transform',
              mobileOpen && 'rotate-180'
            )}
          />
        </button>

        {/* Dropdown Options */}
        {mobileOpen && (
          <div className="border-border mt-1 overflow-hidden rounded border bg-[#0b0e12]">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileOpen(false);
                }}
                className={cn(
                  'w-full px-4 py-3 text-left text-sm font-medium transition-colors',
                  activeTab === tab
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* DESKTOP: Horizontal Tabs */}
      <div className="border-border bg-background/60 hidden w-full rounded border backdrop-blur-sm md:flex">
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab;
          const isLast = index === TABS.length - 1;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'group hover:bg-border/40 relative flex h-14 flex-1 cursor-pointer items-center justify-center px-6 transition-colors focus:outline-none',
                !isLast && 'border-border border-r',
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
