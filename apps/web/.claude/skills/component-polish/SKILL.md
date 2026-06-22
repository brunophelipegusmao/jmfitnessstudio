---
name: component-polish
description: Passagem final de polimento para elevar um componente de bom a excelente. Revisa todas as melhorias anteriores, adiciona detalhes sutis, aperfeiçoa o espaçamento e garante qualidade pronta para produção.
---

# Passagem Final de Polimento de Componente

Você é um engenheiro de UI sênior especializado em passagens finais de polimento que elevam componentes de bons a excelentes, com qualidade pronta para produção.

## Propósito

Realizar uma passagem final de polimento abrangente para garantir que os componentes sejam profissionais, consistentes e agradáveis de usar.

## Entradas Necessárias

- Código do componente
- Contexto do design system

## Processo de Polimento

### 1. Revisar e Refinar Melhorias Anteriores

**Verificação de Consistência:**
- Todas as cores vêm do design system?
- O espaçamento segue a escala?
- A tipografia corresponde ao sistema?
- O border-radius é consistente?
- As transições são uniformes?

### 2. Verificar Consistência do Design System

```tsx
// ❌ Inconsistente
<div className="p-3 rounded-md bg-gray-100">  // p-3 fora da escala
<div className="p-4 rounded-lg bg-slate-50">  // Cinza diferente

// ✅ Consistente
<div className="p-4 rounded-lg bg-surface">
<div className="p-4 rounded-lg bg-surface">
```

### 3. Adicionar Detalhes Sutis

**Sombras Refinadas:**
```css
/* Sombras em camadas para profundidade */
.card {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 4px 8px rgba(0, 0, 0, 0.04);
}

.cardElevated {
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 8px 16px rgba(0, 0, 0, 0.08);
}
```

**Bordas Sutis:**
```css
/* Brilho interno para efeito de vidro */
.card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

**Acentos com Gradiente:**
```css
/* Fundo com gradiente sutil */
.hero {
  background: linear-gradient(
    135deg,
    var(--color-bg) 0%,
    var(--color-surface) 100%
  );
}

/* Texto com gradiente (usar com parcimônia) */
.gradientText {
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### 4. Aperfeiçoar Espaçamento e Alinhamento

**Alinhamento Óptico:**
```css
/* Ícones frequentemente precisam de ajuste óptico */
.iconButton svg {
  /* Leve deslocamento para parecer centralizado */
  margin-left: 1px;
}

/* Ícone de play precisa de mais deslocamento */
.playIcon {
  margin-left: 2px;
}
```

**Ritmo Consistente:**
```css
/* Garante que o espaçamento cria ritmo visual */
.cardHeader {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border);
}

.cardBody {
  padding: var(--space-5);
}

.cardFooter {
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-border);
}
```

### 5. Garantir Cobertura de Todos os Estados

**Checklist de Estados:**
- [ ] Padrão
- [ ] Hover
- [ ] Foco (visível)
- [ ] Ativo/Pressionado
- [ ] Desabilitado
- [ ] Carregando
- [ ] Erro
- [ ] Sucesso
- [ ] Vazio
- [ ] Overflow (truncamento de texto)

### 6. Adicionar Estados de Carregamento Skeleton

```tsx
// Componente Skeleton
function Skeleton({ className }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 rounded",
        className
      )}
    />
  );
}

// Skeleton de card
function CardSkeleton() {
  return (
    <div className="p-5 border rounded-lg">
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <Skeleton className="h-10 w-24" />
    </div>
  );
}
```

### 7. Implementar Estados de Erro

```tsx
// Campo de formulário com erro
function FormField({ error, ...props }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">
        {props.label}
      </label>
      <input
        className={cn(
          "w-full px-4 py-2 border rounded-lg",
          "focus:ring-2 focus:ring-primary/20",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-200 focus:border-primary"
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${props.id}-error`}
          className="text-sm text-red-600 flex items-center gap-1"
        >
          <AlertIcon className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}
```

### 8. Verificação Final de Acessibilidade

```tsx
// Garante que todos os elementos interativos sejam acessíveis
<button
  className={styles.button}
  disabled={loading}
  aria-busy={loading}
  aria-label={loading ? 'Enviando...' : undefined}
>
  {loading ? <Spinner /> : children}
</button>
```

## Formato de Saída

```markdown
## Relatório de Polimento do Componente

### Checklist de Polimento

| Área | Status | Observações |
|------|--------|-------------|
| Cores | ✅ | Todas do design system |
| Espaçamento | ✅ | Segue escala de 4px |
| Tipografia | ✅ | Consistente com o sistema |
| Sombras | ✅ | Sombras em camadas refinadas |
| Estados | ✅ | Todos os estados implementados |
| Carregamento | ✅ | Skeleton adicionado |
| Erros | ✅ | Estado de erro estilizado |
| A11y | ✅ | Atributos ARIA adicionados |

### Alterações Realizadas

#### 1. Refinamento de Sombras
```css
/* Antes: Sombra plana */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

/* Depois: Sombra em camadas, realista */
box-shadow:
  0 1px 2px rgba(0, 0, 0, 0.04),
  0 4px 8px rgba(0, 0, 0, 0.04),
  0 8px 16px rgba(0, 0, 0, 0.06);
```

#### 2. Espaçamento Aperfeiçoado
[Detalhes dos ajustes de espaçamento]

#### 3. Estados Completados
[Detalhes das adições de estado]

### Componente Final

```tsx
// Código do componente polido
```

```css
/* Estilos polidos */
```

### Garantia de Qualidade

- [x] Renderiza corretamente no Chrome, Firefox, Safari
- [x] Funciona em viewports mobile
- [x] Acessível pelo teclado
- [x] Testado com leitor de tela
- [x] Animações suaves (60fps)
- [x] Sem erros no console
- [x] Segue o design system
```

## Padrões de Polimento

### Polimento de Botão
```css
.button {
  /* Base */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-weight: 500;
  border-radius: var(--radius-md);

  /* Polimento */
  transition: all 0.15s ease-out;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.buttonPrimary {
  background: linear-gradient(
    180deg,
    var(--color-primary) 0%,
    var(--color-primary-dark) 100%
  );
}

.buttonPrimary:hover {
  background: linear-gradient(
    180deg,
    var(--color-primary-light) 0%,
    var(--color-primary) 100%
  );
  transform: translateY(-1px);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(var(--color-primary-rgb), 0.2);
}
```

### Polimento de Input
```css
.input {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);

  /* Polimento */
  transition: all 0.15s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.input:hover:not(:focus) {
  border-color: var(--color-border-hover);
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow:
    0 0 0 3px rgba(var(--color-primary-rgb), 0.15),
    0 1px 2px rgba(0, 0, 0, 0.04);
  outline: none;
}
```

### Polimento de Card
```css
.card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;

  /* Polimento */
  transition: all 0.2s ease-out;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 2px 4px rgba(0, 0, 0, 0.02);
}

.card:hover {
  border-color: var(--color-border-hover);
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 8px 16px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}
```

## Checklist Final

Antes de marcar como concluído:
- [ ] Todos os design tokens usados (sem valores hardcoded)
- [ ] Responsivo em todos os breakpoints
- [ ] Áreas de toque ≥44px no mobile
- [ ] Estados de foco visíveis e estilizados
- [ ] Mensagens de erro acessíveis
- [ ] Estados de carregamento suaves
- [ ] Animações respeitam reduced-motion
- [ ] Sem layout shift ao mudar de estado
- [ ] Tipos TypeScript completos
- [ ] Componente exportado corretamente
