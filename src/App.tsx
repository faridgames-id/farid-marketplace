/**
 * App.tsx — Root router + AppLayout wrapper
 * ─────────────────────────────────────────
 * Wraps all pages in AppLayout (TopNav + BottomNav).
 * React Router v6 with nested layout pattern.
 */

import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@components/layout';

// Lazy loaded pages for better performance on Android/mobile
const HomePage      = lazy(() => import('@pages/HomePage').then(m => ({ default: m.HomePage })));
const CatalogPage   = lazy(() => import('@pages/CatalogPage').then(m => ({ default: m.CatalogPage })));
const TutorialPage  = lazy(() => import('@pages/TutorialPage').then(m => ({ default: m.TutorialPage })));
const CommunityPage = lazy(() => import('@pages/CommunityPage').then(m => ({ default: m.CommunityPage })));
const AboutPage     = lazy(() => import('@pages/AboutPage').then(m => ({ default: m.AboutPage })));
const AdminPage     = lazy(() => import('@pages/AdminPage').then(m => ({ default: m.AdminPage })));
import { useAuthStore } from './stores/authStore';
import { useAccountStore } from './store/useAccountStore';
import { useAnalyticsStore } from './store/useAnalyticsStore';

function App() {
  const initAuthListener = useAuthStore(state => state.initAuthListener);
  const fetchAccounts = useAccountStore(state => state.fetchAccounts);
  const recordVisit = useAnalyticsStore(state => state.recordVisit);

  useEffect(() => {
    initAuthListener();
    fetchAccounts();
    recordVisit();
  }, [initAuthListener, fetchAccounts, recordVisit]);

  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={
          <div className="flex flex-1 w-full h-[60vh] items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/"          element={<HomePage />}      />
            <Route path="/catalog"   element={<CatalogPage />}   />
            <Route path="/tutorial"  element={<TutorialPage />}  />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/about"     element={<AboutPage />}     />
            <Route path="/admin"     element={<AdminPage />}     />
            {/* Fallback — redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
