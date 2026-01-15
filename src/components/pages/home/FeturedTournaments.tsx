'use client';

import { useAppSelector } from '@/redux/hooks';
import TournamentCard from '@/components/Cards/TournamentCard';
import SectionTitle from '@/components/common/SectionTitle';
import SectionWrapper from '@/components/layout/SectionWrapper';

const FeturedTournaments = () => {
  const { allTournaments } = useAppSelector((state) => state.tournaments);

  // Filter featured tournaments and take top 4 using 0-4 slice for performance
  // instead of full sort if strictly top 4 of *provided* list is implied,
  // or just first 4 found.
  const featuredTournaments = allTournaments
    .filter((t) => t.featured)
    // If specific logic for "top" is needed (e.g. highest prize), sort here.
    // For now taking first 4.
    .slice(0, 4);

  return (
    <SectionWrapper compact>
      <SectionTitle href="/tournaments" title="Featured Tournaments" />

      {/* Container Query Wrapper */}
      <div className="@container">
        <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @6xl:grid-cols-4">
          {featuredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FeturedTournaments;
