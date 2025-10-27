# Projeto Final Front-End - Open Finance

Este projeto é uma aplicação front-end desenvolvida para o projeto final de estágio relacionado ao Open Finance.

## Tecnologias Utilizadas

-   **React** (v19.2.0) - Biblioteca para construção de interfaces de usuário
-   **React Router DOM** (v7.9.4) - Roteamento para aplicações React
-   **Axios** (v1.12.2) - Cliente HTTP para requisições à API
-   **React Icons** (v5.5.0) - Biblioteca de ícones para React
-   **CSS Modules** - Para estilização modular dos componentes

## Requisitos

-   Node.js (versão recomendada: 18.x ou superior)
-   npm ou yarn

## Como Instalar

1. Clone o repositório:

```bash
git clone https://github.com/grupo5-compass/projeto-final-front-end.git
cd projeto-final-front-end
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com as configurações necessárias:

-   `REACT_APP_API_URL`: URL da API backend (padrão: http://localhost:5001)

## Como Executar

### Ambiente de Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm start
# ou
yarn start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

### Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
# ou
yarn build
```

Os arquivos serão gerados na pasta `build`.

### Executar Testes

Para executar os testes:

```bash
npm test
# ou
yarn test
```

## Scripts Disponíveis

-   `npm start` - Inicia o servidor de desenvolvimento
-   `npm run build` - Cria build de produção
-   `npm test` - Executa os testes
-   `npm run eject` - Ejeta a configuração do Create React App (irreversível)

## Estrutura de Pastas

```
projeto-final-front-end/
├── .env                  # Variáveis de ambiente
├── .env.example          # Exemplo de variáveis de ambiente
├── .gitignore            # Arquivos ignorados pelo git
├── LICENSE               # Licença do projeto
├── README.md             # Documentação do projeto
├── package.json          # Dependências e scripts
├── package-lock.json     # Versões exatas das dependências
├── public/               # Arquivos públicos
│   ├── favicon.ico       # Ícone da aplicação
│   └── index.html        # HTML principal
└── src/                  # Código fonte
    ├── App.js            # Componente principal
    ├── index.js          # Ponto de entrada da aplicação
    ├── index.css         # Estilos globais
    ├── assets/           # Recursos estáticos
    │   └── img/          # Imagens
    │       └── logo.png  # Logo da aplicação
    ├── components/       # Componentes React
    │   ├── form/         # Componentes de formulário
    │   │   ├── Form.module.css     # Estilos de formulário
    │   │   ├── Input.js            # Componente de input
    │   │   └── Input.module.css    # Estilos do input
    │   ├── layout/       # Componentes de layout
    │   │   ├── Container.js        # Componente de container
    │   │   ├── Container.module.css # Estilos do container
    │   │   ├── Footer.js           # Componente de rodapé
    │   │   ├── Footer.module.css   # Estilos do rodapé
    │   │   ├── Message.js          # Componente de mensagens
    │   │   ├── Message.module.css  # Estilos das mensagens
    │   │   ├── Navbar.js           # Componente de navegação
    │   │   └── Navbar.module.css   # Estilos da navegação
    │   └── pages/        # Páginas da aplicação
    │       ├── Auth/     # Componentes de autenticação
    │       │   ├── Login.js    # Página de login
    │       │   └── Register.js # Página de registro
    │       └── Home.js   # Página inicial
    ├── context/          # Contextos React
    │   └── UserContext.js # Contexto de usuário
    ├── hooks/            # Hooks personalizados
    │   ├── useAuth.js    # Hook de autenticação
    │   └── useFlashMessage.js # Hook para mensagens flash
    └── utils/            # Funções utilitárias
        ├── api.js        # Configuração da API
        └── bus.js        # Sistema de eventos
```
