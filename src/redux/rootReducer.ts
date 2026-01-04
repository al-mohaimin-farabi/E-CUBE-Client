import { combineReducers } from '@reduxjs/toolkit';
import { api } from './api';
import tournamentReducer from '@/redux/features/tournaments/tournamentSlice';

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  tournaments: tournamentReducer,
});
