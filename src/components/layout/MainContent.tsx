'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DebugWidthManager } from '@/components/dev/DebugWidthManager';
import { ReactNode, useState, useRef } from 'react';

interface MainContentProps {
  children: ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleScrollChange = (scrollTop: number) => {
    const scrollThreshold = 50;

    if (scrollTop < scrollThreshold) {
      setIsNavbarVisible(true);
    } else if (scrollTop > lastScrollY.current) {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true);
    }

    lastScrollY.current = scrollTop;
  };

  return (
    <ScrollArea className="h-screen w-full" onScrollChange={handleScrollChange}>
      <DebugWidthManager />
      <Navbar isVisible={isNavbarVisible} />
      {children}
      <Footer />
    </ScrollArea>
  );
};
