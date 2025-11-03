# Guia de Setup

Este documento descreve como instalar e executar o projeto em ambiente local.

## Requisitos

-   Node.js (versão recomendada: 18.x ou superior)
-   npm ou yarn

## Instalação

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

4. Edite o arquivo `.env` com as configurações necessárias:

-   `REACT_APP_API_URL`: URL da API backend (padrão: http://localhost:5001)

## Execução

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
