import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './lib/auth.jsx';
import { Spinner } from './components/ui.jsx';
import Landing from './pages/Landing.jsx';
import Auth from './pages/Auth.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Trail from './pages/Trail.jsx';
import LessonPage from './pages/LessonPage.jsx';
import Review from './pages/Review.jsx';
import Placement from './pages/Placement.jsx';
import Guide from './pages/Guide.jsx';
import Progress from './pages/Progress.jsx';
import Credits from './pages/Credits.jsx';

function Private({ children, allowNotOnboarded = false }) {
  const { session, profile, loading } = useAuth();
  const loc = useLocation();
  if (session === undefined || (session && loading)) return <Spinner />;
  if (!session) return <Navigate to="/entrar" replace state={{ from: loc.pathname }} />;
  if (profile && !profile.onboarded && !allowNotOnboarded) return <Navigate to="/bem-vindo" replace />;
  return children;
}

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/entrar" element={<Auth mode="login" />} />
        <Route path="/criar-conta" element={<Auth mode="signup" />} />
        <Route path="/redefinir-senha" element={<ResetPassword />} />
        <Route path="/creditos" element={<Credits />} />
        <Route path="/bem-vindo" element={<Private allowNotOnboarded><Onboarding /></Private>} />
        <Route path="/nivelamento" element={<Private allowNotOnboarded><Placement /></Private>} />
        <Route path="/aprender" element={<Private><Trail /></Private>} />
        <Route path="/licao/:id" element={<Private><LessonPage /></Private>} />
        <Route path="/revisao" element={<Private><Review /></Private>} />
        <Route path="/guia" element={<Private><Guide /></Private>} />
        <Route path="/guia/:unitId" element={<Private><Guide /></Private>} />
        <Route path="/progresso" element={<Private><Progress /></Private>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
