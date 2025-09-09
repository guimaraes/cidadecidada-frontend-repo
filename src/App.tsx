import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NovaManifestacaoPage from './pages/NovaManifestacao';
import ConsultarProtocoloPage from './pages/ConsultarProtocolo';
import PainelAtendentePage from './pages/PainelAtendente';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="wrapper">
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <div className="content-wrapper" style={{ marginLeft: sidebarCollapsed ? '0' : '250px' }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Sistema de Manifestações</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">
                    {location.pathname === '/' ? 'Nova Manifestação' : 
                     location.pathname === '/consultar' ? 'Consultar Protocolo' :
                     location.pathname === '/atendente' ? 'Painel do Atendente' : 'Dashboard'}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <Routes>
              <Route path="/" element={<NovaManifestacaoPage />} />
              <Route path="/consultar" element={<ConsultarProtocoloPage />} />
              <Route path="/atendente" element={<PainelAtendentePage />} />
            </Routes>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
