import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';
import PlatformBadge from '@/components/badges/PlatformBadge';

interface ContentCardProps {
  title: string;
  imageSrc: string;
  platform?: string;
  video?: string;
  className?: string;
}

const ContentCard = ({
  title,
  imageSrc,
  platform = 'PC',
  video,
  className,
}: ContentCardProps) => {
  return (
    <div
      className={cn(
        'border-border group hover:border-primary relative aspect-video w-full overflow-hidden rounded-md border transition-all',
        className
      )}
    >
      {video ? (
        <div
          className="h-full w-full [&_iframe]:h-full [&_iframe]:w-full"
          dangerouslySetInnerHTML={{ __html: video }}
        />
      ) : (
        <>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="scale-[1.01] object-cover! transition-transform duration-500 group-hover:scale-110"
          />

          {/* Play Button Overlay (Optional, but nice for "Watch") */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg backdrop-blur-sm">
              <Play className="h-5 w-5 fill-current" />
            </div>
          </div>
        </>
      )}

      {/* Platform Badge */}
      <div className="pointer-events-none absolute right-3 bottom-3 z-20">
        <PlatformBadge platform={platform} />
      </div>

      {!video && (
        <>
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 p-4">
            <h3 className="line-clamp-2 text-sm leading-snug font-medium text-gray-200 group-hover:text-white">
              {title}
            </h3>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentCard;
