---
name: ui-tokens
description: "Listar, indicar e atualizar fichas de design StyleSeed mantendo fontes JSON, variáveis CSS e valores de modo escrito em sincronia."
category: desenho
risk: seguro
source: Comunidade
source_repo: bitjaru/semente de estilo
source_type: Comunidade
date_added: "2026-04-08"
author: bitjaru
tags: [ui, tokens, design-system, theming, styleseed]
tools: [claude, cursor, códice, gemini]
---

# IU Tokens

## Visão geral

Parte de [StyleSeed](https://github.com/bitjaru/styleseed), esta capacidade gerencia tokens de design sem definir os arquivos de fonte de verdade se separarem. Ele é feito para equipar usos de token JSON do Toss seed e implementação de CSS junto.

## Como Usar
- Usar quando você precisa especificar o conjunto de token atual
- Usar quando quiser adicionar uma nova cor, sombra, raio, espaço ou tipografia
- Use quando você precisa atualizar um token e propagar a mudança com segurança
- Use quando o projeto tiver arquivos de token JSON e variáveis CSS que devem permanente alinhadas

## Como Funcionana

### Acções Suportadas

- @ @ CODE0@@: mostrar os tokens atuais em uma forma legível pelo ser humano
- @ @ CODE0@@: introdução um novo token e liga- o através da implementação
- @ @ CODE0@: alterar um valor de token existente e audite o uso a jusante

### Distribuição Típica da Fonte de Verdade

Para o sémen de lançamento:
- JSON em @ @ CODE0 @
- Variáveis CSS e cabeamento de temas em @ @ @ CODE0 @ @ @
- suporte de tipografia nos arquivos CSS de fonte e base

### Regras

- manter JSON e CSS em sincronia
- prefere nomes semânticos ao invés de nomes descritivos
- fornecer suporte em modo escrito, se for caso disso
- atualizar a implementação do token, não apenas o manifesto de origem
- verificar o uso direto de componentes que agora podem estrela obsoletas

## Saida

Retorno:
1. O inventário ou resumo de alterações solicitadas
2. Cada arquivo tocado
3. Quaisquer componentes ou utilitários alimentados que devem ser revistos
4. Ações de acompanhamento se o novo token exigir uma adoção mais ampla

## Melhores Práticas

- Indicar intenção semântica, não toneladas de marca único
- Evitar a expansão do token estendendo primeiro as escalas existentes
- Continuar nomeando consistente com o resto do sistema
- Reveja o contraste e acessibilidade ao introdução de novos núcleos

## Recursos adicionais

- [StyleSeed repository](https://github.com/bitjaru/styleseed)
- [Source skill](https://github.com/bitjaru/styleseed/blob/main/seeds/toss/.claude/skills/ui-tokens/SKILL.md)

## Limitações
- Use esta habilidade apenas quando a tarefa corresponder claramente ao escopo descrito acima.
- Não trate a informação como um substituto para validação, teste ou revisão de especialistas específicos do ambiente.
- Pare e peça esclarecimentos se falam entradas, licenças, limites de segurança ou critérios de sucesso.
