'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthUser } from './auth'

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  loading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check for stored auth token on mount
    const accessToken = localStorage.getItem('auth_token')
    const refreshToken = localStorage.getItem('refresh_token')
    
    if (accessToken) {
      verifyStoredToken(accessToken)
    } else if (refreshToken) {
      // Try to refresh access token
      refreshAccessToken()
    } else {
      setLoading(false)
    }

    // Set up automatic token refresh
    const refreshInterval = setInterval(() => {
      const storedRefreshToken = localStorage.getItem('refresh_token')
      if (storedRefreshToken) {
        refreshAccessToken()
      }
    }, 14 * 60 * 1000) // Refresh every 14 minutes (tokens expire in 15 minutes)

    return () => clearInterval(refreshInterval)
  }, [])

  const verifyStoredToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('refresh_token')
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
    } finally {
      setLoading(false)
    }
  }

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token')
      if (!refreshToken) return

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('auth_token', data.tokens.accessToken)
        localStorage.setItem('refresh_token', data.tokens.refreshToken)
      } else {
        // Refresh token is invalid, logout user
        logout()
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      logout()
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.user && data.tokens) {
        setUser(data.user)
        localStorage.setItem('auth_token', data.tokens.accessToken)
        localStorage.setItem('refresh_token', data.tokens.refreshToken)
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Login failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Network error occurred' }
    }
  }

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (response.ok && data.user && data.tokens) {
        setUser(data.user)
        localStorage.setItem('auth_token', data.tokens.accessToken)
        localStorage.setItem('refresh_token', data.tokens.refreshToken)
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Registration failed' }
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'Network error occurred' }
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (token) {
        // Call logout API to invalidate refresh token
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
      // Always clear local storage and user state
      setUser(null)
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
    }
  }

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'

  if (!isClient) {
    return (
      <AuthContext.Provider value={{
        user: null,
        login: async () => ({ success: false }),
        register: async () => ({ success: false }),
        logout: async () => {},
        loading: true,
        isAdmin: false
      }}>
        {children}
      </AuthContext.Provider>
    )
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}