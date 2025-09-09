import React from 'react';
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary rounded-xl shadow-md">
                <Building2 size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold">Cidade Cidadã</h3>
                <p className="text-gray-400 text-sm">Sistema de Manifestações</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Conectamos cidadãos com a administração pública através de um sistema 
              moderno e eficiente de manifestações. Sua voz é importante para nós.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={20} />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter size={20} />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={20} />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin size={20} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-sm">📝</span>
                  Nova Manifestação
                </a>
              </li>
              <li>
                <a href="/consultar" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-sm">🔍</span>
                  Consultar Protocolo
                </a>
              </li>
              <li>
                <a href="/atendente" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-sm">👥</span>
                  Painel do Atendente
                </a>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-sm">📋</span>
                  Status das Manifestações
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Rua da Cidadania, 123<br />
                    Centro - São Paulo/SP<br />
                    CEP: 01000-000
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <a href="tel:+551112345678" className="text-gray-300 hover:text-white transition-colors">
                  (11) 1234-5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <a href="mailto:contato@cidadecidada.com" className="text-gray-300 hover:text-white transition-colors">
                  contato@cidadecidada.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Cidade Cidadã. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidade
              </button>
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                Termos de Uso
              </button>
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                Ajuda
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
