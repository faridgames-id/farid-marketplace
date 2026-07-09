import { create } from 'zustand';
import type { Account } from '../types/account';
import { supabase } from '../lib/supabase';

interface AccountStore {
  accounts: Account[];
  isLoading: boolean;
  error: string | null;
  fetchAccounts: () => void;
  setAccounts: (accounts: Account[] | ((prev: Account[]) => Account[])) => void;
  updateAccount: (id: string, updates: Partial<Account>) => Promise<void>;
  addAccount: (account: Omit<Account, 'id'>) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
}

const TABLE_NAME = 'accounts';

export const useAccountStore = create<AccountStore>((set) => ({
  accounts: [],
  isLoading: false,
  error: null,
  fetchAccounts: async () => {
    set({ isLoading: true });
    
    if (!import.meta.env.VITE_SUPABASE_URL) {
      set({ isLoading: false, error: 'Supabase config missing.' });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('dateAdded', { ascending: false });
        
      if (error) throw error;
      
      set({ accounts: data as Account[], isLoading: false, error: null });
    } catch (err: any) {
      console.error('Error fetching accounts:', err);
      set({ error: err.message, isLoading: false });
    }
  },
  setAccounts: (updater) => set((state) => ({
    accounts: typeof updater === 'function' ? updater(state.accounts) : updater
  })),
  updateAccount: async (id, updates) => {
    // Optimistic update
    set((state) => ({
      accounts: state.accounts.map(acc => acc.id === id ? { ...acc, ...updates } : acc)
    }));
    
    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .update(updates)
        .eq('id', id);
        
      if (error) throw error;
    } catch (err) {
      console.error('Failed to update account:', err);
    }
  },
  addAccount: async (account) => {
    const tempId = Date.now().toString();
    const newAccount = { ...account, id: tempId };
    
    // Optimistic update
    set((state) => ({
      accounts: [newAccount as Account, ...state.accounts]
    }));
    
    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .insert([newAccount]);
        
      if (error) throw error;
    } catch (err) {
      console.error('Failed to add account:', err);
    }
  },
  deleteAccount: async (id) => {
    // Optimistic update
    set((state) => ({
      accounts: state.accounts.filter(acc => acc.id !== id)
    }));
    
    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    } catch (err) {
      console.error('Failed to delete account:', err);
    }
  },
}));
