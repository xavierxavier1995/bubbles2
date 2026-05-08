import React from 'react';
import { createRoot } from 'react-dom/client';
import DistribuidorGabrielEN from './pages/DistribuidorGabrielEN';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <DistribuidorGabrielEN />
    </React.StrictMode>
  );
}
