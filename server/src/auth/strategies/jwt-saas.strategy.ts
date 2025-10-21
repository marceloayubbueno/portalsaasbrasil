import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaasCompany } from '../../products/entities/product.schema';

@Injectable()
export class JwtSaasStrategy extends PassportStrategy(Strategy, 'jwt-saas') {
  constructor(
    @InjectModel(SaasCompany.name) private saasCompanyModel: Model<SaasCompany>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'sua-chave-secreta-aqui',
    });
  }

  async validate(payload: any) {
    console.log('[JWT-SAAS] Validando payload:', payload);
    
    // Validação do payload
    if (!payload.sub) {
      throw new UnauthorizedException('Token inválido - dados incompletos');
    }

    console.log('[JWT-SAAS] Buscando SAAS com ID:', payload.sub);
    const saasCompany = await this.saasCompanyModel.findById(payload.sub);
    
    if (!saasCompany) {
      console.log('[JWT-SAAS] ❌ SAAS não encontrado');
      throw new UnauthorizedException('Empresa SAAS não encontrada');
    }

    console.log('[JWT-SAAS] ✅ SAAS encontrado:', saasCompany.name, 'Status:', saasCompany.status);

    // Verificar se o SAAS está ativo ou pendente (permitir acesso para ambos)
    if (!['ativo', 'pendente'].includes(saasCompany.status)) {
      console.log('[JWT-SAAS] ❌ SAAS com status inválido:', saasCompany.status);
      throw new UnauthorizedException(`SAAS inativo (status: ${saasCompany.status}). Entre em contato com o suporte.`);
    }

    console.log('[JWT-SAAS] ✅ Validação completa, retornando user object');

    // Retorna objeto user com dados do SAAS (seguindo padrão do cliente)
    return {
      saasId: payload.sub,
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      slug: payload.slug,
      saasCompany: saasCompany // Objeto completo para casos específicos
    };
  }
}

