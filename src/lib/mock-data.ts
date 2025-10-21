// Mock data para desenvolvimento
export const mockSaasCompanies = [
  {
    _id: '1',
    slug: 'exemplo-saas',
    name: 'Exemplo SAAS',
    logo: '/images/default-logo.png',
    description: 'Descrição exemplo de um SAAS',
    category: 'Marketing',
    focusType: 'lead-generation' as const,
    rating: 4.5,
    featured: true,
    views: 1000,
    status: 'ativo' as const,
    website: 'https://exemplo.com',
    tags: [],
    founders: [],
    views: 0,
    reviewCount: 0,
    featured: false,
    rating: 0,
  },
]

export const mockCategories = [
  { _id: '1', name: 'Marketing', slug: 'marketing', productCount: 10, order: 1, status: 'active' as const },
  { _id: '2', name: 'Vendas', slug: 'vendas', productCount: 8, order: 2, status: 'active' as const },
  { _id: '3', name: 'Atendimento', slug: 'atendimento', productCount: 5, order: 3, status: 'active' as const },
]



