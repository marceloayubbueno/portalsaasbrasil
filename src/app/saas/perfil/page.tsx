'use client'

import { useEffect, useState } from 'react'

export default function SaasPerfilPage() {
  const [company, setCompany] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:3001/saas-companies/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setCompany(data)
      }
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    await fetch('http://localhost:3001/saas-companies/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(company)
    })
    alert('Salvo!')
  }

  if (loading) return <div className="p-8 text-white">Carregando...</div>

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Meu Perfil</h1>
      <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
        <input
          type="text"
          value={company?.name || ''}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white"
          placeholder="Nome"
        />
        <textarea
          value={company?.description || ''}
          onChange={(e) => setCompany({ ...company, description: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white"
          rows={4}
          placeholder="Descrição"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}



