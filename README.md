# Sistema de Gestão de Reclamações - Fullstack

Este projeto representa um sistema completo para gestão de reclamações de abastecimento de água, desenvolvido com Spring Boot no backend e Next.js no frontend. A aplicação permite que usuários registrem reclamações sobre problemas de abastecimento e que administradores gerenciem essas reclamações.

## 🎯 Visão Geral

O sistema é dividido em dois componentes principais:

### Backend (API RESTful)
- Construído com Spring Boot 3.4.3 e Java 21
- Implementa autenticação JWT para segurança
- Utiliza H2 Database para persistência em memória
- Arquitetura REST com controllers, services e repositories
- Suporte a CORS para integração com frontend

### Frontend (Interface de Usuário)
- Desenvolvido em Next.js 15.2.2 com TypeScript
- Integração completa com APIs REST do backend
- Estilização com Tailwind CSS 4
- Sistema de autenticação com JWT tokens
- Interface responsiva e moderna

## ⚡ Funcionalidades Principais

### 🔐 Autenticação e Autorização
- Login de usuários e administradores com email e senha
- Sistema de autenticação baseado em JWT
- Middleware de proteção de rotas privadas
- Controle de acesso por roles (admin/usuario)
- Logout automático quando necessário

### 👥 Gestão de Usuários
- Cadastro e autenticação de usuários
- Atualização de perfil
- Busca por email
- Gerenciamento de administradores

### 📋 Gestão de Reclamações
- Criação de reclamações por usuários com formulário completo
- Atualização de status das reclamações
- Listagem de todas as reclamações com status visual
- Visualização de detalhes (endereço, data, descrição)
- Status: Em Aberto, Em Análise, Resolvido

### 🛡️ Segurança
- Tokens JWT com expiração de 2 horas
- Filtros de segurança customizados
- Criptografia e validações robustas
- Headers de autenticação automáticos

## 🚀 Tecnologias Utilizadas

### Backend
- **Spring Boot** 3.4.3
- **Java** 21
- **Spring Data JPA**
- **Spring Boot Validation**
- **Spring Boot Actuator**
- **H2 Database** (desenvolvimento)
- **JWT** (io.jsonwebtoken)
- **Hibernate**
- **Gradle**

### Frontend
- **Next.js** 15.2.2
- **React** 19
- **TypeScript** 5
- **Tailwind CSS** 4
- **Axios** (cliente HTTP)
- **js-cookie** (manipulação de cookies)
- **Lucide React** (ícones)

## 📁 Estrutura do Projeto

```
root/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/backend/
│   │   │   │   ├── controller/          # Controladores REST
│   │   │   │   │   ├── AdminController.java
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── ReclamacaoController.java
│   │   │   │   │   └── UsuarioController.java
│   │   │   │   ├── model/               # Entidades JPA
│   │   │   │   │   ├── Admin.java
│   │   │   │   │   ├── Login.java
│   │   │   │   │   ├── Reclamacao.java
│   │   │   │   │   └── Usuario.java
│   │   │   │   ├── repository/          # Repositories JPA
│   │   │   │   ├── security/            # Configurações de segurança
│   │   │   │   │   ├── JwtAuthFilter.java
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   └── TokenJWT.java
│   │   │   │   ├── service/             # Lógica de negócio
│   │   │   │   └── BackendApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── build.gradle.kts                 # Configuração Gradle
│   └── gradlew                          # Wrapper do Gradle
├── frontend/
│   ├── public/                          # Arquivos estáticos
│   │   └── *.svg                       # Ícones SVG
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   └── axios.ts            # Configuração do cliente HTTP
│   │   │   ├── components/             # Componentes reutilizáveis
│   │   │   │   ├── CadastroUsuarioForm.tsx
│   │   │   │   └── ReclamacaoForm.tsx
│   │   │   ├── cadastro/               # Página de cadastro
│   │   │   ├── login/                  # Página de login
│   │   │   ├── reclamacoes/            # Páginas de reclamações
│   │   │   │   ├── nova/               # Nova reclamação
│   │   │   │   ├── ReclamacaoList.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── globals.css             # Estilos globais
│   │   │   ├── layout.tsx              # Layout principal
│   │   │   └── page.tsx                # Página inicial
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx         # Context API para autenticação
│   │   └── middleware.ts               # Middleware de autenticação
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
└── README.md
```

## 🛠️ Configuração e Execução

### Pré-requisitos

**Ferramentas Necessárias:**
- Java 21 ou superior (JDK)
- Gradle (incluído via wrapper)
- Node.js (versão 18 ou superior)
- npm ou yarn
- IDE: IntelliJ IDEA, VS Code ou similar

### Passo 1: Clonando o Repositório

```bash
git clone <url_do_repositorio>
cd <nome_do_projeto>
```

### Passo 2: Configurando e Executando o Backend

```bash
# Navegue para a pasta do backend
cd backend

# Compile o projeto
./gradlew build

# Execute o servidor backend
./gradlew bootRun
```

O servidor estará disponível em: **http://localhost:8080**

### Passo 3: Configurando e Executando o Frontend

```bash
# Navegue para a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Execute o servidor frontend
npm run dev
```

O frontend estará disponível em: **http://localhost:3000**

## 🌐 Endpoints da API

### Autenticação
- `POST /auth/login` - Login de usuários e administradores
- `GET /auth/protegido` - Endpoint protegido para teste de JWT

### Usuários
- `GET /usuarios` - Listar todos os usuários
- `POST /usuarios` - Cadastrar novo usuário
- `PUT /usuarios/{id}` - Atualizar usuário
- `GET /usuarios/email/{email}` - Buscar usuário por email
- `DELETE /usuarios/{id}` - Deletar usuário

### Administradores
- `GET /admins` - Listar todos os administradores
- `POST /admins` - Cadastrar novo administrador
- `PUT /admins/{id}` - Atualizar administrador
- `DELETE /admins/{id}` - Deletar administrador

### Reclamações
- `GET /reclamacoes` - Listar todas as reclamações
- `POST /reclamacoes` - Criar nova reclamação
- `PUT /reclamacoes/{id}/status` - Atualizar status da reclamação

## 🗄️ Banco de Dados

O projeto utiliza H2 Database em memória para desenvolvimento:

- **URL:** `jdbc:h2:mem:abastecimentodb`
- **Console H2:** http://localhost:8080/h2-console
- **Username:** `sa`
- **Password:** (vazio)

### Entidades Principais

**Usuario**
```json
{
  "id": "Long",
  "nome": "String",
  "endereco": "String", 
  "email": "String (único)",
  "telefone": "String",
  "senha": "String"
}
```

**Reclamacao**
```json
{
  "id": "Long",
  "endereco": "String",
  "detalhes": "String",
  "dtInsercao": "LocalDateTime",
  "status": "String",
  "usuario": "Usuario"
}
```

**Admin**
```json
{
  "id": "Long",
  "nome": "String",
  "email": "String (único)",
  "senha": "String"
}
```

## 🔐 Sistema de Autenticação

### Como Funciona

1. **Login**: Usuário fornece email e senha
2. **Token JWT**: Backend retorna token de autenticação
3. **Armazenamento**: Token salvo em cookie seguro
4. **Interceptor**: Axios adiciona token automaticamente nas requisições
5. **Middleware**: Protege rotas privadas verificando o token
6. **Context API**: Gerencia estado de autenticação globalmente

### Fluxo de Autenticação

```
Usuário → Login → Token → Cookie → Rotas Protegidas
                    ↓
                 Middleware → Verificação → Acesso/Redirect
```

### Headers de Autenticação

Todas as requisições para rotas protegidas incluem automaticamente:
```
Authorization: Bearer <jwt-token>
```

## 📱 Interface e Responsividade

### Design Responsivo

O sistema funciona perfeitamente em:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

### Estados Visuais

**Estados de Reclamação:**
- **EM_ABERTO** → "Não Resolvido" (vermelho)
- **EM_ANALISE** → "Em Análise" (amarelo)
- **RESOLVIDO** → "Resolvido" (verde)

**Feedback Visual:**
- Loading states durante requisições
- Spinners e botões desabilitados
- Mensagens informativas para o usuário
- Tratamento de erros com feedback claro

## 🔧 Scripts e Comandos Úteis

### Backend
```bash
# Executar testes
./gradlew test

# Limpar build
./gradlew clean

# Build sem testes
./gradlew build -x test

# Verificar dependências
./gradlew dependencies
```

### Frontend
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar versão de produção
npm run start

# Linting
npm run lint
```

## 🚨 Tratamento de Erros

### Tipos de Erro Tratados

- **Erros de rede** - Servidor indisponível
- **Erros de autenticação** - Token inválido/expirado
- **Erros de validação** - Campos obrigatórios
- **Erros de API** - Respostas de erro do backend

### Estratégias de Tratamento

- Try/catch em todas as requisições
- Estados de erro nos componentes
- Mensagens informativas para o usuário
- Redirecionamentos automáticos quando necessário

## 🚀 Deploy e Produção

### Configurações para Produção

Para produção, considere:

- Migrar para um banco de dados persistente (PostgreSQL, MySQL)
- Implementar criptografia de senhas (BCrypt)
- Adicionar validações mais robustas
- Implementar logs de auditoria
- Configurar profiles de ambiente
- Adicionar testes de integração

### Variáveis de Ambiente

```env
# .env.production (Frontend)
NEXT_PUBLIC_API_URL=https://sua-api.com
```

## 🤝 Desenvolvimento

### Hot Reload
- Backend utiliza Spring Boot DevTools
- Frontend com hot reload nativo do Next.js
- Console H2 disponível em desenvolvimento
- CORS configurado para origins = "*"

### Debugging
- Logs de debug no arquivo `axios.ts`
- Console H2 para inspeção do banco
- Estados de loading em todos os componentes

## 📚 Referências

- [Documentação do Spring Boot](https://spring.io/projects/spring-boot)
- [Documentação do Next.js](https://nextjs.org/docs)
- [JWT.io](https://jwt.io/)
- [H2 Database](http://www.h2database.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique se o backend está rodando em `http://localhost:8080`
- Confira os logs do console do navegador
- Verifique a configuração do CORS no backend
- Consulte a documentação das tecnologias utilizadas

---

**🚀 Sistema pronto para desenvolvimento e evolução!**
