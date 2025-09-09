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

interface ManifestacaoTableProps {
  manifestacoes: Manifestacao[];
  onStatusUpdate?: (id: number, status: string, observacoes?: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const ManifestacaoTable: React.FC<ManifestacaoTableProps> = ({ 
  manifestacoes, 
  onStatusUpdate,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) => {
  const [expandedRows, setExpandedRows] = React.useState<Set<number>>(new Set());
  const [isUpdating, setIsUpdating] = React.useState<number | null>(null);
  const [observacoes, setObservacoes] = React.useState<{[key: number]: string}>({});

  const toggleRow = (id: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    if (!onStatusUpdate) return;
    
    setIsUpdating(id);
    try {
      await onStatusUpdate(id, status, observacoes[id] || '');
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleObservacoesChange = (id: number, value: string) => {
    setObservacoes(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handlePageChange = (page: number) => {
    if (onPageChange && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Botão Anterior
    pages.push(
      <li key="prev" className={currentPage === 1 ? 'disabled' : ''}>
        <button
          className="btn btn-default btn-sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fa fa-chevron-left"></i>
        </button>
      </li>
    );

    // Primeira página
    if (startPage > 1) {
      pages.push(
        <li key={1}>
          <button
            className="btn btn-default btn-sm"
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        </li>
      );
      if (startPage > 2) {
        pages.push(
          <li key="ellipsis1" className="disabled">
            <span className="btn btn-default btn-sm">...</span>
          </li>
        );
      }
    }

    // Páginas do meio
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={i === currentPage ? 'active' : ''}>
          <button
            className={`btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-default'}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    // Última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <li key="ellipsis2" className="disabled">
            <span className="btn btn-default btn-sm">...</span>
          </li>
        );
      }
      pages.push(
        <li key={totalPages}>
          <button
            className="btn btn-default btn-sm"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    // Botão Próximo
    pages.push(
      <li key="next" className={currentPage === totalPages ? 'disabled' : ''}>
        <button
          className="btn btn-default btn-sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="fa fa-chevron-right"></i>
        </button>
      </li>
    );

    return (
      <div className="text-center">
        <ul className="pagination pagination-sm" style={{margin: '20px 0'}}>
          {pages}
        </ul>
        <div className="text-muted">
          Página {currentPage} de {totalPages}
        </div>
      </div>
    );
  };

  if (manifestacoes.length === 0) {
    return (
      <div className="text-center" style={{padding: '40px 0'}}>
        <div className="info-box">
          <span className="info-box-icon bg-gray">
            <i className="fa fa-search"></i>
          </span>
          <div className="info-box-content">
            <span className="info-box-text">Nenhuma manifestação encontrada</span>
            <span className="info-box-number">0</span>
            <div className="progress">
              <div className="progress-bar" style={{width: '0%'}}></div>
            </div>
            <span className="progress-description">
              Não há manifestações que correspondam aos filtros aplicados.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th style={{width: '5%'}}></th>
            <th style={{width: '20%'}}>Protocolo</th>
            <th style={{width: '35%'}}>Solicitante</th>
            <th style={{width: '15%'}}>Status</th>
            <th style={{width: '25%'}}>Data Criação</th>
          </tr>
        </thead>
        <tbody>
          {manifestacoes.map((manifestacao) => (
            <React.Fragment key={manifestacao.id}>
              {/* Linha principal */}
              <tr 
                style={{cursor: 'pointer'}}
                onClick={() => toggleRow(manifestacao.id)}
                className={expandedRows.has(manifestacao.id) ? 'info' : ''}
              >
                <td>
                  <i className={`fa fa-chevron-${expandedRows.has(manifestacao.id) ? 'down' : 'right'}`}></i>
                </td>
                <td>
                  <strong>{formatProtocolo(manifestacao.protocolo)}</strong>
                </td>
                <td>{manifestacao.nomeSolicitante}</td>
                <td>
                  <span className={`label ${STATUS_COLORS[manifestacao.status]} label-sm`}>
                    {STATUS_MANIFESTACAO[manifestacao.status]}
                  </span>
                </td>
                <td>{formatDate(manifestacao.dataCriacao)}</td>
              </tr>
              
              {/* Linha expandida com detalhes */}
              {expandedRows.has(manifestacao.id) && (
                <tr>
                  <td colSpan={5}>
                    <div className="box box-info" style={{margin: '10px 0'}}>
                      <div className="box-header">
                        <h3 className="box-title">
                          <i className="fa fa-info-circle text-info"></i> Detalhes da Manifestação
                        </h3>
                      </div>
                      <div className="box-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label><strong>E-mail:</strong></label>
                              <p className="form-control-static">{manifestacao.email}</p>
                            </div>
                            <div className="form-group">
                              <label><strong>Telefone:</strong></label>
                              <p className="form-control-static">{manifestacao.telefone}</p>
                            </div>
                            <div className="form-group">
                              <label><strong>Tipo:</strong></label>
                              <p className="form-control-static">
                                <span className={`label ${TIPO_COLORS[manifestacao.tipo]} label-sm`}>
                                  {TIPOS_MANIFESTACAO[manifestacao.tipo]}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label><strong>Assunto:</strong></label>
                              <p className="form-control-static">{manifestacao.assunto}</p>
                            </div>
                            <div className="form-group">
                              <label><strong>Data de Criação:</strong></label>
                              <p className="form-control-static">{formatDate(manifestacao.dataCriacao)}</p>
                            </div>
                            {manifestacao.dataAtualizacao && (
                              <div className="form-group">
                                <label><strong>Última Atualização:</strong></label>
                                <p className="form-control-static">{formatDate(manifestacao.dataAtualizacao)}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label><strong>Descrição:</strong></label>
                          <div className="callout callout-info">
                            <p style={{margin: 0, lineHeight: '1.6'}}>{manifestacao.descricao}</p>
                          </div>
                        </div>

                        {manifestacao.observacoes && (
                          <div className="form-group">
                            <label><strong>Observações:</strong></label>
                            <div className="callout callout-warning">
                              <p style={{margin: 0, lineHeight: '1.6'}}>{manifestacao.observacoes}</p>
                            </div>
                          </div>
                        )}

                        {/* Ações para Atendentes */}
                        {onStatusUpdate && (
                          <div className="box-footer">
                            <div className="row">
                              <div className="col-md-8">
                                <h4><i className="fa fa-cogs"></i> Ações Disponíveis</h4>
                                <div className="btn-group" role="group">
                                  <button
                                    onClick={() => handleStatusUpdate(manifestacao.id, 'EM_ANALISE')}
                                    disabled={isUpdating === manifestacao.id || manifestacao.status === 'EM_ANALISE'}
                                    className="btn btn-warning btn-sm"
                                  >
                                    <i className="fa fa-search"></i> Em Análise
                                  </button>
                                  <button
                                    onClick={() => handleStatusUpdate(manifestacao.id, 'EM_ANDAMENTO')}
                                    disabled={isUpdating === manifestacao.id || manifestacao.status === 'EM_ANDAMENTO'}
                                    className="btn btn-info btn-sm"
                                  >
                                    <i className="fa fa-play"></i> Em Andamento
                                  </button>
                                  <button
                                    onClick={() => handleStatusUpdate(manifestacao.id, 'RESOLVIDA')}
                                    disabled={isUpdating === manifestacao.id || manifestacao.status === 'RESOLVIDA'}
                                    className="btn btn-success btn-sm"
                                  >
                                    <i className="fa fa-check"></i> Resolver
                                  </button>
                                  <button
                                    onClick={() => handleStatusUpdate(manifestacao.id, 'CANCELADA')}
                                    disabled={isUpdating === manifestacao.id || manifestacao.status === 'CANCELADA'}
                                    className="btn btn-danger btn-sm"
                                  >
                                    <i className="fa fa-times"></i> Cancelar
                                  </button>
                                  <button
                                    onClick={() => handleStatusUpdate(manifestacao.id, 'ARQUIVADA')}
                                    disabled={isUpdating === manifestacao.id || manifestacao.status === 'ARQUIVADA'}
                                    className="btn btn-default btn-sm"
                                  >
                                    <i className="fa fa-archive"></i> Arquivar
                                  </button>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>Observações:</label>
                                  <textarea
                                    value={observacoes[manifestacao.id] || ''}
                                    onChange={(e) => handleObservacoesChange(manifestacao.id, e.target.value)}
                                    placeholder="Digite observações sobre esta manifestação..."
                                    className="form-control"
                                    rows={3}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
};

export default ManifestacaoTable;
