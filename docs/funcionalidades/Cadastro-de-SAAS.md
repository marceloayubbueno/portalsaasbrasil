# Cadastro de Empresas SAAS

## 🎯 Estratégia de Foco Duplo

### **SAAS pode escolher:**
- **Lead Generation** (atrair clientes)
- **Investment Seeking** (atrair investidores)
- **Ambos** (aparece nas duas páginas com dados diferentes)

## 📋 Estrutura de Dados

### **Informações Básicas (obrigatórias)**
- Nome da empresa
- Descrição breve
- Categoria
- Website principal
- Status (ativo/inativo)
- **Tipo de foco:** Lead Generation | Investment Seeking | Ambos

### **Informações de Contato**
- Email de contato
- Telefone
- Endereço (cidade, estado, país)
- LinkedIn da empresa
- Twitter/X da empresa

### **Informações Comerciais (para Lead Generation)**
- **Trial/Teste Gratuito**
  - URL do trial
  - Duração do trial
  - Limitações do trial
  
- **Preços**
  - Plano mais barato (valor)
  - Plano mais caro (valor)
  - Moeda (BRL, USD, EUR)
  - Tipo de cobrança (mensal, anual, por usuário)

- **Problemas que resolve** (lista de tags)
- **Público-alvo** (startups, empresas médias, grandes corporações)
- **Setores atendidos** (saúde, educação, varejo, etc.)

### **Informações para Investidores**
- **Métricas de crescimento**
  - Número de clientes
  - Receita mensal/anual (opcional)
  - Crescimento mensal (%)
  - Churn rate (opcional)
  
- **Informações da empresa**
  - Ano de fundação
  - Número de funcionários
  - Sede (cidade, país)
  - Estágio (idea, MVP, growth, scale)
  - Fundadores (nomes, LinkedIn)

- **Diferenciais competitivos**
- **Cases de sucesso** (breve descrição)
- **Integrações** (Slack, Zapier, etc.)

### **Mídia**
- Logo da empresa
- Screenshots do produto (3-5 imagens)
- Video demo (URL do YouTube/Vimeo)

### **SEO/Meta**
- Meta title
- Meta description
- Tags/palavras-chave
- Slug personalizado

## 🎨 Apresentação por Contexto

### **Página Lead Generation:**
- Foco em problemas resolvidos
- Trial gratuito em destaque
- Preços transparentes
- Call-to-action: "Teste Grátis"
- Cases de sucesso
- Integrações

### **Página Investment Seeking:**
- Métricas de crescimento
- Tração (clientes, receita)
- Equipe e experiência
- Mercado endereçável
- Diferenciação competitiva
- Call-to-action: "Investir" ou "Contatar"

### **Página Ambos:**
- Seção dupla com abas
- Ou cards separados para cada contexto

## 💡 Implementação

### **No cadastro:**
- Radio button: "Lead Generation" | "Investment Seeking" | "Ambos"
- Campos condicionais aparecem conforme seleção
- Preview mostra como ficará em cada contexto

### **No site:**
- `/saas/lead-generation` - página para clientes
- `/saas/investment` - página para investidores
- `/saas/[slug]` - página individual da empresa

## 🔧 Como Funciona o Cadastro

### **Fluxo do Usuário:**
1. Acesso ao painel administrativo
2. Clica em "Nova Empresa SAAS"
3. Preenche informações básicas (obrigatórias)
4. Seleciona tipo de foco (Lead Generation/Investment/Ambos)
5. Campos condicionais aparecem conforme seleção
6. Preview do perfil em tempo real
7. Salva e empresa aparece no site

### **Validações:**
- Campos obrigatórios validados no frontend e backend
- URLs válidas para website, trial, LinkedIn, etc.
- Email válido
- Categoria deve existir na lista predefinida

### **Sistema de Preenchimento Progressivo:**
- Badge "Perfil Completo" quando >80% preenchido
- Incentivos para completar mais informações
- Preview em tempo real do perfil

### **Backend (NestJS):**
- Endpoint: `POST /saas-companies`
- Validação com DTOs
- Slug automático gerado a partir do nome
- Timestamps automáticos (createdAt, updatedAt)

### **Frontend (Next.js):**
- Modal de cadastro no painel admin
- Formulário responsivo com validação
- Preview em tempo real
- Upload de logo (futuro)

### **Banco de Dados:**
- Coleção: `saascompanies`
- Schema: campos condicionais baseados no tipo de foco
- Indexes: slug, nome, categoria, status

## 🚀 Próximos Passos

1. ~~Implementar campos condicionais no formulário~~ ✅ **Concluído**
2. Criar sistema de preview em tempo real
3. Implementar upload de logo
4. Criar páginas públicas (lead-generation, investment)
5. Sistema de busca e filtros
6. Analytics de visualizações

## ✅ Funcionalidades Implementadas

### **Edição de Empresas SAAS** (Implementado em 17/10/2025)

**Arquivos criados/modificados:**
- `portalsaas/src/app/admin/saas/page.tsx` - Botão de edição funcional
- `portalsaas/src/app/admin/saas/edit/[id]/page.tsx` - Página de edição completa

**Funcionalidades:**
- ✅ Botão de edição na listagem
- ✅ Carregamento automático de dados
- ✅ Formulário multi-step (5 etapas)
- ✅ Pré-preenchimento de todos os campos
- ✅ Validação de campos
- ✅ Salvamento via PUT /saas-companies/:id
- ✅ Tratamento de erros
- ✅ Loading states
- ✅ Redirecionamento após sucesso

**Fluxo de Edição:**
```
1. Admin acessa /admin/saas
2. Clica no ícone ✏️ de edição
3. Redireciona para /admin/saas/edit/:id
4. Dados são carregados via GET /saas-companies/:id
5. Formulário é pré-preenchido
6. Admin edita os campos desejados
7. Admin navega pelos 5 steps
8. Admin confirma e clica em "Atualizar Empresa"
9. Dados são enviados via PUT /saas-companies/:id
10. Sucesso: Redireciona para /admin/saas
```

---

# 📚 GUIA TÉCNICO PARA DESENVOLVEDORES

## 🗂️ Estrutura de Arquivos

### **Frontend (Next.js)**
```
portalsaas/src/app/admin/saas/
├── page.tsx                    # Listagem de empresas SAAS
├── new/
│   └── page.tsx               # Cadastro de nova empresa (multi-step)
└── edit/
    └── [id]/
        └── page.tsx           # Edição de empresa (implementado ✅)
```

### **Backend (NestJS)**
```
server/src/products/
├── entities/
│   ├── product.schema.ts      # Schema principal (SaasCompany)
│   └── category.schema.ts     # Schema de categorias
├── saas-companies.controller.ts  # Endpoints REST
├── saas-companies.service.ts     # Lógica de negócio
├── saas-company.dto.ts          # DTOs de validação
└── products.module.ts           # Módulo NestJS
```

---

## 🔌 ENDPOINTS DA API

### **Base URL:** `http://localhost:3001`

### **1. Listar Todas as Empresas**
```http
GET /saas-companies
```

**Response:**
```json
{
  "companies": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Viral Lead",
      "slug": "viral-lead",
      "category": "Marketing",
      "website": "https://virallead.com.br",
      "description": "Plataforma de gestão de indicações...",
      "status": "ativo",
      "views": 0,
      "focusType": "lead",
      "email": "contato@virallead.com.br",
      "whatsapp": "5511999999999",
      "founders": [
        {
          "id": "1",
          "name": "João Silva",
          "position": "CEO",
          "linkedin": "https://linkedin.com/in/joaosilva"
        }
      ],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### **2. Buscar Uma Empresa por ID**
```http
GET /saas-companies/:id
```

**Parâmetros:**
- `id` (string): MongoDB ObjectId

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Viral Lead",
  "slug": "viral-lead",
  // ... todos os campos
}
```

### **3. Criar Nova Empresa**
```http
POST /saas-companies
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Nome da Empresa",
  "category": "Marketing",
  "website": "https://empresa.com",
  "description": "Descrição da empresa...",
  "focusType": "lead",
  "email": "contato@empresa.com",
  "phone": "+55 (11) 99999-9999",
  "whatsapp": "5511999999999",
  "linkedin": "https://linkedin.com/company/empresa",
  "instagram": "https://instagram.com/empresa",
  "twitter": "https://twitter.com/empresa",
  "facebook": "https://facebook.com/empresa",
  "actionType": "trial",
  "actionUrl": "https://empresa.com/trial",
  "buttonText": "Teste Grátis",
  "problemsSolved": "Problemas que resolve...",
  "targetAudience": "E-commerce, Startups",
  "customerCount": 150,
  "monthlyRevenue": 50000,
  "growthRate": 15,
  "foundedYear": 2020,
  "employeeCount": 10,
  "headquarters": "São Paulo, SP",
  "stage": "growth",
  "founders": [
    {
      "id": "1",
      "name": "João Silva",
      "position": "CEO",
      "linkedin": "https://linkedin.com/in/joaosilva"
    }
  ],
  "competitiveAdvantages": "Diferenciais...",
  "successCases": "Cases de sucesso...",
  "status": "ativo"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "slug": "nome-da-empresa",
  // ... todos os campos enviados
  "views": 0,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### **4. Atualizar Empresa**
```http
PUT /saas-companies/:id
Content-Type: application/json
```

**Parâmetros:**
- `id` (string): MongoDB ObjectId

**Body:** (mesma estrutura do POST, campos opcionais)
```json
{
  "name": "Novo Nome",
  "description": "Nova descrição...",
  "status": "inativo"
}
```

### **5. Deletar Empresa**
```http
DELETE /saas-companies/:id
```

**Parâmetros:**
- `id` (string): MongoDB ObjectId

**Response:**
```json
{
  "message": "Empresa removida com sucesso"
}
```

---

## 🗄️ SCHEMA DO BANCO DE DADOS

### **Coleção:** `saascompanies`

### **Campos Principais:**

```typescript
{
  _id: ObjectId,                    // ID único gerado pelo MongoDB
  name: string,                     // Nome da empresa (obrigatório)
  slug: string,                     // URL-friendly (único, gerado automaticamente)
  description: string,              // Descrição da empresa (obrigatório)
  category: string,                 // Categoria (obrigatório)
  website: string,                  // Site oficial (obrigatório)
  logo?: string,                    // URL do logo (opcional)
  status: 'ativo' | 'inativo',     // Status (default: 'ativo')
  views: number,                    // Contador de visualizações (default: 0)
  featured: boolean,                // Destaque (default: false)
  tags: string[],                   // Tags para busca
  
  // Informações de Contato
  email?: string,
  phone?: string,
  whatsapp?: string,                // Apenas números: 5511999999999
  address?: string,
  city?: string,
  state?: string,
  country?: string,
  
  // Redes Sociais
  linkedin?: string,
  instagram?: string,
  twitter?: string,
  facebook?: string,
  
  // Tipo de Foco
  focusType: 'lead' | 'investment' | 'both',
  
  // Lead Generation (se focusType === 'lead' ou 'both')
  actionType?: string,              // 'trial', 'contact', 'demo', etc.
  actionUrl?: string,               // URL de redirecionamento
  buttonText?: string,              // Texto personalizado do botão
  problemsSolved?: string,          // Problemas que resolve
  targetAudience?: string,          // Nicho de atuação
  
  // Investment Seeking (se focusType === 'investment' ou 'both')
  customerCount?: number,           // Número de clientes
  monthlyRevenue?: number,          // Receita mensal em R$
  growthRate?: number,              // Taxa de crescimento (%)
  churnRate?: number,               // Taxa de churn (%)
  foundedYear?: number,             // Ano de fundação
  employeeCount?: number,           // Número de funcionários
  headquarters?: string,            // Sede da empresa
  stage?: string,                   // 'idea', 'mvp', 'growth', 'scale'
  founders?: Founder[],             // Array de fundadores
  competitiveAdvantages?: string,   // Diferenciais competitivos
  successCases?: string,            // Cases de sucesso
  integrations?: string[],          // Integrações com outras ferramentas
  
  // Timestamps
  createdAt: Date,                  // Data de criação (automático)
  updatedAt: Date                   // Data de atualização (automático)
}

// Sub-schema: Founder
{
  id: string,                       // ID único do fundador
  name: string,                     // Nome completo (obrigatório)
  position: string,                 // Cargo (obrigatório)
  linkedin?: string                 // LinkedIn (opcional)
}
```

### **Indexes:**
```javascript
{
  slug: 1,           // Único, para URLs
  name: 1,           // Para busca por nome
  category: 1,       // Para filtros por categoria
  status: 1,         // Para filtrar ativos/inativos
  focusType: 1       // Para separar lead/investment
}
```

---

## 💾 BACKUP E RESTAURAÇÃO

### **1. Backup da Coleção SAAS**

#### **Backup Completo:**
```bash
# Via mongodump (recomendado)
mongodump --uri="mongodb://localhost:27017/portalsaas" --collection=saascompanies --out=./backup

# Via mongoexport (JSON)
mongoexport --uri="mongodb://localhost:27017/portalsaas" --collection=saascompanies --out=saas-backup.json --pretty
```

#### **Backup via MongoDB Compass:**
1. Conectar ao banco `portalsaas`
2. Selecionar coleção `saascompanies`
3. Menu **Collection** → **Export Collection**
4. Escolher formato JSON
5. Salvar arquivo

#### **Backup via Código (Node.js):**
```javascript
// scripts/backup-saas.js
const { MongoClient } = require('mongodb');
const fs = require('fs');

async function backupSaas() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('portalsaas');
  const companies = await db.collection('saascompanies').find({}).toArray();
  
  fs.writeFileSync(
    `saas-backup-${Date.now()}.json`, 
    JSON.stringify(companies, null, 2)
  );
  
  console.log(`✅ Backup realizado: ${companies.length} empresas`);
  await client.close();
}

backupSaas();
```

### **2. Restauração da Coleção**

#### **Restaurar via mongorestore:**
```bash
# Restaurar de dump binário
mongorestore --uri="mongodb://localhost:27017/portalsaas" --collection=saascompanies ./backup/portalsaas/saascompanies.bson

# Restaurar de JSON
mongoimport --uri="mongodb://localhost:27017/portalsaas" --collection=saascompanies --file=saas-backup.json --jsonArray
```

#### **Restaurar via MongoDB Compass:**
1. Conectar ao banco `portalsaas`
2. Selecionar/criar coleção `saascompanies`
3. Menu **Collection** → **Import Data**
4. Selecionar arquivo JSON
5. Confirmar importação

#### **Restaurar via mongosh:**
```javascript
// 1. Conectar ao banco
mongosh "mongodb://localhost:27017/portalsaas"

// 2. Carregar backup
const backup = JSON.parse(fs.readFileSync('./saas-backup.json'));

// 3. Restaurar documentos
db.saascompanies.insertMany(backup);

// 4. Verificar
db.saascompanies.countDocuments();
```

### **3. Limpeza e Manutenção**

#### **Remover Empresas Duplicadas:**
```javascript
// Via mongosh
db.saascompanies.aggregate([
  { $group: { _id: "$slug", count: { $sum: 1 }, ids: { $push: "$_id" } } },
  { $match: { count: { $gt: 1 } } }
]).forEach(doc => {
  doc.ids.slice(1).forEach(id => db.saascompanies.deleteOne({ _id: id }));
});
```

#### **Resetar Contador de Views:**
```javascript
db.saascompanies.updateMany({}, { $set: { views: 0 } });
```

#### **Verificar Integridade:**
```javascript
// Empresas sem slug
db.saascompanies.find({ slug: { $exists: false } });

// Empresas sem nome
db.saascompanies.find({ name: { $exists: false } });

// Empresas inativas
db.saascompanies.find({ status: 'inativo' });
```

---

## 🔧 TROUBLESHOOTING

### **Erro: "Duplicate key error on slug"**

**Causa:** Slug já existe no banco de dados

**Solução:**
```javascript
// 1. Verificar slug existente
db.saascompanies.findOne({ slug: "nome-da-empresa" });

// 2. Deletar duplicado
db.saascompanies.deleteOne({ slug: "nome-da-empresa", _id: ObjectId("...") });

// 3. Ou renomear o slug
db.saascompanies.updateOne(
  { slug: "nome-da-empresa" },
  { $set: { slug: "nome-da-empresa-2" } }
);
```

### **Erro: "Cannot read properties of undefined"**

**Causa:** Dados faltando no frontend ou backend

**Solução:**
```javascript
// Verificar no backend (saas-companies.service.ts)
console.log('📝 Dados recebidos:', JSON.stringify(createSaasCompanyDto, null, 2));

// Verificar no frontend (page.tsx)
console.log('📝 Frontend - Dados do formulário:', formData);
```

### **Erro: "Bad Request Exception"**

**Causa:** Validação de DTOs muito restritiva

**Solução temporária:**
```typescript
// server/src/main.ts
app.useGlobalPipes(new ValidationPipe({
  whitelist: false,  // Desabilitar whitelist temporariamente
  transform: true
}));
```

### **Empresa não aparece na listagem**

**Verificar:**
1. Status está `ativo`?
2. Empresa foi criada corretamente no banco?
3. Frontend está conectado ao backend correto?

```javascript
// Verificar no mongosh
db.saascompanies.find({ status: 'ativo' });

// Verificar endpoint
curl http://localhost:3001/saas-companies
```

---

## 📝 SCRIPTS ÚTEIS

### **Script de Teste: Criar Empresa de Teste**
```bash
# server/scripts/create-test-saas.js
curl -X POST http://localhost:3001/saas-companies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Empresa Teste",
    "category": "Marketing",
    "website": "https://teste.com",
    "description": "Empresa de teste",
    "focusType": "lead",
    "status": "ativo"
  }'
```

### **Script de Verificação:**
```javascript
// scripts/check-saas.js
const { MongoClient } = require('mongodb');

async function checkSaas() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('portalsaas');
  
  const total = await db.collection('saascompanies').countDocuments();
  const ativas = await db.collection('saascompanies').countDocuments({ status: 'ativo' });
  const inativas = await db.collection('saascompanies').countDocuments({ status: 'inativo' });
  
  console.log(`📊 Total de empresas: ${total}`);
  console.log(`✅ Ativas: ${ativas}`);
  console.log(`❌ Inativas: ${inativas}`);
  
  await client.close();
}

checkSaas();
```

---

## 🚨 IMPORTANTE

### **Antes de Modificar:**
1. **SEMPRE** fazer backup da coleção `saascompanies`
2. **TESTAR** em ambiente local antes de produção
3. **VERIFICAR** se há empresas duplicadas antes de restaurar

### **Manutenção Regular:**
- Backup semanal da coleção
- Verificar integridade dos slugs
- Limpar empresas de teste
- Monitorar contador de views

### **Contatos de Emergência:**
- Backend rodando em: `http://localhost:3001`
- Frontend rodando em: `http://localhost:3000`
- MongoDB rodando em: `mongodb://localhost:27017`
- Banco de dados: `portalsaas`
- Coleção principal: `saascompanies`

---

## 📖 REFERÊNCIAS RÁPIDAS

### **Validação de Campos:**
- `name`: Obrigatório, string
- `category`: Obrigatório, string
- `website`: Obrigatório, URL válida
- `description`: Obrigatório, string
- `focusType`: Obrigatório, enum ['lead', 'investment', 'both']
- `status`: Obrigatório, enum ['ativo', 'inativo']

### **Campos Condicionais:**
- Se `focusType === 'lead'`: campos de Lead Generation são relevantes
- Se `focusType === 'investment'`: campos de Investment são relevantes
- Se `focusType === 'both'`: todos os campos são relevantes

### **Geração Automática:**
- `slug`: Gerado automaticamente a partir do `name`
- `views`: Iniciado em 0
- `createdAt`: Timestamp automático
- `updatedAt`: Atualizado automaticamente
 