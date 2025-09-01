import React from 'react';
import { Manifestacao, Indicadores, FiltrosManifestacao, StatusManifestacao } from '../types';
import { manifestacaoService } from '../services/api';
import IndicadoresCard from '../components/IndicadoresCard';
import FiltrosManifestacaoComponent from '../components/FiltrosManifestacao';
import ManifestacaoCard from '../components/ManifestacaoCard';
import { RefreshCw, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const PainelAtendentePage: React.FC = () => {
  const [manifestacoes, setManifestacoes] = React.useState<Manifestacao[]>([]);
  const [indicadores, setIndicadores] = React.useState<Indicadores | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [filtros, setFiltros] = React.useState<FiltrosManifestacao>({});

  const carregarDados = React.useCallback(async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    
    try {
      const [manifestacoesData, indicadoresData] = await Promise.all([
        manifestacaoService.listar(filtros),
        manifestacaoService.buscarIndicadores(),
      ]);
      
      setManifestacoes(manifestacoesData);
      setIndicadores(indicadoresData);
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
      
      // Recarregar indicadores
      const novosIndicadores = await manifestacaoService.buscarIndicadores();
      setIndicadores(novosIndicadores);
      
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
      <div className="container py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <Loader2 size={48} className="loading mx-auto mb-4" />
            <p className="text-gray-600">Carregando dados...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Painel do Atendente
            </h1>
            <p className="text-gray-600">
              Gerencie manifestações e acompanhe indicadores
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn btn-outline"
          >
            <RefreshCw size={20} className={isRefreshing ? 'loading' : ''} />
            {isRefreshing ? 'Atualizando...' : 'Atualizar'}
          </button>
        </div>

        {indicadores && <IndicadoresCard indicadores={indicadores} />}
      </div>

      <div className="mb-6">
        <FiltrosManifestacaoComponent
          filtros={filtros}
          onFiltrosChange={handleFiltrosChange}
          onLimparFiltros={handleLimparFiltros}
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Manifestações ({manifestacoes.length})
          </h2>
        </div>

        {manifestacoes.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 mb-4">
              Nenhuma manifestação encontrada com os filtros aplicados.
            </p>
            <button
              onClick={handleLimparFiltros}
              className="btn btn-outline"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {manifestacoes.map((manifestacao) => (
              <ManifestacaoCard
                key={manifestacao.id}
                manifestacao={manifestacao}
                showActions={true}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PainelAtendentePage;
