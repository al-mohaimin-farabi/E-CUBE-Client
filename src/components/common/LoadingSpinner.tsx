import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({
  className,
  fullScreen = true,
}: LoadingSpinnerProps) => {
  if (fullScreen) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div
          className={cn(
            'border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent',
            className
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent',
        className
      )}
    />
  );
};

export default LoadingSpinner;
