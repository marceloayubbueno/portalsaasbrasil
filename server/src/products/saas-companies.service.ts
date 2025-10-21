import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaasCompany, SaasCompanyDocument } from './entities/product.schema';
import { CreateSaasCompanyDto, UpdateSaasCompanyDto } from './saas-company.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SaasCompaniesService {
  constructor(
    @InjectModel(SaasCompany.name) private saasCompanyModel: Model<SaasCompanyDocument>,
    private jwtService: JwtService,
  ) {}

  async create(createSaasCompanyDto: CreateSaasCompanyDto): Promise<SaasCompany> {
    console.log('🔧 Service - Dados recebidos:', createSaasCompanyDto);
    
    // Validar se os dados foram recebidos
    if (!createSaasCompanyDto || !createSaasCompanyDto.name) {
      throw new Error('Dados da empresa não foram recebidos corretamente');
    }

    // Hash da senha se vier no DTO
    if (createSaasCompanyDto.password) {
      console.log('🔐 Hasheando senha...');
      createSaasCompanyDto.password = await bcrypt.hash(createSaasCompanyDto.password, 10);
    }

    // Gerar slug único baseado no nome
    let baseSlug = createSaasCompanyDto.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    // Se o slug estiver vazio, usar um padrão
    if (!baseSlug) {
      baseSlug = 'empresa-saas';
    }

    // Verificar se o slug já existe e adicionar sufixo se necessário
    let slug = baseSlug;
    let counter = 1;
    
    while (await this.saasCompanyModel.findOne({ slug }).exec()) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    console.log('🔧 Service - Slug gerado:', slug);

    const createdSaasCompany = new this.saasCompanyModel({
      ...createSaasCompanyDto,
      slug,
    });

    return createdSaasCompany.save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ companies: SaasCompany[], total: number, page: number, totalPages: number }> {
    const skip = (page - 1) * limit;
    
    const [companies, total] = await Promise.all([
      this.saasCompanyModel
        .find({ status: { $in: ['ativo', 'pendente'] } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.saasCompanyModel.countDocuments({ status: { $in: ['ativo', 'pendente'] } })
    ]);

    return {
      companies,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async findOne(id: string): Promise<SaasCompany> {
    const company = await this.saasCompanyModel.findById(id).exec();
    if (!company) {
      throw new NotFoundException('Empresa SAAS não encontrada');
    }
    return company;
  }

  async findByCategory(category: string): Promise<SaasCompany[]> {
    return this.saasCompanyModel
      .find({ category, status: 'ativo' })
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(id: string, updateSaasCompanyDto: UpdateSaasCompanyDto): Promise<SaasCompany> {
    const company = await this.saasCompanyModel.findByIdAndUpdate(
      id,
      updateSaasCompanyDto,
      { new: true }
    ).exec();

    if (!company) {
      throw new NotFoundException('Empresa SAAS não encontrada');
    }

    return company;
  }

  async remove(id: string): Promise<void> {
    const result = await this.saasCompanyModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Empresa SAAS não encontrada');
    }
  }

  async incrementViews(id: string): Promise<SaasCompany> {
    const company = await this.saasCompanyModel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).exec();

    if (!company) {
      throw new NotFoundException('Empresa SAAS não encontrada');
    }

    return company;
  }

  async register(registerDto: any) {
    console.log('[SAAS-REGISTER] 🔐 Tentativa de registro:', registerDto.email);
    
    // Verificar se email já existe
    const existingSaas = await this.saasCompanyModel.findOne({ 
      email: registerDto.email.toLowerCase() 
    });
    
    if (existingSaas) {
      throw new ConflictException('Email já cadastrado');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Gerar slug único
    let baseSlug = registerDto.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    if (!baseSlug) {
      baseSlug = 'empresa-saas';
    }

    let slug = baseSlug;
    let counter = 1;
    
    while (await this.saasCompanyModel.findOne({ slug }).exec()) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Criar SAAS
    const saasCompany = new this.saasCompanyModel({
      name: registerDto.name,
      email: registerDto.email.toLowerCase(),
      phone: registerDto.phone,
      website: registerDto.website,
      category: registerDto.category,
      password: hashedPassword,
      slug,
      status: 'pendente',
      description: 'Descrição será preenchida no perfil',
    });

    const savedSaas = await saasCompany.save();

    // Gerar JWT
    const payload = { 
      sub: savedSaas._id, 
      email: savedSaas.email, 
      role: 'saas',
      slug: savedSaas.slug
    };

    const token = this.jwtService.sign(payload);

    console.log('[SAAS-REGISTER] ✅ Registro bem-sucedido');

    return {
      success: true,
      token,
      saasCompany: {
        id: savedSaas._id,
        name: savedSaas.name,
        slug: savedSaas.slug,
        email: savedSaas.email,
        status: savedSaas.status
      },
      message: 'Cadastro realizado! Complete seu perfil.'
    };
  }

  async findByEmail(email: string) {
    return this.saasCompanyModel.findOne({ 
      email: email.toLowerCase() 
    }).select('+password');
  }

  async getFeaturedByType(focusTypes: string[], limit: number = 12) {
    // Mapear valores antigos para novos
    const mappedFocusTypes = focusTypes.map(type => {
      if (type === 'lead-generation') return ['lead-generation', 'lead'];
      if (type === 'investment-seeking') return ['investment-seeking', 'investment'];
      return type;
    }).flat();

    return this.saasCompanyModel
      .find({
        status: 'ativo',
        focusType: { $in: mappedFocusTypes }
      })
      .sort({ views: -1, createdAt: -1 })
      .limit(limit)
      .select('-password')
      .exec();
  }

  async findBySlug(slug: string) {
    const company = await this.saasCompanyModel
      .findOne({ slug })
      .select('-password')
      .exec();
    
    if (!company) {
      throw new NotFoundException('Empresa SAAS não encontrada');
    }
    
    return company;
  }

  async incrementViewsBySlug(slug: string) {
    return this.saasCompanyModel
      .findOneAndUpdate(
        { slug },
        { $inc: { views: 1 } },
        { new: true }
      )
      .exec();
  }
}
