# OpenCard - Open Finance Frontend

Uma aplicação frontend moderna desenvolvida em React para o ecossistema Open Finance, focada em fornecer uma interface intuitiva para gestão de cartões e serviços financeiros.

## 🚀 Tecnologias Principais

-   **React** 19.2.0 - Biblioteca para construção de interfaces
-   **React Router DOM** 7.9.4 - Roteamento client-side
-   **Axios** 1.12.2 - Cliente HTTP para comunicação com APIs
-   **React Icons** 5.5.0 - Biblioteca de ícones
-   **CSS Modules** - Estilização modular e isolada

## 📋 Pré-requisitos

-   **Node.js** 18.x ou superior
-   **npm** ou **yarn**

## ⚡ Início Rápido

### 1. Clonagem e Instalação

```bash
# Clone o repositório
git clone https://github.com/grupo5-compass/projeto-final-front-end.git
cd projeto-final-front-end

# Instale as dependências
npm install
```

### 2. Configuração

```bash
# Copie o arquivo de exemplo das variáveis de ambiente
cp .env.example .env

# Configure a URL da API no arquivo .env
# REACT_APP_API_URL='http://localhost:5001'
```

### 3. Execução

```bash
# Ambiente de desenvolvimento
npm start

# Build para produção
npm run build
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## 📚 Documentação Técnica

Para informações detalhadas sobre arquitetura, configuração e desenvolvimento, consulte nossa [**documentação técnica completa**](./docs/README.md).

### Links Rápidos

-   **[Arquitetura do Projeto](./docs/arquitetura.md)** - Estrutura e padrões utilizados
-   **[Guia de Configuração](./docs/configuracao.md)** - Variáveis de ambiente e setup
-   **[Componentes](./docs/componentes.md)** - Documentação dos componentes React

## 🏗️ Estrutura Resumida

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── form/           # Componentes de formulário
│   ├── layout/         # Componentes de layout (Header, Footer, etc.)
│   └── pages/          # Páginas da aplicação
├── context/            # Contextos React (gerenciamento de estado)
├── hooks/              # Hooks personalizados
└── utils/              # Funções utilitárias e configurações
```

## 🧪 Scripts Disponíveis

```bash
npm start      # Inicia o servidor de desenvolvimento
npm run build  # Cria build otimizado para produção
npm test       # Executa os testes
npm run eject  # Ejeta as configurações do Create React App
```

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](./LICENSE).

---

**Desenvolvido por:** [Grupo 5 - Compass](https://github.com/grupo5-compass)
