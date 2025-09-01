# Como Usar a Aplicação

## Visão Geral

O Portal de Ouvidoria Simples (Cidade Cidadã) é uma aplicação web que permite:

1. **Cidadãos** registrarem manifestações e acompanharem o status
2. **Atendentes** gerenciarem manifestações e visualizarem indicadores

## Acessando a Aplicação

A aplicação está disponível em: `http://localhost:3000`

## Funcionalidades para Cidadãos

### 1. Registrar Nova Manifestação

**Como acessar:** Página inicial (`/`)

**Passos:**
1. Preencha todos os campos obrigatórios:
   - Nome completo
   - E-mail
   - Telefone
   - Tipo de manifestação
   - Endereço
   - Descrição detalhada

2. Clique em "Enviar Manifestação"

3. **Guarde o protocolo** que será exibido na tela

**Tipos de Manifestação Disponíveis:**
- **Denúncia**: Reportar irregularidades
- **Reclamação**: Reclamar sobre serviços
- **Sugestão**: Sugerir melhorias
- **Elogio**: Elogiar serviços
- **Solicitação**: Solicitar ações
- **Informação**: Solicitar informações

### 2. Consultar Manifestação

**Como acessar:** Menu "Consultar Protocolo" (`/consultar`)

**Passos:**
1. Digite o número do protocolo no formato: `AAAA-NNNNNN`
   - Exemplo: `2024-000001`

2. Clique em "Consultar Protocolo"

3. Visualize os detalhes da manifestação e seu status atual

**Status Possíveis:**
- **Aberta**: Manifestação recebida e aguardando análise
- **Em Análise**: Manifestação sendo analisada pela equipe
- **Em Andamento**: Manifestação em processo de resolução
- **Resolvida**: Manifestação foi resolvida
- **Cancelada**: Manifestação foi cancelada
- **Arquivada**: Manifestação foi arquivada

## Funcionalidades para Atendentes

### 1. Painel de Atendente

**Como acessar:** Menu "Painel do Atendente" (`/atendente`)

**Funcionalidades disponíveis:**

#### Indicadores
- **Total**: Número total de manifestações
- **Abertas**: Manifestações aguardando análise
- **Em Análise**: Manifestações sendo analisadas
- **Em Andamento**: Manifestações em processo
- **Resolvidas**: Manifestações finalizadas
- **Canceladas**: Manifestações canceladas
- **Arquivadas**: Manifestações arquivadas
- **Hoje**: Manifestações criadas hoje
- **Por Tipo**: Distribuição por tipo de manifestação

#### Filtros
- **Protocolo**: Buscar por número específico
- **Status**: Filtrar por status atual
- **Tipo**: Filtrar por tipo de manifestação
- **Data Início/Fim**: Filtrar por período

#### Gerenciamento
Para cada manifestação, você pode:
- **Alterar Status**: Clicar nos botões de ação
- **Adicionar Observações**: Comentários sobre a manifestação
- **Visualizar Detalhes**: Todos os dados da manifestação

### 2. Atualizando Status

**Passos:**
1. No painel do atendente, localize a manifestação
2. Use os botões de ação:
   - **Em Análise**: Iniciar análise
   - **Em Andamento**: Marcar como em processo
   - **Resolver**: Finalizar com sucesso
   - **Cancelar**: Cancelar manifestação
   - **Arquivar**: Arquivar manifestação

3. **Adicionar Observações** (opcional):
   - Clique em "Adicionar Observações"
   - Digite comentários relevantes
   - As observações ficam visíveis para o cidadão

## Modo Demonstração

Quando o backend não está disponível, a aplicação funciona em **Modo Demonstração**:

- **Indicador visual**: Canto inferior direito mostra "Modo Demonstração"
- **Dados de exemplo**: Usa manifestações fictícias para demonstração
- **Funcionalidade completa**: Todas as funcionalidades funcionam normalmente
- **Dados temporários**: Alterações são perdidas ao recarregar a página

## Navegação

### Menu Principal
- **Nova Manifestação**: Registrar nova manifestação
- **Consultar Protocolo**: Buscar manifestação existente
- **Painel do Atendente**: Gerenciar manifestações (para atendentes)

### Responsividade
- **Desktop**: Interface completa com todos os recursos
- **Tablet**: Layout adaptado para telas médias
- **Mobile**: Interface otimizada para smartphones

## Dicas de Uso

### Para Cidadãos
1. **Guarde sempre o protocolo** - é sua forma de acompanhar
2. **Seja específico** na descrição da manifestação
3. **Forneça dados corretos** para contato
4. **Acompanhe regularmente** o status da sua manifestação

### Para Atendentes
1. **Atualize status** conforme o progresso
2. **Adicione observações** relevantes
3. **Use os filtros** para organizar o trabalho
4. **Monitore os indicadores** para acompanhar a demanda

## Suporte

Se encontrar problemas:
1. Verifique se o backend está rodando (porta 8080)
2. Recarregue a página
3. Limpe o cache do navegador
4. Verifique a conexão com a internet

## Tecnologias

- **Frontend**: React + TypeScript
- **Estilização**: CSS customizado
- **Ícones**: Lucide React
- **Formulários**: React Hook Form
- **Notificações**: React Hot Toast
- **Roteamento**: React Router DOM
