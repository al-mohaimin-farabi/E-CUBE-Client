import SectionWrapper from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/button';

const HomeHero = () => {
  return (
    <div className="relative bg-[url('/assets/images/hero.jpg')] bg-cover bg-center bg-no-repeat">
      <SectionWrapper className="flex h-full flex-col justify-center">
        <div className="relative z-50 space-y-8">
          <h1 className="type-hero leading-tight font-bold text-white">
            DOTA 2 <span className="hidden md:inline">&nbsp;</span>
            <br className="md:hidden" />
            Battleground 2.0
          </h1>
          <p className="type-lg max-w-xl leading-relaxed text-gray-300">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard.
          </p>
          <Button size="xl">Join Now</Button>
        </div>
        <div className="absolute inset-0 bg-linear-to-r to-black/80 from-transparent"></div>
      </SectionWrapper>
    </div>
  );
};

export default HomeHero;
