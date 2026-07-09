/**
 * AppLayout.tsx — Full Responsive Layout Wrapper (Light Theme)
 * ─────────────────────────────────────────────────────────────
 * Mobile  → Native app feel: BottomNav visible
 * Desktop → BottomNav hidden, menu in TopNav
 *
 * Uses AnimatePresence for page-level route transitions.
 */

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TopNav } from './TopNav';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';
import { cn } from '@lib/utils';

interface AppLayoutProps {
  children: ReactNode;
  noPadding?: boolean;
}

// pageVariants removed because exit transitions cause a blank flash on mobile.

export function AppLayout({ children, noPadding = false }: AppLayoutProps) {
  const location = useLocation();

  // Instant scroll to top on route change to prevent smooth-scroll glitches on Android
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    /*
     * Root shell — fills 100% viewport, off-white background (#F8FAFC).
     * Clean, solid — no ambient orbs, no blur, no noise.
     */
    <div className="relative w-full min-h-screen bg-slate-50 dark:bg-slate-950 text-blue-950 dark:text-slate-200 font-sans flex flex-col overflow-x-hidden transition-colors duration-300">

      {/* ── TopNav — sticky, solid white ─────────────────── */}
      <TopNav />

      {/*
       * Main content area with page transition wrapper.
       * Removed AnimatePresence entirely to prevent the blank white screen 
       * crash/flash on Android/mobile when navigating.
       */}
      <motion.main
        id="main-content"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ willChange: 'opacity, transform' }}
        className={cn(
          'relative z-10 flex-1 w-full',
          !noPadding && [
            'max-w-7xl mx-auto',
            'px-4 md:px-6 lg:px-8',
            'pt-4 md:pt-8',
            'pb-24 md:pb-8',
          ]
        )}
      >
        {children}
      </motion.main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <Footer />

      {/* ── BottomNav — only visible on mobile (md:hidden) ── */}
      <BottomNav />
    </div>
  );
}
