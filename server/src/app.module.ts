import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

// 🚀 PORTAL SAAS - App Module limpo (sistema antigo movido para EXEMPLOS/)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || (() => {
      throw new Error('MONGODB_URI environment variable is required');
    })(), {
      dbName: 'portalsaas',
      retryWrites: true,
      w: 'majority'
    }),
    // 🚀 PORTAL SAAS - Módulos mantidos
    AuthModule,
    AdminsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
