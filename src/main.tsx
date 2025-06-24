import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LocationProvider } from './context/LocationContext';
import { SnackbarProvider } from './context/SnackbarContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider>
  <LocationProvider>
    <App />
  </LocationProvider>
  </SnackbarProvider>
  </StrictMode>,
);
