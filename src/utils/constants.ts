import { TipoManifestacao, StatusManifestacao } from '../types';

export const TIPOS_MANIFESTACAO: Record<TipoManifestacao, string> = {
  DENUNCIA: 'Denúncia',
  RECLAMACAO: 'Reclamação',
  SUGESTAO: 'Sugestão',
  ELOGIO: 'Elogio',
  SOLICITACAO: 'Solicitação',
  INFORMACAO: 'Informação',
};

export const STATUS_MANIFESTACAO: Record<StatusManifestacao, string> = {
  ABERTA: 'Aberta',
  EM_ANALISE: 'Em Análise',
  EM_ANDAMENTO: 'Em Andamento',
  RESOLVIDA: 'Resolvida',
  CANCELADA: 'Cancelada',
  ARQUIVADA: 'Arquivada',
};

export const STATUS_COLORS: Record<StatusManifestacao, string> = {
  ABERTA: 'badge-pending',
  EM_ANALISE: 'badge-in-progress',
  EM_ANDAMENTO: 'badge-in-progress',
  RESOLVIDA: 'badge-resolved',
  CANCELADA: 'badge-rejected',
  ARQUIVADA: 'badge-rejected',
};

export const TIPO_COLORS: Record<TipoManifestacao, string> = {
  DENUNCIA: 'text-orange-600',
  RECLAMACAO: 'text-red-600',
  SUGESTAO: 'text-blue-600',
  ELOGIO: 'text-green-600',
  SOLICITACAO: 'text-purple-600',
  INFORMACAO: 'text-gray-600',
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatProtocolo = (protocolo: string): string => {
  // Formata o protocolo para exibição (ex: 2024-000001)
  return protocolo.replace(/(\d{4})(\d{6})/, '$1-$2');
};
