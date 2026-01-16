'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DebugWidthManager } from '@/components/dev/DebugWidthManager';
import { ReactNode, useState, useRef, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface MainContentProps {
  children: ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Reset scroll on route change
  useEffect(() => {
    // Use requestAnimationFrame to ensure the DOM is updated and layout is settled
    const rafId = requestAnimationFrame(() => {
      if (viewportRef.current) {
        viewportRef.current.scrollTop = 0;
      }
      lastScrollY.current = 0;
      setIsNavbarVisible(true);
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  const handleScrollChange = useCallback((scrollTop: number) => {
    // Always visible at the top of the page
    if (scrollTop <= 50) {
      setIsNavbarVisible(true);
      lastScrollY.current = scrollTop;
      return;
    }

    // Hide on scroll down, Show on scroll up
    if (scrollTop > lastScrollY.current) {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true);
    }

    lastScrollY.current = scrollTop;
  }, []);

  return (
    <ScrollArea
      className="relative z-[99999999999999999999999999999999999999999] h-screen w-full"
      onScrollChange={handleScrollChange}
      viewportRef={viewportRef}
    >
      <DebugWidthManager />
      <Navbar isVisible={isNavbarVisible} />
      <main className="min-h-screen pt-16 lg:pt-0">{children}</main>
      <Footer />
    </ScrollArea>
  );
};
