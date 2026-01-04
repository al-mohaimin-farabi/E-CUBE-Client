'use client';

import { useEffect } from 'react';

/**
 * This component observes the DOM for elements with the class 'debug-width'.
 * It strictly updates a data-attribute for CSS to display.
 * Development only.
 */
export const DebugWidthManager = () => {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    const updateAttribute = (target: Element) => {
      const width = target.clientWidth;
      // We also track height? User asked for width. I'll include 'w x h' or just 'w'.
      // User request: "inner width".
      // Let's do "123px".
      // Check if value changed to avoid attribute thrashing
      const newVal = `${Math.round(width)}px`;
      if (target.getAttribute('data-debug-width') !== newVal) {
        target.setAttribute('data-debug-width', newVal);
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) return;
        for (const entry of entries) {
          updateAttribute(entry.target);
        }
      });
    });

    // Initial scan and MutationObserver to catch new elements
    const scan = () => {
      const elements = document.querySelectorAll('.debug-width');
      elements.forEach((el) => {
        resizeObserver.observe(el);
        updateAttribute(el); // Initial update
      });
    };

    const mutationObserver = new MutationObserver((mutations) => {
      scan();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });

    scan(); // Run once on mount

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
};
