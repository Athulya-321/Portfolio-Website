'use client';

import { ThemeProvider } from 'next-themes';
import { LenisProvider } from './LenisProvider';
import { Preloader } from '../ui/Preloader';
import { LayoutGroup } from 'framer-motion';
import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const titles = ["Hi there! 👋", "Athulya here... 🌸", "Got any ideas? 💡", "Let's connect! ✨"];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % titles.length;
      document.title = titles[index];
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Preloader />
      <LenisProvider>
        <LayoutGroup>
          {children}
        </LayoutGroup>
      </LenisProvider>
    </ThemeProvider>
  );
}
