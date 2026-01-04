import Image from 'next/image';
import { Clock, Trophy, Users } from 'lucide-react';
import { ReactNode } from 'react';
import GradientWrapper from '@/components/ui/gradient-wrapper';
import { cn } from '@/lib/utils';

export interface PageHeaderItem {
  registrationStatus: boolean;
  prizePool: string;
  playerJoined: string;
}

interface PageHeaderProps {
  title: string;
  items?: PageHeaderItem;
  titleOnly?: boolean;
  className?: string;
  image?: string;
}

const PageHeader = ({
  title,
  items,
  titleOnly,
  className,
  image = '/assets/images/pagetitlebg.png',
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        'border-primary @container relative grid min-h-[200px] w-full items-center border-b lg:min-h-[290px]',
        className
      )}
    >
      <div className="layout-padding-x relative z-10">
        <div className="flex items-center gap-2 @[720px]:px-6">
          <Image
            width={70}
            height={70}
            src="/assets/logo.svg"
            alt="logo"
            className="h-12 w-12 @[720px]:h-[70px] @[720px]:w-[70px]"
          />
          <div className={cn('flex', titleOnly || !items ? 'gap-0' : 'gap-2')}>
            <div className="bg-primary w-[5px] self-stretch" />{' '}
            <div className="space-y-1">
              <h1
                className={cn(
                  'text-base leading-none font-bold text-white uppercase @[440px]:text-xl @[720px]:text-2xl @[1060px]:text-4xl',
                  (titleOnly || !items) &&
                    'bg-linear-to-r from-black/70 to-transparent px-2 py-4'
                )}
              >
                {title}
              </h1>
              {items && !titleOnly && (
                <div className="flex w-[calc(100%+10px)] flex-col flex-wrap gap-2 bg-linear-to-r from-black/70 to-transparent px-2 py-1 @[720px]:flex-row @[720px]:items-center @[720px]:gap-4">
                  {items && (
                    <>
                      {/* Registration Status */}
                      <div className="flex items-center @[720px]:gap-4">
                        <div className="flex items-center gap-2">
                          <GradientWrapper
                            isIcon
                            className="size-4 @[720px]:size-5"
                          >
                            <Clock />
                          </GradientWrapper>
                          <span className="text-xs font-bold text-white @[720px]:text-base">
                            {items.registrationStatus
                              ? 'Registration On Going'
                              : 'Registration Closed'}
                          </span>
                        </div>
                      </div>
                      <div className="bg-primary hidden h-4 w-[2px] @[720px]:block" />
                      {/* Prize Pool */}
                      <div className="flex items-center @[720px]:gap-4">
                        <div className="flex items-center gap-2">
                          <GradientWrapper
                            isIcon
                            className="size-4 @[720px]:size-5"
                          >
                            <Trophy />
                          </GradientWrapper>
                          <span className="text-xs font-bold text-white @[720px]:text-base">
                            {items.prizePool} BDT
                          </span>
                        </div>
                      </div>
                      <div className="bg-primary hidden h-4 w-[2px] @[720px]:block" />
                      {/* Player Joined */}
                      <div className="flex items-center @[720px]:gap-4">
                        <div className="flex items-center gap-2">
                          <GradientWrapper
                            isIcon
                            className="size-4 @[720px]:size-5"
                          >
                            <Users />
                          </GradientWrapper>
                          <span className="text-xs font-bold text-white @[720px]:text-base">
                            {items.playerJoined} Players Joined
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0">
        <Image
          src={image}
          alt="hero-bg"
          fill
          className="w-full object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/70"></div>
    </div>
  );
};

export default PageHeader;
