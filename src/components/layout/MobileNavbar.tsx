'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

import { navItems } from '@/config/nav-items';

interface MobileNavbarProps {
  isVisible: boolean;
}

const menuVariants = {
  closed: {
    x: '100%',
  },
  open: {
    x: 0,
  },
};

const itemVariants = {
  closed: { opacity: 0, y: 10 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.05,
      duration: 0.2,
    },
  }),
};

const MobileNavbar = ({ isVisible }: MobileNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();

  const isItemActive = (item: (typeof navItems)[0]) => {
    // 1. Exact match
    if (pathname === item.href) return true;

    // 2. Check sub-items
    if (item.subItems) {
      if (
        item.subItems.some(
          (subItem) =>
            pathname === subItem.href || pathname.startsWith(`${subItem.href}/`)
        )
      ) {
        return true;
      }
    }

    // 3. Prefix match for the parent itself
    if (item.href !== '/' && pathname.startsWith(`${item.href}/`)) {
      return true;
    }

    return false;
  };

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu when navbar hides
  useEffect(() => {
    if (!isVisible) {
      setIsMenuOpen(false);
    }
  }, [isVisible]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setExpandedItem(null);
  };

  const toggleSubMenu = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedItem(null);
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <motion.nav
        animate={{ y: isVisible ? 0 : -64 }}
        transition={{ duration: 0.3 }}
        className="layout-padding bg-card @container fixed top-0 right-0 left-0 z-[9999999999999999] flex h-16 items-center justify-between lg:hidden"
      >
        <Link href="/">
          <Image
            src="/assets/navlogo.svg"
            alt="logo"
            width={120}
            height={40}
            className="h-8 w-auto object-contain @sm:h-10"
          />
        </Link>

        {/* Hamburger Button - Classic 3 lines to X */}
        <button
          onClick={toggleMenu}
          className="hover:bg-accent relative z-50 flex h-10 w-10 items-center justify-center rounded-[2px] text-white transition-colors"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <div
            className={cn(
              'flex flex-col items-center justify-center gap-1.5 transition-transform duration-500 ease-in-out',
              isMenuOpen ? 'rotate-360' : 'rotate-0'
            )}
          >
            <span
              className={cn(
                'h-0.5 w-6 rounded-full bg-current transition-all duration-300',
                isMenuOpen ? 'translate-y-2 rotate-45' : ''
              )}
            />
            <span
              className={cn(
                'h-0.5 w-6 rounded-full bg-current transition-all duration-300',
                isMenuOpen ? 'scale-x-0 opacity-0' : ''
              )}
            />
            <span
              className={cn(
                'h-0.5 w-6 rounded-full bg-current transition-all duration-300',
                isMenuOpen ? '-translate-y-2 -rotate-45' : ''
              )}
            />
          </div>
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-99 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
            />

            {/* Slide-in Menu */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="bg-card fixed top-0 right-0 bottom-0 z-999 w-80 max-w-[85vw] overflow-hidden shadow-2xl lg:hidden"
            >
              {/* Menu Content */}
              <div className="flex h-full flex-col pt-20">
                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto px-4 py-6">
                  <ul className="space-y-1">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.label}
                        custom={index}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                      >
                        {item.hasDropdown ? (
                          <div>
                            {item.isParentClickable ? (
                              <div className="flex w-full items-center justify-between pr-4">
                                <Link
                                  href={item.href}
                                  onClick={closeMenu}
                                  className={cn(
                                    'hover:bg-accent hover:text-primary flex-1 rounded-l-lg px-4 py-3 text-sm font-bold uppercase transition-colors',
                                    isItemActive(item)
                                      ? 'text-primary'
                                      : 'text-white'
                                  )}
                                >
                                  {item.label}
                                </Link>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSubMenu(item.label);
                                  }}
                                  className="hover:text-primary p-2"
                                >
                                  <ChevronDown
                                    className={cn(
                                      'h-4 w-4 transition-transform duration-200',
                                      expandedItem === item.label
                                        ? 'rotate-180'
                                        : ''
                                    )}
                                  />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => toggleSubMenu(item.label)}
                                className={cn(
                                  'hover:bg-accent hover:text-primary flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-bold uppercase transition-colors',
                                  isItemActive(item)
                                    ? 'text-primary'
                                    : 'text-white'
                                )}
                              >
                                {item.label}
                                <ChevronDown
                                  className={cn(
                                    'h-4 w-4 transition-transform duration-200',
                                    expandedItem === item.label
                                      ? 'rotate-180'
                                      : ''
                                  )}
                                />
                              </button>
                            )}
                            <AnimatePresence>
                              {expandedItem === item.label && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden pl-4"
                                >
                                  {item.subItems?.map((subItem) => (
                                    <li key={subItem.label}>
                                      <Link
                                        href={subItem.href}
                                        onClick={closeMenu}
                                        className={cn(
                                          'hover:bg-accent hover:text-primary block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                                          pathname === subItem.href
                                            ? 'bg-accent/50 text-primary'
                                            : 'text-muted-foreground'
                                        )}
                                      >
                                        {subItem.label}
                                      </Link>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className={cn(
                              'hover:bg-accent hover:text-primary block rounded-lg px-4 py-3 text-sm font-bold uppercase transition-colors',
                              isItemActive(item) ? 'text-primary' : 'text-white'
                            )}
                          >
                            {item.label}
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Auth Buttons */}
                <div className="border-border border-t p-4">
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="w-full font-semibold text-white"
                      asChild
                    >
                      <Link href="/login" onClick={closeMenu}>
                        Login
                      </Link>
                    </Button>
                    <Button className="w-full font-semibold text-white" asChild>
                      <Link href="/signup" onClick={closeMenu}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
