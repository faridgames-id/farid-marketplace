import { create } from 'zustand';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, increment, collection, query, where, getDocs, orderBy } from 'firebase/firestore';

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

const ANALYTICS_COLLECTION = 'analytics';

// Format YYYY-MM-DD
const getTodayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const useAnalyticsStore = create<AnalyticsStore>((set, get) => ({
  analyticsData: [],
  isLoading: false,

  recordVisit: async () => {
    try {
      if (!db) return; // Silent fail if firebase not configured
      
      const today = getTodayString();
      const hasVisited = localStorage.getItem(`visited_${today}`);
      
      // If already visited today on this device, skip to avoid spam
      if (hasVisited) return;
      
      const docRef = doc(db, ANALYTICS_COLLECTION, today);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, { visits: increment(1) });
      } else {
        await setDoc(docRef, { date: today, visits: 1, clicks: 0, timestamp: new Date() });
      }
      
      localStorage.setItem(`visited_${today}`, 'true');
    } catch (err) {
      console.error('Failed to record visit:', err);
    }
  },

  recordClick: async () => {
    try {
      if (!db) return; // Silent fail if firebase not configured
      
      const today = getTodayString();
      const docRef = doc(db, ANALYTICS_COLLECTION, today);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, { clicks: increment(1) });
      } else {
        await setDoc(docRef, { date: today, visits: 0, clicks: 1, timestamp: new Date() });
      }
    } catch (err) {
      console.error('Failed to record click:', err);
    }
  },

  fetchAnalytics: async (startDate: string, endDate: string) => {
    set({ isLoading: true });
    try {
      if (!db) {
        set({ isLoading: false });
        return;
      }
      
      const colRef = collection(db, ANALYTICS_COLLECTION);
      const q = query(
        colRef, 
        where('date', '>=', startDate), 
        where('date', '<=', endDate),
        orderBy('date', 'asc')
      );
      
      const snapshot = await getDocs(q);
      const data: AnalyticsData[] = [];
      
      snapshot.forEach(doc => {
        data.push(doc.data() as AnalyticsData);
      });
      
      set({ analyticsData: data, isLoading: false });
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      set({ isLoading: false });
    }
  }
}));
