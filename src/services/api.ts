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

console.log('🔧 Configuração da API:', {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  env: process.env.NODE_ENV
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

// Serviços de manifestação - apenas API real
export const manifestacaoService = {
  // Criar nova manifestação
  async criar(manifestacao: NovaManifestacao): Promise<{ protocolo: string }> {
    console.log('📡 Criando manifestação na API...');
    const response = await api.post('/manifestacoes', manifestacao);
    console.log('✅ Manifestação criada:', response.data);
    return response.data;
  },

  // Buscar manifestação por protocolo
  async buscarPorProtocolo(protocolo: string): Promise<Manifestacao> {
    console.log('📡 Buscando manifestação por protocolo:', protocolo);
    const response = await api.get(`/manifestacoes/protocolo/${protocolo}`);
    console.log('✅ Manifestação encontrada:', response.data);
    return response.data;
  },

  // Listar todas as manifestações (para atendentes)
  async listar(filtros?: FiltrosManifestacao): Promise<Manifestacao[]> {
    console.log('📡 Buscando manifestações da API...');
    const params = new URLSearchParams();
    params.append('page', '0');
    params.append('size', '100');
    params.append('sortBy', 'dataCriacao');
    params.append('sortDir', 'desc');
    
    const response = await api.get(`/manifestacoes?${params.toString()}`, {
      headers: {
        'accept': '*/*'
      }
    });
    
    console.log('📊 Dados recebidos da API:', response.data);
    
    // Verifica se a resposta tem estrutura de paginação
    if (response.data && response.data.content) {
      console.log(`✅ Retornando ${response.data.content.length} manifestações da API`);
      return response.data.content;
    } else if (Array.isArray(response.data)) {
      console.log(`✅ Retornando ${response.data.length} manifestações da API (array direto)`);
      return response.data;
    } else {
      console.warn('❌ Formato de resposta inesperado:', response.data);
      return [];
    }
  },

  // Atualizar status de manifestação
  async atualizarStatus(
    id: number, 
    atualizacao: AtualizarManifestacao
  ): Promise<Manifestacao> {
    console.log('📡 Atualizando status da manifestação:', id, atualizacao);
    const response = await api.put(`/manifestacoes/${id}/status`, atualizacao);
    console.log('✅ Status atualizado:', response.data);
    return response.data;
  },

  // Buscar indicadores
  async buscarIndicadores(): Promise<Indicadores> {
    console.log('📡 Buscando indicadores da API...');
    
    // Como não há endpoint específico para indicadores, vamos calcular baseado nas listagens
    const [todas, abertas, emAnalise, emAndamento, resolvidas, canceladas, arquivadas, hoje] = await Promise.all([
      api.get('/manifestacoes?page=0&size=1000', { headers: { 'accept': '*/*' } }),
      api.get('/manifestacoes/status/ABERTA', { headers: { 'accept': '*/*' } }),
      api.get('/manifestacoes/status/EM_ANALISE', { headers: { 'accept': '*/*' } }),
      api.get('/manifestacoes/status/EM_ANDAMENTO', { headers: { 'accept': '*/*' } }),
      api.get('/manifestacoes/status/RESOLVIDA', { headers: { 'accept': '*/*' } }),
      api.get('/manifestacoes/status/CANCELADA', { headers: { 'accept': '*/*' } }),
      api.get('/manifestacoes/status/ARQUIVADA', { headers: { 'accept': '*/*' } }),
      api.get('/manifestacoes/hoje', { headers: { 'accept': '*/*' } })
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

    const indicadores = {
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

    console.log('✅ Indicadores calculados:', indicadores);
    return indicadores;
  },
};

export default api;
