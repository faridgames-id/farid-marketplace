import { create } from 'zustand';
import type { Account } from '../types/account';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

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

const ACCOUNTS_COLLECTION = 'accounts';

export const useAccountStore = create<AccountStore>((set, get) => ({
  accounts: [],
  isLoading: false,
  error: null,
  fetchAccounts: () => {
    set({ isLoading: true });
    try {
      if (!import.meta.env.VITE_FIREBASE_API_KEY || !db) {
        // Fallback or empty if no firebase config
        set({ isLoading: false, error: 'Firebase config missing. Please update .env.local' });
        return;
      }
      const colRef = collection(db, ACCOUNTS_COLLECTION);
      onSnapshot(colRef, (snapshot) => {
        const accs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Account));
        set({ accounts: accs, isLoading: false, error: null });
      }, (err) => {
        console.error('Error fetching accounts:', err);
        set({ error: err.message, isLoading: false });
      });
    } catch (err: any) {
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
      if (!db) return; // Silent return if no DB, since we optimistically updated
      const docRef = doc(db, ACCOUNTS_COLLECTION, id);
      await updateDoc(docRef, updates);
    } catch (err) {
      console.error('Failed to update account:', err);
      // We don't rollback here because if it's offline we still want the local state to persist
    }
  },
  addAccount: async (account) => {
    const tempId = Date.now().toString();
    // Optimistic update
    set((state) => ({
      accounts: [{ ...account, id: tempId } as Account, ...state.accounts]
    }));
    
    try {
      if (!db) return;
      const colRef = collection(db, ACCOUNTS_COLLECTION);
      await addDoc(colRef, account);
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
      if (!db) return;
      const docRef = doc(db, ACCOUNTS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error('Failed to delete account:', err);
    }
  },
}));
