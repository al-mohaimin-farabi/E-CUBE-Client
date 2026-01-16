import FeturedTournaments from '@/components/pages/tournaments/FeturedTournaments';
import HomeHero from '@/components/pages/tournaments/Hero';
import HighLightCardSection from '@/components/pages/tournaments/HighLightCardSection';
import LatestContent from '@/components/pages/tournaments/LatestContent';
import PopularGames from '@/components/pages/tournaments/PopularGames';
import WhoAreWe from '@/components/pages/tournaments/WhoAreWe';

export default function Home() {
  return (
    <main>
      <HomeHero />
      <FeturedTournaments />
      <PopularGames />
      <HighLightCardSection />
      <LatestContent />
      <WhoAreWe />
    </main>
  );
}
