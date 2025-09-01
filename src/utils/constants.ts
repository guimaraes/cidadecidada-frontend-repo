import { TipoManifestacao, StatusManifestacao } from '../types';

export const TIPOS_MANIFESTACAO: Record<TipoManifestacao, string> = {
  RECLAMACAO: 'Reclamação',
  SUGESTAO: 'Sugestão',
  ELOGIO: 'Elogio',
  DENUNCIA: 'Denúncia',
  SOLICITACAO: 'Solicitação',
};

export const STATUS_MANIFESTACAO: Record<StatusManifestacao, string> = {
  PENDENTE: 'Pendente',
  EM_ANALISE: 'Em Análise',
  RESOLVIDO: 'Resolvido',
  REJEITADO: 'Rejeitado',
};

export const STATUS_COLORS: Record<StatusManifestacao, string> = {
  PENDENTE: 'badge-pending',
  EM_ANALISE: 'badge-in-progress',
  RESOLVIDO: 'badge-resolved',
  REJEITADO: 'badge-rejected',
};

export const TIPO_COLORS: Record<TipoManifestacao, string> = {
  RECLAMACAO: 'text-red-600',
  SUGESTAO: 'text-blue-600',
  ELOGIO: 'text-green-600',
  DENUNCIA: 'text-orange-600',
  SOLICITACAO: 'text-purple-600',
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
