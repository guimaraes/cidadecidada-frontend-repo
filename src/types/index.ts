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
  | 'RECLAMACAO'
  | 'SUGESTAO'
  | 'ELOGIO'
  | 'DENUNCIA'
  | 'SOLICITACAO';

export type StatusManifestacao = 
  | 'PENDENTE'
  | 'EM_ANALISE'
  | 'RESOLVIDO'
  | 'REJEITADO';

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
  pendentes: number;
  emAnalise: number;
  resolvidos: number;
  rejeitados: number;
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
