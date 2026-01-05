import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToTop() {
  const scrollViewport = document.querySelector(
    '[data-radix-scroll-area-viewport], [data-slot="scroll-area-viewport"]'
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
}
