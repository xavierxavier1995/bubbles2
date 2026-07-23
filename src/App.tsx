import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import DistribuidorGabriel from './pages/DistribuidorGabriel';
import PetSouthDistribuidor from './pages/PetSouthDistribuidor';
import { Globe, Sparkles } from 'lucide-react';

function RouteSwitcher() {
  const location = useLocation();
  const isPetSouth = location.pathname.includes('pet-south');

  return (
    <div className="fixed bottom-4 right-4 z-[999] flex items-center gap-1.5 bg-[#0D0D0D]/95 border border-[#F4CDD4]/40 p-1.5 rounded-full shadow-[0_0_25px_rgba(244,205,212,0.2)] backdrop-blur-md text-xs font-bold text-white">
      <Link
        to="/"
        className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
          !isPetSouth 
            ? 'bg-[#F4CDD4] text-[#080808] font-black shadow-sm' 
            : 'hover:bg-white/10 text-white/70'
        }`}
      >
        <Globe size={13} />
        <span>Página Principal</span>
      </Link>
      <Link
        to="/pet-south"
        className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
          isPetSouth 
            ? 'bg-[#F4CDD4] text-[#080808] font-black shadow-sm' 
            : 'hover:bg-white/10 text-white/70'
        }`}
      >
        <Sparkles size={13} />
        <span>/pet-south</span>
      </Link>
    </div>
  );
}

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
      <RouteSwitcher />
      <SpeedInsights />
    </Router>
  );
}
