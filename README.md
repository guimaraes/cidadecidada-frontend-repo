# Cidade Cidadã - Portal de Ouvidoria

Frontend em React + TypeScript para o Portal de Ouvidoria Simples (Cidade Cidadã).

## Funcionalidades

- **Registro de Manifestação**: Formulário para cidadãos registrarem manifestações
- **Consulta de Protocolo**: Busca de manifestações por número de protocolo
- **Painel do Atendente**: Interface para gerenciamento de manifestações
- **Indicadores**: Dashboard com estatísticas e métricas

## Tecnologias

- React 18
- TypeScript
- React Router DOM
- Axios
- React Hook Form
- React Hot Toast
- Lucide React (ícones)
- CSS customizado

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API no arquivo `.env`:
```
REACT_APP_API_URL=http://localhost:8080/api
```

4. Execute o projeto:
```bash
npm start
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── pages/              # Páginas da aplicação
├── services/           # Serviços de API
├── types/              # Definições de tipos TypeScript
├── utils/              # Utilitários e constantes
├── App.tsx             # Componente principal
└── index.tsx           # Ponto de entrada
```

## Endpoints da API

O frontend consome os seguintes endpoints:

- `POST /api/manifestacoes` - Criar manifestação
- `GET /api/manifestacoes/{protocolo}` - Buscar por protocolo
- `GET /api/manifestacoes` - Listar manifestações (com filtros)
- `PATCH /api/manifestacoes/{id}/status` - Atualizar status
- `GET /api/manifestacoes/indicadores` - Buscar indicadores

## Scripts Disponíveis

- `npm start` - Executa o projeto em modo desenvolvimento
- `npm build` - Gera build de produção
- `npm test` - Executa os testes
- `npm eject` - Ejecta do Create React App

## Acessibilidade

O projeto foi desenvolvido seguindo boas práticas de acessibilidade:

- Labels adequados para todos os campos
- Contraste de cores adequado
- Navegação por teclado
- Estrutura semântica HTML
- Tamanhos de fonte legíveis
