# Padrões de Código

Este documento descreve os padrões de código, linting e formatação utilizados no projeto.

## Convenções de Nomenclatura

-   **Componentes**: PascalCase (ex: `UserProfile.js`)
-   **Arquivos de utilitários**: camelCase (ex: `api.js`)
-   **Hooks personalizados**: camelCase com prefixo "use" (ex: `useAuth.js`)
-   **Contextos**: PascalCase com sufixo "Context" (ex: `UserContext.js`)

## Estrutura de Componentes

Os componentes React seguem uma estrutura consistente:

```jsx
// Imports
import React from "react";

// Componente funcional
function ComponentName({ prop1, prop2 }) {
    // Lógica do componente

    // Renderização
    return <div>{/* JSX */}</div>;
}

// Export
export default ComponentName;
```

## Estilo de Código

-   Uso de componentes funcionais com Hooks
-   Desestruturação de props
-   Uso de arrow functions para handlers de eventos
-   Preferência por operadores ternários para renderização condicional simples

## Formatação

O projeto utiliza configurações padrão do Create React App para formatação de código.

## Boas Práticas

1. **Componentização**: Dividir a UI em componentes pequenos e reutilizáveis
2. **Separação de Responsabilidades**: Cada componente deve ter uma única responsabilidade
3. **Hooks Personalizados**: Extrair lógica complexa para hooks personalizados
4. **Contextos**: Utilizar contextos para gerenciamento de estado global
5. **Comentários**: Adicionar comentários em código complexo ou não intuitivo
