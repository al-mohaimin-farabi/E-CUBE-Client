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
}

const initialTournaments: Tournament[] = [
  {
    id: '1',
    title: 'Valorant Ultimate Showdown',
    country: ['BD', 'IN', 'NP'],
    location: 'Online / Lan',
    totalSlots: 128,
    registrationStart: '1 January 2024 • 6:00 PM (BST)',
    registrationClose: '3 January 2024 • 11:59 PM (BST)',
    eventStart: '5 January 2024',
    eventEnd: '10 January 2024',
  },
  {
    id: '2',
    title: 'CS:GO Asia Championship',
    country: ['CN', 'KR', 'JP'],
    location: 'Shanghai, China',
    totalSlots: 64,
    registrationStart: '10 February 2024 • 10:00 AM (CST)',
    registrationClose: '15 February 2024 • 11:59 PM (CST)',
    eventStart: '20 February 2024',
    eventEnd: '25 February 2024',
  },
  {
    id: '3',
    title: 'Dota 2 Winter Major',
    country: ['US', 'CA', 'UK'],
    location: 'Online',
    totalSlots: 256,
    registrationStart: '1 March 2024 • 12:00 PM (EST)',
    registrationClose: '5 March 2024 • 8:00 PM (EST)',
    eventStart: '10 March 2024',
    eventEnd: '15 March 2024',
  },
  {
    id: '4',
    title: 'Mobile Legends Bang Bang Cup',
    country: ['ID', 'PH', 'MY'],
    location: 'Jakarta, Indonesia',
    totalSlots: 512,
    registrationStart: '15 April 2024 • 9:00 AM (WIB)',
    registrationClose: '20 April 2024 • 11:59 PM (WIB)',
    eventStart: '1 May 2024',
    eventEnd: '5 May 2024',
  },
  {
    id: '5',
    title: 'PUBG Global Invitational',
    country: ['Global'],
    location: 'Lan',
    totalSlots: 100,
    registrationStart: '1 June 2024 • 00:00 AM (UTC)',
    registrationClose: '10 June 2024 • 11:59 PM (UTC)',
    eventStart: '1 July 2024',
    eventEnd: '7 July 2024',
  },
  {
    id: '6',
    title: 'Rocket League Speed Cup',
    country: ['EU'],
    location: 'Online',
    totalSlots: 32,
    registrationStart: '5 July 2024 • 3:00 PM (CET)',
    registrationClose: '7 July 2024 • 11:59 PM (CET)',
    eventStart: '10 July 2024',
    eventEnd: '12 July 2024',
  },
];

interface FilterState {
  region: string;
  sortBy: string;
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

      // 2. Sort Filter (using Event Start Date)
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
