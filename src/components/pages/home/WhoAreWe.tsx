'use client';

import { Button } from '@/components/ui/button';

const WhoAreWe = () => {
  return (
    <section className="w-full mt-8  mb-16">
      <div className="flex w-full flex-col lg:flex-row">
        {/* Left Side - Primary Color */}
        <div className="bg-primary flex w-full flex-none justify-end py-6 md:py-10 lg:w-1/2 lg:py-12">
          <div className="flex w-full max-w-[960px] flex-col items-start justify-center px-4 pr-0 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="@container flex w-full flex-col items-start text-white md:ml-auto md:pr-8">
              <h2 className="text-left text-xl leading-none font-black tracking-widest uppercase @[300px]:text-4xl @[450px]:text-6xl @[550px]:text-7xl @[750px]:whitespace-nowrap">
                WHO ARE WE?
              </h2>
              <div className="mt-2 flex flex-wrap items-start gap-2 text-white/90 sm:gap-6">
                <span className="type-lg font-bold tracking-wide">#ECUBE</span>
                <span className="type-lg font-bold tracking-wide">
                  #NextBigThing
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Dark Color */}
        <div className="bg-card flex w-full flex-none justify-start py-6 md:py-10 lg:w-1/2 lg:py-12">
          <div className="flex w-full max-w-[960px] flex-col items-start justify-center px-4 pl-6 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="flex w-full max-w-xl flex-col items-start text-left md:pl-8">
              <p className="type-sm leading-loose text-gray-300">
                The company is a leading esports and gaming venture in
                Bangladesh, renowned for hosting esports tournaments.{' '}
                <span className="font-bold text-white">E-CUBE</span> also has
                experience in organising esports tournaments — VALORANT, MLBB,
                CSGO, Clash Royale, DOTA 2 and many more games — for Bangladesh
                Game Community.
              </p>

              <div className="mt-10">
                <Button
                  variant="outline"
                  size={'xl'}
                  className="px-10 py-7 text-sm"
                >
                  More About Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
