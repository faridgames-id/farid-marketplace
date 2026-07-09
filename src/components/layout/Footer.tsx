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
    <footer className="relative z-10 w-full bg-slate-950 border-t border-slate-800 mt-12 overflow-hidden">
      {/* ── Background Glow Decorations ───────────────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/10 rounded-full  pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500/10 rounded-full  pointer-events-none" />

      {/* ── Top Section ─────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-9 h-9 rounded-[12px] shadow-sm flex-shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img src="/logo.jpeg" alt="Farid Shop Logo" className="w-full h-full object-cover scale-[1.08]" />
                <div className="absolute inset-0 rounded-[12px] shadow-xl pointer-events-none" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[14px] font-black tracking-wider text-slate-100 uppercase leading-none font-display mb-[1px] flex items-center gap-[3px]">
                  FARID SHOP
                  <BadgeCheck size={14} className="text-slate-950 fill-blue-500 [&>path:nth-child(1)]:stroke-blue-500" strokeWidth={2.5} />
                </span>
                <span className="text-[8px] font-bold text-slate-400 tracking-widest leading-tight uppercase">
                  #1 IN UNIVERSE
                </span>
              </div>
            </Link>
            
            {/* Description */}
            <p className="text-[13px] text-slate-400 leading-relaxed max-w-sm">
              Platform jual beli akun game terpercaya sejak 2021. Kami menjamin transaksi yang aman, proses kilat, dan harga paling bersahabat untuk para gamer sejati.
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-sm">
                <Shield size={12} className="text-green-400" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Trusted 100%</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-sm">
                <Phone size={12} className="text-blue-400" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Fast Respon</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h3 className="text-[11px] font-black text-white uppercase tracking-widest">Navigasi</h3>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[13px] font-medium text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group w-fit"
                  >
                    <ChevronRight size={14} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Game Categories */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h3 className="text-[11px] font-black text-white uppercase tracking-widest">Kategori Game</h3>
            <ul className="flex flex-col gap-2.5">
              {GAME_LINKS.map((game) => (
                <li key={game}>
                  <Link
                    to={`/catalog?game=${encodeURIComponent(game)}`}
                    className="text-[13px] font-medium text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group w-fit"
                  >
                    <ChevronRight size={14} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
                    {game}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="text-[11px] font-black text-white uppercase tracking-widest">Hubungi Kami</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/6287814897713"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Phone size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-slate-200 group-hover:text-white transition-colors leading-tight">WhatsApp</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Chat Admin (Fast Respon)</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <ExternalLink size={12} />
                </div>
              </a>
              
              <a
                href="https://instagram.com/faridshopgame"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Camera size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-bold text-slate-200 group-hover:text-white transition-colors leading-tight">Instagram</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">@faridshopgame</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                  <ExternalLink size={12} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      {/* ── Bottom Bar ───────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] md:text-xs text-slate-500 font-medium text-center sm:text-left">
            &copy; {currentYear} Farid Shop Game. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-slate-500 font-medium bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800/50">
            Dibuat dengan
            <Heart size={12} className="text-red-500 fill-red-500 mx-0.5 animate-pulse" />
            untuk para gamer Indonesia
          </div>
        </div>
      </div>
    </footer>
  );
}
