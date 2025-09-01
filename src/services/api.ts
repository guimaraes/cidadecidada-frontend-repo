import axios from 'axios';
import { 
  Manifestacao, 
  NovaManifestacao, 
  AtualizarManifestacao, 
  Indicadores,
  FiltrosManifestacao 
} from '../types';
import { mockApiService } from './mockApi';

// Configuração base do axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

// Função para verificar se o backend está disponível
const isBackendAvailable = async (): Promise<boolean> => {
  try {
    await api.get('/manifestacoes');
    return true;
  } catch (error: any) {
    console.warn('Backend não disponível, usando dados mockados:', error.message);
    return false;
  }
};

// Serviços de manifestação com fallback para dados mockados
export const manifestacaoService = {
  // Criar nova manifestação
  async criar(manifestacao: NovaManifestacao): Promise<{ protocolo: string }> {
    try {
      const isAvailable = await isBackendAvailable();
      if (isAvailable) {
        const response = await api.post('/manifestacoes', manifestacao);
        return response.data;
      } else {
        return await mockApiService.criar(manifestacao);
      }
    } catch (error) {
      console.warn('Usando dados mockados para criar manifestação');
      return await mockApiService.criar(manifestacao);
    }
  },

  // Buscar manifestação por protocolo
  async buscarPorProtocolo(protocolo: string): Promise<Manifestacao> {
    try {
      const isAvailable = await isBackendAvailable();
      if (isAvailable) {
        const response = await api.get(`/manifestacoes/protocolo/${protocolo}`);
        return response.data;
      } else {
        return await mockApiService.buscarPorProtocolo(protocolo);
      }
    } catch (error) {
      console.warn('Usando dados mockados para buscar protocolo');
      return await mockApiService.buscarPorProtocolo(protocolo);
    }
  },

  // Listar todas as manifestações (para atendentes)
  async listar(filtros?: FiltrosManifestacao): Promise<Manifestacao[]> {
    try {
      const isAvailable = await isBackendAvailable();
      if (isAvailable) {
        const params = new URLSearchParams();
        params.append('page', '0');
        params.append('size', '100');
        params.append('sortBy', 'dataCriacao');
        params.append('sortDir', 'desc');
        
        const response = await api.get(`/manifestacoes?${params.toString()}`);
        return response.data.content || response.data; // Assumindo que retorna paginação
      } else {
        return await mockApiService.listar(filtros);
      }
    } catch (error) {
      console.warn('Usando dados mockados para listar manifestações');
      return await mockApiService.listar(filtros);
    }
  },

  // Atualizar status de manifestação
  async atualizarStatus(
    id: number, 
    atualizacao: AtualizarManifestacao
  ): Promise<Manifestacao> {
    try {
      const isAvailable = await isBackendAvailable();
      if (isAvailable) {
        const response = await api.put(`/manifestacoes/${id}/status`, atualizacao);
        return response.data;
      } else {
        return await mockApiService.atualizarStatus(id, atualizacao);
      }
    } catch (error) {
      console.warn('Usando dados mockados para atualizar status');
      return await mockApiService.atualizarStatus(id, atualizacao);
    }
  },

  // Buscar indicadores
  async buscarIndicadores(): Promise<Indicadores> {
    try {
      const isAvailable = await isBackendAvailable();
      if (isAvailable) {
        // Como não há endpoint específico para indicadores, vamos calcular baseado nas listagens
        const [todas, abertas, emAnalise, emAndamento, resolvidas, canceladas, arquivadas, hoje] = await Promise.all([
          api.get('/manifestacoes?page=0&size=1000'),
          api.get('/manifestacoes/status/ABERTA'),
          api.get('/manifestacoes/status/EM_ANALISE'),
          api.get('/manifestacoes/status/EM_ANDAMENTO'),
          api.get('/manifestacoes/status/RESOLVIDA'),
          api.get('/manifestacoes/status/CANCELADA'),
          api.get('/manifestacoes/status/ARQUIVADA'),
          api.get('/manifestacoes/hoje')
        ]);

        const todasData = todas.data.content || todas.data;
        const porTipo = {
          DENUNCIA: 0,
          RECLAMACAO: 0,
          SUGESTAO: 0,
          ELOGIO: 0,
          SOLICITACAO: 0,
          INFORMACAO: 0
        };

        todasData.forEach((m: any) => {
          const tipo = m.tipo as keyof typeof porTipo;
          if (porTipo[tipo] !== undefined) {
            porTipo[tipo]++;
          }
        });

        return {
          total: todasData.length,
          abertas: abertas.data.length || 0,
          emAnalise: emAnalise.data.length || 0,
          emAndamento: emAndamento.data.length || 0,
          resolvidas: resolvidas.data.length || 0,
          canceladas: canceladas.data.length || 0,
          arquivadas: arquivadas.data.length || 0,
          hoje: hoje.data.length || 0,
          porTipo
        };
      } else {
        return await mockApiService.buscarIndicadores();
      }
    } catch (error) {
      console.warn('Usando dados mockados para buscar indicadores');
      return await mockApiService.buscarIndicadores();
    }
  },
};

export default api;
