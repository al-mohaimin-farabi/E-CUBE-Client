import GamesPageContent from '@/components/pages/games/GamesPageContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Games | E-CUBE Esports',
  description:
    'Explore popular competitive games. Join communities for Valorant, CS:GO, Dota 2, and more.',
};

export default function GamesPage() {
  return <GamesPageContent />;
}
