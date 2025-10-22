# CATÁLOGO SAAS

> **Última atualização:** Janeiro 2025  
> **Versão:** 1.0  
> **Status:** ✅ Ativo

---

## 🎯 PARA STAKEHOLDERS

### O que faz
Página pública dedicada para explorar todas as empresas SAAS cadastradas, com sistema de filtros por categoria, ordenação (mais visualizados, recentes, A-Z) e grid responsivo de cards.

### Por que existe
Permite que visitantes encontrem rapidamente soluções SAAS específicas através de filtros intuitivos, aumentando a descoberta de produtos e gerando leads qualificados para as empresas SAAS cadastradas.

### Quando usar
- Quando usuário clica em "Ver Mais SAAS" na home page
- Quando usuário acessa `/catalogo` diretamente
- Quando usuário busca explorar todas as opções de SAAS disponíveis

---

## 🏗️ ARQUITETURA RESUMIDA

### Frontend
| Arquivo | Descrição | Responsabilidade |
|---------|-----------|------------------|
| `src/app/(public)/catalogo/page.tsx` | Página principal do catálogo | Grid de cards, filtros, ordenação |
| `src/app/(public)/layout.tsx` | Layout público | Injeta Header + Footer |
| `src/components/ecommerce/Header.tsx` | Header unificado | Navegação consistente |

### Backend
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/saas-companies` | GET | Lista todas as empresas SAAS |

### Database
| Schema | Campos Relevantes | Propósito |
|--------|-------------------|-----------|
| `SaasCompany` | `status`, `focusType`, `category`, `views` | Filtros e ordenação |

---

## 🔧 PARA IA: CONTEXTO DE MANUTENÇÃO

### Arquivos Críticos

#### 1. `src/app/(public)/catalogo/page.tsx` - COMPONENTE PRINCIPAL

```typescript
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface SaasCompany {
  _id: string
  name: string
  slug: string
  description: string
  category: string
  rating: number
  pricing: string
  featured: boolean
  logo?: string
  status: string
  focusType?: string
  views: number
}

const CATEGORIES = [
  'Marketing', 'Vendas', 'Atendimento', 'RH', 'Financeiro', 'Produtividade',
  'E-commerce', 'Educação', 'Saúde', 'Logística', 'Tecnologia', 'Outro'
]

export default function CatalogoPage() {
  const [companies, setCompanies] = useState<SaasCompany[]>([])
  const [filteredCompanies, setFilteredCompanies] = useState<SaasCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    orderBy: 'views' as 'views' | 'recent' | 'alphabetical'
  })

  // ⚠️ NÃO MODIFICAR: Lógica de carregamento (linhas 44-64)
  const loadCompanies = async () => {
    try {
      const res = await fetch('http://localhost:3001/saas-companies')
      if (res.ok) {
        const result = await res.json()
        const data = result.companies || result
        
        // Filtrar: status ativo + lead generation
        const leadGenCompanies = data.filter((s: SaasCompany) => 
          s.status === 'ativo' && 
          (s.focusType === 'lead-generation' || s.focusType === 'both')
        )
        
        setCompanies(leadGenCompanies)
      }
    } catch (error) {
      console.error('Erro ao carregar empresas:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ MODIFICÁVEL: Lógica de filtros (linhas 66-83)
  const applyFilters = () => {
    let filtered = [...companies]

    // Filtrar por categoria
    if (filters.categories.length > 0) {
      filtered = filtered.filter(c => filters.categories.includes(c.category))
    }

    // Ordenar
    filtered.sort((a, b) => {
      if (filters.orderBy === 'views') return b.views - a.views
      if (filters.orderBy === 'recent') return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
      if (filters.orderBy === 'alphabetical') return a.name.localeCompare(b.name)
      return 0
    })

    setFilteredCompanies(filtered)
  }
  
  // ... resto do componente
}
```

**Responsabilidades:**
- Buscar todas as empresas SAAS via API
- Filtrar no frontend: status ativo + focusType (lead-generation ou both)
- Aplicar filtros de categoria selecionados pelo usuário
- Ordenar por views, recentes ou alfabético
- Renderizar grid responsivo de cards

**Dependências:**
- `useState`, `useEffect` (React Hooks)
- `Link` (Next.js)
- `fetch` API (HTTP requests)
- Layout `(public)/layout.tsx` (Header + Footer)

---

### Endpoints Utilizados

#### `GET /saas-companies`
```typescript
// Request
fetch('http://localhost:3001/saas-companies')

// Response
{
  "companies": [
    {
      "_id": "507f...",
      "name": "Empresa SAAS",
      "slug": "empresa-saas",
      "status": "ativo",
      "focusType": "lead-generation",
      "category": "Marketing",
      "views": 150,
      "rating": 4.5,
      // ... outros campos
    }
  ],
  "total": 100,
  "page": 1,
  "totalPages": 10
}
```

**Quando usar:** Ao montar o componente (`useEffect`)  
**Filtros aplicados:** No **frontend** (status + focusType + category + orderBy)

---

### Fluxo de Dados

```
[Usuário] → [Catálogo Page] → [GET /saas-companies] → [Backend Service] → [MongoDB]
                ↓
         [Filter: ativo + lead-gen]
                ↓
         [companies state]
                ↓
    [applyFilters: category + orderBy]
                ↓
         [filteredCompanies state]
                ↓
        [Grid de Cards renderizado]
```

---

### Como Testar

#### Teste Funcional
```bash
# 1. Iniciar desenvolvimento
npm run dev

# 2. Acessar URL
http://localhost:3000/catalogo

# 3. Verificar
- [ ] Cards de SAAS aparecem em grid responsivo
- [ ] Filtros de categoria funcionam (toggle on/off)
- [ ] Ordenação funciona (views, recentes, A-Z)
- [ ] Contador de resultados atualiza
- [ ] Botão "Limpar Filtros" aparece e funciona
- [ ] Cards exibem: logo, nome, categoria, rating, pricing
- [ ] Hover nos cards mostra efeito visual
- [ ] Click no card redireciona para /saas/[slug]
- [ ] Layout responsivo (mobile + desktop)
```

#### Teste de Integração
```bash
# Backend
cd server
npm run dev

# Testar endpoint
curl http://localhost:3001/saas-companies
# Deve retornar lista de empresas
```

#### Teste de Filtros
```bash
# 1. Acesse o catálogo
# 2. Clique em categoria "Marketing"
# 3. Verifique se mostra apenas SAAS de Marketing
# 4. Mude ordenação para "Mais recentes"
# 5. Verifique se ordem mudou
# 6. Clique em "Limpar Filtros"
# 7. Verifique se todos os SAAS voltaram
```

---

### Restauração Rápida

#### Se algo quebrou:
```bash
# Ver histórico de mudanças
git log --oneline src/app/(public)/catalogo/page.tsx

# Restaurar versão anterior
git checkout [hash] src/app/(public)/catalogo/page.tsx

# Ou reverter último commit
git revert HEAD
```

#### Dependências problemáticas:
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

#### Se cards não aparecem:
```bash
# 1. Verificar se backend está rodando
curl http://localhost:3001/saas-companies

# 2. Verificar console do navegador (F12)
# Procurar por erros de CORS ou fetch

# 3. Verificar se há SAAS cadastrados no banco
# Acessar área admin e verificar lista
```

---

### Prompts para IA

Use estes prompts para manutenção rápida:

```
"Analise src/app/(public)/catalogo/page.tsx e explique a lógica de filtros"

"Como adicionar um novo filtro de 'pricing' (free, paid, freemium)?"

"Por que os cards não estão aparecendo no catálogo?"

"Como otimizar a performance da renderização de muitos cards?"

"Explique a diferença entre 'companies' e 'filteredCompanies' states"
```

---

## 🚨 PONTOS DE ATENÇÃO

### Não Modificar
- [ ] Filtro de `status === 'ativo'` (segurança: não exibir inativos)
- [ ] Filtro de `focusType` (regra de negócio: apenas lead-gen ou both)
- [ ] Estrutura de grid responsivo (UX testada)
- [ ] Tamanho dos cards: `min-w-[360px] max-w-[360px]` (consistência visual)

### Padrões do Sistema
- **CSS:** Tailwind classes (ex: `bg-white border border-gray-200`)
- **Estado:** `useState` + `useEffect` (não Redux)
- **API:** `fetch` (não axios)
- **Roteamento:** Next.js `Link` component
- **Layout:** Usa `(public)/layout.tsx` para Header/Footer unificados

### Problemas Conhecidos
- **Muitos SAAS (100+):** Grid pode ficar lento. Solução futura: Implementar paginação.
- **Categoria vazia:** Se não há SAAS em uma categoria, o botão de filtro não aparece (proposital).

---

## 📊 MÉTRICAS DE SUCESSO

- **Performance:** Carregamento < 2s com 50 SAAS
- **UX:** Filtros intuitivos, sem recarregar página
- **Conversão:** Click-through rate nos cards > 15%

---

## 🎨 DESIGN

### Cores
- Background: `bg-gradient-to-br from-gray-50 via-white to-blue-50/30`
- Cards: `bg-white border border-blue-500/20`
- Hover: `hover:border-blue-500/40 hover:shadow-2xl`
- Filtros ativos: `bg-gray-900 text-white`
- Filtros inativos: `bg-gray-50 text-gray-700 border border-gray-200`

### Responsividade
- Mobile (< 768px): 1 coluna
- Tablet (768px - 1024px): 2 colunas
- Desktop (> 1024px): 3 colunas

### Espaçamento
- Gap entre cards: `gap-8`
- Padding lateral: `px-8 md:px-16 lg:px-24`
- Padding vertical: `py-20`

---

## 🔗 DOCUMENTOS RELACIONADOS

- [Home Page](./home-page.md) - Link "Ver Mais SAAS" aponta aqui
- [Página Dedicada SAAS](./pagina-dedicada-saas.md) - Cards redirecionam para lá
- [Header Unificado](./header-unificado.md) - Menu de navegação
- [API Reference](../API-REFERENCE.md) - Endpoints utilizados

---

## 📝 CHANGELOG

### v1.0 - Janeiro 2025
- ✅ Implementação inicial do catálogo
- ✅ Filtros por categoria (12 categorias)
- ✅ Ordenação (views, recentes, A-Z)
- ✅ Grid responsivo (1/2/3 colunas)
- ✅ Integração com endpoint `/saas-companies`
- ✅ Design consistente com home page
- ✅ Contador de resultados em tempo real
- ✅ Botão "Limpar Filtros"

