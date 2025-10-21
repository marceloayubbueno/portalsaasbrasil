import mongoose, { Schema, model, models } from 'mongoose'

export interface IBlogPost {
  _id?: string
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage?: string
  author: string
  category: string
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  publishedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  featuredImage: { type: String },
  author: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  publishedAt: { type: Date },
}, {
  timestamps: true,
})

BlogPostSchema.index({ slug: 1 }, { unique: true })
BlogPostSchema.index({ title: 'text', content: 'text', excerpt: 'text' })

export default models.BlogPost || model<IBlogPost>('BlogPost', BlogPostSchema)



