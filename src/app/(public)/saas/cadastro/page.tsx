'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Building2, Mail, Lock, AlertCircle, CheckCircle, Rocket, ArrowRight, Sparkles } from 'lucide-react'
import { config } from '@/lib/config'

export default function SaasCadastroPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validar senhas
    if (formData.password !== confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres')
      setLoading(false)
      return
    }

    try {
      const slug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      
      const res = await fetch(`${config.apiUrl}/saas-companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug,
          status: 'pendente',
          category: 'Outro',
          website: 'https://exemplo.com',
          description: 'Cadastro em andamento - aguardando preenchimento completo do perfil',
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(true)
        
        // Fazer login automático
        const loginRes = await fetch(`${config.apiUrl}/auth/saas-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: formData.email, 
            password: formData.password 
          }),
        })

        if (loginRes.ok) {
          const loginData = await loginRes.json()
          
          if (loginData.access_token) {
            localStorage.setItem('token', loginData.access_token)
            localStorage.setItem('user', JSON.stringify(loginData.user || loginData))
          }
        }
        
        // SEMPRE redireciona para dashboard após cadastro (com ou sem login)
        setTimeout(() => {
          router.push('/saas/dashboard')
        }, 1000)
        
      } else {
        setError(data.message || 'Erro ao cadastrar')
      }
    } catch (error) {
      setError('Erro ao conectar com servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Card Principal */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header com Gradiente */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Cadastro Rápido</h1>
            </div>
            <p className="text-blue-100">Crie sua conta em segundos e complete seu perfil depois</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-700 text-sm font-medium">✅ Cadastro realizado! Acessando sua área...</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Nome da Empresa *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  placeholder="Minha Empresa SAAS"
                  required
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  E-mail *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  Senha *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  placeholder="Mínimo 6 caracteres"
                  minLength={6}
                  required
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  Confirmar Senha *
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  placeholder="Digite a senha novamente"
                  required
                />
              </div>

              {/* Aviso sobre completar perfil */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-900">
                    <p className="font-semibold mb-1">⚡ Cadastro Rápido</p>
                    <p className="text-xs">Após o login, você <strong>DEVE</strong> completar seu perfil com: categoria, website, descrição, logo, contatos e muito mais!</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Cadastrando...</span>
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Cadastrado!</span>
                  </>
                ) : (
                  <>
                    <span>Cadastrar Meu SAAS</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm text-center">
                Já tem cadastro?{' '}
                <Link 
                  href="/saas/login" 
                  className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center gap-1 transition-colors"
                >
                  Entrar agora
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer com Informação */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            Cadastro rápido e seguro • Complete seu perfil após o login
          </p>
        </div>
      </div>
    </div>
  )
}



