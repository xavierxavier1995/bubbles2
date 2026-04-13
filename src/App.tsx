import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Layout from './components/Layout';
import DesignSystemDocs from './pages/DesignSystemDocs';
import DistribuidorGabriel from './pages/DistribuidorGabriel';
import Sitemap from './pages/Sitemap';

export default function App() {
  const isDev = import.meta.env.DEV;

  return (
    <Router>
      <Routes>
        <Route path="/" element={isDev ? <Navigate to="/sitemap" replace /> : <DistribuidorGabriel />} />
        <Route path="/sitemap" element={<Layout><Sitemap /></Layout>} />
        <Route path="/design-system-docs" element={<Layout><DesignSystemDocs /></Layout>} />
        <Route path="/distribuidor-gabriel" element={<DistribuidorGabriel />} />
        <Route path="/petshop" element={<Navigate to="/" replace />} />
      </Routes>
      <SpeedInsights />
    </Router>
  );
}
