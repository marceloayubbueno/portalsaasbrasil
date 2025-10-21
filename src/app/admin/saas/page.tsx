'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash, CheckCircle } from 'lucide-react'
import { config } from '@/lib/config'

export default function AdminSaasPage() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCompanies()
  }, [])

  const loadCompanies = async () => {
    try {
      const res = await fetch(`${config.apiUrl}/saas-companies`)
      if (res.ok) {
        const data = await res.json()
        // A API retorna { companies: [...] } ou array direto
        const companiesArray = data.companies || data || []
        setCompanies(Array.isArray(companiesArray) ? companiesArray : [])
      }
    } catch (error) {
      console.error('Erro ao carregar:', error)
      setCompanies([]) // Garantir que seja array vazio em caso de erro
    } finally {
      setLoading(false)
    }
  }

  const handleActivate = async (id: string) => {
    if (!confirm('Ativar esta empresa SAAS?')) return
    
    try {
      const res = await fetch(`${config.apiUrl}/saas-companies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'ativo' })
      })
      
      if (res.ok) {
        alert('✅ Empresa ativada com sucesso!')
        loadCompanies()
      } else {
        alert('❌ Erro ao ativar empresa')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('❌ Erro ao ativar empresa')
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Empresas SAAS</h1>
        <Link href="/admin/saas/new">
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-500/30">
            <Plus className="w-5 h-5" />
            Nova Empresa
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <p className="text-gray-600 text-center">Carregando empresas...</p>
        </div>
      ) : companies.length === 0 ? (
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm text-center">
          <p className="text-gray-600 mb-4">Nenhuma empresa SAAS encontrada</p>
          <Link href="/admin/saas/new">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto shadow-lg shadow-blue-500/30">
              <Plus className="w-5 h-5" />
              Adicionar Primeira Empresa
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-gray-700 font-semibold">Nome</th>
                <th className="text-left p-4 text-gray-700 font-semibold">Categoria</th>
                <th className="text-left p-4 text-gray-700 font-semibold">Status</th>
                <th className="text-left p-4 text-gray-700 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company: any) => (
                <tr key={company._id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-900 font-medium">{company.name}</td>
                  <td className="p-4 text-gray-600">{company.category}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      company.status === 'ativo' 
                        ? 'bg-green-100 text-green-700' 
                        : company.status === 'pendente'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {company.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {company.status === 'pendente' && (
                        <button 
                          onClick={() => handleActivate(company._id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Ativar empresa"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <Link href={`/admin/saas/edit/${company._id}`}>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


