'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Star, Globe, Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Facebook, Users, TrendingUp, Calendar, Award } from 'lucide-react'

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
      const res = await fetch(`http://localhost:3001/saas-companies/slug/${slug}`)
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
      await fetch(`http://localhost:3001/saas-companies/slug/${slug}/view`, {
        method: 'PUT'
      })
    } catch (error) {
      console.error('Erro ao incrementar views:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Empresa não encontrada</div>
      </div>
    )
  }

  const showTabs = company.focusType === 'both'

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-6">
            {/* Logo */}
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-20 h-20 object-contain" />
              ) : (
                <span className="text-4xl font-bold text-gray-900">{company.name.charAt(0)}</span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">{company.name}</h1>
              <p className="text-xl text-gray-300 mb-4">{company.description}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-white font-semibold">{company.rating.toFixed(1)}</span>
                  <span className="text-gray-300 text-sm">({company.reviewCount} avaliações)</span>
                </div>
                <div className="text-gray-300 text-sm">{company.category}</div>
                <div className="text-gray-300 text-sm">{company.views.toLocaleString()} visualizações</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs (se focusType === 'both') */}
      {showTabs && (
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('leads')}
                className={`py-4 px-6 font-semibold transition-colors border-b-2 ${
                  activeTab === 'leads'
                    ? 'text-blue-400 border-blue-400'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                🎯 Geração de Leads
              </button>
              <button
                onClick={() => setActiveTab('investimento')}
                className={`py-4 px-6 font-semibold transition-colors border-b-2 ${
                  activeTab === 'investimento'
                    ? 'text-purple-400 border-purple-400'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                💰 Busca por Investimento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Content */}
            {(activeTab === 'leads' || company.focusType === 'lead-generation') && (
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">Geração de Leads</h2>
                {company.problemsSolved && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Problemas que Resolvemos</h3>
                    <p className="text-gray-300">{company.problemsSolved}</p>
                  </div>
                )}
                {company.targetAudience && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Público-Alvo</h3>
                    <p className="text-gray-300">{company.targetAudience}</p>
                  </div>
                )}
                {company.actionUrl && (
                  <a
                    href={company.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    {company.buttonText || 'Conhecer Solução'}
                  </a>
                )}
              </div>
            )}

            {(activeTab === 'investimento' || company.focusType === 'investment-seeking') && (
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Busca por Investimento</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-400 text-sm">Clientes</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{company.customerCount?.toLocaleString() || '-'}</p>
                  </div>
                  
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-gray-400 text-sm">MRR</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {company.monthlyRevenue ? `R$ ${company.monthlyRevenue.toLocaleString()}` : '-'}
                    </p>
                  </div>
                  
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-400 text-sm">Crescimento</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{company.growthRate || '-'}%</p>
                  </div>
                  
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-orange-400" />
                      <span className="text-gray-400 text-sm">Fundada</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{company.foundedYear || '-'}</p>
                  </div>
                </div>

                {company.founders && company.founders.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Fundadores</h3>
                    <div className="space-y-3">
                      {company.founders.map((founder: any) => (
                        <div key={founder.id} className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{founder.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-semibold">{founder.name}</p>
                            <p className="text-gray-400 text-sm">{founder.position}</p>
                          </div>
                          {founder.linkedin && (
                            <a
                              href={founder.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300"
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
                    <h3 className="text-lg font-semibold text-white mb-2">Diferenciais Competitivos</h3>
                    <p className="text-gray-300">{company.competitiveAdvantages}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Informações de Contato</h3>
              <div className="space-y-3">
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <span>Website</span>
                  </a>
                )}
                {company.email && (
                  <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span>{company.email}</span>
                  </a>
                )}
                {company.phone && (
                  <a href={`tel:${company.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <span>{company.phone}</span>
                  </a>
                )}
                {company.city && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span>{company.city}, {company.state || company.country}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media */}
            {(company.linkedin || company.twitter || company.instagram || company.facebook) && (
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Redes Sociais</h3>
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
    </div>
  )
}



