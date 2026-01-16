export const navItems = [
  {
    label: 'HOME',
    href: '/',
    hasDropdown: false,
    subItems: undefined,
  },
  {
    label: 'TOURNAMENTS',
    href: '/tournaments',
    hasDropdown: false,
    subItems: undefined,
  },
  {
    label: 'GAMES',
    href: '/games',
    hasDropdown: true,
    subItems: [
      { label: 'Valorant', href: '/games/valorant' },
      { label: 'CS:GO', href: '/games/csgo' },
      { label: 'Mobile Legends', href: '/games/mobile-legends' },
      { label: 'E Football', href: '/games/efootball' },
      { label: 'Clash Royale', href: '/games/clash-royale' },
      { label: 'Dota 2', href: '/games/dota2' },
    ],
  },
  // {
  //   label: 'PLAY',
  //   href: '/play',
  //   hasDropdown: true,
  //   subItems: [
  //     { label: 'Matchmaking', href: '/play/matchmaking' },
  //     { label: 'Scrims', href: '/play/scrims' },
  //     { label: 'Private Lobbies', href: '/play/private' },
  //   ],
  // },
  {
    label: 'SCRIM',
    href: '/scrim',
  },
  {
    label: 'MORE',
    href: '/more',
    hasDropdown: true,
    subItems: [
      // { label: 'Leaderboards', href: '/leaderboards' },
      { label: 'News', href: '/news' },
      { label: 'Support', href: '/support' },
    ],
  },
];
