import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { initMonitoring, installFetchFailureMonitoring } from './utils/monitoring.ts';

initMonitoring();
installFetchFailureMonitoring();

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
