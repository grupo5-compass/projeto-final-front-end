# Estrutura de Pastas

Este documento descreve a organização de diretórios do projeto e o propósito de cada pasta principal.

## Visão Geral

```
projeto-final-front-end/
├── public/               # Arquivos públicos estáticos
├── src/                  # Código-fonte da aplicação
│   ├── assets/           # Recursos estáticos (imagens, fontes, etc.)
│   ├── components/       # Componentes React reutilizáveis
│   ├── context/          # Contextos React para gerenciamento de estado
│   ├── hooks/            # Hooks personalizados
│   └── utils/            # Funções utilitárias e helpers
```

## Detalhamento das Pastas

### `/public`

Contém arquivos estáticos que são servidos diretamente, sem processamento pelo webpack:

-   `index.html`: Template HTML principal da aplicação
-   `favicon.ico`: Ícone da aplicação exibido na aba do navegador

### `/src`

Contém todo o código-fonte da aplicação:

#### `/src/assets`

Armazena recursos estáticos utilizados na aplicação:

-   `/img`: Imagens utilizadas no projeto

#### `/src/components`

Componentes React organizados por categoria:

-   `/form`: Componentes relacionados a formulários
-   `/layout`: Componentes de estrutura da página (Header, Footer, etc.)
-   `/pages`: Componentes que representam páginas completas da aplicação

#### `/src/context`

Contextos React para gerenciamento de estado global:

-   `UserContext.js`: Gerencia o estado do usuário e autenticação

#### `/src/hooks`

Hooks personalizados para reutilização de lógica:

-   `useAuth.js`: Hook para gerenciar autenticação
-   `useFlashMessage.js`: Hook para exibir mensagens temporárias

#### `/src/utils`

Funções utilitárias e helpers:

-   `api.js`: Configuração e instância do Axios para requisições HTTP
-   `bus.js`: Sistema de eventos para comunicação entre componentes
-   `passwordValidation.js`: Funções para validação de senhas
