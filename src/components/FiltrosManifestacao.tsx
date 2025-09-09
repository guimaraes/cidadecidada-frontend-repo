import React from 'react';
import { FiltrosManifestacao } from '../types';
import { TIPOS_MANIFESTACAO, STATUS_MANIFESTACAO } from '../utils/constants';

interface FiltrosManifestacaoProps {
  filtros: FiltrosManifestacao;
  onFiltrosChange: (filtros: FiltrosManifestacao) => void;
  onLimparFiltros: () => void;
}

const FiltrosManifestacaoComponent: React.FC<FiltrosManifestacaoProps> = ({
  filtros,
  onFiltrosChange,
  onLimparFiltros,
}) => {
  const handleChange = (field: keyof FiltrosManifestacao, value: string) => {
    onFiltrosChange({
      ...filtros,
      [field]: value || undefined,
    });
  };

  const hasActiveFilters = Object.values(filtros).some(value => value !== undefined);

  return (
    <div>
      {/* Primeira linha - Email e Protocolo */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="email">
              <i className="fa fa-envelope text-primary"></i> E-mail do Solicitante
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Ex: usuario@email.com"
              value={filtros.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="protocolo">
              <i className="fa fa-file-text-o text-primary"></i> Protocolo
            </label>
            <input
              id="protocolo"
              type="text"
              className="form-control"
              placeholder="Ex: PROT2024-000001"
              value={filtros.protocolo || ''}
              onChange={(e) => handleChange('protocolo', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Segunda linha - Status e Tipo */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="status">
              <i className="fa fa-flag text-warning"></i> Status
            </label>
            <select
              id="status"
              className="form-control"
              value={filtros.status || ''}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="">Todos</option>
              {Object.entries(STATUS_MANIFESTACAO).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="tipo">
              <i className="fa fa-tag text-info"></i> Tipo
            </label>
            <select
              id="tipo"
              className="form-control"
              value={filtros.tipo || ''}
              onChange={(e) => handleChange('tipo', e.target.value)}
            >
              <option value="">Todos</option>
              {Object.entries(TIPOS_MANIFESTACAO).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Terceira linha - Data Início, Data Fim e Botão Limpar */}
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="dataInicio">
              <i className="fa fa-calendar text-success"></i> Data Início
            </label>
            <input
              id="dataInicio"
              type="date"
              className="form-control"
              value={filtros.dataInicio || ''}
              onChange={(e) => handleChange('dataInicio', e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="dataFim">
              <i className="fa fa-calendar text-danger"></i> Data Fim
            </label>
            <input
              id="dataFim"
              type="date"
              className="form-control"
              value={filtros.dataFim || ''}
              onChange={(e) => handleChange('dataFim', e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>&nbsp;</label>
            {hasActiveFilters && (
              <button
                onClick={onLimparFiltros}
                className="btn btn-warning btn-block"
                title="Limpar todos os filtros"
              >
                <i className="fa fa-times"></i> Limpar Filtros
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltrosManifestacaoComponent;
