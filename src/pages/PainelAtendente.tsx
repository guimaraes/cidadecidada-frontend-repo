import React from 'react';
import { Manifestacao, FiltrosManifestacao, StatusManifestacao } from '../types';
import { manifestacaoService } from '../services/api';
import FiltrosManifestacaoComponent from '../components/FiltrosManifestacao';
import ManifestacaoCard from '../components/ManifestacaoCard';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const PainelAtendentePage: React.FC = () => {
  const [manifestacoes, setManifestacoes] = React.useState<Manifestacao[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [filtros, setFiltros] = React.useState<FiltrosManifestacao>({});

  const carregarDados = React.useCallback(async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    
    try {
      const manifestacoesData = await manifestacaoService.listar(filtros);
      setManifestacoes(manifestacoesData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [filtros]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await carregarDados(false);
    setIsRefreshing(false);
    toast.success('Dados atualizados!');
  };

  const handleFiltrosChange = (novosFiltros: FiltrosManifestacao) => {
    setFiltros(novosFiltros);
  };

  const handleLimparFiltros = () => {
    setFiltros({});
  };

  const handleStatusUpdate = async (id: number, status: string, observacoes?: string) => {
    try {
      await manifestacaoService.atualizarStatus(id, {
        status: status as StatusManifestacao,
        observacoes,
      });
      
      // Atualizar a lista de manifestações
      setManifestacoes(prev => 
        prev.map(m => 
          m.id === id 
            ? { 
                ...m, 
                status: status as StatusManifestacao, 
                observacoes,
                dataAtualizacao: new Date().toISOString()
              }
            : m
        )
      );
      
      toast.success('Status atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status. Tente novamente.');
    }
  };

  React.useEffect(() => {
    carregarDados();
  }, [filtros, carregarDados]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Loader2 size={40} className="loading text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Carregando Painel</h2>
          <p className="text-gray-600">Aguarde enquanto carregamos os dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-12">
        {/* Header Box */}
        <div className="box box-primary">
          <div className="box-header">
            <h3 className="box-title">
              <i className="fa fa-users text-primary"></i> Painel do Atendente
            </h3>
            <div className="box-tools pull-right">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="btn btn-primary btn-sm"
              >
                <i className={`fa fa-refresh ${isRefreshing ? 'fa-spin' : ''}`}></i>
                {isRefreshing ? ' Atualizando...' : ' Atualizar'}
              </button>
            </div>
          </div>
          <div className="box-body">
            <p className="text-muted">
              Gerencie manifestações e mantenha a cidade funcionando perfeitamente.
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="box box-info">
          <div className="box-header">
            <h3 className="box-title">
              <i className="fa fa-filter text-info"></i> Filtros de Busca
            </h3>
          </div>
          <div className="box-body">
            <FiltrosManifestacaoComponent
              filtros={filtros}
              onFiltrosChange={handleFiltrosChange}
              onLimparFiltros={handleLimparFiltros}
            />
          </div>
        </div>

        {/* Manifestations List */}
        <div className="box box-success">
          <div className="box-header">
            <h3 className="box-title">
              <i className="fa fa-list text-success"></i> Lista de Manifestações
            </h3>
            <div className="box-tools pull-right">
              <span className="label label-success">
                {manifestacoes.length} manifestação{manifestacoes.length !== 1 ? 'ões' : ''}
              </span>
            </div>
          </div>
          <div className="box-body">
            {manifestacoes.length === 0 ? (
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
                <button
                  onClick={handleLimparFiltros}
                  className="btn btn-warning"
                >
                  <i className="fa fa-refresh"></i> Limpar Filtros
                </button>
              </div>
            ) : (
              <div className="row">
                {manifestacoes.map((manifestacao) => (
                  <div key={manifestacao.id} className="col-md-12" style={{marginBottom: '20px'}}>
                    <ManifestacaoCard
                      manifestacao={manifestacao}
                      showActions={true}
                      onStatusUpdate={handleStatusUpdate}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainelAtendentePage;
