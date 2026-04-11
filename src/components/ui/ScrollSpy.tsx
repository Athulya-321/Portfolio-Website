'use client';

import { useEffect } from 'react';

export function ScrollSpy() {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is roughly in the middle
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            // Update URL hash without jumping or adding to history
            window.history.replaceState(null, '', `#${id}`);
            
            // Dispatch a custom event for other components (like Navbar) if needed
            window.dispatchEvent(new CustomEvent('sectionChange', { detail: id }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return null; // This component doesn't render anything
}
