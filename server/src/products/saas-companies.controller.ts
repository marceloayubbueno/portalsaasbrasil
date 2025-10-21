import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { SaasCompaniesService } from './saas-companies.service';
import { CreateSaasCompanyDto, UpdateSaasCompanyDto } from './saas-company.dto';
import { JwtSaasAuthGuard } from '../auth/guards/jwt-saas-auth.guard';

@Controller('saas-companies')
export class SaasCompaniesController {
  constructor(private readonly saasCompaniesService: SaasCompaniesService) {}

  @Post()
  async create(@Body() createSaasCompanyDto: CreateSaasCompanyDto) {
    console.log('📝 Dados recebidos:', JSON.stringify(createSaasCompanyDto, null, 2));
    console.log('📝 Tipo dos dados:', typeof createSaasCompanyDto);
    console.log('📝 Keys dos dados:', Object.keys(createSaasCompanyDto));
    
    try {
      const result = await this.saasCompaniesService.create(createSaasCompanyDto);
      console.log('✅ Empresa criada com sucesso:', result);
      return result;
    } catch (error) {
      console.error('❌ Erro ao criar empresa:', error);
      throw error;
    }
  }

  @Get()
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.saasCompaniesService.findAll(page, limit);
  }

  // Endpoints para SAAS autenticado - DEVEM vir ANTES dos endpoints com parâmetros
  @Get('me')
  @UseGuards(JwtSaasAuthGuard)
  async getProfile(@Request() req) {
    return req.user.saasCompany.toJSON();
  }

  @Put('me')
  @UseGuards(JwtSaasAuthGuard)
  async updateProfile(@Request() req, @Body() updateDto: UpdateSaasCompanyDto) {
    console.log('🔧 [SAAS-PROFILE-UPDATE] User ID:', req.user.userId);
    console.log('🔧 [SAAS-PROFILE-UPDATE] Update DTO:', JSON.stringify(updateDto, null, 2));
    
    try {
      const result = await this.saasCompaniesService.update(req.user.userId, updateDto);
      console.log('✅ [SAAS-PROFILE-UPDATE] Success');
      return result;
    } catch (error) {
      console.error('❌ [SAAS-PROFILE-UPDATE] Error:', error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.saasCompaniesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSaasCompanyDto: UpdateSaasCompanyDto) {
    return this.saasCompaniesService.update(id, updateSaasCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.saasCompaniesService.remove(id);
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: string) {
    return this.saasCompaniesService.findByCategory(category);
  }

  @Put(':id/view')
  async incrementViews(@Param('id') id: string) {
    return this.saasCompaniesService.incrementViews(id);
  }

  // Endpoints para SAAS autenticado
  @Post('register')
  async register(@Body() registerDto: any) {
    return this.saasCompaniesService.register(registerDto);
  }

  // Endpoints para home page
  @Get('featured/leads')
  async getFeaturedLeads(@Query('limit') limit: number = 12) {
    return this.saasCompaniesService.getFeaturedByType(['lead-generation', 'both'], limit);
  }

  @Get('featured/investment')
  async getFeaturedInvestment(@Query('limit') limit: number = 12) {
    return this.saasCompaniesService.getFeaturedByType(['investment-seeking', 'both'], limit);
  }

  // Endpoint para buscar por slug (página dedicada)
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.saasCompaniesService.findBySlug(slug);
  }

  // Endpoint para incrementar views
  @Put('slug/:slug/view')
  async incrementViewsBySlug(@Param('slug') slug: string) {
    return this.saasCompaniesService.incrementViewsBySlug(slug);
  }
}
