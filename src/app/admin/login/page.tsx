'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, ArrowLeft } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar login admin
    router.push('/admin/dashboard')
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header igual à homepage */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 w-full z-50 shadow-sm">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                PortalSAAS
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/saas" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                Empresas SAAS
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                Blog
              </Link>
              <Link href="/sobre" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                Sobre
              </Link>
              <Link href="/contato" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                Contato
              </Link>
            </nav>
            <Link href="/admin">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                Admin
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Seção de Login */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Portal SAAS
              </span>
            </div>

            {/* Título */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Painel Administrativo</h1>
            <p className="text-gray-600 mb-8 text-center">Acesso restrito para administradores</p>

            {/* Card de Login */}
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Senha */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {/* Botão Login */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                  Entrar no Painel
                </button>
              </form>

              {/* Link Voltar */}
              <div className="mt-6 text-center">
                <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  ← Voltar para o site
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">Protegido por autenticação JWT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer igual à homepage */}
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