# Cidade Cidadã - Sistema de Manifestações

Sistema moderno e responsivo para gerenciamento de manifestações cidadãs, desenvolvido com React e TypeScript.

## Funcionalidades

### Para Cidadãos
- **Nova Manifestação**: Interface intuitiva para registro de manifestações
- **Consultar Protocolo**: Acompanhamento do status em tempo real
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile

### Para Atendentes
- **Painel de Controle**: Dashboard completo com indicadores e métricas
- **Gerenciamento**: Atualização de status e observações
- **Filtros Avançados**: Busca e filtragem eficiente

## Design System

### Características Visuais
- **Design Moderno**: Interface limpa e profissional
- **Gradientes e Sombras**: Efeitos visuais sofisticados
- **Tipografia Hierárquica**: Fonte Inter para melhor legibilidade
- **Paleta de Cores**: Sistema de cores consistente e acessível
- **Ícones e Emojis**: Elementos visuais intuitivos

### Componentes
- **Cards Interativos**: Hover effects e transições suaves
- **Formulários Inteligentes**: Validação em tempo real com feedback visual
- **Botões Modernos**: Estados de loading e interações fluidas
- **Layout Responsivo**: Grid system flexível e adaptável

## Tecnologias

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **React Router DOM** - Navegação
- **Axios** - Cliente HTTP
- **React Hook Form** - Gerenciamento de formulários
- **React Hot Toast** - Notificações
- **Lucide React** - Ícones modernos
- **CSS Custom Properties** - Design system escalável

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

## Melhorias Implementadas

### Design System
- Variáveis CSS para cores, tipografia e espaçamentos
- Sistema de grid responsivo
- Componentes reutilizáveis e consistentes
- Animações e transições suaves

### Interface do Usuário
- Header moderno com navegação intuitiva
- Hero sections com gradientes e call-to-actions
- Cards informativos com estatísticas
- Formulários organizados em seções temáticas
- Footer completo com informações de contato

### Experiência do Usuário
- Feedback visual em tempo real
- Estados de loading elegantes
- Mensagens de erro e sucesso claras
- Navegação intuitiva e acessível

## 📱 Responsividade

- **Mobile First**: Otimizado para dispositivos móveis
- **Breakpoints**: Adaptação para tablet e desktop
- **Touch Friendly**: Elementos otimizados para toque
- **Performance**: Carregamento rápido em todos os dispositivos

## Paleta de Cores

- **Primary**: #2563eb (Azul principal)
- **Success**: #10b981 (Verde de sucesso)
- **Warning**: #f59e0b (Amarelo de aviso)
- **Danger**: #ef4444 (Vermelho de erro)
- **Gray Scale**: 50-900 (Escala de cinzas)

## Acessibilidade

O projeto foi desenvolvido seguindo boas práticas de acessibilidade:

- Labels adequados para todos os campos
- Contraste de cores adequado
- Navegação por teclado
- Estrutura semântica HTML
- Tamanhos de fonte legíveis
- Feedback visual claro para interações
