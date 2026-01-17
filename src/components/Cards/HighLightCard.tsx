import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';

interface GamingBannerProps {
  highlightText: string;
  title: string;
  description: string;
  buttonText: string;

  imageSrc: string;
  imageAlt: string;
  variant?: 'green' | 'blue';
  href: string;
}

const HighLightCard = ({
  highlightText,
  title,
  description,
  buttonText,
  href,
  imageSrc,
  imageAlt,
  variant,
}: GamingBannerProps) => {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-md p-6 xl:p-9">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="pointer-events-none -z-20 object-cover"
        priority
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/60 from-40% to-transparent" />
      <div className="mb-8 flex-1 space-y-4">
        <div className="type-xl font-bold">
          <h4
            className={`bg-clip-text text-transparent ${
              variant === 'blue'
                ? 'from-primary to-primary-dark bg-linear-to-b'
                : 'bg-linear-to-t from-[#11ED41] to-[#61FF8D]'
            }`}
          >
            {highlightText}
          </h4>
          <h4 className="text-white">{title}</h4>
        </div>
        <p className="type-sm text-muted-foreground z-10 max-w-lg">
          {description}
        </p>
      </div>
      <Button
        asChild
        variant={'outline'}
        size={'xl'}
        className="w-fit rounded-sm"
      >
        <Link href={href}>{buttonText}</Link>
      </Button>
    </div>
  );
};
export default HighLightCard;
