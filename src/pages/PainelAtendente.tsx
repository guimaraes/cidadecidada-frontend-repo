import React from 'react';
import { Manifestacao, FiltrosManifestacao, StatusManifestacao } from '../types';
import { manifestacaoService } from '../services/api';
import FiltrosManifestacaoComponent from '../components/FiltrosManifestacao';
import ManifestacaoTable from '../components/ManifestacaoTable';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const PainelAtendentePage: React.FC = () => {
  const [manifestacoes, setManifestacoes] = React.useState<Manifestacao[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [filtros, setFiltros] = React.useState<FiltrosManifestacao>({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  const itemsPerPage = 10;

  const carregarDados = React.useCallback(async (showLoading = true, page = 1) => {
    if (showLoading) setIsLoading(true);
    
    try {
      // Adiciona parâmetros de paginação aos filtros
      const filtrosComPaginacao = {
        ...filtros,
        page: page - 1, // API usa 0-based indexing
        size: itemsPerPage
      };
      
      const manifestacoesData = await manifestacaoService.listar(filtrosComPaginacao);
      setManifestacoes(manifestacoesData);
      
      // Calcula total de páginas (assumindo que a API retorna o total)
      // Se a API não retornar o total, vamos usar uma estimativa baseada no tamanho da resposta
      const estimatedTotal = manifestacoesData.length === itemsPerPage ? 
        (page * itemsPerPage) + 1 : // Se retornou o tamanho máximo, provavelmente há mais páginas
        ((page - 1) * itemsPerPage) + manifestacoesData.length;
      
      setTotalItems(estimatedTotal);
      setTotalPages(Math.ceil(estimatedTotal / itemsPerPage));
      setCurrentPage(page);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [filtros, itemsPerPage]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await carregarDados(false, currentPage);
    setIsRefreshing(false);
    toast.success('Dados atualizados!');
  };

  const handleFiltrosChange = (novosFiltros: FiltrosManifestacao) => {
    setFiltros(novosFiltros);
    setCurrentPage(1); // Reset para primeira página quando filtros mudam
  };

  const handleLimparFiltros = () => {
    setFiltros({});
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    carregarDados(true, page);
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
                {totalItems} manifestação{totalItems !== 1 ? 'ões' : ''} total
              </span>
            </div>
          </div>
          <div className="box-body">
            <ManifestacaoTable
              manifestacoes={manifestacoes}
              onStatusUpdate={handleStatusUpdate}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            {manifestacoes.length === 0 && (
              <div className="text-center" style={{marginTop: '20px'}}>
                <button
                  onClick={handleLimparFiltros}
                  className="btn btn-warning"
                >
                  <i className="fa fa-refresh"></i> Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainelAtendentePage;
