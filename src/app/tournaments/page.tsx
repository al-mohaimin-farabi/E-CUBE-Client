import PageHeader from '@/components/common/PageHeader';
import { TournamentFilter } from '@/components/tournaments/TournamentFilter';
import { TournamentList } from '@/components/tournaments/TournamentInfoCard';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

const stats = {
  registrationStatus: true,
  prizePool: '10,000',
  playerJoined: '1,200',
};

const tournaments = () => {
  return (
    <main>
      <PageHeader
        title="Valorant Ulimate Showdown Battleground 1.0 "
        items={stats}
      />
      <div className="layout-padding pt-6!">
        <div className="mx-auto">
          <TournamentFilter />
        </div>
        <div className="mt-6">
          <TournamentList />
        </div>
      </div>
      <ScrollToTop />
    </main>
  );
};

export default tournaments;
