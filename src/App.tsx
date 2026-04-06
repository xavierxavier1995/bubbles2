import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DesignSystemDocs from './pages/DesignSystemDocs';
import DistribuidorGabriel from './pages/DistribuidorGabriel';
import Sitemap from './pages/Sitemap';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/sitemap" replace />} />
        <Route path="/sitemap" element={<Layout><Sitemap /></Layout>} />
        <Route path="/design-system-docs" element={<Layout><DesignSystemDocs /></Layout>} />
        <Route path="/distribuidor-gabriel" element={<DistribuidorGabriel />} />
      </Routes>
    </Router>
  );
}
