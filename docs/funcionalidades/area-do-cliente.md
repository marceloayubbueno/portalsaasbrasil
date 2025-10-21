# 🏢 ÁREA DO SAAS - AUTOGESTÃO

## 📋 VISÃO GERAL

Sistema de autogestão onde empresas SAAS podem cadastrar-se, gerenciar seus dados e alternar entre estratégias (Lead Generation ↔ Investment Seeking) sem depender do administrador.

---

## 🎯 OBJETIVO

Permitir que empresas SAAS:
1. **Cadastrem-se sozinhas** no portal (formulário público)
2. **Acessem área exclusiva** imediatamente após cadastro
3. **Editem dados livremente** (mesmo formulário do admin)
4. **Aguardem aprovação** do admin para ficarem públicas
5. **Gerenciem estratégia** (lead/investment) quando quiserem

---

## 🔄 FLUXO COMPLETO

```
┌─────────────────────────────────────────────────────────────┐
│ 1. CADASTRO PÚBLICO (Formulário na Landing Page)           │
│    - Nome da empresa                                        │
│    - Email                                                  │
│    - Telefone                                               │
│    - Website                                                │
│    - Categoria                                              │
│    - Senha                                                  │
│    ✅ Cadastra e JÁ ENTRA na área do SAAS                  │
└─────────────────────────────────────────────────────────────┘
                          ↓
              Status: "pendente"
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. ÁREA DO SAAS (Dashboard Simples)                        │
│    - Completar dados do perfil (formulário completo)       │
│    - Escolher estratégia (Lead/Investment/Ambos)           │
│    - Preview do perfil público                             │
│    - Aguarda aprovação do admin                            │
│    Status: "pendente" → Badge "Aguardando Aprovação"       │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. ADMIN APROVA/REJEITA                                     │
│    - Admin vê lista de SAAS pendentes                       │
│    - Aprova → Status muda para "ativo"                      │
│    - Rejeita → Status muda para "inativo"                   │
└─────────────────────────────────────────────────────────────┘
                          ↓
              Status: "ativo"
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. SAAS PUBLICADO                                           │
│    - Aparece na homepage do portal                          │
│    - SAAS pode editar dados quando quiser                   │
│    - SAAS pode mudar estratégia (lead ↔ investment)         │
│    - Dados sempre atualizados                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏗️ ESTRUTURA DE ARQUIVOS

### **Frontend (Reaproveitar ao Máximo):**

```
portalsaas/src/app/
├── (public)/
│   └── saas/
│       ├── cadastro/
│       │   └── page.tsx           # ✨ NOVO - Formulário público simples
│       └── login/
│           └── page.tsx           # ✨ NOVO - Login do SAAS
│
├── saas/                          # ✨ NOVA PASTA - Área protegida do SAAS
│   ├── dashboard/
│   │   └── page.tsx               # ✨ NOVO - Dashboard simples
│   └── perfil/
│       └── page.tsx               # ♻️ REAPROVEITAR - Copiar de /admin/saas/edit/[id]/page.tsx
│
└── admin/
    └── saas/
        ├── page.tsx               # ✅ JÁ EXISTE - Adicionar tab "Pendentes"
        ├── new/                   # ✅ JÁ EXISTE
        └── edit/                  # ✅ JÁ EXISTE
```

### **Backend (Reaproveitar Sistema Existente):**

```
server/src/
├── products/
│   ├── saas-companies.controller.ts  # ✅ JÁ EXISTE - Adicionar endpoint /me
│   ├── saas-companies.service.ts     # ✅ JÁ EXISTE - Adicionar findByEmail
│   └── entities/
│       └── product.schema.ts         # ✅ JÁ EXISTE (SaasCompany)
│
└── auth/
    ├── auth.controller.ts            # ✅ JÁ EXISTE - Adicionar saas-login
    ├── auth.service.ts               # ✅ JÁ EXISTE - Adicionar loginSaas
    └── strategies/
        └── jwt-saas.strategy.ts      # ✨ NOVO - Copiar de jwt-client.strategy.ts
```

---

## 🔐 SISTEMA JWT MULTICLIENTE (REAPROVEITAR)

### **Já temos 3 estratégias JWT:**
1. ✅ `JwtStrategy` - Para admins
2. ✅ `JwtClientStrategy` - Para clientes
3. ✅ `JwtIndicatorStrategy` - Para indicadores

### **Adicionar 4ª estratégia:**
4. ✨ `JwtSaasStrategy` - Para empresas SAAS (copiar de JwtClientStrategy)

### **Token JWT do SAAS:**
```typescript
{
  sub: saasCompanyId,           // ID da empresa SAAS
  email: "contato@empresa.com", // Email da empresa
  role: "saas",                 // Role específico
  companySlug: "empresa-slug"   // Slug para URLs
}
```

---

## 📦 SCHEMA DO BANCO (JÁ EXISTE - ADICIONAR CAMPOS)

### **Coleção:** `saascompanies` (já existe)

### **Campos a adicionar:**
```typescript
{
  // ... todos os campos já existentes ...
  
  // NOVOS CAMPOS PARA AUTENTICAÇÃO:
  password: string,              // Hash bcrypt da senha
  passwordResetToken?: string,   // Token de recuperação de senha
  passwordResetExpires?: Date,   // Expiração do token
  lastLogin?: Date,              // Último acesso
  
  // Status já existe: 'ativo' | 'inativo' | 'pendente'
}
```

---

## 🔌 NOVOS ENDPOINTS (BACKEND)

### **1. Cadastro Público de SAAS:**
```http
POST /saas-companies/register
Content-Type: application/json

Body:
{
  "name": "Nome da Empresa",
  "email": "contato@empresa.com",
  "phone": "+55 (11) 99999-9999",
  "website": "https://empresa.com",
  "category": "Marketing",
  "password": "senha123"
}

Response:
{
  "saasCompany": { ... },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Cadastro realizado! Complete seu perfil."
}
```

### **2. Login de SAAS:**
```http
POST /auth/saas-login
Content-Type: application/json

Body:
{
  "email": "contato@empresa.com",
  "password": "senha123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "saasCompany": {
    "id": "...",
    "name": "Empresa",
    "slug": "empresa",
    "email": "contato@empresa.com",
    "status": "pendente"
  }
}
```

### **3. Obter Dados do SAAS Logado:**
```http
GET /saas-companies/me
Authorization: Bearer <token>

Response:
{
  "_id": "...",
  "name": "Empresa",
  "slug": "empresa",
  "email": "contato@empresa.com",
  "status": "pendente",
  // ... todos os campos
}
```

### **4. Atualizar Próprio Perfil:**
```http
PUT /saas-companies/me
Authorization: Bearer <token>
Content-Type: application/json

Body: { ... dados atualizados ... }

Response: { ... empresa atualizada ... }
```

---

## 🎨 PÁGINAS A CRIAR

### **1. `/saas/cadastro` - Cadastro Público** ✨ NOVA

**Componentes:**
- Formulário simples (6 campos básicos)
- Validação inline
- Botão "Cadastrar e Acessar"
- Após cadastro → Login automático → Redireciona para dashboard

**Campos:**
- Nome da empresa *
- Email *
- Telefone *
- Website *
- Categoria *
- Senha *

---

### **2. `/saas/login` - Login do SAAS** ✨ NOVA

**Componentes:**
- Formulário de login (email + senha)
- Link "Esqueci minha senha"
- Link "Ainda não tem conta? Cadastre-se"
- Após login → Redireciona para dashboard

---

### **3. `/saas/dashboard` - Dashboard do SAAS** ✨ NOVA

**Layout:**
```
┌─────────────────────────────────────────────┐
│ 🏢 Bem-vindo, [Nome da Empresa]             │
├─────────────────────────────────────────────┤
│                                             │
│  Status: [Badge: Pendente/Ativo/Inativo]   │
│                                             │
│  ⚠️ Seu perfil está aguardando aprovação   │
│     Complete seus dados para acelerar!     │
│                                             │
│  [Completar Meu Perfil]                    │
│  [Preview do Perfil Público]               │
│                                             │
└─────────────────────────────────────────────┘
```

**Componentes:**
- Header com nome da empresa
- Badge de status (pendente/ativo)
- Card com ações:
  - ✏️ Completar/Editar Perfil
  - 👁️ Preview do perfil público
  - 📊 Métricas (futuro)

---

### **4. `/saas/perfil` - Editar Perfil** ♻️ REAPROVEITAR

**COPIAR DE:** `/admin/saas/edit/[id]/page.tsx`

**Ajustes necessários:**
- Trocar endpoint de `PUT /saas-companies/:id` para `PUT /saas-companies/me`
- Usar token JWT ao invés de passar ID
- Mesmos 5 steps do formulário admin
- Mesmos campos
- Mesma validação

---

## 🔧 IMPLEMENTAÇÃO TÉCNICA

### **FASE 1: Backend (2-3h)**

#### **1.1. Adicionar campos ao Schema:**
```typescript
// server/src/products/entities/product.schema.ts
@Prop({ required: false, select: false }) // select: false = não retorna por padrão
password?: string;

@Prop({ required: false })
passwordResetToken?: string;

@Prop({ required: false })
passwordResetExpires?: Date;

@Prop({ required: false })
lastLogin?: Date;
```

#### **1.2. Criar JWT Strategy para SAAS:**
```typescript
// server/src/auth/strategies/jwt-saas.strategy.ts
// COPIAR DE: jwt-client.strategy.ts
// AJUSTAR: Model para SaasCompany
```

#### **1.3. Adicionar endpoints em AuthController:**
```typescript
// server/src/auth/auth.controller.ts
@Post('saas-login')
async saasLogin(@Body() loginDto: LoginDto) { ... }
```

#### **1.4. Adicionar métodos em SaasCompaniesController:**
```typescript
// server/src/products/saas-companies.controller.ts
@Post('register')
async register(@Body() registerDto) { ... }

@Get('me')
@UseGuards(JwtSaasAuthGuard)
async getProfile(@CurrentSaas() saas) { ... }

@Put('me')
@UseGuards(JwtSaasAuthGuard)
async updateProfile(@CurrentSaas() saas, @Body() updateDto) { ... }
```

---

### **FASE 2: Frontend (3-4h)**

#### **2.1. Criar página de cadastro:**
```typescript
// portalsaas/src/app/(public)/saas/cadastro/page.tsx
// Formulário simples com 6 campos
// POST /saas-companies/register
// Login automático após cadastro
```

#### **2.2. Criar página de login:**
```typescript
// portalsaas/src/app/(public)/saas/login/page.tsx
// POST /auth/saas-login
// Salvar token no localStorage
// Redirecionar para /saas/dashboard
```

#### **2.3. Criar dashboard do SAAS:**
```typescript
// portalsaas/src/app/saas/dashboard/page.tsx
// Layout simples com status e ações
// GET /saas-companies/me (verificar status)
```

#### **2.4. Reaproveitar formulário de edição:**
```typescript
// portalsaas/src/app/saas/perfil/page.tsx
// COPIAR de: /admin/saas/edit/[id]/page.tsx
// AJUSTAR:
// - Trocar URL de PUT /saas-companies/:id
// - Para: PUT /saas-companies/me
// - Usar token JWT do SAAS
```

---

### **FASE 3: Admin (1h)**

#### **3.1. Adicionar tab "Pendentes" na listagem:**
```typescript
// portalsaas/src/app/admin/saas/page.tsx
// Filtrar por status === 'pendente'
// Botões: Aprovar / Rejeitar
```

#### **3.2. Endpoints de aprovação:**
```typescript
// server/src/products/saas-companies.controller.ts
@Put(':id/approve')
@UseGuards(JwtAuthGuard) // Só admin
async approve(@Param('id') id: string) {
  return this.service.updateStatus(id, 'ativo');
}

@Put(':id/reject')
@UseGuards(JwtAuthGuard) // Só admin
async reject(@Param('id') id: string) {
  return this.service.updateStatus(id, 'inativo');
}
```

---

## 🎯 REAPROVEITAMENTO MÁXIMO

### **✅ O que JÁ EXISTE e vamos REAPROVEITAR:**

1. ✅ **Schema `SaasCompany`** (apenas adicionar `password`)
2. ✅ **Formulário completo** (`/admin/saas/edit/[id]/page.tsx`)
3. ✅ **Sistema JWT Multicliente** (adicionar 4ª estratégia)
4. ✅ **Controller e Service** (adicionar endpoints `/me`, `/register`)
5. ✅ **Validações** (DTOs já existem)

### **✨ O que vamos CRIAR (mínimo necessário):**

1. ✨ Página de cadastro público (formulário simples)
2. ✨ Página de login do SAAS
3. ✨ Dashboard do SAAS (simples)
4. ✨ JWT Strategy para SAAS (copiar de Client)
5. ✨ Endpoints: `/register`, `/saas-login`, `/me`
6. ✨ Tab "Pendentes" no admin

---

## 🚨 ZERO BUGS - CHECKLIST

### **Antes de Implementar:**
- [ ] Backup do banco de dados
- [ ] Branch separada no Git
- [ ] Documentar mudanças

### **Durante Implementação:**
- [ ] Testar cada endpoint individualmente
- [ ] Validar JWT em todas as rotas protegidas
- [ ] Verificar isolamento de dados (SAAS só vê seus dados)
- [ ] Testar fluxo completo (cadastro → login → editar)

### **Após Implementação:**
- [ ] Testar cadastro de novo SAAS
- [ ] Testar login de SAAS existente
- [ ] Testar edição de perfil
- [ ] Testar aprovação pelo admin
- [ ] Verificar que SAAS não acessa dados de outros SAAS
- [ ] Verificar que admin ainda consegue editar qualquer SAAS

---

## 📊 ESTIMATIVA DE TEMPO

| Fase | Tarefa | Tempo |
|------|--------|-------|
| **Backend** | Adicionar campos ao schema | 30min |
| | Criar JWT Strategy SAAS | 30min |
| | Adicionar endpoints auth | 1h |
| | Adicionar endpoints profile | 1h |
| **Frontend** | Página cadastro | 1h |
| | Página login | 1h |
| | Dashboard SAAS | 1h |
| | Reaproveitar formulário | 1h |
| **Admin** | Tab pendentes | 30min |
| | Botões aprovar/rejeitar | 30min |
| **Testes** | Teste completo | 1h |
| **TOTAL** | | **8-9h** |

---

## 🎉 RESULTADO FINAL

### **Para o SAAS:**
- ✅ Cadastro rápido e simples
- ✅ Acesso imediato à área exclusiva
- ✅ Edição livre de dados
- ✅ Mudança de estratégia quando quiser
- ✅ Sem depender do admin para mudanças

### **Para o Portal:**
- ✅ Escalabilidade (centenas de SAAS)
- ✅ Dados sempre atualizados
- ✅ Controle de qualidade (aprovação)
- ✅ Zero trabalho manual após aprovação

### **Sistema:**
- ✅ Seguro (JWT + isolamento)
- ✅ Escalável (reaproveita estrutura)
- ✅ Manutenível (código limpo)
- ✅ Testável (fluxos isolados)

---

## ❓ PRÓXIMO PASSO

**Posso começar a implementação?**

**Ordem AJUSTADA (começando pelo Frontend):**
1. ✅ **Frontend MVP** (cadastro → login → dashboard → perfil)
2. Backend (JWT + endpoints + integração)
3. Admin (tab pendentes)
4. Testes completos

---

## 🎯 FASE 1: FRONTEND MVP (COMEÇAR AQUI)

### **📁 ARQUIVOS A CRIAR:**

#### **1. `/portalsaas/src/app/(public)/saas/cadastro/page.tsx`**
**O que faz:**
- Formulário público de cadastro (6 campos)
- Validação básica
- Por enquanto: apenas layout e validação (sem integração)

**Campos:**
- Nome da empresa *
- Email *
- Telefone
- Website *
- Categoria *
- Senha * (com confirmação)

---

#### **2. `/portalsaas/src/app/(public)/saas/login/page.tsx`**
**O que faz:**
- Formulário de login (email + senha)
- Link para cadastro
- Link "Esqueci minha senha"
- Por enquanto: apenas layout (sem integração)

---

#### **3. `/portalsaas/src/app/saas/dashboard/page.tsx`**
**O que faz:**
- Dashboard simples do SAAS
- Mostra status (pendente/ativo)
- Botões: "Completar Perfil", "Preview"
- Por enquanto: mock data

**Layout:**
```
┌─────────────────────────────────────────┐
│ 🏢 Bem-vindo, [Nome da Empresa]         │
│ Status: [Badge Pendente/Ativo]         │
│                                         │
│ [Completar Meu Perfil] [Preview]       │
└─────────────────────────────────────────┘
```

---

#### **4. `/portalsaas/src/app/saas/perfil/page.tsx`**
**O que faz:**
- **COPIAR 100%** de `/admin/saas/edit/[id]/page.tsx`
- **AJUSTAR:**
  - Remover `useParams()` (não precisa de ID)
  - Trocar `GET /saas-companies/:id` por `GET /saas-companies/me` (mock)
  - Trocar `PUT /saas-companies/:id` por `PUT /saas-companies/me` (mock)
  - Usar token JWT (por enquanto mock)

---

#### **5. `/portalsaas/src/app/saas/layout.tsx`**
**O que faz:**
- Layout da área do SAAS (menu lateral simples)
- Header com nome da empresa
- Menu: Dashboard | Meu Perfil | Sair

---

### **📁 ARQUIVOS A MODIFICAR:**

#### **NENHUM!** ✅
- Não vamos modificar nada que já existe
- Apenas criar arquivos novos
- Zero risco de quebrar o existente

---

### **🎨 ESTRUTURA FINAL (FASE 1):**

```
portalsaas/src/app/
├── (public)/
│   └── saas/
│       ├── cadastro/
│       │   └── page.tsx          ✨ CRIAR (210 linhas aprox.)
│       └── login/
│           └── page.tsx          ✨ CRIAR (150 linhas aprox.)
│
└── saas/                         ✨ CRIAR PASTA
    ├── layout.tsx                ✨ CRIAR (100 linhas aprox.)
    ├── dashboard/
    │   └── page.tsx              ✨ CRIAR (180 linhas aprox.)
    └── perfil/
        └── page.tsx              ✨ CRIAR (1020 linhas - COPIAR de /admin/saas/edit/[id]/page.tsx)
```

---

### **📊 DETALHAMENTO DA FASE 1:**

| Arquivo | Ação | Linhas | Base | Observação |
|---------|------|--------|------|------------|
| `saas/cadastro/page.tsx` | Criar | ~210 | Do zero | Formulário simples |
| `saas/login/page.tsx` | Criar | ~150 | Do zero | Form login |
| `saas/layout.tsx` | Criar | ~100 | Copiar `/admin/layout.tsx` | Simplificar menu |
| `saas/dashboard/page.tsx` | Criar | ~180 | Do zero | Dashboard simples |
| `saas/perfil/page.tsx` | Criar | ~1020 | Copiar `/admin/saas/edit/[id]/page.tsx` | 95% igual |

**Total:** ~1660 linhas (mas ~1020 são cópia)

---

### **🔄 ORDEM DE CRIAÇÃO:**

```
1. saas/layout.tsx              (base para tudo)
2. saas/dashboard/page.tsx      (página inicial)
3. saas/perfil/page.tsx         (copiar e ajustar)
4. (public)/saas/cadastro/page.tsx
5. (public)/saas/login/page.tsx
```

---

### **✅ MOCK DATA (Fase 1):**

Por enquanto, vamos usar dados mockados:

```typescript
// Mock do SAAS logado (por enquanto)
const mockSaas = {
  _id: "mock-id-123",
  name: "Empresa Exemplo",
  email: "contato@empresa.com",
  status: "pendente",
  slug: "empresa-exemplo"
}

// Formulários funcionam com validação
// Mas não salvam no backend ainda
// Apenas console.log dos dados
```

---

### **🎯 RESULTADO DA FASE 1:**

Ao final, teremos:
- ✅ Cadastro funcionando (UI/validação)
- ✅ Login funcionando (UI/validação)
- ✅ Dashboard funcionando (mock data)
- ✅ Formulário de perfil completo (100% funcional visualmente)
- ✅ Navegação entre páginas
- ✅ Layout bonito e responsivo

**Faltará:**
- ❌ Integração com backend (Fase 2)
- ❌ JWT real (Fase 2)
- ❌ Salvamento de dados (Fase 2)

---

### **🎨 DESIGN PATTERN:**

Seguir **exatamente** o padrão do `/admin`:
- ✅ Mesmas cores (azul/cyan)
- ✅ Mesmo estilo de cards
- ✅ Mesmos botões
- ✅ Mesmo layout
- ✅ Mesma responsividade

Apenas **simplificar**:
- Menu com menos opções (Dashboard, Perfil, Sair)
- Sem estatísticas complexas
- Foco na edição de dados

---

### **📋 CHECKLIST ANTES DE COMEÇAR:**

- [ ] Entendeu que vamos criar 5 arquivos novos?
- [ ] Entendeu que NÃO vamos modificar nada existente?
- [ ] Entendeu que Fase 1 é só frontend (mock)?
- [ ] Entendeu que vou copiar `/admin/saas/edit/[id]/page.tsx` para `/saas/perfil/page.tsx`?
- [ ] Entendeu que vou seguir o design pattern do admin?

---

## ❓ AUTORIZAÇÃO PARA COMEÇAR

**Posso começar a criar estes 5 arquivos?**

**Ordem:**
1. `saas/layout.tsx` (base)
2. `saas/dashboard/page.tsx` (home)
3. `saas/perfil/page.tsx` (copiar e ajustar)
4. `(public)/saas/cadastro/page.tsx` (formulário)
5. `(public)/saas/login/page.tsx` (form login)

**Confirma para eu começar a criar?** 🚀

**Tempo estimado:** 2-3 horas
**Resultado:** Frontend 100% funcional (visualmente) com mock data

