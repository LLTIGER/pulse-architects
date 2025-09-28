'use client'

import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'icon' | 'full'
  className?: string
  width?: number
  height?: number
  showText?: boolean
  textColor?: string
}

const Logo: FC<LogoProps> = ({ 
  variant = 'icon', 
  className = '',
  width,
  height,
  showText = true,
  textColor = 'text-gray-900 dark:text-white'
}) => {
  const iconSize = variant === 'icon' ? (width || 40) : (width || 60)
  const iconHeight = variant === 'icon' ? (height || 40) : (height || 40)

  return (
    <Link href='/' className={`flex items-center space-x-3 ${className}`}>
      {variant === 'full' ? (
        <Image
          src="/logo-full.svg"
          alt="Pulse Architects"
          width={width || 200}
          height={height || 60}
          className="h-auto max-w-full"
          priority
        />
      ) : (
        <>
          <Image
            src="/logo-icon.svg"
            alt="Pulse Architects"
            width={iconSize}
            height={iconHeight}
            className="h-auto max-w-full"
            priority
          />
          {showText && (
            <span className={`text-xl font-bold ${textColor}`}>
              Pulse Architects
            </span>
          )}
        </>
      )}
    </Link>
  )
}

export default Logo