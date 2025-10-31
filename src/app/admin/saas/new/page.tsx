'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ChevronLeft, ChevronRight, Save, Check, Building2, Globe, 
  Mail, Phone, MessageCircle, MapPin, Linkedin, Instagram, 
  Twitter, Facebook, Target, TrendingUp, Users, DollarSign,
  Rocket, Briefcase, Award, Calendar, X, Plus, Sparkles,
  AlertCircle, CheckCircle2, Clock
} from 'lucide-react'
import { config } from '@/lib/config'

type FocusType = 'lead-generation' | 'investment-seeking' | 'both'

interface FormData {
  name: string
  category: string
  website: string
  description: string
  logo: string
  focusType: FocusType
  status: 'ativo' | 'inativo' | 'pendente'
  email: string
  phone: string
  whatsapp: string
  city: string
  linkedin: string
  instagram: string
  twitter: string
  facebook: string
  actionType: string
  actionUrl: string
  buttonText: string
  problemsSolved: string
  targetAudience: string
  customerCount: number
  monthlyRevenue: number
  growthRate: number
  foundedYear: number
  employeeCount: number
  headquarters: string
  stage: string
  founders: Array<{
    id: string
    name: string
    position: string
    linkedin: string
  }>
  competitiveAdvantages: string
  successCases: string
}

const CATEGORIES = [
  'Marketing', 'Vendas', 'Atendimento', 'RH', 'Financeiro', 'Produtividade',
  'E-commerce', 'Educação', 'Saúde', 'Logística', 'Tecnologia', 'Outro'
]

const STAGES = [
  { value: 'idea', label: 'Ideia' },
  { value: 'mvp', label: 'MVP' },
  { value: 'growth', label: 'Crescimento' },
  { value: 'scale', label: 'Escala' }
]

export default function NewSaasPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    website: '',
    description: '',
    logo: '',
    focusType: 'lead-generation',
    status: 'pendente',
    email: '',
    phone: '',
    whatsapp: '',
    city: '',
    linkedin: '',
    instagram: '',
    twitter: '',
    facebook: '',
    actionType: 'trial',
    actionUrl: '',
    buttonText: 'Teste Grátis',
    problemsSolved: '',
    targetAudience: '',
    customerCount: 0,
    monthlyRevenue: 0,
    growthRate: 0,
    foundedYear: new Date().getFullYear(),
    employeeCount: 0,
    headquarters: '',
    stage: 'mvp',
    founders: [],
    competitiveAdvantages: '',
    successCases: ''
  })

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addFounder = () => {
    const newFounder = {
      id: Date.now().toString(),
      name: '',
      position: '',
      linkedin: ''
    }
    setFormData(prev => ({
      ...prev,
      founders: [...prev.founders, newFounder]
    }))
  }

  const updateFounder = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      founders: prev.founders.map(f => 
        f.id === id ? { ...f, [field]: value } : f
      )
    }))
  }

  const removeFounder = (id: string) => {
    setFormData(prev => ({
      ...prev,
      founders: prev.founders.filter(f => f.id !== id)
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${config.apiUrl}/saas-companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        alert('✅ Empresa SAAS criada com sucesso!')
        router.push('/admin/saas')
      } else {
        const error = await res.json()
        alert(`❌ Erro: ${error.message || 'Erro ao criar empresa'}`)
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('❌ Erro ao criar empresa SAAS')
    } finally {
      setLoading(false)
    }
  }

  const showLeadFields = formData.focusType === 'lead-generation' || formData.focusType === 'both'
  const showInvestmentFields = formData.focusType === 'investment-seeking' || formData.focusType === 'both'

  const nextStep = () => {
    let nextStepNumber = currentStep + 1
    
    // Pular etapas desnecessárias baseadas no tipo de foco
    if (nextStepNumber === 4 && !showLeadFields) {
      nextStepNumber = 5 // Pular etapa de Leads
    }
    if (nextStepNumber === 5 && !showInvestmentFields) {
      nextStepNumber = 6 // Pular etapa de Investment
    }
    
    if (nextStepNumber <= 6) setCurrentStep(nextStepNumber)
  }

  const prevStep = () => {
    let prevStepNumber = currentStep - 1
    
    // Pular etapas desnecessárias baseadas no tipo de foco (volta)
    if (prevStepNumber === 5 && !showInvestmentFields) {
      prevStepNumber = 4 // Pular etapa de Investment
    }
    if (prevStepNumber === 4 && !showLeadFields) {
      prevStepNumber = 3 // Pular etapa de Leads
    }
    
    if (prevStepNumber >= 1) setCurrentStep(prevStepNumber)
  }

  return (
    <div className="h-full p-6">
      <div className="h-full flex flex-col gap-4 overflow-hidden">
        {/* Header com Stepper */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    Nova Empresa SAAS
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </h1>
                  <p className="text-xs text-gray-500">Preencha os dados para cadastrar</p>
                </div>
              </div>
            </div>
            
            {/* Stepper Horizontal Moderno */}
            <div className="hidden md:flex items-center gap-2">
              {[
                { num: 1, icon: Building2, label: 'Básico' },
                { num: 2, icon: Mail, label: 'Contato' },
                { num: 3, icon: Rocket, label: 'Foco' },
                { num: 4, icon: Target, label: 'Leads' },
                { num: 5, icon: TrendingUp, label: 'Investment' },
                { num: 6, icon: CheckCircle2, label: 'Revisão' }
              ].map((step, idx) => {
                const Icon = step.icon
                const isActive = currentStep === step.num
                const isCompleted = currentStep > step.num
                
                return (
                  <div key={step.num} className="flex items-center">
                    <div className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300
                      ${isActive ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105' : ''}
                      ${isCompleted ? 'bg-green-100 text-green-700' : ''}
                      ${!isActive && !isCompleted ? 'bg-gray-100 text-gray-400' : ''}
                    `}>
                      {isCompleted ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                      <span className="text-xs font-semibold hidden lg:inline">{step.label}</span>
                    </div>
                    {idx < 5 && (
                      <ChevronRight className={`w-4 h-4 mx-1 ${isCompleted ? 'text-green-500' : 'text-gray-300'}`} />
                    )}
                  </div>
                )
              })}
            </div>

            <Link href="/admin/saas">
              <div className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all text-sm font-medium cursor-pointer">
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Cancelar</span>
              </div>
            </Link>
          </div>
          
          {/* Mobile Stepper */}
          <div className="md:hidden mt-3 flex items-center justify-center gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div 
                key={step} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep >= step ? 'bg-gradient-to-r from-blue-600 to-cyan-600 w-12' : 'bg-gray-200 w-8'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content - Layout sem scroll */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-2 min-h-0 overflow-hidden">
          {/* Formulário Moderno */}
          <div className="lg:col-span-2 flex flex-col min-h-0">
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 flex flex-col h-full overflow-hidden">
              {/* Header do Card com gradiente */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1.5 flex items-center justify-between flex-shrink-0">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  {currentStep === 1 && <><Building2 className="w-4 h-4" /> Informações Básicas</>}
                  {currentStep === 2 && <><Mail className="w-4 h-4" /> Contato e Redes Sociais</>}
                  {currentStep === 3 && <><Rocket className="w-4 h-4" /> Tipo de Foco</>}
                  {currentStep === 4 && <><Target className="w-4 h-4" /> Lead Generation</>}
                  {currentStep === 5 && <><TrendingUp className="w-4 h-4" /> Investment Seeking</>}
                  {currentStep === 6 && <><CheckCircle2 className="w-4 h-4" /> Revisão Final</>}
                </h3>
                <span className="px-2 py-1 bg-white/20 rounded-lg text-xs font-semibold text-white">
                  {currentStep}/6
                </span>
              </div>
              
              {/* Conteúdo do formulário - SEM scroll, altura fixa */}
              <div className="flex-1 p-2 overflow-hidden">
                <div className="h-full overflow-hidden">
                  {/* Step 1: Informações Básicas */}
                  {currentStep === 1 && (
                    <div className="h-full flex flex-col gap-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {/* Nome */}
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        Nome da Empresa *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm bg-white"
                        placeholder="Ex: Viral Lead"
                        required
                      />
                    </div>

                    {/* Categoria */}
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Briefcase className="w-4 h-4 text-blue-600" />
                        Categoria *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => updateField('category', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm bg-white"
                        required
                      >
                        <option value="">Selecione uma categoria</option>
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Website */}
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Globe className="w-4 h-4 text-blue-600" />
                        Website *
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => updateField('website', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm bg-white"
                        placeholder="https://empresa.com"
                        required
                      />
                    </div>

                    {/* Logo */}
                    <div className="group md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        Logo da Empresa
                      </label>
                      <div className="flex items-center gap-4">
                        {formData.logo ? (
                          <div className="flex items-center gap-3">
                            <img 
                              src={formData.logo} 
                              alt="Logo" 
                              className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => updateField('logo', '')}
                              className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                            >
                              Remover
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                              <Building2 className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) {
                                    const reader = new FileReader()
                                    reader.onload = (event) => {
                                      updateField('logo', event.target?.result as string)
                                    }
                                    reader.readAsDataURL(file)
                                  }
                                }}
                                className="hidden"
                                id="logo-upload"
                              />
                              <label
                                htmlFor="logo-upload"
                                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-all"
                              >
                                Upload Logo
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  {/* Descrição */}
                  <div className="group md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      Descrição da Empresa *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm bg-white resize-none"
                      placeholder="Conte-nos sobre sua empresa, o que ela faz e quais problemas resolve..."
                      required
                    />
                  </div>
                </div>
                    </div>
                  )}

                  {/* Step 2: Contato */}
                  {currentStep === 2 && (
                    <div className="space-y-5">
                  {/* Informações de Contato */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      Informações de Contato
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="w-4 h-4 text-blue-600" />
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm bg-white"
                          placeholder="contato@empresa.com"
                        />
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Phone className="w-4 h-4 text-blue-600" />
                          Telefone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm bg-white"
                          placeholder="+55 (11) 99999-9999"
                        />
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <MessageCircle className="w-4 h-4 text-green-600" />
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => updateField('whatsapp', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-sm bg-white"
                          placeholder="5511999999999"
                        />
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 text-red-600" />
                          Cidade
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => updateField('city', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm bg-white"
                          placeholder="São Paulo"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Redes Sociais */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      Redes Sociais
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Linkedin className="w-4 h-4 text-blue-700" />
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) => updateField('linkedin', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-700 focus:ring-4 focus:ring-blue-100 transition-all text-sm bg-white"
                          placeholder="linkedin.com/company/empresa"
                        />
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Instagram className="w-4 h-4 text-pink-600" />
                          Instagram
                        </label>
                        <input
                          type="url"
                          value={formData.instagram}
                          onChange={(e) => updateField('instagram', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-pink-600 focus:ring-4 focus:ring-pink-100 transition-all text-sm bg-white"
                          placeholder="instagram.com/empresa"
                        />
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Twitter className="w-4 h-4 text-sky-500" />
                          Twitter / X
                        </label>
                        <input
                          type="url"
                          value={formData.twitter}
                          onChange={(e) => updateField('twitter', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all text-sm bg-white"
                          placeholder="twitter.com/empresa"
                        />
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Facebook className="w-4 h-4 text-blue-600" />
                          Facebook
                        </label>
                        <input
                          type="url"
                          value={formData.facebook}
                          onChange={(e) => updateField('facebook', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-sm bg-white"
                          placeholder="facebook.com/empresa"
                        />
                      </div>
                    </div>
                  </div>
                    </div>
                  )}

                  {/* Step 3: Tipo de Foco */}
                  {currentStep === 3 && (
                    <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-center mb-6">
                    <Rocket className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Qual é o foco da sua empresa?</h3>
                    <p className="text-sm text-gray-600">Escolha o objetivo principal para direcionar melhor sua estratégia</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                    <button
                      type="button"
                      onClick={() => updateField('focusType', 'lead-generation')}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        formData.focusType === 'lead-generation'
                          ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg scale-105'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <Target className={`w-8 h-8 mx-auto mb-3 ${formData.focusType === 'lead-generation' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <div className={`text-lg font-bold mb-2 ${formData.focusType === 'lead-generation' ? 'text-blue-700' : 'text-gray-600'}`}>
                        Leads
                      </div>
                      <div className="text-sm text-gray-500">Atrair clientes e gerar vendas</div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => updateField('focusType', 'investment-seeking')}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        formData.focusType === 'investment-seeking'
                          ? 'border-green-600 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg scale-105'
                          : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
                      }`}
                    >
                      <DollarSign className={`w-8 h-8 mx-auto mb-3 ${formData.focusType === 'investment-seeking' ? 'text-green-600' : 'text-gray-400'}`} />
                      <div className={`text-lg font-bold mb-2 ${formData.focusType === 'investment-seeking' ? 'text-green-700' : 'text-gray-600'}`}>
                        Investment
                      </div>
                      <div className="text-sm text-gray-500">Buscar investidores e capital</div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => updateField('focusType', 'both')}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        formData.focusType === 'both'
                          ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg scale-105'
                          : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                      }`}
                    >
                      <Rocket className={`w-8 h-8 mx-auto mb-3 ${formData.focusType === 'both' ? 'text-purple-600' : 'text-gray-400'}`} />
                      <div className={`text-lg font-bold mb-2 ${formData.focusType === 'both' ? 'text-purple-700' : 'text-gray-600'}`}>
                        Ambos
                      </div>
                      <div className="text-sm text-gray-500">Leads + Investment</div>
                    </button>
                  </div>
                    </div>
                  )}

                  {/* Step 4: Lead Generation */}
                  {currentStep === 4 && showLeadFields && (
                    <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        Tipo de Ação
                      </label>
                      <select
                        value={formData.actionType}
                        onChange={(e) => updateField('actionType', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm bg-white"
                      >
                        <option value="trial">🎁 Teste Grátis</option>
                        <option value="demo">📅 Agendar Demo</option>
                        <option value="contact">💬 Contato</option>
                        <option value="signup">✨ Cadastro</option>
                      </select>
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Globe className="w-4 h-4 text-blue-600" />
                        URL de Ação
                      </label>
                      <input
                        type="url"
                        value={formData.actionUrl}
                        onChange={(e) => updateField('actionUrl', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm bg-white"
                        placeholder="https://empresa.com/trial"
                      />
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Sparkles className="w-4 h-4 text-yellow-600" />
                        Texto do Botão
                      </label>
                      <input
                        type="text"
                        value={formData.buttonText}
                        onChange={(e) => updateField('buttonText', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm bg-white"
                        placeholder="Teste Grátis"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      Público-Alvo
                    </label>
                    <input
                      type="text"
                      value={formData.targetAudience}
                      onChange={(e) => updateField('targetAudience', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-sm bg-white"
                      placeholder="E-commerce, Startups, PMEs, Agências..."
                    />
                  </div>

                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Award className="w-4 h-4 text-orange-600" />
                      Problemas que Resolve
                    </label>
                    <textarea
                      value={formData.problemsSolved}
                      onChange={(e) => updateField('problemsSolved', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-sm bg-white resize-none"
                      placeholder="Liste os principais problemas que sua solução resolve para os clientes..."
                    />
                  </div>
                    </div>
                  )}

                  {/* Step 5: Investment Seeking */}
                  {currentStep === 5 && showInvestmentFields && (
                    <div className="space-y-4 overflow-y-auto max-h-full pr-2">
                  {/* Métricas */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      Métricas de Crescimento
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          Clientes
                        </label>
                        <input
                          type="number"
                          value={formData.customerCount}
                          onChange={(e) => updateField('customerCount', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm bg-white"
                          placeholder="150"
                        />
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          Receita/mês (R$)
                        </label>
                        <input
                          type="number"
                          value={formData.monthlyRevenue}
                          onChange={(e) => updateField('monthlyRevenue', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-sm bg-white"
                          placeholder="50000"
                        />
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          Crescimento %
                        </label>
                        <input
                          type="number"
                          value={formData.growthRate}
                          onChange={(e) => updateField('growthRate', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-sm bg-white"
                          placeholder="15"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Informações da Empresa */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-600" />
                      Informações da Empresa
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          Ano de Fundação
                        </label>
                        <input
                          type="number"
                          value={formData.foundedYear}
                          onChange={(e) => updateField('foundedYear', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm bg-white"
                          placeholder="2020"
                        />
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Users className="w-4 h-4 text-purple-600" />
                          Funcionários
                        </label>
                        <input
                          type="number"
                          value={formData.employeeCount}
                          onChange={(e) => updateField('employeeCount', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-sm bg-white"
                          placeholder="10"
                        />
                      </div>

                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 text-red-600" />
                          Sede
                        </label>
                        <input
                          type="text"
                          value={formData.headquarters}
                          onChange={(e) => updateField('headquarters', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all text-sm bg-white"
                          placeholder="São Paulo, SP"
                        />
                      </div>
                    </div>

                    {/* Estágio */}
                    <div className="mt-3">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Rocket className="w-4 h-4 text-orange-600" />
                        Estágio da Empresa
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {STAGES.map(stage => (
                          <button
                            key={stage.value}
                            type="button"
                            onClick={() => updateField('stage', stage.value)}
                            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                              formData.stage === stage.value
                                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {stage.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Fundadores */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyan-600" />
                        Fundadores
                      </h4>
                      <button
                        type="button"
                        onClick={addFounder}
                        className="flex items-center gap-1 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md"
                      >
                        <Plus className="w-4 h-4" />
                        Adicionar
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.founders.map((founder) => (
                        <div key={founder.id} className="p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <input
                              type="text"
                              value={founder.name}
                              onChange={(e) => updateFounder(founder.id, 'name', e.target.value)}
                              className="px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all text-sm bg-white"
                              placeholder="Nome completo"
                            />
                            <input
                              type="text"
                              value={founder.position}
                              onChange={(e) => updateFounder(founder.id, 'position', e.target.value)}
                              className="px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all text-sm bg-white"
                              placeholder="Cargo (CEO, CTO...)"
                            />
                            <div className="flex gap-2">
                              <input
                                type="url"
                                value={founder.linkedin}
                                onChange={(e) => updateFounder(founder.id, 'linkedin', e.target.value)}
                                className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all text-sm bg-white"
                                placeholder="LinkedIn URL"
                              />
                              <button
                                type="button"
                                onClick={() => removeFounder(founder.id)}
                                className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Diferenciais e Cases */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Award className="w-4 h-4 text-yellow-600" />
                        Diferenciais Competitivos
                      </label>
                      <textarea
                        value={formData.competitiveAdvantages}
                        onChange={(e) => updateField('competitiveAdvantages', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all text-sm bg-white resize-none"
                        placeholder="O que diferencia seu SAAS da concorrência..."
                      />
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Sparkles className="w-4 h-4 text-green-600" />
                        Cases de Sucesso
                      </label>
                      <textarea
                        value={formData.successCases}
                        onChange={(e) => updateField('successCases', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-sm bg-white resize-none"
                        placeholder="Descreva casos de sucesso de clientes..."
                      />
                    </div>
                  </div>
                    </div>
                  )}

                  {/* Step 6: Revisão */}
                  {currentStep === 6 && (
                    <div className="space-y-4">
                  {/* Preview do Card como será na Home */}
                  <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        {formData.logo ? (
                          <img 
                            src={formData.logo} 
                            alt="Logo" 
                            className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white text-sm font-bold">
                            {formData.name.charAt(0).toUpperCase() || '?'}
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 mb-1">{formData.name || 'Nome da Empresa'}</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                            {formData.category || 'Categoria'}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {formData.description || 'Descrição não informada...'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <h5 className="font-bold">Tudo pronto!</h5>
                    </div>
                    <p className="text-sm text-green-700">
                      Revise as informações e clique em <strong>"Criar Empresa"</strong> para finalizar o cadastro.
                    </p>
                  </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Lateral Moderno */}
          <div className="lg:col-span-1 flex flex-col min-h-0">
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <h3 className="text-sm font-bold text-white">Preview em Tempo Real</h3>
              </div>
              
              <div className="flex-1 p-4 overflow-hidden flex flex-col gap-3">
                {/* Card Preview */}
                <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 rounded-xl p-3 border-2 border-blue-200 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    {formData.logo ? (
                      <img 
                        src={formData.logo} 
                        alt="Logo" 
                        className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {formData.name.charAt(0).toUpperCase() || '?'}
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-bold text-gray-900 leading-tight">
                        {formData.name || 'Nome da Empresa'}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md text-xs font-semibold w-fit bg-blue-100 text-blue-700">
                        {formData.category || 'Categoria'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-700 mb-2 line-clamp-2">
                    {formData.description || 'Aguardando descrição...'}
                  </p>
                  
                  
                </div>

                {/* Dica Contextual */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 border-2 border-amber-200">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-800 leading-relaxed">
                      <strong className="block mb-1">Dica:</strong>
                      {currentStep === 1 && 'Um nome claro e memorável ajuda clientes a lembrarem da sua empresa.'}
                      {currentStep === 2 && 'Adicione o máximo de formas de contato para facilitar a comunicação.'}
                      {currentStep === 3 && 'Escolha o foco principal da sua empresa para direcionar a estratégia.'}
                      {currentStep === 4 && 'Destaque os benefícios e problemas resolvidos para atrair mais leads.'}
                      {currentStep === 5 && 'Métricas sólidas e transparentes aumentam a confiança dos investidores.'}
                      {currentStep === 6 && 'Revise todos os dados antes de finalizar o cadastro.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Moderno com Botões de Navegação */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 px-4 py-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 text-sm font-semibold text-gray-700"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg text-sm font-bold text-blue-700">
                Etapa {currentStep} de 6
              </span>
            </div>

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!formData.name || !formData.category || !formData.website || !formData.description)) ||
                  (currentStep === 2 && (!formData.email || !formData.phone)) ||
                  (currentStep === 3 && !formData.focusType)
                  // Etapas 4 e 5 são opcionais, sem validação obrigatória
                }
                className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-lg"
              >
                <span className="hidden sm:inline">Próximo</span>
                <span className="sm:hidden">Avançar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Criar Empresa</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}