import FeturedTournaments from '@/components/pages/tournaments/FeturedTournaments';
import TournamentHero from '@/components/pages/tournaments/Hero';
import HighLightCardSection from '@/components/pages/tournaments/HighLightCardSection';
import LatestContent from '@/components/pages/tournaments/LatestContent';
import PopularGames from '@/components/pages/tournaments/PopularGames';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tournaments | E-CUBE Esports',
  description:
    'Browse and join the latest mock tournaments across Valorant, CS:GO, and more.',
};

export default function TournamentsPage() {
  return (
    <>
      <TournamentHero />
      <FeturedTournaments />
      <PopularGames />
      <HighLightCardSection />
      <LatestContent />
    </>
  );
}
