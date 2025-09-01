import React from 'react';
import { Manifestacao } from '../types';
import { 
  TIPOS_MANIFESTACAO, 
  STATUS_MANIFESTACAO, 
  STATUS_COLORS, 
  TIPO_COLORS,
  formatDate,
  formatProtocolo 
} from '../utils/constants';

interface ManifestacaoCardProps {
  manifestacao: Manifestacao;
  showActions?: boolean;
  onStatusUpdate?: (id: number, status: string, observacoes?: string) => void;
}

const ManifestacaoCard: React.FC<ManifestacaoCardProps> = ({ 
  manifestacao, 
  showActions = false,
  onStatusUpdate 
}) => {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [showObservacoes, setShowObservacoes] = React.useState(false);
  const [observacoes, setObservacoes] = React.useState(manifestacao.observacoes || '');

  const handleStatusUpdate = async (status: string) => {
    if (!onStatusUpdate) return;
    
    setIsUpdating(true);
    try {
      await onStatusUpdate(manifestacao.id, status, observacoes);
      setShowObservacoes(false);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Protocolo: {formatProtocolo(manifestacao.protocolo)}
          </h3>
          <p className="text-sm text-gray-600">
            Criado em: {formatDate(manifestacao.dataCriacao)}
          </p>
        </div>
        <div className="flex gap-2">
          <span className={`badge ${STATUS_COLORS[manifestacao.status]}`}>
            {STATUS_MANIFESTACAO[manifestacao.status]}
          </span>
          <span className={`badge ${TIPO_COLORS[manifestacao.tipo]}`}>
            {TIPOS_MANIFESTACAO[manifestacao.tipo]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-1">Solicitante</h4>
          <p className="text-sm text-gray-600">{manifestacao.nomeSolicitante}</p>
          <p className="text-sm text-gray-600">{manifestacao.email}</p>
          <p className="text-sm text-gray-600">{manifestacao.telefone}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-700 mb-1">Assunto</h4>
          <p className="text-sm text-gray-600">{manifestacao.assunto}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-1">Descrição</h4>
        <p className="text-sm text-gray-600 whitespace-pre-wrap">
          {manifestacao.descricao}
        </p>
      </div>

      {manifestacao.observacoes && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-1">Observações</h4>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">
            {manifestacao.observacoes}
          </p>
        </div>
      )}

      {manifestacao.dataAtualizacao && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-1">Última Atualização</h4>
          <p className="text-sm text-gray-600">
            {formatDate(manifestacao.dataAtualizacao)}
          </p>
        </div>
      )}

      {showActions && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => handleStatusUpdate('EM_ANALISE')}
              disabled={isUpdating || manifestacao.status === 'EM_ANALISE'}
              className="btn btn-secondary btn-sm"
            >
              Em Análise
            </button>
            <button
              onClick={() => handleStatusUpdate('EM_ANDAMENTO')}
              disabled={isUpdating || manifestacao.status === 'EM_ANDAMENTO'}
              className="btn btn-secondary btn-sm"
            >
              Em Andamento
            </button>
            <button
              onClick={() => handleStatusUpdate('RESOLVIDA')}
              disabled={isUpdating || manifestacao.status === 'RESOLVIDA'}
              className="btn btn-success btn-sm"
            >
              Resolver
            </button>
            <button
              onClick={() => handleStatusUpdate('CANCELADA')}
              disabled={isUpdating || manifestacao.status === 'CANCELADA'}
              className="btn btn-danger btn-sm"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleStatusUpdate('ARQUIVADA')}
              disabled={isUpdating || manifestacao.status === 'ARQUIVADA'}
              className="btn btn-secondary btn-sm"
            >
              Arquivar
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setShowObservacoes(!showObservacoes)}
              className="btn btn-outline btn-sm"
            >
              {showObservacoes ? 'Ocultar' : 'Adicionar'} Observações
            </button>
            
            {showObservacoes && (
              <div className="space-y-2">
                <textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Digite observações sobre esta manifestação..."
                  className="form-textarea"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowObservacoes(false)}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => setObservacoes(manifestacao.observacoes || '')}
                    className="btn btn-outline btn-sm"
                  >
                    Restaurar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManifestacaoCard;
