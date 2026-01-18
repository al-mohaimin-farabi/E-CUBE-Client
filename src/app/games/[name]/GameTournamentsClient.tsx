'use client';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setFilters,
  setAllTournaments,
} from '@/redux/features/tournaments/tournamentSlice';
import { useGetGamesQuery } from '@/redux/features/tournaments/tournamentApi';
import SectionWrapper from '@/components/layout/SectionWrapper';
import TournamentCard, {
  TournamentCardSkeleton,
} from '@/components/Cards/TournamentCard';
import EmptyState from '@/components/common/EmptyState';
import { TournamentFilter } from '@/components/pages/tournaments/TournamentFilter';
import SectionTitle from '@/components/common/SectionTitle';
import GameCard, { GameCardSkeleton } from '@/components/Cards/GameCard';
import { useEffect, useState } from 'react';

interface GameTournamentsClientProps {
  gameTitle: string;
  tournaments: any[];
  gameImage: string;
}

const GameTournamentsClient = ({
  gameTitle,
  tournaments,
  gameImage,
}: GameTournamentsClientProps) => {
  const dispatch = useAppDispatch();
  const { filteredTournaments } = useAppSelector((state) => state.tournaments);
  const [isReduxReady, setIsReduxReady] = useState(false);

  // Fetch popular games for the "More Games" section
  const { data: games = [], isLoading: isGamesLoading } = useGetGamesQuery();
  const popularGames = games
    .filter((g) => g.isPopular && g.title !== gameTitle)
    .slice(0, 5);

  useEffect(() => {
    // Just indicate we are ready with the passed tournaments
    // We can rely on local 'tournaments' prop for display to be completely safe and simple
    // or just set them to state if we wanted client-side filtering later.
    // For now, let's keep it simple: The server filtered them by game.
    setIsReduxReady(true);
  }, [tournaments]);

  const isLoading = !isReduxReady;

  const handleResetFilters = () => {
    dispatch(
      setFilters({
        region: 'Region',
        game: gameTitle, // Keep specific game context on reset? Or clear all?
        // If we clear all, it might show nothing if we only injected game-specific data.
        // Let's keep it to gameTitle or 'Game' if we want to allow clearing.
        mode: 'Mode',
        platform: 'Platform',
        sortBy: 'Newest',
      })
    );
  };

  return (
    <>
      {/* Hero / Header Section */}
      <header className="relative flex flex-col items-center justify-center pt-8 pb-12">
        <div className="absolute inset-0 z-20 bg-linear-to-t from-transparent to-black/60"></div>

        <div className="relative z-50 flex w-full max-w-[1400px] flex-col items-center gap-6 px-4">
          <h1 className="type-4xl font-khand text-primary text-center font-black tracking-[2px] uppercase md:text-6xl">
            {gameTitle}{' '}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '1px white' }}
            >
              / Events
            </span>
          </h1>

          {/* Floating Filter Bar */}
        </div>
        <div
          className="absolute inset-0 z-10 h-full mask-[linear-gradient(to_bottom,black_40%,transparent_100%)] bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `url('https://loremflickr.com/1920/1080/${gameTitle}')`,
          }}
        ></div>
      </header>

      {/* Main Content */}
      <SectionWrapper compact>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <TournamentCardSkeleton key={i} />
            ))}
          </div>
        ) : tournaments.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={`No ${gameTitle} Tournaments Found`}
            description="Try adjusting your filters or check back later."
            onReset={handleResetFilters}
            actionLabel="View All Games"
            actionLink="/games"
          />
        )}
      </SectionWrapper>

      {/* More Games Section */}
      <SectionWrapper compact className="@container">
        <SectionTitle title="Explore Other Games" href="/games" />
        <div className="grid grid-cols-1 gap-4 @[450px]:grid-cols-2 @2xl:grid-cols-3 @6xl:grid-cols-5 @7xl:gap-6">
          {isGamesLoading
            ? [...Array(5)].map((_, i) => <GameCardSkeleton key={i} />)
            : popularGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
        </div>
      </SectionWrapper>
    </>
  );
};

export default GameTournamentsClient;
