# Documentação dos Componentes

## Visão Geral

Este documento detalha os componentes React principais do projeto OpenCard, suas responsabilidades, props, e exemplos de uso.

## Componentes de Layout

### Navbar

**Localização**: `src/components/layout/Navbar.js`

**Responsabilidade**: Barra de navegação principal da aplicação.

#### Props
Não recebe props (componente estático).

#### Estrutura
```javascript
function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="OpenCard" />
                <h2>OpenCard</h2>
            </div>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/login">Entrar</Link></li>
                <li><Link to="/register">Cadastrar</Link></li>
            </ul>
        </nav>
    );
}
```

#### Estilos
- **Arquivo**: `Navbar.module.css`
- **Características**: Layout flexbox, cores do tema, hover effects

---

### Container

**Localização**: `src/components/layout/Container.js`

**Responsabilidade**: Wrapper para centralização e responsividade do conteúdo.

#### Props
| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `children` | ReactNode | Sim | Conteúdo a ser renderizado dentro do container |

#### Exemplo de Uso
```javascript
<Container>
    <h1>Título da Página</h1>
    <p>Conteúdo da página...</p>
</Container>
```

---

### Footer

**Localização**: `src/components/layout/Footer.js`

**Responsabilidade**: Rodapé da aplicação com informações institucionais.

#### Props
Não recebe props (componente estático).

---

### Message

**Localização**: `src/components/layout/Message.js`

**Responsabilidade**: Sistema de notificações flash para feedback do usuário.

#### Estado Interno
```javascript
const [visible, setVisible] = useState(false);
const [message, setMessage] = useState("");
const [type, setType] = useState("");
```

#### Tipos de Mensagem
- `success`: Mensagens de sucesso (verde)
- `error`: Mensagens de erro (vermelho)

#### Integração com Event Bus
```javascript
useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
        setVisible(true);
        setMessage(message);
        setType(type);
        
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    });
}, []);
```

## Componentes de Formulário

### Input

**Localização**: `src/components/form/Input.js`

**Responsabilidade**: Campo de entrada reutilizável com label e estilização consistente.

#### Props
| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `type` | string | Sim | Tipo do input (text, email, password, etc.) |
| `text` | string | Sim | Texto do label |
| `name` | string | Sim | Nome do campo (usado para id e name) |
| `placeholder` | string | Não | Texto placeholder |
| `handleOnChange` | function | Sim | Função callback para mudanças |
| `value` | string | Não | Valor controlado do input |
| `multiple` | boolean | Não | Para inputs de arquivo múltiplo |

#### Exemplo de Uso
```javascript
<Input
    type="email"
    text="Email"
    name="email"
    placeholder="Digite seu email"
    handleOnChange={handleOnChange}
    value={user.email}
/>
```

#### Estrutura
```javascript
function Input({ type, text, name, placeholder, handleOnChange, value, multiple }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                {...(multiple ? { multiple } : "")}
            />
        </div>
    );
}
```

## Componentes de Página

### Login

**Localização**: `src/components/pages/Auth/Login.js`

**Responsabilidade**: Formulário de autenticação de usuários.

#### Estado Local
```javascript
const [user, setUser] = useState({});
```

#### Context Utilizado
```javascript
const { login } = useContext(Context);
```

#### Campos do Formulário
- **Email**: Campo obrigatório para identificação
- **Senha**: Campo de senha para autenticação

#### Fluxo de Submissão
```javascript
const handleSubmit = (e) => {
    e.preventDefault();
    login(user); // Chama função do contexto
};
```

#### Exemplo de Estrutura
```javascript
<form onSubmit={handleSubmit}>
    <Input
        type="email"
        text="Email"
        name="email"
        placeholder="Digite seu email"
        handleOnChange={handleOnChange}
    />
    <Input
        type="password"
        text="Senha"
        name="senha"
        placeholder="Digite sua senha"
        handleOnChange={handleOnChange}
    />
    <input type="submit" value="Entrar" />
</form>
```

---

### Register

**Localização**: `src/components/pages/Auth/Register.js`

**Responsabilidade**: Formulário de cadastro de novos usuários.

#### Estado Local
```javascript
const [user, setUser] = useState({});
```

#### Context Utilizado
```javascript
const { register } = useContext(Context);
```

#### Campos do Formulário
- **Nome**: Nome completo do usuário
- **Email**: Email único para identificação
- **Senha**: Senha para autenticação
- **Confirmação de Senha**: Validação da senha

#### Fluxo de Submissão
```javascript
const handleSubmit = (e) => {
    e.preventDefault();
    register(user); // Chama função do contexto
};
```

---

### Home

**Localização**: `src/components/pages/Home.js`

**Responsabilidade**: Dashboard principal da aplicação (página inicial).

## Hooks Personalizados

### useAuth

**Localização**: `src/hooks/useAuth.js`

**Responsabilidade**: Gerenciamento de autenticação e comunicação com API.

#### Estado Gerenciado
```javascript
const [authenticated, setAuthenticated] = useState(false);
```

#### Funções Expostas
| Função | Parâmetros | Retorno | Descrição |
|--------|------------|---------|-----------|
| `register` | `user: Object` | `void` | Cadastra novo usuário |
| `login` | `user: Object` | `void` | Autentica usuário existente |
| `authUser` | `data: Object` | `void` | Processa dados de autenticação |

#### Exemplo de Implementação
```javascript
async function login(user) {
    let msgTxt = "Login realizado com sucesso!";
    let msgType = "success";

    try {
        const data = await api.post("/auth", user).then((response) => {
            return response.data;
        });

        await authUser(data);
    } catch (error) {
        msgTxt = error.response.data.message;
        msgType = "error";
    }

    setFlashMessage(msgTxt, msgType);
}
```

---

### useFlashMessage

**Localização**: `src/hooks/useFlashMessage.js`

**Responsabilidade**: Sistema de mensagens de feedback para o usuário.

#### Função Principal
```javascript
const setFlashMessage = (msg, type) => {
    bus.emit("flash", {
        message: msg,
        type: type,
    });
};
```

#### Tipos Suportados
- `success`: Mensagens de sucesso
- `error`: Mensagens de erro
- `warning`: Mensagens de aviso
- `info`: Mensagens informativas

## Context API

### UserContext

**Localização**: `src/context/UserContext.js`

**Responsabilidade**: Gerenciamento global do estado de autenticação.

#### Estrutura
```javascript
const Context = createContext();

function UserProvider({ children }) {
    const { authenticated, register, login } = useAuth();

    return (
        <Context.Provider value={{ authenticated, register, login }}>
            {children}
        </Context.Provider>
    );
}
```

#### Valores Fornecidos
| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `authenticated` | boolean | Status de autenticação do usuário |
| `register` | function | Função para cadastro de usuário |
| `login` | function | Função para login de usuário |

#### Uso em Componentes
```javascript
import { useContext } from "react";
import { Context } from "../context/UserContext";

function MyComponent() {
    const { authenticated, login } = useContext(Context);
    
    // Usar as funções e estado...
}
```

## Utilitários

### API Client

**Localização**: `src/utils/api.js`

**Responsabilidade**: Configuração centralizada do cliente HTTP.

#### Configuração Base
```javascript
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});
```

#### Interceptors
```javascript
// Request interceptor para adicionar token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
```

---

### Event Bus

**Localização**: `src/utils/bus.js`

**Responsabilidade**: Sistema de eventos para comunicação entre componentes.

#### Funcionalidades
- `emit(event, data)`: Emite um evento
- `addListener(event, callback)`: Adiciona listener para evento
- `removeListener(event, callback)`: Remove listener

## Padrões de Estilização

### CSS Modules

Todos os componentes utilizam CSS Modules para isolamento de estilos:

```javascript
import styles from "./Component.module.css";

function Component() {
    return <div className={styles.container}>...</div>;
}
```

### Convenções de Nomenclatura

#### Classes CSS
```css
/* PascalCase para componentes */
.navbar { }
.navbar_logo { }
.navbar_logo_img { }

/* camelCase para estados */
.isActive { }
.isDisabled { }
```

#### Variáveis CSS
```css
:root {
    --primary-color: #0F172B;
    --secondary-color: #BEDBFF;
    --success-color: #155724;
    --error-color: #721c24;
}
```

## Testes

### Estrutura de Testes

```javascript
// Component.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
    test('renders correctly', () => {
        render(<Component />);
        expect(screen.getByText('Expected Text')).toBeInTheDocument();
    });

    test('handles user interaction', () => {
        const mockHandler = jest.fn();
        render(<Component onAction={mockHandler} />);
        
        fireEvent.click(screen.getByRole('button'));
        expect(mockHandler).toHaveBeenCalled();
    });
});
```

### Mocking de Contextos

```javascript
// Mock do UserContext para testes
const mockContextValue = {
    authenticated: true,
    login: jest.fn(),
    register: jest.fn(),
};

const renderWithContext = (component) => {
    return render(
        <Context.Provider value={mockContextValue}>
            {component}
        </Context.Provider>
    );
};
```

## Boas Práticas

### 1. Componentização
- Mantenha componentes pequenos e focados
- Extraia lógica complexa para hooks personalizados
- Use composição ao invés de herança

### 2. Estado
- Use estado local para dados específicos do componente
- Use Context para estado global (autenticação, tema)
- Evite prop drilling excessivo

### 3. Performance
- Use React.memo para componentes que renderizam frequentemente
- Implemente useCallback e useMemo quando necessário
- Considere lazy loading para componentes pesados

### 4. Acessibilidade
- Sempre inclua labels em inputs
- Use roles ARIA quando apropriado
- Mantenha contraste adequado nas cores

### 5. Manutenibilidade
- Documente props complexas com PropTypes ou TypeScript
- Mantenha arquivos pequenos e organizados
- Use nomes descritivos para funções e variáveis