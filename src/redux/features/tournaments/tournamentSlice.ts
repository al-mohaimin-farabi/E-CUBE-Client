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
  {
    id: '5',
    title: 'CS:GO Major Championship 2023',
    country: ['EU', 'US'],
    location: 'Global',
    totalSlots: 32,
    filledSlots: 32,
    registrationStart: '2023-01-01',
    registrationClose: '2023-02-01',
    eventStart: 'MAY 15, 2023 • 14:00',
    eventEnd: 'MAY 20, 2023 • 22:00',
    featured: true,
    game: 'CS:GO',
    platform: 'PC',
    entryFee: '$50',
    mode: '5v5',
    prizePool: '$1,000,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '6',
    title: 'Dota 2 The International Qualifiers',
    country: ['CN', 'EU'],
    location: 'Asia',
    totalSlots: 64,
    filledSlots: 45,
    registrationStart: '2023-06-01',
    registrationClose: '2023-07-01',
    eventStart: 'AUG 10, 2023 • 10:00',
    eventEnd: 'AUG 25, 2023 • 18:00',
    featured: false,
    game: 'Dota 2',
    platform: 'PC',
    entryFee: 'Free Entry',
    mode: '5v5',
    prizePool: '$500,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '7',
    title: 'League of Legends World Championship',
    country: ['KR', 'US'],
    location: 'South Korea',
    totalSlots: 16,
    filledSlots: 16,
    registrationStart: '2023-09-01',
    registrationClose: '2023-10-01',
    eventStart: 'NOV 05, 2023 • 12:00',
    eventEnd: 'NOV 19, 2023 • 20:00',
    featured: true,
    game: 'League of Legends',
    platform: 'PC',
    entryFee: 'Invite Only',
    mode: '5v5',
    prizePool: '$2,225,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '8',
    title: 'Mobile Legends: Bang Bang SEA Cup',
    country: ['ID', 'PH', 'MY'],
    location: 'Southeast Asia',
    totalSlots: 128,
    filledSlots: 100,
    registrationStart: '2023-03-01',
    registrationClose: '2023-04-01',
    eventStart: 'JUN 10, 2023 • 15:00',
    eventEnd: 'JUN 18, 2023 • 21:00',
    featured: false,
    game: 'Mobile Legends',
    platform: 'Mobile',
    entryFee: 'Free Entry',
    mode: '5v5',
    prizePool: '$300,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '9',
    title: 'Apex Legends Global Series Split 1',
    country: ['US', 'UK'],
    location: 'London',
    totalSlots: 40,
    filledSlots: 38,
    registrationStart: '2023-01-15',
    registrationClose: '2023-02-01',
    eventStart: 'FEB 02, 2023 • 16:00',
    eventEnd: 'FEB 05, 2023 • 20:00',
    featured: true,
    game: 'Apex Legends',
    platform: 'PC',
    entryFee: 'Free Entry',
    mode: 'Battle Royale',
    prizePool: '$500,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '10',
    title: 'Fortnite FNCS Chapter 4 Season 1',
    country: ['Global'],
    location: 'Online',
    totalSlots: 1000,
    filledSlots: 850,
    registrationStart: '2023-02-01',
    registrationClose: '2023-02-15',
    eventStart: 'MAR 01, 2023 • 18:00',
    eventEnd: 'MAR 05, 2023 • 22:00',
    featured: false,
    game: 'Fortnite',
    platform: 'Cross-Platform',
    entryFee: 'Free Entry',
    mode: 'Battle Royale',
    prizePool: '$10,000,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '11',
    title: 'Rocket League Championship Series Winter Major',
    country: ['US'],
    location: 'San Diego',
    totalSlots: 16,
    filledSlots: 16,
    registrationStart: '2023-03-01',
    registrationClose: '2023-03-15',
    eventStart: 'APR 06, 2023 • 13:00',
    eventEnd: 'APR 09, 2023 • 19:00',
    featured: true,
    game: 'Rocket League',
    platform: 'Cross-Platform',
    entryFee: 'Qualification',
    mode: '3v3',
    prizePool: '$310,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '12',
    title: 'Call of Duty League Stage 3 Major',
    country: ['US'],
    location: 'Texas',
    totalSlots: 12,
    filledSlots: 12,
    registrationStart: '2023-02-15',
    registrationClose: '2023-03-01',
    eventStart: 'MAR 09, 2023 • 15:00',
    eventEnd: 'MAR 12, 2023 • 21:00',
    featured: false,
    game: 'Call of Duty',
    platform: 'Console',
    entryFee: 'Pro League',
    mode: '4v4',
    prizePool: '$500,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '13',
    title: 'Overwatch League Midseason Madness',
    country: ['KR', 'US'],
    location: 'Seoul',
    totalSlots: 8,
    filledSlots: 8,
    registrationStart: '2023-05-01',
    registrationClose: '2023-06-01',
    eventStart: 'JUN 16, 2023 • 11:00',
    eventEnd: 'JUN 18, 2023 • 23:00',
    featured: true,
    game: 'Overwatch 2',
    platform: 'PC',
    entryFee: 'Invite Only',
    mode: '5v5',
    prizePool: '$1,000,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '14',
    title: 'Street Fighter 6 Capcom Cup',
    country: ['JP', 'US'],
    location: 'Global',
    totalSlots: 256,
    filledSlots: 200,
    registrationStart: '2024-01-01',
    registrationClose: '2024-02-01',
    eventStart: 'FEB 14, 2024 • 12:00',
    eventEnd: 'FEB 20, 2024 • 20:00',
    featured: false,
    game: 'Street Fighter 6',
    platform: 'Cross-Platform',
    entryFee: '$10',
    mode: '1v1',
    prizePool: '$2,000,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
];

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
  allTournaments: initialTournaments,
  filteredTournaments: initialTournaments,
  filters: {
    region: 'Region',
    sortBy: 'Sort by',
    game: 'Game',
    platform: 'Platform',
    mode: 'Mode',
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
        state.filters.region &&
        state.filters.region.toLowerCase() !== 'region' &&
        state.filters.region.toLowerCase() !== 'global' &&
        state.filters.region.toLowerCase() !== 'all'
      ) {
        // Simple logic map:
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
          (t) =>
            t.platform?.toLowerCase() === state.filters.platform.toLowerCase()
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
        // Data doesn't have prize pool field in interface properly formatted for sort yet
        // But let's try a basic sort if string allows
        result.sort((a, b) => {
          const poolA = parseInt(a.prizePool?.replace(/[^0-9]/g, '') || '0');
          const poolB = parseInt(b.prizePool?.replace(/[^0-9]/g, '') || '0');
          return poolB - poolA;
        });
      }

      state.filteredTournaments = result;
    },
  },
});

export const { setFilters } = tournamentSlice.actions;
export default tournamentSlice.reducer;
