import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export interface AnalyticsData {
  date: string;
  visits: number;
  clicks: number;
}

interface AnalyticsStore {
  analyticsData: AnalyticsData[];
  isLoading: boolean;
  recordVisit: () => Promise<void>;
  recordClick: () => Promise<void>;
  fetchAnalytics: (startDate: string, endDate: string) => Promise<void>;
}

const TABLE_NAME = 'analytics';

// Format YYYY-MM-DD
const getTodayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  analyticsData: [],
  isLoading: false,

  recordVisit: async () => {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL) return;
      
      const today = getTodayString();
      const hasVisited = localStorage.getItem(`visited_${today}`);
      
      if (hasVisited) return;
      
      // We do a simple select and update because we don't have an RPC function set up yet.
      // In a real high-traffic app, you'd use a Postgres function for atomic increment.
      const { data } = await supabase.from(TABLE_NAME).select('visits').eq('date', today).single();
      
      if (data) {
        await supabase.from(TABLE_NAME).update({ visits: data.visits + 1 }).eq('date', today);
      } else {
        await supabase.from(TABLE_NAME).insert([{ date: today, visits: 1, clicks: 0 }]);
      }
      
      localStorage.setItem(`visited_${today}`, 'true');
    } catch (err) {
      console.error('Failed to record visit:', err);
    }
  },

  recordClick: async () => {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL) return;
      
      const today = getTodayString();
      
      const { data } = await supabase.from(TABLE_NAME).select('clicks').eq('date', today).single();
      
      if (data) {
        await supabase.from(TABLE_NAME).update({ clicks: data.clicks + 1 }).eq('date', today);
      } else {
        await supabase.from(TABLE_NAME).insert([{ date: today, visits: 0, clicks: 1 }]);
      }
    } catch (err) {
      console.error('Failed to record click:', err);
    }
  },

  fetchAnalytics: async (startDate: string, endDate: string) => {
    set({ isLoading: true });
    try {
      if (!import.meta.env.VITE_SUPABASE_URL) {
        set({ isLoading: false });
        return;
      }
      
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true });
        
      if (error) throw error;
      
      set({ analyticsData: data as AnalyticsData[], isLoading: false });
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      set({ isLoading: false });
    }
  }
}));
