/**
 * TutorialPage — Tutorial Keamanan Transaksi Akun Game
 * ────────────────────────────────────────────────────────
 * Design: Clean Solid Design (Tipografi kuat & kontras tinggi)
 *
 * Layout (dibagi dua bagian utama):
 *   1. Alur Transaksi Rekber (Kartu linear step-by-step solid)
 *   2. Panduan Amankan Akun / Anti-Hackback (Checklist instruksi ganti email, 2FA, dll)
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, ArrowDown, Wallet, Handshake,
  KeyRound, Mail, Smartphone, MonitorOff, CheckCircle,
  Search, MessageCircle, CreditCard, UserCheck
} from 'lucide-react';
import { cn } from '@lib/utils';

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeUp: any = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } }
};

// ─── Data Cara Beli Akun (Dari Poster) ────────────────────────────────────────
const CARA_BELI_STEPS = [
  {
    title: 'Cari Akun yang Diinginkan',
    desc: 'Jelajahi katalog akun yang tersedia di Instagram atau saluran kami.',
    icon: Search,
    color: 'bg-gradient-to-b from-sky-400 to-sky-500 shadow-xl border border-sky-500/50'
  },
  {
    title: 'Hubungi Admin via WhatsApp',
    desc: 'Tanyakan detail akun, harga, dan ketersediaan kepada admin.',
    icon: MessageCircle,
    color: 'bg-gradient-to-b from-green-400 to-green-500 shadow-xl border border-green-500/50'
  },
  {
    title: 'Negosiasi & Pembayaran',
    desc: 'Sepakati harga & lakukan pembayaran sesuai instruksi metode pembayaran resmi.',
    icon: CreditCard,
    color: 'bg-gradient-to-b from-yellow-400 to-yellow-500 shadow-xl border border-yellow-500/50'
  },
  {
    title: 'Terima Akun & Data Login',
    desc: 'Admin akan mengirimkan data akun beserta penjelasan penggunaan.',
    icon: UserCheck,
    color: 'bg-gradient-to-b from-indigo-400 to-indigo-500 shadow-xl border border-indigo-500/50'
  },
  {
    title: 'Konfirmasi & Garansi Akun',
    desc: 'Login, cek akun, dan nikmati! Kami berikan garansi sesuai ketentuan yang berlaku.',
    icon: ShieldCheck,
    color: 'bg-gradient-to-b from-blue-500 to-blue-600 shadow-xl border border-blue-600/50'
  }
];

// ─── Data Alur Rekber ─────────────────────────────────────────────────────────
const REKBER_STEPS = [
  {
    title: 'Pembeli Transfer Dana ke Admin',
    desc: 'Uang ditransfer ke rekening resmi Farid Shop Game dan akan ditahan dengan aman oleh admin.',
    icon: Wallet,
    color: 'bg-gradient-to-b from-blue-500 to-blue-600 shadow-xl border border-blue-600/50',
    shadow: ''
  },
  {
    title: 'Penjual Serahkan Data Akun',
    desc: 'Setelah dana masuk, penjual menyerahkan data login (email/password) ke admin untuk dicek.',
    icon: KeyRound,
    color: 'bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-xl border border-indigo-600/50',
    shadow: ''
  },
  {
    title: 'Admin Mengecek & Mengamankan',
    desc: 'Admin memeriksa kecocokan spesifikasi akun dan mengubah password sementara agar aman.',
    icon: ShieldCheck,
    color: 'bg-gradient-to-b from-purple-500 to-purple-600 shadow-xl border border-purple-600/50',
    shadow: ''
  },
  {
    title: 'Pembeli Menerima Akun',
    desc: 'Data login diberikan ke pembeli. Pembeli melakukan pengecekan dan mengamankan akun secara permanen.',
    icon: CheckCircle,
    color: 'bg-gradient-to-b from-green-500 to-green-600 shadow-xl border border-green-600/50',
    shadow: ''
  },
  {
    title: 'Dana Diteruskan ke Penjual',
    desc: 'Setelah pembeli mengonfirmasi akun aman, dana baru dicairkan ke rekening penjual oleh admin.',
    icon: Handshake,
    color: 'bg-gradient-to-b from-emerald-500 to-emerald-600 shadow-xl border border-emerald-600/50',
    shadow: ''
  }
];

// ─── Data Checklist Amankan Akun ──────────────────────────────────────────────
const SECURITY_CHECKLIST = [
  {
    id: 'sec-1',
    title: 'Ganti Email Pertama (Primary Email)',
    desc: 'Segera ubah email yang terhubung ke game dengan email baru milikmu yang belum pernah dipakai.',
    icon: Mail,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  {
    id: 'sec-2',
    title: 'Aktivasi 2-Factor Authentication (2FA)',
    desc: 'Aktifkan otentikasi dua faktor menggunakan nomor HP atau aplikasi Authenticator (Google/Authy).',
    icon: Smartphone,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200'
  },
  {
    id: 'sec-3',
    title: 'Ganti Password Kombinasi Kuat',
    desc: 'Gunakan minimal 12 karakter kombinasi huruf besar, kecil, angka, dan simbol unik.',
    icon: KeyRound,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  {
    id: 'sec-4',
    title: 'Unbind Sesi Perangkat Luar',
    desc: 'Masuk ke Device Management di game, log out/hapus semua perangkat yang tidak dikenali.',
    icon: MonitorOff,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200'
  }
];

export function TutorialPage() {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleChecklist = (id: string) => {
    setCompletedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const checklistProgress = Object.values(completedSteps).filter(Boolean).length;
  const isFullySecured = checklistProgress === SECURITY_CHECKLIST.length;

  return (
    <div className="flex flex-col gap-10 pb-10">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-900 via-[#1e3a8a] to-[#0a1a35] border-t border-white/10 rounded-[32px] p-8 md:p-14 text-center text-white shadow-xl relative overflow-hidden"
      >
        {/* Glowing Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/30 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[200px] h-[200px] bg-sky-400/20 rounded-full blur-[60px] pointer-events-none" />
        
        {/* Subtle Grid Pattern with Mask */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
          style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }}
        />
        
        <div className="relative z-10 flex flex-col items-center gap-5">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-500/40 blur-xl rounded-full" />
            <div className="relative w-16 h-16 bg-gradient-to-b from-blue-500 to-blue-700 border border-blue-400/30 rounded-[18px] flex items-center justify-center shadow-lg">
              <ShieldCheck size={32} className="text-white drop-shadow-md" strokeWidth={2.5} />
            </div>
          </motion.div>
          
          <div className="space-y-3">
            <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-[1.15]">
              Cara Beli & <br className="hidden md:block" />
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-100 to-amber-500 bg-[length:200%_auto] animate-shimmer drop-shadow-sm"
                style={{ animationDuration: '4s' }}
              >
                Tutorial Keamanan
              </span>
            </h1>
            <p className="text-slate-300 max-w-xl mx-auto text-[14px] md:text-[15px] leading-relaxed font-medium">
              Panduan lengkap cara membeli akun di Farid Shop Game, memahami alur Rekening Bersama (Rekber), dan menghindari Hackback.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── BAGIAN 0: Cara Beli Akun (Poster) ──────────────────────────────── */}
      <section className="flex flex-col gap-6 mt-6">
        <div className="flex items-center justify-center gap-3 pb-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-yellow-300 to-yellow-400 border border-yellow-400/50 text-blue-950 flex items-center justify-center shadow-xl">
            <Search size={16} strokeWidth={3} />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-black text-blue-950 dark:text-white text-center">
            Cara Beli Akun
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {CARA_BELI_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, type: 'spring', stiffness: 200, damping: 22 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 pt-7 border-2 border-slate-100 dark:border-slate-800 shadow-lg hover:border-blue-200 hover:shadow-lg transition-all flex flex-col items-center text-center relative group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-blue-950 text-[10px] font-black px-3 py-1 rounded-full shadow-md z-10 whitespace-nowrap">
                  LANGKAH 0{idx + 1}
                </div>
                <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-4 transition-transform group-hover:scale-110', step.color)}>
                  <Icon size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-blue-950 dark:text-white text-[14px] leading-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-8">
        
        {/* ── BAGIAN 1: Alur Transaksi Rekber ──────────────────────────────── */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">1</div>
            <h2 className="font-display text-xl font-black text-blue-950 dark:text-white">
              Alur Transaksi Rekber
            </h2>
          </div>

          <div className="relative mt-2 ml-3 md:ml-4">
            {/* Vertical timeline line */}
            <div className="absolute left-[19px] top-4 bottom-10 w-0.5 bg-slate-200" />
            
            <div className="flex flex-col gap-6 relative z-10">
              {REKBER_STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '0px' }}
                    transition={{ delay: idx * 0.03, type: 'spring', stiffness: 200, damping: 22 }}
                    className="flex items-start gap-5"
                  >
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white z-10', step.color, step.shadow)}>
                      <Icon size={18} strokeWidth={2.5} />
                    </div>
                    <div className="pt-1.5 pb-2">
                      <h3 className="font-bold text-blue-950 dark:text-white text-[15px] leading-tight mb-1">
                        {step.title}
                      </h3>
                      <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed pr-4">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── BAGIAN 2: Panduan Amankan Akun (Anti-Hackback) ──────────────── */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-3">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">2</div>
            <h2 className="font-display text-xl font-black text-blue-950 dark:text-white">
              Panduan Anti-Hackback
            </h2>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-blue-950 dark:text-white text-[15px]">Checklist Keamanan</h3>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">Wajib dilakukan setelah serah terima</p>
              </div>
              <div className="text-right">
                <span className="font-display text-xl font-black text-blue-950 dark:text-white">
                  {checklistProgress}/{SECURITY_CHECKLIST.length}
                </span>
                <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Selesai</p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {SECURITY_CHECKLIST.map((item) => {
                const isChecked = completedSteps[item.id];
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    layout
                    className={cn(
                      'w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-start gap-3',
                      isChecked 
                        ? 'bg-slate-900 border-slate-900 shadow-lg shadow-slate-900/20' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300 shadow-sm hover:shadow'
                    )}
                  >
                    <div className={cn(
                      'w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors',
                      isChecked ? 'bg-green-500 text-white' : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-transparent'
                    )}>
                      <CheckCircle size={14} className={isChecked ? 'block' : 'hidden'} strokeWidth={3} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={14} className={isChecked ? 'text-slate-400' : item.color} />
                        <h4 className={cn('font-bold text-[14px]', isChecked ? 'text-white' : 'text-blue-950 dark:text-white')}>
                          {item.title}
                        </h4>
                      </div>
                      <p className={cn('text-[12px] leading-relaxed', isChecked ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400')}>
                        {item.desc}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {isFullySecured && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mt-5 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <ShieldCheck size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-green-800 text-[14px]">Akun 100% Aman!</p>
                  <p className="text-[11px] text-green-700 leading-tight mt-0.5">Silakan konfirmasi ke admin agar dana diteruskan ke penjual.</p>
                </div>
              </motion.div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
