'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems } from '@/config/nav-items';

const contentVariants = {
  hidden: {
    opacity: 0,
    x: -50,
    filter: 'blur(5px)',
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    x: 50,
    filter: 'blur(5px)',
    transition: {
      duration: 0.2,
    },
  },
};

const DesktopNav = ({ isVisible }: { isVisible: boolean }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<number>(0);
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<
    Map<string, HTMLButtonElement | HTMLAnchorElement>
  >(new Map());
  const pathname = usePathname();

  const isItemActive = (item: (typeof navItems)[0]) => {
    // 1. Exact match
    if (pathname === item.href) return true;

    // 2. Check sub-items (active if any sub-item matches or is a parent of current path)
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

    // 3. Prefix match for the parent itself (e.g. /tournaments -> /tournaments/alltournament)
    // Exclude root '/' to avoid matching everything
    if (item.href !== '/' && pathname.startsWith(`${item.href}/`)) {
      return true;
    }

    return false;
  };

  const activeItem = navItems.find(
    (item) => item.label === activeDropdown && item.hasDropdown
  );

  // Close dropdown when navbar hides
  useEffect(() => {
    if (!isVisible) {
      setActiveDropdown(null);
    }
  }, [isVisible]);

  const handleMouseEnter = (label: string) => {
    const item = navItems.find((i) => i.label === label);
    if (!item?.hasDropdown) return;

    const button = triggerRefs.current.get(label);
    const navContainer = navRef.current;
    if (button && navContainer) {
      const navRect = navContainer.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      setDropdownPosition(buttonRect.left - navRect.left);
    }

    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <div className="hidden h-16 lg:block" /> {/* Spacer for fixed navbar */}
      <motion.nav
        animate={{ y: isVisible ? 0 : -64 }}
        transition={{ duration: 0.3 }}
        className="layout-padding bg-card fixed top-0 right-0 left-0 z-[1000] hidden h-16 lg:block"
      >
        <div className="container-wide flex h-full items-center justify-between">
          <Link href="/">
            <Image
              src="/assets/navlogo.svg"
              alt="logo"
              width={153}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div className="flex h-full items-center gap-16">
            {/* Navigation Menu - Full height container */}
            <div
              ref={navRef}
              className="relative hidden h-full items-center lg:flex"
              onMouseLeave={handleMouseLeave}
            >
              {navItems.map((item) =>
                item.hasDropdown ? (
                  item.isParentClickable ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      ref={(el) => {
                        if (el) triggerRefs.current.set(item.label, el);
                      }}
                      className={cn(
                        'flex h-full cursor-pointer items-center gap-1 px-4 text-sm font-bold uppercase transition-colors',
                        activeDropdown === item.label || isItemActive(item)
                          ? 'text-primary'
                          : 'hover:text-primary text-white'
                      )}
                      onMouseEnter={() => handleMouseEnter(item.label)}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'w-4 transition-transform duration-200',
                          activeDropdown === item.label ? 'rotate-180' : ''
                        )}
                      />
                    </Link>
                  ) : (
                    <button
                      key={item.label}
                      ref={(el) => {
                        if (el) triggerRefs.current.set(item.label, el);
                      }}
                      className={cn(
                        'flex h-full cursor-pointer items-center gap-1 px-4 text-sm font-bold uppercase transition-colors',
                        activeDropdown === item.label || isItemActive(item)
                          ? 'text-primary'
                          : 'hover:text-primary text-white'
                      )}
                      onMouseEnter={() => handleMouseEnter(item.label)}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'w-4 transition-transform duration-200',
                          activeDropdown === item.label ? 'rotate-180' : ''
                        )}
                      />
                    </button>
                  )
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'hover:text-primary flex h-full cursor-pointer items-center px-4 text-sm font-bold uppercase transition-colors',
                      isItemActive(item) ? 'text-primary' : 'text-white'
                    )}
                    onMouseEnter={() => setActiveDropdown(null)}
                  >
                    {item.label}
                  </Link>
                )
              )}

              {/* Dropdown Container */}
              <AnimatePresence mode="popLayout">
                {activeDropdown && activeItem && (
                  <motion.div
                    layout
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
                      layout: {
                        duration: 0.2,
                        type: 'tween',
                        ease: 'easeInOut',
                      },
                    }}
                    className="border-border bg-card absolute top-14 z-50 min-w-52 overflow-hidden rounded-md border p-2 shadow-xl"
                  >
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={activeItem.label}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={contentVariants}
                        className={cn(
                          activeItem.subItems && activeItem.subItems.length > 5
                            ? 'grid grid-cols-2 gap-1'
                            : ''
                        )}
                      >
                        {activeItem.subItems?.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className={cn(
                              'hover:bg-accent hover:text-primary block rounded-sm px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors',
                              pathname === subItem.href
                                ? 'bg-accent/50 text-primary'
                                : 'text-white'
                            )}
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
                asChild
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button className="text-xs font-semibold text-white" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default DesktopNav;
