import { api } from '@/redux/api';
import { Team, getParticipatedTeams } from '@/lib/data';

export const teamApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getParticipatedTeams: builder.query<Team[], void>({
      async queryFn() {
        // Here we simulate fetching from backend
        const data = await getParticipatedTeams();
        return { data };
      },
    }),
  }),
});

export const { useGetParticipatedTeamsQuery } = teamApi;
