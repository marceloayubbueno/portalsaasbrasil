import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { SaasCompaniesController } from './saas-companies.controller';
import { SaasCompaniesService } from './saas-companies.service';
import { SaasCompany, SaasCompanySchema } from './entities/product.schema';
import { Category, CategorySchema } from './entities/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SaasCompany.name, schema: SaasCompanySchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'sua-chave-secreta-aqui',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [SaasCompaniesController, CategoriesController],
  providers: [SaasCompaniesService, CategoriesService],
  exports: [SaasCompaniesService, CategoriesService],
})
export class ProductsModule {}
