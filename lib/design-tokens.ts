/**
 * Design Tokens for Pulse Architects E-commerce Platform
 * Enhanced with Homely Design System integration
 * Comprehensive token system for consistent design across the application
 */

export const designTokens = {
  // Color system with Homely integration for architectural content
  colors: {
    // Homely Primary Colors
    homely: {
      primary: '#07be8a',
      skyblue: '#79adff',
      lightskyblue: '#9cc2dd',
      dark: '#172023',
    },
    
    // Primary brand colors (updated to Homely)
    primary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#07be8a', // Homely primary
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
      950: '#022c22',
    },
    
    // Sky blue palette (Homely)
    skyblue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#79adff', // Homely skyblue
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    
    // Light sky blue palette (Homely)
    lightskyblue: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#9cc2dd', // Homely lightskyblue
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    
    // Dark palette (Homely)
    dark: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#172023', // Homely dark
      950: '#0f172a',
    },
    
    // Neutral palette for architectural drawings and UI
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
    
    // Blueprint-specific colors
    blueprint: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    
    // Semantic colors
    semantic: {
      success: {
        50: '#f0fdf4',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
      },
      warning: {
        50: '#fffbeb',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
      },
      error: {
        50: '#fef2f2',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
      },
      info: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      },
    },
    
    // Glass morphism transparency levels
    glass: {
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.2)',
      heavy: 'rgba(255, 255, 255, 0.3)',
      dark: 'rgba(0, 0, 0, 0.1)',
    },
  },

  // Typography system with Homely integration for architectural content
  typography: {
    fontFamily: {
      sans: ['Bricolage Grotesque', 'Inter', 'system-ui', 'sans-serif'], // Homely primary font
      display: ['Bricolage Grotesque', 'Cal Sans', 'Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      architectural: ['Bricolage Grotesque', 'Montserrat', 'Inter', 'sans-serif'],
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }], // Homely --text-sm
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      xm: ['1.125rem', { lineHeight: '1.5rem' }], // Homely --text-xm
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['6.5rem', { lineHeight: '1' }], // Homely --text-9xl
      '40': ['2.5rem', { lineHeight: '1.2' }], // Homely --text-40
      '52': ['3.25rem', { lineHeight: '1.2' }], // Homely --text-52
    },
    
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    
    letterSpacing: {
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Spacing system with Homely values for architectural layouts
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
    128: '32rem',
    
    // Homely specific spacing
    68: '17.375rem', // Homely --spacing-68
    540: '33.75rem', // Homely --spacing-540 (540px)
    '8xl': '87.5rem', // Homely --spacing-8xl (1400px)
    '45p': '45%', // Homely percentage spacing
    '85p': '85%',
    '90p': '90%',
  },
  
  // Homely breakpoints
  breakpoints: {
    xs: '375px', // Homely --breakpoint-xs
    mobile: '520px', // Homely --breakpoint-mobile
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px', // Homely container max width
  },

  // Shadow system with Homely integration for depth and elevation
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    
    // Homely shadow system
    '3xl': '0px 4px 6px -2px #0000000D, 0px 10px 15px -3px #0000001A',
    auth: '0 20px 25px -5px #0000001a',
    'dark-auth': 'rgba(255, 255, 255, 0.1) 0px 12px 28px 0px, rgba(255, 255, 255, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
    
    // Specialized shadows for architectural content
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    blueprint: '0 4px 20px rgba(59, 130, 246, 0.15)',
    architectural: '0 10px 40px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(59, 130, 246, 0.4)',
    
    // Elevation system
    elevation: {
      low: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      medium: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      high: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
      highest: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
    },
  },

  // Border radius system
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    '4xl': '2rem',
    full: '9999px',
  },

  // Animation system for micro-interactions
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '750ms',
      slowest: '1000ms',
    },
    
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0.0, 1, 1)',
      out: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      snappy: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeInUp: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      scaleIn: {
        '0%': { opacity: '0', transform: 'scale(0.9)' },
        '100%': { opacity: '1', transform: 'scale(1)' },
      },
      shimmer: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(100%)' },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-10px)' },
      },
      // Homely slide animation
      slide: {
        '0%': { transform: 'translateX(0%)' },
        '100%': { transform: 'translateX(-103%)' },
      },
    },
  },

  // Breakpoints for responsive design
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index scale for layering
  zIndex: {
    auto: 'auto',
    base: 0,
    hide: -1,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
    max: 2147483647,
  },

  // Component-specific tokens
  components: {
    // Gallery specific dimensions
    gallery: {
      thumbnailSizes: {
        xs: '80px',
        sm: '120px',
        md: '160px',
        lg: '200px',
        xl: '240px',
      },
      
      aspectRatios: {
        blueprint: '4/3',
        plan: '3/2',
        elevation: '16/9',
        detail: '1/1',
        wide: '21/9',
      },
    },
    
    // Button variants
    button: {
      sizes: {
        sm: {
          height: '32px',
          padding: '0 12px',
          fontSize: '14px',
        },
        md: {
          height: '40px',
          padding: '0 16px',
          fontSize: '16px',
        },
        lg: {
          height: '48px',
          padding: '0 24px',
          fontSize: '18px',
        },
      },
    },
    
    // Card variants
    card: {
      padding: {
        sm: '16px',
        md: '24px',
        lg: '32px',
      },
    },
  },
} as const;

export type DesignTokens = typeof designTokens;
export type ColorScale = keyof typeof designTokens.colors.primary;
export type SpacingScale = keyof typeof designTokens.spacing;
export type FontSize = keyof typeof designTokens.typography.fontSize;