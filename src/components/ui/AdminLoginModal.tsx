import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@lib/utils';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const { auth } = await import('../../lib/firebase');
      
      if (!auth) throw new Error('Firebase tidak terhubung. Cek konfigurasi dan restart Vite jika Anda baru menambahkan .env.local.');
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      setError(
        err.code === 'auth/invalid-credential' 
          ? 'Email atau kata sandi salah.' 
          : err.message || 'Terjadi kesalahan saat login.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 "
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[24px] shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-5 pb-3">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl">
                  <Lock size={24} />
                </div>
                <button 
                  type="button"
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">Login Admin</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Silakan masuk untuk mengakses dasbor manajemen.</p>
            </div>

            {/* Body */}
            <form onSubmit={handleLogin} className="px-5 pb-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-start gap-2 text-red-600 dark:text-red-400 text-sm mb-4">
                  <ShieldAlert size={16} className="mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Admin"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Kata Sandi</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-white"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full mt-4 py-3 rounded-xl font-bold text-white transition-all shadow-md",
                  isLoading 
                    ? "bg-blue-400 cursor-not-allowed shadow-none" 
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/25 active:scale-[0.98]"
                )}
              >
                {isLoading ? "Memverifikasi..." : "Masuk ke Dasbor"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
