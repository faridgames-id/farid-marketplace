import { motion } from 'framer-motion';
import { ShieldCheck, Clock, CheckCircle, Gamepad2, Info } from 'lucide-react';

const ABOUT_FEATURES = [
  { icon: ShieldCheck, title: 'Keamanan Terjamin', desc: 'Sistem Anti-Hackback & Rekber yang aman' },
  { icon: Clock, title: 'Proses Cepat', desc: 'Transaksi instan dalam hitungan menit' },
  { icon: CheckCircle, title: 'Terpercaya', desc: 'Ribuan testimoni pelanggan yang puas' },
];

export function AboutPage() {
  return (
    <div className="flex flex-col gap-8 pb-10 pt-6">
      
      {/* Restored Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        className="bg-gradient-to-br from-blue-900 via-[#1e3a8a] to-[#0a1a35] border-t border-white/10 rounded-[32px] p-8 md:p-14 text-center text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-b from-blue-500 to-blue-700 border border-blue-400/30 rounded-[18px] flex items-center justify-center shadow-lg">
            <Info size={32} className="text-white drop-shadow-md" strokeWidth={2.5} />
          </div>
          <div className="space-y-3">
            <h1 className="font-display text-3xl md:text-4xl font-black tracking-tight text-white">
              Tentang{' '}
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-100 to-amber-500 bg-[length:200%_auto] animate-shimmer drop-shadow-sm"
                style={{ animationDuration: '4s' }}
              >
                Farid Shop Game
              </span>
            </h1>
            <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-medium">
              Farid Shop Game adalah platform penyedia layanan jual beli akun game yang aman, murah, dan terpercaya. Kami berkomitmen untuk memberikan layanan terbaik bagi setiap pelanggan kami.
            </p>
          </div>
        </div>
      </motion.div>


      {/* Card Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 24 }}
        className="bg-white dark:bg-slate-900 rounded-[32px] p-6 md:p-10 border border-slate-200 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mt-2 flex flex-col gap-6"
      >
        {/* Logo Image */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[28px] shrink-0 overflow-hidden border-[3px] border-white shadow-[0_12px_30px_-4px_rgba(0,0,0,0.12),0_4px_10px_-2px_rgba(0,0,0,0.05)]">
          <img src="/logo.jpeg" alt="Logo Farid Shop Game" className="w-full h-full object-cover" />
          {/* Emboss overlay */}
          <div className="absolute inset-0 rounded-[25px] shadow-[inset_0_3px_6px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.2)] pointer-events-none" />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-display text-3xl font-black text-blue-950 dark:text-white">
            Farid Shop Game
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed font-medium max-w-3xl">
            Farid Shop Game menyediakan layanan Jual Beli Akun, Top Up, dan produk digital lainnya dengan proses order, pembayaran, serta pemantauan transaksi yang terpusat dan sangat aman.
          </p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="font-display text-2xl font-black text-blue-950 dark:text-white text-center">Kenapa Memilih Kami?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {ABOUT_FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, type: 'spring', stiffness: 200, damping: 22 }}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-900 rounded-3xl p-6 border-t border-white/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.2),0_8px_20px_rgba(37,99,235,0.25)] text-center text-white relative overflow-hidden group"
              >
                {/* Subtle highlight effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors" />
                
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white mx-auto mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                  <Icon size={26} strokeWidth={2.5} />
                </div>
                <h3 className="relative z-10 font-bold text-white text-lg mb-2 drop-shadow-sm">{feature.title}</h3>
                <p className="relative z-10 text-sm text-blue-50 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
