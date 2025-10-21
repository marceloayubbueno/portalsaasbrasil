import Link from 'next/link'
import { Star, TrendingUp, Eye } from 'lucide-react'

interface SaasCardProps {
  company: {
    _id: string
    slug: string
    name: string
    logo?: string
    description: string
    category: string
    focusType?: 'lead-generation' | 'investment-seeking' | 'both'
    rating: number
    featured?: boolean
    views: number
  }
  targetTab?: 'leads' | 'investimento'
}

export default function SaasCard({ company, targetTab }: SaasCardProps) {
  const getFocusTypeLabel = () => {
    if (company.focusType === 'lead-generation') return '🎯 Leads'
    if (company.focusType === 'investment-seeking') return '💰 Investimento'
    if (company.focusType === 'both') return '🎯💰 Ambos'
    return '📊 SAAS'
  }

  const getFocusTypeColor = () => {
    if (company.focusType === 'lead-generation') return 'bg-green-500/20 text-green-400 border border-green-500/30'
    if (company.focusType === 'investment-seeking') return 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
    if (company.focusType === 'both') return 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
    return 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
  }

  return (
    <Link href={`/saas/${company.slug}${targetTab ? `?tab=${targetTab}` : ''}`}>
      <div className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1">
        {/* Featured Badge */}
        {company.featured && (
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Destaque
            </span>
          </div>
        )}

        {/* Logo */}
        <div className="p-6 pb-3">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="w-12 h-12 object-contain" />
            ) : (
              <span className="text-2xl font-bold text-white">{company.name.charAt(0)}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {company.name}
          </h3>

          {/* Category and Focus Type */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
              {company.category}
            </span>
            <span className={`text-xs px-2 py-1 rounded ${getFocusTypeColor()}`}>
              {getFocusTypeLabel()}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 mb-4 line-clamp-2">
            {company.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-700">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span>{company.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{company.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-green-400">Ver mais</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}



