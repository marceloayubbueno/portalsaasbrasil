import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtSaasAuthGuard extends AuthGuard('jwt-saas') {
  private readonly logger = new Logger(JwtSaasAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await super.canActivate(context);
    
    if (!result) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Validação do usuário SAAS
    if (!user?.userId) {
      this.logger.error('Token JWT não contém userId - possível tentativa de acesso não autorizado');
      throw new UnauthorizedException('Token inválido - userId não encontrado');
    }

    // Log de segurança para auditoria
    this.logger.debug(`SAAS autenticado: ${user.userId} - Email: ${user.email}`);

    return true;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.error('Falha na autenticação JWT SAAS:', { error: err?.message, info: info?.message });
      throw err || new UnauthorizedException('Token inválido ou expirado');
    }
    return user;
  }
}

