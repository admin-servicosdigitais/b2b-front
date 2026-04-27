# RBS B2B — Frontend

Interface do Copiloto B2B: dashboard, kanban, sala de guerra, recomendações e chat com IA.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript 5 (strict) |
| Estilo | Tailwind CSS + shadcn/ui |
| Estado global | Zustand 5 |
| Gráficos | Recharts |
| Drag & drop | @dnd-kit |
| Ícones | lucide-react |
| Linter | ESLint (next/core-web-vitals) |

---

## Pré-requisitos

- Node.js 20+
- npm 10+ (ou pnpm/bun)
- Backend rodando em `localhost:8000`

---

## Setup

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.local.example .env.local
# Editar NEXT_PUBLIC_API_URL se necessário

# 3. Subir em modo desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`.

---

## Variáveis de ambiente

| Variável | Descrição | Padrão |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base do backend | `http://localhost:8000` |

> Variáveis com prefixo `NEXT_PUBLIC_` são expostas ao browser — **nunca colocar secrets aqui**.

---

## Estrutura

```
src/
├── app/                        # Rotas (Next.js App Router — file-based)
│   ├── layout.tsx              # Root layout (fonte, providers globais)
│   ├── page.tsx                # Dashboard (/)
│   ├── clientes/[id]/          # Detalhe do cliente (/clientes/:id)
│   ├── copiloto/               # Chat com IA (/copiloto)
│   ├── kanban/                 # Board Kanban (/kanban)
│   └── sala-de-guerra/         # Visão consolidada (/sala-de-guerra)
├── components/
│   ├── ui/                     # Primitivos shadcn/ui (Button, Card, etc.)
│   ├── layout/                 # AppShell, Sidebar, Header
│   ├── dashboard/              # Componentes específicos do dashboard
│   ├── cliente/                # Componentes de detalhe de cliente
│   ├── kanban/                 # Board, Card, Column
│   ├── copiloto/               # Chat, MessageBubble
│   └── sala-de-guerra/         # Widgets da sala de guerra
├── hooks/                      # Custom hooks — lógica reutilizável por domínio
│   ├── useDashboard.ts
│   ├── useCliente.ts
│   ├── useKanban.ts
│   ├── useCopiloto.ts
│   ├── useRecomendacoes.ts
│   └── useSalaDeGuerra.ts
├── services/                   # Camada de acesso à API (fetch/axios wrappers)
│   ├── api-client.ts           # Cliente HTTP base
│   ├── clientes.service.ts
│   ├── dashboard.service.ts
│   ├── kanban.service.ts
│   ├── copiloto.service.ts
│   └── recomendacoes.service.ts
├── store/                      # Stores Zustand — um por domínio
│   ├── cliente.store.ts
│   ├── dashboard.store.ts
│   ├── kanban.store.ts
│   ├── copiloto.store.ts
│   └── recomendacoes.store.ts
├── types/                      # Tipos TypeScript compartilhados
│   ├── api.ts                  # Contratos de request/response
│   ├── ui.ts                   # Props e tipos de componentes
│   └── enums.ts                # Enumerações compartilhadas
├── lib/
│   ├── utils.ts                # Helpers genéricos (cn, etc.)
│   ├── formatters.ts           # Formatação de datas, moeda, etc.
│   └── constants.ts            # Constantes globais
└── config/
    └── navigation.ts           # Itens de menu e rotas de navegação
```

### Fluxo de dados

```
Page / Route Component
    ↓ usa
Custom Hook (useXxx)
    ↓ lê/escreve
Zustand Store  ←→  Service (API call)
```

Componentes não chamam serviços diretamente — toda orquestração fica nos hooks.

---

## Padrões de código

### Componentes

- **Server Components por padrão** — marcar `"use client"` apenas quando necessário (interatividade, hooks, browser APIs)
- Um componente por arquivo; nome do arquivo = nome do componente (`PascalCase`)
- Props tipadas com interface explícita no mesmo arquivo
- Máximo 150 linhas por componente — extrair subcomponentes se ultrapassar

```tsx
// BOM — interface explícita, sem `any`
interface ClienteCardProps {
  cliente: Cliente;
  onSelect: (id: string) => void;
}

export function ClienteCard({ cliente, onSelect }: ClienteCardProps) { ... }
```

### Hooks

- Prefixo `use` obrigatório
- Responsabilidade única: um hook por domínio/recurso
- Nunca retornar JSX de um hook — apenas dados e callbacks

```ts
// hooks/useCliente.ts
export function useCliente(id: string) {
  const { cliente, setCliente } = useClienteStore();
  // fetch, error handling, loading state...
  return { cliente, isLoading, error, refresh };
}
```

### Stores (Zustand)

- Estado mínimo — não duplicar dados que podem ser derivados
- Actions colocalizadas com o estado no mesmo `create()`
- Tipagem explícita da interface do store

```ts
interface ClienteStore {
  cliente: Cliente | null;
  isLoading: boolean;
  setCliente: (c: Cliente) => void;
  reset: () => void;
}

export const useClienteStore = create<ClienteStore>((set) => ({
  cliente: null,
  isLoading: false,
  setCliente: (cliente) => set({ cliente }),
  reset: () => set({ cliente: null, isLoading: false }),
}));
```

### Services

- Funções puras que retornam `Promise<T>` — sem side effects de estado
- Error handling explícito — nunca swallow silencioso
- Tipos de resposta derivados de `types/api.ts`

```ts
// services/clientes.service.ts
export async function getCliente(id: string): Promise<Cliente> {
  const res = await apiClient.get(`/clientes/${id}`);
  if (!res.ok) throw new ApiError(res.status, await res.json());
  return res.json();
}
```

### TypeScript

- `strict: true` — sem exceções
- Proibido `any` — usar `unknown` quando o tipo não é conhecido e narrowing quando necessário
- Exportar tipos de `types/` — não redeclarar inline em vários arquivos
- Enum numérico apenas se houver integração com backend; preferir union de strings

---

## Estilo e UI

- **Tailwind utilitário** — sem CSS customizado exceto em `globals.css` para variáveis de tema
- Componentes shadcn/ui ficam em `components/ui/` — não modificar diretamente; criar wrappers se precisar de comportamento extra
- Dark mode via classe `dark` na raiz (configurado em `tailwind.config.ts`)
- Cores de tema via custom tokens `brand.*` e `surface.*` — não usar cores hardcoded do Tailwind em componentes de negócio

```tsx
// EVITAR — cor hardcoded
<div className="bg-blue-600 text-white">

// PREFERIR — token semântico
<div className="bg-brand-primary text-white">
```

---

## Roteamento (App Router)

- Cada rota = pasta em `app/` com `page.tsx`
- Layouts compartilhados em `layout.tsx` no nível adequado da hierarquia
- Rotas dinâmicas: `[param]/page.tsx` — validar param antes de usar
- Loading states: `loading.tsx` na mesma pasta da rota
- Error boundaries: `error.tsx` por segmento de rota

---

## Performance

- Preferir **Server Components** para fetches que não precisam de interatividade
- `next/image` para todas as imagens — nunca `<img>` direto
- `next/link` para navegação interna — nunca `<a>` direto
- Lazy loading com `React.lazy` + `Suspense` para componentes pesados (gráficos, modais)
- Evitar re-renders desnecessários: `useMemo`/`useCallback` apenas quando profiling indicar problema

---

## Comandos

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build
npm run start

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

---

## Adicionando uma nova feature

1. Criar tipos em `src/types/api.ts` (contratos com backend)
2. Criar `src/services/<feature>.service.ts` (chamadas HTTP)
3. Criar `src/store/<feature>.store.ts` (estado Zustand)
4. Criar `src/hooks/use<Feature>.ts` (orquestração)
5. Criar componentes em `src/components/<feature>/`
6. Criar rota em `src/app/<feature>/page.tsx`

---

## Segurança

- Variáveis `NEXT_PUBLIC_*` são públicas — nunca colocar API keys ou secrets
- Sanitizar inputs antes de exibir HTML dinâmico (evitar `dangerouslySetInnerHTML`)
- Validar parâmetros de rota dinâmica antes de qualquer fetch
- CSP configurado via `next.config.mjs` — não relaxar sem revisão
