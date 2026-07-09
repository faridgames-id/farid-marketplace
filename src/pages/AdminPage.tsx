import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Gamepad2, ShoppingBag, TrendingUp, 
  Plus, Edit, Trash2, Search, Filter, MoreVertical,
  X, Calendar, LayoutDashboard, UploadCloud,
  PieChart, Activity, Database, ChevronDown, ChevronLeft, ChevronRight,
  CheckCircle2, XCircle
} from 'lucide-react';
import { useAccountStore } from '../store/useAccountStore';
import { useAnalyticsStore } from '../store/useAnalyticsStore';
import { DatePicker } from '../components/ui/DatePicker';
import { cn, formatRupiah } from '@lib/utils';
import type { Account, GameType } from '../types/account';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const VISITOR_DATA = [
  { name: 'Senin', clicks: 400, visits: 500 },
  { name: 'Selasa', clicks: 300, visits: 450 },
  { name: 'Rabu', clicks: 550, visits: 600 },
  { name: 'Kamis', clicks: 480, visits: 550 },
  { name: 'Jumat', clicks: 700, visits: 800 },
  { name: 'Sabtu', clicks: 1200, visits: 1300 },
  { name: 'Minggu', clicks: 1400, visits: 1500 },
];

const fadeUp: any = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } }
};

import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export function AdminPage() {
  const { isAdmin, isLoading } = useAuthStore();
  
  const accounts = useAccountStore(state => state.accounts);
  const deleteAccount = useAccountStore(state => state.deleteAccount);
  const updateAccount = useAccountStore(state => state.updateAccount);
  const addAccount = useAccountStore(state => state.addAccount);
  
  const fetchAnalytics = useAnalyticsStore(state => state.fetchAnalytics);
  const analyticsData = useAnalyticsStore(state => state.analyticsData);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeDateFilter, setActiveDateFilter] = useState('');
  const [chartDateFilter, setChartDateFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [tableGameFilter, setTableGameFilter] = useState('Free Fire');
  const [tableStatusFilter, setTableStatusFilter] = useState('Ready');

  // Sold Modal State
  const [isSoldModalOpen, setIsSoldModalOpen] = useState(false);
  const [accountToSell, setAccountToSell] = useState<Account | null>(null);

  // Fetch real analytics data
  useEffect(() => {
    let end = new Date();
    if (chartDateFilter) {
      end = new Date(chartDateFilter);
    }
    const start = new Date(end.getTime() - 6 * 24 * 60 * 60 * 1000); // last 7 days

    const startStr = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`;
    const endStr = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;
    
    fetchAnalytics(startStr, endStr);
  }, [chartDateFilter, fetchAnalytics]);

  // Transform analytics data for Recharts
  const chartData = useMemo(() => {
    let end = new Date();
    if (chartDateFilter) {
      end = new Date(chartDateFilter);
    }
    const daysArr = [];
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    
    let hasRealData = false;

    // Generate last 7 days array
    for (let i = 6; i >= 0; i--) {
      const d = new Date(end.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      
      const found = analyticsData.find(a => a.date === dateStr);
      if (found) hasRealData = true;

      daysArr.push({
        name: dayNames[d.getDay()],
        clicks: found ? found.clicks : 0,
        visits: found ? found.visits : 0,
      });
    }

    return daysArr;
  }, [chartDateFilter, analyticsData]);

  // Wait until Firebase checks auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleSoldSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accountToSell) return;
    const form = new FormData(e.currentTarget);
    const buyerName = form.get('buyerName') as string;
    const soldPrice = Number(form.get('soldPrice'));
    const dateInput = form.get('dateSold') as string;
    const dateSold = dateInput ? new Date(dateInput).toISOString() : new Date().toISOString();
    
    updateAccount(accountToSell.id, { 
      ...accountToSell, 
      status: 'Sold',
      buyerName,
      soldPrice,
      dateSold
    });
    
    setIsSoldModalOpen(false);
    setAccountToSell(null);
    setTableStatusFilter('Terjual');
  };

  // Stats calculation
  const totalAccounts = activeDateFilter 
    ? accounts.filter(a => a.dateAdded && a.dateAdded.startsWith(activeDateFilter)).length 
    : accounts.length;

  const availableAccounts = activeDateFilter
    ? accounts.filter(a => a.status === 'Available' && a.dateAdded && a.dateAdded.startsWith(activeDateFilter)).length
    : accounts.filter(a => a.status === 'Available').length;

  const soldAccountsList = activeDateFilter
    ? accounts.filter(a => a.status === 'Sold' && a.dateSold && a.dateSold.startsWith(activeDateFilter))
    : accounts.filter(a => a.status === 'Sold');

  const soldAccounts = soldAccountsList.length;

  const totalValue = soldAccountsList.reduce((sum, a) => sum + (a.soldPrice || a.price || 0), 0);

  // Filter accounts for the table
  const filteredAccounts = accounts.filter(acc => {
    const matchesSearch = acc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          acc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          acc.game.toLowerCase().includes(searchQuery.toLowerCase());
                          
    // Match date based on either when it was added OR when it was sold
    const matchesDate = activeDateFilter 
      ? (acc.dateAdded && acc.dateAdded.startsWith(activeDateFilter)) || 
        (acc.dateSold && acc.dateSold.startsWith(activeDateFilter))
      : true;
      
    const matchesGame = tableGameFilter === 'Semua' ? true : acc.game === tableGameFilter;
    const matchesStatus = tableStatusFilter === 'Semua' ? true : (tableStatusFilter === 'Ready' ? acc.status === 'Available' : acc.status === 'Sold');
    
    return matchesSearch && matchesDate && matchesGame && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if(window.confirm('Yakin ingin menghapus akun ini?')) {
      deleteAccount(id);
    }
  };

  const openEditModal = (account: Account) => {
    setEditingAccount(account);
    setImagePreview(account.image);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingAccount(null);
    setImagePreview(null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const form = new FormData(e.currentTarget);
      const title = form.get('title') as string;
      const game = form.get('game') as GameType;
      const price = Number(form.get('price'));
      const status = form.get('status') as 'Available' | 'Sold';
      const dateInput = form.get('dateAdded') as string;
      const badge = form.get('badge') as string;
      const specs = form.get('specs') as string;
      let image = imagePreview || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600&h=800';

      if (imageFile && storage) {
        const storageRef = ref(storage, `accounts/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        image = await getDownloadURL(storageRef);
      }

      if (editingAccount) {
        await updateAccount(editingAccount.id, { title, game, price, status, image, dateAdded: dateInput, badge, specs });
      } else {
        const newAcc: Account = {
          id: `ACC-00${accounts.length + 1}`,
          game, title, price, status,
          tier: 'Standard', image,
          specs, badge, dateAdded: dateInput
        };
        await addAccount(newAcc);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving account:", err);
      alert("Gagal menyimpan data akun. Pastikan koneksi dan rule Firebase benar.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* ── Header Admin ── */}
      <motion.div 
        initial="hidden" animate="show" variants={fadeUp}
        className="relative rounded-[32px] p-8 md:p-10 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl border-t border-white/10"
      >
        {/* Animated Background Gradients & Patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-white/10  pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], x: [0, -30, 0], y: [0, 20, 0] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-white/10  pointer-events-none" 
        />
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30  mb-6 shadow-sm"
            >
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </div>
              <span className="text-xs font-bold text-white tracking-widest uppercase drop-shadow-sm">Pusat Kendali</span>
            </motion.div>
            
            <div className="flex items-center gap-5 mb-4">
              <div className="p-4 bg-white/20 rounded-2xl  border border-white/30 shadow-xl">
                <LayoutDashboard size={32} className="text-white drop-shadow-md" strokeWidth={2} />
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-sm text-white">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-blue-50 max-w-2xl text-base md:text-lg font-medium leading-relaxed drop-shadow-sm">
              Kelola katalog akun, pantau statistik performa secara real-time, dan atur semua penjualan dengan efisiensi maksimal.
            </p>
          </div>
          
          <div className="hidden md:flex gap-4">
            <div className="flex flex-col justify-center bg-white/10  border border-white/20 rounded-2xl p-5 min-w-[140px] transform hover:-translate-y-1 transition-all duration-300 shadow-xl">
              <span className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Total Akun</span>
              <div className="text-3xl font-black text-white drop-shadow-sm">{totalAccounts}</div>
            </div>
            <div className="flex flex-col justify-center bg-white/10  border border-white/20 rounded-2xl p-5 min-w-[140px] transform hover:-translate-y-1 transition-all duration-300 shadow-xl">
              <span className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Terjual</span>
              <div className="text-3xl font-black text-white drop-shadow-sm">{soldAccounts}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Global Filter & Stats Grid ── */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="relative z-50 bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-50">
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <div className="p-2 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-xl text-white shadow-xl border border-blue-500/50">
            <PieChart size={18} />
          </div>
          Ringkasan Statistik
        </h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto relative z-50">
          <button 
            onClick={() => setActiveDateFilter('')}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-black whitespace-nowrap transition-all duration-300 w-full sm:w-auto", 
              !activeDateFilter 
                ? "bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-xl border border-blue-600/50" 
                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            Semua Waktu
          </button>
          
          <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
          
          <div className="relative flex-shrink-0 w-full sm:w-auto">
            <DatePicker 
              value={activeDateFilter} 
              onChange={setActiveDateFilter} 
              placeholder="Pilih Tanggal" 
            />
          </div>
        </div>
      </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        <StatCard title="Total Akun" value={totalAccounts} icon={Gamepad2} gradient="from-blue-500 to-blue-700" shadowColor="shadow-blue-500/30" />
        <StatCard title="Tersedia" value={availableAccounts} icon={ShoppingBag} gradient="from-green-500 to-green-700" shadowColor="shadow-green-500/30" />
        <StatCard title="Terjual" value={soldAccounts} icon={Users} gradient="from-purple-500 to-purple-700" shadowColor="shadow-purple-500/30" />
        <StatCard title="Cashflow" value={formatRupiah(totalValue)} icon={TrendingUp} gradient="from-amber-500 to-orange-600" shadowColor="shadow-amber-500/30" isCurrency />
        </div>
      </motion.section>

      {/* ── Data Table Section ── */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6"
      >
        {/* Table Toolbar */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-xl text-white shadow-xl border border-teal-500/50">
                <Database size={18} />
              </div>
              Manajemen Katalog
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:min-w-[280px] group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full  opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} strokeWidth={2.5} />
                  <input 
                    type="text" 
                    placeholder="Cari ID, Judul, atau Game..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-5 py-3 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-sm"
                  />
                </div>
              </div>
              <button 
                onClick={openAddModal}
                className="flex items-center justify-center gap-2 bg-gradient-to-b from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all flex-shrink-0 border border-indigo-600/50"
              >
                <Plus size={18} strokeWidth={3} />
                <span>Tambah Akun</span>
              </button>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 border-t-2 border-slate-100 dark:border-slate-800/50 pt-6 mt-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-xs font-black text-slate-400 mr-2 flex-shrink-0 tracking-wider">GAME:</span>
              <div className="flex gap-2 p-1 bg-slate-100/50 dark:bg-slate-800/30 rounded-full border border-slate-200/50 dark:border-slate-700/30">
                {['Free Fire', 'Mobile Legends'].map(game => (
                  <button 
                    key={game}
                    onClick={() => setTableGameFilter(game)}
                    className={cn(
                      "relative px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300",
                      tableGameFilter === game 
                        ? "text-white" 
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                    )}
                  >
                    {tableGameFilter === game && (
                      <motion.div 
                        layoutId="activeGameTab"
                        className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full z-0 shadow-xl border border-blue-600/50"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{game}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-xs font-black text-slate-400 mr-2 flex-shrink-0 tracking-wider">STATUS:</span>
              <div className="flex gap-2 p-1 bg-slate-100/50 dark:bg-slate-800/30 rounded-full border border-slate-200/50 dark:border-slate-700/30">
                {['Ready', 'Terjual'].map(status => (
                  <button 
                    key={status}
                    onClick={() => setTableStatusFilter(status)}
                    className={cn(
                      "relative px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300",
                      tableStatusFilter === status 
                        ? "text-white" 
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                    )}
                  >
                    {tableStatusFilter === status && (
                      <motion.div 
                        layoutId="activeStatusTab"
                        className="absolute inset-0 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full z-0 shadow-xl border border-blue-500/50"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{status}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b-2 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="pb-3 px-4 font-bold whitespace-nowrap w-12 text-center border-r-2 border-slate-200 dark:border-slate-800/50">No</th>
                <th className="pb-3 px-4 font-bold whitespace-nowrap border-r-2 border-slate-200 dark:border-slate-800/50">ID / Akun</th>
                <th className="pb-3 px-4 font-bold whitespace-nowrap border-r-2 border-slate-200 dark:border-slate-800/50">Game</th>
                <th className="pb-3 px-4 font-bold whitespace-nowrap border-r-2 border-slate-200 dark:border-slate-800/50">Label</th>
                <th className="pb-3 px-4 font-bold whitespace-nowrap border-r-2 border-slate-200 dark:border-slate-800/50">Harga</th>
                <th className="pb-3 px-4 font-bold whitespace-nowrap border-r-2 border-slate-200 dark:border-slate-800/50">Status</th>
                <th className="pb-3 px-4 font-bold whitespace-nowrap border-r-2 border-slate-200 dark:border-slate-800/50">Tgl Masuk</th>
                <th className="pb-3 px-4 font-bold whitespace-nowrap border-r-2 border-slate-200 dark:border-slate-800/50">Tgl Terjual</th>
                <th className="pb-3 px-4 font-bold text-right whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-200 dark:divide-slate-800/50">
              {filteredAccounts.length > 0 ? filteredAccounts.map((account, index) => (
                <tr key={account.id} className="hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors duration-200 group">
                  <td className="py-4 px-4 text-center text-sm font-bold text-slate-400 dark:text-slate-500 border-r-2 border-slate-200 dark:border-slate-800/50">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 border-r-2 border-slate-200 dark:border-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200 dark:bg-slate-700">
                        <img src={account.image} alt={account.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-900 dark:text-white truncate max-w-[200px]">{account.title}</p>
                        <p className="text-xs text-slate-500">{account.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 border-r-2 border-slate-200 dark:border-slate-800/50">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {account.game}
                    </span>
                  </td>
                  <td className="py-4 px-4 border-r-2 border-slate-200 dark:border-slate-800/50">
                    {account.badge ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        {account.badge}
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm font-bold text-slate-900 dark:text-white border-r-2 border-slate-200 dark:border-slate-800/50">
                    {formatRupiah(account.price)}
                  </td>
                  <td className="py-4 px-4 border-r-2 border-slate-200 dark:border-slate-800/50">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border",
                      account.status === 'Available' 
                        ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' 
                        : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", account.status === 'Available' ? "bg-green-500" : "bg-slate-400")} />
                      {account.status === 'Available' ? 'Ready' : 'Terjual'}
                    </span>
                  </td>
                  <td className="py-4 px-4 border-r-2 border-slate-200 dark:border-slate-800/50">
                    <span className="text-[12px] font-bold text-slate-600 dark:text-slate-400">
                      {account.dateAdded ? new Date(account.dateAdded).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}) : '-'}
                    </span>
                  </td>
                  <td className="py-4 px-4 border-r-2 border-slate-200 dark:border-slate-800/50">
                    <span className="text-[12px] font-bold text-slate-600 dark:text-slate-400">
                      {account.status === 'Sold' && account.dateSold ? new Date(account.dateSold).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}) : '-'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => {
                          if (account.status === 'Available') {
                            setAccountToSell(account);
                            setIsSoldModalOpen(true);
                          } else {
                            updateAccount(account.id, { ...account, status: 'Available', buyerName: undefined, soldPrice: undefined, dateSold: undefined });
                          }
                        }}
                        title={account.status === 'Available' ? "Tandai Terjual" : "Tandai Ready"}
                        className={cn(
                          "p-2.5 rounded-xl transition-all shadow-xl text-white hover:-translate-y-0.5 active:scale-95 border",
                          account.status === 'Available' 
                            ? "bg-gradient-to-b from-emerald-400 to-emerald-600 border-emerald-600/50" 
                            : "bg-gradient-to-b from-amber-400 to-amber-600 border-amber-600/50"
                        )}
                      >
                        {account.status === 'Available' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                      </button>
                      <button 
                        onClick={() => openEditModal(account)} 
                        className="p-2.5 rounded-xl transition-all shadow-xl text-white hover:-translate-y-0.5 active:scale-95 border bg-gradient-to-b from-blue-500 to-blue-700 border-blue-700/50"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(account.id)} 
                        className="p-2.5 rounded-xl transition-all shadow-xl text-white hover:-translate-y-0.5 active:scale-95 border bg-gradient-to-b from-red-500 to-red-700 border-red-700/50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-slate-500 text-sm">
                    Tidak ada akun yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* ── Fake Form Modal ── */}
      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[99999] flex items-start sm:items-center justify-center p-4 pt-12 sm:pt-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/60 "
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-[95%] max-w-[360px] bg-white dark:bg-slate-900 rounded-[28px] shadow-2xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col max-h-[85vh]"
              >
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50 rounded-t-[28px]">
                    <h3 className="font-display text-[17px] font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl">
                        {editingAccount ? <Edit size={20} /> : <Plus size={20} />}
                      </span>
                      {editingAccount ? 'Edit Data Akun' : 'Tambah Akun Baru'}
                    </h3>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSave} className="flex flex-col overflow-hidden">
                    <div className="p-4 space-y-3 overflow-y-auto scrollbar-hide">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Spek Akun</label>
                        <input name="title" type="text" defaultValue={editingAccount?.title || ''} required className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-500 rounded-xl text-[13px] focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" placeholder="Contoh: Akun Sultan S1..." />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Deskripsi Akun</label>
                        <textarea name="specs" rows={2} defaultValue={editingAccount?.specs || ''} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-500 rounded-xl text-[13px] focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none" placeholder="Tuliskan hero, skin, rank..."></textarea>
                      </div>
                    
                    <div>
                      <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Gambar Stok</span>
                      <label className="relative border border-dashed border-slate-300 dark:border-slate-500 hover:border-blue-500/50 dark:hover:border-blue-500/50 rounded-xl p-2 transition-colors flex flex-col items-center justify-center group overflow-hidden bg-slate-50 dark:bg-slate-900/50 text-center min-h-[80px] cursor-pointer">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        {imagePreview ? (
                          <>
                            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden group-hover:opacity-30 transition-opacity">
                              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                              <p className="text-xs font-bold text-white bg-black/70 px-3 py-1.5 rounded-lg shadow-lg ">Ganti Gambar</p>
                            </div>
                          </>
                        ) : (
                          <div className="py-2 flex flex-col items-center">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-1 group-hover:scale-110 transition-transform">
                              <UploadCloud size={16} />
                            </div>
                            <p className="text-[13px] font-bold text-slate-700 dark:text-slate-300">Klik atau seret gambar ke sini</p>
                            <p className="text-[10px] text-slate-500">PNG, JPG, atau WEBP</p>
                          </div>
                        )}
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Game</label>
                        <CustomSelect 
                          name="game"
                          defaultValue={editingAccount?.game || 'Free Fire'}
                          options={[
                            {value: 'Free Fire', label: 'Free Fire'},
                            {value: 'Mobile Legends', label: 'Mobile Legends'},
                          ]}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Harga</label>
                        <PriceInput name="price" defaultValue={editingAccount?.price || ''} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Status</label>
                        <CustomSelect 
                          name="status"
                          defaultValue={editingAccount?.status || 'Available'}
                          options={[
                            {value: 'Available', label: 'Ready'},
                            {value: 'Sold', label: 'Terjual'},
                          ]}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tanggal Masuk</label>
                        <CustomDatePicker 
                          name="dateAdded" 
                          defaultValue={editingAccount?.dateAdded ? editingAccount.dateAdded.split('T')[0] : new Date().toISOString().split('T')[0]} 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Kategori / Label</label>
                        <CustomSelect 
                          name="badge"
                          defaultValue={editingAccount?.badge || ''}
                          direction="up"
                          options={[
                            {value: '', label: 'Biasa (Tidak Ada)'},
                            {value: 'Terbaru', label: 'Terbaru'},
                            {value: 'Termurah', label: 'Termurah'},
                            {value: 'Termahal', label: 'Termahal'},
                            {value: 'Terpopuler', label: 'Terpopuler'},
                            {value: 'Sultan', label: 'Sultan'},
                            {value: 'Premium', label: 'Premium'},
                            {value: 'Rare', label: 'Rare'},
                          ]}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 flex gap-3 border-t border-slate-100 dark:border-slate-800 mt-auto flex-shrink-0 rounded-b-[28px]">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 text-[13px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors">
                      Batal
                    </button>
                    <button type="submit" disabled={isSaving} className="flex-1 py-2.5 text-[13px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50">
                      {isSaving ? 'Menyimpan...' : 'Simpan Data'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      , document.body)}

      {/* ── Sold Checkout Modal ── */}
      {/* ── Sold Checkout Modal ── */}
      {createPortal(
        <AnimatePresence>
          {isSoldModalOpen && accountToSell && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsSoldModalOpen(false)}
                className="absolute inset-0 bg-black/60 "
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-[95%] max-w-[360px] bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-5 text-white relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full  -translate-y-1/2 translate-x-1/2" />
                  <h3 className="font-display text-xl font-bold mb-1 relative z-10">Tandai Terjual</h3>
                  <p className="text-sm text-green-100 relative z-10">Masukkan detail penjualan untuk {accountToSell.id}</p>
                  
                  <button type="button" onClick={() => setIsSoldModalOpen(false)} className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-full transition-colors z-20">
                    <X size={18} className="text-white" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSoldSubmit} className="p-5">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Pembeli</label>
                      <input 
                        name="buyerName" 
                        type="text" 
                        required
                        placeholder="Masukkan nama pembeli..."
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-500 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all text-slate-700 dark:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Harga Deal</label>
                      <PriceInput name="soldPrice" defaultValue={accountToSell.price} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tanggal Terjual</label>
                      <CustomDatePicker 
                        name="dateSold" 
                        defaultValue={new Date().toISOString().split('T')[0]} 
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button type="button" onClick={() => setIsSoldModalOpen(false)} className="flex-1 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors">
                      Batal
                    </button>
                    <button type="submit" className="flex-1 py-2.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-md shadow-green-500/20 transition-all active:scale-95">
                      Konfirmasi Terjual
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      , document.body)}
    </div>
  );
}

// Sub-component for Stats
function StatCard({ title, value, icon: Icon, gradient, shadowColor, isCurrency = false }: any) {
  return (
    <motion.div 
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className={cn(
        "relative p-4 md:p-5 rounded-[20px] border border-white/20 flex flex-col gap-3 overflow-hidden text-white cursor-default",
        "bg-gradient-to-br", gradient,
        "shadow-xl"
      )}>
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-24 h-24 bg-white/20 rounded-full  pointer-events-none" />
      
      <div className="w-10 h-10 rounded-xl bg-white/20  border border-white/20 flex items-center justify-center flex-shrink-0 relative z-10 shadow-sm">
        <Icon size={20} strokeWidth={2.5} className="text-white drop-shadow-sm" />
      </div>
      <div className="relative z-10">
        <p className="text-xs font-medium text-white/90 drop-shadow-sm tracking-wide">{title}</p>
        <p className={cn("font-display font-black text-white drop-shadow-md tracking-tight", isCurrency ? "text-[16px] sm:text-lg md:text-xl truncate" : "text-2xl md:text-3xl mt-0.5")}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}

// Sub-component for Custom Select
function CustomSelect({ name, options, defaultValue, direction = 'down' }: { name: string, options: {value: string, label: string}[], defaultValue: string, direction?: 'up' | 'down' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  
  return (
    <div className="relative">
      <input type="hidden" name={name} value={selected} />
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-500 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-left flex justify-between items-center group"
      >
        <span className="font-semibold text-slate-700 dark:text-slate-200">{options.find(o => o.value === selected)?.label || selected}</span>
        <ChevronDown size={16} className={cn("transition-transform text-slate-400 group-hover:text-blue-500", isOpen && "rotate-180 text-blue-500")} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[105]" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: direction === 'down' ? -10 : 10, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: direction === 'down' ? -10 : 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(
                "absolute z-[110] left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden flex flex-col divide-y divide-slate-100 dark:divide-slate-700/50",
                direction === 'down' ? "top-full mt-2" : "bottom-full mb-2"
              )}
            >
              {options.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { setSelected(opt.value); setIsOpen(false); }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between",
                    selected === opt.value 
                      ? "bg-blue-50/80 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold" 
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  )}
                >
                  {opt.label}
                  {selected === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component for Custom Date Picker
function CustomDatePicker({ name, defaultValue }: { name: string, defaultValue: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(defaultValue || Date.now()));
  const [viewDate, setViewDate] = useState(new Date(defaultValue || Date.now()));

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const selectDate = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    setSelectedDate(newDate);
    setIsOpen(false);
  };

  const offset = selectedDate.getTimezoneOffset();
  const adjustedDate = new Date(selectedDate.getTime() - (offset*60*1000));
  const formattedDate = adjustedDate.toISOString().split('T')[0];

  return (
    <div className="relative">
      <input type="hidden" name={name} value={formattedDate} />
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-500 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-left flex justify-between items-center group"
      >
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          {selectedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <Calendar size={16} className={cn("transition-colors text-slate-400 group-hover:text-blue-500", isOpen && "text-blue-500")} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[105]" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-[110] bottom-full sm:bottom-auto sm:top-full right-0 sm:left-0 sm:right-auto mb-2 sm:mb-0 sm:mt-2 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl w-[280px]"
            >
              <div className="flex justify-between items-center mb-4">
                <button type="button" onClick={handlePrevMonth} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <ChevronLeft size={18} className="text-slate-600 dark:text-slate-300" />
                </button>
                <div className="font-bold text-slate-800 dark:text-white">
                  {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
                </div>
                <button type="button" onClick={handleNextMonth} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <ChevronRight size={18} className="text-slate-600 dark:text-slate-300" />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((d, i) => (
                  <div key={i} className="text-[10px] font-black text-slate-400 py-1">{d}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {blanks.map(b => <div key={`blank-${b}`} />)}
                {days.map(d => {
                  const isSelected = d === selectedDate.getDate() && viewDate.getMonth() === selectedDate.getMonth() && viewDate.getFullYear() === selectedDate.getFullYear();
                  const isToday = d === new Date().getDate() && viewDate.getMonth() === new Date().getMonth() && viewDate.getFullYear() === new Date().getFullYear();
                  
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => selectDate(d)}
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-lg text-xs transition-all mx-auto",
                        isSelected 
                          ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30" 
                          : isToday
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      )}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component for Price Input (Auto formatting Rp .000)
function PriceInput({ name, defaultValue }: { name: string, defaultValue: string | number }) {
  const [displayValue, setDisplayValue] = useState(() => {
    if (!defaultValue) return '';
    return 'Rp ' + Number(defaultValue).toLocaleString('id-ID');
  });
  const [rawValue, setRawValue] = useState(defaultValue || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ''); // strip non-numeric
    if (!val) {
      setDisplayValue('');
      setRawValue('');
      return;
    }
    const num = parseInt(val, 10);
    setRawValue(num.toString());
    setDisplayValue('Rp ' + num.toLocaleString('id-ID'));
  };

  return (
    <>
      <input type="hidden" name={name} value={rawValue} />
      <input 
        type="text" 
        value={displayValue} 
        onChange={handleChange} 
        required 
        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-500 rounded-xl text-sm focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-slate-700 dark:text-slate-200" 
        placeholder="Rp 0" 
      />
    </>
  );
}
