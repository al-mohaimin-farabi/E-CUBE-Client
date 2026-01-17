'use client';

import SectionTitle from '@/components/common/SectionTitle';
import SectionWrapper from '@/components/layout/SectionWrapper';
import ContentCard, {
  ContentCardSkeleton,
} from '@/components/Cards/ContentCard';
import { useGetContentsQuery } from '@/redux/features/tournaments/tournamentApi';

const LatestContent = () => {
  const { data: contents = [], isLoading } = useGetContentsQuery();

  return (
    <SectionWrapper compact>
      <SectionTitle href="/contents" title="Watch Latest Contents" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
        {isLoading
          ? [...Array(3)].map((_, i) => <ContentCardSkeleton key={i} />)
          : contents.map((content) => (
              <ContentCard
                key={content.id}
                title={content.title}
                imageSrc={content.image}
                platform={content.platform}
                video={content.video}
              />
            ))}
      </div>
    </SectionWrapper>
  );
};

export default LatestContent;
