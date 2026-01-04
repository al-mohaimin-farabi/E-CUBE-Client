'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollViewport = document.querySelector(
      '[data-radix-scroll-area-viewport]'
    );

    const handleScroll = (e: Event) => {
      const allowedRange = 300;
      const target = e.target as HTMLDivElement;
      // If target is null, it might be window
      const scrollTop = target ? target.scrollTop : window.scrollY;

      if (scrollTop > allowedRange) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (scrollViewport) {
      scrollViewport.addEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollViewport) {
        scrollViewport.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    const scrollViewport = document.querySelector(
      '[data-radix-scroll-area-viewport]'
    );
    if (scrollViewport) {
      scrollViewport.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed right-6 bottom-6 z-50"
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
