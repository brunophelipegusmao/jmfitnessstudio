# JM-FITNESS API | lang:pt-BR | for-AI-parsing | optimize=results-over-format

role: senior-backend-dev
scope: apps/api only — NestJS + Fastify
style: direct, no-fluff, no-validation
decision: autonomous — act, don't ask

---

## GATES

GATE-1 docs:
trigger: any implementation using listed tech-stack
action: consult Context7 MCP docs before writing code
version-policy: ALWAYS use latest stable version — never assume, never hardcode versions
applies-to: NestJS | Fastify | BetterAuth | Drizzle ORM | Zod | Stripe | Jest | Winston | TypeScript | @nestjs/swagger | @nestjs/schedule
exception: trivial config changes with no API surface
violation: coding from memory = STOP + consult Context7 first

GATE-2 types:
trigger: every file created or edited
action: full TypeScript — no `any`, no implicit types
banned: `any` | untyped returns | missing interfaces
violation: type shortcuts → rewrite before proceeding

GATE-3 dry:
trigger: same logic appears 2+ times
action: extract to reusable service/util/guard
banned: copy-paste logic | duplicated validation | repeated patterns

GATE-4 install:
trigger: any package or scaffold needed
action: always via CLI — never manually
rules:
  packages: pnpm add | pnpm add -D
  nestjs-scaffold: nest generate module|controller|service|guard|pipe|interceptor
  drizzle: pnpm dlx drizzle-kit generate | drizzle-kit migrate
banned:
  - adding dependencies directly in package.json by hand
  - writing NestJS modules/controllers/services manually instead of nest generate
  - editing migration files manually
violation: manually created file that should come from CLI = delete + redo via CLI

GATE-5 test:
trigger: every service, guard, or util created or modified
action: write unit test alongside the implementation — never skip
co-location: test file lives next to source file (.spec.ts)
banned:
  - shipping service or guard without corresponding .spec.ts
  - empty test files (describe blocks with no assertions)
  - testing implementation details instead of behavior
violation: untested service/guard = incomplete — do not mark as done

---

## STACK

framework: NestJS (latest stable) + Fastify (latest stable) — never Express
orm: Drizzle ORM + drizzle-zod (schema in packages/db)
auth: BetterAuth
db: PostgreSQL
validation: Zod + class-validator + class-transformer on DTOs
payments: Stripe Subscriptions (never one-time PaymentIntent for plans)
testing: Jest + @nestjs/testing
logging: Winston (latest stable) via nest-winston
docs: @nestjs/swagger — all endpoints documented
scheduler: @nestjs/schedule — cron jobs for grace period processing
package-manager: pnpm
language: TypeScript strict

---

## AUTH MODEL

system: BetterAuth — unified auth, single user table, role+plan per user
social-providers: Google OAuth — available to all roles on registration
default-on-register: role=customer, plan=free

roles: owner | instructor | staff | student | customer

role-access:
  owner: full access — all routes, all panels
  instructor: (panel)/ — student metrics, history, evolution only
  staff: (panel)/ — financials, payments, checkin release, courtesy
  student: (student)/ — based on active plan
  customer: (ecommerce)/ only — no studio access

plan-access:
  free: no studio access — dashboard showing plan status only
  guest: event enrollment only
  master: full — checkin, evolution, metrics

role-promotion:
  customer → student: automatic via Stripe webhook on plan payment
  student → customer: automatic via cron job after grace period expires
  never: staff or owner manually promotes/demotes for plan-based access

admin-auth-policy:
  owner | instructor | staff: email + password only — never Google OAuth
  customer | student: Google OAuth or email + password allowed

---

## SUBSCRIPTION & PLAN LIFECYCLE

model: Stripe Subscriptions — never one-time PaymentIntent for plans
metadata-required: every Stripe Checkout Session or Subscription must include:
  metadata.type: 'plan' | 'product'
  metadata.plan_type: 'guest' | 'master' (when type=plan)
  metadata.user_id: internal user id

lifecycle:
  active:
    - subscription_status: active
    - role: student
    - plan: guest | master
    - plan_expires_at: updated on every invoice.payment_succeeded

  canceling (aluno cancela renovação automática):
    - subscription_status: canceling
    - role: student (mantém acesso até expirar)
    - plan_expires_at: data final do período já pago
    - Stripe continua ativo até o fim do período

  grace period (plano expirou após cancelamento):
    - trigger: customer.subscription.deleted webhook
    - subscription_status: grace
    - grace_period_until: now + 5 days
    - role: student (mantém acesso durante grace)
    - aviso visível na UI durante esse período

  expired:
    - trigger: cron job diário — verifica grace_period_until < now
    - subscription_status: expired
    - role: student → customer
    - plan: any → free
    - grace_period_until: null
    - checkin bloqueado, acesso (student)/ revogado

  reativação dentro do grace period:
    - aluno paga novo plano manualmente
    - webhook invoice.payment_succeeded → subscription_status: active
    - grace_period_until: null
    - role mantém student, plan atualizado

stripe-webhook-events:
  invoice.payment_succeeded:
    - type=plan: atualiza plan_expires_at, subscription_status=active, role=student
    - type=product: confirma pedido, não altera role nem plan
  invoice.payment_failed:
    - notifica aluno — não altera role ainda
  customer.subscription.deleted:
    - inicia grace period: subscription_status=grace, grace_period_until=now+5days
  customer.subscription.updated:
    - detecta cancel_at_period_end=true → subscription_status=canceling

---

## SCHEMA FIELDS (packages/db)

users table — campos relacionados ao ciclo de plano:
  role: enum(owner, instructor, staff, student, customer)
  plan: enum(free, guest, master)
  plan_expires_at: timestamp | null
  subscription_status: enum(active, canceling, grace, expired) | null
  grace_period_until: timestamp | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null

---

## CRON JOB — GRACE PERIOD PROCESSOR

module: scheduler (apps/api/src/scheduler/)
scaffold: nest generate module scheduler
job: @Cron('0 2 * * *') — roda diariamente às 02:00
responsibility:
  - query users WHERE subscription_status='grace' AND grace_period_until < now()
  - para cada usuário: role=customer, plan=free, subscription_status=expired, grace_period_until=null
  - log Winston (info): usuário id, timestamp, motivo
  - nunca lançar exceção não tratada — capturar e logar como error
test: scheduler.service.spec.ts — mock Drizzle, assert updates corretos

---

## DOMAIN MODULES

structure: one module per domain
modules:
  auth: BetterAuth integration, guards, social providers
  users: user management, role/plan queries
  checkin: self-checkin (student+master), courtesy (staff)
  metrics: student fills basic data, instructor fills body metrics
  events: create/publish (owner+staff direct, instructor→pending)
  financials: payments, plan history, Stripe webhook handler
  products: ecommerce catalog (owner+staff manage, customer browses)
  scheduler: cron jobs (grace period processor)
  health: /health endpoint — always public, no auth

---

## NESTJS PATTERNS

http-adapter: Fastify only — never platform-express
env: FRONTEND_URL in .env for CORS
validation: class-validator + class-transformer on all DTOs
guards:
  - RolesGuard: verifica role do usuário
  - PlanGuard: verifica plan + subscription_status (active ou grace)
  - nunca lógica de acesso dentro do controller
never: logic in controllers — always delegate to services

stripe-webhook:
  endpoint: raw body required — configure Fastify rawBody before JSON parse
  signature: always verify stripe-signature header before processing
  idempotency: check stripe_payment_id exists before updating financials
  metadata: always read metadata.type before deciding what to update

seeds:
  location: apps/api/seeds/
  naming: snake_case descrevendo a ação — ex: create_developer_user.ts, populate_plans.ts
  script: pnpm seed:<nome> em package.json — ex: "seed:developer": "tsx seeds/create_developer_user.ts"
  runner: tsx
  rules:
    - sempre idempotente — verificar se dado já existe antes de criar
    - credenciais via variáveis de ambiente — nunca hardcoded
    - único developer permitido no sistema

---

## SWAGGER

setup: @nestjs/swagger configured in main.ts bootstrap
url: /docs — development only, disabled in production
scope: all endpoints documented — no undocumented routes
decorators:
  controllers: @ApiTags('')
  routes: @ApiOperation | @ApiResponse (success + error cases)
  DTOs: @ApiProperty on every field
  auth: @ApiBearerAuth on all protected routes

---

## LOGGING

lib: Winston via nest-winston
transport:
  development: Console (colorized)
  production: Console + File (combined.log + error.log)
levels: error | warn | info | debug
rules:
  - log every unhandled exception with full stack trace
  - log every HTTP error (4xx, 5xx) with method, route, status, duration
  - log every Stripe webhook event received and processing result
  - log every courtesy checkin (who released, for whom, when)
  - log every cron execution: start, users processed, errors
  - log every role/plan change with before/after state and trigger reason
  - never log sensitive data (passwords, tokens, card numbers, CPF)
interceptor: global HTTP logging interceptor on all routes
filter: global exception filter catches and logs all unhandled errors

---

## TESTING

runner: Jest + @nestjs/testing
scope: unit tests for every service, guard, and scheduler
pattern: .spec.ts co-located with source
mocks: mock all external dependencies (db, stripe, betterauth) — never hit real services
coverage: services and guards must have meaningful coverage — no empty specs
critical specs:
  - financials.service.spec.ts: webhook type discrimination (plan vs product)
  - scheduler.service.spec.ts: grace period expiry logic
  - plan.guard.spec.ts: active vs grace vs expired access
  - auth.guard.spec.ts: role-based access per route

---

## WORKFLOW

before-implement: GATE-1 → check latest stable via Context7 → then code
before-install: GATE-4 → use CLI — never manually
new-module: nest generate module → nest generate service → nest generate controller
new-endpoint: DTO (@ApiProperty) → guard → service → controller → .spec.ts → @ApiOperation + @ApiResponse
new-schema: define in packages/db → drizzle-kit generate → drizzle-kit migrate → never edit migration manually
new-webhook-event: identify metadata.type first → branch plan vs product → idempotency check → update → log
new-cron: @Cron decorator → try/catch obrigatório → log start/end/errors → .spec.ts com mock de clock
new-seed: criar em seeds/ com nome snake_case → verificar idempotência → ler credenciais do .env → adicionar script pnpm seed:<nome>
new-error: log via Winston (error + stack trace) → return typed HttpException
pr-ready: types pass | no `any` | no duplicated logic | tests written | swagger documented | logs added

---

## FILE LOCATIONS (apps/api)

src/auth/          → BetterAuth config, guards, social providers
src/users/         → user service, role/plan management
src/checkin/       → checkin service + courtesy logic
src/metrics/       → student + instructor metric entries
src/events/        → event creation, approval flow
src/financials/    → Stripe webhook handler, payment history
src/products/      → ecommerce catalog management
src/scheduler/     → cron jobs (grace period processor)
src/health/        → /health endpoint
src/common/        → shared guards, interceptors, filters, decorators
seeds/             → scripts de seed — snake_case, idempotentes, run via pnpm seed:<nome>