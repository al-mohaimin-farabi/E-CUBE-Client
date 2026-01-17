'use client';

import { useGetGamesQuery } from '@/redux/features/tournaments/tournamentApi';
import GameCard, { GameCardSkeleton } from '@/components/Cards/GameCard';
import SectionTitle from '@/components/common/SectionTitle';
import SectionWrapper from '@/components/layout/SectionWrapper';

const GamesPageContent = () => {
  const { data: allGames = [], isLoading } = useGetGamesQuery();
  const popularGames = allGames.filter((game) => game.isPopular).slice(0, 5);

  return (
    <>
      <header className="relative flex h-[20vh] flex-col items-center justify-center bg-[url('https://loremflickr.com/1920/1080/esports')] mask-[linear-gradient(to_bottom,black_80%,transparent_100%)] bg-cover bg-center bg-no-repeat py-8">
        <div className="absolute inset-0 bg-linear-to-b from-black/60 to-[#0b0e12]"></div>

        <div className="relative z-10 flex w-full max-w-[1400px] flex-col items-center gap-6 px-4">
          <h1 className="type-4xl font-khand text-primary text-center font-black tracking-[2px] uppercase md:text-6xl">
            Competitive games you’d like to play
          </h1>
        </div>
      </header>

      {/* Popular Games Section */}
      <SectionWrapper compact className="@container">
        <SectionTitle title="Popular Games" />
        <div className="grid grid-cols-1 gap-4 @[450px]:grid-cols-2 @2xl:grid-cols-3 @6xl:grid-cols-5 @7xl:gap-6">
          {isLoading
            ? [...Array(5)].map((_, i) => <GameCardSkeleton key={i} />)
            : popularGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
        </div>
      </SectionWrapper>

      {/* All Games Section */}
      <SectionWrapper compact className="@container">
        <SectionTitle title="All Games" />
        <div className="grid grid-cols-1 gap-4 @[450px]:grid-cols-2 @2xl:grid-cols-3 @6xl:grid-cols-5 @7xl:gap-6">
          {isLoading
            ? [...Array(10)].map((_, i) => <GameCardSkeleton key={i} />)
            : allGames.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
      </SectionWrapper>
    </>
  );
};

export default GamesPageContent;
