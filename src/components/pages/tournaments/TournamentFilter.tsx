'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useAppDispatch } from '@/redux/hooks';
import { setFilters } from '@/redux/features/tournaments/tournamentSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Reusable Dropdown Component
interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  className?: string; // For custom layout overrides if needed
  lastItem?: boolean;
}

const FilterDropdown = ({
  label,
  value,
  options,
  onChange,
  lastItem,
}: FilterDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button
        className={cn(
          'group hover:bg-border relative flex h-full flex-1 cursor-pointer flex-col justify-center px-4 py-3 transition-colors focus:outline-none md:px-6 md:py-0',
          !lastItem && 'border-border border-b md:border-r md:border-b-0'
        )}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start gap-1">
            <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              {label}
            </span>
            <span className="text-sm font-bold whitespace-nowrap text-white">
              {value || 'All'}
            </span>
          </div>
          <IoMdArrowDropdown className="text-muted-foreground h-5 w-5 transition-colors group-hover:text-white" />
        </div>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="start"
      className="border-border z-99999999999 w-[200px] bg-[#0b0e12] p-1 text-white shadow-xl backdrop-blur-xl"
    >
      {options.map((opt) => (
        <DropdownMenuItem
          key={opt}
          onClick={() => onChange(opt)}
          className="focus:bg-primary/20 focus:text-primary cursor-pointer font-medium"
        >
          {opt}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export const TournamentFilter = () => {
  const dispatch = useAppDispatch();

  // Filter States
  const [game, setGame] = useState('All Games');
  const [time, setTime] = useState('Upcoming'); // Mapped to "Date" visual
  const [region, setRegion] = useState('Global');
  const [mode, setMode] = useState('5v5');
  const [sortBy, setSortBy] = useState('Newest');

  // Mobile Collapse State
  const [isExpanded, setIsExpanded] = useState(false);

  // Options
  const gameOptions = [
    'All Games',
    'Valorant',
    'CS:GO',
    'Dota 2',
    'League of Legends',
    'Mobile Legends',
  ];
  const timeOptions = ['All Time', 'Upcoming', 'Ongoing', 'Past'];
  const regionOptions = [
    'Global',
    'North America',
    'Europe',
    'Asia',
    'South America',
  ];
  const modeOptions = ['All Modes', '1v1', '2v2', '5v5', 'Battle Royale'];
  const sortOptions = ['Newest', 'Prize Pool', 'Most Popular'];

  const handleApply = () => {
    dispatch(
      setFilters({
        region: (region === 'Global' ? 'All' : region).toLowerCase(),
        game: (game === 'All Games' ? 'All' : game).toLowerCase(),
        mode: (mode === 'All Modes' ? 'All' : mode).toLowerCase(),
        sortBy: sortBy.toLowerCase(),
      })
    );
    // You handle other filters (game, status, mode) similarly in Redux if supported
    console.log('Filters Applied:', {
      game: game.toLowerCase(),
      time: time.toLowerCase(),
      region: region.toLowerCase(),
      mode: mode.toLowerCase(),
      sortBy: sortBy.toLowerCase(),
    });

    // Close on mobile after apply
    setIsExpanded(false);
  };

  return (
    <div className="relative z-50 mx-auto w-full max-w-[1200px] shadow-2xl">
      {/* Mobile Toggle */}
      <div className="mb-2 w-full md:hidden">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-12 w-full"
        >
          {isExpanded ? 'Hide Filters' : 'Filter Games'}
        </Button>
      </div>
      <div
        className={cn(
          'h-full w-full md:flex transition-all duration-300 ease-in-out',
          isExpanded
            ? 'max-h-[500px] opacity-100'
            : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'
        )}
      >
        {/* Filter Container */}
        <div
          className={cn(
            'border-border bg-background/60 w-full rounded-b-none! md:rounded-b! overflow-hidden rounded md:rounded-r-none border md:border-r-0 backdrop-blur-sm',
            // Desktop styles
            'md:flex md:h-14 md:flex-row md:items-stretch md:overflow-visible',
            // Mobile styles with max-height transition
            'flex flex-col'
          )}
        >
          {/* Game Filter */}
          <FilterDropdown
            label="Game"
            value={game}
            options={gameOptions}
            onChange={setGame}
          />

          {/* Date/Time Filter */}
          <FilterDropdown
            label="Date"
            value={time}
            options={timeOptions}
            onChange={setTime}
          />

          {/* Region Filter */}
          <FilterDropdown
            label="Region"
            value={region}
            options={regionOptions}
            onChange={setRegion}
          />

          {/* Mode Filter */}
          <FilterDropdown
            label="Mode"
            value={mode}
            options={modeOptions}
            onChange={setMode}
          />

          {/* Sort Filter */}
          <FilterDropdown
            label="Sorted by"
            value={sortBy}
            options={sortOptions}
            onChange={setSortBy}
            lastItem
          />
        </div>
        {/* Filter Button */}
        {/* <Button
          onClick={handleApply}
          className="bg-primary hover:bg-primary/90 m-2 hidden h-12 w-[calc(100%-1rem)] rounded px-10 text-base font-bold tracking-wider text-white uppercase shadow-none transition-all active:scale-[0.98] md:m-0 md:block md:h-14 md:w-auto md:rounded-l-none md:rounded-r"
        >
          Filter
        </Button> */}
        <Button
          onClick={handleApply}
          className="h-12 w-full rounded rounded-t-none! md:h-14 md:w-[120px]! md:rounded-l-none! md:rounded-r!"
        >
          Filter
        </Button>
      </div>
    </div>
  );
};
