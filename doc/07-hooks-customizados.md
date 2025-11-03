# Hooks Customizados

Este documento descreve os hooks personalizados utilizados no projeto.

## useAuth

Hook para gerenciamento de autenticação do usuário.

### Funcionalidades

-   Login de usuário
-   Registro de novo usuário
-   Logout
-   Verificação de autenticação

### Como Utilizar

```jsx
import { useAuth } from "../hooks/useAuth";

function MyComponent() {
    const { authenticated, register, login, logout } = useAuth();

    // Exemplo de uso para login
    const handleLogin = async (user) => {
        await login(user);
    };

    return (
        <div>
            {authenticated ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <button onClick={() => handleLogin(userData)}>Login</button>
            )}
        </div>
    );
}
```

## useFlashMessage

Hook para exibição de mensagens temporárias ao usuário.

### Funcionalidades

-   Exibição de mensagens de sucesso
-   Exibição de mensagens de erro
-   Controle automático de tempo de exibição

### Como Utilizar

```jsx
import { useFlashMessage } from "../hooks/useFlashMessage";

function MyComponent() {
    const { setFlashMessage } = useFlashMessage();

    const handleSubmit = async (data) => {
        try {
            // Lógica de submissão
            setFlashMessage("Operação realizada com sucesso!", "success");
        } catch (error) {
            setFlashMessage("Erro ao realizar operação.", "error");
        }
    };

    return <form onSubmit={handleSubmit}>{/* Conteúdo do formulário */}</form>;
}
```
