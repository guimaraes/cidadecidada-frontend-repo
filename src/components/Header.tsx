import React from 'react';
import { Menu, Bell, Mail, User, RefreshCw } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Nova Manifestação';
      case '/consultar':
        return 'Consultar Protocolo';
      case '/atendente':
        return 'Painel do Atendente';
      default:
        return 'Dashboard';
    }
  };


  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left side - Menu and Title */}
      <div className="navbar-left">
        <button 
          className="menu-toggle" 
          onClick={onToggleSidebar}
        >
          <Menu size={20} />
        </button>
        <span className="page-title">{getPageTitle()}</span>
      </div>

      {/* Right side - Icons */}
      <div className="navbar-right">
        <div className="icon-group">
          <button className="icon-btn" title="Atualizar">
            <RefreshCw size={18} />
          </button>
          
          <button className="icon-btn" title="Notificações">
            <Bell size={18} />
            <span className="badge badge-warning">2</span>
          </button>
          
          <button className="icon-btn" title="Mensagens">
            <Mail size={18} />
            <span className="badge badge-danger">3</span>
          </button>
          
          <button className="icon-btn" title="Perfil">
            <User size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
