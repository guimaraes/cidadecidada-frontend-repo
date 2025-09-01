import React from 'react';
import { Manifestacao } from '../types';
import ConsultaProtocolo from '../components/ConsultaProtocolo';
import ManifestacaoCard from '../components/ManifestacaoCard';

const ConsultarProtocoloPage: React.FC = () => {
  const [manifestacao, setManifestacao] = React.useState<Manifestacao | null>(null);

  const handleManifestacaoFound = (manifestacao: Manifestacao) => {
    setManifestacao(manifestacao);
  };

  const handleNovaConsulta = () => {
    setManifestacao(null);
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Consultar Manifestação
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Digite o número do protocolo para acompanhar o status da sua manifestação. 
            Você recebeu este número quando registrou sua manifestação.
          </p>
        </div>

        {manifestacao ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Detalhes da Manifestação
              </h2>
              <button
                onClick={handleNovaConsulta}
                className="btn btn-outline"
              >
                Nova Consulta
              </button>
            </div>
            <ManifestacaoCard manifestacao={manifestacao} />
          </div>
        ) : (
          <ConsultaProtocolo onManifestacaoFound={handleManifestacaoFound} />
        )}
      </div>
    </div>
  );
};

export default ConsultarProtocoloPage;
