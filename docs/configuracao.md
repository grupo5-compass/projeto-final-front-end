# Guia de Configuração

## Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para configurar diferentes aspectos da aplicação.

### Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```bash
cp .env.example .env
```

### Variáveis Disponíveis

#### `REACT_APP_API_URL`
- **Descrição**: URL base da API backend
- **Tipo**: String
- **Obrigatório**: Sim
- **Exemplo**: `http://localhost:4000`

```env
# Desenvolvimento
REACT_APP_API_URL='http://localhost:4000'

```

## Configuração da API

### Cliente HTTP (Axios)

A configuração do cliente HTTP está centralizada em `src/utils/api.js`:

```javascript
import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
```

### Endpoints da API

#### **Autenticação**
- `POST /auth` - Login de usuário
- `POST /user` - Cadastro de usuário

#### **Configuração de Headers**
```javascript
// Headers padrão
{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {token}' // Adicionado automaticamente quando autenticado
}
```