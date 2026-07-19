/**
 * CatalogPage — Halaman Katalog Akun Game
 * ─────────────────────────────────────────
 * Design: Clean Solid White + Blue Gradient + Framer Motion
 *
 * Features:
 *   - Solid white search/filter bar
 *   - Filter chips: solid blue active state
 *   - Grid: stagger children + layout animation (cards reshuffle)
 *   - AnimatePresence for filter transitions
 */

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, Package, Triangle, Circle, Square, X, Minus, Activity } from 'lucide-react';
import { cn } from '@lib/utils';
import { AccountCard } from '../components/ui/AccountCard';
import { AccountModal } from '../components/ui/AccountModal';
import { useAccountStore } from '../store/useAccountStore';
import type { Account, GameType } from '../types/account';

// ─── Filter chip config ───────────────────────────────────────────────────────
const GAME_FILTERS = ['Semua', 'Free Fire', 'Mobile Legends'];
const SORT_OPTIONS = ['Terbaru', 'Termurah', 'Termahal', 'Terpopuler'];

const fadeUp: any = {
  hidden: { opacity: 0, y: 15 },
  show:   { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } },
  exit:   { opacity: 0, scale: 0.96, transition: { duration: 0.15 } },
};

export function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [activeSort, setActiveSort] = useState('Terbaru');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const accounts = useAccountStore(state => state.accounts);

  // Auto-open modal if ?id= is in the URL
  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam && accounts.length > 0) {
      const acc = accounts.find(a => a.id === idParam);
      if (acc) {
        setSelectedAccount(acc);
      }
    }
  }, [searchParams, accounts]);

  // ─── Filter & Sort Logic ────────────────────────────────────────────────────
  const filteredAccounts = useMemo(() => {
    let result = accounts.filter(acc => acc.status === 'Available');

    if (activeFilter !== 'Semua') {
      result = result.filter(acc => acc.game === activeFilter as GameType);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(acc =>
        acc.title.toLowerCase().includes(q) ||
        acc.tier.toLowerCase().includes(q) ||
        acc.id.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      switch (activeSort) {
        case 'Termurah': return a.price - b.price;
        case 'Termahal': return b.price - a.price;
        case 'Terbaru':
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

    return result;
  }, [searchQuery, activeFilter, activeSort]);

  return (
    <div className="flex flex-col gap-5">

      {/* ── Premium Catalog Header ─────────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '50px' }}
        className="relative rounded-[40px] p-6 md:p-8 bg-gradient-to-br from-blue-600 via-blue-800 to-[#0a1a3a] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex flex-col gap-5 mb-2 group"
      >
        {/* Decorative Memphis Geometric Motif */}
        <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-2xl" />
          
          {/* Memphis Pattern Container */}
          <div className="absolute inset-0 opacity-[0.25] text-white">
            {/* Top Right Cluster */}
            <Triangle className="absolute top-6 right-4 md:right-20 w-6 h-6 md:w-8 md:h-8 -rotate-12 transition-transform duration-700 ease-out group-hover:rotate-12 group-hover:scale-110 group-hover:-translate-x-2 group-hover:translate-y-2" strokeWidth={2.5} />
            <Circle className="absolute top-16 right-16 md:right-40 w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 ease-out delay-75 group-hover:scale-125 hidden md:block" strokeWidth={3} />
            <Square className="absolute top-8 right-28 md:right-56 w-5 h-5 md:w-6 md:h-6 rotate-12 transition-transform duration-700 ease-out group-hover:rotate-45 hidden md:block" strokeWidth={2.5} />
            <X className="absolute top-24 right-8 md:right-10 w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:scale-110" strokeWidth={3} />
            <Activity className="absolute top-28 right-20 md:right-32 w-8 h-8 md:w-10 md:h-10 rotate-12 transition-transform duration-700 ease-out group-hover:-translate-x-4 hidden md:block" strokeWidth={2} />
            <Minus className="absolute top-10 right-1/2 md:right-8 w-6 h-6 md:w-8 md:h-8 rotate-45 transition-transform duration-500 ease-out group-hover:-translate-y-2" strokeWidth={3} />
            
            {/* Center / Top Left Area */}
            <Circle className="absolute top-8 left-1/4 md:left-1/3 w-2 h-2 md:w-3 md:h-3 fill-current transition-all duration-300 group-hover:scale-150 hidden md:block" />
            <X className="absolute top-20 left-8 md:left-1/4 w-4 h-4 md:w-5 md:h-5 rotate-45 transition-all duration-500 group-hover:rotate-[135deg] hidden md:block" strokeWidth={3} />
            <Triangle className="absolute -top-4 left-12 md:left-40 w-5 h-5 md:w-6 md:h-6 rotate-[60deg] transition-all duration-700 group-hover:translate-x-2 group-hover:translate-y-2" strokeWidth={2.5} />
            
            {/* Bottom Left Cluster */}
            <Square className="absolute bottom-10 left-4 md:left-12 w-6 h-6 md:w-8 md:h-8 -rotate-12 transition-transform duration-700 ease-out group-hover:rotate-12 group-hover:translate-x-2 group-hover:-translate-y-2" strokeWidth={2.5} />
            <Activity className="absolute bottom-6 left-20 md:left-32 w-8 h-8 md:w-10 md:h-10 -rotate-12 transition-transform duration-700 ease-out group-hover:translate-x-4 hidden md:block" strokeWidth={2} />
            <Circle className="absolute bottom-20 left-16 md:left-24 w-3 h-3 md:w-4 md:h-4 transition-transform duration-500 ease-out delay-100 group-hover:scale-125 hidden md:block" strokeWidth={3} />
            <X className="absolute bottom-12 left-4 md:left-4 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:scale-110" strokeWidth={3} />
            <Minus className="absolute bottom-24 left-1/3 md:left-10 w-6 h-6 md:w-8 md:h-8 -rotate-45 transition-transform duration-500 ease-out group-hover:-translate-x-2 hidden md:block" strokeWidth={3} />
            
            {/* Bottom Right Area */}
            <Triangle className="absolute bottom-8 right-20 md:right-1/4 w-5 h-5 md:w-7 md:h-7 rotate-[180deg] transition-all duration-700 group-hover:translate-x-2 group-hover:-translate-y-2 hidden md:block" strokeWidth={2.5} />
            <Circle className="absolute bottom-16 right-12 md:right-1/3 w-2 h-2 md:w-3 md:h-3 fill-current transition-all duration-300 group-hover:scale-150 hidden md:block" />
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="font-display text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3 md:gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-500/40 rounded-full" />
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-[14px] bg-gradient-to-b from-blue-500 to-blue-700 border border-blue-400/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Package className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2.5} />
              </div>
            </motion.div>
            Katalog Akun
          </h1>
          <p className="text-sm text-blue-100/90  mt-1">
            Temukan akun Free Fire & Mobile Legends terbaik
          </p>
        </div>

        {/* ── Search + Sort row ────────────────────────────────── */}
        <div className="relative z-20 flex gap-2 md:gap-3 w-full">
          {/* Search bar — glassmorphism */}
          <div className={cn(
            'flex items-center gap-2 md:gap-3 px-3 md:px-4 h-12 rounded-2xl flex-1  min-w-0',
            'bg-white/10 border border-white/20',
            'shadow-sm',
            'focus-within:border-white/40 focus-within:bg-white/20 focus-within:shadow-sm',
            'transition-all duration-200'
          )}>
            <Search size={16} className="text-white/70 flex-shrink-0 " />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari akun FF / ML..."
              className="w-full min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/60 outline-none "
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-white/70 hover:text-white text-xs font-medium flex-shrink-0"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Sort button — glassmorphism */}
          <div className="relative flex-shrink-0">
            <button
              type="button"
              onClick={() => setShowSortMenu(!showSortMenu)}
              className={cn(
                'flex items-center gap-1.5 md:gap-2 px-3 md:px-4 h-12 rounded-2xl flex-shrink-0 ',
                'bg-white/10 border border-white/20 text-white text-sm font-medium',
                'shadow-sm',
                'hover:bg-white/20 hover:border-white/30 transition-all duration-200',
                'active:scale-95'
              )}
            >
              <span className=" whitespace-nowrap">{activeSort}</span>
              <ChevronDown size={14} className={cn('text-white/70 transition-transform', showSortMenu && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {showSortMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-14 z-50 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm rounded-2xl min-w-[140px] overflow-hidden flex flex-col"
                >
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => { setActiveSort(opt); setShowSortMenu(false); }}
                      className={cn(
                        'w-full text-left px-4 py-2.5 text-sm transition-colors',
                        activeSort === opt
                          ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/80 dark:bg-blue-500/10'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* ── Game filter chips ─────────────────────────────────── */}
        <div className="relative z-10 flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
          {GAME_FILTERS.map((chip) => {
            const isActive = activeFilter === chip;
            return (
              <motion.button
                key={chip}
                type="button"
                onClick={() => setActiveFilter(chip)}
                className={cn(
                  'relative flex-shrink-0 px-4 h-9 rounded-full text-xs font-semibold border-none',
                  'transition-all duration-200 active:scale-95 z-10 overflow-hidden',
                  isActive
                    ? 'text-blue-900 shadow-sm'
                    : 'text-white/80 hover:text-white'
                )}
                whileTap={{ scale: 0.94 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGameFilter"
                    className="absolute inset-0 bg-white rounded-full z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/10 border border-white/20 rounded-full z-0 hover:bg-white/20 transition-colors" />
                )}
                <span className="relative z-10">{chip}</span>
              </motion.button>
            );
          })}
        </div>


      </motion.div>

      {/* ── Results count ─────────────────────────────────────── */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{filteredAccounts.length} akun ditemukan</span>
        {(searchQuery || activeFilter !== 'Semua') && (
          <button
            onClick={() => { setSearchQuery(''); setActiveFilter('Semua'); }}
            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* ── Account grid with Layout animation ───────────────────
          - layout prop enables smooth card position changes on filter
          - AnimatePresence handles exit animation
      ──────────────────────────────────────────────────────── */}
      {filteredAccounts.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredAccounts.map((account, index) => (
              <motion.div
                key={account.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                transition={{ delay: Math.min(index * 0.05, 0.4) }}
              >
                <AccountCard
                  account={account}
                  onClick={(acc) => setSelectedAccount(acc)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
            <Package size={24} className="text-blue-400" />
          </div>
          <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">Tidak ada akun ditemukan</h3>
          <p className="text-sm text-slate-400 mb-4">Coba ubah kata kunci pencarian atau filter game.</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveFilter('Semua'); }}
            className="relative overflow-hidden group text-sm font-bold text-white px-8 py-3 rounded-[20px] bg-gradient-to-br from-blue-500 to-blue-700 border border-blue-400/30 hover:shadow-[0_8px_25px_rgba(59,130,246,0.35)] hover:-translate-y-1 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 mt-2"
          >
            {/* Soft Bubble Motifs */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/20 rounded-full blur-lg group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/20 rounded-full blur-lg group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-700 ease-out pointer-events-none" />
            
            <span className="relative z-10 drop-shadow-sm">Reset Filter</span>
          </button>
        </motion.div>
      )}

      {/* ── Modal ───────────────────────────────────────────── */}
      <AccountModal
        account={selectedAccount}
        isOpen={!!selectedAccount}
        onClose={() => {
          setSelectedAccount(null);
          setSearchParams({});
        }}
      />
    </div>
  );
}
