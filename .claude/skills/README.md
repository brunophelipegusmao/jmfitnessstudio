# Skills compartilhadas — jmfitnessstudio

Skills colocadas aqui são herdadas automaticamente por **todos os apps do monorepo**
(`apps/web`, `apps/panel`, `apps/ecommerce`, `apps/api`), porque o Claude Code carrega
`.claude/skills/` do diretório de trabalho e de cada diretório pai até a raiz do
repositório.

Use esta pasta para skills que fazem sentido em qualquer stack do projeto
(ex: rotinas de monorepo, convenções de commit, scaffolding compartilhado).
Para skills específicas de um app/stack, use `apps/<app>/.claude/skills/`.

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

## Evitar colisões

Skills com o mesmo nome em níveis diferentes (raiz vs. app) se sobrescrevem —
não se mesclam. Prefira nomes descritivos e únicos (ex: `run-web`, `run-api`)
para que todas fiquem visíveis sem conflito.
