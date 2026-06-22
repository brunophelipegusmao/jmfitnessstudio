---
name: frontend-mobile-security-xss-scan
description: "Você é um especialista em segurança de frontend com foco na definição e prevenção de vulnerabilidade do Cross-Site Scripting (XSS). Analisar o React, Vue, Angular e baunilha Código JavaScript para identificar a injeção poi"
risk: desconhecido
source: Comunidade
date_added: "2026-02-27"
---

# Scanner de vulnerabilidade XSS para código Frontend

Você é um especialista em segurança de frontend com foco na definição e prevenção de vulnerabilidade do Cross-Site Scripting (XSS). Analisar o código JavaScript React, Vue, Angular e baunilha para identificar pontos de injeção, manipulação DOM integração e higienização inadequada.

## Usar esta habilidade quando

- Trabalho no scanner de vulnerabilidade do xss para tarefas de código de frontend ou fluxos de trabalho
- Necessidade de orientação, melhores práticas ou checklists para o scanner de vulnerabilidade xss para código frontend

## Não utilizar esta capacidade quando

- A tarefa não está relacionada com o scanner de vulnerabilidade xss para o código frontend
- Você precisa de um domingo ou ferrarenta diferente fora deste escopo

## Contexto

O usuário precisa de uma verificação aberta da vulnerabilidade do XSS para o código do lado do cliente, identificando páginas perigosas como manipulação HTML identidade, problemas de gerenciamento de URL e renderização de entrada inadequada do usuário. Concentre-se na definição consciente do contexto e páginas de segurança específica do quadrado.

## Requisitos

Argumentos

## Instruções

### 1. Detecção de Vulnerabilidade XSS

Digitalizar a base de códigos para vulnerabilidades XSS usando análise estática:

```typescript
interface XSSFinding {
  file: string;
  line: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  vulnerable_code: string;
  description: string;
  fix: string;
  cwe: string;
}

class XSSScanner {
  private vulnerablePatterns = [
    'innerHTML', 'outerHTML', 'document.write',
    'insertAdjacentHTML', 'location.href', 'window.open'
  ];

  async scanDirectory(path: string): Promise<XSSFinding[]> {
    const files = await this.findJavaScriptFiles(path);
    const findings: XSSFinding[] = [];

    for (const file of files) {
      const content = await fs.readFile(file, 'utf-8');
      findings.push(...this.scanFile(file, content));
    }

    return findings;
  }

  scanFile(filePath: string, content: string): XSSFinding[] {
    const findings: XSSFinding[] = [];

    findings.push(...this.detectHTMLManipulation(filePath, content));
    findings.push(...this.detectReactVulnerabilities(filePath, content));
    findings.push(...this.detectURLVulnerabilities(filePath, content));
    findings.push(...this.detectEventHandlerIssues(filePath, content));

    return findings;
  }

  detectHTMLManipulation(file: string, content: string): XSSFinding[] {
    const findings: XSSFinding[] = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      if (line.includes('innerHTML') && this.hasUserInput(line)) {
        findings.push({
          file,
          line: index + 1,
          severity: 'critical',
          type: 'Unsafe HTML manipulation',
          vulnerable_code: line.trim(),
          description: 'User-controlled data in HTML manipulation creates XSS risk',
          fix: 'Use textContent for plain text or sanitize with DOMPurify library',
          cwe: 'CWE-79'
        });
      }
    });

    return findings;
  }

  detectReactVulnerabilities(file: string, content: string): XSSFinding[] {
    const findings: XSSFinding[] = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      if (line.includes('dangerously') && !this.hasSanitization(content)) {
        findings.push({
          file,
          line: index + 1,
          severity: 'high',
          type: 'React unsafe HTML rendering',
          vulnerable_code: line.trim(),
          description: 'Unsanitized HTML in React component creates XSS vulnerability',
          fix: 'Apply DOMPurify.sanitize() before rendering or use safe alternatives',
          cwe: 'CWE-79'
        });
      }
    });

    return findings;
  }

  detectURLVulnerabilities(file: string, content: string): XSSFinding[] {
    const findings: XSSFinding[] = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      if (line.includes('location.') && this.hasUserInput(line)) {
        findings.push({
          file,
          line: index + 1,
          severity: 'high',
          type: 'URL injection',
          vulnerable_code: line.trim(),
          description: 'User input in URL assignment can execute malicious code',
          fix: 'Validate URLs and enforce http/https protocols only',
          cwe: 'CWE-79'
        });
      }
    });

    return findings;
  }

  hasUserInput(line: string): boolean {
    const indicators = ['props', 'state', 'params', 'query', 'input', 'formData'];
    return indicators.some(indicator => line.includes(indicator));
  }

  hasSanitization(content: string): boolean {
    return content.includes('DOMPurify') || content.includes('sanitize');
  }
}
```

### 2. Detecção Específica de Framework

```typescript
class ReactXSSScanner {
  scanReactComponent(code: string): XSSFinding[] {
    const findings: XSSFinding[] = [];

    // Check for unsafe React patterns
    const unsafePatterns = [
      'dangerouslySetInnerHTML',
      'createMarkup',
      'rawHtml'
    ];

    unsafePatterns.forEach(pattern => {
      if (code.includes(pattern) && !code.includes('DOMPurify')) {
        findings.push({
          severity: 'high',
          type: 'React XSS risk',
          description: `Pattern ${pattern} used without sanitization`,
          fix: 'Apply proper HTML sanitization'
        });
      }
    });

    return findings;
  }
}

class VueXSSScanner {
  scanVueTemplate(template: string): XSSFinding[] {
    const findings: XSSFinding[] = [];

    if (template.includes('v-html')) {
      findings.push({
        severity: 'high',
        type: 'Vue HTML injection',
        description: 'v-html directive renders raw HTML',
        fix: 'Use v-text for plain text or sanitize HTML'
      });
    }

    return findings;
  }
}
```

### 3. Exemplos seguros de codificação

```typescript
class SecureCodingGuide {
  getSecurePattern(vulnerability: string): string {
    const patterns = {
      html_manipulation: `
// SECURE: Use textContent for plain text
element.textContent = userInput;

// SECURE: Sanitize HTML when needed
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
element.innerHTML = clean;`,

      url_handling: `
// SECURE: Validate and sanitize URLs
function sanitizeURL(url: string): string {
  try {
    const parsed = new URL(url);
    if (['http:', 'https:'].includes(parsed.protocol)) {
      return parsed.href;
    }
  } catch {}
  return '#';
}`,

      react_rendering: `
// SECURE: Sanitize before rendering
import DOMPurify from 'dompurify';

const Component = ({ html }) => (
  <div dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(html)
  }} />
);`
    };

    return patterns[vulnerability] || 'No secure pattern available';
  }
}
```

### 4. Integração de digitalização automatizada

```bash
# ESLint with security plugin
npm install --save-dev eslint-plugin-security
eslint . --plugin security

# Semgrep for XSS patterns
semgrep --config=p/xss --json

# Custom XSS scanner
node xss-scanner.js --path=src --format=json
```

### 5. Geração de Relatórios

```typescript
class XSSReportGenerator {
  generateReport(findings: XSSFinding[]): string {
    const grouped = this.groupBySeverity(findings);

    let report = '# XSS Vulnerability Scan Report\n\n';
    report += `Total Findings: ${findings.length}\n\n`;

    for (const [severity, issues] of Object.entries(grouped)) {
      report += `## ${severity.toUpperCase()} (${issues.length})\n\n`;

      for (const issue of issues) {
        report += `- **${issue.type}**\n`;
        report += `  File: ${issue.file}:${issue.line}\n`;
        report += `  Fix: ${issue.fix}\n\n`;
      }
    }

    return report;
  }

  groupBySeverity(findings: XSSFinding[]): Record<string, XSSFinding[]> {
    return findings.reduce((acc, finding) => {
      if (!acc[finding.severity]) acc[finding.severity] = [];
      acc[finding.severity].push(finding);
      return acc;
    }, {} as Record<string, XSSFinding[]>);
  }
}
```

### 6. Lista de Verificação de Prevenção

** Manipulação de HTML**
- Nunca use o interiorHTML com a entrada do usuário
- Preferer o conteúdo do textoConteúdo
- Sanitar com DOMPurify antes de renderizar HTML
- Evitar documento.escrever inteiro

** Tratamento de URL**
- Validar todos os URLs antes da atribuição
- Javascript em bloco: e dados: protocolos
- Usar o construtor de URL para validação
- Sanitar atributos href

**Event Handlers**
- Usar addEventListener em vez de manipuladores em linha
- Sanitar toda a entrada do manipulador de eventos
- Evite padrões string- to- code

**Framework-Específico **
- Reagir: Sanitar antes de usar APIs inseguras
- Vue: Prefere v- texto sobre v- html
- Angular: Usar higienização incorporada
- Evitar ignorar os recursos de segurança do framework

## Formato de Saida

1. ** Relatório de vulnerabilidade**: Resultados pormenorizados com informações de gravidade
2. ** Análise de Risco**: Avaliação de impacto para cada vulnerabilidade
3. ** Recomendações Fix**: Exemplos de códigos seguros
4. ** Guia de Saneamento**: DOMPURIFY use patterns
5. ** Lista de Verificação de Prevenção**: Melhores práticas para prevenção XSS

Foque na identificação de vetores de atoque XSS, fornecendo correspondências acionáveis e estabelecendo padrões de codificação seguros.

## Limitações
- Use esta habilidade apenas quando a tarefa corresponder claramente ao escopo descrito acima.
- Não trate a informação como um substituto para validação, teste ou revisão de especialistas específicos do ambiente.
- Pare e peça esclarecimentos se falam entradas, licenças, limites de segurança ou critérios de sucesso.
