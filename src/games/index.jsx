// Rotas de /jogos (carregadas só quando o aluno abre a área de jogos)
import { Navigate, Route, Routes } from 'react-router-dom';
import Hub from './Hub.jsx';
import Episode from './Episode.jsx';
import Detective from './Detective.jsx';
import CityMission from './CityMission.jsx';
import Flash from './Flash.jsx';
import Listen from './Listen.jsx';
import Falling from './Falling.jsx';
import './games.css';

export default function Games() {
  return (
    <Routes>
      <Route index element={<Hub />} />
      <Route path="episodio/:id" element={<Episode />} />
      <Route path="detetive/:id" element={<Detective />} />
      <Route path="missao/:id" element={<CityMission />} />
      <Route path="relampago" element={<Flash />} />
      <Route path="ouvir" element={<Listen />} />
      <Route path="frases" element={<Falling />} />
      <Route path="*" element={<Navigate to="/jogos" replace />} />
    </Routes>
  );
}
