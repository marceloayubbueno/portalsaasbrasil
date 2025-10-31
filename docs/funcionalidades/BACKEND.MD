# 📘 Documentação Backend - Portal SaaS Brasil

> **Backend NestJS + MongoDB para o Portal SaaS Brasil**  
> Sistema de autenticação multicliente com JWT e isolamento por tenant

---

## 📑 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Tecnologias Utilizadas](#tecnologias-utilizadas)
5. [Funcionamento do Backend](#funcionamento-do-backend)
6. [Configuração Local](#configuração-local)
7. [Configuração do Render](#configuração-do-render)
8. [Scripts e Comandos](#scripts-e-comandos)
9. [Autenticação JWT Multicliente](#autenticação-jwt-multicliente)
10. [Rotas da API](#rotas-da-api)
11. [Variáveis de Ambiente](#variáveis-de-ambiente)
12. [Como Restaurar o Projeto](#como-restaurar-o-projeto)
13. [Troubleshooting](#troubleshooting)
14. [Deploy e Build](#deploy-e-build)

---

## 🎯 Visão Geral

### O que é o Backend?

Backend desenvolvido em **NestJS** (TypeScript) que serve como API REST para o Portal SaaS Brasil. O sistema implementa:

- ✅ Autenticação JWT com isolamento por cliente (`clientId`)
- ✅ Multi-tenancy com segregação de dados por empresa
- ✅ Sistema de Administradores (Super Admin)
- ✅ Gestão de Produtos SaaS e Categorias
- ✅ Seed automático de Super Admin na inicialização
- ✅ Logs detalhados de segurança e auditoria
- ✅ Tratamento global de erros
- ✅ Configuração CORS para domínios específicos

### Estrutura de URL

```
Backend (NestJS):     Render.com ou Railway
Frontend (Next.js):   Vercel.com (portalsaasbrasil.vercel.app)
```

---

## 🏗️ Arquitetura do Sistema

### Padrão Arquitetural

**Modular (MVC Pattern com Dependency Injection)**

```
server/src/
├── app.module.ts          # Módulo raiz
├── main.ts                # Bootstrap da aplicação
├── admins/                # Gestão de administradores
├── auth/                  # Autenticação JWT
│   ├── guards/            # Guards de autenticação
│   ├── strategies/        # Estratégias JWT
│   └── decorators/        # Decorators customizados
└── products/              # Produtos SaaS
```

### Fluxo de Autenticação

```
1. Cliente faz login → /auth/login
2. AuthService valida credenciais
3. JWT é gerado com payload: { clientId, email, role }
4. Token é retornado ao frontend
5. Frontend armazena token em localStorage
6. Requisições subsequentes incluem: Authorization: Bearer <token>
7. Guards validam token e extraem clientId
8. Serviços filtram dados por clientId automaticamente
```

---

## 📁 Estrutura de Pastas

```
server/
├── dist/                  # Código compilado (gerado automaticamente)
├── src/
│   ├── admins/            # Módulo de Administradores
│   │   ├── entities/      # Schemas do MongoDB
│   │   ├── admins.controller.ts
│   │   ├── admins.service.ts
│   │   └── seed-superadmin.ts  # 🔐 Seed automático
│   ├── auth/              # Módulo de Autenticação
│   │   ├── guards/        # Guards JWT (Admin, Client, SaaS)
│   │   ├── strategies/   # JWT Strategy, JWT SaaS Strategy
│   │   ├── decorators/   # @ClientId decorator
│   │   └── dto/          # LoginDto, RegisterDto
│   ├── products/         # Módulo de Produtos SaaS
│   │   ├── entities/     # Product, Category, SaasCompany schemas
│   │   ├── saas-companies.controller.ts
│   │   └── products.controller.ts
│   ├── app.module.ts     # Módulo principal
│   └── main.ts           # Bootstrap
├── package.json          # Dependências e scripts
├── tsconfig.json         # Configuração TypeScript
└── tsconfig.build.json   # Configuração de build
```

---

## 🛠️ Tecnologias Utilizadas

### Core
- **NestJS 11.1.0** - Framework Node.js
- **TypeScript 5.8.3** - Linguagem
- **Node.js 18.x** - Runtime

### Banco de Dados
- **MongoDB** - Banco NoSQL
- **Mongoose 7.8.7** - ODM

### Autenticação
- **Passport** - Middleware de autenticação
- **passport-jwt** - Estratégia JWT
- **bcryptjs** - Hash de senhas
- **@nestjs/jwt** - Módulo JWT NestJS

### Validação
- **class-validator** - Validação de DTOs
- **class-transformer** - Transformação de objetos

### Desenvolvimento
- **ts-node** - Executar TypeScript
- **tsconfig** - Configuração TypeScript

---

## ⚙️ Funcionamento do Backend

### 1. Bootstrap (main.ts)

```typescript
// Quando o servidor inicia:
1. Carrega variáveis de ambiente (.env)
2. Cria aplicação NestJS
3. 🔐 Executa seed automático do Super Admin
4. Configura arquivos estáticos
5. Configura CORS para domínios permitidos
6. Configura filtro global de erros
7. Configura ValidationPipe global
8. Inicia servidor na porta especificada (PORT ou 3000)
```

### 2. Sistema de Seed Automático

**Super Admin** é criado automaticamente ao iniciar:

```typescript
// server/src/admins/seed-superadmin.ts
- Verifica se existe Super Admin no banco
- Se não existir, cria automaticamente
- Email e senha definidos em .env
- Executa sempre que o servidor inicia
```

### 3. Guards de Autenticação

#### **JwtAuthGuard** (Admin)
- Valida token JWT
- Extrai dados do admin autenticado
- Usado em rotas administrativas

#### **JwtClientAuthGuard** (Cliente)
- Valida token JWT + clientId
- Garante isolamento por cliente
- Logs de auditoria

#### **JwtSaasAuthGuard** (Saas)
- Autenticação específica para empresas SaaS
- Estratégia separada do JWT comum

### 4. Decorators Customizados

#### **@ClientId()**
```typescript
// Extrai clientId automaticamente do token JWT
@Get('/minha-rota')
async minhaRota(@ClientId() clientId: string) {
  // clientId já extraído e validado
}
```

### 5. Tratamento Global de Erros

```typescript
// GlobalExceptionLogger captura TODOS os erros
- Loga detalhes completos no console
- Retorna resposta JSON padronizada
- Status code correto
- Stack trace para debug
```

---

## 🖥️ Configuração Local

### Pré-requisitos

```bash
✅ Node.js 18.x ou superior
✅ MongoDB local ou Atlas
✅ Git
```

### Passo a Passo

#### 1. Clone o repositório

```bash
git clone https://github.com/marceloayubbueno/portalsaasbrasil.git
cd portalsaasbrasil
```

#### 2. Entre na pasta server

```bash
cd server
```

#### 3. Instale as dependências

```bash
npm install
```

#### 4. Configure as variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp ENV.EXAMPLE .env

# Edite o .env com suas configurações
```

#### 5. Configure MongoDB

**Opção A: MongoDB Local**
```bash
# Instale MongoDB localmente
# Configure MONGODB_URI em .env:
MONGODB_URI=mongodb://localhost:27017
```

**Opção B: MongoDB Atlas (Recomendado para produção)**
```bash
# Crie conta em mongodb.com/cloud/atlas
# Crie cluster gratuito (M0)
# Copie connection string
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/
```

#### 6. Configure Super Admin

Edite `.env`:
```env
SUPER_ADMIN_EMAIL=admin@exemplo.com
SUPER_ADMIN_PASSWORD=senhaForte123!
SUPER_ADMIN_NAME=Administrador Principal
```

#### 7. Execute o backend

```bash
# Desenvolvimento (hot reload)
npm run start:dev

# Produção
npm run build
npm run start
```

#### 8. Verifique se está funcionando

Acesse: `http://localhost:3000`  
Você verá logs indicando que o servidor iniciou.

---

## ☁️ Configuração do Render

### Painel do Render

URL do Dashboard: https://dashboard.render.com

### Serviço: Web Service (NestJS Backend)

#### **Configurações Gerais**

```
Name: programa-indicacao-server
Region: São Paulo (Brazil)
Branch: main
Root Directory: (deixar vazio - pega raiz do repo)
```

#### **Build & Deploy**

```
Build Command: npm install && npm run build
Start Command: npm run start:prod
```

#### **Environment**

```
NODE_ENV=production
PORT=3000 (pode ser qualquer porta, Render fornece dinamicamente)

# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/

# JWT
JWT_SECRET=sua-chave-secreta-muito-segura-aqui

# URLs
CLIENT_URL=https://portalsaasbrasil.vercel.app
BACKEND_URL=https://programa-indicacao-server.onrender.com

# Super Admin
SUPER_ADMIN_EMAIL=admin@exemplo.com
SUPER_ADMIN_PASSWORD=SenhaSegura123!
SUPER_ADMIN_NAME=Super Administrador

# Email (opcional)
BREVO_API_KEY=seu-api-key
FROM_EMAIL=noreply@exemplo.com
FROM_NAME=Portal SaaS Brasil
```

#### **Auto-Deploy**

Render configura automaticamente ao fazer push no GitHub:
- Monitora branch `main`
- Faz build automaticamente
- Reinicia o serviço

---

## 📜 Scripts e Comandos

### package.json

```json
{
  "scripts": {
    "start:dev": "ts-node src/main.ts",     // Desenvolvimento com hot reload
    "build": "tsc -p tsconfig.build.json",  // Compila TypeScript
    "start": "node dist/main.js",          // Produção (local)
    "start:prod": "node dist/main.js"      // Produção (Render)
  }
}
```

### Comandos Úteis

```bash
# Desenvolvimento
npm run start:dev

# Build local
npm run build

# Testar build localmente
npm run build
npm run start

# Limpar dist
rm -rf dist

# Ver logs
npm run start:dev | grep "BOOT"
```

---

## 🔐 Autenticação JWT Multicliente

### Conceitos

**Multi-tenancy**: Sistema onde um único backend serve múltiplas empresas, mantendo dados isolados por `clientId`.

### Como Funciona

#### 1. Login

```typescript
POST /auth/login
{
  "email": "admin@empresa.com",
  "password": "senha123"
}

// Resposta:
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "admin@empresa.com",
    "clientId": "empresa-123"  // ← Isolamento
  }
}
```

#### 2. Requisições Autenticadas

```typescript
GET /api/produtos
Headers: {
  "Authorization": "Bearer eyJhbGc..."
}

// Backend automaticamente:
// 1. Valida token
// 2. Extrai clientId do token
// 3. Filtra dados apenas daquele clientId
// 4. Retorna dados isolados
```

#### 3. Guards

```typescript
// Rota que precisa de autenticação
@UseGuards(JwtAuthGuard)
@Get('produtos')
async listarProdutos(@ClientId() clientId: string) {
  // clientId já validado e extraído
  // Aplicar filtro por clientId
}
```

### Estratégias JWT

#### **JwtStrategy** (Admin)
```typescript
// Valida: { sub, email, role }
// Usado para: /admin/*
```

#### **JwtSaasStrategy** (Empresa SaaS)
```typescript
// Valida: { sub, email, clientId, role }
// Usado para: /saas/*
```

---

## 🛣️ Rotas da API

### Autenticação

```
POST   /auth/login                # Login de admin
POST   /auth/saas-login          # Login de empresa SaaS
GET    /auth/admins               # Listar admins
POST   /auth/recreate-super-admin # Recriar Super Admin (emergência)
```

### Produtos SaaS

```
GET    /products                   # Listar produtos
POST   /products                   # Criar produto
GET    /products/:id               # Detalhes do produto
PUT    /products/:id               # Atualizar produto
DELETE /products/:id               # Deletar produto
```

### Categorias

```
GET    /products/categories         # Listar categorias
POST   /products/categories         # Criar categoria
```

### Empresas SaaS

```
GET    /products/saas-companies    # Listar empresas
POST   /products/saas-companies     # Criar empresa
```

---

## 🔑 Variáveis de Ambiente

### Obrigatórias

```env
# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portalsaas

# JWT
JWT_SECRET=sua-chave-secreta-muito-segura

# Super Admin
SUPER_ADMIN_EMAIL=admin@exemplo.com
SUPER_ADMIN_PASSWORD=SenhaSegura123!
SUPER_ADMIN_NAME=Super Administrador
```

### Opcionais (com padrões)

```env
# Servidor
PORT=3000
NODE_ENV=development

# CORS
CLIENT_URL=https://portalsaasbrasil.vercel.app
BACKEND_URL=https://seu-backend.onrender.com

# Email (opcional)
BREVO_API_KEY=sua-api-key
SMTP_HOST=smtp.brevo.com
SMTP_PORT=587
FROM_EMAIL=noreply@exemplo.com
FROM_NAME=Portal SaaS Brasil
```

---

## 🔄 Como Restaurar o Projeto

### Cenário 1: Clone Fresco

```bash
# 1. Clone
git clone https://github.com/marceloayubbueno/portalsaasbrasil.git
cd portalsaasbrasil/server

# 2. Instale dependências
npm install

# 3. Configure .env
cp ENV.EXAMPLE .env
# Edite .env com suas configurações

# 4. Build
npm run build

# 5. Inicie
npm run start
```

### Cenário 2: Backup Existente

```bash
# 1. Restaure backup do MongoDB
mongorestore --uri="mongodb://localhost:27017" /caminho/backup

# 2. Configure .env com dados corretos

# 3. Build e inicia
npm run build
npm run start
```

### Cenário 3: Restaurar Apenas Código

```bash
# 1. Re-clone ou pull
git pull origin main

# 2. Reinstale dependências (caso mudou)
npm install

# 3. Limpe e rebuild
rm -rf dist node_modules
npm install
npm run build
npm run start
```

### Seed do Super Admin

O Super Admin é criado automaticamente ao iniciar o servidor:

```typescript
// server/src/main.ts (linha 49-56)
// Executa seed automático na inicialização
```

Se precisar recriar manualmente:

```bash
# Opção 1: Via endpoint (precisa estar rodando)
POST /auth/recreate-super-admin
Body: { "confirmacao": "RECRIAR_SUPER_ADMIN_CONFIRMO" }

# Opção 2: Reiniciar o servidor
# O seed executa automaticamente
```

---

## 🐛 Troubleshooting

### Erro: Cannot find module '/opt/render/project/src/server/dist/src/main.js'

**Causa**: `tsconfig.json` sem `rootDir` definido.

**Solução**: Adicione `"rootDir": "./src"` no `tsconfig.json`:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

E ajuste scripts no `package.json`:
```json
{
  "scripts": {
    "start": "node dist/main.js",
    "start:prod": "node dist/main.js"
  }
}
```

---

### Erro: Cannot connect to MongoDB

**Causa**: `MONGODB_URI` incorreta ou banco inacessível.

**Solução**:
```bash
# 1. Verifique MONGODB_URI no .env
# 2. Teste conexão:
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/"

# 3. Verifique firewall/whitelist (Atlas)
# 4. Use IP 0.0.0.0/0 para desenvolvimento
```

---

### Erro: JWT_SECRET não definido

**Causa**: Variável de ambiente faltando.

**Solução**:
```env
# .env ou Render Dashboard
JWT_SECRET=sua-chave-muito-segura-aqui-123456789
```

---

### Erro: CORS bloqueado

**Solução**: Adicione o domínio no `main.ts`:

```typescript
app.enableCors({
  origin: [
    'https://portalsaasbrasil.vercel.app',
    'http://localhost:3000',
    'http://seu-dominio.com'  // ← Adicione aqui
  ],
  credentials: true,
});
```

---

### Super Admin não criado automaticamente

**Causa**: Variáveis do Super Admin faltando.

**Solução**:
```env
# .env ou Render
SUPER_ADMIN_EMAIL=admin@exemplo.com
SUPER_ADMIN_PASSWORD=SenhaSegura123!
SUPER_ADMIN_NAME=Super Admin
```

---

### Build falha no Render

**Verificar**:
1. ✅ `rootDir` definido no `tsconfig.json`
2. ✅ Scripts corretos no `package.json`
3. ✅ Variáveis de ambiente configuradas
4. ✅ MongoDB acessível
5. ✅ Node.js 18.x no `engines` do `package.json`

---

## 🚀 Deploy e Build

### Build Local

```bash
# Compilar TypeScript
npm run build

# Verificar output
ls dist/

# Verificar main.js
node dist/main.js
```

### Estrutura de Build

```
server/
├── src/              # Código fonte (TypeScript)
│   ├── main.ts
│   ├── admins/
│   └── ...
├── dist/             # Código compilado (JavaScript)
│   ├── main.js       # ← Entrada principal
│   ├── admins/
│   └── ...
└── package.json
```

### Configuração do Build (tsconfig.json)

```json
{
  "compilerOptions": {
    "rootDir": "./src",      // ← Define raiz como src/
    "outDir": "./dist",      // ← Output para dist/
    "target": "ES2023",
    "module": "commonjs"
  },
  "include": ["src/**/*"]   // ← Apenas arquivos de src/
}
```

### O que o Build Faz

```
1. tsconfig.json lê configurações
2. rootDir define: código fonte está em src/
3. outDir define: output vai para dist/
4. TypeScript compila:
   src/main.ts → dist/main.js
   src/admins/ → dist/admins/
5. Mantém estrutura de pastas
```

### Deploy no Render

1. **Push para GitHub**
   ```bash
   git add .
   git commit -m "fix: configuração de build"
   git push origin main
   ```

2. **Render detecta push**
   - Trigger automático
   - Executa `npm install`
   - Executa `npm run build`
   - Executa `npm run start:prod`

3. **Verificar logs**
   - Dashboard → Logs
   - Procurar por `🚀 Backend rodando na porta`

---

## 📊 Monitoramento

### Logs Importantes

```bash
# Inicialização
[BOOT] 🚀 Backend rodando na porta 3000
[BOOT] 🔐 AUTO-SEED: Super Admin criado
[BOOT] 🌐 CORS configurado

# Autenticação
[GLOBAL ERROR] Token inválido
[JwtAuthGuard] Cliente autenticado: client-123

# Erros
[GLOBAL ERROR] { timestamp, path, method, status, message }
```

### Health Check

```bash
# Endpoint: qualquer rota
GET https://seu-backend.onrender.com

# Ou:
GET https://seu-backend.onrender.com/products
```

---

## 🔗 Links Importantes

- **Repositório**: https://github.com/marceloayubbueno/portalsaasbrasil
- **Render Dashboard**: https://dashboard.render.com
- **MongoDB Atlas**: https://cloud.mongodb.com
- **NestJS Docs**: https://docs.nestjs.com

---

## 📝 Notas Finais

### Boas Práticas

✅ **Nunca commitar** `.env` no Git  
✅ **Sempre validar** dados com class-validator  
✅ **Usar guards** em todas as rotas protegidas  
✅ **Logar erros** com contexto completo  
✅ **Isolar dados** por clientId automaticamente  
✅ **Seed automático** de Super Admin  

### Segurança

🔒 Tokens JWT com expiração (1d)  
🔒 Hash de senhas com bcryptjs  
🔒 Isolamento por clientId obrigatório  
🔒 Validação de dados em todas as rotas  
🔒 CORS configurado para domínios específicos  

### Manutenção

🔄 Build com `rootDir` para estrutura correta  
🔄 Logs detalhados para debugging  
🔄 Seed automático sempre que necessário  
🔄 Versionamento claro via Git  

---

**Última atualização**: Janeiro 2025  
**Versão Backend**: 1.0.0  
**Node.js**: 18.x  
**NestJS**: 11.1.0  

