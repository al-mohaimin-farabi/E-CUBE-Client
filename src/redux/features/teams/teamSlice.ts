import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Team } from '@/lib/data';

interface TeamState {
  teams: Team[];
  userTeam: Team | null; // For registration later
}

const initialState: TeamState = {
  teams: [],
  userTeam: null,
};

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action.payload;
    },
    setUserTeam: (state, action: PayloadAction<Team>) => {
      state.userTeam = action.payload;
    },
  },
});

export const { setTeams, setUserTeam } = teamSlice.actions;
export default teamSlice.reducer;
