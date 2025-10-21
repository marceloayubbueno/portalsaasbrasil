'use client'

import { useEffect, useState } from 'react'
import { Building2, Users, TrendingUp, DollarSign } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSaas: 0,
    activeSaas: 0,
    pendingSaas: 0,
    totalRevenue: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    // TODO: Implementar chamada à API para buscar estatísticas
    setStats({
      totalSaas: 12,
      activeSaas: 8,
      pendingSaas: 4,
      totalRevenue: 15000
    })
  }

  const statCards = [
    {
      title: 'Total SAAS',
      value: stats.totalSaas,
      icon: Building2,
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-500'
    },
    {
      title: 'SAAS Ativos',
      value: stats.activeSaas,
      icon: TrendingUp,
      color: 'from-green-600 to-emerald-600',
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-500'
    },
    {
      title: 'SAAS Pendentes',
      value: stats.pendingSaas,
      icon: Users,
      color: 'from-orange-600 to-yellow-600',
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-500'
    },
    {
      title: 'Receita Total',
      value: `R$ ${stats.totalRevenue.toLocaleString('pt-BR')}`,
      icon: DollarSign,
      color: 'from-purple-600 to-pink-600',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-500'
    }
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral do Portal SAAS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent SAAS */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">SAAS Recentes</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">SAAS Company {item}</p>
                  <p className="text-gray-500 text-sm">Cadastrado há {item} dias</p>
                </div>
                <span className="text-green-600 text-sm font-medium">Ativo</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30">
              <Building2 className="w-5 h-5" />
              Nova Empresa SAAS
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Ver Todas as Empresas
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Relatórios
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
