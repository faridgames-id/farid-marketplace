/**
 * AccountCard.tsx — Solid White Card with Framer Motion hover
 * ─────────────────────────────────────────────────────────────
 * Features:
 *   - Solid white card surface (no glass/)
 *   - Blue gradient accent bar at top
 *   - motion.div with spring-physics hover (y: -5, scale: 1.02)
 *   - Light-mode text (slate-900/slate-500)
 */

import { motion } from 'framer-motion';
import { formatRupiah, cn } from '@lib/utils';
import type { Account } from '../../types/account';
import { Sparkles, Trophy } from 'lucide-react';

interface AccountCardProps {
  account: Account;
  onClick: (account: Account) => void;
}

export function AccountCard({ account, onClick }: AccountCardProps) {
  return (
    <motion.div
      onClick={() => onClick(account)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(account)}
      className={cn(
        'group flex flex-col overflow-hidden cursor-pointer relative h-full',
        'bg-white dark:bg-slate-900 rounded-[20px] border border-slate-200/60 dark:border-slate-800',
        'shadow-lg transition-all duration-500',
      )}
      whileHover={{
        y: -5,
        boxShadow: '0 16px 32px rgba(0,0,0,0.08)',
        transition: { type: 'tween', duration: 0.2, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
    >
      {/* ── Image & Badges ──────────────────────────────────── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={account.image}
          alt={account.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent opacity-80" />
        
        {/* Subtle color overlay on hover */}
        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-start z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg border border-blue-400/30">
            <span className="text-[9px] font-black text-white tracking-widest uppercase drop-shadow-sm">
              {account.game === 'Mobile Legends' ? 'MLBB' : account.game === 'Free Fire' ? 'FF' : account.game}
            </span>
          </div>
        </div>

        {/* Removed Tier Label based on user request */}
      </div>

      <div className="flex flex-row items-center p-3.5 flex-1 gap-3 bg-gradient-to-br from-blue-700 to-blue-900 border-t border-white/20 shadow-xl transition-colors duration-500 relative">
        <h3 className="text-[13px] font-extrabold text-white leading-snug line-clamp-2 flex-1 group-hover:text-blue-100 transition-colors drop-shadow-sm">
          {account.title}
        </h3>

        <div className="w-px h-8 bg-white/30 rounded-full flex-shrink-0" />

        <div className="flex-shrink-0">
          <p className="text-[15px] font-black text-white tracking-tight flex items-baseline gap-1 drop-shadow-sm">
            <span className="text-[10px] text-blue-200 font-bold">Rp</span>
            {account.price.toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
