'use client';

import SectionWrapper from '@/components/layout/SectionWrapper';
import { TournamentFilter } from '@/components/pages/tournaments/TournamentFilter';
import { useAppSelector } from '@/redux/hooks';
import TournamentCard from '@/components/Cards/TournamentCard';
import SectionTitle from '@/components/common/SectionTitle';
import GameCard from '@/components/Cards/GameCard';

const TournamentsPage = () => {
  const { allTournaments } = useAppSelector((state) => state.tournaments);
  const { allGames } = useAppSelector((state) => state.games);

  // Split tournaments to visually break up the page as per design
  // Top section: First 8 tournaments
  // Middle: Popular Games
  // Bottom: Remaining tournaments
  const firstBatch = allTournaments.slice(0, 8);
  const secondBatch = allTournaments.slice(8);

  // Popular games logic (top 5)
  const popularGames = allGames.filter((g) => g.isPopular).slice(0, 5);

  return (
    <>
      {/* Hero / Header Section */}
      <header className="relative flex flex-col items-center justify-center bg-[url('https://loremflickr.com/1920/1080/esports,arena')] mask-[linear-gradient(to_bottom,black_80%,transparent_100%)] bg-cover bg-center bg-no-repeat py-8">
        <div className="absolute inset-0 bg-linear-to-b from-black/60 to-[#0b0e12]"></div>

        <div className="relative z-10 flex w-full max-w-[1400px] flex-col items-center gap-6 px-4">
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
          <div className="w-full">
            <TournamentFilter />
          </div>
        </div>
      </header>

      {/* Main Content: Add margin to clear the floating filter */}
      <SectionWrapper compact>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {firstBatch.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
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
