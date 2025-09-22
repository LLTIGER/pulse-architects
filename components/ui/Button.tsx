'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  [
    // Base styles with Homely integration
    'inline-flex items-center justify-center rounded-full text-base font-semibold transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    // Premium effects
    'relative overflow-hidden cursor-pointer',
    'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
    'before:translate-x-[-100%] before:transition-transform before:duration-700',
    'hover:before:translate-x-[100%]',
  ],
  {
    variants: {
      variant: {
        // Homely primary button style
        primary: [
          'px-8 py-4 border border-white dark:border-dark bg-white dark:bg-dark',
          'text-dark dark:text-white',
          'hover:bg-transparent hover:text-white dark:hover:text-dark',
          'hover:scale-[1.02] active:scale-[0.98]',
          'focus-visible:ring-primary-500',
        ],
        // Homely secondary button style
        secondary: [
          'px-8 py-4 border border-white dark:border-dark bg-transparent',
          'text-white dark:text-dark',
          'hover:bg-white dark:hover:bg-dark hover:text-dark dark:hover:text-white',
          'hover:scale-[1.02] active:scale-[0.98]',
          'focus-visible:ring-primary-500',
        ],
        // Original design system variants
        'design-primary': [
          'bg-gradient-to-r from-primary-600 to-skyblue-600',
          'text-white shadow-lg shadow-primary-500/25',
          'hover:shadow-xl hover:shadow-primary-500/40',
          'hover:scale-[1.02] active:scale-[0.98]',
          'focus-visible:ring-primary-500',
        ],
        outline: [
          'border border-primary-200 text-primary-700',
          'hover:bg-primary-50 hover:border-primary-300',
          'dark:border-primary-800 dark:text-primary-400',
          'dark:hover:bg-primary-900 dark:hover:border-primary-700',
          'focus-visible:ring-primary-500',
        ],
        ghost: [
          'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
          'dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
          'focus-visible:ring-neutral-500',
        ],
        premium: [
          'bg-gradient-to-r from-primary-600 via-skyblue-600 to-lightskyblue-600',
          'text-white shadow-2xl shadow-primary-500/50',
          'hover:shadow-primary-500/60 hover:shadow-3xl',
          'hover:scale-[1.05] active:scale-[0.95]',
          'bg-size-200 hover:bg-pos-0',
          'focus-visible:ring-primary-500',
        ],
        glass: [
          'bg-white/10 backdrop-blur-xl border border-white/20',
          'text-white shadow-xl shadow-black/10',
          'hover:bg-white/20 hover:border-white/30',
          'focus-visible:ring-white/50',
        ],
        destructive: [
          'bg-error-600 text-white shadow-lg shadow-error-500/25',
          'hover:bg-error-700 hover:shadow-xl hover:shadow-error-500/40',
          'hover:scale-[1.02] active:scale-[0.98]',
          'focus-visible:ring-error-500',
        ],
      },
      size: {
        sm: 'px-6 py-3 text-sm',
        default: 'px-8 py-4 text-base', // Homely default
        lg: 'px-10 py-5 text-lg',
        xl: 'px-12 py-6 text-xl',
        icon: 'p-4 w-auto h-auto aspect-square',
      },
      animation: {
        none: '',
        bounce: 'hover:animate-bounce-subtle',
        pulse: 'hover:animate-pulse-slow',
        shimmer: 'animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%]',
        glow: 'hover:animate-glow',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      animation: 'none',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  badge?: string | number;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    animation, 
    asChild = false, 
    loading, 
    leftIcon, 
    rightIcon, 
    badge, 
    fullWidth,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, animation }),
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {leftIcon && !loading && (
          <span className="mr-2 flex items-center">{leftIcon}</span>
        )}
        <span className="flex items-center">{children}</span>
        {rightIcon && (
          <span className="ml-2 flex items-center">{rightIcon}</span>
        )}
        {badge && (
          <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium">
            {badge}
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

// Button Group Component for related actions
export interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'attached' | 'separated';
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, className, orientation = 'horizontal', variant = 'attached' }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex',
          orientation === 'horizontal' 
            ? variant === 'attached' ? 'divide-x' : 'space-x-2'
            : variant === 'attached' ? 'flex-col divide-y' : 'flex-col space-y-2',
          variant === 'attached' && [
            'rounded-lg border border-neutral-200 bg-white shadow-sm',
            'dark:border-neutral-800 dark:bg-neutral-900',
            '[&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg',
            orientation === 'vertical' && '[&>*:first-child]:rounded-t-lg [&>*:first-child]:rounded-l-none [&>*:last-child]:rounded-b-lg [&>*:last-child]:rounded-r-none',
          ],
          className
        )}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';