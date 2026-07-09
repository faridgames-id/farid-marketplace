import { create } from 'zustand';
import { auth } from '../lib/firebase';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  initAuthListener: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  isLoading: true,
  initAuthListener: () => {
    if (!auth) {
      set({ isLoading: false, isAdmin: false });
      console.warn("Firebase Auth is not initialized.");
      return;
    }
    
    onAuthStateChanged(auth, (user) => {
      // Set to admin if their email matches VITE_ADMIN_EMAIL
      // The default is set to whatever the user configures in .env.local
      const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@faridshop.com').toLowerCase();
      const isAdmin = user?.email?.toLowerCase() === adminEmail;
      
      set({ 
        user, 
        isAdmin,
        isLoading: false 
      });
    });
  },
}));
