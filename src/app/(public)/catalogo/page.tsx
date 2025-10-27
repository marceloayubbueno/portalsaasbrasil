'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { config } from '@/lib/config'

interface SaasCompany {
  _id: string
  name: string
  slug: string
  description: string
  category: string
  rating: number
  pricing: string
  featured: boolean
  logo?: string
  status: string
  focusType?: string
  views: number
  createdAt?: string | Date
}

const CATEGORIES = [
  'Marketing', 'Vendas', 'Atendimento', 'RH', 'Financeiro', 'Produtividade',
  'E-commerce', 'Educação', 'Saúde', 'Logística', 'Tecnologia', 'Outro'
]

export default function CatalogoPage() {
  const [companies, setCompanies] = useState<SaasCompany[]>([])
  const [filteredCompanies, setFilteredCompanies] = useState<SaasCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    orderBy: 'views' as 'views' | 'recent' | 'alphabetical'
  })

  useEffect(() => {
    loadCompanies()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [companies, filters])

  const loadCompanies = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/saas-companies`)
      if (res.ok) {
        const result = await res.json()
        const data = result.companies || result
        
        // Filtrar: status ativo + lead generation
        const leadGenCompanies = data.filter((s: SaasCompany) => 
          s.status === 'ativo' && 
          (s.focusType === 'lead-generation' || s.focusType === 'both')
        )
        
        setCompanies(leadGenCompanies)
      }
    } catch (error) {
      console.error('Erro ao carregar empresas:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...companies]

    // Filtrar por categoria
    if (filters.categories.length > 0) {
      filtered = filtered.filter(c => filters.categories.includes(c.category))
    }

    // Ordenar
    filtered.sort((a, b) => {
      if (filters.orderBy === 'views') return b.views - a.views
      if (filters.orderBy === 'recent') return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
      if (filters.orderBy === 'alphabetical') return a.name.localeCompare(b.name)
      return 0
    })

    setFilteredCompanies(filtered)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-4 h-4 ${i < rating ? 'text-blue-500 fill-blue-500' : 'text-gray-300'}`}
      >
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </svg>
    ))
  }

  const getCategoryCount = (category: string) => {
    return companies.filter(c => c.category === category).length
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Título simples */}
      <section className="pt-8 pb-8">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <h1 className="text-3xl font-bold text-gray-900">
            Catálogo <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">SAAS</span>
          </h1>
        </div>
      </section>

      {/* Filtros Compactos */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="flex flex-col gap-4">
            {/* Linha 1: Ordenação + Contador */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">Ordenar por:</span>
                <select
                  value={filters.orderBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, orderBy: e.target.value as any }))}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
                >
                  <option value="views">Mais visualizados</option>
                  <option value="recent">Mais recentes</option>
                  <option value="alphabetical">A-Z</option>
                </select>
              </div>
              
              <div className="text-sm text-gray-500 font-medium">
                {filteredCompanies.length} resultado{filteredCompanies.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Linha 2: Categorias + Limpar */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(category => {
                  const count = getCategoryCount(category)
                  if (count === 0) return null
                  
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        if (filters.categories.includes(category)) {
                          setFilters(prev => ({ ...prev, categories: prev.categories.filter(c => c !== category) }))
                        } else {
                          setFilters(prev => ({ ...prev, categories: [...prev.categories, category] }))
                        }
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                        filters.categories.includes(category)
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {category} ({count})
                    </button>
                  )
                })}
              </div>

              {/* Limpar filtros */}
              {filters.categories.length > 0 && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, categories: [] }))}
                  className="px-3 py-1 text-xs text-gray-600 hover:text-gray-900 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Limpar Filtros
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SAAS em Destaque */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="text-left mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              SAAS em <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Destaque</span>
            </h2>
          </div>
          
          <div className="relative py-8">
            {loading ? (
              <div className="text-gray-600">Carregando...</div>
            ) : filteredCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCompanies.map((company) => (
                  <Link key={company._id} href={`/saas/${company.slug}`}>
                    <div className="group relative bg-white border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 min-w-[360px] max-w-[360px]">
                      {company.featured && (
                        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-sm">
                          ★ PREMIUM
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-md flex items-center justify-center shadow-lg">
                            <span className="text-base font-bold text-white">{company.name[0]}</span>
                          </div>
                          <div>
                            <h3 className="text-gray-900 font-semibold text-base group-hover:text-blue-600 transition-colors">
                              {company.name}
                            </h3>
                            <span className="text-blue-600 text-sm font-mono">{company.category}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2">
                        {company.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex">{renderStars(Math.floor(company.rating))}</div>
                          <span className="text-sm text-gray-600 font-mono">{company.rating.toFixed(1)}</span>
                        </div>
                        <div className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded-sm text-xs font-mono">
                          {company.pricing || 'Freemium'}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-gray-600">Nenhuma empresa encontrada</div>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}