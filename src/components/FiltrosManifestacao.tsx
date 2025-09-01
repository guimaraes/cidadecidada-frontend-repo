import React from 'react';
import { FiltrosManifestacao } from '../types';
import { TIPOS_MANIFESTACAO, STATUS_MANIFESTACAO } from '../utils/constants';
import { Filter, X } from 'lucide-react';

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
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <h3 className="card-title">Filtros</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onLimparFiltros}
              className="btn btn-outline btn-sm"
            >
              <X size={16} />
              Limpar
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Protocolo */}
        <div className="form-group">
          <label htmlFor="protocolo" className="form-label">
            Protocolo
          </label>
          <input
            id="protocolo"
            type="text"
            className="form-input"
            placeholder="Ex: 2024-000001"
            value={filtros.protocolo || ''}
            onChange={(e) => handleChange('protocolo', e.target.value)}
          />
        </div>

        {/* Status */}
        <div className="form-group">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            className="form-select"
            value={filtros.status || ''}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="">Todos os status</option>
            {Object.entries(STATUS_MANIFESTACAO).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo */}
        <div className="form-group">
          <label htmlFor="tipo" className="form-label">
            Tipo
          </label>
          <select
            id="tipo"
            className="form-select"
            value={filtros.tipo || ''}
            onChange={(e) => handleChange('tipo', e.target.value)}
          >
            <option value="">Todos os tipos</option>
            {Object.entries(TIPOS_MANIFESTACAO).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Data Início */}
        <div className="form-group">
          <label htmlFor="dataInicio" className="form-label">
            Data Início
          </label>
          <input
            id="dataInicio"
            type="date"
            className="form-input"
            value={filtros.dataInicio || ''}
            onChange={(e) => handleChange('dataInicio', e.target.value)}
          />
        </div>

        {/* Data Fim */}
        <div className="form-group">
          <label htmlFor="dataFim" className="form-label">
            Data Fim
          </label>
          <input
            id="dataFim"
            type="date"
            className="form-input"
            value={filtros.dataFim || ''}
            onChange={(e) => handleChange('dataFim', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FiltrosManifestacaoComponent;
