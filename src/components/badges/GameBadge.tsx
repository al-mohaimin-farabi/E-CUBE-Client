import { cn } from '@/lib/utils';

interface GameBadgeProps {
  game: string;
  className?: string;
}

const getBadgeColor = (game: string) => {
  const lowerGame = game.toLowerCase();

  if (lowerGame.includes('valorant')) return 'bg-rose-600 text-white';
  if (lowerGame.includes('cs:go') || lowerGame.includes('counter'))
    return 'bg-yellow-600 text-white';
  if (lowerGame.includes('mobile legends') || lowerGame.includes('mlbb'))
    return 'bg-purple-600 text-white';
  if (lowerGame.includes('dota')) return 'bg-red-800 text-white';
  if (lowerGame.includes('league') || lowerGame.includes('lol'))
    return 'bg-blue-600 text-white';
  if (lowerGame.includes('pubg')) return 'bg-orange-600 text-white';
  if (lowerGame.includes('fifa') || lowerGame.includes('football'))
    return 'bg-emerald-600 text-white';
  if (lowerGame.includes('fortnite')) return 'bg-purple-500 text-white';
  if (lowerGame.includes('rocket')) return 'bg-sky-500 text-white';
  if (lowerGame.includes('apex')) return 'bg-red-500 text-white';
  if (lowerGame.includes('call of duty') || lowerGame.includes('cod'))
    return 'bg-neutral-700 text-white';
  if (lowerGame.includes('overwatch')) return 'bg-orange-500 text-white';
  if (lowerGame.includes('clash')) return 'bg-blue-400 text-white';

  return 'bg-secondary text-secondary-foreground';
};

const GameBadge = ({ game, className }: GameBadgeProps) => {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-md',
        getBadgeColor(game),
        className
      )}
    >
      {game}
    </span>
  );
};

export default GameBadge;
