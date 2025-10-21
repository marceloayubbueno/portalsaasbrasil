import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './entities/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(data: Partial<Category>): Promise<Category> {
    const created = new this.categoryModel(data);
    return created.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return category;
  }

  async update(id: string, updateData: Partial<Category>): Promise<Category> {
    const updated = await this.categoryModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    
    if (!updated) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Categoria não encontrada');
    }
  }
}
