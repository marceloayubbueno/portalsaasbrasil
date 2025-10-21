import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SaasCompanyDocument = SaasCompany & Document;

// Schema para fundadores
@Schema({ _id: false })
export class Founder {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  linkedin?: string;

  @Prop({ required: true })
  position: string;
}

export const FounderSchema = SchemaFactory.createForClass(Founder);

@Schema({ timestamps: true })
export class SaasCompany {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @Prop({ required: false, default: '' })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  website: string;

  @Prop({ required: false })
  logo?: string;

  @Prop({ required: true, enum: ['ativo', 'inativo', 'pendente'], default: 'pendente' })
  status: string;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  reviewCount: number;

  @Prop({ type: [String], default: [] })
  tags: string[];

  // Informações de Contato
  @Prop({ required: false })
  email?: string;

  @Prop({ required: false })
  phone?: string;

  @Prop({ required: false })
  address?: string;

  @Prop({ required: false })
  city?: string;

  @Prop({ required: false })
  state?: string;

  @Prop({ required: false })
  country?: string;

  @Prop({ required: false })
  whatsapp?: string;

  // Redes Sociais
  @Prop({ required: false })
  linkedin?: string;

  @Prop({ required: false })
  twitter?: string;

  @Prop({ required: false })
  instagram?: string;

  @Prop({ required: false })
  facebook?: string;

  // Tipo de Foco
  @Prop({ required: false, enum: ['lead-generation', 'investment-seeking', 'both'] })
  focusType?: string;

  // Lead Generation
  @Prop({ required: false })
  actionType?: string;

  @Prop({ required: false })
  actionUrl?: string;

  @Prop({ required: false })
  buttonText?: string;

  @Prop({ required: false })
  problemsSolved?: string;

  @Prop({ required: false })
  targetAudience?: string;

  // Investment Seeking
  @Prop({ default: 0 })
  customerCount?: number;

  @Prop({ default: 0 })
  monthlyRevenue?: number;

  @Prop({ default: 0 })
  growthRate?: number;

  @Prop({ default: 0 })
  churnRate?: number;

  @Prop({ default: 0 })
  foundedYear?: number;

  @Prop({ default: 0 })
  employeeCount?: number;

  @Prop({ required: false })
  headquarters?: string;

  @Prop({ required: false })
  stage?: string;

  @Prop({ type: [FounderSchema], default: [] })
  founders: Founder[];

  @Prop({ required: false })
  competitiveAdvantages?: string;

  @Prop({ required: false })
  successCases?: string;

  @Prop({ required: false })
  integrations?: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;

  // Campos de Autenticação
  @Prop({ required: false, select: false })
  password?: string;

  @Prop({ required: false })
  lastLogin?: Date;
}

export const SaasCompanySchema = SchemaFactory.createForClass(SaasCompany);

SaasCompanySchema.index({ slug: 1 }, { unique: true });
SaasCompanySchema.index({ name: 'text', description: 'text', category: 'text' });
