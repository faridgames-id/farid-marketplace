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

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, Package } from 'lucide-react';
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

  const accounts = useAccountStore(state => state.accounts);

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
        className="relative rounded-[32px] p-6 md:p-8 bg-gradient-to-br from-blue-900 via-[#1e3a8a] to-[#0a1a35] border-t border-white/10 shadow-xl flex flex-col gap-5 mb-2"
      >
        {/* Decorative Orbs */}
        <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <h1 className="font-display text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-sm flex items-center gap-2.5">
            <Package className="w-7 h-7 md:w-8 md:h-8 drop-shadow-sm" strokeWidth={2.5} />
            Katalog Akun
          </h1>
          <p className="text-sm text-blue-100/90 drop-shadow-sm mt-1">
            Temukan akun Free Fire & Mobile Legends terbaik
          </p>
        </div>

        {/* ── Search + Sort row ────────────────────────────────── */}
        <div className="relative z-20 flex gap-2 md:gap-3 w-full">
          {/* Search bar — glassmorphism */}
          <div className={cn(
            'flex items-center gap-2 md:gap-3 px-3 md:px-4 h-12 rounded-2xl flex-1  min-w-0',
            'bg-white/10 border border-white/20',
            'shadow-lg',
            'focus-within:border-white/40 focus-within:bg-white/20 focus-within:shadow-lg',
            'transition-all duration-200'
          )}>
            <Search size={16} className="text-white/70 flex-shrink-0 drop-shadow-sm" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari akun FF / ML..."
              className="w-full min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/60 outline-none drop-shadow-sm"
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
                'shadow-lg',
                'hover:bg-white/20 hover:border-white/30 transition-all duration-200',
                'active:scale-95'
              )}
            >
              <span className="drop-shadow-sm whitespace-nowrap">{activeSort}</span>
              <ChevronDown size={14} className={cn('text-white/70 transition-transform', showSortMenu && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {showSortMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-14 z-50 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg rounded-2xl min-w-[140px] overflow-hidden flex flex-col"
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
                  'flex-shrink-0 px-4 h-9 rounded-full text-xs font-semibold  border',
                  'transition-all duration-200 active:scale-95',
                  isActive
                    ? 'text-blue-900 bg-white border-white/80 shadow-lg'
                    : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:text-white shadow-sm'
                )}
                whileTap={{ scale: 0.94 }}
              >
                {chip}
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
            className="btn-primary text-sm py-2.5 px-6"
          >
            Reset Filter
          </button>
        </motion.div>
      )}

      {/* ── Modal ───────────────────────────────────────────── */}
      <AccountModal
        account={selectedAccount}
        isOpen={!!selectedAccount}
        onClose={() => setSelectedAccount(null)}
      />
    </div>
  );
}
