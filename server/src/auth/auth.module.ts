import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtSaasStrategy } from './strategies/jwt-saas.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioAdmin, UsuarioAdminSchema } from '../admins/entities/usuario-admin.schema';
import { SaasCompany, SaasCompanySchema } from '../products/entities/product.schema';
import { AdminsModule } from '../admins/admins.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'sua-chave-secreta-aqui',
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([
      { name: UsuarioAdmin.name, schema: UsuarioAdminSchema },
      { name: SaasCompany.name, schema: SaasCompanySchema },
    ]),
    AdminsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtSaasStrategy],
  exports: [AuthService],
})
export class AuthModule {}
