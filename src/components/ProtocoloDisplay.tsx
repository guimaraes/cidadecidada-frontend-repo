import React from 'react';
import { Copy, Check, FileText } from 'lucide-react';
import { formatProtocolo } from '../utils/constants';

interface ProtocoloDisplayProps {
  protocolo: string;
}

const ProtocoloDisplay: React.FC<ProtocoloDisplayProps> = ({ protocolo }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(protocolo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar protocolo:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-success-50 via-white to-primary-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-success rounded-full mb-6 animate-pulse">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="text-4xl">✅</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Manifestação{' '}
            <span className="bg-gradient-to-r from-success to-success-dark bg-clip-text text-transparent">
              Registrada!
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Sua manifestação foi registrada com sucesso. Guarde o protocolo abaixo para acompanhar o status.
          </p>
        </div>

        {/* Protocol Card */}
        <div className="card shadow-2xl border-2 border-success-200 mb-8">
          <div className="card-header bg-gradient-to-r from-success-50 to-white text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
                <FileText size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Seu Protocolo</h2>
            </div>
            <p className="text-gray-600">Use este número para acompanhar sua manifestação</p>
          </div>
          
          <div className="card-body text-center">
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-8 mb-6">
              <p className="text-sm text-gray-600 mb-4 font-medium">Número do Protocolo:</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-3xl font-mono font-bold text-primary bg-white px-6 py-3 rounded-xl shadow-sm border">
                  {formatProtocolo(protocolo)}
                </span>
                <button
                  onClick={handleCopy}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    copied 
                      ? 'bg-success text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-primary hover:text-white hover:shadow-md'
                  }`}
                  title="Copiar protocolo"
                >
                  {copied ? (
                    <Check size={24} />
                  ) : (
                    <Copy size={24} />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-success text-sm mt-3 font-medium">
                  ✅ Protocolo copiado para a área de transferência!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="card shadow-lg">
          <div className="card-header bg-gradient-to-r from-primary-50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Próximos Passos</h3>
            </div>
          </div>
          
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⏰</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Análise</h4>
                <p className="text-sm text-gray-600">
                  Sua manifestação será analisada pela equipe responsável em até 24h
                </p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📧</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Notificações</h4>
                <p className="text-sm text-gray-600">
                  Você receberá atualizações por e-mail sobre o andamento
                </p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔍</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Acompanhamento</h4>
                <p className="text-sm text-gray-600">
                  Use o protocolo para consultar o status a qualquer momento
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Precisa de ajuda? Nossa equipe está pronta para ajudar!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-outline">
              <span className="text-lg">📞</span>
              (11) 1234-5678
            </button>
            <button className="btn btn-outline">
              <span className="text-lg">✉️</span>
              contato@cidadecidada.com
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtocoloDisplay;
