'use client';

import TournamentCard, {
  TournamentCardSkeleton,
} from '@/components/Cards/TournamentCard';
import SectionTitle from '@/components/common/SectionTitle';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { useGetTournamentsQuery } from '@/redux/features/tournaments/tournamentApi';

const FeturedTournaments = () => {
  const { data: tournaments = [], isLoading } = useGetTournamentsQuery();

  // Filter featured tournaments and take top 4
  const featuredTournaments = tournaments.filter((t) => t.featured).slice(0, 4);

  return (
    <SectionWrapper compact>
      <SectionTitle
        href="/tournaments/alltournament"
        title="Featured Tournaments"
      />

      {/* Container Query Wrapper */}
      <div className="@container">
        <div className="grid grid-cols-1 gap-4 xl:gap-6 @xl:grid-cols-2 @6xl:grid-cols-4">
          {isLoading
            ? [...Array(4)].map((_, i) => <TournamentCardSkeleton key={i} />)
            : featuredTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FeturedTournaments;
