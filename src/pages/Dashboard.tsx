import React from 'react';
import { Manifestacao, Indicadores } from '../types';
import { manifestacaoService } from '../services/api';
import { TIPOS_MANIFESTACAO, TIPO_COLORS } from '../utils/constants';
import IndicadoresCard from '../components/IndicadoresCard';
import ManifestacaoTable from '../components/ManifestacaoTable';
import SerieDiariaChart from '../components/charts/SerieDiariaChart';
import TiposPieChart from '../components/charts/TiposPieChart';
import SlaBucketsBar from '../components/charts/SlaBucketsBar';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface SerieDiariaData {
  data: string;
  total: number;
}

interface TiposPieData {
  name: string;
  value: number;
  color: string;
}

interface SlaBucketData {
  faixa: string;
  quantidade: number;
  cor: string;
}

const DashboardPage: React.FC = () => {
  const [indicadores, setIndicadores] = React.useState<Indicadores | null>(null);
  const [ultimasManifestacoes, setUltimasManifestacoes] = React.useState<Manifestacao[]>([]);
  const [serieDiaria, setSerieDiaria] = React.useState<SerieDiariaData[]>([]);
  const [slaBuckets, setSlaBuckets] = React.useState<SlaBucketData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [lastUpdate, setLastUpdate] = React.useState<Date | null>(null);

  const carregarIndicadores = async () => {
    try {
      const data = await manifestacaoService.buscarIndicadores();
      setIndicadores(data);
      return data;
    } catch (error) {
      console.error('Erro ao carregar indicadores:', error);
      toast.error('Erro ao carregar indicadores');
      return null;
    }
  };

  const carregarUltimasManifestacoes = async () => {
    try {
      const data = await manifestacaoService.listar({});
      // Ordena por data de criação descendente e pega apenas os 10 primeiros
      const ultimas = data
        .sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime())
        .slice(0, 10);
      setUltimasManifestacoes(ultimas);
    } catch (error) {
      console.error('Erro ao carregar últimas manifestações:', error);
      toast.error('Erro ao carregar últimas manifestações');
    }
  };

  const carregarSerieDiaria = async () => {
    try {
      const hoje = new Date();
      const promises = [];
      
      // Gera 30 dias anteriores
      for (let i = 29; i >= 0; i--) {
        const data = new Date(hoje);
        data.setDate(data.getDate() - i);
        
        const inicio = new Date(data);
        inicio.setHours(0, 0, 0, 0);
        
        const fim = new Date(data);
        fim.setHours(23, 59, 59, 999);
        
        const promise = manifestacaoService.listar({
          dataInicio: inicio.toISOString(),
          dataFim: fim.toISOString()
        }).then(response => ({
          data: data.toISOString().split('T')[0],
          total: response.length
        }));
        
        promises.push(promise);
      }
      
      const resultados = await Promise.all(promises);
      setSerieDiaria(resultados);
    } catch (error) {
      console.error('Erro ao carregar série diária:', error);
      toast.error('Erro ao carregar série diária');
    }
  };

  const carregarSlaBuckets = async () => {
    try {
      const manifestacoesAbertas = await manifestacaoService.listar({
        status: 'ABERTA'
      });
      
      const hoje = new Date();
      const buckets = [
        { faixa: '0-2 dias', quantidade: 0, cor: '#28a745' },
        { faixa: '3-7 dias', quantidade: 0, cor: '#ffc107' },
        { faixa: '8-14 dias', quantidade: 0, cor: '#fd7e14' },
        { faixa: '>14 dias', quantidade: 0, cor: '#dc3545' }
      ];
      
      manifestacoesAbertas.forEach(manifestacao => {
        const dataCriacao = new Date(manifestacao.dataCriacao);
        const diasAbertos = Math.floor((hoje.getTime() - dataCriacao.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diasAbertos <= 2) {
          buckets[0].quantidade++;
        } else if (diasAbertos <= 7) {
          buckets[1].quantidade++;
        } else if (diasAbertos <= 14) {
          buckets[2].quantidade++;
        } else {
          buckets[3].quantidade++;
        }
      });
      
      setSlaBuckets(buckets);
    } catch (error) {
      console.error('Erro ao carregar SLA buckets:', error);
      toast.error('Erro ao carregar dados de SLA');
    }
  };

  const carregarDados = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    
    try {
      // Carrega indicadores primeiro (usado em múltiplos gráficos)
      await carregarIndicadores();
      
      // Carrega outros dados em paralelo
      await Promise.all([
        carregarUltimasManifestacoes(),
        carregarSerieDiaria(),
        carregarSlaBuckets()
      ]);
      
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
      toast.error('Erro ao carregar dados do dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await carregarDados(false);
    setIsRefreshing(false);
    toast.success('Dados atualizados!');
  };

  React.useEffect(() => {
    carregarDados();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prepararDadosTipos = (indicadores: Indicadores): TiposPieData[] => {
    return Object.entries(indicadores.porTipo)
      .filter(([_, value]) => value > 0)
      .map(([tipo, value]) => ({
        name: TIPOS_MANIFESTACAO[tipo as keyof typeof TIPOS_MANIFESTACAO],
        value,
        color: TIPO_COLORS[tipo as keyof typeof TIPO_COLORS]
      }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Loader2 size={40} className="loading text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Carregando Dashboard</h2>
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
              <i className="fa fa-dashboard text-primary"></i> Dashboard Gerencial
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
              Visão geral das manifestações e indicadores de performance.
              {lastUpdate && (
                <span className="pull-right">
                  <i className="fa fa-clock-o"></i> Última atualização: {lastUpdate.toLocaleString()}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Cards de Indicadores */}
        {indicadores && (
          <div className="row">
            <div className="col-md-12">
              <IndicadoresCard indicadores={indicadores} />
            </div>
          </div>
        )}

        {/* Gráficos */}
        <div className="row">
          <div className="col-md-8">
            <SerieDiariaChart data={serieDiaria} loading={isRefreshing} />
          </div>
          <div className="col-md-4">
            {indicadores && (
              <TiposPieChart 
                data={prepararDadosTipos(indicadores)} 
                loading={isRefreshing} 
              />
            )}
          </div>
        </div>

        {/* Listas/Operacional */}
        <div className="row">
          <div className="col-md-8">
            <div className="box box-info">
              <div className="box-header">
                <h3 className="box-title">
                  <i className="fa fa-list text-info"></i> Últimas Manifestações
                </h3>
              </div>
              <div className="box-body">
                <ManifestacaoTable
                  manifestacoes={ultimasManifestacoes}
                  currentPage={1}
                  totalPages={1}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <SlaBucketsBar data={slaBuckets} loading={isRefreshing} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
