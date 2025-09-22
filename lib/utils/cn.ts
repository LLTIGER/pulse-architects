import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 * Used throughout the design system for dynamic class composition
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Design system class utilities for consistent styling
 */
export const designSystemClasses = {
  // Focus styles for accessibility
  focus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900',
  
  // Glass morphism effects
  glass: {
    light: 'bg-white/10 backdrop-blur-xl border border-white/20',
    medium: 'bg-white/20 backdrop-blur-xl border border-white/30',
    heavy: 'bg-white/30 backdrop-blur-xl border border-white/40',
    dark: 'bg-black/10 backdrop-blur-xl border border-black/20',
  },
  
  // Architectural shadows
  shadow: {
    blueprint: 'shadow-blueprint',
    architectural: 'shadow-architectural',
    elevation: {
      low: 'shadow-elevation-low',
      medium: 'shadow-elevation-medium',
      high: 'shadow-elevation-high',
      highest: 'shadow-elevation-highest',
    },
  },
  
  // Animation utilities
  animation: {
    fadeIn: 'animate-fade-in',
    fadeInUp: 'animate-fade-in-up',
    slideInRight: 'animate-slide-in-right',
    scaleIn: 'animate-scale-in',
    shimmer: 'animate-shimmer',
    float: 'animate-float',
    glow: 'animate-glow',
  },
  
  // Responsive grid systems
  grid: {
    gallery: {
      mobile: 'grid grid-cols-gallery-mobile gap-4',
      tablet: 'grid grid-cols-gallery-tablet gap-6',
      desktop: 'grid grid-cols-gallery-desktop gap-8',
      wide: 'grid grid-cols-gallery-wide gap-10',
    },
    product: 'grid grid-cols-product-grid gap-6',
    planDetails: 'grid grid-cols-plan-details gap-8',
  },
  
  // Typography scales
  typography: {
    display: {
      sm: 'text-3xl font-bold tracking-tight',
      md: 'text-4xl font-bold tracking-tight',
      lg: 'text-5xl font-bold tracking-tight',
      xl: 'text-6xl font-bold tracking-tight',
    },
    heading: {
      xs: 'text-lg font-semibold',
      sm: 'text-xl font-semibold',
      md: 'text-2xl font-semibold',
      lg: 'text-3xl font-semibold',
    },
    body: {
      sm: 'text-sm leading-relaxed',
      md: 'text-base leading-relaxed',
      lg: 'text-lg leading-relaxed',
    },
    architectural: 'font-architectural text-sm font-medium tracking-wide uppercase',
  },
  
  // Common transition patterns
  transition: {
    smooth: 'transition-all duration-300 ease-out',
    fast: 'transition-all duration-150 ease-out',
    slow: 'transition-all duration-500 ease-out',
    bounce: 'transition-transform duration-200 ease-out hover:scale-105 active:scale-95',
  },
} as const;

/**
 * Responsive breakpoint utilities
 */
export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Design token utilities
 */
export const tokens = {
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },
  
  borderRadius: {
    xs: '0.125rem',   // 2px
    sm: '0.25rem',    // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
  },
} as const;