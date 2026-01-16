import FeturedTournaments from '@/components/pages/tournaments/FeturedTournaments';
import TournamentHero from '@/components/pages/tournaments/Hero';
import HighLightCardSection from '@/components/pages/tournaments/HighLightCardSection';
import LatestContent from '@/components/pages/tournaments/LatestContent';
import PopularGames from '@/components/pages/tournaments/PopularGames';
import WhoAreWe from '@/components/pages/tournaments/WhoAreWe';

export default function TournamentsPage() {
  return (
    <>
      <TournamentHero />
      <FeturedTournaments />
      <PopularGames />
      <HighLightCardSection />
      <LatestContent />
      <WhoAreWe />
    </>
  );
}
