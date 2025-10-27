'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Star, Globe, Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Facebook, Users, TrendingUp, Calendar, Award, ArrowLeft } from 'lucide-react'
import { config } from '@/lib/config'

export default function SaasDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const tabParam = searchParams.get('tab')
  
  const [company, setCompany] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(tabParam || 'leads')

  useEffect(() => {
    loadCompany()
    incrementViews()
  }, [slug])

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  const loadCompany = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/saas-companies/slug/${slug}`)
      if (res.ok) {
        const data = await res.json()
        setCompany(data)
      }
    } catch (error) {
      console.error('Erro ao carregar empresa:', error)
    } finally {
      setLoading(false)
    }
  }

  const incrementViews = async () => {
    try {
      await fetch(`${config.apiUrl}/saas-companies/slug/${slug}/view`, {
        method: 'PUT'
      })
    } catch (error) {
      console.error('Erro ao incrementar views:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <div className="text-gray-600">Carregando...</div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600 text-xl">Empresa não encontrada</div>
      </div>
    )
  }

  const showTabs = company.focusType === 'both'

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Compacto */}
      <section className="pt-8 pb-8 bg-gray-50">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-14 h-14 object-contain rounded-md" />
              ) : (
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{company.name.charAt(0)}</span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{company.name}</h1>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">{company.description}</p>
              
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(Math.floor(company.rating))}</div>
                  <span className="text-gray-900 font-semibold text-sm">{company.rating.toFixed(1)}</span>
                  <span className="text-gray-500 text-xs">({company.reviewCount || 0})</span>
                </div>
                <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{company.category}</div>
                <div className="text-gray-500 text-xs">{company.views.toLocaleString()} views</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs (se focusType === 'both') */}
      {showTabs && (
        <div className="bg-white border-b border-gray-200">
          <div className="w-full px-8 md:px-16 lg:px-24">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('leads')}
                className={`py-4 px-6 font-semibold transition-colors border-b-2 ${
                  activeTab === 'leads'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-blue-600'
                }`}
              >
                Geração de Leads
              </button>
              <button
                onClick={() => setActiveTab('investimento')}
                className={`py-4 px-6 font-semibold transition-colors border-b-2 ${
                  activeTab === 'investimento'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-blue-600'
                }`}
              >
                Busca por Investimento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-8 bg-white">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4">
              {/* Tab Content */}
              {(activeTab === 'leads' || company.focusType === 'lead-generation') && (
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Geração de Leads</h2>
                  {company.problemsSolved && (
                    <div className="mb-4">
                      <h3 className="text-base font-semibold text-gray-900 mb-2">Problemas que Resolvemos</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{company.problemsSolved}</p>
                    </div>
                  )}
                  {company.targetAudience && (
                    <div className="mb-4">
                      <h3 className="text-base font-semibold text-gray-900 mb-2">Público-Alvo</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{company.targetAudience}</p>
                    </div>
                  )}
                  {company.actionUrl && (
                    <a
                      href={company.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-all shadow-lg text-sm"
                    >
                      {company.buttonText || 'Conhecer Solução'}
                    </a>
                  )}
                </div>
              )}

            {(activeTab === 'investimento' || company.focusType === 'investment-seeking') && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Busca por Investimento</h2>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-600 text-sm font-medium">Clientes</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{company.customerCount?.toLocaleString() || '-'}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-gray-600 text-sm font-medium">MRR</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {company.monthlyRevenue ? `R$ ${company.monthlyRevenue.toLocaleString()}` : '-'}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-600 text-sm font-medium">Crescimento</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{company.growthRate || '-'}%</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-600 text-sm font-medium">Fundada</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{company.foundedYear || '-'}</p>
                  </div>
                </div>

                {company.founders && company.founders.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Fundadores</h3>
                    <div className="space-y-3">
                      {company.founders.map((founder: any) => (
                        <div key={founder.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{founder.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 font-semibold">{founder.name}</p>
                            <p className="text-gray-600 text-sm">{founder.position}</p>
                          </div>
                          {founder.linkedin && (
                            <a
                              href={founder.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Linkedin className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {company.competitiveAdvantages && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Diferenciais Competitivos</h3>
                    <p className="text-gray-600 leading-relaxed">{company.competitiveAdvantages}</p>
                  </div>
                )}
              </div>
            )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Informações de Contato</h3>
                <div className="space-y-3">
                  {company.website && (
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <span>Website</span>
                    </a>
                  )}
                  {company.email && (
                    <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span>{company.email}</span>
                    </a>
                  )}
                  {company.phone && (
                    <a href={`tel:${company.phone}`} className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span>{company.phone}</span>
                    </a>
                  )}
                  {company.city && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span>{company.city}, {company.state || company.country}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Media */}
              {(company.linkedin || company.twitter || company.instagram || company.facebook) && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Redes Sociais</h3>
                  <div className="flex gap-3">
                    {company.linkedin && (
                      <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors">
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                    )}
                    {company.twitter && (
                      <a href={company.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-lg flex items-center justify-center transition-colors">
                        <Twitter className="w-5 h-5 text-white" />
                      </a>
                    )}
                    {company.instagram && (
                      <a href={company.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center transition-colors">
                        <Instagram className="w-5 h-5 text-white" />
                      </a>
                    )}
                    {company.facebook && (
                      <a href={company.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-lg flex items-center justify-center transition-colors">
                        <Facebook className="w-5 h-5 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}



