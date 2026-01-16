import { cn } from '@/lib/utils';

interface GameBadgeProps {
  game: string;
  className?: string;
}

const GameBadge = ({ game, className }: GameBadgeProps) => {
  return (
    <span
      className={cn(
        'bg-destructive text-destructive-foreground rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-md',
        className
      )}
    >
      {game}
    </span>
  );
};

export default GameBadge;
