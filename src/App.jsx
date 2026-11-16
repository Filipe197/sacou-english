import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useAuth } from './lib/auth.jsx';
import { Spinner } from './components/ui.jsx';
import UpdateManager from './components/UpdateManager.jsx';
import Novidades from './components/Novidades.jsx';
import AppBadge from './components/AppBadge.jsx';
import Landing from './pages/Landing.jsx';
import Auth from './pages/Auth.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Trail from './pages/Trail.jsx';
import LessonPage from './pages/LessonPage.jsx';
import Review from './pages/Review.jsx';
import Practice from './pages/Practice.jsx';
import Placement from './pages/Placement.jsx';
import Guide from './pages/Guide.jsx';
import Progress from './pages/Progress.jsx';
import Credits from './pages/Credits.jsx';
import Admin from './pages/Admin.jsx';
const Notebook = lazy(() => import('./pages/Notebook.jsx'));
const Conversation = lazy(() => import('./pages/Conversation.jsx'));
const Headphones = lazy(() => import('./pages/Headphones.jsx'));
const Classes = lazy(() => import('./pages/Classes.jsx'));
const Games = lazy(() => import('./games/index.jsx'));

function Private({ children, allowNotOnboarded = false }) {
  const { session, profile, loading } = useAuth();
  const loc = useLocation();
  if (session === undefined || (session && loading)) return <Spinner />;
  if (!session) return <Navigate to="/entrar" replace state={{ from: loc.pathname }} />;
  if (profile && !profile.onboarded && !allowNotOnboarded) return <Navigate to="/bem-vindo" replace />;
  return children;
}

// Remonta a lição ao trocar de id (recarrega o progresso e zera o estado)
function LessonByKey() { const { id } = useParams(); return <LessonPage key={id} />; }

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollTop />
      <UpdateManager />
      <Novidades />
      <AppBadge />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/entrar" element={<Auth mode="login" />} />
        <Route path="/criar-conta" element={<Auth mode="signup" />} />
        <Route path="/redefinir-senha" element={<ResetPassword />} />
        <Route path="/creditos" element={<Credits />} />
        <Route path="/bem-vindo" element={<Private allowNotOnboarded><Onboarding /></Private>} />
        <Route path="/nivelamento" element={<Private allowNotOnboarded><Placement /></Private>} />
        <Route path="/aprender" element={<Private><Trail /></Private>} />
        <Route path="/licao/:id" element={<Private><LessonByKey /></Private>} />
        <Route path="/revisao" element={<Private><Review /></Private>} />
        <Route path="/praticar" element={<Private><Practice /></Private>} />
        <Route path="/guia" element={<Private><Guide /></Private>} />
        <Route path="/guia/:unitId" element={<Private><Guide /></Private>} />
        <Route path="/caderno" element={<Private><Suspense fallback={<Spinner />}><Notebook /></Suspense></Private>} />
        <Route path="/caderno/:id" element={<Private><Suspense fallback={<Spinner />}><Notebook /></Suspense></Private>} />
        <Route path="/conversar" element={<Private><Suspense fallback={<Spinner />}><Conversation /></Suspense></Private>} />
        <Route path="/fone" element={<Private><Suspense fallback={<Spinner />}><Headphones /></Suspense></Private>} />
        <Route path="/turmas" element={<Private><Suspense fallback={<Spinner />}><Classes /></Suspense></Private>} />
        <Route path="/turmas/entrar/:code" element={<Private><Suspense fallback={<Spinner />}><Classes /></Suspense></Private>} />
        <Route path="/jogos/*" element={<Private><Suspense fallback={<Spinner />}><Games /></Suspense></Private>} />
        <Route path="/progresso" element={<Private><Progress /></Private>} />
        <Route path="/admin" element={<Private><Admin /></Private>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
