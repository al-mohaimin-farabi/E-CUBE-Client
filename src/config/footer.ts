import { navItems } from './nav-items';

const games = navItems.find((item) => item.label === 'GAMES')?.subItems || [];

export interface FooterLink {
  label: string;
  href?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: 'Main Menu',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Tournaments', href: '/tournaments' },
      { label: 'News & Media', href: '/news' },
      { label: 'Latest News', href: '/latest' },
      { label: 'Community', href: '/community' },
    ],
  },
  {
    title: 'Games',
    links: games.map((g) => ({ label: g.label, href: g.href })),
  },
  {
    title: 'Useful Links',
    links: [
      { label: 'Faqs', href: '/faqs' },
      { label: 'About Us', href: '/about' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'hello@ecube.gg', href: 'mailto:hello@ecube.gg' },
      { label: '+8801760987004', href: 'tel:+8801760987004' },
      {
        label: 'Level- 4, Awal Center, 34 Kamal Ataturk Ave, Dhaka- 1213',
        href: undefined,
      },
    ],
  },
];

export const footerCTA = {
  discordLink: 'https://discord.gg',
  label: 'Join Now',
};
