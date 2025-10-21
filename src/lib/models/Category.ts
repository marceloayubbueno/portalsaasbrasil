import mongoose, { Schema, model, models, Types } from 'mongoose'

export interface ICategory {
  _id?: string
  name: string
  slug: string
  description?: string
  parent?: Types.ObjectId | string
  image?: string
  icon?: string
  productCount: number
  order: number
  status: 'active' | 'inactive'
  createdAt?: Date
  updatedAt?: Date
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String },
  parent: { type: Schema.Types.ObjectId, ref: 'Category' },
  image: { type: String },
  icon: { type: String },
  productCount: { type: Number, default: 0 },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, {
  timestamps: true,
})

CategorySchema.index({ slug: 1 }, { unique: true })

export default models.Category || model<ICategory>('Category', CategorySchema)



