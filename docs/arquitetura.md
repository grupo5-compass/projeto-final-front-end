# Arquitetura do Projeto

## Visão Geral

O OpenCard é uma aplicação frontend construída seguindo os princípios da **arquitetura baseada em componentes** do React, com foco em modularidade, reutilização e manutenibilidade.

## Padrões Arquiteturais

### 1. Component-Based Architecture

A aplicação segue o padrão de **componentes funcionais** com hooks, organizados em uma hierarquia clara:

```
App (Root Component)
├── UserProvider (Context Provider)
├── Navbar (Layout Component)
├── Message (Notification Component)
├── Container (Layout Wrapper)
└── Routes
    ├── Login (Page Component)
    ├── Register (Page Component)
    └── Home (Page Component)
```

### 2. Separation of Concerns

#### **Componentes de Layout** (`/components/layout/`)
- **Navbar**: Navegação principal da aplicação
- **Footer**: Rodapé com informações institucionais
- **Container**: Wrapper para centralização e responsividade
- **Message**: Sistema de notificações flash

#### **Componentes de Formulário** (`/components/form/`)
- **Input**: Componente reutilizável para campos de entrada
- Utiliza CSS Modules para isolamento de estilos

#### **Páginas** (`/components/pages/`)
- **Auth/Login**: Autenticação de usuários
- **Auth/Register**: Cadastro de novos usuários
- **Home**: Dashboard principal

### 3. State Management

#### **Context API**
```javascript
// UserContext.js
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

#### **Custom Hooks**
- **useAuth**: Gerencia autenticação e comunicação com API
- **useFlashMessage**: Sistema de mensagens de feedback

## Estrutura de Pastas Detalhada

```
src/
├── App.js                    # Componente raiz e configuração de rotas
├── index.js                  # Ponto de entrada da aplicação
├── index.css                 # Estilos globais
│
├── assets/                   # Recursos estáticos
│   └── img/                  # Imagens e ícones
│       └── logo.png
│
├── components/               # Componentes React
│   ├── form/                 # Componentes de formulário
│   │   ├── Input.js          # Campo de entrada reutilizável
│   │   ├── Input.module.css  # Estilos isolados do Input
│   │   └── Form.module.css   # Estilos compartilhados de formulários
│   │
│   ├── layout/               # Componentes de estrutura
│   │   ├── Container.js      # Wrapper de conteúdo
│   │   ├── Footer.js         # Rodapé da aplicação
│   │   ├── Navbar.js         # Barra de navegação
│   │   ├── Message.js        # Sistema de notificações
│   │   └── *.module.css      # Estilos específicos de cada componente
│   │
│   └── pages/                # Componentes de página
│       ├── Auth/             # Páginas de autenticação
│       │   ├── Login.js      # Formulário de login
│       │   └── Register.js   # Formulário de cadastro
│       └── Home.js           # Dashboard principal
│
├── context/                  # Gerenciamento de estado global
│   └── UserContext.js        # Contexto de autenticação
│
├── hooks/                    # Hooks personalizados
│   ├── useAuth.js            # Lógica de autenticação
│   └── useFlashMessage.js    # Sistema de mensagens
│
└── utils/                    # Utilitários e configurações
    ├── api.js                # Configuração do cliente HTTP (Axios)
    └── bus.js                # Event bus para comunicação entre componentes
```

## Fluxo de Dados

### 1. Autenticação
```
Login/Register Form → useAuth Hook → API Call → UserContext → Global State Update
```

### 2. Comunicação com API
```
Component → useAuth → api.js (Axios) → Backend API → Response → State Update
```

### 3. Notificações
```
API Response → useFlashMessage → bus.js → Message Component → UI Update
```

## Tecnologias e Bibliotecas

### **Core**
- **React 19.2.0**: Biblioteca principal para UI
- **React DOM 19.2.0**: Renderização no DOM
- **React Router DOM 7.9.4**: Roteamento client-side

### **HTTP Client**
- **Axios 1.12.2**: Cliente HTTP para comunicação com APIs

### **UI e Estilização**
- **CSS Modules**: Isolamento de estilos por componente
- **React Icons 5.5.0**: Biblioteca de ícones
- **Google Fonts (Inter)**: Tipografia moderna

### **Desenvolvimento e Testes**
- **React Scripts 5.0.1**: Toolchain do Create React App
- **Testing Library**: Suite de testes para React
- **Web Vitals**: Métricas de performance

## Princípios de Design

### 1. **Single Responsibility Principle**
Cada componente tem uma responsabilidade específica e bem definida.

### 2. **Composition over Inheritance**
Utilização de composição de componentes ao invés de herança.

### 3. **Unidirectional Data Flow**
Fluxo de dados sempre de cima para baixo na hierarquia de componentes.

### 4. **Separation of Concerns**
Separação clara entre lógica de negócio, apresentação e estado.

## Padrões de Código

### **Naming Conventions**
- Componentes: PascalCase (`UserProfile.js`)
- Hooks: camelCase com prefixo "use" (`useAuth.js`)
- CSS Modules: camelCase (`navbar_logo`)

### **File Organization**
- Um componente por arquivo
- Estilos CSS Modules co-localizados
- Hooks personalizados em pasta dedicada

### **Import Organization**
```javascript
// 1. Bibliotecas externas
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

// 2. Componentes internos
import Input from "../../form/Input";

// 3. Estilos
import styles from "./Component.module.css";

// 4. Contextos
import { Context } from "../../../context/UserContext";
```

## Considerações de Performance

- **Code Splitting**: Preparado para implementação com React.lazy()
- **CSS Modules**: Evita conflitos de CSS e melhora performance
- **Functional Components**: Melhor performance com React Hooks
- **Context Optimization**: Contexto específico para autenticação

## Próximos Passos

- Implementação de lazy loading para páginas
- Adição de testes unitários e de integração
- Implementação de PWA features
- Otimização de bundle size