# 📡 API REFERENCE - Portal SAAS

> **Base URL Local:** `http://localhost:3001`  
> **Base URL Produção:** `https://[render-url].onrender.com`  
> **Última atualização:** Janeiro 2025

---

## 🔐 AUTENTICAÇÃO

### Headers Necessários

```typescript
// Para rotas protegidas (SAAS/Admin)
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

### Tipos de Autenticação
- **Admin:** `JwtAdminAuthGuard` - Gerencia todo o portal
- **SAAS:** `JwtSaasAuthGuard` - Gerencia próprio perfil
- **Public:** Sem autenticação

---

## 📦 SAAS COMPANIES

### GET /saas-companies
Lista todas as empresas SAAS (ativas + pendentes)

**Autenticação:** ❌ Não requer  
**Usado em:** Home Page, Catálogo SAAS

#### Request
```typescript
GET /saas-companies?page=1&limit=10
```

#### Query Parameters
| Parâmetro | Tipo | Default | Descrição |
|-----------|------|---------|-----------|
| `page` | number | 1 | Página atual |
| `limit` | number | 10 | Itens por página |

#### Response
```typescript
{
  "companies": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Empresa SAAS",
      "slug": "empresa-saas",
      "description": "Descrição da empresa",
      "category": "Marketing",
      "status": "ativo",
      "focusType": "lead-generation",
      "website": "https://exemplo.com",
      "logo": "https://...",
      "rating": 4.5,
      "reviewCount": 10,
      "views": 150,
      "featured": false,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-15T00:00:00.000Z"
    }
  ],
  "total": 100,
  "page": 1,
  "totalPages": 10
}
```

#### Filtros a Aplicar (Frontend)
```typescript
// Exemplo: Catálogo SAAS
const leadGenCompanies = data.companies.filter(s => 
  s.status === 'ativo' && 
  (s.focusType === 'lead-generation' || s.focusType === 'both')
)
```

---

### GET /saas-companies/:id
Busca empresa SAAS por ID

**Autenticação:** ❌ Não requer

#### Request
```typescript
GET /saas-companies/507f1f77bcf86cd799439011
```

#### Response
```typescript
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Empresa SAAS",
  "slug": "empresa-saas",
  // ... todos os campos do schema
}
```

#### Erros
- `404` - Empresa não encontrada

---

### GET /saas-companies/slug/:slug
Busca empresa SAAS por slug (URL amigável)

**Autenticação:** ❌ Não requer  
**Usado em:** Página Dedicada SAAS

#### Request
```typescript
GET /saas-companies/slug/empresa-saas
```

#### Response
```typescript
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Empresa SAAS",
  "slug": "empresa-saas",
  "description": "Descrição completa",
  "category": "Marketing",
  "status": "ativo",
  "focusType": "both",
  "views": 150,
  "rating": 4.5,
  "reviewCount": 10,
  
  // Informações de contato
  "email": "contato@empresa.com",
  "phone": "+55 11 98765-4321",
  "website": "https://empresa.com",
  "city": "São Paulo",
  "state": "SP",
  "country": "Brasil",
  
  // Redes sociais
  "linkedin": "https://linkedin.com/company/empresa",
  "twitter": "https://twitter.com/empresa",
  "instagram": "https://instagram.com/empresa",
  
  // Lead Generation
  "actionUrl": "https://empresa.com/trial",
  "buttonText": "Começar Grátis",
  "problemsSolved": "Resolve problemas de...",
  "targetAudience": "Startups e PMEs",
  
  // Investment Seeking
  "customerCount": 500,
  "monthlyRevenue": 50000,
  "growthRate": 15,
  "foundedYear": 2020,
  "founders": [
    {
      "id": "1",
      "name": "João Silva",
      "position": "CEO & Founder",
      "linkedin": "https://linkedin.com/in/joao"
    }
  ],
  "competitiveAdvantages": "Diferenciais...",
  
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-15T00:00:00.000Z"
}
```

#### Erros
- `404` - Empresa não encontrada

---

### PUT /saas-companies/slug/:slug/view
Incrementa contador de visualizações

**Autenticação:** ❌ Não requer  
**Usado em:** Página Dedicada SAAS (ao carregar)

#### Request
```typescript
PUT /saas-companies/slug/empresa-saas/view
```

#### Response
```typescript
{
  "_id": "507f1f77bcf86cd799439011",
  "views": 151,  // Incrementado
  // ... outros campos
}
```

---

### GET /saas-companies/featured/leads
Lista SAAS em destaque para geração de leads

**Autenticação:** ❌ Não requer  
**Usado em:** Home Page (SAAS em Destaque)

#### Request
```typescript
GET /saas-companies/featured/leads?limit=12
```

#### Query Parameters
| Parâmetro | Tipo | Default | Descrição |
|-----------|------|---------|-----------|
| `limit` | number | 12 | Máximo de resultados |

#### Response
```typescript
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Empresa SAAS",
    "slug": "empresa-saas",
    "description": "Descrição",
    "focusType": "lead-generation",  // ou "both"
    "status": "ativo",
    "views": 150,
    // ... outros campos
  }
]
```

#### Lógica do Endpoint
- Filtra: `status === 'ativo'`
- Filtra: `focusType in ['lead-generation', 'both']`
- Ordena: `views DESC, createdAt DESC`
- Limita: `limit` (default 12)

---

### GET /saas-companies/featured/investment
Lista SAAS em destaque buscando investimento

**Autenticação:** ❌ Não requer  
**Usado em:** Página de Investimento (futuro)

#### Request
```typescript
GET /saas-companies/featured/investment?limit=12
```

#### Response
```typescript
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Empresa SAAS",
    "focusType": "investment-seeking",  // ou "both"
    "customerCount": 500,
    "monthlyRevenue": 50000,
    "growthRate": 15,
    // ... outros campos
  }
]
```

---

### GET /saas-companies/category/:category
Lista SAAS por categoria

**Autenticação:** ❌ Não requer

#### Request
```typescript
GET /saas-companies/category/Marketing
```

#### Response
```typescript
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Empresa SAAS",
    "category": "Marketing",
    "status": "ativo",
    // ... outros campos
  }
]
```

---

### POST /saas-companies
Cria nova empresa SAAS (Admin)

**Autenticação:** ✅ Admin  
**Usado em:** Admin Panel

#### Request
```typescript
POST /saas-companies
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "name": "Nova Empresa",
  "category": "Marketing",
  "website": "https://empresa.com",
  "description": "Descrição",
  "status": "ativo",
  "focusType": "lead-generation",
  // ... outros campos opcionais
}
```

#### Response
```typescript
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Nova Empresa",
  "slug": "nova-empresa",  // Gerado automaticamente
  // ... todos os campos
}
```

---

### PUT /saas-companies/:id
Atualiza empresa SAAS (Admin)

**Autenticação:** ✅ Admin

#### Request
```typescript
PUT /saas-companies/507f1f77bcf86cd799439011
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "status": "ativo",
  "featured": true,
  // ... campos a atualizar
}
```

#### Response
```typescript
{
  "_id": "507f1f77bcf86cd799439011",
  "status": "ativo",
  "featured": true,
  // ... todos os campos atualizados
}
```

---

### DELETE /saas-companies/:id
Remove empresa SAAS (Admin)

**Autenticação:** ✅ Admin

#### Request
```typescript
DELETE /saas-companies/507f1f77bcf86cd799439011
Authorization: Bearer {admin_token}
```

#### Response
```typescript
// 204 No Content
```

---

### POST /saas-companies/register
Registro público de SAAS (Auto-cadastro)

**Autenticação:** ❌ Não requer  
**Usado em:** Formulário de Cadastro SAAS

#### Request
```typescript
POST /saas-companies/register
Content-Type: application/json

{
  "name": "Minha Empresa",
  "email": "contato@empresa.com",
  "password": "senha123",
  "phone": "+55 11 98765-4321",
  "website": "https://empresa.com",
  "category": "Marketing"
}
```

#### Response
```typescript
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "saasCompany": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Minha Empresa",
    "slug": "minha-empresa",
    "email": "contato@empresa.com",
    "status": "pendente"  // Aguarda aprovação admin
  },
  "message": "Cadastro realizado! Complete seu perfil."
}
```

#### Lógica
- Senha é hasheada (bcrypt)
- Slug é gerado automaticamente
- Status inicial: `"pendente"`
- Retorna JWT para acesso imediato à área SAAS

---

### GET /saas-companies/me
Busca perfil do SAAS autenticado

**Autenticação:** ✅ SAAS  
**Usado em:** Dashboard SAAS, Edição de Perfil

#### Request
```typescript
GET /saas-companies/me
Authorization: Bearer {saas_token}
```

#### Response
```typescript
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Minha Empresa",
  "slug": "minha-empresa",
  "email": "contato@empresa.com",
  "status": "pendente",
  // ... todos os campos do perfil
}
```

---

### PUT /saas-companies/me
Atualiza perfil do SAAS autenticado

**Autenticação:** ✅ SAAS  
**Usado em:** Edição de Perfil SAAS

#### Request
```typescript
PUT /saas-companies/me
Content-Type: application/json
Authorization: Bearer {saas_token}

{
  "description": "Nova descrição",
  "focusType": "both",
  "problemsSolved": "Resolve...",
  // ... campos a atualizar
}
```

#### Response
```typescript
{
  "_id": "507f1f77bcf86cd799439011",
  "description": "Nova descrição",
  "focusType": "both",
  // ... todos os campos atualizados
}
```

---

## 🗄️ SCHEMA: SaasCompany

### Campos Obrigatórios
```typescript
{
  name: string          // Nome da empresa
  slug: string          // URL amigável (auto-gerado)
  category: string      // Categoria
  website: string       // Website principal
  status: 'ativo' | 'inativo' | 'pendente'
}
```

### Campos Opcionais - Básicos
```typescript
{
  description?: string
  logo?: string
  email?: string
  phone?: string
  password?: string     // Hasheado, select: false
  
  views: number         // Default: 0
  featured: boolean     // Default: false
  rating: number        // Default: 0
  reviewCount: number   // Default: 0
  tags: string[]        // Default: []
}
```

### Campos Opcionais - Contato
```typescript
{
  address?: string
  city?: string
  state?: string
  country?: string
  whatsapp?: string
}
```

### Campos Opcionais - Redes Sociais
```typescript
{
  linkedin?: string
  twitter?: string
  instagram?: string
  facebook?: string
}
```

### Campos Opcionais - Estratégia
```typescript
{
  focusType?: 'lead-generation' | 'investment-seeking' | 'both'
}
```

### Campos Opcionais - Lead Generation
```typescript
{
  actionType?: string
  actionUrl?: string
  buttonText?: string
  problemsSolved?: string
  targetAudience?: string
}
```

### Campos Opcionais - Investment Seeking
```typescript
{
  customerCount?: number       // Default: 0
  monthlyRevenue?: number      // Default: 0
  growthRate?: number          // Default: 0
  churnRate?: number           // Default: 0
  foundedYear?: number         // Default: 0
  employeeCount?: number       // Default: 0
  headquarters?: string
  stage?: string
  
  founders: Array<{
    id: string
    name: string
    position: string
    linkedin?: string
  }>
  
  competitiveAdvantages?: string
  successCases?: string
  integrations?: string
}
```

### Campos Automáticos
```typescript
{
  createdAt: Date       // Auto
  updatedAt: Date       // Auto
  lastLogin?: Date      // Auto
}
```

---

## 🔗 RELACIONAMENTOS

### SaasCompany ↔ Auth
- Cada SAAS tem email + password para login
- JWT contém: `{ sub: saasId, email, role: 'saas', slug }`

---

## 📊 ÍNDICES MongoDB

```typescript
// Único
{ slug: 1 }

// Text Search
{ name: 'text', description: 'text', category: 'text' }
```

---

## 🚨 CÓDIGOS DE ERRO

| Código | Descrição | Solução |
|--------|-----------|---------|
| 404 | Empresa não encontrada | Verificar ID/slug |
| 401 | Não autenticado | Enviar token válido |
| 403 | Sem permissão | Verificar role (admin/saas) |
| 409 | Email já cadastrado | Usar email diferente |
| 500 | Erro interno | Verificar logs do servidor |

---

## 🧪 EXEMPLOS DE USO

### Carregar SAAS em Destaque (Home)
```typescript
const res = await fetch('http://localhost:3001/saas-companies')
const { companies } = await res.json()

const featured = companies
  .filter(s => s.status === 'ativo' && 
          (s.focusType === 'lead-generation' || s.focusType === 'both'))
  .sort((a, b) => b.views - a.views)
  .slice(0, 12)
```

### Carregar Página Dedicada
```typescript
const res = await fetch(`http://localhost:3001/saas-companies/slug/${slug}`)
const company = await res.json()

// Incrementar views
await fetch(`http://localhost:3001/saas-companies/slug/${slug}/view`, {
  method: 'PUT'
})
```

### Atualizar Perfil SAAS
```typescript
const res = await fetch('http://localhost:3001/saas-companies/me', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    description: 'Nova descrição',
    focusType: 'both'
  })
})
```

---

**Última atualização:** Janeiro 2025  
**Versão:** 1.0

