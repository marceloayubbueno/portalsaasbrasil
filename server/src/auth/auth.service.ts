import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { UsuarioAdmin } from '../admins/entities/usuario-admin.schema';
import { SaasCompany } from '../products/entities/product.schema';
import { MailService } from '../common/mail.service';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(UsuarioAdmin.name) private usuarioAdminModel: Model<UsuarioAdmin>,
    @InjectModel(SaasCompany.name) private saasCompanyModel: Model<SaasCompany>,
    private mailService: MailService,
  ) {}

  async loginAdmin(loginDto: LoginDto) {
    console.log('[AUTH] 🔐 Tentativa de login:', loginDto.email);
    const admin = await this.usuarioAdminModel.findOne({ email: loginDto.email.toLowerCase(), ativo: true }).select('+senha');
    console.log('[AUTH] Admin encontrado:', !!admin);
    if (!admin) {
      console.log('[AUTH] ❌ Admin não encontrado');
      throw new UnauthorizedException('Credenciais inválidas');
    }
    console.log('[AUTH] Comparando senhas...');
    console.log('[AUTH] Senha fornecida:', loginDto.password);
    console.log('[AUTH] Hash no banco:', admin.senha);
    const senhaCorreta = await bcrypt.compare(loginDto.password, admin.senha);
    console.log('[AUTH] Senha correta:', senhaCorreta);
    if (!senhaCorreta) {
      console.log('[AUTH] ❌ Senha incorreta');
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload = { email: admin.email, sub: admin._id, role: admin.role };
    const { senha, ...adminSemSenha } = admin.toObject();
    console.log('[AUTH] ✅ Login bem-sucedido');
    return {
      access_token: this.jwtService.sign(payload),
      admin: adminSemSenha
    };
  }

  async listAdmins() {
    return await this.usuarioAdminModel.find({}, '-senha');
  }

  // 🚀 NOVO: Bootstrap do primeiro admin (só funciona se não houver nenhum admin)
  async bootstrapFirstAdmin(createAdminDto: any) {
    // Verificar se já existem admins
    const adminCount = await this.usuarioAdminModel.countDocuments();
    
    if (adminCount > 0) {
      throw new UnauthorizedException('Sistema já possui administradores. Use login normal.');
    }

    // Criar primeiro admin
    const { nome, email, senha, telefone } = createAdminDto;
    
    if (!nome || !email || !senha) {
      throw new UnauthorizedException('Nome, email e senha são obrigatórios');
    }

    const hash = await bcrypt.hash(senha, 10);
    const admin = new this.usuarioAdminModel({
      nome,
      email: email.toLowerCase(),
      senha: hash,
      telefone: telefone || '',
      role: 'superadmin',
      ativo: true,
      superadmin: true
    });

    await admin.save();
    
    const { senha: _, ...adminSemSenha } = admin.toObject();
    
    return {
      success: true,
      message: 'Primeiro administrador criado com sucesso! Sistema inicializado.',
      admin: adminSemSenha
    };
  }

  async loginSaas(loginDto: LoginDto) {
    const saasCompany = await this.saasCompanyModel.findOne({ 
      email: loginDto.email.toLowerCase() 
    }).select('+password');
    
    if (!saasCompany) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (!saasCompany.password) {
      console.log('[AUTH-SAAS] ❌ SAAS sem senha cadastrada');
      throw new UnauthorizedException('Senha não cadastrada. Entre em contato com o suporte.');
    }

    const senhaCorreta = await bcrypt.compare(loginDto.password, saasCompany.password);
    
    if (!senhaCorreta) {
      console.log('[AUTH-SAAS] ❌ Senha incorreta');
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Atualizar último login
    await this.saasCompanyModel.findByIdAndUpdate(saasCompany._id, {
      lastLogin: new Date()
    });

    const payload = { 
      sub: saasCompany._id, 
      email: saasCompany.email, 
      role: 'saas',
      slug: saasCompany.slug
    };

    const token = this.jwtService.sign(payload);
    
    return {
      access_token: token,
      user: {
        id: saasCompany._id,
        name: saasCompany.name,
        slug: saasCompany.slug,
        email: saasCompany.email,
        status: saasCompany.status
      }
    };
  }

  /**
   * 📧 Solicitar recuperação de senha
   */
  async requestPasswordReset(email: string) {
    const saasCompany = await this.saasCompanyModel.findOne({ 
      email: email.toLowerCase() 
    });

    // Verificar se email existe
    if (!saasCompany) {
      throw new NotFoundException('Email não cadastrado em nosso sistema');
    }

    // Gerar token único de 32 bytes
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hora

    // Salvar token no banco
    saasCompany.passwordResetToken = resetToken;
    saasCompany.passwordResetExpires = resetExpires;
    await saasCompany.save();

    // Enviar email
    try {
      await this.mailService.sendPasswordResetEmail(saasCompany.email as string, resetToken);
      console.log(`[AUTH] ✅ Email de recuperação enviado para: ${saasCompany.email}`);
    } catch (error) {
      console.error('[AUTH] ❌ Erro ao enviar email:', error.message);
      // Continuar mesmo se falhar (não revelar erro)
    }

    return {
      success: true,
      message: 'Instruções para redefinir sua senha foram enviadas para seu email'
    };
  }

  /**
   * 🔐 Redefinir senha com token
   */
  async resetPassword(token: string, newPassword: string) {
    if (!newPassword || newPassword.length < 6) {
      throw new BadRequestException('Senha deve ter no mínimo 6 caracteres');
    }

    // Buscar empresa com o token válido
    const saasCompany = await this.saasCompanyModel.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() }
    });

    if (!saasCompany) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar senha e limpar token
    saasCompany.password = hashedPassword;
    saasCompany.passwordResetToken = undefined;
    saasCompany.passwordResetExpires = undefined;
    await saasCompany.save();

    console.log(`[AUTH] ✅ Senha redefinida para: ${saasCompany.email}`);

    return {
      success: true,
      message: 'Senha redefinida com sucesso'
    };
  }
} 