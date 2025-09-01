# Guia de Desenvolvimento

Este documento contém informações para desenvolvedores que trabalharão no projeto.

## Pré-requisitos

- Node.js 16+ 
- npm 8+
- Backend Java rodando na porta 8080

## Configuração do Ambiente

1. **Clone o repositório**
```bash
git clone <repository-url>
cd cidadecidada-frontend-repo
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp env.example .env
```
Edite o arquivo `.env` e configure a URL da API:
```
REACT_APP_API_URL=http://localhost:8080/api
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm build` - Gera build de produção
- `npm test` - Executa os testes
- `npm run eject` - Ejecta do Create React App (irreversível)

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Cabeçalho da aplicação
│   ├── ManifestacaoForm.tsx      # Formulário de manifestação
│   ├── ProtocoloDisplay.tsx      # Exibição do protocolo
│   ├── ConsultaProtocolo.tsx     # Consulta por protocolo
│   ├── ManifestacaoCard.tsx      # Card de manifestação
│   ├── IndicadoresCard.tsx       # Card de indicadores
│   └── FiltrosManifestacao.tsx   # Filtros do painel
├── pages/              # Páginas da aplicação
│   ├── NovaManifestacao.tsx      # Página de nova manifestação
│   ├── ConsultarProtocolo.tsx    # Página de consulta
│   └── PainelAtendente.tsx       # Painel do atendente
├── services/           # Serviços de API
│   └── api.ts         # Configuração e serviços da API
├── types/              # Definições de tipos TypeScript
│   └── index.ts       # Interfaces e tipos
├── utils/              # Utilitários e constantes
│   └── constants.ts   # Constantes da aplicação
├── App.tsx             # Componente principal
└── index.tsx           # Ponto de entrada
```

## Convenções de Código

### Nomenclatura
- **Componentes**: PascalCase (ex: `ManifestacaoForm`)
- **Arquivos**: PascalCase para componentes, camelCase para utilitários
- **Variáveis/Funções**: camelCase
- **Constantes**: UPPER_SNAKE_CASE
- **Tipos/Interfaces**: PascalCase

### Estrutura de Componentes
```typescript
import React from 'react';
import { ComponentProps } from '../types';

interface ComponentNameProps {
  // props aqui
}

const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  // hooks aqui
  const [state, setState] = React.useState();

  // handlers aqui
  const handleClick = () => {
    // lógica aqui
  };

  // render aqui
  return (
    <div>
      {/* JSX aqui */}
    </div>
  );
};

export default ComponentName;
```

### Estilos
- Use as classes CSS customizadas definidas em `src/index.css`
- Mantenha consistência com o design system
- Priorize acessibilidade e responsividade

## Tratamento de Erros

### API Calls
```typescript
try {
  const data = await apiService.method();
  // sucesso
} catch (error: any) {
  if (error.response?.status === 404) {
    toast.error('Recurso não encontrado');
  } else {
    toast.error('Erro interno. Tente novamente.');
  }
}
```

### Validação de Formulários
- Use React Hook Form para validação
- Defina regras de validação claras
- Exiba mensagens de erro amigáveis

## Testes

### Executar Testes
```bash
npm test
```

### Estrutura de Testes
```typescript
import { render, screen } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Deploy

### Build de Produção
```bash
npm run build
```

### Servir Build Localmente
```bash
npx serve -s build
```

## Troubleshooting

### Problemas Comuns

1. **Erro de CORS**
   - Verifique se o backend está configurado para aceitar requisições do frontend
   - Configure o proxy no `package.json` se necessário

2. **Erro de Tipos TypeScript**
   - Execute `npm run build` para verificar erros de tipo
   - Verifique se todos os tipos estão definidos corretamente

3. **Dependências Desatualizadas**
   - Execute `npm audit` para verificar vulnerabilidades
   - Execute `npm update` para atualizar dependências

### Logs de Desenvolvimento
- Use `console.log` para debug (remova antes do commit)
- Use React DevTools para inspecionar componentes
- Use Network tab do DevTools para verificar requisições

## Contribuição

1. Crie uma branch para sua feature
2. Faça suas alterações seguindo as convenções
3. Teste localmente
4. Crie um Pull Request com descrição clara
5. Aguarde review e aprovação
