# 📱 FUNCIONALIDADE WHATSAPP - MVP SIMPLIFICADO

**Versão**: 17.0  
**Status**: REESTRUTURAÇÃO - Foco em Frontend Primeiro  
**Última Atualização**: 2025-01-04  

---

## 🗓️ **CRONOGRAMA EXECUTIVO**

### **DIA 1: FRONTEND - ÁREA ADMIN** ✅ CONCLUÍDO
- [x] **1.1** Analisar estrutura existente (`admin/pages/whatsapp-config.html`)
- [x] **1.2** Identificar funcionalidades já implementadas
- [x] **1.3** Documentar o que está funcionando

### **DIA 2: FRONTEND - ÁREA CLIENTE** ✅ CONCLUÍDO
- [x] **2.1** Simplificar `client/pages/whatsapp-config.html` (apenas campos essenciais)
- [x] **2.2** Simplificar `client/js/whatsapp/config.js` (apenas funcionalidades essenciais)
- [x] **2.3** Testar interface simplificada

### **DIA 3: BACKEND - SCHEMAS** ✅ CONCLUÍDO
- [x] **3.1** Simplificar `WhatsAppClientConfig` schema
- [x] **3.2** Manter `WhatsAppConfig`, `WhatsAppMessage`, `WhatsAppTemplate`
- [x] **3.3** Testar compatibilidade

### **DIA 4: BACKEND - SERVICES** ✅ CONCLUÍDO
- [x] **4.1** Simplificar `WhatsAppClientService`
- [x] **4.2** Manter `WhatsAppAdminService`, `WhatsAppService`
- [x] **4.3** Testar services

### **DIA 5: BACKEND - CONTROLLERS** ✅ CONCLUÍDO
- [x] **5.1** Simplificar `WhatsAppClientController`
- [x] **5.2** Manter `WhatsAppAdminController`, `WhatsAppController`
- [x] **5.3** Testar endpoints

### **DIA 6: FLUXOS DE MENSAGENS - FRONTEND** 📅 PENDENTE
- [ ] **6.1** Criar `client/pages/whatsapp-flows.html` (interface de fluxos)
- [ ] **6.2** Criar `client/js/whatsapp/flows.js` (lógica de fluxos)
- [ ] **6.3** Implementar gatilhos automáticos (indicador criado, lead criado)
- [ ] **6.4** Testar interface de fluxos

### **DIA 7: FLUXOS DE MENSAGENS - BACKEND** 📅 PENDENTE
- [ ] **7.1** Atualizar `WhatsAppFlow` schema (gatilhos automáticos)
- [ ] **7.2** Criar `WhatsAppFlowService` (lógica de execução)
- [ ] **7.3** Implementar sistema de gatilhos automáticos
- [ ] **7.4** Testar execução de fluxos

### **DIA 8: INTEGRAÇÃO COM CAMPANHAS** 📅 PENDENTE
- [ ] **8.1** Atualizar `Campaign` schema (incluir fluxos)
- [ ] **8.2** Modificar `CampaignsService` (integrar fluxos)
- [ ] **8.3** Atualizar interface de criação de campanhas
- [ ] **8.4** Testar integração campanha-fluxo

### **DIA 9: TESTES E VALIDAÇÃO** 📅 PENDENTE
- [ ] **9.1** Testar fluxos automáticos
- [ ] **9.2** Testar integração com campanhas
- [ ] **9.3** Validar gatilhos e execução
- [ ] **9.4** Testes em produção

### **DIA 10: DEPLOY E DOCUMENTAÇÃO** 📅 PENDENTE
- [ ] **10.1** Deploy final
- [ ] **10.2** Documentação completa
- [ ] **10.3** Guias de uso
- [ ] **10.4** Treinamento

---

## 🎯 **FUNCIONALIDADES DEFINIDAS**

### **🔧 ÁREA ADMIN**
1. **Configuração de API** ✅ JÁ FUNCIONANDO
   - Configuração Gupshup
   - Teste de conexão
   - Configuração de preços

### **👤 ÁREA CLIENTE**
1. **Configuração da Empresa** ✅ SIMPLIFICADO
   - Nome da empresa
   - Descrição do negócio
   - Status ativo/inativo

2. **Envio de Mensagens** ✅ SIMPLIFICADO
   - Envio de mensagens simples
   - Histórico de mensagens
   - Status de entrega

3. **Fluxos de Mensagens** 📅 PENDENTE
   - **Gatilhos Automáticos:**
     - `indicator_joined` - Quando um indicador for criado
     - `lead_indicated` - Quando um lead for indicado
     - `lead_converted` - Quando um lead for convertido
     - `reward_earned` - Quando uma recompensa for ganha
   - **Templates de Mensagens:**
     - Templates pré-definidos
     - Templates personalizados
     - Variáveis dinâmicas
   - **Fluxos Automatizados:**
     - Sequência de mensagens
     - Delays configuráveis
     - Condições de envio
   - **Agendamento:**
     - Envio programado
     - Horários específicos
     - Dias da semana

4. **Integração com Campanhas** 📅 PENDENTE
   - **Seleção de Fluxos:**
     - Lista de fluxos disponíveis
     - Associação a campanhas
     - Configuração por campanha
   - **Execução Automática:**
     - Fluxos ativados por campanha
     - Gatilhos baseados em campanha
     - Estatísticas por campanha

5. **Estatísticas** 📅 PENDENTE
   - Mensagens enviadas
   - Taxa de entrega
   - Relatórios por fluxo
   - Relatórios por campanha

---

## 🎨 **FRONTEND - ESTRUTURA ATUAL**

### **✅ ÁREA ADMIN - JÁ FUNCIONANDO**
```
admin/
├── pages/
│   └── whatsapp-config.html ✅ FUNCIONANDO
└── js/
    └── whatsapp-admin.js ✅ FUNCIONANDO
```

### **🔄 ÁREA CLIENTE - SIMPLIFICANDO**
```
client/
├── pages/
│   ├── whatsapp-config.html ✅ SIMPLIFICADO
│   ├── whatsapp-templates.html 📅 PENDENTE
│   ├── whatsapp-flows.html 📅 PENDENTE
│   ├── whatsapp-statistics.html 📅 PENDENTE
│   └── campaign-flows.html 📅 PENDENTE
└── js/
    └── whatsapp/
        ├── config.js ✅ SIMPLIFICADO
        ├── templates.js 📅 PENDENTE
        ├── flows.js 📅 PENDENTE
        ├── statistics.js 📅 PENDENTE
        └── campaign-flows.js 📅 PENDENTE
```

---

## 🔄 **DIA 6: FLUXOS DE MENSAGENS - FRONTEND**

### **OBJETIVO**
Implementar interface completa para gestão de fluxos de mensagens com gatilhos automáticos.

### **TAREFAS**

#### **6.1 CRIAR `client/pages/whatsapp-flows.html`**
**FUNCIONALIDADES:**
- Lista de fluxos existentes
- Criação de novos fluxos
- Edição de fluxos
- Ativação/desativação
- Visualização de estatísticas

**GATILHOS AUTOMÁTICOS:**
- `indicator_joined` - Indicador se juntou
- `lead_indicated` - Lead foi indicado
- `lead_converted` - Lead foi convertido
- `reward_earned` - Recompensa ganha

#### **6.2 CRIAR `client/js/whatsapp/flows.js`**
**FUNCIONALIDADES:**
- Carregar fluxos existentes
- Criar novo fluxo
- Editar fluxo existente
- Configurar gatilhos
- Configurar mensagens
- Configurar delays
- Testar fluxo

#### **6.3 IMPLEMENTAR GATILHOS AUTOMÁTICOS**
**INTEGRAÇÃO:**
- Hook no `ParticipantsService` (indicador criado)
- Hook no `ReferralsService` (lead indicado)
- Hook no `CampaignsService` (lead convertido)
- Hook no `RewardsService` (recompensa ganha)

#### **6.4 TESTAR INTERFACE**
- Validar criação de fluxos
- Testar gatilhos automáticos
- Verificar execução de mensagens

---

## 🔄 **DIA 7: FLUXOS DE MENSAGENS - BACKEND**

### **OBJETIVO**
Implementar backend para execução automática de fluxos baseados em gatilhos.

### **TAREFAS**

#### **7.1 ATUALIZAR `WhatsAppFlow` SCHEMA**
**NOVOS CAMPOS:**
```typescript
@Prop({ type: [String], default: [] })
triggers: string[]; // ['indicator_joined', 'lead_indicated', 'lead_converted', 'reward_earned']

@Prop({ type: Object })
triggerConditions: {
  indicator_joined?: {
    enabled: boolean;
    filters?: {
      minIndications?: number;
      maxIndications?: number;
      indicatorHasRewards?: boolean;
    };
  };
  lead_indicated?: {
    enabled: boolean;
    filters?: {
      status?: string[];
      source?: string[];
    };
  };
  lead_converted?: {
    enabled: boolean;
    filters?: {
      conversionType?: string[];
    };
  };
  reward_earned?: {
    enabled: boolean;
    filters?: {
      minValue?: number;
      rewardType?: string[];
    };
  };
};
```

#### **7.2 CRIAR `WhatsAppFlowService`**
**FUNCIONALIDADES:**
- `executeFlow(flowId: string, trigger: string, data: any)`
- `processTrigger(trigger: string, data: any)`
- `sendFlowMessage(flowId: string, messageIndex: number, recipient: string)`
- `validateTriggerConditions(flow: WhatsAppFlow, trigger: string, data: any)`

#### **7.3 IMPLEMENTAR SISTEMA DE GATILHOS**
**HOOKS:**
```typescript
// ParticipantsService - indicador criado
async createIndicator(data: any) {
  const indicator = await this.participantModel.create(data);
  
  // Trigger fluxos
  await this.whatsappFlowService.processTrigger('indicator_joined', {
    indicatorId: indicator._id,
    indicatorName: indicator.name,
    indicatorEmail: indicator.email,
    clientId: indicator.clientId
  });
  
  return indicator;
}

// ReferralsService - lead indicado
async createReferral(data: any) {
  const referral = await this.referralModel.create(data);
  
  // Trigger fluxos
  await this.whatsappFlowService.processTrigger('lead_indicated', {
    referralId: referral._id,
    leadName: referral.leadName,
    leadEmail: referral.leadEmail,
    indicatorId: referral.indicatorId,
    clientId: referral.clientId
  });
  
  return referral;
}
```

#### **7.4 TESTAR EXECUÇÃO**
- Testar gatilhos automáticos
- Validar execução de fluxos
- Verificar envio de mensagens

---

## 🔄 **DIA 8: INTEGRAÇÃO COM CAMPANHAS**

### **OBJETIVO**
Integrar fluxos de WhatsApp com o sistema de campanhas existente.

### **TAREFAS**

#### **8.1 ATUALIZAR `Campaign` SCHEMA**
**NOVOS CAMPOS:**
```typescript
@Prop({ type: [Types.ObjectId], ref: 'WhatsAppFlow', default: [] })
whatsappFlows?: Types.ObjectId[];

@Prop({ type: Object })
whatsappConfig?: {
  enabled: boolean;
  flowsEnabled: boolean;
  defaultFlowId?: Types.ObjectId;
  customFlows?: Array<{
    flowId: Types.ObjectId;
    trigger: string;
    conditions?: any;
  }>;
};
```

#### **8.2 MODIFICAR `CampaignsService`**
**NOVAS FUNCIONALIDADES:**
- `assignFlowsToCampaign(campaignId: string, flowIds: string[])`
- `removeFlowsFromCampaign(campaignId: string, flowIds: string[])`
- `getCampaignFlows(campaignId: string)`
- `executeCampaignFlows(campaignId: string, trigger: string, data: any)`

#### **8.3 ATUALIZAR INTERFACE DE CRIAÇÃO DE CAMPANHAS**
**NOVOS CAMPOS:**
- Seleção de fluxos disponíveis
- Configuração de gatilhos por campanha
- Ativação/desativação de fluxos
- Visualização de fluxos associados

#### **8.4 TESTAR INTEGRAÇÃO**
- Testar associação de fluxos
- Validar execução por campanha
- Verificar estatísticas integradas

---

## ⚙️ **BACKEND - ESTRUTURA ATUAL**

### **✅ SCHEMAS - MANTER**
```
server/src/whatsapp/entities/
├── whatsapp-config.schema.ts ✅ MANTER
├── whatsapp-message.schema.ts ✅ MANTER
├── whatsapp-template.schema.ts ✅ MANTER
├── whatsapp-client-config.schema.ts ✅ SIMPLIFICADO
└── whatsapp-flow.schema.ts 🔄 ATUALIZAR
```

### **✅ SERVICES - MANTER**
```
server/src/whatsapp/
├── admin/
│   └── whatsapp-admin.service.ts ✅ MANTER
├── client/
│   └── whatsapp-client.service.ts ✅ SIMPLIFICADO (INTEGRADO COM TWILIO)
└── providers/                    # ✅ NOVA ESTRUTURA LIMPA
    ├── twilio.service.ts         # ✅ IMPLEMENTADO (integração Twilio)
    ├── evolution.service.ts      # 🔮 FUTURO (após Twilio funcionando)
    └── meta.service.ts           # 🔮 FUTURO (após Twilio funcionando)
```

### **✅ CONTROLLERS - MANTER**
```
server/src/whatsapp/
├── admin/
│   └── whatsapp-admin.controller.ts ✅ MANTER
├── client/
│   └── whatsapp-client.controller.ts ✅ SIMPLIFICADO
└── providers/                    # ✅ NOVA ESTRUTURA LIMPA
    ├── twilio.controller.ts       # ✅ IMPLEMENTADO (endpoints Twilio)
    ├── evolution.controller.ts    # 🔮 FUTURO (após Twilio funcionando)
    └── meta.controller.ts         # 🔮 FUTURO (após Twilio funcionando)
```

### **✅ DTOs - MANTER**
```
server/src/whatsapp/providers/    # ✅ NOVA ESTRUTURA LIMPA
├── twilio-config.dto.ts          # ✅ IMPLEMENTADO (validação Twilio)
├── evolution-config.dto.ts       # 🔮 FUTURO (após Twilio funcionando)
└── meta-config.dto.ts            # 🔮 FUTURO (após Twilio funcionando)
```

---

## 🎯 **ESTRATÉGIA DE IMPLEMENTAÇÃO - TWILIO PRIMEIRO**

### **✅ FASE ATUAL: TWILIO (PRIORIDADE MÁXIMA)**
1. **Implementar e testar** integração Twilio completa
2. **Validar** envio de mensagens via Twilio
3. **Testar** configuração e conexão Twilio
4. **Garantir** que Twilio está 100% funcional

### **🔮 FASES FUTURAS (APÓS TWILIO FUNCIONANDO)**
1. **FASE 2**: Meta Business API (oficial, recursos avançados)
2. **FASE 3**: Outras APIs conforme necessidade

### **🎯 PRÓXIMOS PASSOS (HOJE - DIA 6)**
1. **Focar em Twilio** (estável e confiável)
2. **Testar** integração Twilio no backend
3. **Validar** envio de mensagens
4. **Preparar** para Meta Business API futura

## 🏗️ **NOVA ESTRUTURA DE PASTAS - LIMPA E ORGANIZADA**

### **✅ ESTRUTURA ATUAL (LIMPA E ORGANIZADA)**
```
whatsapp/
├── entities/              # ✅ Schemas únicos (whatsapp-config, client-config, message, flow, template)
├── providers/             # ✅ Integrações com APIs externas
│   ├── twilio-config.dto.ts
│   ├── twilio.controller.ts
│   └── twilio.service.ts
├── client/                # ✅ Área do cliente (frontend)
│   ├── whatsapp-client.controller.ts
│   ├── whatsapp-client.service.ts
│   ├── whatsapp-client-templates.controller.ts
│   └── whatsapp-client-templates.service.ts
├── admin/                 # ✅ Área administrativa (backend)
│   ├── whatsapp-admin.controller.ts
│   └── whatsapp-admin.service.ts
└── whatsapp.module.ts     # ✅ Módulo principal
```

### **🎯 BENEFÍCIOS DA NOVA ESTRUTURA**

#### **✅ ORGANIZAÇÃO CLARA**
- **`entities/`**: Schemas únicos do MongoDB
- **`providers/`**: Integrações com APIs externas (Twilio, Evolution, Meta)
- **`client/`**: Funcionalidades para área do cliente
- **`admin/`**: Funcionalidades administrativas

#### **✅ MÁXIMO REAPROVEITAMENTO**
- **Um serviço principal** (`whatsapp-client.service.ts`) para todas as funcionalidades
- **Providers isolados** para cada API externa
- **Sem duplicação** de código entre áreas

#### **✅ FACILIDADE DE MANUTENÇÃO**
- **Mudanças em um lugar só** para funcionalidades principais
- **APIs isoladas** para manutenção independente
- **Estrutura escalável** para novas integrações

#### **✅ PERFORMANCE OTIMIZADA**
- **Sem arquivos redundantes**
- **Imports limpos** e organizados
- **Carregamento eficiente** de módulos

### **AMANHÃ (DIA 7)**
1. **Implementar backend de fluxos**
2. **Criar sistema de gatilhos**
3. **Testar execução automática**

### **PRÓXIMOS DIAS**
1. **DIA 8**: Integração com campanhas
2. **DIA 9**: Testes e validação
3. **DIA 10**: Deploy e documentação

---

## 📊 **STATUS ATUAL**

### **✅ CONCLUÍDO**
- ✅ Análise completa do código existente
- ✅ Identificação de funcionalidades para reaproveitar
- ✅ Documentação do que será mantido vs simplificado
- ✅ Estrutura do projeto mapeada
- ✅ Frontend - Área Admin simplificada
- ✅ Frontend - Área Cliente simplificada
- ✅ Backend - Schemas simplificados
- ✅ Backend - Services simplificados
- ✅ Backend - Controllers simplificados
- ✅ **ESTRUTURA DE PASTAS LIMPA E ORGANIZADA** 🆕

### **🔄 EM ANDAMENTO**
- 🔄 Fluxos de mensagens (DIA 6-7)
- 🔄 Integração com campanhas (DIA 8)

### **📅 PENDENTE**
- 📅 Testes e validação (DIA 9)
- 📅 Deploy final (DIA 10)
- 📅 Documentação final (DIA 10)

---

**Status: DIAS 1-5 CONCLUÍDOS ✅ - INICIANDO FLUXOS E CAMPANHAS** 