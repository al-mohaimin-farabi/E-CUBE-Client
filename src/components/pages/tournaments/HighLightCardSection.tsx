import HighLightCard from '@/components/Cards/HighLightCard';
import SectionWrapper from '@/components/layout/SectionWrapper';

const HighLightCardSection = () => {
  return (
    <SectionWrapper compact>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:gap-6">
        <HighLightCard
          highlightText="PLAY TOURNAMENT,"
          title="BE THE BEST!"
          description="We have built custom community server for our CS:GO players in Bangladesh. "
          buttonText="PLAY NOW "
          href="/"
          imageSrc="/assets/images/cgso_d1.png"
          imageAlt="Warrior Character"
          variant="green"
        />

        {/* Second Image: Green Community Variant */}
        <HighLightCard
          highlightText="CS:GO COMMUNITY"
          title="SERVER BD"
          description="Play regular tournaments with your team. Practice, grind more to be the best team & conqure the top in the leaderbaord."
          buttonText="JOIN TOURNMAENT NOW"
          href="/"
          imageSrc="/assets/images/hlc2.png"
          imageAlt="CS:GO Soldier"
          variant="blue"
        />
      </div>
    </SectionWrapper>
  );
};
export default HighLightCardSection;
