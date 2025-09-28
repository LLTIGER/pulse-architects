'use client'

import { useTransition } from 'react'
import { Button } from '@nextui-org/react'
import { locales, type Locale } from '@/lib/i18n/config'
import { useRouter } from 'next/navigation'

interface LocaleSwitcherProps {
  currentLocale: Locale
  className?: string
}

export default function LocaleSwitcher({ currentLocale, className }: LocaleSwitcherProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const switchLocale = (locale: Locale) => {
    startTransition(() => {
      // Store the selected locale in localStorage
      localStorage.setItem('preferred-locale', locale)
      
      // Trigger a page refresh to apply the new locale
      // In a more sophisticated implementation, you might want to
      // update the URL structure or use a different approach
      router.refresh()
    })
  }

  const getLocaleLabel = (locale: Locale) => {
    switch (locale) {
      case 'en':
        return 'EN'
      case 'fr':
        return 'FR'
      default:
        return (locale as string).toUpperCase()
    }
  }

  const getLocaleFullName = (locale: Locale) => {
    switch (locale) {
      case 'en':
        return 'English'
      case 'fr':
        return 'Français'
      default:
        return locale
    }
  }

  return (
    <div className={`flex gap-1 ${className}`}>
      {locales.map((locale) => (
        <Button
          key={locale}
          size="sm"
          variant={currentLocale === locale ? "solid" : "ghost"}
          color={currentLocale === locale ? "primary" : "default"}
          onPress={() => switchLocale(locale)}
          isLoading={isPending && currentLocale !== locale}
          disabled={isPending}
          className="min-w-12 h-8 text-xs font-medium"
          title={getLocaleFullName(locale)}
        >
          {getLocaleLabel(locale)}
        </Button>
      ))}
    </div>
  )
}