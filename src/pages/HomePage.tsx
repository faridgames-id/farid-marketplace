/**
 * HomePage — Premium Dashboard / Landing Page
 * ─────────────────────────────────────────────
 * Design: Clean Solid White + Blue Gradient + Framer Motion
 *
 * Sections:
 *   1. Hero — Massive blue gradient text, floating 3D shapes, bento intro
 *   2. Trust Stats — Solid white bento cards, staggered entrance
 *   3. WhatsApp Admin — Clean WA cards
 *   4. Stok Akun Terbaru — Staggered card grid
 *   5. Tentang Kami — Solid white card with blue left-border
 *   6. Testimoni — Staggered grid/scroll
 *   7. Final CTA — Bold blue gradient banner
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, TrendingUp, Shield, Zap, Phone, MessageCircle,
  ArrowRight, Star, CheckCircle, ChevronRight, Users, Trophy, Clock, Check, Handshake,
  Gamepad2, Headphones, Square, Circle, Triangle, X, Minus, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn, isOperationalHours, generateWAUrl, formatRupiah } from '@lib/utils';
import { AccountCard } from '../components/ui/AccountCard';
import { AccountModal } from '../components/ui/AccountModal';
import { useAccountStore } from '../store/useAccountStore';
import { useAnalyticsStore } from '../store/useAnalyticsStore';
import { MOCK_TESTIMONIALS } from '../data/mockTestimonials';
import type { Account } from '../types/account';

// ─── Constants ────────────────────────────────────────────────────────────────
const WA_UTAMA    = '6287814897713';
const WA_CADANGAN = '6285741257176';
const WA_MESSAGE_TEMPLATE = 'Halo Farid Shop Game! 👋 Saya tertarik dengan akun yang dijual. Boleh saya tanya-tanya dulu?';

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp: any = {
  hidden: { opacity: 0, y: 15 },
  show:   { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } },
};

const stagger: any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const staggerFast: any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};

// ─── Floating Shape Component ─────────────────────────────────────────────────
function FloatingShape({ className, style, delay = 0, duration = 4 }: { className: string; style?: React.CSSProperties; delay?: number; duration?: number }) {
  return (
    <motion.div
      className={cn('absolute pointer-events-none', className)}
      style={style}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 4, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// ─── Sub-component: Hero Section ──────────────────────────────────────────────
function HeroSection() {
  const isOpen = isOperationalHours();

  return (
    <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-blue-600 via-blue-800 to-[#0a1a3a] shadow-[0_10px_30px_rgba(0,0,0,0.2)] px-6 py-10 md:px-12 md:py-16 border border-white/10 group">
      
      {/* ── Motif Tema Gaming Interaktif ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Headset di Kiri */}
        <div className="absolute top-0 -left-12 w-56 h-56 md:top-4 md:-left-12 md:w-[360px] md:h-[360px] text-white/5 transition-all duration-[800ms] cubic-bezier(0.4, 0, 0.2, 1) group-hover:text-white/15 group-hover:scale-110 group-hover:translate-x-6 group-hover:translate-y-4 group-hover:rotate-[15deg] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
          <Headphones className="w-full h-full" strokeWidth={1} />
        </div>

        {/* Console (Gamepad) di Kanan (Agak ke bawah) */}
        <div className="absolute -bottom-10 -right-8 w-48 h-48 md:-bottom-24 md:right-[20%] md:w-[350px] md:h-[350px] text-white/5 transition-all duration-[800ms] cubic-bezier(0.4, 0, 0.2, 1) group-hover:text-white/15 group-hover:scale-110 group-hover:-translate-y-8 group-hover:-translate-x-6 group-hover:-rotate-[15deg] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
          <Gamepad2 className="w-full h-full" strokeWidth={1} />
        </div>
        
        {/* Subtle Ambient Glows on Hover */}
        <div className="absolute top-10 left-0 w-[200px] md:w-[300px] aspect-square bg-transparent rounded-full blur-[80px] md:blur-[100px] transition-colors duration-1000 group-hover:bg-blue-300/10" />
        <div className="absolute bottom-0 right-0 md:right-[20%] w-[250px] md:w-[350px] aspect-square bg-transparent rounded-full blur-[80px] md:blur-[100px] transition-colors duration-1000 group-hover:bg-indigo-300/10" />
        
        {/* ── Memphis Geometric Motifs ── */}
        <div className="absolute inset-0 opacity-[0.15] text-white pointer-events-none">
          <Square className="absolute top-8 left-4 md:top-12 md:left-[40%] w-6 h-6 md:w-8 md:h-8 -rotate-12 group-hover:rotate-45 group-hover:scale-110 transition-all duration-700 ease-out" strokeWidth={2} />
          <Circle className="absolute bottom-12 left-6 md:top-1/2 md:left-[20%] w-5 h-5 md:w-6 md:h-6 group-hover:scale-125 transition-all duration-500 ease-out" strokeWidth={2.5} />
          <Triangle className="absolute top-10 right-6 md:top-1/4 md:right-[45%] w-5 h-5 md:w-7 md:h-7 rotate-45 group-hover:rotate-90 group-hover:-translate-y-2 transition-all duration-700 ease-out" strokeWidth={2} />
          <X className="absolute bottom-10 right-8 md:bottom-16 md:right-[35%] w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 group-hover:scale-110 transition-all duration-500 ease-out" strokeWidth={3} />
          <Minus className="hidden md:block absolute top-20 right-[25%] w-6 h-6 -rotate-45 group-hover:rotate-0 transition-all duration-700 ease-out" strokeWidth={3} />
          <Activity className="hidden md:block absolute bottom-1/4 left-[30%] w-8 h-8 rotate-12 group-hover:-translate-x-2 transition-all duration-700 ease-out" strokeWidth={2} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
        {/* ── Left: Identity & CTA ──────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center md:items-start gap-6 md:max-w-lg"
        >
          {/* Status badge */}
          <motion.div variants={fadeUp}>
            <div className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border',
              isOpen
                ? 'bg-green-500/20 border-green-400/30 text-green-300'
                : 'bg-white/10 border-white/20 text-blue-100'
            )}>
              <span className={cn('w-2 h-2 rounded-full', isOpen ? 'bg-green-400 animate-ping' : 'bg-blue-300')} />
              {isOpen ? '🟢 Toko Buka · 09:00 – 20:00 WIB' : '🔴 Toko Tutup'}
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp} className="text-center md:text-left">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight drop-shadow-sm">
              Welcome to{' '}
              <span 
                className="font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-amber-400 bg-[length:200%_auto] animate-shimmer"
                style={{ animationDuration: '4s' }}
              >
                Farid Shop
              </span>{' '}
              <span className="text-white">Game</span>
            </h1>
            <p className="mt-5 text-sm md:text-base text-blue-50/90 leading-relaxed max-w-md font-medium">
              Pusat Jual Beli Akun Game Terpercaya. Transaksi aman, proses kilat,
              harga bersahabat. Lebih dari{' '}
              <strong className="text-yellow-300 font-bold">1.200+ deal</strong>{' '}
              sukses sejak 2021.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
            <Link
              to="/catalog"
              id="hero-cta-catalog"
              className="flex items-center gap-2 text-sm bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 font-bold py-3.5 px-7 rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all active:scale-95 group/btn"
            >
              <Sparkles size={18} className="group-hover/btn:text-amber-500 transition-colors" />
              Lihat Katalog
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/tutorial"
              id="hero-cta-tutorial"
              className="flex items-center gap-2 text-sm bg-black/20 text-white border border-white/20 hover:bg-black/30 font-bold py-3.5 px-7 rounded-2xl transition-all active:scale-95 backdrop-blur-md shadow-sm group/btn2"
            >
              <Shield size={18} className="group-hover/btn2:scale-110 transition-transform" />
              Panduan Aman
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Right: Game Preview Visual ────────────── */}
        <motion.div
          className="flex-1 relative mt-2 md:mt-0 w-full flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Card untuk image poster biar matching rounded ekstrimnya */}
          <div className="relative w-full max-w-[550px] overflow-hidden rounded-[32px] shadow-2xl bg-[#0a1a35] border border-white/10 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-shadow duration-500">
            <img 
              src="/hero-poster.png" 
              alt="Farid Shop Game Banner" 
              style={{ imageRendering: 'auto' }}
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
            />
            {/* Glossy overlay effect over the image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none mix-blend-overlay" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const MARQUEE_ITEMS = [
  { text: 'Amanah 100%',   icon: <Check size={14} className="text-emerald-100" strokeWidth={4} />, gradient: 'from-emerald-500 to-green-700', border: 'border-emerald-400/50' },
  { text: 'Anti Hackback', icon: <Shield size={14} className="text-blue-100" strokeWidth={3} />, gradient: 'from-blue-600 to-indigo-800', border: 'border-blue-400/50' },
  { text: 'Rekber Ready',  icon: <Handshake size={14} className="text-amber-100" strokeWidth={3} />, gradient: 'from-amber-500 to-orange-600', border: 'border-amber-400/50' },
  { text: 'Free Fire',     icon: <span className="text-[10px] font-black text-sky-100">FF</span>, gradient: 'from-sky-500 to-blue-700', border: 'border-sky-400/50' },
  { text: 'Mobile Legends',icon: <span className="text-[10px] font-black text-cyan-100">ML</span>, gradient: 'from-cyan-600 to-blue-900', border: 'border-cyan-400/50' },
  { text: 'Genshin Impact',icon: <span className="text-[10px] font-black text-blue-100">GI</span>, gradient: 'from-[#1d4ed8] to-[#0f172a]', border: 'border-blue-500/50' },
];

function MarqueeBadges() {
  return (
    <div className="w-full overflow-hidden bg-transparent pt-4 pb-2 relative mt-2 mb-10">
      {/* gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-slate-50 dark:from-[#020617] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-slate-50 dark:from-[#020617] to-transparent z-10 pointer-events-none" />
      
      {/* Hardware accelerated wrapper with perfect 50% translation */}
      <div className="flex w-max animate-[marquee-badges_20s_linear_infinite] will-change-transform [transform:translateZ(0)] hover:[animation-play-state:paused]">
        {[...Array(2)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={groupIndex === 1}>
            {MARQUEE_ITEMS.map((item, i) => (
              <div key={i} className={cn(
                "group flex items-center gap-2.5 px-4 py-2 rounded-full border shadow-md whitespace-nowrap bg-gradient-to-br",
                "antialiased [backface-visibility:hidden] hover:scale-105 transition-transform duration-300 cursor-default", // HD rendering
                item.gradient,
                item.border
              )}>
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 backdrop-blur-md shadow-inner border border-white/30 shrink-0 group-hover:rotate-12 transition-transform duration-300">
                   {item.icon}
                </div>
                <span className="text-[14px] font-bold text-white drop-shadow-sm leading-none mt-[1px]">{item.text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sub-component: Trust Stats ───────────────────────────────────────────────
const TRUST_STATS = [
  { icon: Trophy, value: '1.200+', label: 'Transaksi Sukses', gradient: 'from-amber-400 to-orange-500', bg: 'bg-amber-50' },
  { icon: Users,  value: '800+',   label: 'Member Aktif',    gradient: 'from-blue-500 to-blue-700',    bg: 'bg-blue-50'  },
  { icon: Shield, value: '3+ Thn', label: 'Pengalaman',      gradient: 'from-green-500 to-emerald-600', bg: 'bg-green-50' },
  { icon: Clock,  value: '< 5 Mnt',label: 'Proses Transfer', gradient: 'from-purple-500 to-violet-600', bg: 'bg-purple-50' },
];

function TrustStats() {
  return (
    <motion.div
      variants={staggerFast}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '50px' }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3"
    >
      {TRUST_STATS.map(({ icon: Icon, value, label, gradient, bg }) => (
        <motion.div
          key={label}
          variants={fadeUp}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm px-4 py-5 flex flex-col items-center gap-3 text-center"
          whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.08)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
        >
          <div className={cn('w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0', bg)}>
            <Icon size={20} className={`bg-gradient-to-br ${gradient}`}
              style={{ color: 'transparent', background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
            />
            <Icon size={20} className="text-current" style={{
              background: `linear-gradient(135deg, ${gradient.includes('amber') ? '#f59e0b, #f97316' : gradient.includes('blue') ? '#3b82f6, #1d4ed8' : gradient.includes('green') ? '#22c55e, #059669' : '#a855f7, #7c3aed'})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }} />
          </div>
          <p className="text-xl md:text-2xl font-black leading-none text-blue-950 dark:text-white font-display">{value}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight">{label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Simplified TrustStats with Blue Gradients and Dynamic Motion
function TrustStatsSimple() {
  const STATS = [
    { 
      icon: Trophy, value: '1.200+', label: 'Transaksi Sukses', 
      bg: 'from-blue-600 to-blue-900', 
      iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
      iconColor: 'text-white' 
    },
    { 
      icon: Users, value: '800+', label: 'Member Aktif', 
      bg: 'from-sky-500 to-blue-900', 
      iconBg: 'bg-gradient-to-br from-sky-400 to-blue-500',
      iconColor: 'text-white' 
    },
    { 
      icon: Shield, value: '3+ Thn', label: 'Pengalaman', 
      bg: 'from-cyan-600 to-blue-950', 
      iconBg: 'bg-gradient-to-br from-cyan-400 to-teal-500',
      iconColor: 'text-white' 
    },
    { 
      icon: Zap, value: '< 5 Mnt', label: 'Proses Kilat', 
      bg: 'from-[#1d4ed8] to-[#0f172a]', 
      iconBg: 'bg-gradient-to-br from-indigo-500 to-blue-600',
      iconColor: 'text-white' 
    },
  ];

  return (
    <motion.section
      variants={staggerFast}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '50px' }}
      className="flex flex-col gap-4"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-slate-700 flex-shrink-0 shadow-sm">
          <Star size={18} strokeWidth={2.5} className="md:w-5 md:h-5" />
        </div>
        <h2 className="font-display text-base md:text-lg font-black text-blue-950 dark:text-white uppercase tracking-widest">Keunggulan Farid Shop</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {STATS.map(({ icon: Icon, value, label, bg, iconBg, iconColor }, i) => (
        <motion.div
          key={label}
          custom={i}
          variants={{
            hidden: (i) => ({ 
              opacity: 0, 
              y: 60, 
              scale: 0.8, 
              rotate: i % 2 === 0 ? -4 : 4,
              filter: 'blur(8px)' 
            }),
            show: (i) => ({ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              rotate: 0,
              filter: 'blur(0px)',
              transition: { 
                type: 'spring', 
                stiffness: 100, 
                damping: 12,
                mass: 0.8,
                delay: i * 0.1 
              } 
            })
          }}
          className={cn(
            'group relative rounded-[20px] md:rounded-3xl border border-white/10 overflow-hidden',
            'shadow-[0_10px_30px_rgba(15,23,42,0.3)] hover:shadow-[0_15px_40px_rgba(30,58,138,0.5)]',
            'px-4 py-8 md:py-8 min-h-[180px] sm:min-h-[200px] md:min-h-[180px] flex flex-col items-center justify-between gap-4 md:gap-5 text-center cursor-default',
            'transition-all duration-500 ease-out bg-gradient-to-br',
            bg
          )}
          whileHover={{ y: -6, scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 17 } }}
        >
          {/* Decorative Watermark Motif */}
          <Icon className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 text-white/5 -rotate-12 group-hover:text-white/10 group-hover:scale-125 group-hover:-rotate-6 transition-all duration-700 pointer-events-none" />

          {/* Animated Glassy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {/* Floating animated icon container */}
          <div className={cn(
            'relative w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg',
            'border border-white/20',
            'transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-6',
            iconBg, iconColor
          )}>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
            </motion.div>
          </div>
          
          <div className="relative z-10 flex flex-col gap-1 mt-1 transition-transform duration-500 group-hover:translate-y-1">
            <p className="text-xl md:text-3xl font-black leading-none text-white font-display tracking-tight drop-shadow-sm">{value}</p>
            <p className="text-[10px] md:text-xs text-blue-100 font-bold tracking-wide uppercase">{label}</p>
          </div>
        </motion.div>
      ))}
      </div>
    </motion.section>
  );
}

// ─── Sub-component: WhatsApp Admin Cards ──────────────────────────────────────
function WhatsAppSection() {
  const isOpen = isOperationalHours();

  const recordClick = useAnalyticsStore(state => state.recordClick);
  const waCards = [
    { 
      id: 'wa-utama',    
      label: 'Admin Utama',    
      sublabel: 'Respon tercepat', 
      phone: WA_UTAMA,    
      badge: 'Online',  
      badgeClass: 'bg-white/20 border-white/30 text-white',  
      dotClass: 'bg-green-300 shadow-sm animate-pulse',
      priority: true,
      glow: 'rgba(34,197,94,0.3)',
      bg: 'bg-gradient-to-br from-green-600 to-emerald-700',
      borderClass: 'border-green-400 hover:border-green-300'
    },
    { 
      id: 'wa-cadangan', 
      label: 'Admin Cadangan', 
      sublabel: 'Backup contact',  
      phone: WA_CADANGAN, 
      badge: 'Standby', 
      badgeClass: 'bg-white/20 border-white/30 text-white',  
      dotClass: 'bg-amber-300 shadow-sm',
      priority: false,
      glow: 'rgba(245,158,11,0.3)',
      bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
      borderClass: 'border-amber-400 hover:border-amber-300'
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '50px' }}
      variants={stagger}
      className="flex flex-col gap-4"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-slate-700 flex-shrink-0 shadow-sm">
          <Phone size={18} strokeWidth={2.5} className="md:w-5 md:h-5" />
        </div>
        <h2 className="font-display text-base md:text-lg font-black text-blue-950 dark:text-white uppercase tracking-widest">Hubungi Admin</h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {waCards.map((card, i) => {
          const waUrl = generateWAUrl(card.phone, WA_MESSAGE_TEMPLATE);
          return (
            <motion.a
              key={card.id}
              id={card.id}
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => recordClick()}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95, rotateX: 10 },
                show: { opacity: 1, y: 0, scale: 1, rotateX: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
              }}
              className={cn(
                'group relative rounded-[20px] md:rounded-[24px] border border-white/20 overflow-hidden',
                'shadow-[0_10px_30px_rgba(0,0,0,0.1)]',
                'p-4 md:p-5 flex flex-col justify-between transition-all duration-500',
                'min-h-[170px] sm:min-h-[180px] md:min-h-0', // Make taller on mobile
                card.bg
              )}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                boxShadow: `0 25px 50px -12px ${card.glow}`, 
                transition: { type: 'spring', stiffness: 400, damping: 17 } 
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Hubungi ${card.label} via WhatsApp`}
            >
              {/* Subtle background gradient overlay on hover */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                card.priority ? "bg-gradient-to-t from-green-300/20 to-transparent" : "bg-gradient-to-t from-amber-300/20 to-transparent"
              )} />
              
              {/* Glassy Sweep on Hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

              <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-2.5 md:gap-2 relative z-10 mb-3 md:mb-4">
                <div className="relative">
                  {/* Glowing aura behind icon */}
                  <div className={cn(
                    "absolute inset-0 rounded-full opacity-40 group-hover:opacity-80 transition-all duration-500 blur-md group-hover:blur-lg",
                    card.priority ? "bg-green-400" : "bg-amber-400"
                  )} />
                  {/* Icon container */}
                  <div className={cn(
                    "relative w-11 h-11 md:w-12 md:h-12 rounded-[14px] md:rounded-[16px] flex items-center justify-center flex-shrink-0 shadow-lg border border-white/30",
                    "transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                    card.priority ? "bg-gradient-to-br from-[#25D366] to-[#128C7E]" : "bg-gradient-to-br from-amber-400 to-amber-600"
                  )}>
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <MessageCircle size={22} className="text-white md:w-[24px] md:h-[24px]" fill="white" strokeWidth={0} />
                    </motion.div>
                  </div>
                </div>
                
                {/* Badge */}
                <div className={cn('flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border text-[9px] md:text-[10px] font-bold tracking-wide uppercase shadow-sm bg-white/20 backdrop-blur-md w-max', card.badgeClass, 'group-hover:bg-white/30 transition-colors')}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', card.dotClass)} />
                  {card.badge}
                </div>
              </div>

              <div className="relative z-10 flex-1 flex flex-col justify-end">
                <p className="text-[15px] md:text-base font-extrabold text-white leading-tight group-hover:text-white/95 transition-colors tracking-wide">{card.label}</p>
                <p className="text-[10px] md:text-xs text-white/80 mt-1 font-semibold tracking-wide uppercase">{card.sublabel}</p>
              </div>

              <div className="mt-3 md:mt-4 relative z-10">
                <div className={cn(
                  'flex items-center justify-between px-3.5 py-2.5 md:px-4 md:py-3 rounded-[12px] md:rounded-[14px] text-[11px] md:text-xs font-bold transition-all duration-300 border bg-white/10 border-white/20 text-white group-hover:bg-white/20 group-hover:border-white/30 group-hover:shadow-inner'
                )}>
                  <span>Chat Sekarang</span>
                  <div className={cn(
                    "w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                    card.priority ? "text-green-700" : "text-amber-700"
                  )}>
                    <div className="overflow-hidden relative flex items-center justify-center w-3 h-3">
                      <ArrowRight className="w-[12px] h-[12px] absolute transition-all duration-300 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                      <ArrowRight className="w-[12px] h-[12px] absolute transition-all duration-300 translate-x-0 opacity-100 group-hover:translate-x-full group-hover:opacity-0" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      <motion.p variants={fadeUp} className="text-[11px] font-medium text-slate-400 text-center uppercase tracking-wider mt-2">
        Jam operasional: Setiap hari 09:00 – 20:00 WIB
      </motion.p>
    </motion.section>
  );
}

// ─── Sub-component: Tentang Kami ──────────────────────────────────────────────
const ABOUT_FEATURES = [
  { icon: Shield,      text: 'Jaminan keamanan setiap transaksi' },
  { icon: Zap,         text: 'Proses transfer cepat < 5 menit' },
  { icon: CheckCircle, text: 'Ribuan pembeli puas & repeat order' },
  { icon: Star,        text: 'Rating 4.9/5 dari 500+ ulasan' },
];

function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden p-6 md:p-10 lg:p-12 rounded-[40px] bg-gradient-to-br from-blue-600 via-blue-800 to-[#0a1a3a] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] group transition-all duration-500 active:scale-[0.98]"
    >
      {/* ── Memphis Geometric Motifs ── */}
      <div className="absolute inset-0 opacity-[0.15] text-white pointer-events-none">
        <Square className="absolute top-6 left-6 md:top-12 md:left-8 w-6 h-6 md:w-8 md:h-8 -rotate-12 group-hover:rotate-45 group-hover:scale-110 transition-all duration-700 ease-out" strokeWidth={2} />
        <Circle className="absolute bottom-24 left-4 md:top-1/2 md:left-[30%] w-5 h-5 md:w-6 md:h-6 group-hover:scale-125 transition-all duration-500 ease-out" strokeWidth={2.5} />
        <Triangle className="absolute top-20 right-4 md:bottom-12 md:right-[45%] w-5 h-5 md:w-7 md:h-7 rotate-45 group-hover:rotate-90 group-hover:-translate-y-2 transition-all duration-700 ease-out" strokeWidth={2} />
        <X className="absolute bottom-6 right-6 md:bottom-16 md:right-12 w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 group-hover:scale-110 transition-all duration-500 ease-out" strokeWidth={3} />
        <Minus className="hidden md:block absolute top-16 right-[15%] w-6 h-6 -rotate-45 group-hover:rotate-0 transition-all duration-700 ease-out" strokeWidth={3} />
        <Activity className="hidden md:block absolute bottom-1/4 left-[40%] w-8 h-8 rotate-12 group-hover:-translate-x-2 transition-all duration-700 ease-out" strokeWidth={2} />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:gap-12 gap-8">
        {/* Left: Text Content */}
        <div className="md:flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-white/10 text-white shadow-sm border border-white/20 ">
              <Zap size={14} className="animate-[pulse_3s_ease-in-out_infinite]" />
            </div>
            <span className="text-xs font-black text-blue-200 uppercase tracking-widest ">Tentang Kami</span>
          </div>
          
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl xl:text-[54px] font-black text-white leading-[1.2] mb-5 tracking-tight">
            Marketplace Akun Game <br />
            <span 
              className="font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-amber-400 bg-[length:200%_auto] animate-shimmer inline-block mt-1 pb-2"
              style={{ animationDuration: '4s' }}
            >
              Paling Terpercaya
            </span>
          </h2>
          
          <p className="text-[14px] md:text-[15px] text-blue-100/90 leading-relaxed max-w-md">
            Farid Shop Game hadir sejak 2021 sebagai solusi terpercaya untuk jual beli akun game.
            Kami menjamin setiap transaksi berjalan aman, cepat, dan sesuai ekspektasi pembeli.
          </p>
        </div>

        {/* Right: Glassmorphism Feature List */}
        <div className="md:flex-1 flex flex-col gap-3 relative">
          {ABOUT_FEATURES.map(({ icon: Icon, text }, index) => (
            <motion.div 
              key={text} 
              initial={{ opacity: 0, y: 30, scale: 0.95, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 400, damping: 25, delay: index * 0.1 }}
              className="group/item flex items-center gap-4 p-3 md:p-4 rounded-[20px] bg-white/10  border border-white/20 shadow-sm hover:bg-white/20 hover:border-white/30 hover:-translate-y-1 hover:shadow-sm transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-[14px] bg-gradient-to-br from-blue-500 to-blue-700 border border-blue-400/50 flex items-center justify-center flex-shrink-0 shadow-sm group-hover/item:scale-110 transition-transform duration-300">
                <Icon size={18} className="text-white " strokeWidth={2.5} />
              </div>
              <p className="text-[14px] md:text-[15px] text-white font-bold leading-snug ">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ─── Sub-component: Testimonial Card ──────────────────────────────────────────
const AVATAR_GRADIENTS = [
  'from-sky-500 to-blue-700',
  'from-purple-500 to-pink-600',
  'from-green-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-yellow-500 to-orange-600',
  'from-indigo-500 to-purple-600',
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof MOCK_TESTIMONIALS[0]; index: number }) {
  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];

  return (
    <motion.div
      variants={fadeUp}
      className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8 flex flex-col gap-5 flex-shrink-0 w-[300px] md:w-[380px]"
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)', transition: { type: 'spring', stiffness: 400, damping: 25 } }}
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} className={i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
        ))}
      </div>

      {/* Comment */}
      <p className="text-[13px] md:text-[15px] text-slate-600 leading-relaxed flex-1 line-clamp-4 font-medium">
        "{testimonial.comment}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3.5 mt-2">
        <div className={cn('w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br shadow-inner', gradient)}>
          <span className="text-sm font-black text-white tracking-wider">{testimonial.avatar}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-[15px] font-bold text-slate-800 dark:text-slate-100 truncate leading-none">{testimonial.name}</p>
            {testimonial.verified && (
              <CheckCircle size={14} className="text-blue-600 flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{testimonial.game}</p>
        </div>
        {testimonial.badge && (
          <span className="badge badge-blue text-[10px] px-2 py-1 flex-shrink-0 shadow-sm">{testimonial.badge}</span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function HomePage() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const accounts = useAccountStore(state => state.accounts);
  const latestAccounts = accounts
    .filter(acc => acc.status === 'Available')
    .slice(0, 8);

  return (
    <div className="flex flex-col gap-8 md:gap-10">

      {/* 1. HERO ────────────────────────────────────────────── */}
      <HeroSection />

      {/* Marquee Badges */}
      <MarqueeBadges />

      {/* 2. TRUST STATS ────────────────────────────────────── */}
      <TrustStatsSimple />

      {/* 3. WHATSAPP ADMIN ──────────────────────────────────── */}
      <WhatsAppSection />

      {/* 4. STOK AKUN TERBARU ───────────────────────────────── */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-slate-700 flex-shrink-0 shadow-sm">
              <Sparkles size={18} strokeWidth={2.5} className="md:w-5 md:h-5" />
            </div>
            <h2 className="font-display text-base md:text-lg font-black text-blue-950 dark:text-white uppercase tracking-widest">
              Stok Akun Terbaru
            </h2>
          </div>
          <Link
            to="/catalog"
            id="home-see-all-catalog"
            className="flex items-center gap-1 text-xs md:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Lihat Semua
            <ChevronRight size={14} />
          </Link>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '50px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4"
        >
          {latestAccounts.map((account) => (
            <motion.div key={account.id} variants={fadeUp}>
              <AccountCard
                account={account}
                onClick={(acc) => setSelectedAccount(acc)}
              />
            </motion.div>
          ))}
        </motion.div>

        <Link
          to="/catalog"
          className="btn-outline dark:bg-slate-900/50 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-slate-800 dark:hover:border-slate-600 flex items-center justify-center gap-2 text-sm py-3"
        >
          <TrendingUp size={16} />
          Jelajahi Semua Akun
          <ArrowRight size={15} />
        </Link>
      </section>

      {/* 5. TENTANG KAMI ────────────────────────────────────── */}
      <AboutSection />

      {/* 6. TESTIMONI ───────────────────────────────────────── */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl bg-amber-50 dark:bg-slate-800 text-amber-500 border border-amber-100 dark:border-slate-700 flex-shrink-0 shadow-sm">
            <Star size={18} strokeWidth={2.5} className="fill-amber-500 md:w-5 md:h-5" />
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <h2 className="font-display text-base md:text-lg font-black text-blue-950 dark:text-white uppercase tracking-widest">
              Ulasan Pembeli
            </h2>
            <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-[10px] md:text-xs font-bold flex items-center gap-1 shadow-sm">
              ⭐ 4.9/5
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden -mx-4 md:mx-0 w-full flex"
          style={{ 
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', 
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' 
          }}
        >
          <div className="flex w-max animate-[marquee_35s_linear_infinite] will-change-transform [transform:translateZ(0)] hover:[animation-play-state:paused] gap-4 pb-4 pt-2">
            {MOCK_TESTIMONIALS.slice(0, 6).map((testimonial, i) => (
              <TestimonialCard key={testimonial.id + '-1'} testimonial={testimonial} index={i} />
            ))}
            {MOCK_TESTIMONIALS.slice(0, 6).map((testimonial, i) => (
              <TestimonialCard key={testimonial.id + '-2'} testimonial={testimonial} index={i} />
            ))}
          </div>
        </motion.div>

        <div className="text-center">
          <Link
            to="/community"
            id="home-see-all-testimonials"
            className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-1"
          >
            Lihat Semua Testimoni
            <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* 7. FINAL CTA BANNER ────────────────────────────────── */}
      <motion.section
        className="relative overflow-hidden p-8 md:p-14 text-center rounded-[40px] bg-gradient-to-br from-blue-600 via-blue-800 to-[#0a1a3a] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] group"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ duration: 0.5 }}
      >
        {/* ── Memphis Geometric Motifs ── */}
        <div className="absolute inset-0 opacity-[0.15] text-white pointer-events-none">
          <Square className="absolute top-6 left-6 md:top-8 md:left-12 w-6 h-6 md:w-8 md:h-8 -rotate-12 group-hover:rotate-45 group-hover:scale-110 transition-all duration-700 ease-out" strokeWidth={2} />
          <Circle className="absolute bottom-12 left-4 md:top-1/2 md:left-[25%] w-5 h-5 md:w-6 md:h-6 group-hover:scale-125 transition-all duration-500 ease-out" strokeWidth={2.5} />
          <Triangle className="absolute top-8 right-6 md:bottom-10 md:right-[35%] w-5 h-5 md:w-7 md:h-7 rotate-45 group-hover:rotate-90 group-hover:-translate-y-2 transition-all duration-700 ease-out" strokeWidth={2} />
          <X className="absolute bottom-6 right-8 md:bottom-12 md:right-12 w-4 h-4 md:w-5 md:h-5 group-hover:rotate-180 group-hover:scale-110 transition-all duration-500 ease-out" strokeWidth={3} />
          <Minus className="hidden md:block absolute top-12 right-[20%] w-6 h-6 -rotate-45 group-hover:rotate-0 transition-all duration-700 ease-out" strokeWidth={3} />
          <Activity className="hidden md:block absolute bottom-1/3 left-[20%] w-8 h-8 rotate-12 group-hover:-translate-x-2 transition-all duration-700 ease-out" strokeWidth={2} />
        </div>

        {/* Subtle mesh overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)',
        }} />
        <div className="relative z-10 flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-3xl bg-white/20 border border-white/30 flex items-center justify-center">
            <Zap size={28} className="text-white fill-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="font-display text-xl md:text-2xl font-black text-white mb-2">
              Siap Upgrade Akunmu?
            </h2>
            <p className="text-sm text-blue-100 max-w-md mx-auto">
              Temukan akun game impian kamu dari ratusan pilihan premium. Harga terjangkau, kualitas dijamin.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92, rotate: -2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <Link
                to="/catalog"
                onClick={() => useAnalyticsStore.getState().recordClick()}
                id="home-final-cta-catalog"
                className="inline-flex items-center gap-2 text-sm py-3.5 px-8 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                <Sparkles size={18} />
                Cari Akun Sekarang
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92, rotate: 2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <Link
                to="/community"
                id="home-final-cta-community"
                className="inline-flex items-center gap-2 text-sm py-3.5 px-7 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors shadow-lg backdrop-blur-sm"
              >
                <Users size={18} />
                Gabung Komunitas
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── MODAL ─────────────────────────────────────────────── */}
      <AccountModal
        account={selectedAccount}
        isOpen={!!selectedAccount}
        onClose={() => setSelectedAccount(null)}
      />

    </div>
  );
}
