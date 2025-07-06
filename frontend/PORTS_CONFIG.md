# Configuração de Portas - Projeto Gerenciamento de Obras

## Configuração Atual

### Portas
- **Frontend (Next.js)**: `3002`
- **Backend de Autenticação**: `3001`
- **Backend de Obras**: `3000`

### Alterações Realizadas

#### 1. package.json
- Alterado script de desenvolvimento para `"next dev -p 3002"`

#### 2. Configuração da API (src/lib/config.ts)
- Separada configuração entre backend de autenticação (porta 3001) e backend de obras (porta 3000)
- AUTH_BASE_URL: `http://localhost:3001` para autenticação
- OBRAS_BASE_URL: `http://localhost:3000` para funcionalidades de obras

#### 3. Serviços da API (src/lib/api.ts)
- Implementado sistema de roteamento automático por tipo de endpoint
- AuthService: Usa porta 3001 para autenticação
- ObrasService, MateriaisService, EquipamentosService: Usam porta 3000 para funcionalidades de obras
- ApiClient atualizado para gerenciar múltiplas bases de URL

### Benefícios das Mudanças

1. **Padronização**: Portas seguem o padrão solicitado (3002 para frontend, 3001 para autenticação, 3000 para backend de obras)
2. **Separação de Responsabilidades**: Backend de autenticação separado do backend de obras
3. **Centralização**: Configurações da API em um local único
4. **Manutenibilidade**: Fácil alteração de URLs e endpoints
5. **Reutilização**: Serviços de API podem ser reutilizados em outros componentes
6. **Tipo Safety**: Melhor tipagem e tratamento de erros

### Como Usar

#### Para fazer chamadas à API:
```typescript
import { AuthService, ObrasService, MateriaisService } from '@/lib/api';

// Autenticação (porta 3001)
const authData = await AuthService.login(email, password);

// Obras (porta 3000)
const obras = await ObrasService.getAll();
const materiais = await MateriaisService.getAll();

// Ou usando o cliente genérico
import { ApiClient } from '@/lib/api';
const authResult = await ApiClient.get('/auth/verify', true, true); // true para isAuthEndpoint
const obrasResult = await ApiClient.get('/obras', true, false); // false para isAuthEndpoint
```

#### Para alterar configurações:
Edite o arquivo `src/lib/config.ts`

### Execução
```bash
# Frontend (porta 3002)
npm run dev

# Backend de Autenticação deve rodar na porta 3001
# Backend de Obras deve rodar na porta 3000
```
