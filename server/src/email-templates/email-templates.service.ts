import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EmailTemplate, EmailTemplateDocument } from './entities/email-template.schema';
import { EmailConfig, EmailConfigDocument } from './entities/email-config.schema';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';
import { CreateEmailConfigDto } from './dto/create-email-config.dto';
import { UpdateEmailConfigDto } from './dto/update-email-config.dto';
import { MailService } from '../common/mail.service';

@Injectable()
export class EmailTemplatesService {
  constructor(
    @InjectModel(EmailTemplate.name) private emailTemplateModel: Model<EmailTemplateDocument>,
    @InjectModel(EmailConfig.name) private emailConfigModel: Model<EmailConfigDocument>,
    private mailService: MailService,
  ) {}

  // ===== EMAIL TEMPLATES =====

  async create(createEmailTemplateDto: CreateEmailTemplateDto): Promise<EmailTemplate> {
    const template = new this.emailTemplateModel(createEmailTemplateDto);
    return template.save();
  }

  async findAll(clientId?: string, type?: string): Promise<{ templates: EmailTemplate[]; total: number }> {
    console.log('🔍 [BACKEND] findAll chamado com clientId:', clientId);
    console.log('🔍 [BACKEND] findAll chamado com type:', type);
    
    const filter: any = {};
    
    if (clientId) {
      console.log('🔍 [BACKEND] ClientId original:', clientId);
      console.log('🔍 [BACKEND] ClientId é ObjectId válido?', Types.ObjectId.isValid(clientId));
      
      // Tentar buscar tanto como ObjectId quanto como string
      const objectIdFilter = { clientId: new Types.ObjectId(clientId) };
      const stringFilter = { clientId: clientId };
      
      console.log('🔍 [BACKEND] Tentando buscar com ObjectId filter:', objectIdFilter);
      console.log('🔍 [BACKEND] Tentando buscar com string filter:', stringFilter);
      
      // Primeiro, tentar com ObjectId
      let templates = await this.emailTemplateModel
        .find(objectIdFilter)
        .populate('clientId', 'companyName accessEmail')
        .sort({ createdAt: -1 })
        .exec();
      
      console.log('🔍 [BACKEND] Templates encontrados com ObjectId:', templates.length);
      
      // Se não encontrou nada, tentar com string
      if (templates.length === 0) {
        console.log('🔍 [BACKEND] Nenhum template encontrado com ObjectId, tentando com string...');
        templates = await this.emailTemplateModel
          .find(stringFilter)
          .populate('clientId', 'companyName accessEmail')
          .sort({ createdAt: -1 })
          .exec();
        
        console.log('🔍 [BACKEND] Templates encontrados com string:', templates.length);
      }
      
      // Se ainda não encontrou, tentar sem filtro de clientId para ver se há templates
      if (templates.length === 0) {
        console.log('🔍 [BACKEND] Nenhum template encontrado, verificando se há templates no banco...');
        const allTemplates = await this.emailTemplateModel.find({}).limit(5).exec();
        console.log('🔍 [BACKEND] Total de templates no banco (primeiros 5):', allTemplates.length);
        if (allTemplates.length > 0) {
          console.log('🔍 [BACKEND] Exemplo de template no banco:', {
            _id: allTemplates[0]._id,
            name: allTemplates[0].name,
            clientId: allTemplates[0].clientId,
            type: allTemplates[0].type
          });
        }
      }
      
      // Aplicar filtro de tipo se especificado
      if (type && templates.length > 0) {
        templates = templates.filter(t => t.type === type);
        console.log('🔍 [BACKEND] Templates após filtro de tipo:', templates.length);
      }
      
      const total = templates.length;
      console.log('🔍 [BACKEND] Total final:', total);
      
      return { templates, total };
    }
    
    // Se não tem clientId, buscar todos
    console.log('🔍 [BACKEND] Buscando todos os templates (sem clientId)');
    
    const templates = await this.emailTemplateModel
      .find({})
      .populate('clientId', 'companyName accessEmail')
      .sort({ createdAt: -1 })
      .exec();
    
    console.log('🔍 [BACKEND] Total de templates encontrados:', templates.length);
    
    return { templates, total: templates.length };
  }

  async findOne(id: string): Promise<EmailTemplate> {
    const template = await this.emailTemplateModel
      .findById(id)
      .populate('clientId', 'companyName accessEmail')
      .exec();

    if (!template) {
      throw new NotFoundException('Template de e-mail não encontrado');
    }

    return template;
  }

  async update(id: string, updateEmailTemplateDto: UpdateEmailTemplateDto): Promise<EmailTemplate> {
    const template = await this.emailTemplateModel
      .findByIdAndUpdate(id, updateEmailTemplateDto, { new: true })
      .populate('clientId', 'companyName accessEmail')
      .exec();

    if (!template) {
      throw new NotFoundException('Template de e-mail não encontrado');
    }

    return template;
  }

  async remove(id: string): Promise<void> {
    const result = await this.emailTemplateModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException('Template de e-mail não encontrado');
    }
  }

  async updateStatus(id: string, status: string): Promise<EmailTemplate> {
    const template = await this.emailTemplateModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .populate('clientId', 'companyName accessEmail')
      .exec();

    if (!template) {
      throw new NotFoundException('Template de e-mail não encontrado');
    }

    return template;
  }

  async sendTestEmail(id: string, testEmail: string): Promise<{ success: boolean; message: string }> {
    const template = await this.findOne(id);
    const config = await this.findConfigByClientId(template.clientId.toString());

    if (!config || config.status !== 'active') {
      throw new BadRequestException('Configuração de e-mail não encontrada ou inativa');
    }

    try {
      await this.mailService.sendMail({
        to: testEmail,
        subject: template.subject || 'Teste de E-mail',
        html: template.htmlContent,
      });

      return { success: true, message: 'E-mail de teste enviado com sucesso' };
    } catch (error) {
      throw new BadRequestException(`Erro ao enviar e-mail de teste: ${error.message}`);
    }
  }

  // ===== EMAIL CONFIG =====

  async createConfig(createEmailConfigDto: CreateEmailConfigDto): Promise<EmailConfig> {
    // Verificar se já existe configuração para este cliente
    const existingConfig = await this.emailConfigModel.findOne({ 
      clientId: createEmailConfigDto.clientId 
    }).exec();

    if (existingConfig) {
      throw new BadRequestException('Já existe uma configuração de e-mail para este cliente');
    }

    const config = new this.emailConfigModel(createEmailConfigDto);
    return config.save();
  }

  async findConfigByClientId(clientId: string): Promise<EmailConfig> {
    const config = await this.emailConfigModel
      .findOne({ clientId: new Types.ObjectId(clientId) })
      .populate('clientId', 'companyName accessEmail')
      .exec();

    if (!config) {
      throw new NotFoundException('Configuração de e-mail não encontrada');
    }

    return config;
  }

  async updateConfig(clientId: string, updateEmailConfigDto: UpdateEmailConfigDto): Promise<EmailConfig> {
    const config = await this.emailConfigModel
      .findOneAndUpdate(
        { clientId: new Types.ObjectId(clientId) },
        updateEmailConfigDto,
        { new: true }
      )
      .populate('clientId', 'companyName accessEmail')
      .exec();

    if (!config) {
      throw new NotFoundException('Configuração de e-mail não encontrada');
    }

    return config;
  }

  async testConfig(clientId: string, testEmail: string): Promise<{ success: boolean; message: string }> {
    const config = await this.findConfigByClientId(clientId);

    try {
      // Criar transporter temporário para teste
      const testTransporter = require('nodemailer').createTransporter({
        host: config.smtpHost,
        port: config.smtpPort,
        secure: config.isSecure,
        auth: {
          user: config.smtpUser,
          pass: config.smtpPassword,
        },
      });

      await testTransporter.sendMail({
        from: `"${config.fromName}" <${config.fromEmail}>`,
        to: testEmail,
        subject: 'Teste de Configuração SMTP',
        html: '<h1>Teste de Configuração</h1><p>Se você recebeu este e-mail, a configuração SMTP está funcionando corretamente.</p>',
      });

      // Atualizar status do teste
      await this.emailConfigModel.findOneAndUpdate(
        { clientId: new Types.ObjectId(clientId) },
        { 
          testSuccess: true, 
          lastTestAt: new Date() 
        }
      );

      return { success: true, message: 'Teste de configuração realizado com sucesso' };
    } catch (error) {
      // Atualizar status do teste
      await this.emailConfigModel.findOneAndUpdate(
        { clientId: new Types.ObjectId(clientId) },
        { 
          testSuccess: false, 
          lastTestAt: new Date() 
        }
      );

      throw new BadRequestException(`Erro no teste de configuração: ${error.message}`);
    }
  }

  // ===== MÉTODOS AUXILIARES =====

  async getDefaultTemplate(clientId: string, type: string): Promise<EmailTemplate | null> {
    return this.emailTemplateModel
      .findOne({ 
        clientId: new Types.ObjectId(clientId), 
        type, 
        isDefault: true,
        status: 'active'
      })
      .exec();
  }

  async incrementEmailsSent(id: string): Promise<void> {
    await this.emailTemplateModel.findByIdAndUpdate(id, {
      $inc: { emailsSent: 1 },
      lastSentAt: new Date()
    }).exec();
  }
} 