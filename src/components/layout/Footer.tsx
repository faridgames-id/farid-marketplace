/**
 * Footer.tsx — Global footer component
 * Muncul di semua halaman, mengisi bagian bawah layout desktop.
 * Di mobile, posisinya di atas BottomNav.
 */

import { Zap, Heart, Shield, Phone, Camera, ExternalLink, ChevronRight, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@lib/utils';

const QUICK_LINKS = [
  { to: '/',          label: 'Home'      },
  { to: '/catalog',   label: 'Katalog'   },
  { to: '/tutorial',  label: 'Tutorial'  },
  { to: '/community', label: 'Komunitas' },
];

const GAME_LINKS = [
  'Free Fire',
  'Mobile Legends',
  'Valorant',
  'PUBG Mobile',
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-12 overflow-hidden transition-colors duration-300">
      {/* ── Background Glow Decorations ───────────────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 dark:via-blue-500/40 to-transparent" />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-100 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-100 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── Top Section ─────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-9 h-9 rounded-[12px] shadow-sm flex-shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img src="/logo.jpeg" alt="Farid Shop Logo" className="w-full h-full object-cover scale-[1.08]" />
                <div className="absolute inset-0 rounded-[12px] shadow-sm pointer-events-none ring-1 ring-black/5 dark:ring-white/5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[14px] font-black tracking-wider text-slate-900 dark:text-slate-100 uppercase leading-none font-display mb-[1px] flex items-center gap-[3px]">
                  FARID SHOP
                  <BadgeCheck size={14} className="text-white dark:text-slate-950 fill-blue-500 [&>path:nth-child(1)]:stroke-blue-500" strokeWidth={2.5} />
                </span>
                <span className="text-[8px] font-bold text-slate-500 dark:text-slate-400 tracking-widest leading-tight uppercase">
                  #1 IN UNIVERSE
                </span>
              </div>
            </Link>
            
            {/* Description */}
            <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Platform jual beli akun game terpercaya sejak 2021. Kami menjamin transaksi yang aman, proses kilat, dan harga paling bersahabat untuk para gamer sejati.
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <Shield size={12} className="text-green-500 dark:text-green-400" />
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Trusted 100%</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <Phone size={12} className="text-blue-500 dark:text-blue-400" />
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Fast Respon</span>
              </div>
            </div>
          </div>

          {/* Links Group (2 Columns on mobile) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 md:gap-8">
            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Navigasi</h3>
              <ul className="flex flex-col gap-2.5">
                {QUICK_LINKS.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 group w-fit"
                    >
                      <ChevronRight size={14} className="text-slate-400 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Game Categories */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Kategori Game</h3>
              <ul className="flex flex-col gap-2.5">
                {GAME_LINKS.map((game) => (
                  <li key={game}>
                    <Link
                      to={`/catalog?game=${encodeURIComponent(game)}`}
                      className="text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 group w-fit"
                    >
                      <ChevronRight size={14} className="text-slate-400 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
                      {game}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Hubungi Kami</h3>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 sm:gap-3">
              <a
                href="https://wa.me/6287814897713"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 border border-green-400/30 hover:shadow-[0_8px_20px_rgba(34,197,94,0.25)] hover:-translate-y-1 transition-all duration-300 group"
              >
                
                <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Phone size={16} className="text-white drop-shadow-sm sm:w-[18px] sm:h-[18px]" />
                </div>
                <div className="flex-1 relative z-10 overflow-hidden">
                  <p className="text-[12px] sm:text-[13px] font-bold text-white leading-tight drop-shadow-sm truncate">WhatsApp</p>
                  <p className="text-[9px] sm:text-[11px] text-green-50 mt-0.5 opacity-90 group-hover:opacity-100 truncate">Chat Admin (Fast Respon)</p>
                </div>
                <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0 items-center justify-center text-white group-hover:bg-white group-hover:text-green-600 transition-colors hidden sm:flex">
                  <ExternalLink size={10} className="sm:w-3 sm:h-3" />
                </div>
              </a>
              
              <a
                href="https://instagram.com/faridshopgame"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 border border-white/20 hover:shadow-[0_8px_20px_rgba(236,72,153,0.25)] hover:-translate-y-1 transition-all duration-300 group"
              >
                
                <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                  <Camera size={16} className="text-white drop-shadow-sm sm:w-[20px] sm:h-[20px]" />
                </div>
                <div className="flex-1 relative z-10 overflow-hidden">
                  <p className="text-[12px] sm:text-[13px] font-bold text-white leading-tight drop-shadow-sm truncate">Instagram</p>
                  <p className="text-[9px] sm:text-[11px] text-pink-50 mt-0.5 opacity-90 group-hover:opacity-100 truncate">@faridshopgame</p>
                </div>
                <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 backdrop-blur-sm flex-shrink-0 items-center justify-center text-white group-hover:bg-white group-hover:text-pink-600 transition-colors hidden sm:flex">
                  <ExternalLink size={10} className="sm:w-3 sm:h-3" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

      {/* ── Bottom Bar ───────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-500 font-medium text-center sm:text-left">
            &copy; {currentYear} Farid Shop Game. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-slate-600 dark:text-slate-500 font-medium bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800/50">
            Dibuat dengan
            <Heart size={12} className="text-red-500 fill-red-500 mx-0.5 animate-pulse" />
            untuk para gamer Indonesia
          </div>
        </div>
      </div>
    </footer>
  );
}
