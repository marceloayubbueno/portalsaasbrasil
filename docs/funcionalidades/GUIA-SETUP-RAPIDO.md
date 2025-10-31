# 🚀 GUIA DE SETUP RÁPIDO - PORTAL SAAS BRASIL

## ✅ CONFIGURAÇÕES ATUALIZADAS

### **1. Backend (server/.env)**
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/portalsaas
SUPER_ADMIN_EMAIL=admin@portalsaas.com.br
SUPER_ADMIN_PASSWORD=Admin@2024
```

### **2. Frontend (portalsaas/)**
```env
API_URL: http://localhost:3001
CLIENT_URL: http://localhost:3000
```

---

## 🔧 PASSO A PASSO PARA RODAR

### **PASSO 1: MongoDB**

**Opção A - MongoDB Local:**
```bash
# Verificar se MongoDB está rodando
mongosh

# Se não estiver, iniciar:
# Windows: Iniciar serviço MongoDB
net start MongoDB
```

**Opção B - MongoDB Atlas (Cloud):**
1. Acesse: https://cloud.mongodb.com
2. Crie cluster gratuito
3. Copie a connection string
4. Cole em `server/.env` na variável `MONGODB_URI`

---

### **PASSO 2: Iniciar Backend**

```bash
cd server
npm install
npm run start:dev
```

**✅ Sucesso quando ver:**
```
[BOOT] 🚀 Backend rodando na porta 3001
✅ Super Admin criado: admin@portalsaas.com.br
🔐 Senha: Admin@2024
```

---

### **PASSO 3: Iniciar Frontend**

```bash
cd portalsaas
npm install
npm run dev
```

**✅ Sucesso quando ver:**
```
ready - started server on 0.0.0.0:3000
```

---

## 🔗 ACESSAR O SISTEMA

### **Login Admin:**
```
URL: http://localhost:3000/admin/login
Email: admin@portalsaas.com.br
Senha: Admin@2024
```

### **Homepage:**
```
URL: http://localhost:3000
```

---

## ⚠️ PROBLEMAS COMUNS

### **Erro: MONGODB_URI not found**
- Verifique se o arquivo `server/.env` existe
- Verifique se MongoDB está rodando

### **Erro: Port 3001 already in use**
```bash
# Windows: Matar processo na porta 3001
netstat -ano | findstr :3001
taskkill /PID [PID_NUMBER] /F
```

### **Erro: Cannot connect to MongoDB**
```bash
# Verificar se MongoDB está rodando
mongosh

# Se não conectar, instalar MongoDB:
# https://www.mongodb.com/try/download/community
```

---

## 📊 ARQUITETURA ATUAL

```
┌─────────────────────────────────────────┐
│  Frontend Next.js (porta 3000)          │
│  - Homepage                             │
│  - Admin Login                          │
│  - Admin Dashboard                      │
└──────────────┬──────────────────────────┘
               │
               │ HTTP Requests
               ▼
┌─────────────────────────────────────────┐
│  Backend NestJS (porta 3001)            │
│  - API Routes                           │
│  - JWT Authentication                   │
│  - Super Admin Seed                     │
└──────────────┬──────────────────────────┘
               │
               │ Mongoose
               ▼
┌─────────────────────────────────────────┐
│  MongoDB (porta 27017)                  │
│  - Database: portalsaas                 │
│  - Collections: admins, products, etc   │
└─────────────────────────────────────────┘
```

---

## ✅ CHECKLIST DE VALIDAÇÃO

- [ ] MongoDB rodando (porta 27017)
- [ ] Backend rodando (porta 3001)
- [ ] Frontend rodando (porta 3000)
- [ ] Super Admin criado automaticamente
- [ ] Login admin funcionando
- [ ] Dashboard admin acessível

---

## 🎯 PRÓXIMOS PASSOS

1. ✅ **Login funcionando** - CONCLUÍDO
2. 🔄 **Adaptar CRUD de produtos para SAAS** - EM ANDAMENTO
3. 📝 **Criar formulário de cadastro SAAS**
4. 🏠 **Conectar homepage com backend**
5. 🧪 **Testar fluxo completo**

---

**Última atualização:** $(Get-Date -Format "dd/MM/yyyy HH:mm")

