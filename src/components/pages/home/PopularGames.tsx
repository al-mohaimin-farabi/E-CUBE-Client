'use client';

import { useAppSelector } from '@/redux/hooks';
import GameCard from '@/components/Cards/GameCard';
import SectionTitle from '@/components/common/SectionTitle';
import SectionWrapper from '@/components/layout/SectionWrapper';

const PopularGames = () => {
  const { allGames } = useAppSelector((state) => state.games);

  // Taking first 5 games to match the "Popular" section style
  // In a real app, you might sort by popularity or tournament count before slicing
  const featuredGames = allGames.slice(0, 5);

  return (
    <SectionWrapper compact className="@container">
      <SectionTitle href="/games" title="Popular Games" />

      {/* Grid Layout: Adapted for 5 items */}
      <div className="grid grid-cols-1 gap-4 @[450px]:grid-cols-2 @2xl:grid-cols-3 @6xl:grid-cols-5">
        {featuredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default PopularGames;
