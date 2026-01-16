'use client';

import { useAppSelector } from '@/redux/hooks';
import SectionTitle from '@/components/common/SectionTitle';
import SectionWrapper from '@/components/layout/SectionWrapper';
import ContentCard from '@/components/Cards/ContentCard';

const LatestContent = () => {
  const { allContents } = useAppSelector((state) => state.contents);

  return (
    <SectionWrapper compact>
      <SectionTitle href="/contents" title="Watch Latest Contents" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
        {allContents.map((content) => (
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
