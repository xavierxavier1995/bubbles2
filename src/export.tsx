import React from 'react';
import { createRoot } from 'react-dom/client';
import DistribuidorGabriel from './pages/DistribuidorGabriel';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <DistribuidorGabriel />
    </React.StrictMode>
  );
}
