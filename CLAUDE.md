# JM-FITNESS | lang:pt-BR | for-AI-parsing | optimize=results-over-format

<user>
role: senior-fullstack-dev
stack-owner: true
style: direct, no-fluff, no-validation
decision: autonomous — act, don't ask
</user>

<gates label="hard-gates | priority: gates>rules>rhythm | missing-one=STOP">

GATE-1 docs:
  trigger: any implementation using listed tech-stack
  action: consult Context7 MCP docs before writing code
  version-policy: ALWAYS use latest stable version — never assume, never hardcode versions
  applies-to: Next.js | Tailwind CSS | shadcn/ui | BetterAuth | Drizzle ORM | NestJS | Fastify | Stripe | Zod | React | React Hook Form | react-number-format | Zustand | Vitest | Jest | Winston | TypeScript
  exception: trivial config changes with no API surface
  violation: coding from memory or against outdated API = STOP + consult Context7 first

GATE-2 types:
  trigger: every file created or edited
  action: full TypeScript — no `any`, no implicit types
  banned: `any` | untyped returns | missing interfaces
  violation: type shortcuts → rewrite before proceeding

GATE-3 dry:
  trigger: same logic appears 2+ times
  action: extract to reusable function/component/hook
  banned: copy-paste logic | duplicated validation | repeated fetch patterns

GATE-4 install:
  trigger: any package, tool, component, or scaffold needed
  action: always install and scaffold via CLI — never create or edit manually
  rules:
    packages:        pnpm add <pkg> | pnpm add -D <pkg>
    nestjs-scaffold: nest generate module|controller|service|guard|pipe|interceptor
    shadcn:          pnpm dlx shadcn@latest add <component>
    next-init:       pnpm dlx create-next-app@latest
    nest-init:       pnpm dlx @nestjs/cli@latest new
    drizzle:         pnpm dlx drizzle-kit generate | drizzle-kit migrate
  banned:
    - adding dependencies directly in package.json by hand
    - writing NestJS modules/controllers/services manually instead of nest generate
    - copying shadcn component source instead of using shadcn CLI
    - any scaffold that has a CLI equivalent done by hand
  violation: manually created file that should come from CLI = delete + redo via CLI

GATE-5 test:
  trigger: every service, guard, hook, or util created or modified
  action: write unit test alongside the implementation — never skip
  co-location: test file lives next to source file (<name>.spec.ts)
  banned:
    - shipping service or guard without corresponding .spec.ts
    - empty test files (describe blocks with no assertions)
    - testing implementation details instead of behavior
  violation: untested service/guard/hook = incomplete — do not mark as done

</gates>

<rules>

STACK:
  version-rule: all packages must be at their latest stable version at time of install
  backend:
    framework: NestJS (latest stable) + Fastify (latest stable) — never Express
    orm: Drizzle ORM + drizzle-zod
    auth: BetterAuth
    db: PostgreSQL
    validation: Zod
    payments: Stripe (plans + monthly fees)
    testing: Jest + @nestjs/testing (comes with NestJS — use it)
    logging: Winston (latest stable) via nest-winston
    docs: @nestjs/swagger — Swagger/OpenAPI auto-generated
    package-manager: pnpm
  frontend:
    framework: Next.js (latest stable) — App Router only
    ui: shadcn/ui + Tailwind CSS (latest stable)
    forms: React Hook Form + Zod
    masks: react-number-format (always — no native masks, no other mask lib)
    state: React (latest stable) — server components first
    state-management: Zustand (latest stable) — client-side global state
    testing: Vitest + React Testing Library
  shared:
    language: TypeScript (strict, latest stable)
    monorepo: pnpm workspaces + Turborepo

CODE-QUALITY:
  principles: SOLID | Clean Code | DRY
  naming:
    variables: descriptive (isLoading, hasError, canCheckin)
    files: kebab-case always
    folders: kebab-case always
  comments: none — code must be self-explanatory
  banned-patterns:
    - unnecessary comments
    - non-descriptive names (data, res, temp, x)
    - logic inside TSX beyond ternary
    - fat controllers (logic belongs in services)

MONOREPO-STRUCTURE:
  apps/api:                   NestJS + Fastify — REST API — port 3001
  apps/web:                   Next.js — todas as interfaces frontend — port 3000
    route-groups:
      (public)/    → landing page e site público (com Header)
      (auth)/      → login e cadastro (sem Header)
      (student)/   → área do aluno (planos master/guest)
      (panel)/     → painel admin (owner/instructor/staff)
      (ecommerce)/ → catálogo de produtos (expositor)
  packages/db:                Drizzle schema + migrations
  packages/validators:        shared Zod schemas
  packages/typescript-config: shared tsconfig base
  NOTE: packages/ui foi removido — componentes UI vivem em apps/web/src/components/ui/

AUTH-MODEL:
  system: unified — single auth flow, role+plan per user
  roles: owner | instructor | staff | student
  plans: free | guest | master
  role-access:
    owner: full access everywhere
    instructor: apps/web (panel) — student data only (metrics, history, evolution)
    staff: apps/web (panel) — financial (accounts, payments, checkin release)
    student: apps/web (student) — based on plan
  plan-access:
    free: dashboard showing plan status only
    guest: event enrollment only
    master: full — checkin, evolution, metrics

DOMAIN-RULES:
  checkin:
    normal: student self-checkin (master plan, active)
    courtesy: staff releases manually when plan expired
    courtesy-fields: released_by | note | checked_in_at
  metrics:
    student-fills: weight | blood_type | birth_date | basic data
    instructor-fills: body_fat | muscle_mass | measurements | performance notes
    all-entries: recorded_by field always populated
  events:
    owner+staff: create → publish directly
    instructor: create → status=pending → requires owner approval
  financials:
    plan_expires_at: calculated as paid_at + 30 days
    payment_method: stripe | manual
    stripe: webhook confirms automatically → update plan_expires_at (no staff needed)
    manual: staff sets confirmed_by → update plan_expires_at
    stripe_payment_id: populated on stripe payments only
    trigger: confirmed_by set OR stripe webhook → update user.plan_expires_at
  ecommerce:
    route: apps/web/(ecommerce)/ — route group dentro do Next.js único
    current-mode: expositor only — no checkout, no transaction
    future: prepared for stripe integration when sales are enabled
    products: physical goods only (supplements, accessories — nothing studio-related)
    catalog-management: owner + staff via apps/web/(panel)/products
    schema: products table — separate domain, no relation to plans/training

NESTJS-PATTERNS:
  http-adapter: Fastify only — never platform-express in production
  structure: module per domain (auth, users, checkin, metrics, events, financials, products)
  env: FRONTEND_URL added to api .env for CORS (único frontend em apps/web)
  validation: class-validator + class-transformer on DTOs
  guards: role-based + plan-based per route
  never: logic in controllers — always delegate to services
  stripe-webhook:
    endpoint: raw body required — configure Fastify rawBody before JSON parse
    signature: always verify stripe-signature header before processing
    idempotency: check stripe_payment_id exists before updating financials

SWAGGER:
  setup: @nestjs/swagger configured in main.ts bootstrap
  scope: all endpoints documented — no undocumented routes
  decorators:
    controllers: @ApiTags('<domain>')
    routes: @ApiOperation | @ApiResponse (success + error cases)
    DTOs: @ApiProperty on every field
    auth: @ApiBearerAuth on all protected routes
  url: /docs (development only — disable in production)

LOGGING:
  lib: Winston via nest-winston
  transport:
    development: Console (colorized, readable)
    production: Console + File (combined.log + error.log)
  levels: error | warn | info | debug
  rules:
    - log every unhandled exception with full stack trace
    - log every HTTP error (4xx, 5xx) with method, route, status, duration
    - log every Stripe webhook event received and its processing result
    - log every courtesy checkin (who released, for whom, when)
    - never log sensitive data (passwords, tokens, card numbers)
  interceptor: global HTTP logging interceptor on all routes
  filter: global exception filter catches and logs all unhandled errors

TESTING:
  backend:
    runner: Jest + @nestjs/testing
    scope: unit tests for every service, guard, and utility
    pattern: <filename>.spec.ts co-located with source
    mocks: mock all external dependencies (db, stripe, auth) — never hit real services in tests
    coverage: services and guards must have meaningful coverage — no empty specs
  frontend:
    runner: Vitest + React Testing Library
    scope: unit tests for hooks, utils, and critical components
    pattern: <filename>.test.tsx co-located with source
  shared-rules:
    - test behavior not implementation
    - one concept per test block
    - descriptive test names: should <do something> when <condition>

NEXT-PATTERNS:
  routing: App Router only — no pages/ directory
  data-fetching: server components first — client only when interactive
  forms: React Hook Form + Zod resolver always
  masks: react-number-format for all masked inputs (phone, CPF, currency, date)
  state-management:
    global: Zustand — user session, cart, UI state, cross-component state
    local: useState/useReducer — isolated component state only
    banned: prop-drilling beyond 2 levels → use Zustand store instead
  api-calls: server components or server actions first — avoid client-side fetch when possible

</rules>

<rhythm>
before-implement: GATE-1 → check latest stable version via Context7 → then code
before-install: GATE-4 → use CLI command — never manually
new-component: check if shadcn/ui has it first → pnpm dlx shadcn@latest add → customize if needed
new-nestjs-file: nest generate → never create module/service/controller by hand
new-endpoint: define DTO (@ApiProperty) → define guard → implement service → implement controller → write .spec.ts → document @ApiOperation + @ApiResponse
new-schema: define in packages/db → pnpm dlx drizzle-kit generate → drizzle-kit migrate → never edit migration files manually
new-form: Zod schema first → React Hook Form → masked inputs via react-number-format
new-error: log via Winston (error level + stack trace) → return typed HTTP exception
pr-ready: types pass | no `any` | no duplicated logic | kebab-case files | all installs via CLI | tests written | swagger documented
</rhythm>

<ref label="on-demand — read only when domain is active">
packages/db/schema/              → all Drizzle table definitions
packages/validators/             → shared Zod schemas
apps/api/src/auth/               → BetterAuth guards and controller
apps/web/src/app/(public)/       → landing page e site público
apps/web/src/app/(auth)/         → login e cadastro
apps/web/src/app/(student)/      → área do aluno
apps/web/src/app/(panel)/        → painel admin/instructor/staff
apps/web/src/app/(ecommerce)/    → catálogo de produtos
</ref>
