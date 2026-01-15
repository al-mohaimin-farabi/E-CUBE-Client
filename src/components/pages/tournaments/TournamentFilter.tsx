'use client';

import React, { useState, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch } from '@/redux/hooks';
import { setFilters } from '@/redux/features/tournaments/tournamentSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FilterItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  isOpen?: boolean; // Mobile accordion state
}

const FilterItem = forwardRef<HTMLButtonElement, FilterItemProps>(
  (
    { label, hasDropdown, isActive, isOpen, className, onClick, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          // Base styles (Mobile: stack, full width, space between)
          'group text-muted-foreground relative flex h-[46px] w-full flex-none cursor-pointer items-center justify-between px-6 text-sm font-medium whitespace-nowrap transition-colors hover:text-white',
          // Desktop overrides (Row, auto width, center content)
          'md:h-full md:w-auto md:justify-center md:gap-2',
          'ring-0 outline-none focus:ring-0 focus:outline-none',
          isActive && 'bg-white/5 text-white',
          className
        )}
        {...props}
      >
        {label}
        {hasDropdown && (
          <IoMdArrowDropdown
            className={cn(
              'text-border pointer-events-none h-6 w-6 transition-transform duration-200',
              isOpen && 'rotate-180' // Mobile rotation
            )}
          />
        )}
      </button>
    );
  }
);
FilterItem.displayName = 'FilterItem';

export const TournamentFilter = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('Overview');
  const [region, setRegion] = useState('Region');
  const [sortBy, setSortBy] = useState('Sort by');

  // Mobile Accordion States
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleTabClick = (label: string) => {
    setActiveTab(label);
    // You might also dispatch a tab change here if the store filters by tab (e.g. status)
  };

  const applyFilters = (newRegion: string, newSortBy: string) => {
    dispatch(
      setFilters({
        region: newRegion,
        sortBy: newSortBy,
      })
    );
  };

  const handleRegionChange = (val: string) => {
    setRegion(val);
    applyFilters(val, sortBy); // Apply immediately on desktop/mobile
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
    applyFilters(region, val); // Apply immediately on desktop/mobile
  };

  const regionOptions = ['All', 'Global', 'North America', 'Europe', 'Asia'];
  const sortOptions = ['Newest', 'Oldest'];

  // Desktop Content (Horizontal Bar)
  const DesktopContent = (
    <div className="hidden w-full flex-row items-center justify-center gap-2 @[920px]:flex">
      {/* Main Filter Bar */}
      <div className="border-border bg-card flex h-[46px] w-fit flex-row items-center rounded-[2px] border">
        <FilterItem
          label="Overview"
          isActive={activeTab === 'Overview'}
          onClick={() => handleTabClick('Overview')}
          className="border-border border-r"
        />
        <FilterItem
          label="Rulebook"
          isActive={activeTab === 'Rulebook'}
          onClick={() => handleTabClick('Rulebook')}
          className="border-border border-r"
        />
        <FilterItem
          label="Schedule"
          isActive={activeTab === 'Schedule'}
          onClick={() => handleTabClick('Schedule')}
          className="border-border border-r"
        />
        <FilterItem
          label="Bracket"
          isActive={activeTab === 'Bracket'}
          onClick={() => handleTabClick('Bracket')}
          className="border-border border-r"
        />
        <FilterItem
          label="Participated Teams"
          isActive={activeTab === 'Participated Teams'}
          onClick={() => handleTabClick('Participated Teams')}
          className="border-border border-r"
        />

        {/* Region (Popover) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <FilterItem
              label={region}
              hasDropdown
              isActive={region !== 'Region'}
              className="border-border border-r"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-border bg-card z-200 min-w-[160px] rounded-[2px] text-white"
          >
            {regionOptions.map((opt) => (
              <DropdownMenuItem
                key={opt}
                className="cursor-pointer rounded-[2px] focus:bg-white/10 focus:text-white"
                onClick={() => handleRegionChange(opt)}
              >
                {opt}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort (Popover, Last Item) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <FilterItem
              label={sortBy}
              hasDropdown
              isActive={sortBy !== 'Sort by'}
              // No border-r for last item
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-border bg-card z-200 min-w-[160px] rounded-[2px] text-white"
          >
            {sortOptions.map((opt) => (
              <DropdownMenuItem
                key={opt}
                className="cursor-pointer rounded-[2px] focus:bg-white/10 focus:text-white"
                onClick={() => handleSortChange(opt)}
              >
                {opt}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Filter Button (Functional on Desktop dispatching same action if needed, currently apply immediate) */}
      <Button
        className="h-[46px] w-auto cursor-pointer rounded-[2px] px-8 text-sm font-bold text-white"
        onClick={() => {
          // Re-apply or just log
          applyFilters(region, sortBy);
        }}
      >
        Filter
      </Button>
    </div>
  );

  // Mobile Content (Collapsible Vertical Stack)
  const MobileContent = (
    <div className="flex w-full flex-col @[920px]:hidden">
      {/* Toggle Button */}
      <Button
        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        className="group flex h-[46px] w-full items-center justify-between rounded-[2px] px-6 text-sm font-bold text-white hover:bg-white/20 active:bg-white/20"
      >
        Filter
        <IoMdArrowDropdown
          className={cn(
            'h-6 w-6 transition-transform duration-200',
            isMobileFilterOpen && 'rotate-180'
          )}
        />
      </Button>

      {/* Expandable Area */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-border bg-card mt-2 flex flex-col rounded-[2px] border">
              <FilterItem
                label="Overview"
                isActive={activeTab === 'Overview'}
                onClick={() => handleTabClick('Overview')}
                className="border-border border-b first:rounded-t-[2px]"
              />
              <FilterItem
                label="Rulebook"
                isActive={activeTab === 'Rulebook'}
                onClick={() => handleTabClick('Rulebook')}
                className="border-border border-b"
              />
              <FilterItem
                label="Schedule"
                isActive={activeTab === 'Schedule'}
                onClick={() => handleTabClick('Schedule')}
                className="border-border border-b"
              />
              <FilterItem
                label="Bracket"
                isActive={activeTab === 'Bracket'}
                onClick={() => handleTabClick('Bracket')}
                className="border-border border-b"
              />
              <FilterItem
                label="Participated Teams"
                isActive={activeTab === 'Participated Teams'}
                onClick={() => handleTabClick('Participated Teams')}
                className="border-border border-b"
              />

              {/* Region Accordion */}
              <div className="border-border border-b">
                <FilterItem
                  label={region}
                  hasDropdown
                  isActive={region !== 'Region'}
                  isOpen={isRegionOpen}
                  onClick={() => {
                    setIsRegionOpen(!isRegionOpen);
                    if (!isRegionOpen) setIsSortOpen(false);
                  }}
                />
                <AnimatePresence>
                  {isRegionOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden bg-black/20"
                    >
                      {regionOptions.map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setRegion(opt); // State update
                            setIsRegionOpen(false);
                          }}
                          className="border-border text-muted-foreground hover:text-primary cursor-pointer border-t px-8 py-3 text-sm font-medium transition-colors"
                        >
                          {opt}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort Accordion */}
              <div>
                <FilterItem
                  label={sortBy}
                  hasDropdown
                  isActive={sortBy !== 'Sort by'}
                  isOpen={isSortOpen}
                  onClick={() => {
                    setIsSortOpen(!isSortOpen);
                    if (!isSortOpen) setIsRegionOpen(false);
                  }}
                  className={cn(!isSortOpen && 'rounded-b-[2px]')}
                />
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden rounded-b-[2px] bg-black/20"
                    >
                      {sortOptions.map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setSortBy(opt); // State update
                            setIsSortOpen(false);
                          }}
                          className="border-border text-muted-foreground hover:text-primary cursor-pointer border-t px-8 py-3 text-sm font-medium transition-colors"
                        >
                          {opt}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Apply Button */}
            <div className="mt-2 text-center">
              <Button
                className="h-[46px] w-full rounded-[2px] font-bold text-white"
                onClick={() => {
                  applyFilters(region, sortBy); // Actually filter on click
                  setIsMobileFilterOpen(false);
                }}
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="@container">
      {DesktopContent}
      {MobileContent}
    </div>
  );
};
