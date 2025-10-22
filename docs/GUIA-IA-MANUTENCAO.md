# 🤖 GUIA DE MANUTENÇÃO PARA IA

> **Objetivo:** Orientar IAs sobre como usar esta documentação para executar manutenções rápidas e seguras no Portal SAAS.

---

## 🎯 COMO USAR ESTA DOCUMENTAÇÃO

### Fluxo de Manutenção Recomendado

```
1. ENTENDER → Ler funcionalidade específica em /docs/funcionalidades/[nome].md
2. VERIFICAR → Consultar API em /docs/API-REFERENCE.md
3. ANALISAR → Ler código dos arquivos críticos listados
4. TESTAR → Executar comandos de teste antes de modificar
5. MODIFICAR → Aplicar mudanças seguindo padrões existentes
6. VALIDAR → Executar checklist de validação
7. COMMIT → Commitar com mensagem clara
```

---

## 🚀 COMANDOS ESSENCIAIS

### Desenvolvimento Local

```bash
# Frontend (Next.js)
npm run dev                    # Inicia servidor dev na porta 3000
npm run build                  # Build de produção
npm run lint                   # Verifica erros de linting

# Backend (NestJS)
cd server
npm run dev                    # Inicia servidor dev na porta 3001
npm run build                  # Compila TypeScript
npm run start:prod             # Inicia servidor de produção
```

### Testes Rápidos

```bash
# Testar frontend
open http://localhost:3000

# Testar backend
curl http://localhost:3001/saas-companies

# Testar endpoint específico
curl http://localhost:3001/saas-companies/slug/nome-empresa
```

### Git

```bash
# Verificar status
git status

# Ver mudanças
git diff

# Commitar mudanças
git add .
git commit -m "tipo: descrição clara"

# Push (CI/CD automático)
git push origin main
```

---

## 🚨 REGRAS ANTI-ALUCINAÇÃO

### SEMPRE FAÇA

✅ **Ler antes de modificar**
```bash
# Sempre leia o arquivo completo antes de modificar
cat src/caminho/arquivo.tsx
# ou use ferramentas de leitura de arquivo
```

✅ **Verificar padrões existentes**
```bash
# Procure por padrões no código
grep "useState" src/app/**/*.tsx
grep "fetch" src/app/**/*.tsx
```

✅ **Testar após modificar**
```bash
# Sempre teste localmente
npm run dev
# Verifique se não quebrou nada
```

✅ **Seguir estrutura existente**
- Use Tailwind CSS (não inline styles)
- Use `useState` + `useEffect` (não Redux)
- Use `fetch` (não axios)
- Siga nomenclatura camelCase

### NUNCA FAÇA

❌ **Criar novos padrões**
- Não introduza novas bibliotecas sem consultar
- Não mude arquitetura existente
- Não crie novos estilos de código

❌ **Assumir funcionalidades**
- Não presuma que algo existe
- Sempre verifique antes de usar
- Consulte package.json para dependências

❌ **Modificar sem contexto**
- Nunca modifique sem ler o arquivo completo
- Nunca ignore comentários de aviso (⚠️)
- Nunca quebre funcionalidades existentes

❌ **Ignorar testes**
- Nunca faça push sem testar localmente
- Nunca ignore erros de linting
- Nunca pule o processo de validação

---

## 📁 ESTRUTURA DO PROJETO

### Frontend (Next.js 15)
```
src/
├── app/                      # Rotas e páginas
│   ├── (public)/            # Layout público unificado
│   │   ├── home/            # Página inicial
│   │   ├── catalogo/        # Catálogo SAAS
│   │   ├── saas/[slug]/     # Página dedicada SAAS
│   │   └── layout.tsx       # Layout com Header + Footer
│   ├── admin/               # Área administrativa
│   ├── saas/                # Área do cliente SAAS
│   └── page.tsx             # Redirect para /home
├── components/              # Componentes reutilizáveis
│   └── ecommerce/
│       ├── Header.tsx       # Header unificado
│       └── Footer.tsx       # Footer padrão
└── lib/                     # Utilitários e configurações
```

### Backend (NestJS)
```
server/src/
├── products/                # Módulo de SAAS Companies
│   ├── saas-companies.controller.ts
│   ├── saas-companies.service.ts
│   ├── entities/
│   │   └── product.schema.ts
│   └── saas-company.dto.ts
├── auth/                    # Autenticação JWT
└── main.ts                  # Entry point
```

---

## 🔐 AUTENTICAÇÃO JWT MULTI-CLIENTE

### Importante
Este sistema usa **JWT Multi-Cliente** com 3 tipos de usuário:
1. **Admin** - Administradores do portal
2. **SAAS** - Empresas SAAS cadastradas
3. **User** - Usuários finais (futuro)

### Documentação Completa
📖 Consulte: `docs/IMPLEMENTAÇÃO JWT MULTICLIENTE .md`

### Guards Principais
- `JwtAdminAuthGuard` - Protege rotas admin
- `JwtSaasAuthGuard` - Protege rotas SAAS

---

## 🎨 PADRÕES DE DESIGN

### Tailwind CSS
```tsx
// ✅ CORRETO
<div className="bg-white border border-gray-200 rounded-lg p-6">

// ❌ ERRADO
<div style={{ background: 'white', padding: '24px' }}>
```

### Componentes React
```tsx
// ✅ CORRETO - useState + useEffect
const [data, setData] = useState([])
useEffect(() => {
  loadData()
}, [])

// ❌ ERRADO - Não use Redux ou outras libs de estado
```

### API Calls
```tsx
// ✅ CORRETO - fetch nativo
const res = await fetch('http://localhost:3001/endpoint')
const data = await res.json()

// ❌ ERRADO - Não use axios
```

---

## 🔍 DEBUGGING

### Frontend
```bash
# Console do navegador
# Abra DevTools (F12) e veja console/network

# React DevTools
# Instale extensão React DevTools no navegador
```

### Backend
```bash
# Logs no terminal
cd server
npm run dev
# Logs aparecem no console

# Testar endpoints
curl -X GET http://localhost:3001/saas-companies
curl -X GET http://localhost:3001/saas-companies/slug/teste
```

---

## 📦 DEPLOYMENT

### Frontend (Vercel)
```bash
# Deploy automático via GitHub
git push origin main
# Vercel detecta push e faz deploy automaticamente
```

### Backend (Render)
```bash
# Deploy automático via GitHub
git push origin main
# Render detecta push e faz deploy automaticamente
```

### Variáveis de Ambiente
📖 Consulte: `docs/credenciais.md`

---

## ✅ CHECKLIST DE VALIDAÇÃO

Antes de commitar, verifique:

### Código
- [ ] Código segue padrões existentes
- [ ] Sem erros de linting (`npm run lint`)
- [ ] Sem console.log desnecessários
- [ ] Comentários explicativos onde necessário

### Funcionalidade
- [ ] Testado localmente
- [ ] Não quebrou funcionalidades existentes
- [ ] UX/UI consistente com o resto do site
- [ ] Responsivo (mobile + desktop)

### Performance
- [ ] Sem chamadas API desnecessárias
- [ ] Sem loops infinitos
- [ ] Loading states implementados

### Segurança
- [ ] Não expõe dados sensíveis
- [ ] Autenticação/autorização intacta
- [ ] Validação de inputs

---

## 🆘 PROBLEMAS COMUNS

### Erro: "Cannot find module"
```bash
# Solução: Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port already in use"
```bash
# Solução: Matar processo na porta
# Frontend (3000)
npx kill-port 3000
# Backend (3001)
npx kill-port 3001
```

### Erro: "CORS"
```bash
# Solução: Verificar configuração no backend
# Arquivo: server/src/main.ts
# Deve ter: app.enableCors()
```

### Build falha na Vercel
```bash
# Solução: Verificar erros de TypeScript
npm run build
# Corrigir erros antes de push
```

---

## 📚 DOCUMENTOS IMPORTANTES

### Prioridade Alta
1. [API Reference](./API-REFERENCE.md) - Todos os endpoints
2. [JWT Multi-Cliente](./IMPLEMENTAÇÃO%20JWT%20MULTICLIENTE%20.md) - Sistema de autenticação
3. [Estrutura do Projeto](./Estrtura-de-pastas.md) - Arquitetura

### Funcionalidades
- [Home Page](./funcionalidades/home-page.md)
- [Catálogo SAAS](./funcionalidades/catalogo-saas.md)
- [Página Dedicada SAAS](./funcionalidades/pagina-dedicada-saas.md)
- [Header Unificado](./funcionalidades/header-unificado.md)
- [Login Admin](./funcionalidades/login-admin.md)
- [Área do Cliente](./funcionalidades/area-do-cliente.md)
- [Cadastro de SAAS](./funcionalidades/Cadastro-de-SAAS.md)

---

## 💡 PROMPTS ÚTEIS PARA IA

### Análise de Código
```
"Analise o arquivo src/app/(public)/catalogo/page.tsx e explique sua estrutura"

"Liste todas as dependências do componente Header"

"Identifique potenciais problemas de performance em [arquivo]"
```

### Debugging
```
"Por que este endpoint não está retornando dados?"

"Explique o fluxo de autenticação JWT neste sistema"

"Como debugar erro de CORS entre frontend e backend?"
```

### Implementação
```
"Como adicionar um novo filtro no catálogo SAAS?"

"Qual o padrão para criar um novo endpoint no backend?"

"Como adicionar um novo campo no schema SaasCompany?"
```

---

## 🎯 PRINCÍPIOS FUNDAMENTAIS

1. **SIMPLICIDADE** - Prefira soluções simples a complexas
2. **REUSO** - Reutilize código existente sempre que possível
3. **CONSISTÊNCIA** - Siga padrões já estabelecidos
4. **TESTES** - Teste antes de commitar
5. **DOCUMENTAÇÃO** - Documente mudanças significativas

---

**Última atualização:** Janeiro 2025  
**Versão:** 1.0

