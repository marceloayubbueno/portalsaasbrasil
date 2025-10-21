import { IsString, IsNumber, IsOptional, IsArray, IsEnum } from 'class-validator';

export class FounderDto {
  id: string;
  name: string;
  linkedin?: string;
  position: string;
}

export class CreateSaasCompanyDto {
  name: string;
  description?: string;
  category: string;
  website: string;
  logo?: string;
  status?: string;
  
  // Autenticação
  @IsOptional()
  @IsString()
  password?: string;
  
  // Informações de Contato
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  whatsapp?: string;
  
  // Redes Sociais
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  
  // Tipo de Foco
  focusType?: string;
  
  // Lead Generation
  @IsOptional()
  @IsString()
  actionType?: string;
  @IsOptional()
  @IsString()
  actionUrl?: string;
  @IsOptional()
  @IsString()
  buttonText?: string;
  @IsOptional()
  @IsString()
  problemsSolved?: string;
  @IsOptional()
  @IsString()
  targetAudience?: string;
  
  // Investment Seeking
  @IsOptional()
  @IsNumber()
  customerCount?: number;
  @IsOptional()
  @IsNumber()
  monthlyRevenue?: number;
  @IsOptional()
  @IsNumber()
  growthRate?: number;
  @IsOptional()
  @IsNumber()
  churnRate?: number;
  @IsOptional()
  @IsNumber()
  foundedYear?: number;
  @IsOptional()
  @IsNumber()
  employeeCount?: number;
  @IsOptional()
  @IsString()
  headquarters?: string;
  @IsOptional()
  @IsString()
  stage?: string;
  @IsOptional()
  @IsArray()
  founders?: FounderDto[];
  @IsOptional()
  @IsString()
  competitiveAdvantages?: string;
  @IsOptional()
  @IsString()
  successCases?: string;
  @IsOptional()
  @IsString()
  integrations?: string;
  
  // SEO (mantido para compatibilidade)
  @IsOptional()
  @IsString()
  metaTitle?: string;
  @IsOptional()
  @IsString()
  metaDescription?: string;
  @IsOptional()
  @IsArray()
  tags?: string[];
}

export class UpdateSaasCompanyDto {
  @IsOptional()
  @IsString()
  name?: string;
  
  @IsOptional()
  @IsString()
  description?: string;
  
  @IsOptional()
  @IsString()
  category?: string;
  
  @IsOptional()
  @IsString()
  website?: string;
  
  @IsOptional()
  @IsString()
  logo?: string;
  
  @IsOptional()
  @IsEnum(['ativo', 'inativo', 'pendente'])
  status?: string;
  
  // Informações de Contato
  @IsOptional()
  @IsString()
  email?: string;
  
  @IsOptional()
  @IsString()
  phone?: string;
  
  @IsOptional()
  @IsString()
  address?: string;
  
  @IsOptional()
  @IsString()
  city?: string;
  
  @IsOptional()
  @IsString()
  state?: string;
  
  @IsOptional()
  @IsString()
  country?: string;
  
  @IsOptional()
  @IsString()
  whatsapp?: string;
  
  // Redes Sociais
  @IsOptional()
  @IsString()
  linkedin?: string;
  
  @IsOptional()
  @IsString()
  twitter?: string;
  
  @IsOptional()
  @IsString()
  instagram?: string;
  
  @IsOptional()
  @IsString()
  facebook?: string;
  
  // Tipo de Foco
  @IsOptional()
  @IsEnum(['lead-generation', 'investment-seeking', 'both', 'lead', 'investment'])
  focusType?: string;
  
  // Lead Generation
  @IsOptional()
  @IsString()
  actionType?: string;
  @IsOptional()
  @IsString()
  actionUrl?: string;
  @IsOptional()
  @IsString()
  buttonText?: string;
  @IsOptional()
  @IsString()
  problemsSolved?: string;
  @IsOptional()
  @IsString()
  targetAudience?: string;
  
  // Investment Seeking
  @IsOptional()
  @IsNumber()
  customerCount?: number;
  @IsOptional()
  @IsNumber()
  monthlyRevenue?: number;
  @IsOptional()
  @IsNumber()
  growthRate?: number;
  @IsOptional()
  @IsNumber()
  churnRate?: number;
  @IsOptional()
  @IsNumber()
  foundedYear?: number;
  @IsOptional()
  @IsNumber()
  employeeCount?: number;
  @IsOptional()
  @IsString()
  headquarters?: string;
  @IsOptional()
  @IsString()
  stage?: string;
  @IsOptional()
  @IsArray()
  founders?: FounderDto[];
  @IsOptional()
  @IsString()
  competitiveAdvantages?: string;
  @IsOptional()
  @IsString()
  successCases?: string;
  @IsOptional()
  @IsString()
  integrations?: string;
  
  // SEO (mantido para compatibilidade)
  @IsOptional()
  @IsString()
  metaTitle?: string;
  @IsOptional()
  @IsString()
  metaDescription?: string;
  @IsOptional()
  @IsArray()
  tags?: string[];
}
