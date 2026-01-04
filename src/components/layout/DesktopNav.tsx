'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
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
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

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
    <motion.nav
      animate={{ y: isVisible ? 0 : -64 }}
      transition={{ duration: 0.3 }}
      className="layout-padding bg-card sticky top-0 z-50 hidden h-16 lg:block"
    >
      <div className="flex h-full items-center justify-between">
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
                <button
                  key={item.label}
                  ref={(el) => {
                    if (el) triggerRefs.current.set(item.label, el);
                  }}
                  className={cn(
                    'flex h-full cursor-pointer items-center gap-1 px-4 text-sm font-bold uppercase transition-colors',
                    activeDropdown === item.label
                      ? 'text-primary'
                      : 'hover:text-primary text-white'
                  )}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      'transition-transform duration-200',
                      activeDropdown === item.label ? 'rotate-180' : ''
                    )}
                  />
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-primary flex h-full cursor-pointer items-center px-4 text-sm font-bold text-white uppercase transition-colors"
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
                    layout: { duration: 0.2, type: 'tween', ease: 'easeInOut' },
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
                          className="hover:bg-accent hover:text-primary block rounded-sm px-4 py-2.5 text-sm font-medium whitespace-nowrap text-white transition-colors"
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
  );
};

export default DesktopNav;
