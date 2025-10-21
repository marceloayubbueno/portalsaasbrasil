import mongoose, { Schema, model, models } from 'mongoose'

export interface IFounder {
  id: string
  name: string
  linkedin?: string
  position: string
}

export interface ISaasCompany {
  _id?: string
  name: string
  slug: string
  description: string
  category: string
  website: string
  logo?: string
  status: 'ativo' | 'inativo' | 'pendente'
  views: number
  featured: boolean
  rating: number
  reviewCount: number
  tags: string[]
  
  // Contato
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  country?: string
  whatsapp?: string
  
  // Redes Sociais
  linkedin?: string
  twitter?: string
  instagram?: string
  facebook?: string
  
  // Tipo de Foco
  focusType?: 'lead-generation' | 'investment-seeking' | 'both'
  
  // Lead Generation
  actionType?: string
  actionUrl?: string
  buttonText?: string
  problemsSolved?: string
  targetAudience?: string
  
  // Investment Seeking
  customerCount?: number
  monthlyRevenue?: number
  growthRate?: number
  churnRate?: number
  foundedYear?: number
  employeeCount?: number
  headquarters?: string
  stage?: string
  founders: IFounder[]
  competitiveAdvantages?: string
  successCases?: string
  integrations?: string
  
  // Timestamps
  createdAt?: Date
  updatedAt?: Date
  
  // Auth
  password?: string
  lastLogin?: Date
}

const FounderSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  linkedin: { type: String },
  position: { type: String, required: true },
}, { _id: false })

const SaasCompanySchema = new Schema<ISaasCompany>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, default: '' },
  category: { type: String, required: true },
  website: { type: String, required: true },
  logo: { type: String },
  status: { type: String, enum: ['ativo', 'inativo', 'pendente'], default: 'pendente' },
  views: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  tags: { type: [String], default: [] },
  
  // Contato
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  whatsapp: { type: String },
  
  // Redes Sociais
  linkedin: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  facebook: { type: String },
  
  // Tipo de Foco
  focusType: { type: String, enum: ['lead-generation', 'investment-seeking', 'both'] },
  
  // Lead Generation
  actionType: { type: String },
  actionUrl: { type: String },
  buttonText: { type: String },
  problemsSolved: { type: String },
  targetAudience: { type: String },
  
  // Investment Seeking
  customerCount: { type: Number, default: 0 },
  monthlyRevenue: { type: Number, default: 0 },
  growthRate: { type: Number, default: 0 },
  churnRate: { type: Number, default: 0 },
  foundedYear: { type: Number, default: 0 },
  employeeCount: { type: Number, default: 0 },
  headquarters: { type: String },
  stage: { type: String },
  founders: { type: [FounderSchema], default: [] },
  competitiveAdvantages: { type: String },
  successCases: { type: String },
  integrations: { type: String },
  
  // Auth
  password: { type: String, select: false },
  lastLogin: { type: Date },
}, {
  timestamps: true,
})

SaasCompanySchema.index({ slug: 1 }, { unique: true })
SaasCompanySchema.index({ name: 'text', description: 'text', category: 'text' })

export default models.SaasCompany || model<ISaasCompany>('SaasCompany', SaasCompanySchema)



