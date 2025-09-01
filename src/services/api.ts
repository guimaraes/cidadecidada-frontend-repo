import axios from 'axios';
import { 
  Manifestacao, 
  NovaManifestacao, 
  AtualizarManifestacao, 
  Indicadores,
  FiltrosManifestacao 
} from '../types';

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

// Serviços de manifestação
export const manifestacaoService = {
  // Criar nova manifestação
  async criar(manifestacao: NovaManifestacao): Promise<{ protocolo: string }> {
    const response = await api.post('/manifestacoes', manifestacao);
    return response.data;
  },

  // Buscar manifestação por protocolo
  async buscarPorProtocolo(protocolo: string): Promise<Manifestacao> {
    const response = await api.get(`/manifestacoes/${protocolo}`);
    return response.data;
  },

  // Listar todas as manifestações (para atendentes)
  async listar(filtros?: FiltrosManifestacao): Promise<Manifestacao[]> {
    const params = new URLSearchParams();
    
    if (filtros?.status) params.append('status', filtros.status);
    if (filtros?.tipo) params.append('tipo', filtros.tipo);
    if (filtros?.dataInicio) params.append('dataInicio', filtros.dataInicio);
    if (filtros?.dataFim) params.append('dataFim', filtros.dataFim);
    if (filtros?.protocolo) params.append('protocolo', filtros.protocolo);

    const response = await api.get(`/manifestacoes?${params.toString()}`);
    return response.data;
  },

  // Atualizar status de manifestação
  async atualizarStatus(
    id: number, 
    atualizacao: AtualizarManifestacao
  ): Promise<Manifestacao> {
    const response = await api.patch(`/manifestacoes/${id}/status`, atualizacao);
    return response.data;
  },

  // Buscar indicadores
  async buscarIndicadores(): Promise<Indicadores> {
    const response = await api.get('/manifestacoes/indicadores');
    return response.data;
  },
};

export default api;
