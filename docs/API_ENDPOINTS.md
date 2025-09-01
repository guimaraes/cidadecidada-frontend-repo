# Endpoints da API - Portal de Ouvidoria

Esta documentação descreve os endpoints que o frontend consome para funcionar corretamente.

## Base URL
```
http://localhost:8080/api
```

## Endpoints

### 1. Criar Manifestação
**POST** `/manifestacoes`

Cria uma nova manifestação e retorna o protocolo gerado.

**Request Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999",
  "tipo": "RECLAMACAO",
  "descricao": "Descrição detalhada da manifestação...",
  "endereco": "Rua das Flores, 123, Centro, São Paulo"
}
```

**Response:**
```json
{
  "protocolo": "2024000001"
}
```

### 2. Buscar Manifestação por Protocolo
**GET** `/manifestacoes/{protocolo}`

Busca uma manifestação específica pelo número do protocolo.

**Response:**
```json
{
  "id": 1,
  "protocolo": "2024000001",
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999",
  "tipo": "RECLAMACAO",
  "status": "PENDENTE",
  "descricao": "Descrição detalhada da manifestação...",
  "endereco": "Rua das Flores, 123, Centro, São Paulo",
  "dataCriacao": "2024-01-15T10:30:00Z",
  "dataAtualizacao": null,
  "observacoes": null
}
```

### 3. Listar Manifestações
**GET** `/manifestacoes`

Lista todas as manifestações com filtros opcionais.

**Query Parameters:**
- `status` (opcional): PENDENTE, EM_ANALISE, RESOLVIDO, REJEITADO
- `tipo` (opcional): RECLAMACAO, SUGESTAO, ELOGIO, DENUNCIA, SOLICITACAO
- `dataInicio` (opcional): YYYY-MM-DD
- `dataFim` (opcional): YYYY-MM-DD
- `protocolo` (opcional): Número do protocolo

**Response:**
```json
[
  {
    "id": 1,
    "protocolo": "2024000001",
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "(11) 99999-9999",
    "tipo": "RECLAMACAO",
    "status": "PENDENTE",
    "descricao": "Descrição detalhada da manifestação...",
    "endereco": "Rua das Flores, 123, Centro, São Paulo",
    "dataCriacao": "2024-01-15T10:30:00Z",
    "dataAtualizacao": null,
    "observacoes": null
  }
]
```

### 4. Atualizar Status da Manifestação
**PATCH** `/manifestacoes/{id}/status`

Atualiza o status de uma manifestação específica.

**Request Body:**
```json
{
  "status": "EM_ANALISE",
  "observacoes": "Manifestação em análise pela equipe técnica"
}
```

**Response:**
```json
{
  "id": 1,
  "protocolo": "2024000001",
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999",
  "tipo": "RECLAMACAO",
  "status": "EM_ANALISE",
  "descricao": "Descrição detalhada da manifestação...",
  "endereco": "Rua das Flores, 123, Centro, São Paulo",
  "dataCriacao": "2024-01-15T10:30:00Z",
  "dataAtualizacao": "2024-01-15T14:30:00Z",
  "observacoes": "Manifestação em análise pela equipe técnica"
}
```

### 5. Buscar Indicadores
**GET** `/manifestacoes/indicadores`

Retorna estatísticas e indicadores das manifestações.

**Response:**
```json
{
  "total": 150,
  "pendentes": 45,
  "emAnalise": 30,
  "resolvidos": 65,
  "rejeitados": 10,
  "hoje": 12,
  "porTipo": {
    "RECLAMACAO": 80,
    "SUGESTAO": 25,
    "ELOGIO": 15,
    "DENUNCIA": 20,
    "SOLICITACAO": 10
  }
}
```

## Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `404` - Não encontrado
- `500` - Erro interno do servidor

## Tipos de Manifestação

- `RECLAMACAO` - Reclamação
- `SUGESTAO` - Sugestão
- `ELOGIO` - Elogio
- `DENUNCIA` - Denúncia
- `SOLICITACAO` - Solicitação

## Status de Manifestação

- `PENDENTE` - Pendente
- `EM_ANALISE` - Em Análise
- `RESOLVIDO` - Resolvido
- `REJEITADO` - Rejeitado
