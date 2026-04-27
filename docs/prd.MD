# 📄 PRD FRONTEND — Copiloto de Vendas B2B com IA

---

# 1. Assunto

Desenvolvimento do **Frontend MVP** do sistema **Copiloto de Vendas B2B com IA**, com foco em causar alto impacto visual, estratégico e executivo.

O frontend deve transformar os recursos existentes do backend FastAPI em uma experiência moderna, intuitiva e com forte percepção de valor de negócio.

---

# 2. Objetivo Estratégico

O MVP não tem objetivo de ser um CRM completo.

Seu objetivo principal é:

- Demonstrar visão de futuro comercial
- Mostrar aplicação prática de IA em vendas B2B
- Impressionar executivos e gestores
- Validar potencial de evolução do produto
- Comunicar inovação + resultado comercial

---

# 3. Público-Alvo

## 3.1 Liderança Comercial

- Diretoria comercial
- Gestão B2B
- Heads de receita

## 3.2 Time de Vendas

- Executivos de contas
- SDRs
- Hunters
- Farmers

## 3.3 Tecnologia / Inovação

- Arquitetura
- Produto
- IA / Dados

---

# 4. Proposta de Valor do Frontend

O usuário deve sentir que entrou em:

> “O futuro da operação comercial B2B”

Não deve parecer:

- sistema legado
- CRUD bonito
- dashboard comum
- CRM genérico

Deve parecer:

- plataforma premium
- produto estratégico
- copiloto inteligente
- cockpit de receita

---

# 5. Identidade Visual

## Direção visual:

- Sofisticação corporativa
- Visual clean premium
- Forte uso de dados
- UI moderna estilo SaaS enterprise
- Alta legibilidade
- Sensação de velocidade

## Paleta sugerida:

- Azul institucional
- Branco
- Tons escuros neutros
- Accent color em laranja/vermelho estratégico

## Referências:

- Hubspot Enterprise
- Salesforce Lightning
- Notion AI
- Linear
- Stripe Dashboard

---

# 6. Stack Recomendada

## Frontend

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI

## Estado

- Zustand

## Gráficos

- Recharts

## Drag & Drop

- @dnd-kit/core

## Ícones

- Lucide React

---

# 7. Estrutura Principal de Telas

---

# Tela 1 — Executive Dashboard

## Objetivo

Impressionar diretoria em 30 segundos.

## Componentes:

### KPIs Topo

- Receita potencial total
- Receita fechada
- Receita em negociação
- Conversão do funil
- Ticket médio
- Clientes quentes hoje

### Gráficos

- Evolução mensal de oportunidades
- Receita por segmento
- Conversão por etapa
- Risco de perda

### Insights IA

Card lateral:

> IA detectou aumento de oportunidades no segmento Saúde (+28%)

> 3 negociações críticas sem follow-up há 14 dias

---

# Tela 2 — Kanban Comercial Inteligente

## Objetivo

Virar o coração operacional do MVP.

## Colunas:

- Leads
- Qualificados
- Proposta
- Negociação
- Fechado

## Card do Cliente

- Nome empresa
- Segmento
- Ticket
- Score IA
- Última interação
- Próxima ação IA
- Badge prioridade

## Diferenciais

Hover no card mostra:

- dores
- objeções
- resumo rápido

---

# Tela 3 — Cliente 360º

## Objetivo

Demonstrar poder do copiloto.

## Layout:

### Cabeçalho

- Nome empresa
- Status atual
- Ticket
- Score fechamento

### Tabs

#### Resumo IA

> Cliente maduro comercialmente, principal objeção atual é ROI.

#### Timeline

- reuniões
- emails
- propostas
- interações IA

#### Oportunidades

- upsell
- cross sell
- sazonalidade

#### Recomendações

- Agendar call com ROI
- Enviar case similar
- Oferecer piloto reduzido

---

# Tela 4 — Copiloto Conversacional

## Objetivo

Criar efeito WOW.

Input tipo ChatGPT:

> Quem devo priorizar hoje?

> Quais clientes estão em risco?

> Monte abordagem para MetalSul.

Resposta elegante em cards.

---

# Tela 5 — Sala de Guerra Comercial

## Objetivo

Executivo amar.

Painel em tempo real:

- negócios travados
- propostas paradas
- top oportunidades
- receita provável do mês
- clientes sem contato

---

# 8. Funcionalidades Prioritárias MVP

## P0

- Dashboard executivo
- Kanban inteligente
- Cliente 360
- Perguntas para IA

## P1

- Alertas automáticos
- Dark mode
- Simulação de forecast

## P2

- Geração de proposta
- WhatsApp integrado
- Agenda IA

---

# 9. Integração com Backend

## Endpoints principais

```http
GET /dashboard/indicadores
GET /funil/kanban
GET /clientes/{id}
GET /clientes/{id}/recomendacoes
POST /copiloto/perguntar
POST /copiloto/clientes/{id}/resumo
POST /copiloto/clientes/{id}/proxima-acao

---

# 10. UX Regras de Ouro

## O sistema precisa parecer simples mesmo sendo poderoso.

Regra interna:

“Um diretor bêbado precisa entender em 20 segundos.”

Portanto:
zero poluição visual
poucos cliques
informações resumidas
hierarquia visual forte
IA em destaque

---

# 11. Motion / Microinterações

Cards entrando suaves
KPIs contando números
Drag and drop fluido
Chat digitando resposta
Hover premium

---

# 12. Frases de Impacto no Produto

No topo do dashboard:

Bem-vindo ao Copiloto Comercial

Subtexto:

Dados, inteligência e ação para acelerar receita B2B.

--- 

# 13. Critérios de Sucesso

Se ao apresentar alguém disser:

“isso está pronto?”
“quando podemos usar?”
“isso ajuda muito vendas”
“isso muda nossa operação”

Então MVP venceu.

--- 

# 14. O que NÃO fazer

Formulários demais
Cara de sistema legado
CRUD aparente
Menus complexos
Excesso de texto
Gráficos inúteis

---

# 15. Estrutura Técnica Sugerida

```
src/
 ├── app/
 ├── components/
 ├── features/
 │   ├── dashboard/
 │   ├── kanban/
 │   ├── client360/
 │   ├── copiloto/1
 ├── services/
 ├── store/
 ├── lib/
```

O backend está rodando no caminho http://localhost:8000/.
Exemplos de output podem ser analisados no projeto do backend que está na base da pasta.
