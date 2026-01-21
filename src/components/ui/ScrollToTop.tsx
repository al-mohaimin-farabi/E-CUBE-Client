'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn, scrollToTop } from '@/lib/utils';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let scrollViewport: Element | null = null;

    const handleScroll = (e: Event) => {
      const allowedRange = 300;
      const target = e.target as HTMLDivElement;
      // If target is null, it might be window which doesn't have scrollTop. Fallback to scrollY.
      const scrollTop = target ? target.scrollTop : window.scrollY;

      if (scrollTop > allowedRange) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Small delay to ensure ScrollArea is mounted
    const timeoutId = setTimeout(() => {
      scrollViewport = document.querySelector(
        '[data-radix-scroll-area-viewport], [data-slot="scroll-area-viewport"]'
      );

      if (scrollViewport) {
        scrollViewport.addEventListener('scroll', handleScroll);
      } else {
        window.addEventListener('scroll', handleScroll);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (scrollViewport) {
        scrollViewport.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed right-6 bottom-6 z-[1300]"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10 rounded-[2px] shadow-lg"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
