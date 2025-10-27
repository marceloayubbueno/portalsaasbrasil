'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
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
  status?: string
  focusType?: string
  views?: number
}

export default function Home() {
  const [featuredSaas, setFeaturedSaas] = useState<SaasCompany[]>([])
  const [recentSaas, setRecentSaas] = useState<SaasCompany[]>([])
  const [loading, setLoading] = useState(true)

  const featuredRef = useRef<HTMLDivElement>(null)
  const recentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadSaasCompanies()
  }, [])

  const loadSaasCompanies = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/saas-companies`)
      if (res.ok) {
        const result = await res.json()
        const data = result.companies || result // Suporta { companies: [] } ou array direto
        
        // Filtrar: status ativo + lead generation + ordenar por views
        const featured = data
          .filter((s: SaasCompany) => s.status === 'ativo' && (s.focusType === 'lead-generation' || s.focusType === 'both'))
          .sort((a: SaasCompany, b: SaasCompany) => (b.views || 0) - (a.views || 0))
          .slice(0, 12)
        setFeaturedSaas(featured)
        
        setRecentSaas(data.slice(0, 6))
      }
    } catch (error) {
      console.error('Erro ao carregar empresas:', error)
    } finally {
      setLoading(false)
    }
  }

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth',
      })
    }
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

  return (
    <main className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="pt-20 pb-20 bg-gray-50">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Soluções SAAS para{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  resultados reais
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Imagine um cenário onde seus maiores desafios são resolvidos antes de se tornarem problemas.
                Conectamos sua empresa às <strong>soluções SAAS</strong> que impulsionam crescimento com eficiência e inovação.
              </p>
              <Link href="/saas">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-4 px-8 rounded-xl text-lg shadow-xl transition-all duration-300 flex items-center gap-3">
                  Explorar Soluções SAAS
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
                  <img
                    src="/imagens/comunidade de saas.png"
                    alt="Comunidade SAAS"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  {['CRM', 'ERP', 'BI', 'IA', 'APP', 'API'].map((tech, i) => {
                    const positions = [
                      'top-0 left-1/2 transform -translate-x-1/2 -translate-y-4',
                      'top-1/4 right-0 transform translate-x-4',
                      'bottom-1/4 right-0 transform translate-x-4',
                      'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4',
                      'bottom-1/4 left-0 transform -translate-x-4',
                      'top-1/4 left-0 transform -translate-x-4',
                    ]
                    return (
                      <div key={tech} className={`absolute ${positions[i]} w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center`}>
                        <span className="text-blue-600 text-xs font-bold text-center">{tech}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
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
            <Link href="/saas" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group text-sm">
              Explorar Catálogo Completo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="relative py-8">
            <div className="absolute top-0 right-0 z-10 flex gap-2">
              <button
                onClick={() => scroll(featuredRef, 'left')}
                className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => scroll(featuredRef, 'right')}
                className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div ref={featuredRef} className="flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide pr-20">
              {loading ? (
                <div className="text-gray-600">Carregando...</div>
              ) : featuredSaas.length > 0 ? (
                featuredSaas.map((company) => (
                  <Link key={company._id} href={`/saas/${company.slug}`} className="snap-start">
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
                ))
              ) : (
                <div className="text-gray-600">Nenhuma empresa encontrada</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Botão Ver Mais SAAS */}
      <div className="text-center mt-8">
        <Link href="/catalogo">
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl transition-all flex items-center gap-2 mx-auto">
            Ver Mais SAAS
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>

      {/* Visualizados Recentemente */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="text-left mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Visualizados <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Recentemente</span>
            </h2>
            <Link href="/saas" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group text-sm">
              Ver Histórico Completo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="relative py-8">
            <div className="absolute top-0 right-0 z-10 flex gap-2">
              <button
                onClick={() => scroll(recentRef, 'left')}
                className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => scroll(recentRef, 'right')}
                className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div ref={recentRef} className="flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide pr-20">
              {loading ? (
                <div className="text-gray-600">Carregando...</div>
              ) : recentSaas.length > 0 ? (
                recentSaas.map((company) => (
                  <Link key={company._id} href={`/saas/${company.slug}`} className="snap-start">
                    <div className="group relative bg-white border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 min-w-[360px] max-w-[360px]">
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
                ))
              ) : (
                <div className="text-gray-600">Nenhuma empresa encontrada</div>
              )}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/saas">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-xl shadow-blue-500/25 transition-all duration-300 inline-flex items-center gap-2">
                Ver Todas as Soluções
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl shadow-blue-500/20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para encontrar sua solução ideal?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Explore nosso catálogo completo de empresas SAAS e descubra a ferramenta perfeita para impulsionar seu negócio.
            </p>
            <Link href="/saas">
              <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-10 rounded-xl text-lg shadow-xl inline-flex items-center gap-2">
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-20">
        <div className="w-full px-8 md:px-16 lg:px-24 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Portal<span className="text-blue-400">SAAS</span>
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                O maior diretório de soluções SAAS do Brasil. Encontre a ferramenta perfeita para seu negócio.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Portal</h4>
              <ul className="space-y-2">
                <li><Link href="/saas" className="text-gray-400 hover:text-white text-sm transition-colors">Empresas SAAS</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</Link></li>
                <li><Link href="/sobre" className="text-gray-400 hover:text-white text-sm transition-colors">Sobre Nós</Link></li>
                <li><Link href="/contato" className="text-gray-400 hover:text-white text-sm transition-colors">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Categorias</h4>
              <ul className="space-y-2">
                <li><Link href="/saas?category=crm" className="text-gray-400 hover:text-white text-sm transition-colors">CRM & Vendas</Link></li>
                <li><Link href="/saas?category=marketing" className="text-gray-400 hover:text-white text-sm transition-colors">Marketing</Link></li>
                <li><Link href="/saas?category=financeiro" className="text-gray-400 hover:text-white text-sm transition-colors">Financeiro</Link></li>
                <li><Link href="/saas?category=rh" className="text-gray-400 hover:text-white text-sm transition-colors">RH & Pessoas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/termos" className="text-gray-400 hover:text-white text-sm transition-colors">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="text-gray-400 hover:text-white text-sm transition-colors">Política de Privacidade</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</Link></li>
                <li><Link href="/admin" className="text-gray-400 hover:text-white text-sm transition-colors">Área Admin</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">© 2025 PortalSAAS. Todos os direitos reservados.</p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span>contato@portalsaas.com.br</span>
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
