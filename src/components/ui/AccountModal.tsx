import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, Zap, MessageCircle } from 'lucide-react';
import type { Account } from '../../types/account';
import { formatRupiah, generateWAUrl, isOperationalHours, cn } from '@lib/utils';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

interface AccountModalProps {
  account: Account | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ account, isOpen, onClose }: AccountModalProps) {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isStoreOpen = isOperationalHours();
  const postUrl = window.location.origin + `/catalog?id=${account?.id}`;
  const waMessage = account ? `Halo Admin Farid Shop Game! 👋\n\nSaya tertarik untuk membeli akun ini:\n\n*ID:* ${account.id}\n*Title:* ${account.title}\n*Game:* ${account.game}\n*Harga:* ${formatRupiah(account.price)}\n\n*Link Katalog:*\n${postUrl}\n\nApakah akun ini masih tersedia?` : '';
  const adminPhone = import.meta.env.VITE_WA_MAIN_NUMBER || '6287814897713';
  const waUrl = generateWAUrl(adminPhone, waMessage);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && account && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
          
          {/* ── Backdrop ────────────────────────────────────────────────────────── */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── Modal Content ───────────────────────────────────────────────────── */}
          <motion.div 
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'relative w-full sm:max-w-md md:max-w-lg lg:max-w-2xl bg-white dark:bg-slate-900',
              'rounded-none sm:rounded-3xl border-0 sm:border sm:border-slate-100 dark:sm:border-slate-800 shadow-2xl overflow-hidden',
              'flex flex-col h-[100dvh] sm:h-auto sm:max-h-[85vh]'
            )}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md shadow-sm border border-white/10 flex items-center justify-center text-white/90 hover:text-white transition-all"
              aria-label="Tutup modal"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Scrollable Content Area */}
            <div className="overflow-y-auto overflow-x-hidden flex-1 scrollbar-hide">
              
              {/* Header Image */}
              <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <button type="button" onClick={() => setIsImageViewerOpen(true)} className="block w-full h-full cursor-zoom-in">
                  <img 
                    src={account.image} 
                    alt={account.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="badge bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-lg text-[10px]">
                    {account.game}
                  </span>
                  {account.badge && (
                    <span className="badge badge-blue shadow-lg text-[10px]">
                      {account.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 lg:p-8 flex flex-col gap-6">
                
                {/* Title & Price */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                      ID: {account.id}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                      {account.tier}
                    </span>
                  </div>
                  <h2 className="font-display text-[24px] sm:text-[28px] font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                    {account.title}
                  </h2>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <p className="font-display text-[28px] sm:text-[34px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 drop-shadow-sm">
                      {formatRupiah(account.price)}
                    </p>
                    <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-black uppercase tracking-wider border border-green-200 dark:border-green-500/30">
                      Tersedia
                    </span>
                  </div>
                </div>

                {/* Quick Trust Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/40 border border-emerald-200 dark:border-emerald-700/50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-4px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-4px_8px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-0.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md shadow-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck size={22} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[14px] sm:text-[15px] font-black text-emerald-950 dark:text-emerald-400 leading-tight">100% Aman</p>
                      <p className="text-[11px] font-bold text-emerald-700/80 dark:text-emerald-500/80 mt-0.5 uppercase tracking-wide">Anti Hackback</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 border border-blue-200 dark:border-blue-700/50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-4px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-4px_8px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-0.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] bg-gradient-to-br from-blue-400 to-blue-600 shadow-md shadow-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Zap size={22} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[14px] sm:text-[15px] font-black text-blue-950 dark:text-blue-400 leading-tight">Proses Cepat</p>
                      <p className="text-[11px] font-bold text-blue-700/80 dark:text-blue-500/80 mt-0.5 uppercase tracking-wide">5-10 Menit</p>
                    </div>
                  </div>
                </div>

                {/* Specs Markdown */}
                <div className="flex flex-col p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60 shadow-sm mt-2">
                  <div className="prose prose-slate dark:prose-invert prose-sm sm:prose-base max-w-none 
                    prose-h3:font-display prose-h3:text-[18px] prose-h3:font-black prose-h3:text-slate-900 dark:prose-h3:text-white prose-h3:mb-4 prose-h3:mt-0 prose-h3:pb-3 prose-h3:border-b prose-h3:border-slate-200 dark:prose-h3:border-slate-700
                    prose-a:text-blue-600 dark:prose-a:text-blue-400 
                    prose-strong:text-slate-900 dark:prose-strong:text-white 
                    prose-ul:pl-4 prose-li:my-1.5 prose-li:text-slate-600 dark:prose-li:text-slate-300">
                    <ReactMarkdown>{account.specs}</ReactMarkdown>
                  </div>
                </div>
                
              </div>
            </div>

            {/* ── Fixed Bottom Actions ────────────────────────────────────────────── */}
            <div className="shrink-0 p-4 pb-6 sm:pb-8 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-10">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  import('../../store/useAnalyticsStore').then((module) => {
                    module.useAnalyticsStore.getState().recordClick();
                  });
                }}
                className={cn(
                  'w-full flex items-center justify-center gap-2 py-4 rounded-[20px] text-white font-bold text-[15px]',
                  'transition-all duration-200 active:scale-[0.98]',
                  isStoreOpen 
                    ? [
                        'bg-gradient-to-b from-blue-400 to-blue-600 border border-blue-500/50',
                        'shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.2),0_8px_16px_rgba(37,99,235,0.3)]',
                        'hover:from-blue-500 hover:to-blue-700 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.2),0_10px_20px_rgba(37,99,235,0.4)]'
                      ]
                    : 'bg-slate-700 hover:bg-slate-800 text-white shadow-xl'
                )}
              >
                <MessageCircle size={20} className={isStoreOpen ? 'text-white' : 'text-slate-300'} />
                {isStoreOpen ? 'Beli via WhatsApp' : 'Toko Tutup - Tinggalkan Pesan'}
              </a>
              {!isStoreOpen && (
                <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 mt-3">
                  Toko sedang tutup. Pesan Anda akan dibalas besok saat toko buka (09:00 - 20:00).
                </p>
              )}
            </div>

          </motion.div>
        </div>
      )}
      
      {/* ── Image Viewer Modal ──────────────────────────────────────────────── */}
      {isImageViewerOpen && account && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsImageViewerOpen(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl z-10"
          >
            <button
              onClick={() => setIsImageViewerOpen(false)}
              className="absolute -top-12 right-0 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
            <img 
              src={account.image} 
              alt={account.title} 
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
