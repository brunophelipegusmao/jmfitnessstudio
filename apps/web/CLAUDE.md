# WEB | JM Fitness Studio | lang:pt-BR | frontend-only

<user>
role: senior-fullstack-dev
stack-owner: true
style: direct, no-fluff, no-validation
decision: autonomous — act, don't ask
</user>

## PRIORIDADE ABSOLUTA — FRONTEIRA DE SEGURANÇA

Este app é EXCLUSIVAMENTE frontend. Violação = STOP imediato + reverter.

NUNCA:
- Importar Drizzle, pg, Prisma, mysql2, ou qualquer ORM/driver de banco de dados
- Acessar banco diretamente — nem em Server Components, nem em Server Actions
- Usar variáveis de ambiente sem prefixo `NEXT_PUBLIC_` em Client Components
- Escrever regras de negócio: cálculos de plano, validações de domínio, lógica financeira — pertencem a apps/api
- Replicar guards/lógica de autorização do backend — consumir o retorno da API
- Importar módulos Node.js de sistema (`fs`, `path`, `crypto`, `child_process`, `os`) em código de app
- Criar endpoints de banco via Route Handlers (`/api/route.ts` que acessa DB)

Server Actions: PERMITIDAS apenas para orquestrar chamadas HTTP à `apps/api` — PROIBIDO acessar DB diretamente nelas.

<gates label="hard-gates | priority: gates>rules>rhythm | missing-one=STOP">

GATE-1 docs:
  trigger: any implementation using listed tech-stack
  action: consult Context7 MCP docs before writing code
  version-policy: ALWAYS use latest stable version — never assume, never hardcode versions
  applies-to: Next.js | Tailwind CSS | shadcn/ui | React | React Hook Form | Zod | react-number-format | Zustand | Vitest | TypeScript
  exception: trivial config changes with no API surface
  violation: coding from memory or against outdated API = STOP + consult Context7 first

GATE-2 types:
  trigger: every file created or edited
  action: full TypeScript — no `any`, no implicit types
  banned: `any` | untyped returns | missing interfaces
  violation: type shortcuts → rewrite before proceeding

GATE-3 dry:
  trigger: same logic appears 2+ times
  action: extract to reusable hook/component/util
  banned: copy-paste logic | duplicated fetch patterns | repeated form setup

GATE-4 install:
  trigger: any package or component needed
  action: always install via CLI — never create manually
  rules:
    packages:  pnpm add <pkg> | pnpm add -D <pkg>
    shadcn:    pnpm dlx shadcn@latest add <component>
  banned:
    - adding dependencies directly in package.json by hand
    - copying shadcn component source instead of using shadcn CLI
  violation: manually created file that should come from CLI = delete + redo via CLI

GATE-5 test:
  trigger: every hook, util, or critical component created or modified
  action: write unit test alongside the implementation — never skip
  co-location: test file lives next to source (<name>.test.tsx)
  runner: Vitest + React Testing Library
  banned:
    - shipping hook or util without corresponding .test.tsx
    - empty test files
    - testing implementation details instead of behavior
  violation: untested hook/util = incomplete — do not mark as done

</gates>

<rules>

STACK:
  framework: Next.js (latest stable) — App Router only — port 3000
  ui: shadcn/ui components em src/components/ui/ — instalados via CLI
  styles: Tailwind CSS 4 — tema único em src/app/globals.css
  fonts: next/font/local — declaradas em src/app/layout.tsx, arquivos em src/fonts/
  forms: React Hook Form + Zod resolver
  masks: react-number-format — todos os inputs mascarados (CPF, telefone, moeda, data)
  state-management:
    global: Zustand — src/store/ — sessão do usuário, UI global, estado cross-route
    local: useState/useReducer — estado isolado de componente
    banned: prop-drilling além de 2 níveis → usar Zustand
  testing: Vitest + React Testing Library
  language: TypeScript strict

ESTRUTURA DE PASTAS:
  src/app/
    layout.tsx              → root layout: html, body, fontes, providers globais
    globals.css             → único tema OKLCH — NÃO duplicar variáveis aqui
    page.tsx                → / (landing page)

    (public)/               → com Header público — site aberto
      layout.tsx            → renderiza <Header /> + children
      events/page.tsx       → /events — eventos públicos
      plans/page.tsx        → /plans — planos disponíveis
      components/           → componentes específicos da landing (header, hero, etc.)

    (auth)/                 → sem Header — fluxo de autenticação
      layout.tsx            → layout limpo (só children)
      login/page.tsx        → /login — login único (todos os papéis)
      register/page.tsx     → /register — cadastro de novo usuário

    (student)/              → área do aluno (planos master/guest)
      layout.tsx            → sidebar do aluno + children
      student/
        page.tsx            → /student — dashboard (status do plano)
        checkin/page.tsx    → /student/checkin — auto check-in (plano master, ativo)
        metrics/page.tsx    → /student/metrics — evolução corporal (plano master)
        events/page.tsx     → /student/events — inscrição em eventos (guest + master)
        orders/page.tsx     → /student/orders — histórico de pedidos do e-commerce
      components/           → componentes específicos da área do aluno

    (panel)/                → painel admin (owner/instructor/staff)
      layout.tsx            → sidebar do painel + children
      panel/
        page.tsx                    → /panel — dashboard
        students/
          page.tsx                  → /panel/students — lista de alunos
          [id]/page.tsx             → /panel/students/[id] — detalhes (métricas, histórico, checkin)
        instructors/page.tsx        → /panel/instructors — gestão de professores
        staff/page.tsx              → /panel/staff — gestão de funcionários
        checkin/page.tsx            → /panel/checkin — liberar check-in por cortesia (staff)
        events/
          page.tsx                  → /panel/events — lista de eventos
          [id]/page.tsx             → /panel/events/[id] — editar / publicar / aprovar
        financials/page.tsx         → /panel/financials — pagamentos e planos de alunos
        products/
          page.tsx                  → /panel/products — catálogo de produtos (admin)
          [id]/page.tsx             → /panel/products/[id] — criar / editar produto
        orders/page.tsx             → /panel/orders — gestão de pedidos do e-commerce
      components/           → componentes específicos do painel

    (ecommerce)/            → catálogo público de produtos
      layout.tsx            → layout da loja (header da loja, ícone do carrinho)
      store/
        page.tsx            → /store — listagem de produtos
        [slug]/page.tsx     → /store/[slug] — página do produto individual
        cart/page.tsx       → /store/cart — carrinho de compras
        checkout/page.tsx   → /store/checkout — checkout (Stripe — pendente)
      components/           → componentes específicos do catálogo

  src/components/ui/        → primitivos shadcn compartilhados entre route groups
                              instalados via: pnpm dlx shadcn@latest add <nome>
                              NÃO criar manualmente

  src/hooks/                → custom hooks reutilizáveis entre route groups
  src/lib/                  → utils (cn, formatters, helpers)
  src/store/                → stores Zustand
  src/fonts/                → arquivos .ttf carregados via next/font/local
  public/icons/             → ícones e logos (URL: "/icons/filename")
  public/images/            → banners e imagens de conteúdo (URL: "/images/filename")
  REGRA-IMAGENS: toda imagem vai para public/ e é referenciada por string URL
                 NUNCA usar static import de imagem

REGRAS DE COMPONENTES:
  shadcn: sempre importar de "@/components/ui/<nome>" — nunca de pacote externo
  componentes de feature: ficam dentro do route group → (public)/components/, (panel)/components/, etc.
  primitivos UI (button, card, input, etc.): ficam em src/components/ui/
  client components: mínimo necessário — server components primeiro
  "use client": somente quando há interatividade, event listeners, ou hooks de estado do React

COMUNICAÇÃO COM API:
  destino: TODA chamada de dados vai para apps/api (porta 3001)
  base-url: NEXT_PUBLIC_API_URL (variável de ambiente obrigatória)
  server-components: fetch direto ao endpoint da API com cache/revalidate
  client-components: custom hook com fetch — nunca fetch direto no JSX
  server-actions: só para orquestrar chamadas HTTP à API — NUNCA acessar DB diretamente
  banned: chamadas a banco, imports de Drizzle, queries SQL em qualquer arquivo deste app

ENV VARS:
  client-components: SOMENTE variáveis com prefixo NEXT_PUBLIC_
  server-components/actions: podem usar variáveis privadas APENAS para chamar a API
  banned: variáveis de conexão de banco (DATABASE_URL, etc.) neste app

SEGURANÇA:
  xss: proibido dangerouslySetInnerHTML sem sanitização explícita
  inputs: sempre validar com Zod antes de enviar para a API
  imagens: configurar next.config.ts com domains/remotePatterns explícitos
  tokens: nunca armazenar token de sessão em localStorage — usar cookies httpOnly via API

CODE-QUALITY:
  naming: kebab-case para arquivos e pastas
  comments: nenhum — código deve ser autoexplicativo
  banned-patterns:
    - lógica complexa dentro de TSX (extrair para hook ou util)
    - prop-drilling além de 2 níveis
    - non-descriptive names (data, res, temp, x)

</rules>

<rhythm>
before-implement: GATE-1 → check latest docs via Context7 → then code
new-page: identificar route group correto pela tabela em ESTRUTURA DE PASTAS → criar page.tsx no grupo → layout próprio se necessário
new-component:
  - é primitivo UI? → pnpm dlx shadcn@latest add → src/components/ui/
  - é de feature? → criar em (route-group)/components/
new-form: Zod schema → React Hook Form → react-number-format nos inputs mascarados
new-api-call: server component por padrão → custom hook client apenas se precisar de interatividade
new-state: Zustand store em src/store/ se for global → useState se for local
new-font: next/font/local em layout.tsx → arquivo .ttf em src/fonts/
</rhythm>

<ref label="on-demand — read only when domain is active">
src/app/(public)/           → landing page e componentes públicos (/events, /plans)
src/app/(auth)/             → login e cadastro (/login, /register)
src/app/(student)/          → área do aluno (/student, checkin, metrics, events, orders)
src/app/(panel)/            → painel admin (/panel e todos os sub-domínios)
src/app/(ecommerce)/        → catálogo de produtos (/store, [slug], cart, checkout)
src/components/ui/          → primitivos shadcn compartilhados
src/store/                  → stores Zustand
src/app/globals.css         → tema único do projeto
</ref>
