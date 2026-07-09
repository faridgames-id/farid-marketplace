/**
 * TopNav.tsx — Solid White Responsive Header
 * ──────────────────────────────────────────
 * Mobile  → Logo + Status dot + Search icon
 * Desktop → Logo + Desktop nav links + Status + Search
 *
 * Theme: bg-white, border-b border-slate-200, slate/blue text
 */

import { Search, Zap, Sun, Moon, BadgeCheck, Download, ShieldCheck } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { isOperationalHours } from '@lib/utils';
import { cn } from '@lib/utils';
import { useTheme } from '@lib/theme';
import { InstallModal } from '../ui/InstallModal';
import { AdminLoginModal } from '../ui/AdminLoginModal';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { useState } from 'react';

// ─── Desktop nav link config ──────────────────────────────────────────────────
const DESKTOP_NAV = [
  { to: '/',          label: 'Home'      },
  { to: '/catalog',   label: 'Katalog'   },
  { to: '/tutorial',  label: 'Tutorial'  },
  { to: '/community', label: 'Komunitas' },
  { to: '/about',     label: 'Tentang'   },
];

// ─── Store Status ─────────────────────────────────────────────────────────────
function StoreStatus() {
  const isOpen = isOperationalHours();
  return (
    <div className="flex items-center gap-2" title={isOpen ? 'Toko buka 09:00–20:00' : 'Toko tutup'}>
      <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
        {isOpen && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
        )}
        <span className={cn(
          'relative inline-flex rounded-full h-2.5 w-2.5',
          isOpen ? 'bg-green-500 shadow-lg' : 'bg-slate-300 dark:bg-slate-600'
        )} />
      </span>
      <span className={cn('text-xs font-semibold leading-none', isOpen ? 'text-green-600 dark:text-green-400' : 'text-slate-400 dark:text-slate-500')}>
        {isOpen ? (
          <>
            <span className="hidden sm:inline">Buka · </span>
            09:00–20:00
          </>
        ) : 'Tutup'}
      </span>
    </div>
  );
}

// ─── Desktop Nav Links ────────────────────────────────────────────────────────
function DesktopNav() {
  return (
    <nav aria-label="Navigasi desktop" className="hidden md:flex items-center gap-0.5">
      {DESKTOP_NAV.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => cn(
            'relative px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200',
            isActive
              ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800'
          )}
        >
          {({ isActive }) => (
            <>
              {label}
              {isActive && (
                <span className="absolute bottom-1 left-1/4 right-1/4 h-0.5 rounded-full bg-blue-600 dark:bg-blue-500" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function TopNav() {
  const { theme, toggleTheme } = useTheme();
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const { isInstalled } = usePWAInstall();

  return (
    <>
    <header className={cn(
      'sticky top-0 z-50 w-full',
      'bg-white/95 dark:bg-slate-950/95 ',
      'border-b border-slate-200 dark:border-slate-800',
      'shadow-lg dark:shadow-none transition-colors duration-300'
    )}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* ── Left: Logo ──────────────────────────────────── */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group active:scale-95 transition-transform duration-150 flex-shrink-0"
          aria-label="Farid Shop Game — Beranda"
        >
          {/* Logo icon */}
          <div className="relative w-9 h-9 rounded-[12px] shadow-sm flex-shrink-0 overflow-hidden">
            <img src="/logo.jpeg" alt="Farid Shop Logo" className="w-full h-full object-cover scale-[1.08]" />
            {/* Emboss overlay */}
            <div className="absolute inset-0 rounded-[12px] shadow-xl pointer-events-none" />
          </div>

          {/* Logo text */}
          <div className="flex flex-col leading-none">
            <span className="text-[14px] font-black tracking-wider text-blue-950 dark:text-white uppercase leading-none font-display mb-[1px] flex items-center gap-[3px]">
              FARID SHOP
              <BadgeCheck size={14} className="text-white fill-blue-500 [&>path:nth-child(1)]:stroke-blue-500" strokeWidth={2.5} />
            </span>
            <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 tracking-widest leading-tight uppercase">
              #1 IN UNIVERSE
            </span>
          </div>
        </Link>

        {/* ── Center: Desktop nav ──────────────────────────── */}
        <DesktopNav />

        {/* ── Right: Status, Theme Toggle + Search ─────────── */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden sm:block">
            <StoreStatus />
          </div>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 hidden sm:block" aria-hidden="true" />
          
          {!isInstalled && (
            <button
              onClick={() => setIsInstallOpen(true)}
              className={cn(
                'touch-target w-10 h-10 rounded-xl relative group overflow-hidden',
                'bg-blue-50/80 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50',
                'flex items-center justify-center',
                'active:scale-95 transition-all duration-300',
                'hover:bg-blue-100 hover:border-blue-300 dark:hover:bg-blue-800/40 dark:hover:border-blue-700/60',
                'hover:shadow-lg dark:hover:shadow-lg'
              )}
              aria-label="Download App"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-blue-400/10 to-transparent pointer-events-none" />
              <Download size={18} className="text-blue-600 dark:text-blue-400 relative z-10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" strokeWidth={2.5} />
            </button>
          )}

          <button
            onClick={toggleTheme}
            className={cn(
              'touch-target w-10 h-10 rounded-xl relative group overflow-hidden',
              'bg-slate-50/80 border border-slate-200 dark:bg-slate-900/80 dark:border-slate-800',
              'flex items-center justify-center',
              'active:scale-95 transition-all duration-300',
              'hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-700',
              'hover:shadow-lg dark:hover:shadow-lg'
            )}
            aria-label="Toggle Theme"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-slate-300/20 to-transparent dark:from-slate-700/30 pointer-events-none" />
            {theme === 'light' ? (
              <Moon size={18} className="text-slate-600 relative z-10 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110" strokeWidth={2.5} />
            ) : (
              <Sun size={18} className="text-amber-400 relative z-10 transition-all duration-300 group-hover:rotate-45 group-hover:scale-110" strokeWidth={2.5} />
            )}
          </button>
          
          <button
            onClick={() => setIsAdminLoginOpen(true)}
            className={cn(
              'touch-target w-10 h-10 rounded-xl relative group overflow-hidden',
              'bg-slate-50/80 border border-slate-200 dark:bg-slate-900/80 dark:border-slate-800',
              'flex items-center justify-center',
              'active:scale-95 transition-all duration-300',
              'hover:bg-indigo-50 hover:border-indigo-200 dark:hover:bg-indigo-500/10 dark:hover:border-indigo-500/30',
              'hover:shadow-lg dark:hover:shadow-lg'
            )}
            aria-label="Admin Login"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-indigo-400/10 to-transparent pointer-events-none" />
            <ShieldCheck size={19} className="text-slate-500 dark:text-slate-400 relative z-10 transition-all duration-300 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:scale-110" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
    <InstallModal isOpen={isInstallOpen} onClose={() => setIsInstallOpen(false)} />
    <AdminLoginModal isOpen={isAdminLoginOpen} onClose={() => setIsAdminLoginOpen(false)} />
    </>
  );
}
