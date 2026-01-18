'use client';

import { useState } from 'react';
import { TournamentTabs } from './TournamentTabs';
import { TournamentInfoCard } from './TournamentInfoCard';
import type { Tournament } from '@/redux/features/tournaments/tournamentSlice';
import SectionWrapper from '@/components/layout/SectionWrapper';

// Placeholder Components (will be moved to separate files later)
import { RulebookTab } from '@/components/pages/tournaments/tabs/RulebookTab';
import { ScheduleTab } from '@/components/pages/tournaments/tabs/ScheduleTab';
import { BracketTab } from '@/components/pages/tournaments/tabs/BracketTab';
import { ParticipatedTeamsTab } from './tabs/ParticipatedTeamsTab';

interface TournamentDetailViewProps {
  tournament: Tournament;
}

export const TournamentDetailView = ({
  tournament,
}: TournamentDetailViewProps) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <TournamentInfoCard tournament={tournament} />;
      case 'Rulebook':
        return <RulebookTab tournament={tournament} />;
      case 'Participated Teams':
      case 'Participated Teams':
        return <ParticipatedTeamsTab tournamentId={tournament.id} />;
      case 'Schedule':
        return <ScheduleTab tournament={tournament} />;
      case 'Bracket':
        return <BracketTab tournament={tournament} />;
      default:
        return <TournamentInfoCard tournament={tournament} />;
    }
  };

  return (
    <>
      <div className="mx-auto mt-8 mb-6">
        <TournamentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <SectionWrapper narrowy className="@container mt-6 flex justify-center">
        {renderContent()}
      </SectionWrapper>
    </>
  );
};
