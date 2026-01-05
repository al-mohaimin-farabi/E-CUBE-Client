import { combineReducers } from '@reduxjs/toolkit';
import { api } from './api';
import tournamentReducer from '@/redux/features/tournaments/tournamentSlice';
import teamRegistrationReducer from '@/redux/features/teamRegistration/teamRegistrationSlice';

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  tournaments: tournamentReducer,
  teamRegistration: teamRegistrationReducer,
});
