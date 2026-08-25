import { useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import DistribuidorGabriel from './pages/DistribuidorGabriel';
import PetSouthDistribuidor from './pages/PetSouthDistribuidor';
import { pushPageView } from './services/tracking';

function PageTracker() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const path = '/#' + location.pathname + (location.search || '');
    pushPageView(path);
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  return (
    <Router>
      <PageTracker />
      <Routes>
        <Route path="/" element={<DistribuidorGabriel />} />
        <Route path="/distribuidor-gabriel" element={<DistribuidorGabriel />} />
        <Route path="/pet-south" element={<PetSouthDistribuidor />} />
        <Route path="/pet-south/" element={<PetSouthDistribuidor />} />
        <Route path="/pet-soulth" element={<Navigate to="/pet-south" replace />} />
        <Route path="/pet-soulth/" element={<Navigate to="/pet-south" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SpeedInsights />
    </Router>
  );
}
