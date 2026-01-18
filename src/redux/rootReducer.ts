import { combineReducers } from '@reduxjs/toolkit';
import { api } from './api';
import tournamentReducer from '@/redux/features/tournaments/tournamentSlice';
import teamRegistrationReducer from '@/redux/features/teamRegistration/teamRegistrationSlice';
import gamesReducer from '@/redux/features/games/gamesSlice';
import contentsReducer from '@/redux/features/contents/contentsSlice';
import teamReducer from '@/redux/features/teams/teamSlice';

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  tournaments: tournamentReducer,
  teamRegistration: teamRegistrationReducer,
  games: gamesReducer,
  contents: contentsReducer,
  teams: teamReducer,
});
