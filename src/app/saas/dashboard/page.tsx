'use client'

import { TrendingUp, Users, Target, Sparkles, ArrowUpRight, Clock, CheckCircle, Rocket } from 'lucide-react'

export default function SaasDashboard() {
  const stats = [
    {
      label: 'Visualizações',
      value: '8,542',
      change: '+8.2%',
      icon: Users,
      color: 'from-blue-600 to-cyan-600',
    },
    {
      label: 'Leads Gerados',
      value: '1,234',
      change: '+12.5%',
      icon: Target,
      color: 'from-purple-600 to-pink-600',
    },
  ]

  const quickActions = [
    { label: 'Editar Perfil', icon: Users, color: 'from-blue-600 to-cyan-600' },
    { label: 'Ver Estatísticas', icon: TrendingUp, color: 'from-purple-600 to-pink-600' },
    { label: 'Compartilhar', icon: Rocket, color: 'from-green-600 to-emerald-600' },
  ]

  const recentActivity = [
    { action: 'Novo lead capturado', time: 'há 5 minutos', icon: CheckCircle, color: 'text-green-600' },
    { action: 'Perfil visualizado', time: 'há 12 minutos', icon: Users, color: 'text-blue-600' },
    { action: 'Lead em análise', time: 'há 2 horas', icon: Clock, color: 'text-orange-600' },
  ]

  return (
    <div className="h-full p-6 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Bem-vindo de volta! Aqui está o resumo da sua empresa</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 flex-shrink-0">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs text-gray-500 mb-1 font-medium">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <div className="flex items-center gap-1 text-green-600 text-xs font-semibold">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Grid de 2 Colunas */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0 overflow-hidden">
        {/* Ações Rápidas */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-lg flex flex-col overflow-hidden">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 flex-shrink-0">
            <Rocket className="w-5 h-5 text-blue-600" />
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-shrink-0">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <button
                  key={index}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 text-center">{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Atividade Recente */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-lg flex flex-col overflow-hidden">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 flex-shrink-0">
            <Clock className="w-5 h-5 text-purple-600" />
            Atividade Recente
          </h2>
          <div className="space-y-2 flex-1 overflow-y-auto">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div
                  key={index}
                  className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-3.5 h-3.5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}



