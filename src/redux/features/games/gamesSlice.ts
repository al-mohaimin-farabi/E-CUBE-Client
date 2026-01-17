import { createSlice } from '@reduxjs/toolkit';
import { Game } from '@/lib/data';

interface GamesState {
  allGames: Game[];
}

const initialState: GamesState = {
  allGames: [],
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
});

export default gamesSlice.reducer;
