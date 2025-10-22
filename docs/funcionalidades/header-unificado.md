# HEADER UNIFICADO

> **Última atualização:** Janeiro 2025  
> **Versão:** 1.0  
> **Status:** ✅ Ativo

---

## 🎯 PARA STAKEHOLDERS

### O que faz
Componente de header (cabeçalho) reutilizável e consistente em todas as páginas públicas do portal, com logo, navegação, botão de acesso SAAS e menu mobile responsivo.

### Por que existe
Garante identidade visual única, navegação consistente e melhor UX em todo o site, evitando confusão de layouts e facilitando manutenção (um único arquivo para ajustar o header de todas as páginas).

### Quando usar
- Automaticamente injetado em todas as páginas dentro de `(public)/`
- Home, Catálogo, Página Dedicada SAAS, Blog, Sobre, Contato

---

## 🏗️ ARQUITETURA RESUMIDA

### Frontend
| Arquivo | Descrição | Responsabilidade |
|---------|-----------|------------------|
| `src/components/ecommerce/Header.tsx` | Componente do header | Navegação + logo + CTA |
| `src/app/(public)/layout.tsx` | Layout público | Injeta Header + Footer em todas as páginas |
| `src/app/(public)/home/page.tsx` | Página home | Usa header via layout |
| `src/app/(public)/catalogo/page.tsx` | Página catálogo | Usa header via layout |
| `src/app/(public)/saas/[slug]/page.tsx` | Página dedicada | Usa header via layout |

### Backend
Não aplicável (componente puramente frontend)

### Database
Não aplicável

---

## 🔧 PARA IA: CONTEXTO DE MANUTENÇÃO

### Arquivos Críticos

#### 1. `src/components/ecommerce/Header.tsx` - COMPONENTE PRINCIPAL

```typescript
'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              PortalSAAS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Home
            </Link>
            <Link href="/catalogo" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              SAAS
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Blog
            </Link>
            <Link href="/sobre" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Sobre
            </Link>
            <Link href="/contato" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Contato
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/saas/login">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                Acesso SAAS
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 hover:text-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/catalogo" className="text-gray-600 hover:text-blue-600 transition-colors">
                SAAS
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                Blog
              </Link>
              <Link href="/sobre" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sobre
              </Link>
              <Link href="/contato" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contato
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
```

**Responsabilidades:**
- Exibir logo clicável (redireciona para home)
- Exibir navegação desktop (5 links)
- Exibir botão "Acesso SAAS" (redireciona para `/saas/login`)
- Toggle menu mobile (hamburguer)
- Responsividade (esconde nav desktop em mobile, mostra toggle)

**Dependências:**
- `Link` (Next.js)
- `useState` (React)
- `Menu`, `X` (lucide-react icons)

---

#### 2. `src/app/(public)/layout.tsx` - LAYOUT QUE INJETA O HEADER

```typescript
import Header from '@/components/ecommerce/Header'
import Footer from '@/components/ecommerce/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.Node
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
```

**Responsabilidades:**
- Injetar `<Header />` no topo de todas as páginas `(public)/`
- Injetar `<Footer />` no rodapé
- Renderizar conteúdo da página (`children`)

**⚠️ IMPORTANTE:** Qualquer página dentro de `src/app/(public)/` automaticamente recebe este layout.

---

### Fluxo de Renderização

```
[Usuário acessa /catalogo]
         ↓
[(public)/layout.tsx carrega]
         ↓
   [<Header /> renderiza]
         ↓
   [Logo + Nav + CTA]
         ↓
   [Conteúdo da página]
         ↓
   [<Footer /> renderiza]
```

---

### Como Testar

#### Teste Funcional
```bash
# 1. Iniciar desenvolvimento
npm run dev

# 2. Acessar qualquer página pública
http://localhost:3000        # Home
http://localhost:3000/catalogo  # Catálogo
http://localhost:3000/saas/empresa-teste  # Página dedicada

# 3. Verificar
- [ ] Header aparece em todas as páginas
- [ ] Logo "PortalSAAS" aparece com gradiente azul/ciano
- [ ] Logo redireciona para home ao clicar
- [ ] Navegação desktop exibe: Home, SAAS, Blog, Sobre, Contato
- [ ] Links de navegação mudam cor ao hover (gray-600 → blue-600)
- [ ] Botão "Acesso SAAS" aparece no canto direito
- [ ] Botão "Acesso SAAS" redireciona para /saas/login
- [ ] Em mobile (< 768px), navegação esconde e aparece ícone hamburguer
- [ ] Click no hamburguer abre menu mobile
- [ ] Menu mobile exibe mesmos 5 links
- [ ] Header é sticky (fica fixo no topo ao rolar página)
- [ ] Background branco com border cinza
```

#### Teste de Responsividade
```bash
# 1. Abra DevTools (F12)
# 2. Toggle device toolbar (Ctrl+Shift+M)
# 3. Teste em:
#    - iPhone SE (375px)
#    - iPad (768px)
#    - Desktop (1920px)
# 4. Verifique comportamento do menu
```

---

### Restauração Rápida

#### Se algo quebrou:
```bash
# Ver histórico de mudanças
git log --oneline src/components/ecommerce/Header.tsx

# Restaurar versão anterior
git checkout [hash] src/components/ecommerce/Header.tsx
```

#### Se header não aparece:
```bash
# 1. Verificar se layout está importando o Header
cat src/app/(public)/layout.tsx
# Deve ter: import Header from '@/components/ecommerce/Header'

# 2. Verificar se página está dentro de (public)/
# Se página estiver em src/app/pagina/page.tsx (sem (public)/), não terá o header

# 3. Reiniciar servidor
npm run dev
```

#### Se menu mobile não funciona:
```bash
# 1. Verificar console do navegador (F12)
# Procurar por erros JavaScript

# 2. Verificar se useState está importado
# 3. Verificar se ícones lucide-react estão instalados
npm list lucide-react
```

---

### Prompts para IA

Use estes prompts para manutenção rápida:

```
"Analise src/components/ecommerce/Header.tsx e explique sua estrutura"

"Como adicionar um novo link 'Pricing' no header?"

"Por que o header não está aparecendo na página X?"

"Como mudar a cor do header de branco para azul escuro?"

"Explique como funciona o menu mobile (toggle)"
```

---

## 🚨 PONTOS DE ATENÇÃO

### Não Modificar
- [ ] Links de navegação (Home, SAAS, Blog, Sobre, Contato) - padrão do site
- [ ] Botão "Acesso SAAS" redireciona para `/saas/login` (fluxo crítico)
- [ ] Classe `sticky top-0 z-50` (header fixo no topo)
- [ ] Responsividade (`md:flex` / `md:hidden`)

### Padrões do Sistema
- **CSS:** Tailwind classes (ex: `bg-white border-b border-gray-200`)
- **Estado:** `useState` (menu mobile)
- **Roteamento:** Next.js `Link` component
- **Ícones:** lucide-react

### Problemas Conhecidos
- **Conflito com inline headers:** Se uma página tiver header inline, haverá duplicação. Solução: Remover header inline e usar apenas o layout `(public)/`.
- **Z-index:** Header tem `z-50`. Se outro elemento tiver z-index maior, pode sobrepor o header.

---

## 📊 MÉTRICAS DE SUCESSO

- **UX:** Click no logo → home (100% funcional)
- **UX:** Menu mobile responsivo (100% funcional em < 768px)
- **Performance:** Renderização < 50ms

---

## 🎨 DESIGN

### Cores
- Background: `bg-white`
- Border: `border-b border-gray-200`
- Logo: Gradiente `from-blue-600 to-cyan-600`
- Links: `text-gray-600 hover:text-blue-600`
- Botão CTA: `bg-blue-600 hover:bg-blue-700 text-white`

### Dimensões
- Altura: `h-16` (64px)
- Padding lateral: `px-4`
- Gap navegação: `gap-8`
- Gap botão: `gap-4`

### Responsividade
- Desktop (> 768px): Navegação horizontal inline
- Mobile (< 768px): Hamburguer + menu dropdown

### Efeitos
- Sticky: Fica fixo no topo ao rolar
- Hover: Transição suave de cores
- Shadow: `shadow-sm` (sombra leve)

---

## 🔗 DOCUMENTOS RELACIONADOS

- [Home Page](./home-page.md) - Usa este header
- [Catálogo SAAS](./catalogo-saas.md) - Usa este header
- [Página Dedicada SAAS](./pagina-dedicada-saas.md) - Usa este header
- [Footer](../components/Footer.md) - Componente complementar (futuro)

---

## 📝 CHANGELOG

### v1.0 - Janeiro 2025
- ✅ Implementação do header unificado
- ✅ Logo "PortalSAAS" com gradiente
- ✅ Navegação desktop (5 links)
- ✅ Botão "Acesso SAAS"
- ✅ Menu mobile responsivo (hamburguer)
- ✅ Sticky header (fixo no topo)
- ✅ Design consistente (branco + cinza + azul)
- ✅ Integração com layout `(public)/`
- ✅ Resolução de conflito (eliminado header azul escuro antigo)

