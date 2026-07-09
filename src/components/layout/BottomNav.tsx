/**
 * BottomNav.tsx — Mobile-only fixed bottom navigation
 * ─────────────────────────────────────────────────────────────────
 * Visible on mobile screens only (hidden at md: breakpoint).
 * Features a floating center button design for the Home page.
 */

import { Home, Grid2X2, BookOpen, Users, Info } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@lib/utils';

// ─── Navigation items config ──────────────────────────────────────────────────
interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  ariaLabel: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/tutorial',  icon: BookOpen, label: 'Tutorial',  ariaLabel: 'Tutorial'     },
  { to: '/catalog',   icon: Grid2X2,  label: 'Katalog',   ariaLabel: 'Katalog Akun' },
  { to: '/',          icon: Home,     label: 'Home',      ariaLabel: 'Beranda'      },
  { to: '/community', icon: Users,    label: 'Komunitas', ariaLabel: 'Komunitas'    },
  { to: '/about',     icon: Info,     label: 'Tentang',   ariaLabel: 'Tentang'      },
];

// ─── Single nav button ────────────────────────────────────────────────────────
function NavButton({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      aria-label={item.ariaLabel}
      className="relative flex-1 flex items-center justify-center h-full min-w-0 select-none outline-none touch-target"
    >
      {isActive && (
        <motion.div
          layoutId="bottom-nav-active-bg"
          className={cn(
            'absolute -top-5 w-[74px] h-[64px] rounded-[24px]', // wider to accommodate text
            'bg-gradient-to-b from-blue-400 to-blue-600',
            'border-[4px] border-white dark:border-slate-950',
            'shadow-xl dark:shadow-xl'
          )}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}

      <span className={cn(
        'relative z-10 flex flex-col items-center justify-center gap-1 transition-all duration-300',
        isActive ? '-translate-y-4 text-white' : 'translate-y-0 text-slate-400 dark:text-slate-500'
      )}>
        <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "drop-shadow-sm" : ""} />
        <span className={cn(
          'text-[10px] font-bold tracking-wide transition-all duration-300',
          isActive ? 'drop-shadow-sm' : ''
        )}>
          {item.label}
        </span>
      </span>
    </NavLink>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function BottomNav() {
  const { pathname } = useLocation();

  const getIsActive = (to: string) => {
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to);
  };

  return (
    <nav
      aria-label="Navigasi utama mobile"
      className={cn(
        'md:hidden',
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-white dark:bg-slate-950',
        'border-t border-slate-200 dark:border-slate-800',
        'shadow-lg dark:shadow-lg',
        'transition-colors duration-300',
        'pb-safe'
      )}
    >
      <div className="flex items-stretch h-16 max-w-md mx-auto">
        {NAV_ITEMS.map((item) => (
          <NavButton
            key={item.to}
            item={item}
            isActive={getIsActive(item.to)}
          />
        ))}
      </div>
    </nav>
  );
}
