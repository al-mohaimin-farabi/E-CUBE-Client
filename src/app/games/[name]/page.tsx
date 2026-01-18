import { notFound } from 'next/navigation';
import { getGames, getTournaments } from '@/lib/data';
import GameTournamentsClient from './GameTournamentsClient';

interface GameTournamentsPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: GameTournamentsPageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  return {
    title: `${decodedName} Tournaments | E-CUBE Esports`,
    description: `Join upcoming ${decodedName} tournaments. Compete for prizes and glory.`,
  };
}

export default async function GameTournamentsPage({
  params,
}: GameTournamentsPageProps) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);

  // Validate game exists (optional but good practice)
  const games = await getGames();
  const game = games.find(
    (g) => g.title.toLowerCase() === decodedName.toLowerCase()
  );

  if (!game) {
    notFound();
  }

  // Fetch relevant tournaments
  const allTournaments = await getTournaments();
  const gameTournaments = allTournaments.filter(
    (t) => t.game.toLowerCase() === decodedName.toLowerCase()
  );

  return (
    <GameTournamentsClient
      gameTitle={game.title}
      tournaments={gameTournaments}
      gameImage={game.image}
    />
  );
}
