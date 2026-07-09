import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Zap, Layout, Feather, Info } from 'lucide-react';
import { cn } from '@lib/utils';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InstallModal({ isOpen, onClose }: InstallModalProps) {
  const { isInstallable, installPWA } = usePWAInstall();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 "
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-[420px] bg-white dark:bg-[#0B1221] border border-slate-100 dark:border-slate-800/80 rounded-[28px] overflow-hidden shadow-sm dark:shadow-sm flex flex-col max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100/50 hover:bg-slate-200 dark:bg-[#1A233A]/80 dark:hover:bg-[#25304D] rounded-full transition-colors z-20"
          >
            <X size={18} />
          </button>

          <div className="overflow-y-auto custom-scrollbar flex-1 relative z-10">
            <div className="p-6 md:p-8 flex flex-col items-center">
              {/* Header Icon */}
              <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-b from-blue-500 to-indigo-600 p-[1px] mb-6 shadow-sm">
                <div className="w-full h-full bg-white dark:bg-[#0B1221] rounded-full flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-inner">
                    <Smartphone size={26} strokeWidth={2.2} />
                  </div>
                </div>
              </div>

              <h2 className="text-[24px] md:text-[26px] font-black text-slate-900 dark:text-white text-center tracking-tight leading-tight mb-3">
                Download Farid Shop
              </h2>
              <p className="text-slate-600 dark:text-[#94A3B8] text-center text-[13px] md:text-[14px] leading-[1.6] mb-8 max-w-[280px]">
                Pasang Farid Shop Game di layar utama agar order, cek status, dan produk digital lebih mudah diakses tanpa mencari link lagi.
              </p>

              <div className="w-full space-y-3.5 mb-6">
                {/* Card 1 */}
                <div className="bg-slate-50 dark:bg-[#131C31] border border-slate-200/60 dark:border-slate-700/40 rounded-[20px] p-4 md:p-5 transition-colors hover:border-blue-200 dark:hover:border-slate-600/50">
                  <h3 className="text-slate-900 dark:text-slate-100 font-bold text-[14px] md:text-[15px] mb-1.5 flex items-center gap-2.5">
                    <Zap size={18} className="text-amber-500 dark:text-amber-400" strokeWidth={2.5} />
                    1. Akses lebih cepat
                  </h3>
                  <p className="text-slate-600 dark:text-[#8B98AD] text-[13px] leading-relaxed ml-[26px]">
                    Buka Farid Shop Game seperti aplikasi langsung dari layar utama.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-slate-50 dark:bg-[#131C31] border border-slate-200/60 dark:border-slate-700/40 rounded-[20px] p-4 md:p-5 transition-colors hover:border-blue-200 dark:hover:border-slate-600/50">
                  <h3 className="text-slate-900 dark:text-slate-100 font-bold text-[14px] md:text-[15px] mb-1.5 flex items-center gap-2.5">
                    <Layout size={18} className="text-blue-500 dark:text-blue-400" strokeWidth={2.5} />
                    2. Tampilan lebih rapi
                  </h3>
                  <p className="text-slate-600 dark:text-[#8B98AD] text-[13px] leading-relaxed ml-[26px]">
                    Mode aplikasi terasa lebih fokus untuk order dan cek status.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-slate-50 dark:bg-[#131C31] border border-slate-200/60 dark:border-slate-700/40 rounded-[20px] p-4 md:p-5 transition-colors hover:border-blue-200 dark:hover:border-slate-600/50">
                  <h3 className="text-slate-900 dark:text-slate-100 font-bold text-[14px] md:text-[15px] mb-1.5 flex items-center gap-2.5">
                    <Feather size={18} className="text-teal-500 dark:text-teal-400" strokeWidth={2.5} />
                    3. Tetap ringan
                  </h3>
                  <p className="text-slate-600 dark:text-[#8B98AD] text-[13px] leading-relaxed ml-[26px]">
                    Tidak perlu install dari Play Store atau App Store.
                  </p>
                </div>
              </div>

              {/* Info Box */}
              <div className="w-full bg-blue-50 dark:bg-[#131C31] border border-blue-100 dark:border-slate-700/40 rounded-[20px] p-4 flex gap-3.5 mb-2">
                <Info size={20} className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-slate-700 dark:text-[#8B98AD] text-[13px] leading-relaxed">
                  Jika tombol install bawaan browser belum muncul, buka menu browser lalu pilih <strong className="text-slate-900 dark:text-slate-200">Tambahkan ke layar utama</strong> atau <strong className="text-slate-900 dark:text-slate-200">Install app</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Action Button */}
          <div className="p-5 md:p-6 bg-white dark:bg-[#0B1221] border-t border-slate-100 dark:border-slate-800/80 z-20">
            <button
              onClick={() => {
                if (isInstallable) {
                  installPWA();
                } else {
                  // Fallback for iOS/unsupported browsers: tell them to use share -> add to homescreen
                  alert("Untuk menginstall, buka menu browser (atau tap icon Share/Bagikan di iOS) lalu pilih 'Tambahkan ke Layar Utama' (Add to Home Screen).");
                }
              }}
              className={cn(
                "w-full py-4 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-300",
                "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-sm hover:shadow-sm active:scale-[0.98]"
              )}
            >
              <Smartphone size={18} strokeWidth={2.5} />
              Download Sekarang
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
