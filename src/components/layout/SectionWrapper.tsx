import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  narrowx?: boolean;
  narrowy?: boolean;
  narrowall?: boolean;
  compact?: boolean;
  className?: string;
}

const SectionWrapper = ({
  children,
  narrowx,
  narrowy,
  narrowall,
  compact,
  className = '',
}: Props) => {
  const basePadding = narrowy
    ? 'px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16'
    : narrowx
      ? 'py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28'
      : narrowall
        ? 'container-wide '
        : compact
          ? 'pt-8 pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16'
          : 'px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20 xl:px-12 xl:py-24 2xl:px-16';

  return (
    <main className={cn(basePadding, 'container-wide', className)}>
      {children}
    </main>
  );
};

export default SectionWrapper;
