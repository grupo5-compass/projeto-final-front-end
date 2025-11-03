# Rotas da Aplicação

Este documento descreve como as rotas da aplicação são gerenciadas.

## Configuração de Rotas

O projeto utiliza o React Router DOM para gerenciamento de rotas. A configuração principal está no arquivo `App.js`.

## Estrutura de Rotas

As rotas são organizadas de forma hierárquica, com algumas rotas protegidas que exigem autenticação.

### Rotas Públicas

Rotas acessíveis sem autenticação:

-   `/` - Página inicial
-   `/login` - Página de login
-   `/register` - Página de cadastro

### Rotas Protegidas

Rotas que exigem autenticação do usuário:

-   `/profile` - Perfil do usuário
-   `/dashboard` - Painel principal

## Proteção de Rotas

A proteção de rotas é implementada através de um componente wrapper que verifica se o usuário está autenticado antes de renderizar o componente da rota. Caso o usuário não esteja autenticado, ele é redirecionado para a página de login.

## Navegação Programática

Para navegação programática, o hook `useNavigate` do React Router é utilizado:

```jsx
import { useNavigate } from "react-router-dom";

function MyComponent() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/dashboard");
    };

    // ...
}
```
