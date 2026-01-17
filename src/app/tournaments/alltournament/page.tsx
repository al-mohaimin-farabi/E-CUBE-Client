'use client';

import SectionWrapper from '@/components/layout/SectionWrapper';
import { TournamentFilter } from '@/components/pages/tournaments/TournamentFilter';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import TournamentCard from '@/components/Cards/TournamentCard';
import SectionTitle from '@/components/common/SectionTitle';
import GameCard from '@/components/Cards/GameCard';
import EmptyState from '@/components/common/EmptyState';
import { setFilters } from '@/redux/features/tournaments/tournamentSlice';

const TournamentsPage = () => {
  const dispatch = useAppDispatch();
  const { filteredTournaments } = useAppSelector((state) => state.tournaments);
  const { allGames } = useAppSelector((state) => state.games);

  // Split tournaments to visually break up the page as per design
  // Top section: First 8 tournaments
  // Middle: Popular Games
  // Bottom: Remaining tournaments
  const firstBatch = filteredTournaments.slice(0, 8);
  const secondBatch = filteredTournaments.slice(8);

  // Popular games logic (top 5)
  const popularGames = allGames.filter((g) => g.isPopular).slice(0, 5);

  const handleResetFilters = () => {
    dispatch(
      setFilters({
        region: 'Region',
        game: 'Game',
        mode: 'Mode',
        platform: 'Platform',
        sortBy: 'Newest',
      })
    );
    // Reload page to clear local state if needed
    window.location.reload();
  };

  return (
    <>
      {/* Hero / Header Section */}
      <header className="relative flex flex-col items-center justify-center pt-8 pb-12">
        <div className="absolute inset-0 z-20 bg-linear-to-t from-transparent to-black/60"></div>

        <div className="relative z-50 flex w-full max-w-[1400px] flex-col items-center gap-6 px-4">
          <h1 className="type-4xl font-khand text-primary text-center font-black tracking-[2px] uppercase md:text-6xl">
            Tournaments{' '}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '1px white' }}
            >
              / Events
            </span>
          </h1>

          {/* Floating Filter Bar */}
          <TournamentFilter />
        </div>
        <div className="absolute inset-0 z-10 bg-[url('https://loremflickr.com/1920/1080/esports,arena')] mask-[linear-gradient(to_bottom,black_40%,transparent_100%)] h-[20vh] bg-cover bg-top bg-no-repeat"></div>
      </header>

      {/* Main Content: Add margin to clear the floating filter */}
      <SectionWrapper compact>
        {filteredTournaments.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {firstBatch.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Tournaments Found"
            description="We couldn't find any tournaments matching your filters. Try adjusting your criteria or checking back later!"
            onReset={handleResetFilters}
            actionLabel="View All Games"
            actionLink="/games"
          />
        )}
      </SectionWrapper>

      {/* 2. Popular Games Interlude */}
      <SectionWrapper compact className="@container">
        <SectionTitle title="Browse Popular Games" href="/games" />
        <div className="grid grid-cols-1 gap-4 @[450px]:grid-cols-2 @2xl:grid-cols-3 @6xl:grid-cols-5 @7xl:gap-6">
          {popularGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </SectionWrapper>

      {/* 3. Remaining Tournaments */}
      {secondBatch.length > 0 && (
        <SectionWrapper compact>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {secondBatch.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        </SectionWrapper>
      )}
    </>
  );
};

export default TournamentsPage;
