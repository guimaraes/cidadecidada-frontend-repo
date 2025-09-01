import { 
  Manifestacao, 
  NovaManifestacao, 
  AtualizarManifestacao, 
  Indicadores,
  FiltrosManifestacao 
} from '../types';

// Dados mockados para demonstração
const manifestacoesMock: Manifestacao[] = [
  {
    id: 1,
    protocolo: "2024000001",
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 99999-9999",
    tipo: "RECLAMACAO",
    status: "ABERTA",
    descricao: "Buraco na rua principal do bairro que está causando acidentes. Já faz mais de 2 meses que foi reportado mas nada foi feito.",
    endereco: "Rua das Flores, 123, Centro, São Paulo",
    dataCriacao: "2024-01-15T10:30:00Z",
    dataAtualizacao: undefined,
    observacoes: undefined
  },
  {
    id: 2,
    protocolo: "2024000002",
    nome: "Maria Santos",
    email: "maria@email.com",
    telefone: "(11) 88888-8888",
    tipo: "SUGESTAO",
    status: "EM_ANALISE",
    descricao: "Sugestão para instalar mais lixeiras no parque municipal. O parque fica muito sujo nos fins de semana.",
    endereco: "Av. Paulista, 1000, Bela Vista, São Paulo",
    dataCriacao: "2024-01-14T14:20:00Z",
    dataAtualizacao: "2024-01-15T09:15:00Z",
    observacoes: "Sugestão válida, será analisada pela equipe de urbanismo."
  },
  {
    id: 3,
    protocolo: "2024000003",
    nome: "Pedro Costa",
    email: "pedro@email.com",
    telefone: "(11) 77777-7777",
    tipo: "ELOGIO",
    status: "RESOLVIDA",
    descricao: "Parabéns pela rápida resposta na limpeza da praça. A equipe foi muito eficiente e atenciosa.",
    endereco: "Rua Augusta, 500, Consolação, São Paulo",
    dataCriacao: "2024-01-13T16:45:00Z",
    dataAtualizacao: "2024-01-14T11:30:00Z",
    observacoes: "Elogio registrado e encaminhado para a equipe de limpeza urbana."
  },
  {
    id: 4,
    protocolo: "2024000004",
    nome: "Ana Oliveira",
    email: "ana@email.com",
    telefone: "(11) 66666-6666",
    tipo: "DENUNCIA",
    status: "EM_ANALISE",
    descricao: "Denúncia de comércio irregular funcionando sem alvará na esquina da rua. Está causando transtorno aos moradores.",
    endereco: "Rua 13 de Maio, 200, Bixiga, São Paulo",
    dataCriacao: "2024-01-15T08:15:00Z",
    dataAtualizacao: "2024-01-15T13:45:00Z",
    observacoes: "Denúncia recebida. Fiscalização será enviada para verificar a situação."
  },
  {
    id: 5,
    protocolo: "2024000005",
    nome: "Carlos Ferreira",
    email: "carlos@email.com",
    telefone: "(11) 55555-5555",
    tipo: "SOLICITACAO",
    status: "ABERTA",
    descricao: "Solicitação de poda de árvore que está tocando nos fios elétricos. Risco de queda de galhos.",
    endereco: "Rua dos Pinheiros, 300, Pinheiros, São Paulo",
    dataCriacao: "2024-01-15T12:00:00Z",
    dataAtualizacao: undefined,
    observacoes: undefined
  }
];

let nextId = 6;

// Função para gerar protocolo
const gerarProtocolo = (): string => {
  const ano = new Date().getFullYear();
  const numero = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
  return `${ano}${numero}`;
};

// Função para filtrar manifestações
const filtrarManifestacoes = (manifestacoes: Manifestacao[], filtros: FiltrosManifestacao): Manifestacao[] => {
  return manifestacoes.filter(manifestacao => {
    if (filtros.status && manifestacao.status !== filtros.status) return false;
    if (filtros.tipo && manifestacao.tipo !== filtros.tipo) return false;
    if (filtros.protocolo && !manifestacao.protocolo.includes(filtros.protocolo)) return false;
    
    if (filtros.dataInicio || filtros.dataFim) {
      const dataCriacao = new Date(manifestacao.dataCriacao);
      if (filtros.dataInicio && dataCriacao < new Date(filtros.dataInicio)) return false;
      if (filtros.dataFim && dataCriacao > new Date(filtros.dataFim)) return false;
    }
    
    return true;
  });
};

// Função para calcular indicadores
const calcularIndicadores = (manifestacoes: Manifestacao[]): Indicadores => {
  const hoje = new Date().toDateString();
  
  const porTipo = {
    DENUNCIA: 0,
    RECLAMACAO: 0,
    SUGESTAO: 0,
    ELOGIO: 0,
    SOLICITACAO: 0,
    INFORMACAO: 0
  };

  manifestacoes.forEach(m => {
    porTipo[m.tipo]++;
  });

  return {
    total: manifestacoes.length,
    abertas: manifestacoes.filter(m => m.status === 'ABERTA').length,
    emAnalise: manifestacoes.filter(m => m.status === 'EM_ANALISE').length,
    emAndamento: manifestacoes.filter(m => m.status === 'EM_ANDAMENTO').length,
    resolvidas: manifestacoes.filter(m => m.status === 'RESOLVIDA').length,
    canceladas: manifestacoes.filter(m => m.status === 'CANCELADA').length,
    arquivadas: manifestacoes.filter(m => m.status === 'ARQUIVADA').length,
    hoje: manifestacoes.filter(m => new Date(m.dataCriacao).toDateString() === hoje).length,
    porTipo
  };
};

// Simular delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApiService = {
  // Criar nova manifestação
  async criar(manifestacao: NovaManifestacao): Promise<{ protocolo: string }> {
    await delay(1000);
    const protocolo = gerarProtocolo();
    const novaManifestacao: Manifestacao = {
      id: nextId++,
      protocolo,
      ...manifestacao,
      status: 'ABERTA',
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: undefined,
      observacoes: undefined
    };
    manifestacoesMock.push(novaManifestacao);
    return { protocolo };
  },

  // Buscar manifestação por protocolo
  async buscarPorProtocolo(protocolo: string): Promise<Manifestacao> {
    await delay(500);
    const manifestacao = manifestacoesMock.find(m => m.protocolo === protocolo);
    if (!manifestacao) {
      throw new Error('Protocolo não encontrado');
    }
    return manifestacao;
  },

  // Listar todas as manifestações (para atendentes)
  async listar(filtros?: FiltrosManifestacao): Promise<Manifestacao[]> {
    await delay(800);
    return filtrarManifestacoes(manifestacoesMock, filtros || {});
  },

  // Atualizar status de manifestação
  async atualizarStatus(
    id: number, 
    atualizacao: AtualizarManifestacao
  ): Promise<Manifestacao> {
    await delay(600);
    const index = manifestacoesMock.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Manifestação não encontrada');
    }
    
    manifestacoesMock[index] = {
      ...manifestacoesMock[index],
      status: atualizacao.status,
      observacoes: atualizacao.observacoes,
      dataAtualizacao: new Date().toISOString()
    };
    
    return manifestacoesMock[index];
  },

  // Buscar indicadores
  async buscarIndicadores(): Promise<Indicadores> {
    await delay(400);
    return calcularIndicadores(manifestacoesMock);
  },
};
