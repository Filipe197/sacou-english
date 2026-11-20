import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useAuth } from './lib/auth.jsx';
import { Spinner } from './components/ui.jsx';
import { useContentReady } from './lib/content.js';
import UpdateManager from './components/UpdateManager.jsx';
import Novidades from './components/Novidades.jsx';
import AppBadge from './components/AppBadge.jsx';
import Landing from './pages/Landing.jsx';
import Auth from './pages/Auth.jsx';
const ResetPassword = lazy(() => import('./pages/ResetPassword.jsx'));
const Onboarding = lazy(() => import('./pages/Onboarding.jsx'));
import Trail from './pages/Trail.jsx';
const LessonPage = lazy(() => import('./pages/LessonPage.jsx'));
const Review = lazy(() => import('./pages/Review.jsx'));
const Practice = lazy(() => import('./pages/Practice.jsx'));
const Placement = lazy(() => import('./pages/Placement.jsx'));
const Guide = lazy(() => import('./pages/Guide.jsx'));
const Progress = lazy(() => import('./pages/Progress.jsx'));
const Credits = lazy(() => import('./pages/Credits.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Support = lazy(() => import('./pages/Support.jsx'));
const Privacy = lazy(() => import('./pages/Privacy.jsx').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Privacy.jsx').then(m => ({ default: m.Terms })));
import { ThemeManager } from './lib/theme.js';
const Admin = lazy(() => import('./pages/Admin.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const Notebook = lazy(() => import('./pages/Notebook.jsx'));
const Conversation = lazy(() => import('./pages/Conversation.jsx'));
const Aula = lazy(() => import('./pages/Aula.jsx'));
const Desafio = lazy(() => import('./pages/Desafio.jsx'));
const Duvidas = lazy(() => import('./pages/Duvidas.jsx'));
const Exam = lazy(() => import('./pages/Exam.jsx'));
const Ranking = lazy(() => import('./pages/Ranking.jsx'));
const Headphones = lazy(() => import('./pages/Headphones.jsx'));
const Classes = lazy(() => import('./pages/Classes.jsx'));
const Games = lazy(() => import('./games/index.jsx'));

function Private({ children, allowNotOnboarded = false, light = false }) {
  const { session, profile, loading, profileError, refreshProfile, signOut } = useAuth();
  const loc = useLocation();
  if (session === undefined || (session && loading)) return <Spinner />;
  if (!session) return <Navigate to="/entrar" replace state={{ from: loc.pathname }} />;
  if (profileError) return <main className="card auth-recovery">
    <h1>Não foi possível abrir seu perfil</h1>
    <p role="alert">{profileError}</p>
    <div className="auth-recovery-actions"><button className="btn btn-violet" onClick={refreshProfile}>Tentar novamente</button>
    <button className="btn btn-out" onClick={signOut}>Sair da conta</button></div>
  </main>;
  if (profile && !profile.onboarded && !allowNotOnboarded) return <Navigate to="/bem-vindo" replace />;
  return light ? children : <ContentGate>{children}</ContentGate>;
}

// Telas que usam os exercícios esperam eles chegarem (src/lib/content.js → loadContent).
// A trilha, o progresso e os guias abrem na hora, só com o esqueleto das unidades.
function ContentGate({ children }) {
  const ok = useContentReady();
  if (ok === 'erro') return <main className="card auth-recovery">
    <h1>Não conseguimos carregar as lições</h1>
    <p role="alert">Verifique a conexão com a internet e tente de novo.</p>
    <div className="auth-recovery-actions"><button className="btn btn-violet" onClick={() => window.location.reload()}>Tentar novamente</button></div>
  </main>;
  return ok ? children : <Spinner />;
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
      <ThemeManager />
      <UpdateManager />
      <Novidades />
      <AppBadge />
      <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/entrar" element={<Auth mode="login" />} />
        <Route path="/criar-conta" element={<Auth mode="signup" />} />
        <Route path="/redefinir-senha" element={<ResetPassword />} />
        <Route path="/creditos" element={<Credits />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/apoie" element={<Support />} />
        <Route path="/privacidade" element={<Privacy />} />
        <Route path="/termos" element={<Terms />} />
        <Route path="/bem-vindo" element={<Private allowNotOnboarded><Onboarding /></Private>} />
        <Route path="/nivelamento" element={<Private allowNotOnboarded><Placement /></Private>} />
        <Route path="/aprender" element={<Private light><Trail /></Private>} />
        <Route path="/licao/:id" element={<Private><LessonByKey /></Private>} />
        <Route path="/revisao" element={<Private><Review /></Private>} />
        <Route path="/praticar" element={<Private><Practice /></Private>} />
        <Route path="/guia" element={<Private light><Guide /></Private>} />
        <Route path="/guia/:unitId" element={<Private light><Guide /></Private>} />
        <Route path="/caderno" element={<Private><Suspense fallback={<Spinner />}><Notebook /></Suspense></Private>} />
        <Route path="/caderno/:id" element={<Private><Suspense fallback={<Spinner />}><Notebook /></Suspense></Private>} />
        <Route path="/conversar" element={<Private><Suspense fallback={<Spinner />}><Conversation /></Suspense></Private>} />
        <Route path="/aula" element={<Private><Suspense fallback={<Spinner />}><Aula /></Suspense></Private>} />
        <Route path="/desafio/:unitId" element={<Private><Suspense fallback={<Spinner />}><Desafio /></Suspense></Private>} />
        <Route path="/ranking" element={<Private light><Suspense fallback={<Spinner />}><Ranking /></Suspense></Private>} />
        <Route path="/prova/:kind/:id" element={<Private><Suspense fallback={<Spinner />}><Exam /></Suspense></Private>} />
        <Route path="/duvidas" element={<Private light><Suspense fallback={<Spinner />}><Duvidas /></Suspense></Private>} />
        <Route path="/fone" element={<Private><Suspense fallback={<Spinner />}><Headphones /></Suspense></Private>} />
        <Route path="/turmas" element={<Private light><Suspense fallback={<Spinner />}><Classes /></Suspense></Private>} />
        <Route path="/turmas/entrar/:code" element={<Private light><Suspense fallback={<Spinner />}><Classes /></Suspense></Private>} />
        <Route path="/jogos/*" element={<Private><Suspense fallback={<Spinner />}><Games /></Suspense></Private>} />
        <Route path="/progresso" element={<Private light><Progress /></Private>} />
        <Route path="/perfil" element={<Private light><Profile /></Private>} />
        <Route path="/admin" element={<Private><Admin /></Private>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
    </>
  );
}
