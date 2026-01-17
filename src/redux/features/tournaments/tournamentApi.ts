import { api } from '@/redux/api';
import { Tournament } from './tournamentSlice';
import {
  getTournaments,
  getGames,
  getContents,
  Game,
  Content,
} from '@/lib/data';

export const tournamentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTournaments: builder.query<Tournament[], void>({
      async queryFn() {
        const data = await getTournaments();
        return { data };
      },
    }),
    getGames: builder.query<Game[], void>({
      async queryFn() {
        const data = await getGames();
        return { data };
      },
    }),
    getContents: builder.query<Content[], void>({
      async queryFn() {
        const data = await getContents();
        return { data };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetTournamentsQuery, useGetGamesQuery, useGetContentsQuery } =
  tournamentApi;
