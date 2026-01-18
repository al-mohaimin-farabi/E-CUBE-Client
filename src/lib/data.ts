export interface Tournament {
  id: string;
  title: string;
  country: string[];
  location: string;
  totalSlots: number;
  filledSlots: number;
  registrationStart: string;
  registrationClose: string;
  eventStart: string;
  eventEnd: string;
  featured: boolean;
  game: string;
  platform: 'PC' | 'Mobile' | 'Console' | 'Cross-Platform';
  entryFee: string;
  mode: string;
  prizePool: string;
  bannerImage: string;
  isJoined?: boolean;
}

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: '1',
    title: 'Valorant Ultimate Showdown Battleground 1.0',
    country: ['EU'],
    location: 'Europe',
    totalSlots: 16,
    filledSlots: 3,
    registrationStart: '2022-09-01',
    registrationClose: '2022-10-01',
    eventStart: 'OCT 02, 2022 • 19:00',
    eventEnd: 'OCT 02, 2022 • 23:00',
    featured: true,
    game: 'Valorant',
    platform: 'PC',
    entryFee: 'Free Entry',
    mode: '5v5',
    prizePool: '10,000 BDT',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '2',
    title: 'Valorant Ultimate Showdown Battleground 1.0',
    country: ['EU'],
    location: 'Europe',
    totalSlots: 16,
    filledSlots: 12,
    registrationStart: '2022-09-01',
    registrationClose: '2022-10-01',
    eventStart: 'OCT 02, 2022 • 19:00',
    eventEnd: 'OCT 02, 2022 • 23:00',
    featured: true,
    game: 'Valorant',
    platform: 'PC',
    entryFee: 'Free Entry',
    mode: '5v5',
    prizePool: '10,000 BDT',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '3',
    title: 'Valorant Ultimate Showdown Battleground 1.0',
    country: ['EU'],
    location: 'Europe',
    totalSlots: 16,
    filledSlots: 8,
    registrationStart: '2022-09-01',
    registrationClose: '2022-10-01',
    eventStart: 'OCT 02, 2022 • 19:00',
    eventEnd: 'OCT 02, 2022 • 23:00',
    featured: true,
    game: 'Valorant',
    platform: 'PC',
    entryFee: 'Free Entry',
    mode: '5v5',
    prizePool: '10,000 BDT',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '4',
    title: 'Valorant Ultimate Showdown Battleground 1.0',
    country: ['EU'],
    location: 'Europe',
    totalSlots: 16,
    filledSlots: 15,
    registrationStart: '2022-09-01',
    registrationClose: '2022-10-01',
    eventStart: 'OCT 02, 2022 • 19:00',
    eventEnd: 'OCT 02, 2022 • 23:00',
    featured: true,
    game: 'Valorant',
    platform: 'PC',
    entryFee: 'Free Entry',
    mode: '5v5',
    prizePool: '10,000 BDT',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '5',
    title: 'CS:GO Major Championship 2023',
    country: ['EU', 'US'],
    location: 'Global',
    totalSlots: 32,
    filledSlots: 32,
    registrationStart: '2023-01-01',
    registrationClose: '2023-02-01',
    eventStart: 'MAY 15, 2023 • 14:00',
    eventEnd: 'MAY 20, 2023 • 22:00',
    featured: true,
    game: 'CS:GO',
    platform: 'PC',
    entryFee: '$50',
    mode: '5v5',
    prizePool: '$1,000,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '6',
    title: 'Dota 2 The International Qualifiers',
    country: ['CN', 'EU'],
    location: 'Asia',
    totalSlots: 64,
    filledSlots: 45,
    registrationStart: '2023-06-01',
    registrationClose: '2023-07-01',
    eventStart: 'AUG 10, 2023 • 10:00',
    eventEnd: 'AUG 25, 2023 • 18:00',
    featured: false,
    game: 'Dota 2',
    platform: 'PC',
    entryFee: 'Free Entry',
    mode: '5v5',
    prizePool: '$500,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '7',
    title: 'League of Legends World Championship',
    country: ['KR', 'US'],
    location: 'South Korea',
    totalSlots: 16,
    filledSlots: 16,
    registrationStart: '2023-09-01',
    registrationClose: '2023-10-01',
    eventStart: 'NOV 05, 2023 • 12:00',
    eventEnd: 'NOV 19, 2023 • 20:00',
    featured: true,
    game: 'League of Legends',
    platform: 'PC',
    entryFee: 'Invite Only',
    mode: '5v5',
    prizePool: '$2,225,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '8',
    title: 'Mobile Legends: Bang Bang SEA Cup',
    country: ['ID', 'PH', 'MY'],
    location: 'Southeast Asia',
    totalSlots: 128,
    filledSlots: 100,
    registrationStart: '2023-03-01',
    registrationClose: '2023-04-01',
    eventStart: 'JUN 10, 2023 • 15:00',
    eventEnd: 'JUN 18, 2023 • 21:00',
    featured: false,
    game: 'Mobile Legends',
    platform: 'Mobile',
    entryFee: 'Free Entry',
    mode: '5v5',
    prizePool: '$300,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '9',
    title: 'Apex Legends Global Series Split 1',
    country: ['US', 'UK'],
    location: 'London',
    totalSlots: 40,
    filledSlots: 38,
    registrationStart: '2023-01-15',
    registrationClose: '2023-02-01',
    eventStart: 'FEB 02, 2023 • 16:00',
    eventEnd: 'FEB 05, 2023 • 20:00',
    featured: true,
    game: 'Apex Legends',
    platform: 'PC',
    entryFee: 'Free Entry',
    mode: 'Battle Royale',
    prizePool: '$500,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '10',
    title: 'Fortnite FNCS Chapter 4 Season 1',
    country: ['Global'],
    location: 'Online',
    totalSlots: 1000,
    filledSlots: 850,
    registrationStart: '2023-02-01',
    registrationClose: '2023-02-15',
    eventStart: 'MAR 01, 2023 • 18:00',
    eventEnd: 'MAR 05, 2023 • 22:00',
    featured: false,
    game: 'Fortnite',
    platform: 'Cross-Platform',
    entryFee: 'Free Entry',
    mode: 'Battle Royale',
    prizePool: '$10,000,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '11',
    title: 'Rocket League Championship Series Winter Major',
    country: ['US'],
    location: 'San Diego',
    totalSlots: 16,
    filledSlots: 16,
    registrationStart: '2023-03-01',
    registrationClose: '2023-03-15',
    eventStart: 'APR 06, 2023 • 13:00',
    eventEnd: 'APR 09, 2023 • 19:00',
    featured: true,
    game: 'Rocket League',
    platform: 'Cross-Platform',
    entryFee: 'Qualification',
    mode: '3v3',
    prizePool: '$310,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '12',
    title: 'Call of Duty League Stage 3 Major',
    country: ['US'],
    location: 'Texas',
    totalSlots: 12,
    filledSlots: 12,
    registrationStart: '2023-02-15',
    registrationClose: '2023-03-01',
    eventStart: 'MAR 09, 2023 • 15:00',
    eventEnd: 'MAR 12, 2023 • 21:00',
    featured: false,
    game: 'Call of Duty',
    platform: 'Console',
    entryFee: 'Pro League',
    mode: '4v4',
    prizePool: '$500,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '13',
    title: 'Overwatch League Midseason Madness',
    country: ['KR', 'US'],
    location: 'Seoul',
    totalSlots: 8,
    filledSlots: 8,
    registrationStart: '2023-05-01',
    registrationClose: '2023-06-01',
    eventStart: 'JUN 16, 2023 • 11:00',
    eventEnd: 'JUN 18, 2023 • 23:00',
    featured: true,
    game: 'Overwatch 2',
    platform: 'PC',
    entryFee: 'Invite Only',
    mode: '5v5',
    prizePool: '$1,000,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
  {
    id: '14',
    title: 'Street Fighter 6 Capcom Cup',
    country: ['JP', 'US'],
    location: 'Global',
    totalSlots: 256,
    filledSlots: 200,
    registrationStart: '2024-01-01',
    registrationClose: '2024-02-01',
    eventStart: 'FEB 14, 2024 • 12:00',
    eventEnd: 'FEB 20, 2024 • 20:00',
    featured: false,
    game: 'Street Fighter 6',
    platform: 'Cross-Platform',
    entryFee: '$10',
    mode: '1v1',
    prizePool: '$2,000,000',
    bannerImage: '/assets/images/TournamentBanner.png',
  },
];

export const MOCK_GAMES: Game[] = [
  {
    id: '1',
    title: 'Valorant',
    tournamentCount: 25,
    image: 'https://loremflickr.com/600/400/valorant',
    platform: 'PC',
    isPopular: true,
  },
  {
    id: '2',
    title: 'Mobile Legends',
    tournamentCount: 12,
    image: 'https://loremflickr.com/600/400/mobilelegends',
    platform: 'Mobile',
    isPopular: true,
  },
  {
    id: '3',
    title: 'CS:GO',
    tournamentCount: 15,
    image: 'https://loremflickr.com/600/400/csgo',
    platform: 'PC',
    isPopular: true,
  },
  {
    id: '4',
    title: 'eFootball 2022',
    tournamentCount: 8,
    image: 'https://loremflickr.com/600/400/fifa',
    platform: 'Console',
    isPopular: true,
  },
  {
    id: '5',
    title: 'Clash Royale',
    tournamentCount: 10,
    image: 'https://loremflickr.com/600/400/clashroyale,game',
    platform: 'Mobile',
    isPopular: true,
  },
  {
    id: '6',
    title: 'Dota 2',
    tournamentCount: 20,
    image: 'https://loremflickr.com/600/400/dota2',
    platform: 'PC',
    isPopular: true,
  },
  {
    id: '7',
    title: 'Apex Legends',
    tournamentCount: 18,
    image: 'https://loremflickr.com/600/400/apexlegends',
    platform: 'Cross-Platform',
    isPopular: true,
  },
  {
    id: '8',
    title: 'League of Legends',
    tournamentCount: 30,
    image: 'https://loremflickr.com/600/400/leagueoflegends',
    platform: 'PC',
    isPopular: true,
  },
  {
    id: '9',
    title: 'PUBG Mobile',
    tournamentCount: 22,
    image: 'https://loremflickr.com/600/400/pubg',
    platform: 'Mobile',
    isPopular: true,
  },
  {
    id: '10',
    title: 'FIFA 23',
    tournamentCount: 14,
    image: 'https://loremflickr.com/600/400/fifa23',
    platform: 'Console',
    isPopular: false,
  },
  {
    id: '11',
    title: 'Fortnite',
    tournamentCount: 16,
    image: 'https://loremflickr.com/600/400/fortnite',
    platform: 'Cross-Platform',
    isPopular: false,
  },
  {
    id: '12',
    title: 'Rocket League',
    tournamentCount: 9,
    image: 'https://loremflickr.com/600/400/rocketleague',
    platform: 'Cross-Platform',
    isPopular: false,
  },
  {
    id: '13',
    title: 'Call of Duty: Warzone',
    tournamentCount: 13,
    image: 'https://loremflickr.com/600/400/codwarzone',
    platform: 'Cross-Platform',
    isPopular: false,
  },
  {
    id: '14',
    title: 'Overwatch 2',
    tournamentCount: 7,
    image: 'https://loremflickr.com/600/400/overwatch',
    platform: 'PC',
    isPopular: false,
  },
  {
    id: '15',
    title: 'Street Fighter 6',
    tournamentCount: 5,
    image: 'https://loremflickr.com/600/400/streetfighter',
    platform: 'Console',
    isPopular: false,
  },
];

export interface Game {
  id: string;
  title: string;
  tournamentCount: number;
  image: string;
  platform?: 'PC' | 'Mobile' | 'Console' | 'Cross-Platform';
  isPopular?: boolean;
}

export interface Content {
  id: number;
  title: string;
  image: string;
  platform: string;
  video: string;
}

export const MOCK_CONTENTS: Content[] = [
  {
    id: 1,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 1',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
    video:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/nzWCs40kRsU?si=3wvr-mBTA1JxilQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 2,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 2',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
    video:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/nzWCs40kRsU?si=3wvr-mBTA1JxilQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 3,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 3',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
    video:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/nzWCs40kRsU?si=3wvr-mBTA1JxilQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 4,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 4',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
    video:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/nzWCs40kRsU?si=3wvr-mBTA1JxilQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 5,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 5',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
    video:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/nzWCs40kRsU?si=3wvr-mBTA1JxilQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 6,
    title: 'XCL, 64Bit, SE, ME, TE, CY, TC, CZ | Group B | Day 3 | Match 5',
    image: '/assets/images/latestcontent.png',
    platform: 'PC',
    video:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/nzWCs40kRsU?si=3wvr-mBTA1JxilQ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
];

// ----------------------------------------------------------------------
// DATA FETCHING UTILITIES
// ----------------------------------------------------------------------
// Currently returning MOCK data for development.
// To go to PRODUCTION, simply replace the return statements below with
// real fetch calls to your API.
// ----------------------------------------------------------------------

export async function getTournaments() {
  // 🟢 REAL BACKEND INTEGRATION EXAMPLE:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tournaments`, {
  //   cache: 'no-store' // Use 'no-store' for dynamic data, or 'force-cache' for static
  // });
  // if (!res.ok) throw new Error('Failed to fetch tournaments');
  // return res.json();

  // 🔴 CURRENT DEV MODE:
  return MOCK_TOURNAMENTS;
}

export async function getGames() {
  // 🟢 REAL BACKEND INTEGRATION EXAMPLE:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`);
  // return res.json();

  return MOCK_GAMES;
}

export async function getContents() {
  // 🟢 REAL BACKEND INTEGRATION EXAMPLE:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contents`);
  // return res.json();

  return MOCK_CONTENTS;
}

export interface TeamMember {
  name: string;
  avatar?: string;
  role?: string;
  isCaptain?: boolean;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  country: string; // ISO code
  group: string;
  members: TeamMember[];
}

export const MOCK_TEAMS: Team[] = Array.from({ length: 16 }).map((_, i) => ({
  id: `team-${i + 1}`,
  name: 'ANGULAR ESPORTS',
  logo: '/assets/logo.svg',
  country: ['BD', 'IN', 'NP', 'PK'][i % 4], // Cycling flags
  group: 'GROUP A',
  members: [
    { name: 'ANESxANIM', isCaptain: true },
    { name: 'ANESxINFECTED' },
    { name: 'ANESxTHEMIS' },
    { name: 'ANESxDARK' },
    { name: 'ANESxANIK' },
    { name: 'ANESxSALMOON' }, // Optional 6th
  ],
}));

export async function getParticipatedTeams() {
  return MOCK_TEAMS;
}
