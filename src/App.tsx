/**
 * App.tsx — Root router + AppLayout wrapper
 * ─────────────────────────────────────────
 * Wraps all pages in AppLayout (TopNav + BottomNav).
 * React Router v6 with nested layout pattern.
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@components/layout';
import { HomePage }      from '@pages/HomePage';
import { CatalogPage }   from '@pages/CatalogPage';
import { TutorialPage }  from '@pages/TutorialPage';
import { CommunityPage } from '@pages/CommunityPage';
import { AboutPage }     from '@pages/AboutPage';
import { AdminPage }     from '@pages/AdminPage';
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
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
