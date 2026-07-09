import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

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
    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user || null;
      const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@faridshop.com').toLowerCase();
      const isAdmin = currentUser?.email?.toLowerCase() === adminEmail;
      
      set({ 
        user: currentUser,
        isAdmin,
        isLoading: false 
      });
    });

    // Listen for changes
    supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user || null;
      const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@faridshop.com').toLowerCase();
      const isAdmin = currentUser?.email?.toLowerCase() === adminEmail;
      
      set({ 
        user: currentUser,
        isAdmin,
        isLoading: false 
      });
    });
  }
}));
