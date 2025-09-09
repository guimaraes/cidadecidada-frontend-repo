import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Users, 
  Settings, 
  Mail,
  HelpCircle,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      href: '/dashboard',
      active: location.pathname === '/dashboard'
    },
    {
      id: 'nova-manifestacao',
      label: 'Nova Manifestação',
      icon: FileText,
      href: '/nova-manifestacao',
      active: location.pathname === '/nova-manifestacao'
    },
    {
      id: 'consultar-protocolo',
      label: 'Consultar Protocolo',
      icon: Search,
      href: '/consultar',
      active: location.pathname === '/consultar'
    },
    {
      id: 'painel-atendente',
      label: 'Painel do Atendente',
      icon: Users,
      href: '/atendente',
      active: location.pathname === '/atendente'
    }
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapse' : ''}`}>
      {/* Logo */}
      <div className="sidebar-brand">
        <div className="brand-link">
          <div className="brand-text">
            <span className="brand-text-primary">Cidade Cidadã</span>
            <span className="brand-text-secondary">Sistema de Manifestações</span>
          </div>
        </div>
      </div>

      {/* User Panel */}
      <div className="user-panel">
        <div className="pull-left image">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Users size={20} className="text-white" />
          </div>
        </div>
        <div className="pull-left info">
          <p className="text-white text-sm font-medium">Administrador</p>
          <span className="text-gray-300 text-xs">
            <span className="w-2 h-2 bg-success rounded-full inline-block mr-1"></span>
            Online
          </span>
        </div>
      </div>

      {/* Sidebar Menu */}
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.id} className={item.active ? 'active' : ''}>
            <Link to={item.href}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}

        {/* Help Section */}
        <li className="header">SUPORTE</li>
        <li>
          <button className="sidebar-link">
            <HelpCircle size={18} />
            <span>Ajuda</span>
          </button>
        </li>
        <li>
          <button className="sidebar-link">
            <Mail size={18} />
            <span>Contato</span>
          </button>
        </li>
        <li>
          <button className="sidebar-link">
            <Settings size={18} />
            <span>Configurações</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
