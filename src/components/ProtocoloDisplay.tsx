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
    <div className="card text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-green-100 p-3 rounded-full">
          <FileText size={32} className="text-green-600" />
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Manifestação Registrada com Sucesso!
      </h2>
      
      <p className="text-gray-600 mb-6">
        Sua manifestação foi registrada. Guarde o protocolo abaixo para acompanhar o status.
      </p>

      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
        <p className="text-sm text-gray-600 mb-2">Seu Protocolo:</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl font-mono font-bold text-blue-600">
            {formatProtocolo(protocolo)}
          </span>
          <button
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            title="Copiar protocolo"
          >
            {copied ? (
              <Check size={20} className="text-green-600" />
            ) : (
              <Copy size={20} />
            )}
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">Próximos Passos:</h3>
        <ul className="text-sm text-blue-700 space-y-1 text-left">
          <li>• Sua manifestação será analisada pela equipe responsável</li>
          <li>• Você receberá atualizações por e-mail</li>
          <li>• Use o protocolo para consultar o status a qualquer momento</li>
        </ul>
      </div>
    </div>
  );
};

export default ProtocoloDisplay;
