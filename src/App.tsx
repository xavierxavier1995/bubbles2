import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import DistribuidorGabriel from './pages/DistribuidorGabriel';
import PetSouthDistribuidor from './pages/PetSouthDistribuidor';

export default function App() {
  return (
    <Router>
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
