import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { footerSections, footerCTA } from '@/config/footer';
import { FaDiscord } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" bg-[#0E1113] mt-6">
      {/* Discord Banner */}
      <div className="layout-padding  flex min-h-[50px] items-center justify-center bg-[#657DD2] py-3! text-white sm:py-3!">
        <div className="flex flex-wrap items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <FaDiscord className="h-6 w-6" />
            <span className="text-base font-semibold">
              Join the Esports Community
            </span>
          </div>
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="rounded-sm bg-white/90 text-sm font-semibold! text-[#657DD2] hover:bg-white"
          >
            <a
              href={footerCTA.discordLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {footerCTA.label}
            </a>
          </Button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="layout-padding container-wide @container py-16! text-white">
        <div className="grid grid-cols-1 gap-8 @[1308px]:grid-cols-12">
          <div className="shrink-0 @[1308px]:col-span-2">
            <Link href="/">
              <Image
                src="/assets/navlogo.svg"
                alt="logo"
                width={153}
                height={40}
                className="h-10 w-auto shrink-0 object-contain whitespace-nowrap"
              />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-y-8 @[1308px]:col-span-10 @xs:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                  {section.title}
                </h3>
                <ul
                  className={`flex flex-col text-sm text-gray-400 ${
                    section.title === 'Contact' ? 'gap-4' : 'gap-2'
                  }`}
                >
                  {section.links.map((link) => (
                    <li
                      key={link.label}
                      className={!link.href ? 'leading-relaxed' : ''}
                    >
                      {link.href ? (
                        <Link
                          href={link.href}
                          className={`block ${
                            section.title !== 'Contact' ? 'uppercase' : ''
                          }`}
                        >
                          <span className="hover:text-white">
                            {' '}
                            {link.label}
                          </span>
                        </Link>
                      ) : (
                        <span>{link.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-right text-xs text-gray-500">
          <p className="italic">
            &copy; Copyright{' '}
            <span className="text-primary">E-CUBE Ltd.</span> 2022 All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
