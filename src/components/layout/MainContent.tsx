'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DebugWidthManager } from '@/components/dev/DebugWidthManager';
import { ReactNode, useState, useRef, useCallback } from 'react';

interface MainContentProps {
  children: ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);

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
    <ScrollArea className="h-screen w-full" onScrollChange={handleScrollChange}>
      <DebugWidthManager />
      <Navbar isVisible={isNavbarVisible} />
      <div className="pt-16 lg:pt-0">{children}</div>
      <Footer />
    </ScrollArea>
  );
};
