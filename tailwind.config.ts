import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // Homely Design System Colors for Pulse Architects
      colors: {
        // Homely Brand Colors
        primary: '#07be8a',
        skyblue: '#79adff',
        lightskyblue: '#9cc2dd',
        dark: '#172023',
        
        // Extended primary palette
        'primary-50': '#ecfdf5',
        'primary-100': '#d1fae5',
        'primary-200': '#a7f3d0',
        'primary-300': '#6ee7b7',
        'primary-400': '#34d399',
        'primary-500': '#07be8a',
        'primary-600': '#059669',
        'primary-700': '#047857',
        'primary-800': '#065f46',
        'primary-900': '#064e3b',
        'primary-950': '#022c22',
        
        // Sky blue palette
        'skyblue-50': '#eff6ff',
        'skyblue-100': '#dbeafe',
        'skyblue-200': '#bfdbfe',
        'skyblue-300': '#93c5fd',
        'skyblue-400': '#79adff',
        'skyblue-500': '#3b82f6',
        'skyblue-600': '#2563eb',
        'skyblue-700': '#1d4ed8',
        'skyblue-800': '#1e40af',
        'skyblue-900': '#1e3a8a',
        'skyblue-950': '#172554',
        
        // Light sky blue palette
        'lightskyblue-50': '#f0f9ff',
        'lightskyblue-100': '#e0f2fe',
        'lightskyblue-200': '#bae6fd',
        'lightskyblue-300': '#9cc2dd',
        'lightskyblue-400': '#38bdf8',
        'lightskyblue-500': '#0ea5e9',
        'lightskyblue-600': '#0284c7',
        'lightskyblue-700': '#0369a1',
        'lightskyblue-800': '#075985',
        'lightskyblue-900': '#0c4a6e',
        'lightskyblue-950': '#082f49',
        // Architectural neutral palette
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
        // Blueprint accent colors
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
        // Success/error states
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        // Glass morphism
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.2)',
          heavy: 'rgba(255, 255, 255, 0.3)',
          dark: 'rgba(0, 0, 0, 0.1)',
        },
      },
      
      // Typography system with Homely font (Bricolage Grotesque fallback to Inter)
      fontFamily: {
        sans: ['Bricolage Grotesque', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Bricolage Grotesque', 'Cal Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        architectural: ['Bricolage Grotesque', 'Montserrat', 'Inter', 'sans-serif'],
      },
      
      fontSize: {
        // Homely typography scale
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['var(--text-sm)', { lineHeight: '1.25rem' }], // 0.875rem
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'xm': ['var(--text-xm)', { lineHeight: '1.5rem' }], // 1.125rem
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['var(--text-9xl)', { lineHeight: '1' }], // 6.5rem
        '40': ['var(--text-40)', { lineHeight: '1.2' }], // 2.5rem
        '52': ['var(--text-52)', { lineHeight: '1.2' }], // 3.25rem
      },

      // Spacing system with Homely values
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
        // Homely specific spacing
        '68': 'var(--spacing-68)', // 17.375rem
        '540': 'var(--spacing-540)', // 33.75rem (540px)
        '8xl': 'var(--spacing-8xl)', // 87.5rem (1400px)
        '45p': 'var(--spacing-45p)', // 45%
        '85p': 'var(--spacing-85p)', // 85%
        '90p': 'var(--spacing-90p)', // 90%
      },
      
      // Homely breakpoints
      screens: {
        'xs': 'var(--breakpoint-xs)', // 375px
        'mobile': 'var(--breakpoint-mobile)', // 520px
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
      },

      // Animation system with Homely animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        // Homely animation
        'slide': 'var(--animate-slide)',
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
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' },
        },
      },

      // Shadows for depth and elevation with Homely system
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'blueprint': '0 4px 20px rgba(59, 130, 246, 0.15)',
        'architectural': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'elevation-low': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'elevation-medium': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'elevation-high': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
        'elevation-highest': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
        // Homely shadows
        '3xl': 'var(--shadow-3xl)',
        'auth': 'var(--shadow-auth)',
        'dark-auth': 'var(--shadow-dark-auth)',
      },

      // Border radius system
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      // Backdrop blur for glass effects
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px',
      },

      // Grid system for gallery layouts
      gridTemplateColumns: {
        'gallery-mobile': 'repeat(auto-fill, minmax(150px, 1fr))',
        'gallery-tablet': 'repeat(auto-fill, minmax(200px, 1fr))',
        'gallery-desktop': 'repeat(auto-fill, minmax(250px, 1fr))',
        'gallery-wide': 'repeat(auto-fill, minmax(300px, 1fr))',
        'plan-details': '2fr 1fr',
        'product-grid': 'repeat(auto-fit, minmax(280px, 1fr))',
      },

      // Aspect ratios for architectural content
      aspectRatio: {
        'blueprint': '4/3',
        'plan': '3/2',
        'elevation': '16/9',
        'detail': '1/1',
      },

      // Z-index scale
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config;

export default config;