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
  platform?: 'PC' | 'Mobile' | 'Console' | 'Cross-Platform';
  entryFee?: string;
  mode?: string;
  prizePool?: string;
  filledSlots?: number;
  bannerImage?: string;
}

interface FilterState {
  region: string;
  sortBy: string;
  game: string;
  platform: string;
  mode: string;
}

interface TournamentState {
  allTournaments: Tournament[];
  filteredTournaments: Tournament[];
  filters: FilterState;
}

const initialState: TournamentState = {
  allTournaments: [],
  filteredTournaments: [],
  filters: {
    region: 'Region',
    sortBy: 'Sort by',
    game: 'Game',
    platform: 'Platform',
    mode: 'Mode',
  },
};

// Helper to apply filters
const applyFilters = (state: TournamentState) => {
  let result = [...state.allTournaments];

  // 1. Region Filter
  if (
    state.filters.region &&
    state.filters.region.toLowerCase() !== 'region' &&
    state.filters.region.toLowerCase() !== 'global' &&
    state.filters.region.toLowerCase() !== 'all'
  ) {
    const regionMap: Record<string, string[]> = {
      'north america': ['US', 'CA', 'MX'],
      europe: ['EU', 'UK', 'DE', 'FR'],
      asia: ['BD', 'IN', 'NP', 'CN', 'KR', 'JP', 'ID', 'PH', 'MY'],
      'south america': ['BR', 'AR', 'PE', 'CL'],
    };
    const targetCodes = regionMap[state.filters.region.toLowerCase()] || [];
    if (targetCodes.length > 0) {
      result = result.filter((t) =>
        t.country.some((c) => targetCodes.includes(c))
      );
    }
  }

  // 2. Game Filter
  if (
    state.filters.game &&
    state.filters.game.toLowerCase() !== 'game' &&
    state.filters.game.toLowerCase() !== 'all' &&
    state.filters.game.toLowerCase() !== 'all games'
  ) {
    result = result.filter(
      (t) => t.game?.toLowerCase() === state.filters.game.toLowerCase()
    );
  }

  // 3. Platform Filter
  if (
    state.filters.platform &&
    state.filters.platform.toLowerCase() !== 'platform' &&
    state.filters.platform.toLowerCase() !== 'all'
  ) {
    result = result.filter(
      (t) => t.platform?.toLowerCase() === state.filters.platform.toLowerCase()
    );
  }

  // 4. Mode Filter
  if (
    state.filters.mode &&
    state.filters.mode.toLowerCase() !== 'mode' &&
    state.filters.mode.toLowerCase() !== 'all' &&
    state.filters.mode.toLowerCase() !== 'all modes'
  ) {
    result = result.filter(
      (t) => t.mode?.toLowerCase() === state.filters.mode.toLowerCase()
    );
  }

  // 5. Sort Filter (using Event Start Date)
  const sortVal = state.filters.sortBy?.toLowerCase();
  if (sortVal === 'newest') {
    result.sort(
      (a, b) =>
        new Date(b.eventStart).getTime() - new Date(a.eventStart).getTime()
    );
  } else if (sortVal === 'oldest') {
    result.sort(
      (a, b) =>
        new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime()
    );
  } else if (sortVal === 'prize pool') {
    result.sort((a, b) => {
      const poolA = parseInt(a.prizePool?.replace(/[^0-9]/g, '') || '0');
      const poolB = parseInt(b.prizePool?.replace(/[^0-9]/g, '') || '0');
      return poolB - poolA;
    });
  }

  state.filteredTournaments = result;
};

const tournamentSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FilterState>>) {
      state.filters = { ...state.filters, ...action.payload };
      applyFilters(state);
    },
    setAllTournaments(state, action: PayloadAction<Tournament[]>) {
      state.allTournaments = action.payload;
      applyFilters(state);
    },
  },
});

export const { setFilters, setAllTournaments } = tournamentSlice.actions;
export default tournamentSlice.reducer;
