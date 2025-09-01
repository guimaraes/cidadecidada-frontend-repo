import React from 'react';
import { NovaManifestacao } from '../types';
import { manifestacaoService } from '../services/api';
import ManifestacaoForm from '../components/ManifestacaoForm';
import ProtocoloDisplay from '../components/ProtocoloDisplay';
import toast from 'react-hot-toast';

const NovaManifestacaoPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [protocoloGerado, setProtocoloGerado] = React.useState<string | null>(null);

  const handleSubmit = async (data: NovaManifestacao) => {
    setIsLoading(true);
    try {
      const response = await manifestacaoService.criar(data);
      setProtocoloGerado(response.protocolo);
      toast.success('Manifestação registrada com sucesso!');
    } catch (error: any) {
      console.error('Erro ao criar manifestação:', error);
      toast.error('Erro ao registrar manifestação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNovaManifestacao = () => {
    setProtocoloGerado(null);
  };

  if (protocoloGerado) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <ProtocoloDisplay protocolo={protocoloGerado} />
          <div className="text-center mt-6">
            <button
              onClick={handleNovaManifestacao}
              className="btn btn-outline"
            >
              Registrar Nova Manifestação
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Nova Manifestação
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Registre sua manifestação para que possamos atender você da melhor forma possível. 
            Preencha todos os campos obrigatórios e aguarde o protocolo de acompanhamento.
          </p>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Dados da Manifestação</h2>
            <p className="text-gray-600 text-sm">
              Preencha os dados abaixo para registrar sua manifestação
            </p>
          </div>

          <ManifestacaoForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default NovaManifestacaoPage;
