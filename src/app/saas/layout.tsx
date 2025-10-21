'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, User, Rocket, LogOut, Sparkles } from 'lucide-react'

export default function SaasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/saas/dashboard' },
    { icon: User, label: 'Meu Perfil', href: '/saas/perfil' },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      {/* Sidebar Moderna */}
      <aside className="w-64 bg-white/80 backdrop-blur-lg border-r border-white/20 shadow-xl flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Portal SAAS
              </h1>
              <p className="text-xs text-gray-500">Área do Cliente</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <div className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105' 
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-700 hover:scale-105'
                  }
                `}>
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{item.label}</span>
                  {isActive && <Sparkles className="w-4 h-4 ml-auto" />}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Footer com Logout */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300 hover:scale-105">
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content - Estrutura sem scroll */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Fixo */}
        <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm px-8 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Minha Empresa SAAS</h2>
              <p className="text-sm text-gray-600">Gerencie suas métricas e leads</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Nome da Empresa</p>
                <p className="text-xs text-gray-500">empresa@email.com</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">E</span>
              </div>
            </div>
          </div>
        </header>

        {/* Área de Conteúdo com Scroll */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}



