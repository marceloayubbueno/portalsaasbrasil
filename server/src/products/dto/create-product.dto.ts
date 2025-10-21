import { IsString, IsNumber, IsEnum, IsOptional, IsArray, IsBoolean, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  compareAtPrice?: number;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsEnum(['physical', 'digital'])
  type: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsString()
  category: string;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsEnum(['active', 'draft', 'archived'])
  @IsOptional()
  status?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
