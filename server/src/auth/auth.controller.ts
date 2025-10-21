import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SuperAdminSeedService } from '../admins/seed-superadmin';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly superAdminSeedService: SuperAdminSeedService
  ) {}

  @Post('admin-login')
  @HttpCode(HttpStatus.OK)
  async adminLogin(@Body() loginDto: LoginDto) {
    return this.authService.loginAdmin(loginDto);
  }

  @Post('bootstrap-admin')
  @HttpCode(HttpStatus.OK)
  async bootstrapAdmin(@Body() createAdminDto: any) {
    return this.authService.bootstrapFirstAdmin(createAdminDto);
  }


  @Post('saas-login')
  @HttpCode(HttpStatus.OK)
  async saasLogin(@Body() loginDto: LoginDto) {
    return this.authService.loginSaas(loginDto);
  }

  @Get('admins')
  async listAdmins() {
    return this.authService.listAdmins();
  }

  // 🚀 NOVO: Endpoint para recriar Super Admin (uso emergencial)
  @Post('recreate-super-admin')
  @HttpCode(HttpStatus.OK)
  async recreateSuperAdmin(@Body() recreateDto: { confirmacao: string }) {
    // Validação básica de segurança
    if (recreateDto.confirmacao !== 'RECRIAR_SUPER_ADMIN_CONFIRMO') {
      return {
        success: false,
        message: 'Confirmação inválida. Use: { "confirmacao": "RECRIAR_SUPER_ADMIN_CONFIRMO" }'
      };
    }

    return this.superAdminSeedService.recreateSuperAdmin();
  }
} 