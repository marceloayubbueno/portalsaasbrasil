# LOGIN ADMIN

> **Última atualização:** Janeiro 2025  
> **Versão:** 1.0  
> **Status:** ✅ Ativo

---

## 🎯 PARA STAKEHOLDERS

### O que faz
Página de autenticação para administradores do portal, com formulário de login (email + senha), validação e redirecionamento para o painel administrativo após autenticação bem-sucedida via JWT.

### Por que existe
Controla acesso à área administrativa do portal, garantindo que apenas administradores autorizados possam gerenciar empresas SAAS, aprovar cadastros, editar informações e acessar dados sensíveis.

### Quando usar
- Quando administrador precisa acessar painel admin
- Quando sessão JWT expirou e precisa reautenticar
- Quando usuário acessa `/admin/login` diretamente

---

## 🏗️ ARQUITETURA RESUMIDA

### Frontend
| Arquivo | Descrição | Responsabilidade |
|---------|-----------|------------------|
| `src/app/admin/login/page.tsx` | Página de login admin | Formulário + validação + autenticação |
| `src/app/admin/layout.tsx` | Layout admin | Layout específico da área admin |

### Backend
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/auth/admin/login` | POST | Autentica administrador e retorna JWT |

### Database
| Schema | Campos Relevantes | Propósito |
|--------|-------------------|-----------|
| `Admin` | `email`, `password` (hash) | Credenciais de autenticação |

---

## 🔧 PARA IA: CONTEXTO DE MANUTENÇÃO

### Arquivos Críticos

#### 1. `src/app/admin/login/page.tsx` - COMPONENTE PRINCIPAL

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, Shield, Home } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // ⚠️ NÃO MODIFICAR: Lógica de autenticação (linhas 15-31)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // TODO: Implementar autenticação real
      // Simulando login por enquanto
      setTimeout(() => {
        router.push('/admin/dashboard')
      }, 500)
    } catch (error) {
      setError('Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }
  
  // ... resto do componente
}
```

**Responsabilidades:**
- Renderizar formulário de login (email + senha)
- Validar inputs (required, email format)
- Enviar credenciais para backend (POST `/auth/admin/login`)
- Armazenar JWT no localStorage/cookie
- Redirecionar para `/admin/dashboard` após sucesso
- Exibir mensagens de erro (credenciais inválidas, erro de rede)
- Loading state durante autenticação

**Dependências:**
- `useState` (React)
- `useRouter` (Next.js navigation)
- `lucide-react` (ícones)
- `Link` (Next.js)

---

### Endpoints Utilizados

#### `POST /auth/admin/login` (TODO: A IMPLEMENTAR)
```typescript
// Request
fetch('http://localhost:3001/auth/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@portalsaas.com',
    password: 'senha123'
  })
})

// Response (Sucesso)
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "507f...",
    "email": "admin@portalsaas.com",
    "name": "Administrador",
    "role": "admin"
  }
}

// Response (Erro)
{
  "success": false,
  "message": "Credenciais inválidas"
}
```

**Quando usar:** Ao submeter formulário de login  
**Autenticação:** JWT (armazenar token no localStorage)

---

### Fluxo de Autenticação

```
[Usuário acessa /admin/login]
         ↓
   [Preenche email + senha]
         ↓
   [Clica em "Entrar no Painel"]
         ↓
[POST /auth/admin/login]
         ↓
   [Backend valida credenciais]
         ↓
   [Se válido: Retorna JWT]
         ↓
[localStorage.setItem('admin_token', token)]
         ↓
[router.push('/admin/dashboard')]
         ↓
[Dashboard carrega]
         ↓
[Guards verificam JWT em rotas protegidas]
```

---

### Como Testar

#### Teste Funcional
```bash
# 1. Iniciar desenvolvimento
npm run dev

# 2. Acessar URL
http://localhost:3000/admin/login

# 3. Verificar
- [ ] Formulário exibe campos: Email, Senha
- [ ] Ícones aparecem (Mail, Lock)
- [ ] Header "Painel Admin" aparece
- [ ] Botão "Entrar no Painel" aparece
- [ ] Validação HTML5 (required, email format)
- [ ] Loading state ao submeter (spinner + "Entrando...")
- [ ] Erro exibe mensagem vermelha (se credenciais inválidas)
- [ ] Sucesso redireciona para /admin/dashboard
- [ ] Link "Voltar para o site" funciona (redireciona para /)
- [ ] Design responsivo (mobile + desktop)
```

#### Teste de Autenticação (Após implementar backend)
```bash
# 1. Acesse /admin/login
# 2. Preencha com credenciais válidas
#    Email: admin@portalsaas.com
#    Senha: senha123
# 3. Clique em "Entrar no Painel"
# 4. Verifique se redireciona para /admin/dashboard
# 5. Verifique se JWT foi armazenado (DevTools → Application → localStorage)
```

#### Teste de Erro
```bash
# 1. Acesse /admin/login
# 2. Preencha com credenciais inválidas
#    Email: teste@teste.com
#    Senha: errado
# 3. Clique em "Entrar no Painel"
# 4. Verifique se mensagem de erro aparece
# 5. Verifique se NÃO redireciona
```

---

### Restauração Rápida

#### Se algo quebrou:
```bash
# Ver histórico de mudanças
git log --oneline src/app/admin/login/page.tsx

# Restaurar versão anterior
git checkout [hash] src/app/admin/login/page.tsx
```

#### Se login não funciona:
```bash
# 1. Verificar se backend está rodando
curl http://localhost:3001

# 2. Verificar se endpoint /auth/admin/login existe
curl -X POST http://localhost:3001/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portalsaas.com","password":"senha123"}'

# 3. Verificar console do navegador (F12)
# Procurar por erros de CORS ou fetch

# 4. Verificar se há admin cadastrado no banco
# Acessar MongoDB e verificar collection 'admins'
```

#### Se não redireciona após login:
```bash
# 1. Verificar console do navegador (F12)
# 2. Verificar se router.push está sendo chamado
# 3. Verificar se rota /admin/dashboard existe
```

---

### Prompts para IA

Use estes prompts para manutenção rápida:

```
"Analise src/app/admin/login/page.tsx e explique o fluxo de autenticação"

"Como implementar autenticação real com JWT no login admin?"

"Por que o login admin não está redirecionando para o dashboard?"

"Como adicionar 'Esqueci minha senha' no login admin?"

"Explique como funciona o JWT multi-cliente neste sistema"
```

---

## 🚨 PONTOS DE ATENÇÃO

### Não Modificar
- [ ] Validação de email (HTML5 `type="email" required`)
- [ ] Loading state (UX: previne múltiplos submits)
- [ ] Redirect para `/admin/dashboard` após sucesso
- [ ] Link "Voltar para o site" (UX: navegação clara)

### Padrões do Sistema
- **CSS:** Tailwind classes (ex: `bg-gradient-to-r from-blue-600 to-cyan-600`)
- **Estado:** `useState` (email, password, error, loading)
- **API:** `fetch` (não axios)
- **Autenticação:** JWT (armazenar no localStorage)
- **Roteamento:** `useRouter().push()` (Next.js)

### Problemas Conhecidos
- **TODO:** Endpoint `/auth/admin/login` ainda não está implementado. Atualmente usa simulação com `setTimeout`.
- **Segurança:** JWT deve ser armazenado de forma segura (considerar httpOnly cookies em produção).

---

## 📊 MÉTRICAS DE SUCESSO

- **Performance:** Carregamento < 1s
- **UX:** Tempo de login < 3s
- **Segurança:** 100% das requisições via HTTPS em produção

---

## 🎨 DESIGN

### Cores
- Background: `bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50`
- Card: `bg-white/80 backdrop-blur-lg`
- Header: `bg-gradient-to-r from-blue-600 to-cyan-600`
- Botão: `bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700`
- Erro: `bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200`

### Efeitos
- Card: Sombra 2xl, backdrop blur, border branco translúcido
- Inputs: Focus ring azul, transição suave
- Botão: Hover scale 1.02, loading spinner

### Ícones
- Shield: Header
- Mail: Campo email
- Lock: Campo senha
- Home: Link "Voltar para o site"

---

## 🔗 DOCUMENTOS RELACIONADOS

- [JWT Multi-Cliente](../IMPLEMENTAÇÃO%20JWT%20MULTICLIENTE%20.md) - Sistema de autenticação
- [API Reference](../API-REFERENCE.md) - Endpoints de autenticação
- [Área do Cliente](./area-do-cliente.md) - Login SAAS (similar)

---

## 📝 CHANGELOG

### v1.0 - Janeiro 2025
- ✅ Implementação da página de login admin
- ✅ Formulário com email + senha
- ✅ Validação HTML5 (required, email)
- ✅ Loading state (spinner + texto)
- ✅ Mensagem de erro estilizada
- ✅ Redirect para /admin/dashboard após sucesso
- ✅ Link "Voltar para o site"
- ✅ Design com gradientes e backdrop blur
- ✅ Layout responsivo
- 🚧 TODO: Integração real com backend JWT

