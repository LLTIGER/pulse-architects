'use client'
import { NextIntlClientProvider } from 'next-intl'
import { useLanguage } from './LanguageProvider'
import { ReactNode, useEffect, useState } from 'react'

interface IntlProviderProps {
  children: ReactNode
  defaultMessages: any
}

export function IntlProvider({ children, defaultMessages }: IntlProviderProps) {
  const { currentLocale } = useLanguage()
  const [messages, setMessages] = useState(defaultMessages)

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const newMessages = await import(`../../messages/${currentLocale}.json`)
        setMessages(newMessages.default)
      } catch (error) {
        console.warn(`Failed to load messages for locale ${currentLocale}, using default`)
        setMessages(defaultMessages)
      }
    }

    loadMessages()
  }, [currentLocale, defaultMessages])

  return (
    <NextIntlClientProvider locale={currentLocale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}