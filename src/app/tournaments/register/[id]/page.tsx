import { TournamentRegisterClient } from './TournamentRegisterClient';
import { getTournaments } from '@/lib/data';
import type { Metadata } from 'next';

interface TournamentRegisterPageProps {
  params: Promise<{ id: string }>;
}

// ISR: Revalidate every 60 seconds to pick up DB changes
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const tournaments = await getTournaments();
  return tournaments.map((tournament) => ({
    id: tournament.id,
  }));
}

export async function generateMetadata({
  params,
}: TournamentRegisterPageProps): Promise<Metadata> {
  const { id } = await params;
  const tournaments = await getTournaments();
  const tournament = tournaments.find((t) => t.id === id);

  if (!tournament) {
    return {
      title: 'Tournament Not Found',
    };
  }

  return {
    title: `Register for ${tournament.title}`,
    description: `Join ${tournament.title} - ${tournament.game} Tournament. Prize Pool: ${tournament.prizePool}.`,
    openGraph: {
      images: [tournament.bannerImage],
    },
  };
}

const TournamentRegisterPage = async ({
  params,
}: TournamentRegisterPageProps) => {
  const { id } = await params;
  const tournaments = await getTournaments();
  const tournament = tournaments.find((t) => t.id === id);

  if (!tournament) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h1 className="text-2xl font-bold">Tournament Not Found</h1>
      </div>
    );
  }

  return <TournamentRegisterClient tournament={tournament} />;
};

export default TournamentRegisterPage;
