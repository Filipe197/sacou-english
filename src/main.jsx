import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './lib/auth.jsx';
import { installErrorReporting } from './lib/errors.js';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './styles.css';
import './notebook.css';
import './ai.css';

installErrorReporting();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary><App /></ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// App instalável (PWA): registra o service worker só na versão publicada
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}
