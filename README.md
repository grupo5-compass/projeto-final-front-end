# Projeto Final Front-End - Open Finance

Este projeto é uma aplicação front-end desenvolvida para o projeto final de estágio relacionado ao Open Finance.

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

Edite o arquivo `.env` com as configurações necessárias.

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
    │   │   ├── Navbar.js           # Componente de navegação
    │   │   └── Navbar.module.css   # Estilos da navegação
    │   └── pages/        # Páginas da aplicação
    │       ├── Auth/     # Componentes de autenticação
    │       │   ├── Login.js    # Página de login
    │       │   └── Register.js # Página de registro
    │       └── Home.js   # Página inicial
    ├── context/          # Contextos React
    ├── hooks/            # Hooks personalizados
    └── utils/            # Funções utilitárias
```
