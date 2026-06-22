# Skills específicas — apps/web

**Stack:** Next.js 16 (App Router) + React 19 + shadcn/ui + Tailwind CSS v4 +
React Hook Form + Zod + Zustand — porta 3000 (site público + área do aluno)

Skills colocadas aqui só são carregadas quando o Claude Code é iniciado a
partir deste diretório (`apps/web/`). Para skills compartilhadas com os
demais apps, veja `.claude/skills/` na raiz do monorepo (essas continuam
disponíveis aqui também, por herança de diretórios pais).

## Estrutura de uma skill

```
.claude/skills/<nome-da-skill>/
├── SKILL.md           # obrigatório — frontmatter (name, description) + instruções
└── (arquivos de apoio opcionais)
```

`SKILL.md` precisa de frontmatter YAML, no mínimo:

```yaml
---
name: nome-da-skill
description: o que a skill faz e quando deve ser usada
---
```

> Use nomes que não colidam com skills da raiz ou de outros apps
> (ex: `run-web` em vez de `run`).
