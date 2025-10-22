# PÁGINA DEDICADA SAAS

> **Última atualização:** Janeiro 2025  
> **Versão:** 1.0  
> **Status:** ✅ Ativo

---

## 🎯 PARA STAKEHOLDERS

### O que faz
Página individual para cada empresa SAAS, exibindo informações detalhadas sobre produtos/serviços, com tabs dinâmicas para "Geração de Leads" e "Busca por Investimento" (quando aplicável).

### Por que existe
Fornece vitrine completa para cada SAAS cadastrado, permitindo que visitantes conheçam detalhes, vejam métricas, acessem contatos e tomem ações (trial, contato, etc.), gerando conversões qualificadas.

### Quando usar
- Quando usuário clica em um card de SAAS (home/catálogo)
- Quando usuário acessa `/saas/[slug]` diretamente
- Quando SAAS compartilha link do próprio perfil

---

## 🏗️ ARQUITETURA RESUMIDA

### Frontend
| Arquivo | Descrição | Responsabilidade |
|---------|-----------|------------------|
| `src/app/(public)/saas/[slug]/page.tsx` | Página dinâmica SAAS | Exibe detalhes completos da empresa |
| `src/app/(public)/layout.tsx` | Layout público | Injeta Header + Footer |

### Backend
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/saas-companies/slug/:slug` | GET | Busca SAAS por slug |
| `/saas-companies/slug/:slug/view` | PUT | Incrementa views |

### Database
| Schema | Campos Relevantes | Propósito |
|--------|-------------------|-----------|
| `SaasCompany` | `slug`, `focusType`, `views`, `founders`, `actionUrl` | Conteúdo da página |

---

## 🔧 PARA IA: CONTEXTO DE MANUTENÇÃO

### Arquivos Críticos

#### 1. `src/app/(public)/saas/[slug]/page.tsx` - COMPONENTE PRINCIPAL

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SaasDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const tabParam = searchParams.get('tab')
  
  const [company, setCompany] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(tabParam || 'leads')

  // ⚠️ NÃO MODIFICAR: Lógica de carregamento (linhas 18-41)
  useEffect(() => {
    loadCompany()
    incrementViews()
  }, [slug])

  const loadCompany = async () => {
    try {
      const res = await fetch(`http://localhost:3001/saas-companies/slug/${slug}`)
      if (res.ok) {
        const data = await res.json()
        setCompany(data)
      }
    } catch (error) {
      console.error('Erro ao carregar empresa:', error)
    } finally {
      setLoading(false)
    }
  }

  const incrementViews = async () => {
    try {
      await fetch(`http://localhost:3001/saas-companies/slug/${slug}/view`, {
        method: 'PUT'
      })
    } catch (error) {
      console.error('Erro ao incrementar views:', error)
    }
  }

  // ✅ MODIFICÁVEL: Renderização de tabs e conteúdo
  const showTabs = company.focusType === 'both'
  
  // ... resto do componente
}
```

**Responsabilidades:**
- Buscar dados da empresa SAAS via slug (URL amigável)
- Incrementar contador de visualizações automaticamente
- Exibir tabs se `focusType === 'both'`
- Renderizar conteúdo baseado em tab ativa (leads ou investimento)
- Exibir informações de contato e redes sociais

**Dependências:**
- `useParams` (pegar slug da URL)
- `useSearchParams` (pegar tab da query string)
- `useState`, `useEffect` (React Hooks)
- Layout `(public)/layout.tsx` (Header + Footer)

---

### Endpoints Utilizados

#### `GET /saas-companies/slug/:slug`
```typescript
// Request
fetch('http://localhost:3001/saas-companies/slug/empresa-saas')

// Response
{
  "_id": "507f...",
  "name": "Empresa SAAS",
  "slug": "empresa-saas",
  "description": "Descrição completa",
  "category": "Marketing",
  "status": "ativo",
  "focusType": "both",  // ou "lead-generation" ou "investment-seeking"
  "views": 150,
  "rating": 4.5,
  "reviewCount": 10,
  
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
  
  // Contato
  "email": "contato@empresa.com",
  "phone": "+55 11 98765-4321",
  "website": "https://empresa.com",
  "linkedin": "https://linkedin.com/company/empresa",
  
  // ... outros campos
}
```

**Quando usar:** Ao montar o componente (`useEffect`)  
**Tratamento de erro:** 404 → Exibir "Empresa não encontrada"

#### `PUT /saas-companies/slug/:slug/view`
```typescript
// Request
fetch('http://localhost:3001/saas-companies/slug/empresa-saas/view', {
  method: 'PUT'
})

// Response
{
  "_id": "507f...",
  "views": 151,  // Incrementado
  // ... outros campos
}
```

**Quando usar:** Automaticamente ao carregar a página  
**Silencioso:** Não bloqueia renderização, erro não afeta UX

---

### Fluxo de Dados

```
[URL: /saas/empresa-saas] 
         ↓
   [useParams.slug]
         ↓
[GET /saas-companies/slug/empresa-saas]
         ↓
    [setCompany]
         ↓
[Renderizar Hero + Tabs + Conteúdo]
         ↓
[Sidebar: Contato + Redes Sociais]

// Paralelo:
[PUT /saas-companies/slug/empresa-saas/view]
         ↓
   [Views++]
```

---

### Como Testar

#### Teste Funcional
```bash
# 1. Iniciar desenvolvimento
npm run dev

# 2. Acessar URL (exemplo)
http://localhost:3000/saas/empresa-teste

# 3. Verificar
- [ ] Hero compacto exibe: logo, nome, descrição, rating, categoria, views
- [ ] Se focusType === 'both', exibe tabs "Geração de Leads" e "Busca por Investimento"
- [ ] Tab ativa exibe conteúdo correto
- [ ] Tab "Geração de Leads" mostra: problemas resolvidos, público-alvo, botão CTA
- [ ] Tab "Busca por Investimento" mostra: métricas (clientes, MRR, crescimento), fundadores
- [ ] Sidebar exibe: email, phone, website, city, redes sociais
- [ ] Botão CTA redireciona para actionUrl (nova aba)
- [ ] Contador de views incrementa (verificar no admin ou refresh)
- [ ] Loading state exibe spinner
- [ ] 404 state exibe "Empresa não encontrada"
- [ ] Layout responsivo (mobile + desktop)
```

#### Teste de Navegação
```bash
# 1. Home → Click em card → Página dedicada
# 2. Catálogo → Click em card → Página dedicada
# 3. URL direta → Página dedicada
# 4. Voltar (browser back) → Volta para origem
```

#### Teste de Tabs (focusType === 'both')
```bash
# 1. Acesse SAAS com focusType "both"
# 2. Clique em tab "Geração de Leads"
# 3. Verifique conteúdo correto
# 4. Clique em tab "Busca por Investimento"
# 5. Verifique métricas e fundadores
```

---

### Restauração Rápida

#### Se algo quebrou:
```bash
# Ver histórico de mudanças
git log --oneline src/app/(public)/saas/[slug]/page.tsx

# Restaurar versão anterior
git checkout [hash] src/app/(public)/saas/[slug]/page.tsx
```

#### Se página não carrega:
```bash
# 1. Verificar se backend está rodando
curl http://localhost:3001/saas-companies/slug/empresa-teste

# 2. Verificar console do navegador (F12)
# Procurar por erros 404 ou fetch

# 3. Verificar se slug existe no banco
# Acessar área admin e verificar lista de SAAS
```

#### Se views não incrementam:
```bash
# 1. Verificar endpoint no backend
curl -X PUT http://localhost:3001/saas-companies/slug/empresa-teste/view

# 2. Verificar logs do servidor
# Deve aparecer log de incremento

# 3. Verificar no MongoDB
# Campo 'views' deve aumentar
```

---

### Prompts para IA

Use estes prompts para manutenção rápida:

```
"Analise src/app/(public)/saas/[slug]/page.tsx e explique o fluxo de dados"

"Como adicionar uma nova seção 'Integrações' na página dedicada?"

"Por que a página dedicada não está carregando os dados do SAAS?"

"Como otimizar o carregamento da página dedicada (lazy loading)?"

"Explique a diferença entre focusType 'lead-generation', 'investment-seeking' e 'both'"
```

---

## 🚨 PONTOS DE ATENÇÃO

### Não Modificar
- [ ] Lógica de incremento de views (analytics importante)
- [ ] Condicional de tabs `focusType === 'both'` (regra de negócio)
- [ ] Estrutura do hero compacto (UX testada)
- [ ] Redirect `target="_blank"` no botão CTA (UX: não perder contexto)

### Padrões do Sistema
- **CSS:** Tailwind classes (ex: `bg-white border border-gray-200`)
- **Estado:** `useState` + `useEffect` (não Redux)
- **API:** `fetch` (não axios)
- **Params:** `useParams` do Next.js (não `window.location`)
- **Layout:** Usa `(public)/layout.tsx` para Header/Footer unificados

### Problemas Conhecidos
- **Slug inválido:** Se slug não existe, exibe "Empresa não encontrada" (esperado).
- **focusType vazio:** Se SAAS não preencheu focusType, não exibe tabs nem conteúdo específico.

---

## 📊 MÉTRICAS DE SUCESSO

- **Performance:** Carregamento < 1.5s
- **UX:** Click no botão CTA > 25%
- **Engajamento:** Tempo médio na página > 2 minutos

---

## 🎨 DESIGN

### Hero Compacto
- Background: `bg-gray-50`
- Logo: `w-16 h-16` (reduzido vs. versão anterior)
- Título: `text-2xl` (compacto)
- Descrição: `text-sm line-clamp-2` (máximo 2 linhas)
- Badge categoria: `bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs`

### Tabs
- Ativa: `text-blue-600 border-blue-600`
- Inativa: `text-gray-500 border-transparent hover:text-blue-600`

### Cards de Conteúdo
- Background: `bg-white border border-gray-200 rounded-xl p-4`
- Métricas: Grid 2x2 com ícones coloridos
- Fundadores: Cards com avatar circular

### Responsividade
- Mobile (< 1024px): 1 coluna (sidebar abaixo)
- Desktop (> 1024px): 2/3 conteúdo + 1/3 sidebar

---

## 🔗 DOCUMENTOS RELACIONADOS

- [Home Page](./home-page.md) - Cards redirecionam para aqui
- [Catálogo SAAS](./catalogo-saas.md) - Cards redirecionam para aqui
- [Header Unificado](./header-unificado.md) - Menu de navegação
- [API Reference](../API-REFERENCE.md) - Endpoints utilizados
- [Cadastro de SAAS](./Cadastro-de-SAAS.md) - Como SAAS preenche dados

---

## 📝 CHANGELOG

### v1.0 - Janeiro 2025
- ✅ Implementação inicial da página dedicada
- ✅ Hero compacto com logo, nome, descrição
- ✅ Tabs dinâmicas para focusType "both"
- ✅ Seção "Geração de Leads" com CTA
- ✅ Seção "Busca por Investimento" com métricas e fundadores
- ✅ Sidebar com informações de contato e redes sociais
- ✅ Incremento automático de views
- ✅ Integração com endpoints `/slug/:slug` e `/slug/:slug/view`
- ✅ Design consistente com home/catálogo
- ✅ Layout responsivo

