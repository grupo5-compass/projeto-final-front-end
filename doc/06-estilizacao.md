# Estilização

Este documento descreve a abordagem de estilização utilizada no projeto.

## CSS Modules

O projeto utiliza CSS Modules para estilização dos componentes. Esta abordagem permite:

-   Escopo local para classes CSS
-   Evitar conflitos de nomes de classes
-   Melhor organização do código

## Estrutura de Arquivos

Cada componente possui seu próprio arquivo CSS com o mesmo nome:

```
Button.js
Button.module.css
```

## Como Utilizar

```jsx
// Importação do módulo CSS
import styles from "./Button.module.css";

function Button({ children, ...props }) {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    );
}
```

## Convenções de Nomenclatura

-   Classes em camelCase
-   Nomes descritivos que indicam a função do elemento
-   Prefixos para estados (ex: `isActive`, `hasError`)

## Responsividade

O projeto utiliza media queries para garantir a responsividade em diferentes tamanhos de tela:

```css
/* Mobile first */
.container {
    padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        padding: 3rem;
    }
}
```
