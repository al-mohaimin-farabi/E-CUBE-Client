import { getTournaments } from '@/lib/data';
import { TournamentDetailView } from '@/components/pages/tournaments/TournamentDetailView';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageHeader from '@/components/common/PageHeader';

interface TournamentDetailPageProps {
  params: Promise<{ id: string }>;
}

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
}: TournamentDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const tournaments = await getTournaments();
  const tournament = tournaments.find((t) => t.id === id);

  if (!tournament) {
    return {
      title: 'Tournament Not Found',
    };
  }

  return {
    title: `${tournament.title} | E-CUBE Esports`,
    description: `Join ${tournament.title} - ${tournament.game} Tournament. Prize Pool: ${tournament.prizePool}.`,
    openGraph: {
      images: [tournament.bannerImage],
    },
  };
}

export default async function TournamentDetailPage({
  params,
}: TournamentDetailPageProps) {
  const { id } = await params;
  const tournaments = await getTournaments();
  const tournament = tournaments.find((t) => t.id === id);

  if (!tournament) {
    notFound();
  }

  return (
    <main className="pb-16">
      <PageHeader
        title={tournament.title}
        image="/assets/images/registerbg.png"
        className="min-h-[150px]! lg:min-h-[180px]!"
        items={{
          registrationStatus: true,
          prizePool: tournament.prizePool.replace('BDT', '').trim(),
          playerJoined: tournament.filledSlots.toString(),
        }}
      />

      <TournamentDetailView tournament={tournament} />
    </main>
  );
}
