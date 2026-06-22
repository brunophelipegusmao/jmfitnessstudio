---
name: frontend-móvel-desenvolvimento-componente-andar
description: "Você é um especialista em arquitetura de componentes Reagir especializado em componentes prontos para produção de andaimes, acessos e performantes. Gerar implementações completas de componentes com TypeScript, testes, s"
risk: desconhecido
source: Comunidade
date_added: "2026-02-27"
---

# Reagir/Reagir o andar de componentes nativos

Você é um especialista em arquitetura de componentes Reagir especializado em componentes prontos para produção de andaimes, acessos e performantes. Gere implementações completas de componentes com TypeScript, testes, estilos e documentação segundo as melhores práticas modernas.

## Usar esta habilidade quando

- A trabalho em tarefas ou fluxos de trabalho de reação/reação de componentes nativos
- Necessidade de orientação, boas práticas ou listas de verificação para reagir/reagir o andar de componentes nativos

## Não utilizar esta capacidade quando

- A tarefa não está relacionada com reagir/reagir o andaime de componentes nativos
- Você precisa de um domingo ou ferrarenta diferente fora deste escopo

## Contexto

O usuário precisa de andaimes automatizados que criam componentes de React consistências e seguros com estrutura adaptada, ganchos, estilo, acessibilidade e abertura de teste. Foco em páginas reutilizáveis e arquitetura escalável.

## Requisitos

Argumentos

## Instruções

### 1. Analisar os Requisitos do Componente

```typescript
interface ComponentSpec {
  name: string;
  type: 'functional' | 'page' | 'layout' | 'form' | 'data-display';
  props: PropDefinition[];
  state?: StateDefinition[];
  hooks?: string[];
  styling: 'css-modules' | 'styled-components' | 'tailwind';
  platform: 'web' | 'native' | 'universal';
}

interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  description: string;
}

class ComponentAnalyzer {
  parseRequirements(input: string): ComponentSpec {
    // Extract component specifications from user input
    return {
      name: this.extractName(input),
      type: this.inferType(input),
      props: this.extractProps(input),
      state: this.extractState(input),
      hooks: this.identifyHooks(input),
      styling: this.detectStylingApproach(),
      platform: this.detectPlatform()
    };
  }
}
```

### 2. Gerar componente de reação

```typescript
interface GeneratorOptions {
  typescript: boolean;
  testing: boolean;
  storybook: boolean;
  accessibility: boolean;
}

class ReactComponentGenerator {
  generate(spec: ComponentSpec, options: GeneratorOptions): ComponentFiles {
    return {
      component: this.generateComponent(spec, options),
      types: options.typescript ? this.generateTypes(spec) : null,
      styles: this.generateStyles(spec),
      tests: options.testing ? this.generateTests(spec) : null,
      stories: options.storybook ? this.generateStories(spec) : null,
      index: this.generateIndex(spec)
    };
  }

  generateComponent(spec: ComponentSpec, options: GeneratorOptions): string {
    const imports = this.generateImports(spec, options);
    const types = options.typescript ? this.generatePropTypes(spec) : '';
    const component = this.generateComponentBody(spec, options);
    const exports = this.generateExports(spec);

    return `${imports}\n\n${types}\n\n${component}\n\n${exports}`;
  }

  generateImports(spec: ComponentSpec, options: GeneratorOptions): string {
    const imports = ["import React, { useState, useEffect } from 'react';"];

    if (spec.styling === 'css-modules') {
      imports.push(`import styles from './${spec.name}.module.css';`);
    } else if (spec.styling === 'styled-components') {
      imports.push("import styled from 'styled-components';");
    }

    if (options.accessibility) {
      imports.push("import { useA11y } from '@/hooks/useA11y';");
    }

    return imports.join('\n');
  }

  generatePropTypes(spec: ComponentSpec): string {
    const props = spec.props.map(p => {
      const optional = p.required ? '' : '?';
      const comment = p.description ? `  /** ${p.description} */\n` : '';
      return `${comment}  ${p.name}${optional}: ${p.type};`;
    }).join('\n');

    return `export interface ${spec.name}Props {\n${props}\n}`;
  }

  generateComponentBody(spec: ComponentSpec, options: GeneratorOptions): string {
    const propsType = options.typescript ? `: React.FC<${spec.name}Props>` : '';
    const destructuredProps = spec.props.map(p => p.name).join(', ');

    let body = `export const ${spec.name}${propsType} = ({ ${destructuredProps} }) => {\n`;

    // Add state hooks
    if (spec.state) {
      body += spec.state.map(s =>
        `  const [${s.name}, set${this.capitalize(s.name)}] = useState${options.typescript ? `<${s.type}>` : ''}(${s.initial});\n`
      ).join('');
      body += '\n';
    }

    // Add effects
    if (spec.hooks?.includes('useEffect')) {
      body += `  useEffect(() => {\n`;
      body += `    // TODO: Add effect logic\n`;
      body += `  }, [${destructuredProps}]);\n\n`;
    }

    // Add accessibility
    if (options.accessibility) {
      body += `  const a11yProps = useA11y({\n`;
      body += `    role: '${this.inferAriaRole(spec.type)}',\n`;
      body += `    label: ${spec.props.find(p => p.name === 'label')?.name || `'${spec.name}'`}\n`;
      body += `  });\n\n`;
    }

    // JSX return
    body += `  return (\n`;
    body += this.generateJSX(spec, options);
    body += `  );\n`;
    body += `};`;

    return body;
  }

  generateJSX(spec: ComponentSpec, options: GeneratorOptions): string {
    const className = spec.styling === 'css-modules' ? `className={styles.${this.camelCase(spec.name)}}` : '';
    const a11y = options.accessibility ? '{...a11yProps}' : '';

    return `    <div ${className} ${a11y}>\n` +
           `      {/* TODO: Add component content */}\n` +
           `    </div>\n`;
  }
}
```

### 3. Gerar Reagir Componente Nativo

```typescript
class ReactNativeGenerator {
  generateComponent(spec: ComponentSpec): string {
    return `
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AccessibilityInfo
} from 'react-native';

interface ${spec.name}Props {
${spec.props.map(p => `  ${p.name}${p.required ? '' : '?'}: ${this.mapNativeType(p.type)};`).join('\n')}
}

export const ${spec.name}: React.FC<${spec.name}Props> = ({
  ${spec.props.map(p => p.name).join(',\n  ')}
}) => {
  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel="${spec.name} component"
    >
      <Text style={styles.text}>
        {/* Component content */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
`;
  }

  mapNativeType(webType: string): string {
    const typeMap: Record<string, string> = {
      'string': 'string',
      'number': 'number',
      'boolean': 'boolean',
      'React.ReactNode': 'React.ReactNode',
      'Function': '() => void'
    };
    return typeMap[webType] || webType;
  }
}
```

### 4. Gerar testes de componentes

```typescript
class ComponentTestGenerator {
  generateTests(spec: ComponentSpec): string {
    return `
import { render, screen, fireEvent } from '@testing-library/react';
import { ${spec.name} } from './${spec.name}';

describe('${spec.name}', () => {
  const defaultProps = {
${spec.props.filter(p => p.required).map(p => `    ${p.name}: ${this.getMockValue(p.type)},`).join('\n')}
  };

  it('renders without crashing', () => {
    render(<${spec.name} {...defaultProps} />);
    expect(screen.getByRole('${this.inferAriaRole(spec.type)}')).toBeInTheDocument();
  });

  it('displays correct content', () => {
    render(<${spec.name} {...defaultProps} />);
    expect(screen.getByText(/content/i)).toBeVisible();
  });

${spec.props.filter(p => p.type.includes('()') || p.name.startsWith('on')).map(p => `
  it('calls ${p.name} when triggered', () => {
    const mock${this.capitalize(p.name)} = jest.fn();
    render(<${spec.name} {...defaultProps} ${p.name}={mock${this.capitalize(p.name)}} />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    expect(mock${this.capitalize(p.name)}).toHaveBeenCalledTimes(1);
  });`).join('\n')}

  it('meets accessibility standards', async () => {
    const { container } = render(<${spec.name} {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
`;
  }

  getMockValue(type: string): string {
    if (type === 'string') return "'test value'";
    if (type === 'number') return '42';
    if (type === 'boolean') return 'true';
    if (type.includes('[]')) return '[]';
    if (type.includes('()')) return 'jest.fn()';
    return '{}';
  }
}
```

### 5. Gerar estilos

```typescript
class StyleGenerator {
  generateCSSModule(spec: ComponentSpec): string {
    const className = this.camelCase(spec.name);
    return `
.${className} {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: var(--bg-primary);
}

.${className}Title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.${className}Content {
  flex: 1;
  color: var(--text-secondary);
}
`;
  }

  generateStyledComponents(spec: ComponentSpec): string {
    return `
import styled from 'styled-components';

export const ${spec.name}Container = styled.div\`
  display: flex;
  flex-direction: column;
  padding: \${({ theme }) => theme.spacing.md};
  background-color: \${({ theme }) => theme.colors.background};
\`;

export const ${spec.name}Title = styled.h2\`
  font-size: \${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: \${({ theme }) => theme.colors.text.primary};
  margin-bottom: \${({ theme }) => theme.spacing.sm};
\`;
`;
  }

  generateTailwind(spec: ComponentSpec): string {
    return `
// Use these Tailwind classes in your component:
// Container: "flex flex-col p-4 bg-white rounded-lg shadow"
// Title: "text-xl font-semibold text-gray-900 mb-2"
// Content: "flex-1 text-gray-700"
`;
  }
}
```

### 6. Gerar histórias de livros de histórias

```typescript
class StorybookGenerator {
  generateStories(spec: ComponentSpec): string {
    return `
import type { Meta, StoryObj } from '@storybook/react';
import { ${spec.name} } from './${spec.name}';

const meta: Meta<typeof ${spec.name}> = {
  title: 'Components/${spec.name}',
  component: ${spec.name},
  tags: ['autodocs'],
  argTypes: {
${spec.props.map(p => `    ${p.name}: { control: '${this.inferControl(p.type)}', description: '${p.description}' },`).join('\n')}
  },
};

export default meta;
type Story = StoryObj<typeof ${spec.name}>;

export const Default: Story = {
  args: {
${spec.props.map(p => `    ${p.name}: ${p.defaultValue || this.getMockValue(p.type)},`).join('\n')}
  },
};

export const Interactive: Story = {
  args: {
    ...Default.args,
  },
};
`;
  }

  inferControl(type: string): string {
    if (type === 'string') return 'text';
    if (type === 'number') return 'number';
    if (type === 'boolean') return 'boolean';
    if (type.includes('[]')) return 'object';
    return 'text';
  }
}
```

## Formato de Saida

1. ** Componente Arquivo**: Componente nativo de React/React totalmente implementado
2. **Tipo Definições**: Interfaces e tipos TypeScript
3. ** Estilos**: modos CSS, componentes estilo, ou configuração Tailwind
4. ** Testes**: Conjunto de testes completos com abertura
5. ** Histórias**: Histórias para documentação
6. ** Arquivo de índice**: Exportações de barril para importações limpas

Concentre-se na criação de componentes imediatos para produção, acessos e manejáveis que sigam padrões modernos de Reagir e melhores práticas.

## Limitações
- Use esta habilidade apenas quando a tarefa corresponder claramente ao escopo descrito acima.
- Não trate a informação como um substituto para validação, teste ou revisão de especialistas específicos do ambiente.
- Pare e peça esclarecimentos se falam entradas, licenças, limites de segurança ou critérios de sucesso.
