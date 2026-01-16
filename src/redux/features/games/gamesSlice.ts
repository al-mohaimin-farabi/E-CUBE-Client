import { createSlice } from '@reduxjs/toolkit';

export interface Game {
  id: string;
  title: string;
  tournamentCount: number;
  image: string;
  platform?: 'PC' | 'Mobile' | 'Console' | 'Cross-Platform';
  isPopular?: boolean;
}

const initialGames: Game[] = [
  {
    id: '1',
    title: 'Valorant',
    tournamentCount: 25,
    image: 'https://loremflickr.com/600/400/valorant',
    platform: 'PC',
    isPopular: true,
  },
  {
    id: '2',
    title: 'Mobile Legends',
    tournamentCount: 12,
    image: 'https://loremflickr.com/600/400/mobilelegends',
    platform: 'Mobile',
    isPopular: true,
  },
  {
    id: '3',
    title: 'CS:GO',
    tournamentCount: 15,
    image: 'https://loremflickr.com/600/400/csgo',
    platform: 'PC',
    isPopular: true,
  },
  {
    id: '4',
    title: 'eFootball 2022',
    tournamentCount: 8,
    image: 'https://loremflickr.com/600/400/fifa',
    platform: 'Console',
    isPopular: true,
  },
  {
    id: '5',
    title: 'Clash Royale',
    tournamentCount: 10,
    image: 'https://loremflickr.com/600/400/clashroyale,game',
    platform: 'Mobile',
    isPopular: true,
  },
  {
    id: '6',
    title: 'Dota 2',
    tournamentCount: 20,
    image: 'https://loremflickr.com/600/400/dota2',
    platform: 'PC',
    isPopular: true,
  },
  {
    id: '7',
    title: 'Apex Legends',
    tournamentCount: 18,
    image: 'https://loremflickr.com/600/400/apexlegends',
    platform: 'Cross-Platform',
    isPopular: true,
  },
  {
    id: '8',
    title: 'League of Legends',
    tournamentCount: 30,
    image: 'https://loremflickr.com/600/400/leagueoflegends',
    platform: 'PC',
    isPopular: true,
  },
  {
    id: '9',
    title: 'PUBG Mobile',
    tournamentCount: 22,
    image: 'https://loremflickr.com/600/400/pubg',
    platform: 'Mobile',
    isPopular: true,
  },
  {
    id: '10',
    title: 'FIFA 23',
    tournamentCount: 14,
    image: 'https://loremflickr.com/600/400/fifa23',
    platform: 'Console',
    isPopular: false,
  },
  {
    id: '11',
    title: 'Fortnite',
    tournamentCount: 16,
    image: 'https://loremflickr.com/600/400/fortnite',
    platform: 'Cross-Platform',
    isPopular: false,
  },
  {
    id: '12',
    title: 'Rocket League',
    tournamentCount: 9,
    image: 'https://loremflickr.com/600/400/rocketleague',
    platform: 'Cross-Platform',
    isPopular: false,
  },
  {
    id: '13',
    title: 'Call of Duty: Warzone',
    tournamentCount: 13,
    image: 'https://loremflickr.com/600/400/codwarzone',
    platform: 'Cross-Platform',
    isPopular: false,
  },
  {
    id: '14',
    title: 'Overwatch 2',
    tournamentCount: 7,
    image: 'https://loremflickr.com/600/400/overwatch',
    platform: 'PC',
    isPopular: false,
  },
  {
    id: '15',
    title: 'Street Fighter 6',
    tournamentCount: 5,
    image: 'https://loremflickr.com/600/400/streetfighter',
    platform: 'Console',
    isPopular: false,
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
