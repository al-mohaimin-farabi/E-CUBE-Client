'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'HOME',
    href: '/',
    hasDropdown: false,
  },
  {
    label: 'TOURNAMENTS',
    href: '/tournaments',
    hasDropdown: false,
  },
  {
    label: 'GAMES',
    href: '/games',
    hasDropdown: true,
    subItems: [
      { label: 'Valorant', href: '/games/valorant' },
      { label: 'League of Legends', href: '/games/lol' },
      { label: 'Counter-Strike 2', href: '/games/cs2' },
    ],
  },
  {
    label: 'PLAY',
    href: '/play',
    hasDropdown: true,
    subItems: [
      { label: 'Matchmaking', href: '/play/matchmaking' },
      { label: 'Scrims', href: '/play/scrims' },
      { label: 'Private Lobbies', href: '/play/private' },
    ],
  },
  {
    label: 'MORE',
    href: '/more',
    hasDropdown: true,
    subItems: [
      { label: 'Leaderboards', href: '/leaderboards' },
      { label: 'News', href: '/news' },
      { label: 'Support', href: '/support' },
    ],
  },
];

const contentVariants = {
  hidden: {
    opacity: 0,
    x: -15,
    filter: 'blur(3px)',
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.18,
    },
  },
  exit: {
    opacity: 0,
    x: 15,
    filter: 'blur(3px)',
    transition: {
      duration: 0.12,
    },
  },
};

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null
  );
  const [dropdownPosition, setDropdownPosition] = React.useState<number>(0);
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);
  const triggerRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const activeItem = navItems.find(
    (item) => item.label === activeDropdown && item.hasDropdown
  );

  const handleMouseEnter = (label: string) => {
    const item = navItems.find((i) => i.label === label);
    if (!item?.hasDropdown) {
      return;
    }

    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    // Calculate position for this trigger
    const button = triggerRefs.current.get(label);
    const navContainer = navRef.current;
    if (button && navContainer) {
      const navRect = navContainer.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      setDropdownPosition(buttonRect.left - navRect.left);
    }

    setActiveDropdown(label);
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    // Add small delay before closing to allow cursor to move to dropdown
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setIsDropdownVisible(false);
    }, 100);
  };

  const handleDropdownMouseEnter = () => {
    // Cancel close timeout when entering dropdown
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    setActiveDropdown(null);
    setIsDropdownVisible(false);
  };

  return (
    <nav className="layout-padding bg-card grid h-16 items-center">
      <div className="flex items-center justify-between">
        <Image
          src="/assets/navlogo.svg"
          alt="logo"
          width={153}
          height={50}
          className="h-8 w-auto object-contain md:h-10"
        />

        <div className="flex items-center gap-16">
          {/* Navigation Menu */}
          <div
            ref={navRef}
            className="relative hidden items-center gap-8 lg:flex"
          >
            {navItems.map((item) =>
              item.hasDropdown ? (
                <button
                  key={item.label}
                  ref={(el) => {
                    if (el) triggerRefs.current.set(item.label, el);
                  }}
                  className={cn(
                    'flex cursor-pointer items-center gap-1 text-sm font-bold uppercase transition-colors',
                    activeDropdown === item.label
                      ? 'text-primary'
                      : 'hover:text-primary text-white'
                  )}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform duration-200',
                      activeDropdown === item.label ? 'rotate-180' : ''
                    )}
                  />
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-primary cursor-pointer text-sm font-bold text-white uppercase transition-colors"
                  onMouseEnter={() => {
                    setActiveDropdown(null);
                    setIsDropdownVisible(false);
                  }}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* Dropdown Container */}
            <AnimatePresence>
              {isDropdownVisible && activeItem && (
                <motion.div
                  initial={{ opacity: 0, x: -15, left: dropdownPosition }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    left: dropdownPosition,
                  }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{
                    opacity: { duration: 0.15 },
                    x: { duration: 0.15 },
                    left: { type: 'spring', stiffness: 500, damping: 35 },
                  }}
                  className="border-border bg-card absolute top-6 z-50 mt-2 min-w-52 overflow-hidden rounded-md border p-2 shadow-xl"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.label}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={contentVariants}
                    >
                      {activeItem.subItems?.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="hover:bg-accent hover:text-primary block rounded-md px-4 py-2.5 text-sm font-medium text-white transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="text-xs font-semibold text-white"
            >
              Login
            </Button>
            <Button className="text-xs font-semibold text-white">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
