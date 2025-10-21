'use client'

import { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { Building2, TrendingUp, Users, Award } from 'lucide-react'

export default function Stats() {
  const [hasAnimated, setHasAnimated] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [inView, hasAnimated])

  const stats = [
    {
      icon: Building2,
      value: 150,
      suffix: '+',
      label: 'Empresas SAAS',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      value: 500,
      suffix: 'K+',
      label: 'Leads Gerados',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Users,
      value: 50,
      suffix: 'K+',
      label: 'Usuários Ativos',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Award,
      value: 98,
      suffix: '%',
      label: 'Satisfação',
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-4xl font-bold text-white mb-2">
                    {hasAnimated ? (
                      <>
                        <CountUp end={stat.value} duration={2.5} separator="." />
                        {stat.suffix}
                      </>
                    ) : (
                      '0' + stat.suffix
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



