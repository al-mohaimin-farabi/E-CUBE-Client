import { TournamentRegisterClient } from './TournamentRegisterClient';

interface TournamentRegisterPageProps {
  params: Promise<{ id: string }>;
}

const TournamentRegisterPage = async ({
  params,
}: TournamentRegisterPageProps) => {
  const { id } = await params; 

  return <TournamentRegisterClient tournamentId={id} />;
};

export default TournamentRegisterPage;
