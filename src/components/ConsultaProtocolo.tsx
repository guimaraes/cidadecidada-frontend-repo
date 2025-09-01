import React from 'react';
import { useForm } from 'react-hook-form';
import { Search, Loader2 } from 'lucide-react';
import { Manifestacao } from '../types';
import { manifestacaoService } from '../services/api';
import toast from 'react-hot-toast';

interface ConsultaFormData {
  protocolo: string;
}

interface ConsultaProtocoloProps {
  onManifestacaoFound: (manifestacao: Manifestacao) => void;
}

const ConsultaProtocolo: React.FC<ConsultaProtocoloProps> = ({ onManifestacaoFound }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultaFormData>();

  const onSubmit = async (data: ConsultaFormData) => {
    setIsLoading(true);
    try {
      const manifestacao = await manifestacaoService.buscarPorProtocolo(data.protocolo);
      onManifestacaoFound(manifestacao);
      toast.success('Manifestação encontrada!');
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error('Protocolo não encontrado. Verifique o número e tente novamente.');
      } else {
        toast.error('Erro ao consultar protocolo. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Consultar Manifestação</h2>
        <p className="text-gray-600 text-sm">
          Digite o número do protocolo para acompanhar o status da sua manifestação
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-group">
          <label htmlFor="protocolo" className="form-label">
            Número do Protocolo *
          </label>
          <input
            id="protocolo"
            type="text"
            className={`form-input ${errors.protocolo ? 'border-red-500' : ''}`}
            placeholder="Ex: 2024-000001"
            {...register('protocolo', { 
              required: 'Protocolo é obrigatório',
              pattern: {
                value: /^\d{4}-\d{6}$/,
                message: 'Formato inválido. Use: AAAA-NNNNNN'
              }
            })}
          />
          {errors.protocolo && (
            <span className="text-red-500 text-sm mt-1">{errors.protocolo.message}</span>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Formato: AAAA-NNNNNN (ex: 2024-000001)
          </p>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary min-w-[200px]"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="loading" />
                Consultando...
              </>
            ) : (
              <>
                <Search size={20} />
                Consultar Protocolo
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsultaProtocolo;
