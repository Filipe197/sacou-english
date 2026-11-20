import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './lib/auth.jsx';
import { installErrorReporting } from './lib/errors.js';
import { loadContent } from './lib/content.js';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './styles.css';
import './notebook.css';
import './ai.css';
import { NATIVE } from './lib/native.js';

installErrorReporting();

// App Android: voz, fala, botão Voltar e login do Google nativos (src/lib/native-app.js)
if (NATIVE) import('./lib/native-app.js');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary><App /></ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Exercícios das lições: baixam logo depois da abertura, sem atrasar a trilha
loadContent().catch(() => { /* a tela que precisar mostra o aviso e tenta de novo */ });

// App instalável (PWA): registra o service worker só na versão publicada
if (!NATIVE && 'serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}
