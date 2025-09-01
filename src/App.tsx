import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NovaManifestacaoPage from './pages/NovaManifestacao';
import ConsultarProtocoloPage from './pages/ConsultarProtocolo';
import PainelAtendentePage from './pages/PainelAtendente';
import MockModeIndicator from './components/MockModeIndicator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<NovaManifestacaoPage />} />
          <Route path="/consultar" element={<ConsultarProtocoloPage />} />
          <Route path="/atendente" element={<PainelAtendentePage />} />
        </Routes>
      </main>
      <MockModeIndicator />
    </div>
  );
};

export default App;
