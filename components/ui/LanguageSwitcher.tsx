'use client'
import { useState, useTransition } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Icon } from '@iconify/react'
import { useLanguage } from '@/components/providers/LanguageProvider'

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
]

interface LanguageSwitcherProps {
  isHomepage?: boolean
  sticky?: boolean
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  isHomepage = false, 
  sticky = false 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { currentLocale, setLocale } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === currentLocale) return

    startTransition(() => {
      setLocale(newLocale as any)
    })
    
    setIsOpen(false)
  }

  const textColor = isHomepage 
    ? (sticky ? 'text-dark dark:text-white' : 'text-white') 
    : 'text-dark dark:text-white'

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${textColor} ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Change language"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium hidden sm:block">
          {currentLanguage.code.toUpperCase()}
        </span>
        <Icon 
          icon="ph:caret-down-bold" 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                disabled={isPending}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  language.code === currentLocale 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 dark:text-gray-300'
                } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
                {language.code === currentLocale && (
                  <Icon icon="ph:check-bold" className="w-4 h-4 ml-auto text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSwitcher