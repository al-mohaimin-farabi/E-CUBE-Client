import { createSlice } from '@reduxjs/toolkit';

export interface Game {
  id: string;
  title: string;
  tournamentCount: number;
  image: string;
  platform?: 'PC' | 'Mobile' | 'Console' | 'Cross-Platform';
}

const initialGames: Game[] = [
  {
    id: '1',
    title: 'Valorant',
    tournamentCount: 25,
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop', // Esports Arena / Gaming Event
    platform: 'PC',
  },
  {
    id: '2',
    title: 'Mobile Legends',
    tournamentCount: 12,
    image:
      'https://images.unsplash.com/photo-1609177336889-4e69aa3b1ff6?auto=format&fit=crop&q=80&w=600', // Verified Mobile Gaming
    platform: 'Mobile',
  },
  {
    id: '3',
    title: 'CS:GO',
    tournamentCount: 15,
    image:
      'https://images.unsplash.com/photo-1636036817905-0d87619a3ee7?auto=format&fit=crop&q=80&w=600', // Verified FPS/Cyberpunk Setup
    platform: 'PC',
  },
  {
    id: '4',
    title: 'eFootball 2022',
    tournamentCount: 8,
    image:
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=600&auto=format&fit=crop', // Football Field
    platform: 'Console',
  },
  {
    id: '5',
    title: 'FIFA 23',
    tournamentCount: 10,
    image:
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=600&auto=format&fit=crop', // Soccer Stadium
    platform: 'Console',
  },
];

interface GamesState {
  allGames: Game[];
}

const initialState: GamesState = {
  allGames: initialGames,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
});

export default gamesSlice.reducer;
