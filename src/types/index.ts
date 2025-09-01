export interface Manifestacao {
  id: number;
  protocolo: string;
  nome: string;
  email: string;
  telefone: string;
  tipo: TipoManifestacao;
  status: StatusManifestacao;
  descricao: string;
  endereco: string;
  dataCriacao: string;
  dataAtualizacao?: string;
  observacoes?: string;
}

export type TipoManifestacao = 
  | 'DENUNCIA'
  | 'RECLAMACAO'
  | 'SUGESTAO'
  | 'ELOGIO'
  | 'SOLICITACAO'
  | 'INFORMACAO';

export type StatusManifestacao = 
  | 'ABERTA'
  | 'EM_ANALISE'
  | 'EM_ANDAMENTO'
  | 'RESOLVIDA'
  | 'CANCELADA'
  | 'ARQUIVADA';

export interface NovaManifestacao {
  nome: string;
  email: string;
  telefone: string;
  tipo: TipoManifestacao;
  descricao: string;
  endereco: string;
}

export interface AtualizarManifestacao {
  status: StatusManifestacao;
  observacoes?: string;
}

export interface Indicadores {
  total: number;
  abertas: number;
  emAnalise: number;
  emAndamento: number;
  resolvidas: number;
  canceladas: number;
  arquivadas: number;
  hoje: number;
  porTipo: {
    [key in TipoManifestacao]: number;
  };
}

export interface FiltrosManifestacao {
  status?: StatusManifestacao;
  tipo?: TipoManifestacao;
  dataInicio?: string;
  dataFim?: string;
  protocolo?: string;
}
