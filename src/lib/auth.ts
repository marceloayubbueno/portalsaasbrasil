import { config } from './config'

// Funções de autenticação
export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('token', token)
}

export function removeToken(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('token')
}

export function getUser(): any {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export function setUser(user: any): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('user', JSON.stringify(user))
}

export function removeUser(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('user')
}

export function logout(): void {
  removeToken()
  removeUser()
  window.location.href = '/saas/login'
}

export function isAuthenticated(): boolean {
  return !!getToken()
}

// Login Admin
export async function loginAdmin(email: string, password: string) {
  try {
    const response = await fetch(`${config.apiUrl}/auth/admin-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Erro ao fazer login'
      }
    }

    // Salvar token e usuário
    setToken(data.access_token)
    setUser(data.admin)

    return {
      success: true,
      admin: data.admin
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return {
      success: false,
      error: 'Erro ao conectar com o servidor'
    }
  }
}

// Login SAAS
export async function loginSaas(email: string, password: string) {
  try {
    const response = await fetch(`${config.apiUrl}/auth/saas-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Erro ao fazer login'
      }
    }

    // Salvar token e usuário
    setToken(data.token)
    setUser(data.saasCompany)

    return {
      success: true,
      saasCompany: data.saasCompany
    }
  } catch (error) {
    console.error('Erro ao fazer login SAAS:', error)
    return {
      success: false,
      error: 'Erro ao conectar com o servidor'
    }
  }
}


