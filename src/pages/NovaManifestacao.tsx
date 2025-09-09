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
    <div className="row">
      <div className="col-md-12">
        {/* Manifestação Box */}
        <div className="box box-primary">
          <div className="box-header">
            <h3 className="box-title">Manifestação</h3>
          </div>
          <div className="box-body">
            <ManifestacaoForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default NovaManifestacaoPage;
