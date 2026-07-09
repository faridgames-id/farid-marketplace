import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function DatePicker({ value, onChange, placeholder = "Pilih Tanggal" }: { value: string; onChange: (date: string) => void; placeholder?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(
    value ? new Date(value).getFullYear() : new Date().getFullYear()
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const handleMonthClick = (monthIndex: number) => {
    const monthStr = String(monthIndex + 1).padStart(2, '0');
    const dateStr = `${currentYear}-${monthStr}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  const nextYear = () => setCurrentYear(y => y + 1);
  const prevYear = () => setCurrentYear(y => y - 1);

  // Format display value: "YYYY-MM" -> "Bulan Tahun"
  const displayValue = value ? (() => {
    const [y, m] = value.split('-');
    const monthName = monthNames[parseInt(m, 10) - 1];
    return `${monthName} ${y}`;
  })() : '';

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 w-full sm:w-[160px] justify-between",
          value
            ? "bg-white dark:bg-slate-800 border-2 border-blue-500 text-blue-700 dark:text-blue-300 shadow-lg"
            : "bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
        )}
      >
        <span className="truncate">{displayValue || placeholder}</span>
        <CalendarIcon size={16} className={value ? "text-blue-600" : "text-slate-400"} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, type: 'spring', bounce: 0.3 }}
            className="absolute right-0 top-full mt-3 w-[300px] bg-white/95 dark:bg-slate-900/95  rounded-[24px] shadow-lg border border-white/50 dark:border-slate-700/50 p-5 z-50 origin-top-right overflow-hidden"
          >
            {/* Header / Year Selector */}
            <div className="flex items-center justify-between mb-5 relative z-10">
              <button onClick={prevYear} className="p-2 bg-slate-100/80 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 rounded-full transition-all text-slate-600 dark:text-slate-300 active:scale-95">
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>
              <span className="font-display font-black text-slate-800 dark:text-white text-lg tracking-wide">
                {currentYear}
              </span>
              <button onClick={nextYear} className="p-2 bg-slate-100/80 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 rounded-full transition-all text-slate-600 dark:text-slate-300 active:scale-95">
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
            
            {/* Grid of Months */}
            <div className="grid grid-cols-3 gap-2 relative z-10">
              {monthNames.map((month, index) => {
                const monthStr = String(index + 1).padStart(2, '0');
                const dateStr = `${currentYear}-${monthStr}`;
                const isSelected = value === dateStr;
                const isCurrentMonth = new Date().getMonth() === index && new Date().getFullYear() === currentYear;

                return (
                  <button
                    key={month}
                    onClick={() => handleMonthClick(index)}
                    className={cn(
                      "py-2.5 px-1 rounded-2xl text-sm font-bold transition-all relative overflow-hidden group",
                      isSelected 
                        ? "text-white shadow-lg" 
                        : isCurrentMonth 
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="activeMonth"
                        className="absolute inset-0 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-2xl z-0"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{month.slice(0, 3)}</span>
                  </button>
                );
              })}
            </div>

            {/* Reset Button */}
            {value && (
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/50 relative z-10">
                <button 
                  onClick={() => { onChange(''); setIsOpen(false); }}
                  className="w-full py-2.5 text-xs font-bold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 bg-red-50/50 hover:bg-red-50 dark:bg-red-500/10 dark:hover:bg-red-500/20 rounded-xl transition-colors active:scale-95"
                >
                  Reset Filter
                </button>
              </div>
            )}
            
            {/* Background Decorations */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
