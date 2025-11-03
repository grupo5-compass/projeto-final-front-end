# Guia de Contribuição

Este documento descreve como implementar novas páginas, funcionalidades e componentes mantendo o padrão do projeto.

## Fluxo de Trabalho

1. Crie uma nova branch a partir da `main`
2. Implemente suas alterações
3. Faça commit das alterações
4. Abra um Pull Request para a branch `main`

## Implementando Novos Componentes

1. Crie um novo arquivo na pasta apropriada dentro de `/components`
2. Siga o padrão de nomenclatura (PascalCase para componentes)
3. Crie um arquivo CSS Module correspondente
4. Implemente o componente seguindo os padrões de código do projeto

Exemplo:

```jsx
// src/components/form/CustomInput.js
import React from "react";
import styles from "./CustomInput.module.css";

function CustomInput({ label, ...props }) {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>{label}</label>
            <input className={styles.input} {...props} />
        </div>
    );
}

export default CustomInput;
```

## Implementando Novas Páginas

1. Crie um novo componente na pasta `/components/pages`
2. Adicione a rota no arquivo de configuração de rotas
3. Implemente a lógica necessária utilizando hooks e contextos existentes

## Implementando Novas Funcionalidades

1. Identifique onde a funcionalidade deve ser implementada
2. Se necessário, crie novos hooks ou contextos
3. Mantenha a separação de responsabilidades
4. Documente a nova funcionalidade

## Boas Práticas

-   Escreva código limpo e legível
-   Mantenha os componentes pequenos e focados
-   Reutilize componentes e lógica existente
-   Siga os padrões de estilização do projeto
-   Teste suas alterações antes de submeter
