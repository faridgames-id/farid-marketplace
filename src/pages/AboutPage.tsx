import { motion } from 'framer-motion';
import { ShieldCheck, Clock, CheckCircle, Gamepad2, Info, Triangle, Circle, Square, X, Minus, Activity } from 'lucide-react';

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
        className="bg-gradient-to-br from-blue-600 via-blue-800 to-[#0a1a3a] border border-white/10 rounded-[40px] p-8 md:p-14 text-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] relative overflow-hidden group"
      >
        {/* Decorative Memphis Geometric Motif */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl" />
          
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
          <div className="w-16 h-16 bg-gradient-to-b from-blue-500 to-blue-700 border border-blue-400/30 rounded-[18px] flex items-center justify-center shadow-sm">
            <Info size={32} className="text-white " strokeWidth={2.5} />
          </div>
          <div className="space-y-3">
            <h1 className="font-display text-3xl md:text-4xl font-black tracking-tight text-white">
              Tentang{' '}
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-100 to-amber-500 bg-[length:200%_auto] animate-shimmer "
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 24 }}
        className="bg-white dark:bg-slate-900 rounded-[32px] p-6 md:p-10 border border-slate-200 dark:border-slate-800 shadow-sm mt-2 flex flex-col md:flex-row md:items-center gap-6 md:gap-8"
      >
        {/* Logo Image */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[28px] shrink-0 overflow-hidden border-[3px] border-white shadow-sm">
          <img src="/logo.jpeg" alt="Logo Farid Shop Game" className="w-full h-full object-cover" />
          {/* Emboss overlay */}
          <div className="absolute inset-0 rounded-[25px] shadow-sm pointer-events-none" />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-display text-3xl font-black text-blue-950 dark:text-white">
            Farid Shop Game
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-[15px] md:text-base leading-relaxed font-medium max-w-3xl">
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
                transition={{ delay: idx * 0.05, type: 'spring', stiffness: 200, damping: 22 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-[32px] p-8 md:p-10 border border-blue-400/30 shadow-[0_8px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] text-center text-white relative overflow-hidden group cursor-default transition-shadow duration-500"
              >
                
                {/* ── Memphis Geometric Motifs ── */}
                <div className="absolute inset-0 opacity-[0.15] text-white pointer-events-none">
                  <Square className="absolute top-8 left-6 w-8 h-8 -rotate-12 group-hover:rotate-45 group-hover:scale-110 transition-all duration-700 ease-out" strokeWidth={2} />
                  <Circle className="absolute top-1/2 right-6 w-6 h-6 group-hover:scale-125 transition-all duration-500 ease-out" strokeWidth={2.5} />
                  <Triangle className="absolute bottom-10 left-12 w-6 h-6 rotate-45 group-hover:rotate-90 group-hover:-translate-y-2 transition-all duration-700 ease-out" strokeWidth={2} />
                  <X className="absolute bottom-8 right-12 w-5 h-5 group-hover:rotate-180 group-hover:scale-110 transition-all duration-500 ease-out" strokeWidth={3} />
                  <Minus className="absolute top-12 right-1/4 w-5 h-5 -rotate-45 group-hover:rotate-0 transition-all duration-700 ease-out" strokeWidth={3} />
                  <Activity className="absolute bottom-1/4 left-1/4 w-7 h-7 rotate-12 group-hover:-translate-x-2 transition-all duration-700 ease-out" strokeWidth={2} />
                </div>
                <div className="relative z-10 w-16 h-16 rounded-[20px] bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white mx-auto mb-6 shadow-[0_8px_16px_rgba(0,0,0,0.1)] group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-3 group-hover:bg-white/30 transition-all duration-500">
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}>
                    <Icon size={30} strokeWidth={2.5} className="drop-shadow-sm" />
                  </motion.div>
                </div>
                
                {/* Text Content */}
                <h3 className="relative z-10 font-black text-white text-xl mb-3 drop-shadow-sm group-hover:text-blue-50 transition-colors">{feature.title}</h3>
                <p className="relative z-10 text-[15px] text-blue-50/90 font-medium leading-relaxed group-hover:text-white transition-colors">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
