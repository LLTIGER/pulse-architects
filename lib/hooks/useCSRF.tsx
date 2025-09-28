'use client'
import { useCallback, useEffect, useState } from 'react'

interface CSRFData {
  token: string | null
  headerName: string
  loading: boolean
  error: string | null
}

export function useCSRF(): CSRFData & { 
  refreshToken: () => Promise<void>
  makeAuthenticatedRequest: (url: string, options?: RequestInit) => Promise<Response>
} {
  const [csrfToken, setCSRFToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [headerName] = useState('x-csrf-token')

  const fetchCSRFToken = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const authToken = localStorage.getItem('auth_token')
      const headers: HeadersInit = {}
      
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`
      }

      const response = await fetch('/api/csrf', {
        method: 'GET',
        headers,
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setCSRFToken(data.csrfToken)
      } else {
        throw new Error('Failed to fetch CSRF token')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setCSRFToken(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const makeAuthenticatedRequest = useCallback(async (
    url: string, 
    options: RequestInit = {}
  ): Promise<Response> => {
    // Ensure we have a CSRF token for non-safe methods
    const method = options.method?.toUpperCase() || 'GET'
    const needsCSRF = !['GET', 'HEAD', 'OPTIONS'].includes(method)

    if (needsCSRF && !csrfToken) {
      await fetchCSRFToken()
    }

    // Prepare headers
    const headers = new Headers(options.headers)
    
    // Add auth token if available
    const authToken = localStorage.getItem('auth_token')
    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`)
    }

    // Add CSRF token for non-safe methods
    if (needsCSRF && csrfToken) {
      headers.set(headerName, csrfToken)
    }

    // Add content type if not set and we have a body
    if (options.body && !headers.get('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }

    return fetch(url, {
      ...options,
      headers,
      credentials: 'include'
    })
  }, [csrfToken, headerName, fetchCSRFToken])

  useEffect(() => {
    fetchCSRFToken()
  }, [fetchCSRFToken])

  return {
    token: csrfToken,
    headerName,
    loading,
    error,
    refreshToken: fetchCSRFToken,
    makeAuthenticatedRequest
  }
}