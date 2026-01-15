import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Tournament {
  id: string;
  title: string;
  country: string[]; // Array of country codes or names
  location: string;
  totalSlots: number;
  registrationStart: string;
  registrationClose: string;
  eventStart: string;
  eventEnd: string;
  isJoined?: boolean;
  featured?: boolean;
  game?: string;
  platform?: 'PC' | 'Mobile' | 'Console';
  entryFee?: string;
  mode?: string;
  prizePool?: string;
  filledSlots?: number;
  bannerImage?: string;
}

const initialTournaments: Tournament[] = [
  {
    id: '1',
    title: 'Valorant Ultimate Showdown Battleground 1.0',
    country: ['EU'],
    location: 'Europe',
    totalSlots: 16,
    filledSlots: 3,
    registrationStart: '2022-09-01',
    registrationClose: '2022-10-01',
    eventStart: 'OCT 02, 2022 • 19:00',
    eventEnd: 'OCT 02, 2022 • 23:00',
    featured: true,
    game: 'Valorant',
    platform: 'PC',
    entryFee: 'Free Entry',
    mode: '5v5',
    prizePool: '10,000 BDT',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '2',
    title: 'Valorant Ultimate Showdown Battleground 1.0',
    country: ['EU'],
    location: 'Europe',
    totalSlots: 16,
    filledSlots: 12,
    registrationStart: '2022-09-01',
    registrationClose: '2022-10-01',
    eventStart: 'OCT 02, 2022 • 19:00',
    eventEnd: 'OCT 02, 2022 • 23:00',
    featured: true,
    game: 'Valorant',
    platform: 'PC',
    entryFee: 'Free Entry',
    mode: '5v5',
    prizePool: '10,000 BDT',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '3',
    title: 'Valorant Ultimate Showdown Battleground 1.0',
    country: ['EU'],
    location: 'Europe',
    totalSlots: 16,
    filledSlots: 8,
    registrationStart: '2022-09-01',
    registrationClose: '2022-10-01',
    eventStart: 'OCT 02, 2022 • 19:00',
    eventEnd: 'OCT 02, 2022 • 23:00',
    featured: true,
    game: 'Valorant',
    platform: 'PC',
    entryFee: 'Free Entry',
    mode: '5v5',
    prizePool: '10,000 BDT',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '4',
    title: 'Valorant Ultimate Showdown Battleground 1.0',
    country: ['EU'],
    location: 'Europe',
    totalSlots: 16,
    filledSlots: 15,
    registrationStart: '2022-09-01',
    registrationClose: '2022-10-01',
    eventStart: 'OCT 02, 2022 • 19:00',
    eventEnd: 'OCT 02, 2022 • 23:00',
    featured: true,
    game: 'Valorant',
    platform: 'PC',
    entryFee: 'Free Entry',
    mode: '5v5',
    prizePool: '10,000 BDT',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
];

interface FilterState {
  region: string;
  sortBy: string;
  game: string;
  platform: string;
}

interface TournamentState {
  allTournaments: Tournament[];
  filteredTournaments: Tournament[];
  filters: FilterState;
}

const initialState: TournamentState = {
  allTournaments: initialTournaments,
  filteredTournaments: initialTournaments,
  filters: {
    region: 'Region',
    sortBy: 'Sort by',
    game: 'Game',
    platform: 'Platform',
  },
};

const tournamentSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FilterState>>) {
      state.filters = { ...state.filters, ...action.payload };

      // Apply filters locally for now (could be server side later)
      let result = [...state.allTournaments];

      // 1. Region Filter
      if (
        state.filters.region !== 'Region' &&
        state.filters.region !== 'Global' &&
        state.filters.region !== 'All'
      ) {
        // Simple logic map:
        const regionMap: Record<string, string[]> = {
          'North America': ['US', 'CA', 'MX'],
          Europe: ['EU', 'UK', 'DE', 'FR'],
          Asia: ['BD', 'IN', 'NP', 'CN', 'KR', 'JP', 'ID', 'PH', 'MY'],
        };
        const targetCodes = regionMap[state.filters.region] || [];
        if (targetCodes.length > 0) {
          result = result.filter((t) =>
            t.country.some((c) => targetCodes.includes(c))
          );
        }
      } else if (state.filters.region === 'Global') {
        // Show Global Only
        result = result.filter((t) => t.country.includes('Global'));
      }

      // 2. Game Filter
      if (state.filters.game !== 'Game' && state.filters.game !== 'All') {
        result = result.filter((t) => t.game === state.filters.game);
      }

      // 3. Platform Filter
      if (
        state.filters.platform !== 'Platform' &&
        state.filters.platform !== 'All'
      ) {
        result = result.filter((t) => t.platform === state.filters.platform);
      }

      // 4. Sort Filter (using Event Start Date)
      if (state.filters.sortBy === 'Newest') {
        result.sort(
          (a, b) =>
            new Date(b.eventStart).getTime() - new Date(a.eventStart).getTime()
        );
      } else if (state.filters.sortBy === 'Oldest') {
        result.sort(
          (a, b) =>
            new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime()
        );
      } else if (state.filters.sortBy === 'Prize Pool') {
        // Data doesn't have prize pool field in interface yet!
        // We can't sort by prize pool.
      }

      state.filteredTournaments = result;
    },
  },
});

export const { setFilters } = tournamentSlice.actions;
export default tournamentSlice.reducer;
