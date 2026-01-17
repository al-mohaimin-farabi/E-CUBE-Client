'use client';

import GameCard, { GameCardSkeleton } from '@/components/Cards/GameCard';
import SectionTitle from '@/components/common/SectionTitle';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { useGetGamesQuery } from '@/redux/features/tournaments/tournamentApi';

const PopularGames = () => {
  const { data: games = [], isLoading } = useGetGamesQuery();

  // Taking first 5 games
  const featuredGames = games.slice(0, 5);

  return (
    <SectionWrapper compact className="@container">
      <SectionTitle href="/games" title="Popular Games" />

      {/* Grid Layout: Adapted for 5 items */}
      <div className="grid grid-cols-1 gap-4 @[450px]:grid-cols-2 @2xl:grid-cols-3 @6xl:grid-cols-5 @7xl:gap-6">
        {isLoading
          ? [...Array(5)].map((_, i) => <GameCardSkeleton key={i} />)
          : featuredGames.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </SectionWrapper>
  );
};

export default PopularGames;
