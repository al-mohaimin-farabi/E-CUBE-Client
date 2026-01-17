import TournamentsClientContent from './TournamentsClientContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Tournaments | E-CUBE Esports',
  description: 'Filter and find tournaments by game, region, and prize pool.',
};

export default function TournamentsPage() {
  return <TournamentsClientContent />;
}
