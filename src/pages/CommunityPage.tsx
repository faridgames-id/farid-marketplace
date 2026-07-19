/**
 * CommunityPage — Forum/Grup Jual Beli Komunitas Akun Game
 * ────────────────────────────────────────────────────────
 * Design: Clean Solid Design (Solid white, Slate backgrounds)
 *
 * Layout:
 *   - Sidebar (List Kategori Game)
 *   - Main Area (Chat/Feed Postingan Jual Beli)
 *
 * Fitur:
 *   - Gelembung chat/postingan kotak padat (solid)
 *   - Tombol darurat 'Laporkan Indikasi Scam' merah solid (#EF4444)
 */

import { motion } from 'framer-motion';
import { 
  Users, MessageCircle, Gamepad2, Megaphone, 
  Camera, MonitorPlay, ExternalLink, ShieldCheck,
  BellRing, Image as ImageIcon, Send, Sparkles, ChevronRight,
  Triangle, Circle, Square, X, Minus, Activity
} from 'lucide-react';
import { cn } from '@lib/utils';

// ─── Dummy Data Komunitas ──────────────────────────────────────────────────
const JB_GROUPS = [
  { id: 'jb-1', name: 'Grup JB 1', members: 'Grup WhatsApp', icon: MessageCircle, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-700', border: 'border-blue-400', url: 'https://chat.whatsapp.com/Ih0JMO3tHUiLXADlfWebUY?mode=gi_t' },
  { id: 'jb-2', name: 'Grup JB 2', members: 'Grup WhatsApp', icon: MessageCircle, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-700', border: 'border-blue-400', url: 'https://chat.whatsapp.com/FcUdaACZ9c6BGCyPq3bm0e?mode=gi_t' },
  { id: 'jb-3', name: 'Grup JB 3', members: 'Grup WhatsApp', icon: MessageCircle, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-700', border: 'border-blue-400', url: 'https://chat.whatsapp.com/LIGZeUUAiUQDL9IsV7dNjL?mode=gi_t' },
  { id: 'jb-4', name: 'Grup JB 4', members: 'Grup WhatsApp', icon: MessageCircle, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-700', border: 'border-blue-400', url: 'https://chat.whatsapp.com/D1tOLIFEq5jClNemVFcIAZ?mode=gi_t' },
  { id: 'jb-5', name: 'Grup JB 5', members: 'Grup WhatsApp', icon: MessageCircle, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-700', border: 'border-blue-400', url: 'https://chat.whatsapp.com/LQWspTwEgI76HxBpcJftcZ?mode=gi_t' },
  { id: 'jb-6', name: 'Grup JB 6', members: 'Grup WhatsApp', icon: MessageCircle, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-700', border: 'border-blue-400', url: 'https://chat.whatsapp.com/Io5k4E6HAXGL7BQZkKofyy?mode=gi_t' },
  { id: 'jb-7', name: 'GB Umum', members: 'Grup WhatsApp', icon: MessageCircle, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-700', border: 'border-blue-400', url: 'https://chat.whatsapp.com/KBuqEc0jqkiKwTIJ2Vmcxa?mode=gi_t' },
];

const CHANNELS = [
  { id: 'ch-1', name: 'Saluran Jubel Utama', desc: 'Saluran WhatsApp', icon: BellRing, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-700', border: 'border-blue-400', url: 'https://whatsapp.com/channel/0029Vaqx2ZwGpLHI6ojo9m1g' },
  { id: 'ch-2', name: 'Saluran Khusus Stok', desc: 'Saluran WhatsApp', icon: Megaphone, color: 'text-white', bg: 'bg-gradient-to-br from-purple-500 to-purple-700', border: 'border-purple-400', url: 'https://whatsapp.com/channel/0029VbAsdPwG8l59cKXjOm2n' },
  { id: 'ch-3', name: 'Saluran Testimonial', desc: 'Saluran WhatsApp', icon: ImageIcon, color: 'text-white', bg: 'bg-gradient-to-br from-green-500 to-green-700', border: 'border-green-400', url: 'https://whatsapp.com/channel/0029VbCHXTbBKfi3J8REei2o' },
  { id: 'ch-4', name: 'Saluran Jual Akun', desc: 'Saluran WhatsApp', icon: Send, color: 'text-white', bg: 'bg-gradient-to-br from-amber-500 to-orange-600', border: 'border-amber-400', url: 'https://whatsapp.com/channel/0029Vb72jnl4yltI81JEng2Q' },
];

const SOCIALS = [
  { id: 'soc-1', name: 'Instagram', desc: '@faridwithai', icon: Camera, color: 'text-white', bg: 'bg-gradient-to-br from-pink-500 to-rose-600', border: 'border-pink-400', url: 'https://www.instagram.com/faridwithai?igsh=YzNwYjhkeWRnYnJ1&utm_source=qr' },
  { id: 'soc-2', name: 'TikTok', desc: '@faridsturr', icon: MonitorPlay, color: 'text-white', bg: 'bg-gradient-to-br from-slate-800 to-slate-900', border: 'border-slate-600', url: 'https://www.tiktok.com/@faridsturr' },
];

// ─── Animations ─────────────────────────────────────────────────────────────
const fadeUp: any = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } }
};

const stagger: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const iconVariants: any = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.1, rotate: -4, transition: { type: "spring", stiffness: 350, damping: 18 } }
};

const arrowVariants: any = {
  rest: { x: 0, opacity: 0.5 },
  hover: { x: 4, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

// ─── Unified Card Component ─────────────────────────────────────────────────
function UnifiedCard({ 
  icon: Icon, title, subtitle, color, bg, border, url, type = 'external' 
}: { 
  icon: any, title: string, subtitle: string, color: string, bg: string, border: string, url: string, type?: 'external' | 'internal' | 'social'
}) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={cn(
        "group relative flex items-center justify-between p-6 sm:p-7 rounded-[28px] border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] overflow-hidden",
        "transition-all duration-500 hover:-translate-y-1",
        bg
      )}
      whileTap={{ scale: 0.98 }}
      style={{ transformOrigin: "center center" }}
    >
      {/* Dynamic Background Glow on Hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none bg-white", 
      )} />

      {/* Unique Motifs */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
      <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
      
      {/* Geometric Interactive Motifs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/5 rounded-full scale-50 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
      <div className="absolute top-8 right-24 w-2.5 h-2.5 border-[1.5px] border-white/30 rotate-45 group-hover:rotate-180 group-hover:scale-125 transition-all duration-700 pointer-events-none" />
      <div className="absolute bottom-6 left-1/3 w-1.5 h-1.5 bg-white/40 rounded-full group-hover:animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />

      <div className="flex items-center gap-4 relative z-10 w-full min-w-0">
        <motion.div 
          variants={iconVariants} 
          className={cn('w-14 h-14 md:w-16 md:h-16 rounded-[18px] md:rounded-[20px] flex items-center justify-center flex-shrink-0 shadow-inner border border-white/30 relative overflow-hidden', bg, color)}
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Icon size={26} strokeWidth={2.2} className="relative z-10 drop-shadow-md" />
        </motion.div>
        
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="font-bold text-white text-[16px] md:text-[18px] leading-tight truncate group-hover:text-white/90 transition-colors drop-shadow-sm">{title}</h3>
          <p className="text-[13px] md:text-[14px] text-white/80 font-medium mt-1 truncate drop-shadow-sm">{subtitle}</p>
        </div>
      </div>
      
      <motion.div 
        variants={arrowVariants} 
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 shadow-sm transition-colors ",
          "bg-white/20 text-white border border-white/30 group-hover:bg-white"
        )}
      >
        {type === 'internal' ? <ChevronRight size={18} className="group-hover:text-blue-600 transition-colors" /> : <ExternalLink size={16} className="group-hover:text-blue-600 transition-colors" />}
      </motion.div>
    </motion.a>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export function CommunityPage() {
  return (
    <div className="flex flex-col gap-10 pb-12">
      
      {/* Header Hub */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 via-blue-800 to-[#0a1a3a] border border-white/10 rounded-[40px] p-8 md:p-14 text-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] relative overflow-hidden group"
      >
        {/* Decorative Memphis Geometric Motif */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[300px] h-[300px] bg-blue-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[250px] h-[250px] bg-purple-500/20 rounded-full blur-2xl" />
          
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
        
        <div className="relative z-10 flex flex-col items-center gap-5">
          <motion.div 
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.1 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 border border-blue-400/30 rounded-[20px] flex items-center justify-center shadow-sm"
          >
            <Users size={32} className="text-white " />
          </motion.div>
          
          <div className="space-y-3">
            <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Pusat Komunitas <br className="hidden md:block" />
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-100 to-amber-500 bg-[length:200%_auto] animate-shimmer "
                style={{ animationDuration: '4s' }}
              >
                Farid Shop Game
              </span>
            </h1>
            <p className="text-slate-300 max-w-lg mx-auto text-[14px] md:text-[15px] leading-relaxed font-medium">
              Gabung dengan puluhan ribu member lainnya. Tempat Jual Beli akun teraman, tercepat, dan terpercaya.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── BAGIAN 1: GRUP JB ────────────────────────────────────────────── */}
      <motion.section 
        variants={stagger} initial="hidden" animate="show"
        className="flex flex-col gap-5"
      >
        <div className="flex items-center gap-2.5 border-b-[1.5px] border-slate-900 pb-2.5">
          <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-md">
            <MessageCircle size={14} fill="currentColor" />
          </div>
          <h2 className="font-display text-lg md:text-xl font-black text-blue-950 dark:text-white">6 Grup Jual Beli (JB)</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {JB_GROUPS.map((group) => (
            <motion.div key={group.id} variants={fadeUp}>
              <UnifiedCard 
                icon={group.icon}
                title={group.name}
                subtitle={group.members}
                color={group.color}
                bg={group.bg}
                border={group.border}
                url={group.url}
                type="external"
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── BAGIAN 2: SALURAN & SOSIAL MEDIA ─────────────────────────────── */}
      <motion.section 
        variants={stagger} initial="hidden" animate="show"
        className="flex flex-col gap-5 mt-2"
      >
        <div className="flex items-center gap-2.5 border-b-[1.5px] border-slate-900 pb-2.5">
          <div className="w-7 h-7 rounded-md bg-purple-600 text-white flex items-center justify-center shadow-md">
            <Megaphone size={14} fill="currentColor" />
          </div>
          <h2 className="font-display text-lg md:text-xl font-black text-blue-950 dark:text-white">Saluran & Sosial Media</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {CHANNELS.map((channel) => (
            <motion.div key={channel.id} variants={fadeUp}>
              <UnifiedCard 
                icon={channel.icon}
                title={channel.name}
                subtitle={channel.desc}
                color={channel.color}
                bg={channel.bg}
                border={channel.border}
                url={channel.url}
                type="internal"
              />
            </motion.div>
          ))}
          {SOCIALS.map((social) => (
            <motion.div key={social.id} variants={fadeUp}>
              <UnifiedCard 
                icon={social.icon}
                title={social.name}
                subtitle={social.desc}
                color={social.color}
                bg={social.bg}
                border={social.border}
                url={social.url}
                type="social"
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── BANNER ANTI-SCAM ─────────────────────────────────────────────── */}
      <motion.div 
        variants={fadeUp} initial="hidden" animate="show"
        className="mt-6 p-6 md:p-8 bg-blue-50 border border-blue-200 rounded-3xl text-center shadow-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 shadow-inner border border-blue-200">
            <ShieldCheck size={32} />
          </div>
          <h4 className="font-black text-blue-900 text-lg md:text-xl">Hati-hati Penipuan!</h4>
          <p className="text-sm md:text-[15px] text-blue-700 mt-2 max-w-xl leading-relaxed">
            Admin Farid Shop Game <strong>tidak pernah</strong> meminta password akun Anda. 
            Semua transaksi rekber resmi hanya melalui kontak WhatsApp yang tercantum di aplikasi.
          </p>
        </div>
      </motion.div>

    </div>
  );
}
