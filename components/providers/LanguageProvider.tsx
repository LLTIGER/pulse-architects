'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { Locale, defaultLocale, locales } from '@/lib/i18n/config'

interface LanguageContextType {
  currentLocale: Locale
  setLocale: (locale: Locale) => void
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: React.ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for saved preference
    const savedLocale = localStorage.getItem('preferred-locale')
    if (savedLocale && locales.includes(savedLocale as Locale)) {
      setCurrentLocale(savedLocale as Locale)
    } else {
      // Check browser language
      const browserLang = navigator.language.substring(0, 2)
      if (locales.includes(browserLang as Locale)) {
        setCurrentLocale(browserLang as Locale)
      }
    }
    setIsLoading(false)
  }, [])

  const setLocale = (locale: Locale) => {
    setCurrentLocale(locale)
    localStorage.setItem('preferred-locale', locale)
  }

  return (
    <LanguageContext.Provider value={{ currentLocale, setLocale, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}