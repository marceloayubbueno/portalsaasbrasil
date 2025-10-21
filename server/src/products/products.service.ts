import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const created = new this.productModel(createProductDto);
    return created.save();
  }

  async findAll(filters?: any): Promise<Product[]> {
    const query: any = {};
    
    if (filters?.category) {
      query.category = filters.category;
    }
    
    if (filters?.status) {
      query.status = filters.status;
    }
    
    if (filters?.featured !== undefined) {
      query.featured = filters.featured;
    }
    
    return this.productModel.find(query).populate('category').sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).populate('category').exec();
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productModel.findOne({ slug }).populate('category').exec();
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
    return product;
  }

  async update(id: string, updateData: Partial<CreateProductDto>): Promise<Product> {
    const updated = await this.productModel
      .findByIdAndUpdate(id, { ...updateData, updatedAt: new Date() }, { new: true })
      .exec();
    
    if (!updated) {
      throw new NotFoundException('Produto não encontrado');
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Produto não encontrado');
    }
  }

  async search(query: string): Promise<Product[]> {
    return this.productModel
      .find({ $text: { $search: query } })
      .populate('category')
      .exec();
  }
}
