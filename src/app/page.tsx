import FeturedTournaments from '@/components/pages/home/FeturedTournaments';
import HomeHero from '@/components/pages/home/Hero';
import PopularGames from '@/components/pages/home/PopularGames';
import WhoAreWe from '@/components/pages/home/WhoAreWe';

export default function Home() {
  return (
    <main>
      <HomeHero />
      <FeturedTournaments />
      <PopularGames />
      <WhoAreWe />
    </main>
  );
}
