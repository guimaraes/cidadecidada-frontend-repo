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
    <div className="box box-success">
      {/* Header com Protocolo */}
      <div className="box-header">
        <h3 className="box-title">
          <i className="fa fa-file-text-o text-primary"></i> Protocolo: {formatProtocolo(manifestacao.protocolo)}
        </h3>
      </div>

      <div className="box-body">
        {/* Informações do Solicitante */}
        <div className="row">
          <div className="col-md-8">
            <div className="box box-info">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-user text-blue"></i> Informações do Solicitante
                </h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label">
                        <i className="fa fa-user text-primary"></i> <strong>Nome:</strong>
                      </label>
                      <p className="form-control-static" style={{marginTop: '5px', fontSize: '16px'}}>
                        {manifestacao.nomeSolicitante}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label">
                        <i className="fa fa-tag text-success"></i> <strong>Assunto:</strong>
                      </label>
                      <p className="form-control-static" style={{marginTop: '5px', fontSize: '16px'}}>
                        {manifestacao.assunto}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label">
                        <i className="fa fa-envelope text-warning"></i> <strong>E-mail:</strong>
                      </label>
                      <p className="form-control-static" style={{marginTop: '5px', fontSize: '16px'}}>
                        {manifestacao.email}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label">
                        <i className="fa fa-phone text-info"></i> <strong>Telefone:</strong>
                      </label>
                      <p className="form-control-static" style={{marginTop: '5px', fontSize: '16px'}}>
                        {manifestacao.telefone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box box-success">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-info-circle text-green"></i> Resumo
                </h3>
              </div>
              <div className="box-body">
                <div className="form-group">
                  <label className="control-label">
                    <i className="fa fa-calendar text-primary"></i> <strong>Data de Criação:</strong>
                  </label>
                  <p className="form-control-static" style={{marginTop: '5px', fontSize: '16px'}}>
                    {formatDate(manifestacao.dataCriacao)}
                  </p>
                </div>
                <div className="form-group">
                  <label className="control-label">
                    <i className="fa fa-flag text-warning"></i> <strong>Status:</strong>
                  </label>
                  <p className="form-control-static" style={{marginTop: '5px'}}>
                    <span className={`label ${STATUS_COLORS[manifestacao.status]} label-lg`}>
                      {STATUS_MANIFESTACAO[manifestacao.status]}
                    </span>
                  </p>
                </div>
                <div className="form-group">
                  <label className="control-label">
                    <i className="fa fa-tag text-info"></i> <strong>Tipo:</strong>
                  </label>
                  <p className="form-control-static" style={{marginTop: '5px'}}>
                    <span className={`label ${TIPO_COLORS[manifestacao.tipo]} label-lg`}>
                      {TIPOS_MANIFESTACAO[manifestacao.tipo]}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="callout callout-info">
          <h4><i className="icon fa fa-info"></i> Descrição da Manifestação</h4>
          <p className="text-justify" style={{lineHeight: '1.6', fontSize: '14px'}}>
            {manifestacao.descricao}
          </p>
        </div>

        {/* Observações */}
        {manifestacao.observacoes && (
          <div className="callout callout-warning">
            <h4><i className="icon fa fa-comment"></i> Observações</h4>
            <p className="text-justify" style={{lineHeight: '1.6', fontSize: '14px'}}>
              {manifestacao.observacoes}
            </p>
          </div>
        )}

        {/* Última Atualização */}
        {manifestacao.dataAtualizacao && (
          <div className="callout callout-success">
            <h4><i className="icon fa fa-clock-o"></i> Última Atualização</h4>
            <p style={{fontSize: '14px', margin: 0}}>
              {formatDate(manifestacao.dataAtualizacao)}
            </p>
          </div>
        )}

        {/* Ações para Atendentes */}
        {showActions && (
          <div className="box-footer">
            <div className="row">
              <div className="col-md-12">
                <h4><i className="fa fa-cogs"></i> Ações Disponíveis</h4>
                <div className="btn-group" role="group">
                  <button
                    onClick={() => handleStatusUpdate('EM_ANALISE')}
                    disabled={isUpdating || manifestacao.status === 'EM_ANALISE'}
                    className="btn btn-warning"
                  >
                    <i className="fa fa-search"></i> Em Análise
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('EM_ANDAMENTO')}
                    disabled={isUpdating || manifestacao.status === 'EM_ANDAMENTO'}
                    className="btn btn-info"
                  >
                    <i className="fa fa-play"></i> Em Andamento
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('RESOLVIDA')}
                    disabled={isUpdating || manifestacao.status === 'RESOLVIDA'}
                    className="btn btn-success"
                  >
                    <i className="fa fa-check"></i> Resolver
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('CANCELADA')}
                    disabled={isUpdating || manifestacao.status === 'CANCELADA'}
                    className="btn btn-danger"
                  >
                    <i className="fa fa-times"></i> Cancelar
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('ARQUIVADA')}
                    disabled={isUpdating || manifestacao.status === 'ARQUIVADA'}
                    className="btn btn-default"
                  >
                    <i className="fa fa-archive"></i> Arquivar
                  </button>
                </div>
              </div>
            </div>

            <div className="row" style={{marginTop: '15px'}}>
              <div className="col-md-12">
                <button
                  onClick={() => setShowObservacoes(!showObservacoes)}
                  className="btn btn-outline"
                >
                  <i className="fa fa-comment"></i> {showObservacoes ? 'Ocultar' : 'Adicionar'} Observações
                </button>
                
                {showObservacoes && (
                  <div className="form-group" style={{marginTop: '15px'}}>
                    <label>Observações:</label>
                    <textarea
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      placeholder="Digite observações sobre esta manifestação..."
                      className="form-control"
                      rows={3}
                    />
                    <div className="btn-group" style={{marginTop: '10px'}}>
                      <button
                        onClick={() => setShowObservacoes(false)}
                        className="btn btn-secondary"
                      >
                        <i className="fa fa-times"></i> Cancelar
                      </button>
                      <button
                        onClick={() => setObservacoes(manifestacao.observacoes || '')}
                        className="btn btn-outline"
                      >
                        <i className="fa fa-undo"></i> Restaurar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManifestacaoCard;
