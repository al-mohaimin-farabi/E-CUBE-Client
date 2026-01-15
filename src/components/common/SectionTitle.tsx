import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface SectionTitleProps {
  title: string;
  href?: string;
  linkText?: string;
  className?: string; // For the container
  titleClassName?: string; // For the title text specifically
}

const SectionTitle = ({
  title,
  href,
  linkText = 'View More',
  className,
  titleClassName,
}: SectionTitleProps) => {
  return (
    <div className={cn('flex justify-between gap-1 items-center mb-6', className)}>
      <h2
        className={cn(
          'type-lg leading-none font-semibold tracking-wide text-white capitalize',
          titleClassName
        )}
      >
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="text-primary hover:text-primary/80  flex items-center gap-1 text-sm font-bold capitalize transition-colors"
        >
          {linkText}
          <ChevronRight className="size-4" />
        </Link>
      )}
    </div>
  );
};

export default SectionTitle;
