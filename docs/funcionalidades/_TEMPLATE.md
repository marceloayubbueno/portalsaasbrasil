# [NOME DA FUNCIONALIDADE]

> **Última atualização:** [DATA]  
> **Versão:** 1.0  
> **Status:** ✅ Ativo | 🚧 Em Desenvolvimento | ⚠️ Requer Atenção

---

## 🎯 PARA STAKEHOLDERS

### O que faz
[Descrição concisa em 2-3 linhas sobre o que esta funcionalidade faz]

### Por que existe
[Objetivo de negócio: qual problema resolve]

### Quando usar
- [Caso de uso 1]
- [Caso de uso 2]
- [Caso de uso 3]

---

## 🏗️ ARQUITETURA RESUMIDA

### Frontend
| Arquivo | Descrição | Responsabilidade |
|---------|-----------|------------------|
| `src/caminho/arquivo.tsx` | [Descrição] | [O que faz] |
| `src/components/Component.tsx` | [Descrição] | [O que faz] |

### Backend
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/endpoint` | GET | [Descrição] |
| `/endpoint/:id` | PUT | [Descrição] |

### Database
| Schema | Campos Relevantes | Propósito |
|--------|-------------------|-----------|
| `SaasCompany` | `status`, `focusType` | [Propósito] |

---

## 🔧 PARA IA: CONTEXTO DE MANUTENÇÃO

### Arquivos Críticos

#### 1. `src/caminho/arquivo.tsx` - COMPONENTE PRINCIPAL
```typescript
// Código de exemplo dos pontos mais importantes
const [state, setState] = useState(...)

// ⚠️ NÃO MODIFICAR: Lógica crítica (linhas X-Y)
// ✅ MODIFICÁVEL: Esta seção pode ser ajustada
```

**Responsabilidades:**
- [Responsabilidade 1]
- [Responsabilidade 2]

**Dependências:**
- [Componente A]
- [Hook B]
- [API C]

---

### Endpoints Utilizados

#### `GET /endpoint`
```typescript
// Request
fetch('http://localhost:3001/endpoint')

// Response
{
  "data": [...],
  "total": 10
}
```

**Quando usar:** [Contexto]  
**Filtros aplicados:** [No frontend | No backend]

---

### Fluxo de Dados

```
[Usuário] → [Componente] → [API] → [Service] → [MongoDB]
                ↓
         [Estado Local]
                ↓
          [Renderização]
```

---

### Como Testar

#### Teste Funcional
```bash
# 1. Iniciar desenvolvimento
npm run dev

# 2. Acessar URL
http://localhost:3000/caminho

# 3. Verificar
- [ ] [Checklist item 1]
- [ ] [Checklist item 2]
- [ ] [Checklist item 3]
```

#### Teste de Integração
```bash
# Backend
cd server
npm run dev

# Testar endpoint
curl http://localhost:3001/endpoint
```

---

### Restauração Rápida

#### Se algo quebrou:
```bash
# Ver histórico de mudanças
git log --oneline src/caminho/arquivo.tsx

# Restaurar versão anterior
git checkout [hash] src/caminho/arquivo.tsx

# Ou reverter último commit
git revert HEAD
```

#### Dependências problemáticas:
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

### Prompts para IA

Use estes prompts para manutenção rápida:

```
"Analise src/caminho/arquivo.tsx e explique a lógica de [funcionalidade]"

"Liste todos os endpoints usados em [funcionalidade]"

"Verifique se há erros de linting em [arquivo]"

"Explique o fluxo de dados em [funcionalidade]"
```

---

## 🚨 PONTOS DE ATENÇÃO

### Não Modificar
- [ ] [Seção crítica 1]
- [ ] [Lógica de autenticação]
- [ ] [Padrões de nomenclatura]

### Padrões do Sistema
- **CSS:** Tailwind classes (não inline styles)
- **Estado:** useState + useEffect (não Redux)
- **API:** fetch (não axios)
- **Autenticação:** JWT multi-cliente (ver `JWT-MULTICLIENTE-README.md`)

### Problemas Conhecidos
- [Problema 1 + solução]
- [Problema 2 + solução]

---

## 📊 MÉTRICAS DE SUCESSO

- **Performance:** [Métrica]
- **UX:** [Métrica]
- **Conversão:** [Métrica]

---

## 🔗 DOCUMENTOS RELACIONADOS

- [Funcionalidade relacionada 1](./outra-funcionalidade.md)
- [API Reference](../API-REFERENCE.md)
- [Guia de Manutenção](../GUIA-IA-MANUTENCAO.md)

---

## 📝 CHANGELOG

### v1.0 - [DATA]
- ✅ Implementação inicial
- ✅ Testes funcionais
- ✅ Documentação completa

